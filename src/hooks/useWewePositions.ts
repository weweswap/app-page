import { UseQueryResult } from "@tanstack/react-query";
import { ethers } from "ethers";
import { erc20Abi } from "viem";
import { useQuery } from "wagmi/query";
import { CONTRACT_ADDRESSES, TOKEN_LIST } from "~/constants";
import { ArrakisFactoryABI } from "~/lib/abis/ArrakisFactory";
import { ArrakisV2HelperABI } from "~/lib/abis/ArrakisHelper";
import { ArrakisVaultABI } from "~/lib/abis/ArrakisVault";
import { calculateTlvForTokens, WewePool } from "./usePool";

export type WewePosition = {
  title: string,
  exchangePair: string,
  state: string,
  range: string,
  apr: string,
  shares: string,
  lpValue: string,
  rewards: string,
  positionId: string,
}

async function getUserBalanceInUsd(
  vaultAddress: string,
  userAddress: string,
  provider: ethers.JsonRpcProvider,
  arrakisHelper: ethers.Contract,
  token0: string,
  token1: string
): Promise<number> {
  const vaultContract = new ethers.Contract(vaultAddress, ArrakisVaultABI, provider);

  const userBalance = await vaultContract.balanceOf(userAddress);
  const totalSupply = await vaultContract.totalSupply();

  const tlv = await calculateTlvForTokens(vaultAddress, arrakisHelper, provider, token0, token1);

  const userPercentage = Number(ethers.formatUnits(userBalance.toString())) / Number(ethers.formatUnits(totalSupply.toString()));

  const userBalanceInUsd = tlv * userPercentage;

  return userBalanceInUsd;
}


export const provider = new ethers.JsonRpcProvider(
    `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_APIKEY}`
  );

  export function useWewePositions(wewePools?: WewePool[], address?: string): UseQueryResult<{ wewePositions: WewePosition[] } | undefined, Error | null> {
    return useQuery({
      queryKey: ["wewe-positions", address],
      queryFn: async (): Promise<{ wewePositions: WewePosition[] }> => {

        if (!wewePools || wewePools.length === 0 || !address){
          return { wewePositions: [] }
        }

        const wewePositions: WewePosition[] = []
        const requestsBalances = wewePools.map(async (wewePool) => {
          const vault = new ethers.Contract(
            wewePool.address,
            ArrakisVaultABI,
            provider
          );
          const balance = await vault.balanceOf(address)

          const arrakisHelper = new ethers.Contract(
            CONTRACT_ADDRESSES.helper,
            ArrakisV2HelperABI,
            provider
          );

          const balanceInUsdc = await getUserBalanceInUsd(
            wewePool.address,
            address,
            provider,
            arrakisHelper,
            await vault.token0(),
            await vault.token1(),
          )

          return { vault: wewePool, balance, balanceInUsdc }
        })

        const balances = await Promise.all(requestsBalances)

        balances.forEach(({ vault, balance, balanceInUsdc}) => {
          wewePositions.push({
            title: "EXOTIC 1%",
            exchangePair: vault.type,
            state: "Active",
            range: vault.range,
            apr: vault.apr,
            shares: String(parseFloat(Number(ethers.formatUnits(balance.toString()).toString()).toFixed(4))),
            lpValue: String(balanceInUsdc),
            rewards: "-",
            positionId: "-",
          })
        })

        return { wewePositions };
      },
    });
  }