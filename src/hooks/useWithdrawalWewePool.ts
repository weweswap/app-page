import { useWriteContract } from "wagmi";
import { Hex } from "viem";
import { ArrakisVaultABI } from "~/lib/abis/ArrakisVault";
import { provider } from "./provider";
import { useState } from "react";

export function useWithdrawalWewePool () {
    const [ pendingToConfirm, setPendingToConfirm ] = useState(false)
    const {
        data: hash,
        isPending: isTxCreating,
        isError: isCreationError,
        writeContractAsync,
    } = useWriteContract();
    const withdrawal = async (wewePoolAddress: Hex, burnAmount: bigint, receiver: Hex) => {
        const tx = await writeContractAsync({
          abi: ArrakisVaultABI,
          address: wewePoolAddress,
          functionName: "burn",
          args: [burnAmount, receiver],
        });
        setPendingToConfirm(true)
        const receipt = await provider.waitForTransaction(tx);
        setPendingToConfirm(false)
        return receipt;
    };
    return {
        hash: hash,
        isPending: isTxCreating,
        isError: isCreationError,
        isConfirming: pendingToConfirm,
        withdrawal,
    };
}