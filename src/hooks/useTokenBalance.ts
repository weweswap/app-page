import { erc20Abi } from "viem";
import { useReadContract } from "wagmi";

interface UseTokenBalanceOptions {
  enabled?: boolean;
}

export const useTokenBalance = (
    address?: `0x${string}` | undefined,
    contractAddress?: `0x${string}`,
    options?: UseTokenBalanceOptions
  ) => {
    const { data, isFetching, refetch } = useReadContract({
      abi: erc20Abi,
      address: contractAddress,
      functionName: "balanceOf",
      args: [address ?? "0x0"],
      enabled: options?.enabled !== undefined ? options.enabled : true, // Default to true if not provided
      ...options,
    });
  
    return {
      data: data ?? 0n,
      isFetching,
      refetch,
    };
  };
  