import { useWriteContract } from "wagmi";
import { Hex } from "viem";
import { CONTRACT_ADDRESSES } from "~/constants";
import { provider } from "./provider";
import { useState } from "react";
import eaterABI from "~/lib/abis/Eater";

export function useEatBro () {
  const [ pendingToConfirm, setPendingToConfirm ] = useState(false)
    const {
        data: hash,
        isPending: isTxCreating,
        isError: isCreationError,
        writeContractAsync,
    } = useWriteContract();
    const eatBro = async (amount: bigint) => {
        const tx = await writeContractAsync({
          abi: eaterABI,
          address: CONTRACT_ADDRESSES.broEater as Hex,
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
        eatBro,
    };
}