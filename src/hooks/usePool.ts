import { UseQueryResult } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useQuery } from "wagmi/query";
import ArrakisResolver from "~/lib/abis/ArrakisResolver";
import uniswapV3PoolAbi from "~/lib/abis/UniswapPool";

export const provider = new ethers.JsonRpcProvider(
    `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_APIKEY}`
  );

export function usePosition(): UseQueryResult<{ position: any } | undefined, Error | null> {
    return useQuery({
      queryKey: ["position"],
      queryFn: async (): Promise<{ position: any }> => {
        const poolContract = new ethers.Contract(
          "0x6F71796114B9CDaef29A801BC5cdBCb561990Eeb",
          uniswapV3PoolAbi,
          provider
        );

        const position = await poolContract.positions('0xb20696d4b7bbbe11774f9c7581455bf39867abcce14389c675f46fb8adf6cd9e')
  
        return { position };
      },
    });
  }

  export function useTotalVaultUnderlying(vaultAddress: string): UseQueryResult<{ position: any } | undefined, Error | null> {
    return useQuery({
      queryKey: ["totalVaultUnderlying", vaultAddress],
      queryFn: async (): Promise<{ position: any }> => {
        const arrakisResolver = new ethers.Contract(
          vaultAddress,
          ArrakisResolver,
          provider
        );

        const position = await arrakisResolver.positions('0xb20696d4b7bbbe11774f9c7581455bf39867abcce14389c675f46fb8adf6cd9e')
  
        return { position };
      },
    });
  }