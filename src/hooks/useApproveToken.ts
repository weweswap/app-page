import { erc20Abi, Hex } from "viem";
import { usePublicClient, useWriteContract } from "wagmi";
import { useState } from "react";

export function useApproveToken() {
    const [pendingToConfirm, setPendingToConfirm] = useState(false)
    const {
        data: hash,
        isPending: isTxCreating,
        isError: isCreationError,
        writeContractAsync,
    } = useWriteContract();
    const publicClient = usePublicClient();

    const approve = async (tokenAddress: Hex, spender: Hex, amount: bigint) => {
        if (!publicClient) {
            throw Error("Public client not found");
        }

        setPendingToConfirm(true)
        const tx = await writeContractAsync({
            abi: erc20Abi,
            address: tokenAddress,
            functionName: "approve",
            args: [spender, amount],
        });
        const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
        setPendingToConfirm(false)
        return receipt;
    };

    return {
        hash: hash,
        isPending: isTxCreating,
        isConfirming: pendingToConfirm,
        isError: isCreationError,
        approve,
    };
}
