import { UseQueryResult } from "@tanstack/react-query";
import { ethers } from "ethers";
import { erc20Abi } from "viem";
import { useQuery } from "wagmi/query";
import { CONTRACT_ADDRESSES, TOKEN_LIST } from "~/constants";
import { ArrakisFactoryABI } from "~/lib/abis/ArrakisFactory";
import { ArrakisV2HelperABI } from "~/lib/abis/ArrakisHelper";
import { ArrakisVaultABI } from "~/lib/abis/ArrakisVault";
import { calculateTlvForTokens, WewePool } from "./usePool";
import feeManagerABI from "~/lib/abis/FeeManager";
import { provider } from "./provider";

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
  wewePoolAddress: string,
  pendingUsdcReward: string
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

async function getPendingUsdcRewards(
  feeManagerAddress: string,
  userAddress: string,
  provider: ethers.JsonRpcProvider,
  vaultAddress: string,
): Promise<string> {
  const feeManagerContract = new ethers.Contract(feeManagerAddress, feeManagerABI, provider);
  const vaultContract = new ethers.Contract(vaultAddress, ArrakisVaultABI, provider);

  const userBalance = await vaultContract.balanceOf(userAddress);
  
  const accumulatedRewardsPerShare = await feeManagerContract.accumulatedRewardsPerShare()
  const rewardsPrecision = await feeManagerContract.REWARDS_PRECISION()
  const userRewardsDebt = await feeManagerContract.rewardDebt(userAddress)

  const totalReward = userBalance * accumulatedRewardsPerShare / rewardsPrecision

  const pendingToHardvest = totalReward - userRewardsDebt

  return ethers.formatUnits(pendingToHardvest, 6).toString();
}

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

        const pendingUsdcReward = await getPendingUsdcRewards(
          CONTRACT_ADDRESSES.feeManager,
          address,
          provider,
          wewePool.address,
        )

        return { vault: wewePool, balance, balanceInUsdc, pendingUsdcReward }
      })

      const balances = await Promise.all(requestsBalances)

      balances.forEach(({ vault, balance, balanceInUsdc, pendingUsdcReward}) => {
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
          wewePoolAddress: vault.address,
          pendingUsdcReward: pendingUsdcReward,
        })
      })

      return { wewePositions };
    },
  });
}