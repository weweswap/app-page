import { useState } from "react";
import { Hex } from "viem";
import { useAccount, usePublicClient, useReadContract, useWriteContract } from "wagmi";
import MemeEaterAbi from "~/lib/abis/MemeEaterABI";
import * as dn from "dnum";

function formatMinutesToHumanReadable(minutes: number) {
  const days = Math.floor(minutes / 60 / 24);
  if (days > 0) {
    return `${days} days`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours > 0) {
    return `${hours} hours`;
  }
  const minutesRemaining = minutes % 60;
  if (minutesRemaining > 0) {
    return `${minutesRemaining} minutes`;
  }
  return "0m";
}

export function useMemeEat(eaterAddress: Hex, uniAdaptorAddress: Hex) {
  const [pendingToConfirm, setPendingToConfirm] = useState(false)
  const {
    data: hash,
    isError: isCreationError,
    writeContractAsync,
  } = useWriteContract();
  const publicClient = usePublicClient();

  const eat = async (amount: string) => {
    if (!publicClient) {
      throw Error("Public client not found");
    }

    setPendingToConfirm(true);

    const tx = await writeContractAsync({
      abi: MemeEaterAbi,
      address: eaterAddress,
      functionName: "mergeAndSell",
      args: [BigInt(amount), uniAdaptorAddress, '0x'],
    });
    const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });

    setPendingToConfirm(false);
    return receipt;
  };
  return {
    hash: hash,
    isPending: pendingToConfirm,
    isError: isCreationError,
    eat,
  };
}

export function useMemeEaterRate(address: Hex): {
  rate: number,
  isLoading: boolean
} {
  const { data, isLoading } = useReadContract({
    abi: MemeEaterAbi,
    address: address,
    functionName: "getRate",
    query: {
      staleTime: 1000 * 60 * 5,
    }
  });

  return {
    rate: dn.toNumber(dn.from([data as bigint ?? 0n, 5])),
    isLoading
  }
}


export function useVestingsInfo(address: Hex) {
  const { address: account, isConnected } = useAccount();

  const { data, isLoading, refetch } = useReadContract({
    abi: MemeEaterAbi,
    address: address,
    functionName: "vestings",
    args: [account!],
    query: {
      enabled: isConnected && !!account,
    },
  });

  return {
    lockedAmount: data?.[0] as bigint ?? 0n,
    lockedUntil: data?.[1] as bigint ?? 0n,
    isLoading,
    refetch
  };
}


export function useMemeEaterVestingDuration(address: Hex) {
  const { data, isLoading } = useReadContract({
    abi: MemeEaterAbi,
    address: address,
    functionName: "vestingDuration",
    query: {
      staleTime: 1000 * 60 * 5,
    },
  });



  return {
    vestingDuration: formatMinutesToHumanReadable(data ?? 0),
    isLoading,
  };
}


export function useMemeEaterClaim(eaterAddress: Hex) {
  const [pendingToConfirm, setPendingToConfirm] = useState(false)
  const {
    data: hash,
    isError: isCreationError,
    writeContractAsync,
  } = useWriteContract();
  const publicClient = usePublicClient();

  const claim = async () => {
    if (!publicClient) {
      throw Error("Public client not found");
    }

    setPendingToConfirm(true);

    const tx = await writeContractAsync({
      abi: MemeEaterAbi,
      address: eaterAddress,
      functionName: "claim",
    });
    const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });

    setPendingToConfirm(false);
    return receipt;
  };
  return {
    hash: hash,
    isPending: pendingToConfirm,
    isError: isCreationError,
    claim,
  };
}