import { useWriteContract } from "wagmi";
import { Hex } from "viem";
import { provider } from "./provider";
import { useState } from "react";
import eaterABI from "~/lib/abis/Eater";

export function useEat (eaterAddress: Hex) {
  const [ pendingToConfirm, setPendingToConfirm ] = useState(false)
    const {
        data: hash,
        isPending: isTxCreating,
        isError: isCreationError,
        writeContractAsync,
    } = useWriteContract();
    const eat = async (amount: string) => {
        const tx = await writeContractAsync({
          abi: eaterABI,
          address: eaterAddress,
          functionName: "merge",
          args: [amount],
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
        eat,
    };
}