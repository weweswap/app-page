import { erc20Abi } from "viem";
import { useReadContract } from "wagmi";

export const useTokenBalance = (
  address?: `0x${string}` | undefined,
  contractAddress?: `0x${string}`
) => {
  const { data, isFetching, refetch } = useReadContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: "balanceOf",
    args: [address ?? "0x0"],
  });

  return {
    data: data ?? 0n,
    isFetching,
    refetch,
  };
};
