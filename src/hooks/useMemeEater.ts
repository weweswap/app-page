import { useState } from "react";
import { Hex } from "viem";
import { useAccount, usePublicClient, useReadContract, useWriteContract } from "wagmi";
import MemeEaterAbi from "~/lib/abis/MemeEaterABI";
import * as dn from "dnum";
import { CONTRACT_ADDRESSES } from "~/constants";

export function useMemeEat (eaterAddress: Hex) {
  const [ pendingToConfirm, setPendingToConfirm ] = useState(false)
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
          args: [BigInt(amount), CONTRACT_ADDRESSES.goodleEaterUniAdaptor, '0x'],
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
    const {data, isLoading} = useReadContract({
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
    lockedAmount:  data?.[0] as bigint ?? 0n,
    lockedUntil: data?.[1] as bigint ?? 0n,
    isLoading,
    refetch
  };
}
