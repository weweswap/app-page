import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { WewePool } from "./usePool";
import { erc20Abi, Hex } from "viem";
import { ethers } from "ethers";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CONTRACT_ADDRESSES } from "~/constants";
import ArrakisResolverABI from "~/lib/abis/ArrakisResolver";
import { ArrakisVaultABI } from "~/lib/abis/ArrakisVault";
import { provider } from "./provider";
import { useState } from "react";

export function useDualDeposit () {
  const [ pendingToConfirm, setPendingToConfirm ] = useState(false)
    const {
        data: hash,
        isPending: isTxCreating,
        isError: isCreationError,
        writeContractAsync,
    } = useWriteContract();
    const dualDeposit = async (wewePoolAddress: Hex, mintAmount: bigint, receiver: Hex) => {
        const tx = await writeContractAsync({
          abi: ArrakisVaultABI,
          address: wewePoolAddress,
          functionName: "mint",
          args: [mintAmount, receiver],
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
        dualDeposit,
    };
}


export function useEstimateMintShares(wewePool?: WewePool, amount0Max?: string, amount1Max?: string): UseQueryResult<any | undefined, Error | null> {
    return useQuery({
      queryKey: ["mint-shares-estimation", wewePool, amount0Max, amount1Max],
      queryFn: async (): Promise<any> => {

        if (!wewePool){
          return { wewePositions: [] }
        }

        const arrakisResolver = new ethers.Contract(
            CONTRACT_ADDRESSES.resolver,
            ArrakisResolverABI,
            provider
        );

        const result = arrakisResolver.getMintAmounts(wewePool.address, amount0Max, amount1Max)

        return result;
      },
    });
}