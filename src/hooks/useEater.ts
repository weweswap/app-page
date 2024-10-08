import { usePublicClient, useReadContract, useWriteContract } from "wagmi";
import { Hex } from "viem";
import { useState } from "react";
import eaterABI from "~/lib/abis/Eater";

export function useEat (eaterAddress: Hex) {
  const [ pendingToConfirm, setPendingToConfirm ] = useState(false)
    const {
        data: hash,
        isError: isCreationError,
        writeContractAsync,
    } = useWriteContract();
    const publicClient = usePublicClient();

    const eat = async (amount: string) => {
        if (!publicClient) {
          throw Error("Public client not found");
        }

        setPendingToConfirm(true);

        const tx = await writeContractAsync({
          abi: eaterABI,
          address: eaterAddress,
          functionName: "merge",
          args: [amount],
        });
        const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });

        setPendingToConfirm(false);
        return receipt;
    };
    return {
        hash: hash,
        isPending: pendingToConfirm,
        isError: isCreationError,
        eat,
    };
}

export function useEaterRate(eaterAddress: Hex): {
  rate: bigint,
  isLoading: boolean
} {
    const {data, isLoading} = useReadContract({
        abi: eaterABI,
        address: eaterAddress,
        functionName: "getRate",
        query: {
            staleTime: 1000 * 60 * 5,
        }
    });

    return {
      rate: data as bigint ?? 0n,
      isLoading
    }
}