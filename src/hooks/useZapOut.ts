import axios from "axios";
import { useState } from "react"
import { erc20Abi, Hex } from "viem";
import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESSES } from "~/constants";
import { ZapKyberABI } from "~/lib/abis/ZapKyber";
import { provider } from "./provider";
import { useApproveToken } from "./useApproveToken";

interface ZapOutResponse {
    vaultAddress: string,
    tokenToSwap: string,
    sharesToBurn: string,
    routeToExecute: string,
    kyberSwapEncodedRoute: string
    swapToToken: string
}

export const useZapOut = () => {
    const [pendingToConfirm, setPendingToConfirm] = useState<boolean>(false);
    const [zapOutError, setZapOutError] = useState<boolean>(false)

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

            const args = [
                vaultAddress,
                sharesToBurn,
                result?.swapToToken,
                result?.kyberSwapEncodedRoute ]


              const tx = await writeContractAsync({
                abi: ZapKyberABI,
                address: CONTRACT_ADDRESSES.zapContract,
                functionName: "zapOut",
                args,
              });

        
              const receipt = await provider.waitForTransaction(tx);
        
              return receipt;
        } catch (error) {
            console.error("Error while fetching zap out data:", error)
            setPendingToConfirm(false);
            setZapOutError(true)
        }finally {
            setPendingToConfirm(false);
        }
    }

    return {
        hash: hash,
        isPending: isTxCreating,
        isError: isCreationError,
        isConfirming: pendingToConfirm,
        zapOutError,
        zapOut
    }
}