import { useEffect } from "react";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { CONTRACT_ADDRESSES } from "~/constants";
import { ERC20WeweABI, MergeABI } from "~/lib/abis";
import { erc20Abi } from "viem";

export const useQuoteVult = (amount: bigint) => {
  const { data, isFetching } = useReadContract({
    abi: MergeABI,
    address: CONTRACT_ADDRESSES.merge,
    functionName: "quoteVult",
    args: [amount],
  });

  const {data:txReceipt} = useWaitForTransactionReceipt();

  return {
    data: data ?? 0n,
    isFetching,
    txReceipt
  };
};

export const useWeweBalance = () => {
  const { data, isFetching } = useReadContract({
    abi: MergeABI,
    address: CONTRACT_ADDRESSES.merge,
    functionName: "weweBalance",
  });
  return {
    data: data ?? 0n,
    isFetching,
  };
};
export const useVultBalance = () => {
  const { data, isFetching } = useReadContract({
    abi: MergeABI,
    address: CONTRACT_ADDRESSES.merge,
    functionName: "vultBalance",
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
    data: txReceipt
  } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    // if (isConfirmed) {
    //   notifications.show({
    //     title: "Merge",
    //     message: "Merge success!",
    //   });
    // }
    if (isCreationError) {
      // notifications.show({
      //   title: "Merge",
      //   message: "Merge fail!",
      //   color: "red",
      // });
      console.log(errorCreation?.message);
    }
    if (isConfirmError) {
      // notifications.show({
      //   title: "Merge",
      //   message: "Merge fail!",
      //   color: "red",
      // });
      console.log(errorConfirm?.message);
    }
  }, [isConfirmed, isCreationError, isConfirmError]);

  const onWriteAsync = async (amount: bigint) => {
    await writeContractAsync({
      abi: ERC20WeweABI,
      address: CONTRACT_ADDRESSES.wewe,
      functionName: "approveAndCall",
      args: [CONTRACT_ADDRESSES.merge, amount, "0x"],
    });
  };

  return {
    isPending: isTxCreating || isTxConfirming,
    hash,
    onWriteAsync,
    isConfirmed,
    isError: isConfirmError || isCreationError,
    txReceipt
  };
};
