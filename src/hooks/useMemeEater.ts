import { use, useState } from "react";
import { Hex } from "viem";
import { useAccount, usePublicClient, useReadContract, useReadContracts, useWatchContractEvent, useWriteContract } from "wagmi";
import MemeEaterAbi from "~/lib/abis/MemeEaterABI";
import * as dn from "dnum";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "~/constants/configs";
import { slugToMergeConfig } from "~/constants/mergeConfigs";

interface WhiteListResponse {
  whitelistInfo: {
    amount: string;
    proof: string[];
    address: Hex;
  }
}

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

export function useMemeEat(eaterAddress: Hex) {
  const [pendingToConfirm, setPendingToConfirm] = useState(false);
  const [isError, setIsError] = useState(false);
  const {
    data: hash,
    isError: isCreationError,
    writeContractAsync,
  } = useWriteContract();
  const publicClient = usePublicClient();

  const eat = async ({
    amount,
    proof,
    whitelistedAmount,
  }: {
    amount: string;
    proof: Readonly<Hex[]>;
    whitelistedAmount: string;
  }) => {
    if (!publicClient) {
      throw Error("Public client not found");
    }

    setPendingToConfirm(true);

    const tx = await writeContractAsync({
      abi: MemeEaterAbi,
      address: eaterAddress,
      functionName: "mergeWithProof",
      args: [BigInt(whitelistedAmount), BigInt(amount), proof],
    });
    const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });

    if(receipt.status === "reverted") {
      setIsError(true);
    }

    setPendingToConfirm(false);
    return receipt;
  };

  return {
    hash: hash,
    isPending: pendingToConfirm,
    isError: isCreationError || isError,
    eat,
  };
}

export function useMemeEaterRate(address: Hex): {
  rate: number,
  isLoading: boolean
} {
  const { data, isLoading, refetch } = useReadContract({
    abi: MemeEaterAbi,
    address: address,
    functionName: "getCurrentPrice",
  });

  useWatchContractEvent({
    address: address,
    abi: MemeEaterAbi,
    eventName: "Merged",
    onLogs: () => {
      refetch();
    },
  });


  return {
    rate: dn.toNumber(dn.from([data as bigint ?? 0n, 3])),
    isLoading
  }
}


export function useVestingsInfo(address: Hex) {
  const { address: account, isConnected } = useAccount();
  const isFomo = address === slugToMergeConfig["fomo"].eaterContractAddress;

  const { data, isLoading, refetch } = useReadContract({
    abi: MemeEaterAbi,
    address: address,
    functionName: "vestings",
    args: [account!],
    query: {
      enabled: isConnected && !!account && !isFomo,
    },
  });

  const { data: legacyData, isLoading: isLegacyLoading, refetch: refetchLegacy } = useReadContract({
    abi: [
      {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "vestings",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "end",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
    ],
    address: address,
    functionName: "vestings",
    args: [account!],
    query: {
      enabled: isConnected && !!account && isFomo,
    },
  });

  useWatchContractEvent({
    address: address,
    abi: MemeEaterAbi,
    eventName: "Merged",
    onLogs: () => {
      if(isFomo) {
        refetchLegacy();
      } else {
        refetch();
      }
    },
  });

  if(isFomo) {
    return {
      lockedAmount: legacyData?.[0] as bigint ?? 0n,
      lockedUntil: legacyData?.[1] as bigint ?? 0n,
      mergedAmount: 0n,
      isLoading: isLegacyLoading,
      refetch: refetchLegacy
    };
  }

  return {
    lockedAmount: data?.[0] as bigint ?? 0n,
    lockedUntil: data?.[1] as bigint ?? 0n,
    mergedAmount: data?.[2] as bigint ?? 0n,
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

export function useMemeGetTotalWeWe(eaterAddress: Hex, amount: bigint) {
  const { data, isLoading } = useReadContract({
    abi: MemeEaterAbi,
    address: eaterAddress,
    functionName: "calculateTokensOut",
    args: [amount],
    query: {
      enabled: !!amount,
    }
  });

  return {
    totalWeWe: data as bigint ?? 0n,
    isLoading
  }
}


export function useMemeEaterIsPaused(eaterAddress: Hex) {
  const { data, isLoading, refetch } = useReadContract({
    abi: MemeEaterAbi,
    address: eaterAddress,
    functionName: "paused",
  });

  useWatchContractEvent({
    address: eaterAddress,
    abi: MemeEaterAbi,
    eventName: "Paused",
    onLogs: () => {
      refetch();
    },
  });

  return {
    isPaused: data,
    isLoading
  }
}

export function useMemeEaterMerklInfo(eaterAddress: Hex, tokenAddress: Hex) {
  const { address } = useAccount();

  const { data: merkleRoot, isLoading: isMerkleRootLoading } = useReadContract({
    abi: MemeEaterAbi,
    address: eaterAddress,
    functionName: "merkleRoot",
    query: {
      enabled: !!address,
    }
  });

  const { data: whitelistData, isLoading: isWhitelistDataLoading } = useQuery({
    queryKey: ["isWhitelisted", tokenAddress, address],
    queryFn: async () => {
      const response = await axios.get<WhiteListResponse>(`${API_BASE_URL}/merge/whitelist/${tokenAddress}`, {
        params: {
          userAddress: address,
        }
      });

      return response.data;
    },
    enabled: !!address,
  });


  return {
    isLoading: isMerkleRootLoading || isWhitelistDataLoading,
    merkleRoot: merkleRoot,
    whitelistData: whitelistData
  }
}

export function useMemeEaterCapsInfo(eaterAddress: Hex) {
  const { data, isLoading, refetch } = useReadContracts({
    contracts: [
      {
        abi: MemeEaterAbi,
        address: eaterAddress,
        functionName: "maxSupply",
      },
      {
        abi: MemeEaterAbi,
        address: eaterAddress,
        functionName: "totalMerged",
      }
    ]
  });

  useWatchContractEvent({
    address: eaterAddress,
    abi: MemeEaterAbi,
    eventName: "Merged",
    onLogs: () => {
      refetch();
    },
  });

  return {
    maxSupply: data?.[0].result ?? 0n,
    totalMerged: data?.[1].result ?? 0n,
    isLoading
  }
}