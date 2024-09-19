import { Hex } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ADDRESSES } from "~/constants";
import feeManagerABI from "~/lib/abis/FeeManager";

export function useClaimFees() {
    const {
      data: hash,
      isPending: isTxCreating,
      isError: isCreationError,
      writeContractAsync,
    } = useWriteContract();
    const {
      isLoading: isTxConfirming,
      isError: isConfirmError,
      isSuccess: isConfirmed,
      data: receipt,
    } = useWaitForTransactionReceipt({ hash });
  
    const claimFees = async (userAddress: Hex) => {
      await writeContractAsync({
        abi: feeManagerABI,
        address: CONTRACT_ADDRESSES.feeManager,
        functionName: "claimFees",
        args: [userAddress],
      });
    };
  
    return {
      hash: hash,
      isPending: isTxCreating,
      isError: isCreationError || isConfirmError,
      isTxConfirming,
      isConfirmed,
      receipt,
      claimFees,
    };
  }