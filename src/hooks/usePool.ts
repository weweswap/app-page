import { UseQueryResult } from "@tanstack/react-query";
import { ethers } from "ethers";
import { erc20Abi, Hex } from "viem";
import { useQuery } from "wagmi/query";
import { CONTRACT_ADDRESSES, TOKEN_LIST } from "~/constants";
import { ArrakisFactoryABI } from "~/lib/abis/ArrakisFactory";
import { ArrakisV2HelperABI } from "~/lib/abis/ArrakisHelper";
import { ArrakisVaultABI } from "~/lib/abis/ArrakisVault";
import { fetchPricePerAddressInUsdc } from "~/services/price";
import { provider } from "./provider";

export type WewePool = {
  address: Hex
  poolType: string,
  token0: Hex,
  token1: Hex,
  pool: string,
  tvl: string,
  volume: string,
  range: string,
  apr: string,
  type: string,
  logo: {
    first: string,
    second: string
  }
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


export function useWewePools(): UseQueryResult<{ wewePools: WewePool[] } | undefined, Error | null> {
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

      const weweVaultNumber = await arrakisFactory.numVaults()
      const weweVults = await arrakisFactory.vaults(0, weweVaultNumber)

      const wewePools: WewePool[] = []

      for (let key in weweVults) {
        if (weweVults.hasOwnProperty(key)) {
          const arrakisVault = new ethers.Contract(
            weweVults[key],
            ArrakisVaultABI,
            provider
          );
          const token0 = await arrakisVault.token0()
          const token1 = await arrakisVault.token1()

          const tlv = await calculateTlvForTokens(
            weweVults[key],
            arrakisHelper,
            provider,
            token0,
            token1
          );

          const token0info = TOKEN_LIST.find(({ address }) => address.toLowerCase() === token0.toLowerCase() )
          const token1info = TOKEN_LIST.find(({ address }) => address.toLowerCase() === token1.toLowerCase() )

          wewePools.push({
            address: weweVults[key],
            token0: token0,
            token1: token1,
            poolType: "MEMES 1%",
            pool: "EXOTIC",
            tvl: tlv.toString(),
            volume: "-",
            range: "INFINITY",
            apr: "-",
            type: `${token0info?.symbol}/${token1info?.symbol}`,
            logo: {
              first: token0info?.icon as string,
              second: token1info?.icon as string,
            }
          })
        }
      }

      return { wewePools };
    },
  });
}