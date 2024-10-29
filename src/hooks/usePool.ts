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
import uniswapV3PoolAbi from "~/lib/abis/UniswapPool";
import { API_BASE_URL } from "~/constants/configs";

export type WewePool = {
  address: Hex;
  poolType: string;
  pool: string;
  tvl: string;
  volume: string;
  range: string;
  apr: string;
  dailyFeesInUsd: string;
  type: string;
  incentives: string;
  logo: {
    first: string;
    second: string;
  };
  token0: TokenItem;
  token1: TokenItem;
};

export interface VaultInfoResponse {
  address: string;
  feeApr: number;
  feesPerDay: number;
  incentivesPerDay?: number
}


export async function calculateTlvForTokens(
  vaultAddress: string,
  arrakisHelper: ethers.Contract,
  provider: ethers.JsonRpcProvider,
  token0: string,
  token1: string
) {

  const token0Contract = new ethers.Contract(token0, erc20Abi, provider);
  const token1Contract = new ethers.Contract(token1, erc20Abi, provider);

  const [
    totalUnderlying,
    token0decimals,
    token1decimals,
    priceInUsdToken0,
    priceInUsdToken1,
  ] = await Promise.all([
    arrakisHelper.totalUnderlying(vaultAddress),
    token0Contract.decimals(),
    token1Contract.decimals(),
    fetchPricePerAddressInUsdc(token0),
    fetchPricePerAddressInUsdc(token1),
  ]);

  const tlvToken0 =
    Number(ethers.formatUnits(totalUnderlying[0].toString(), token0decimals)) *
    priceInUsdToken0;
  const tlvToken1 =
    Number(ethers.formatUnits(totalUnderlying[1].toString(), token1decimals)) *
    priceInUsdToken1;

  return tlvToken0 + tlvToken1;
}

const cache = new Map();

async function getUniswapFeePercentage(poolAddress: string) {
  // Check if the poolAddress is already in the cache
  if (cache.has(poolAddress)) {
    return cache.get(poolAddress);
  }

  try {
    const uniswapContract = new ethers.Contract(
      poolAddress,
      uniswapV3PoolAbi,
      provider
    );

    const poolFeePercentage = await uniswapContract.fee();
    
    // Store the result in the cache with the poolAddress as the key
    cache.set(poolAddress, poolFeePercentage);
    
    return poolFeePercentage;
  } catch (error) {
    console.error(`Failed to fetch fee percentage for pool address ${poolAddress}:`, error);
    throw error;  // Rethrow error to let the caller handle it
  }
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

      const vaultInfoResponses: VaultInfoResponse[] = await Promise.all(
        poolAddresses.map(async (address) => {
          try {
            const response = await fetch(`${API_BASE_URL}/${address}`);

            if (!response.ok) {
              throw new Error(
                `Failed to fetch APR for address ${address}: ${response.statusText}`
              );
            }

            const data: VaultInfoResponse = await response.json();
            return data;
          } catch (error) {
            console.error(error);
            return { address, feeApr: 0, feesPerDay: 0 };
          }
        })
      );

      // Create an array of promises to fetch data for each vault in parallel
      const wewePoolsPromises = Object.keys(weweVaults).map(async (key) => {
        if (Object.hasOwn(weweVaults, key)) {
          const vaultAddress = weweVaults[key];
          const arrakisVault = new ethers.Contract(
            vaultAddress,
            ArrakisVaultABI,
            provider
          );
      
          try {
            // Fetch token0, token1, poolAddressList in parallel
            const [token0, token1, poolAddressList] = await Promise.all([
              arrakisVault.token0(),
              arrakisVault.token1(),
              arrakisVault.getPools()
            ]);
      
            // Calculate TLV and fetch Uniswap fee percentage in parallel
            const [tlv, poolFeePercentage] = await Promise.all([
              calculateTlvForTokens(
                vaultAddress,
                arrakisHelper,
                provider,
                token0,
                token1
              ),
              getUniswapFeePercentage(poolAddressList[0])
            ]);
      
            const token0info = TOKEN_LIST.find(
              ({ address }) => address.toLowerCase() === token0.toLowerCase()
            );
            const token1info = TOKEN_LIST.find(
              ({ address }) => address.toLowerCase() === token1.toLowerCase()
            );
      
            const vaultInfoData = vaultInfoResponses.find(
              (apr) => apr.address.toLowerCase() === vaultAddress.toLowerCase()
            );
      
            const feeApr =
              vaultInfoData && typeof vaultInfoData.feeApr === "number"
                ? vaultInfoData.feeApr.toFixed(2)
                : "0.00";
      
            const dailyFeesInUsd =
              vaultInfoData && typeof vaultInfoData.feesPerDay === "number"
                ? vaultInfoData.feesPerDay.toFixed(2)
                : "0.00";
      
            const volume =
              vaultInfoData && typeof vaultInfoData.feesPerDay === "number"
                ? vaultInfoData.feesPerDay / Number(ethers.formatUnits(poolFeePercentage, 6))
                : 0;

                const incentives =
                vaultInfoData && typeof vaultInfoData.incentivesPerDay === "number"
                  ? vaultInfoData.incentivesPerDay.toFixed(2)
                  : "0.00";
      
            return {
              address: vaultAddress,
              poolType: "MEMES 1%",
              pool: "EXOTIC",
              tvl: tlv.toString(),
              volume: volume.toFixed(2),
              range: "INFINITY",
              apr: feeApr,
              dailyFeesInUsd,
              incentives,
              type: `${token0info?.symbol}/${token1info?.symbol}`,
              logo: {
                first: token0info?.icon as string,
                second: token1info?.icon as string,
              },
              token0: token0info!,
              token1: token1info!,
            };
          } catch (error) {
            console.error(`Failed to fetch data for vault ${vaultAddress}:`, error);
          }
        }
      });

      // Wait for all promises to resolve in parallel
      const wewePoolsResults = await Promise.all(wewePoolsPromises);

      // Push the results into wewePools array if necessary
      wewePoolsResults.forEach((pool) => {
        if (pool) wewePools.push(pool);
      });

      return { wewePools };
    },
  });
}
