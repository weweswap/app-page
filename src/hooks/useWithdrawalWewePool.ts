import { useWriteContract } from "wagmi";
import { WewePool } from "./usePool";
import { Hex } from "viem";
import { ethers } from "ethers";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CONTRACT_ADDRESSES } from "~/constants";
import ArrakisResolverABI from "~/lib/abis/ArrakisResolver";
import { ArrakisVaultABI } from "~/lib/abis/ArrakisVault";
import { provider } from "./provider";

export function useWithdrawalWewePool () {
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
        const receipt = await provider.waitForTransaction(tx);
        return receipt;
    };
    return {
        hash: hash,
        isPending: isTxCreating,
        isError: isCreationError,
        withdrawal,
    };
}