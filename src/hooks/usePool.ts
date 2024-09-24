import { UseQueryResult } from "@tanstack/react-query";
import { ethers } from "ethers";
import { erc20Abi, Hex } from "viem";
import { useQuery } from "wagmi/query";
import { CONTRACT_ADDRESSES, TOKEN_LIST } from "~/constants";
import { ArrakisFactoryABI } from "~/lib/abis/ArrakisFactory";
import { ArrakisV2HelperABI } from "~/lib/abis/ArrakisHelper";
import { ArrakisVaultABI } from "~/lib/abis/ArrakisVault";
import { TokenItem } from "~/models";
import { fetchPricePerAddressInUsdc } from "~/services/price";
import { provider } from "./provider";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://app-backend-production-676d.up.railway.app/api";

export type WewePool = {
  address: Hex;
  poolType: string;
  pool: string;
  tvl: string;
  volume: string;
  range: string;
  apr: string;
  type: string;
  logo: {
    first: string;
    second: string;
  };
  token0: TokenItem;
  token1: TokenItem;
};

export interface AprResponse {
  address: string;
  feeApr: number;
}

export async function calculateTlvForTokens(
  vaultAddress: string,
  arrakisHelper: ethers.Contract,
  provider: ethers.JsonRpcProvider,
  token0: string,
  token1: string
) {
  const totalUnderlying = await arrakisHelper.totalUnderlying(vaultAddress);

  const token0Contract = new ethers.Contract(token0, erc20Abi, provider);
  const token1Contract = new ethers.Contract(token1, erc20Abi, provider);

  const token0decimals = await token0Contract.decimals();
  const token1decimals = await token1Contract.decimals();

  const priceInUsdToken0 = await fetchPricePerAddressInUsdc(token0);
  const priceInUsdToken1 = await fetchPricePerAddressInUsdc(token1);

  const tlvToken0 =
    Number(ethers.formatUnits(totalUnderlying[0].toString(), token0decimals)) *
    priceInUsdToken0;
  const tlvToken1 =
    Number(ethers.formatUnits(totalUnderlying[1].toString(), token1decimals)) *
    priceInUsdToken1;

  return tlvToken0 + tlvToken1;
}

export function useWewePools(): UseQueryResult<
  { wewePools: WewePool[] } | undefined,
  Error | null
> {
  return useQuery({
    queryKey: ["wewe-pools"],
    queryFn: async (): Promise<{ wewePools: WewePool[] }> => {
      const arrakisFactory = new ethers.Contract(
        CONTRACT_ADDRESSES.weweVaultFactory,
        ArrakisFactoryABI,
        provider
      );

      const arrakisHelper = new ethers.Contract(
        CONTRACT_ADDRESSES.helper,
        ArrakisV2HelperABI,
        provider
      );

      const weweVaultNumber = await arrakisFactory.numVaults();
      const weweVaults = await arrakisFactory.vaults(0, weweVaultNumber);

      const wewePools: WewePool[] = [];

      const poolAddresses: string[] = [];

      for (let key in weweVaults) {
        if (Object.hasOwn(weweVaults, key)) {
          poolAddresses.push(weweVaults[key]);
        }
      }

      const aprResponses: AprResponse[] = await Promise.all(
        poolAddresses.map(async (address) => {
          try {
            const response = await fetch(`${API_BASE_URL}/${address}`);

            if (!response.ok) {
              throw new Error(
                `Failed to fetch APR for address ${address}: ${response.statusText}`
              );
            }

            const data: AprResponse = await response.json();
            return data;
          } catch (error) {
            console.error(error);
            return { address, feeApr: 0 };
          }
        })
      );

      for (let key in weweVaults) {
        if (Object.hasOwn(weweVaults, key)) {
          const vaultAddress = weweVaults[key];
          const arrakisVault = new ethers.Contract(
            vaultAddress,
            ArrakisVaultABI,
            provider
          );
          const token0 = await arrakisVault.token0();
          const token1 = await arrakisVault.token1();

          const tlv = await calculateTlvForTokens(
            vaultAddress,
            arrakisHelper,
            provider,
            token0,
            token1
          );

          const token0info = TOKEN_LIST.find(
            ({ address }) => address.toLowerCase() === token0.toLowerCase()
          );
          const token1info = TOKEN_LIST.find(
            ({ address }) => address.toLowerCase() === token1.toLowerCase()
          );

          const aprData = aprResponses.find(
            (apr) => apr.address.toLowerCase() === vaultAddress.toLowerCase()
          );

          const feeApr =
            aprData && typeof aprData.feeApr === "number"
              ? aprData.feeApr.toFixed(2)
              : "0.00";

          wewePools.push({
            address: weweVaults[key],
            poolType: "MEMES 1%",
            pool: "EXOTIC",
            tvl: tlv.toString(),
            volume: "-",
            range: "INFINITY",
            apr: feeApr,
            type: `${token0info?.symbol}/${token1info?.symbol}`,
            logo: {
              first: token0info?.icon as string,
              second: token1info?.icon as string,
            },
            token0: token0info!,
            token1: token1info!,
          });
        }
      }

      return { wewePools };
    },
  });
}
