import { erc20Abi, Hex } from "viem";
import { useWriteContract } from "wagmi";
import { provider } from "./provider";
import { useState } from "react";

export function useApproveToken () {
    const [ pendingToConfirm, setPendingToConfirm ] = useState(false)
    const {
        data: hash,
        isPending: isTxCreating,
        isError: isCreationError,
        writeContractAsync,
    } = useWriteContract();

    const approve = async (tokenAddress: Hex, spender: Hex, amount: bigint) => {
        const tx = await writeContractAsync({
            abi: erc20Abi,
            address: tokenAddress,
            functionName: "approve",
            args: [spender, amount],
        });
        setPendingToConfirm(true)
        const receipt = await provider.waitForTransaction(tx);
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
