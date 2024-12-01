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

export function useDualDeposit() {
  const [pendingToConfirm, setPendingToConfirm] = useState(false)
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

  if (!amount0Max) {
    amount0Max = "0"
  }

  if (!amount1Max) {
    amount1Max = "0"
  }

  return useQuery({
    queryKey: ["mint-shares-estimation", wewePool, amount0Max, amount1Max],
    queryFn: async (): Promise<any> => {

      if (!wewePool) {
        return { wewePositions: [] }
      }

      const arrakisResolver = new ethers.Contract(
        CONTRACT_ADDRESSES.resolver,
        ArrakisResolverABI,
        provider
      );

      const result = await arrakisResolver.getMintAmounts(wewePool.address, amount0Max, amount1Max)

      return result;
    },
  });
}

export function useEstimateMintShares2(wewePool?: WewePool, amount0Max?: number, amount1Max?: number): UseQueryResult<any | undefined, Error | null> {

  if (!amount0Max) {
    amount0Max = 0
  }

  if (!amount1Max) {
    amount1Max = 0
  }

  return useQuery({
    queryKey: ["mint-shares-estimation", wewePool, amount0Max, amount1Max],
    queryFn: async (): Promise<any> => {

      if (!wewePool) {
        return { wewePositions: [] }
      }

      const token0Decimals: number = wewePool.token0.decimals || 18;
      const token1Decimals: number = wewePool.token1.decimals || 18;

      let _amount0Max = 0n;
      let _amount1Max = 0n;

      try {

        let _amount0MaxString = amount0Max.toString();
        let _amount1MaxString = amount1Max.toString();

        // Use regex to check how many decimals are in the string
        const regex = /^(\d+\.\d{1,6})\d*$|^(\d+)$/;

        if (regex.test(_amount0MaxString)) {
          _amount0MaxString = _amount0MaxString.replace(regex, (match, decimalGroup, integerGroup) => {
            if (decimalGroup) {
              return decimalGroup;
            }
            return integerGroup;
          });
        }

        if (regex.test(_amount0MaxString)) {
          _amount1MaxString = _amount1MaxString.replace(regex, (match, decimalGroup, integerGroup) => {
            if (decimalGroup) {
              return decimalGroup;
            }
            return integerGroup;
          });
        }

        _amount0Max = ethers.parseUnits(_amount0MaxString, token0Decimals);
        _amount1Max = ethers.parseUnits(_amount1MaxString, token1Decimals);
      } catch (e) {
        console.error(e)
      }

      const arrakisResolver = new ethers.Contract(
        CONTRACT_ADDRESSES.resolver,
        ArrakisResolverABI,
        provider
      );

      const result = await arrakisResolver.getMintAmounts(wewePool.address, _amount0Max, _amount1Max)
      return result;
    },
  });
}