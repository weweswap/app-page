import { useEffect } from "react";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { CONTRACT_ADDRESSES } from "~/constants";
import { ERC20VultABI, MergeABI } from "~/lib/abis";
import { notifications } from "@mantine/notifications";

export const useQuoteVult = (amount: bigint) => {
  const { data, isFetching } = useReadContract({
    abi: MergeABI,
    address: CONTRACT_ADDRESSES.merge,
    functionName: "quoteVult",
    args: [amount],
  });

  return {
    data: data ?? 0n,
    isFetching,
  };
};

export const useApproveAndCall = () => {
  const {
    data: hash,
    error: errorCreation,
    isPending: isTxCreating,
    isError: isCreationError,
    writeContractAsync,
  } = useWriteContract();
  const {
    isLoading: isTxConfirming,
    error: errorConfirm,
    isError: isConfirmError,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isConfirmed) {
      notifications.show({
        title: "Merge",
        message: "Merge success!",
      });
    }
    if (isCreationError) {
      notifications.show({
        title: "Merge",
        message: "Merge fail!",
        color: "red",
      });
      console.log(errorCreation?.message);
    }
    if (isConfirmError) {
      notifications.show({
        title: "Merge",
        message: "Merge fail!",
        color: "red",
      });
      console.log(errorConfirm?.message);
    }
  }, [isConfirmed, isCreationError, isConfirmError]);

  const onWriteAsync = async (amount: bigint) => {
    await writeContractAsync({
      abi: ERC20VultABI,
      address: CONTRACT_ADDRESSES.vult,
      functionName: "approveAndCall",
      args: [CONTRACT_ADDRESSES.merge, amount, "0x0"],
    });
  };

  return {
    isPending: isTxCreating || isTxConfirming,
    hash,
    onWriteAsync,
    isConfirmed,
  };
};
