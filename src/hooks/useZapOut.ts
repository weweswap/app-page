import axios from "axios";
import { useState } from "react"
import { Hex } from "viem";
import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESSES } from "~/constants";
import { ZapKyberABI } from "~/lib/abis/ZapKyber";
import { provider } from "./provider";

interface ZapOutResponse {
    vaultAddress: string,
    tokenToSwap: string,
    sharesToBurn: string,
    routeToExecute: string
}

export const useZapOut = () => {
    const [pendingToConfirm, setPendingToConfirm] = useState(false);

    const {
        data: hash,
        isPending: isTxCreating,
        isError: isCreationError,
        writeContractAsync
    } = useWriteContract();

    const zapOut = async (
        vaultAddress: Hex | undefined,
        tokenToSwap: Hex | undefined,
        sharesToBurn: Hex
    ) => {
        try {
            setPendingToConfirm(true);

            const response = await axios.post<ZapOutResponse>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/zap-out`,
                {vaultAddress, tokenToSwap, sharesToBurn}
            )

            if(!response.data) {
                throw new Error('No data returned from Zap-out API.');
            }

            const result = response.data;
            if (
                !result.vaultAddress ||
                !result.tokenToSwap ||
                !result.sharesToBurn || 
                !result.routeToExecute
              ) {
                throw new Error("Incomplete data returned from Zap-Out API.");
              }

              const args = [
                vaultAddress,
                result.sharesToBurn,
                result.tokenToSwap,
                result.routeToExecute
              ]

              const tx = await writeContractAsync({
                abi: ZapKyberABI,
                address: CONTRACT_ADDRESSES.zapContract,
                functionName: "zapOut",
                args,
              });
        
              const receipt = await provider.waitForTransaction(tx);
              setPendingToConfirm(false);
        
              return receipt;
        } catch (error) {
            console.error("Error while fetching zap out data:", error)
            setPendingToConfirm(false);
        }
    }

    return {
        hash: hash,
        isPending: isTxCreating,
        isError: isCreationError,
        isConfirming: pendingToConfirm,
        zapOut
    }
}