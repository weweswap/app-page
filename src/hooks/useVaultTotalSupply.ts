import { WewePool } from '~/hooks/usePool';
import { useReadContract } from "wagmi";
import { ArrakisVaultABI } from '~/lib/abis/ArrakisVault';
import { ethers } from 'ethers';

export function useVaultTotalSupply( selectedPool:WewePool | undefined) {

 

    const { isPending, data } = useReadContract({
      abi: ArrakisVaultABI,
      functionName: "totalUnder",
      address: selectedPool?.address as `0x${string}`,
      args: [],
    });
  
    return {
      totalSupply: data,
      isPending,
    };
  }