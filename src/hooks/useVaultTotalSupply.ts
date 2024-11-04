import { WewePool } from '~/hooks/usePool';
import { useReadContract } from "wagmi";
import { ArrakisVaultABI } from '~/lib/abis/ArrakisVault';
import { BigNumberish, ethers } from 'ethers';


export function useVaultTotalSupply( selectedPool:WewePool | undefined): { totalSupply: bigint | null } {


    const { data } = useReadContract({
      abi: ArrakisVaultABI,
      functionName: "totalSupply",
      address: selectedPool?.address as `0x${string}`,
      args: [],
    }) as { data: bigint | null };
  
    return {
      totalSupply: data
    };
  }