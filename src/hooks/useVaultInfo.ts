import { parseAbi } from "viem";
import { useReadContract } from "wagmi";
import { ArrakisV2HelperABI } from "~/lib/abis/ArrakisHelper";
import { WewePool } from "./usePool";
import { ArrakisVaultABI } from "~/lib/abis/ArrakisVault";
import { ethers } from "ethers";
import { CONTRACT_ADDRESSES } from "~/constants";

interface VaultData {
  amount0: bigint;
  amount1: bigint;
}

export function useVaultInfo(selectedPool: WewePool | undefined) {

    const { data } = useReadContract({
      abi: ArrakisV2HelperABI,
      functionName: "totalUnderlyingWithFeesAndLeftOver",
      address: CONTRACT_ADDRESSES.arrakisV2Helper,
      args: [selectedPool?.address]
    }) as {data: VaultData}

    return {
      token0UnderlyingAmount: data?.amount0 || BigInt(0),
      token1UnderlyingAmount: data?.amount1 || BigInt(0),
    };

  }
