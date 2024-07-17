import {
  useReadContract,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { CONTRACT_ADDRESSES } from "@/constants";
import { MergeABI } from "@/lib/abis";
import { MergeInfo } from "@/types";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";

export const useMergeAssetAddress = () => {
  const { data, isFetching } = useReadContract({
    abi: MergeABI,
    address: CONTRACT_ADDRESSES.merge,
    functionName: "mergeAsset",
    args: [],
  });

  return {
    data: data ?? "0x0",
    isFetching,
  };
};

export const useTargetAssets = () => {
  const {
    data: length,
    isFetching: isLengthFetching,
    refetch,
  } = useReadContract({
    abi: MergeABI,
    address: CONTRACT_ADDRESSES.merge,
    functionName: "targetAssetsLength",
    args: [],
  });

  const { data, isFetching: isArrayFetching } = useReadContracts({
    contracts: new Array(Number(length ?? 0)).fill(0).map((_, index) => ({
      abi: MergeABI,
      address: CONTRACT_ADDRESSES.merge,
      functionName: "taretAssets",
      args: [index],
    })),
  });

  return {
    data: (data ?? []).map(
      (item) => String(item.result ?? "0x0") as `0x${string}`
    ),
    isFetching: isLengthFetching || isArrayFetching,
    refetch,
  };
};

export const useMergeInfo = (targetAsset: `0x${string}`) => {
  const { data, isFetching } = useReadContract({
    abi: MergeABI,
    address: CONTRACT_ADDRESSES.merge,
    functionName: "merges",
    args: [targetAsset],
  });

  return {
    data: data
      ? ({
          params: {
            targetAsset: data[0].targetAsset,
            swapRate: Number(data[0].swapRate),
            depositPeriod: Number(data[0].depositPeriod),
            mergeCliff: Number(data[0].mergeCliff),
            mergePeriod: Number(data[0].mergePeriod),
            startTimestamp: Number(data[0].startTimestamp),
          },
          allocatedAmount: data[1],
          availableAmount: data[2],
          claimedAmount: data[3],
          depositedAmount: data[4],
          targetWithdrawn: data[5],
          withdrawnAfterDeposit: data[6],
          withdrawnAfterMerge: data[7],
        } as MergeInfo)
      : undefined,
    isFetching,
  };
};

export const useVestedAmount = (
  targetAsset: `0x${string}`,
  userAddress: `0x${string}`
) => {
  const { data, isFetching } = useReadContract({
    abi: MergeABI,
    address: CONTRACT_ADDRESSES.merge,
    functionName: "vested",
    args: [targetAsset, userAddress],
  });

  return {
    data: data ?? 0n,
    isFetching,
  };
};

export const useReleasedAmount = (
  targetAsset: `0x${string}`,
  userAddress: `0x${string}`
) => {
  const { data, isFetching } = useReadContract({
    abi: MergeABI,
    address: CONTRACT_ADDRESSES.merge,
    functionName: "released",
    args: [targetAsset, userAddress],
  });

  return {
    data: data ?? 0n,
    isFetching,
  };
};

export const useDeposit = () => {
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
        title: "Deposit",
        message: "Deposited successfully!",
      });
    }
    if (isCreationError) {
      notifications.show({
        title: "Deposit",
        message: "Deposit failed!",
      });
      console.log(errorCreation?.message);
    }
    if (isConfirmError) {
      notifications.show({
        title: "Deposit",
        message: "Deposit failed!",
      });
      console.log(errorConfirm?.message);
    }
  }, [isConfirmed, isCreationError, isConfirmError]);

  const onWriteAsync = async (
    targetAsset: `0x${string}`,
    targetAmount: bigint
  ) => {
    await writeContractAsync({
      abi: MergeABI,
      address: CONTRACT_ADDRESSES.merge,
      functionName: "deposit",
      args: [targetAsset, targetAmount],
    });
  };

  return {
    isPending: isTxCreating || isTxConfirming,
    hash,
    onWriteAsync,
    isConfirmed,
  };
};

export const useWithdraw = () => {
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
        title: "Withdraw",
        message: "Withdrew successfully!",
      });
    }
    if (isCreationError) {
      notifications.show({
        title: "Withdraw",
        message: "Withdraw failed!",
      });
      console.log(errorCreation?.message);
    }
    if (isConfirmError) {
      notifications.show({
        title: "Withdraw",
        message: "Withdraw failed!",
      });
      console.log(errorConfirm?.message);
    }
  }, [isConfirmed, isCreationError, isConfirmError]);

  const onWriteAsync = async (
    targetAsset: `0x${string}`,
    mergeAmount: bigint
  ) => {
    await writeContractAsync({
      abi: MergeABI,
      address: CONTRACT_ADDRESSES.merge,
      functionName: "withdraw",
      args: [targetAsset, mergeAmount],
    });
  };

  return {
    isPending: isTxCreating || isTxConfirming,
    hash,
    onWriteAsync,
    isConfirmed,
  };
};
