import { UseQueryResult } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useQuery } from "wagmi/query";
import { CONTRACT_ADDRESSES, TOKEN_LIST } from "~/constants";
import { ArrakisV2HelperABI } from "~/lib/abis/ArrakisHelper";
import { ArrakisVaultABI } from "~/lib/abis/ArrakisVault";
import { calculateTlvForTokens, WewePool } from "./usePool";
import feeManagerABI from "~/lib/abis/FeeManager";
import { provider } from "./provider";
import * as dn from "dnum";

export type WewePosition = {
  title: string;
  exchangePair: string;
  state: string;
  range: string;
  apr: string;
  shares: string;
  lpValue: string;
  rewards: string;
  positionId: string;
  wewePoolAddress: string;
  pendingUsdcReward: string;
  pendingChaosReward: string;
};

async function getUserBalanceInUsd(
  vaultAddress: string,
  userAddress: string,
  provider: ethers.JsonRpcProvider,
  arrakisHelper: ethers.Contract,
  token0: string,
  token1: string
): Promise<number> {
  const vaultContract = new ethers.Contract(
    vaultAddress,
    ArrakisVaultABI,
    provider
  );

  const [userBalance, totalSupply, tlv] = await Promise.all([
    vaultContract.balanceOf(userAddress),
    vaultContract.totalSupply(),
    calculateTlvForTokens(
      vaultAddress,
      arrakisHelper,
      provider,
      token0,
      token1
    ),
  ]);

  const userPercentage =
    Number(ethers.formatUnits(userBalance.toString())) /
    Number(ethers.formatUnits(totalSupply.toString()));

  const userBalanceInUsd = tlv * userPercentage;

  return userBalanceInUsd;
}

async function getPendingRewards(
  feeManagerAddress: string,
  userAddress: string,
  provider: ethers.JsonRpcProvider,
  vaultAddress: string
): Promise<{ usdc: string, chaos: string }> {
  const feeManagerContract = new ethers.Contract(
    feeManagerAddress,
    feeManagerABI,
    provider
  );

  const vaultContract = new ethers.Contract(
    vaultAddress,
    ArrakisVaultABI,
    provider
  );

  const [
    userBalance,
    accumulatedRewardsPerShare,
    rewardsPrecision,
    userRewardsDebt,
    chaosRate,
  ] = await Promise.all([
    vaultContract.balanceOf(userAddress),
    feeManagerContract.accumulatedRewardsPerShare(),
    feeManagerContract.REWARDS_PRECISION(),
    feeManagerContract.rewardDebt(userAddress),
    feeManagerContract.rate(),
  ]);

  const totalReward = dn.mul(userBalance, accumulatedRewardsPerShare, Math.log10(rewardsPrecision));

  const pendingToHarvest = dn.sub(totalReward, userRewardsDebt);
  const pendingToHarvestChaos = dn.div(dn.mul(pendingToHarvest, chaosRate), 100);

  return {
    usdc: dn.toString(pendingToHarvest, 6),
    chaos: dn.toString(pendingToHarvestChaos, 6),
  }
}

export function useWewePositions(
  wewePools?: WewePool[],
  address?: string
): UseQueryResult<{ wewePositions: WewePosition[] } | undefined, Error | null> {
  return useQuery({
    queryKey: ["wewe-positions", address],
    queryFn: async (): Promise<{ wewePositions: WewePosition[] }> => {
      if (!wewePools || wewePools.length === 0 || !address) {
        return { wewePositions: [] };
      }

      const wewePositions: WewePosition[] = [];
      const requestsBalances = wewePools.map(async (wewePool) => {
        const vault = new ethers.Contract(
          wewePool.address,
          ArrakisVaultABI,
          provider
        );
        const balance = await vault.balanceOf(address);

        const arrakisHelper = new ethers.Contract(
          CONTRACT_ADDRESSES.helper,
          ArrakisV2HelperABI,
          provider
        );

        const [balanceInUsdc, pendingReward] = await Promise.all([
          getUserBalanceInUsd(
            wewePool.address,
            address,
            provider,
            arrakisHelper,
            await vault.token0(),
            await vault.token1()
          ),
          getPendingRewards(
            CONTRACT_ADDRESSES.feeManager,
            address,
            provider,
            wewePool.address
          ),
        ]);

        return { 
          vault: wewePool, 
          balance, 
          balanceInUsdc, 
          pendingUsdcReward: pendingReward.usdc, 
          pendingChaosReward: pendingReward.chaos 
        };
      });

      const balances = await Promise.all(requestsBalances);

      balances.forEach(
        ({ vault, balance, balanceInUsdc, pendingUsdcReward, pendingChaosReward }) => {
          wewePositions.push({
            title: "EXOTIC 1%",
            exchangePair: vault.type,
            state: "Active",
            range: vault.range,
            apr: vault.apr,
            shares: String(
              parseFloat(
                Number(
                  ethers.formatUnits(balance.toString()).toString()
                ).toFixed(4)
              )
            ),
            lpValue: String(balanceInUsdc),
            rewards: "-",
            positionId: "-",
            wewePoolAddress: vault.address,
            pendingUsdcReward: pendingUsdcReward,
            pendingChaosReward: pendingChaosReward,
          });
        }
      );

      return { wewePositions };
    },
  });
}
