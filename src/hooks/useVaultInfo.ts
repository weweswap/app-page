import { parseAbi } from "viem";
import { useReadContract } from "wagmi";
import { ArrakisV2HelperABI } from "~/lib/abis/ArrakisHelper";
import { WewePool } from "./usePool";
import { ArrakisVaultABI } from "~/lib/abis/ArrakisVault";
import { ethers } from "ethers";

export function useVaultInfo(selectedPool: WewePool | undefined) {

    const { data, isPending, isError, error } = useReadContract({
      abi: ArrakisV2HelperABI,
      functionName: "totalUnderlyingWithFeesAndLeftOver",
      address: selectedPool?.address as `0x${string}`,
      args: [], 
    })
    return {
        data,
        isPending, isError, error
      };

  }
