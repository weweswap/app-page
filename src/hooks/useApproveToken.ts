import { erc20Abi, Hex } from "viem";
import { useWriteContract } from "wagmi";
import { provider } from "./provider";

export function useApproveToken () {
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
        const receipt = await provider.waitForTransaction(tx);
        return receipt;
    };

    return {
        hash: hash,
        isPending: isTxCreating,
        isError: isCreationError,
        approve,
    };
}
