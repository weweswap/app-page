import IQuoterABI from "@uniswap/v3-periphery/artifacts/contracts/interfaces/IQuoterV2.sol/IQuoterV2.json";
import NonfungiblePositionManagerAbi from "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json";
import { CONTRACT_ADDRESSES } from "~/constants";
import { Position } from "~/models";
import { ethers } from "ethers";
import { erc20Abi, Hex } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useQuery } from "wagmi/query";

import { provider } from "./provider";

export function useTokenNames(token0Address: string, token1Address: string) {
  return useQuery({
    queryKey: ["tokenNames", token0Address, token1Address],
    queryFn: async () => {
      const token0Contract = new ethers.Contract(
        token0Address,
        erc20Abi,
        provider
      );
      const token1Contract = new ethers.Contract(
        token1Address,
        erc20Abi,
        provider
      );

      const [token0Name, token1Name] = await Promise.all([
        token0Contract.name(),
        token1Contract.name(),
      ]);

      return { token0Name, token1Name };
    },
  });
}

export function useTokenSymbols(token0Address: string, token1Address: string) {
  return useQuery({
    queryKey: ["tokenSymbols", token0Address, token1Address],
    queryFn: async () => {
      const token0Contract = new ethers.Contract(
        token0Address,
        erc20Abi,
        provider
      );
      const token1Contract = new ethers.Contract(
        token1Address,
        erc20Abi,
        provider
      );

      const [token0Symbol, token1Symbol] = await Promise.all([
        token0Contract.symbol(),
        token1Contract.symbol(),
      ]);

      return { token0Symbol, token1Symbol };
    },
  });
}

export function usePositions(address: Hex) {
  return useQuery<Position[], unknown, Position[], string[]>({
    queryKey: ["positions", address],
    queryFn: async () => {
      const positionManager = new ethers.Contract(
        CONTRACT_ADDRESSES.nonFungiblePositionManagerAddress,
        NonfungiblePositionManagerAbi.abi,
        provider
      );
      const balance = await positionManager.balanceOf(address);
      const positions = [];

      for (let i = 0; i < balance; i++) {
        const tokenId = await positionManager.tokenOfOwnerByIndex(address, i);
        const position = await positionManager.positions(tokenId);
        if (
          position.token0 == CONTRACT_ADDRESSES.wethAddress &&
          position.token1 == CONTRACT_ADDRESSES.wewe &&
          BigInt(position.liquidity) > 0
        )
          positions.push({ position, tokenId });
      }
      return positions.map(({ position, tokenId }) => {
        return {
          tokenId: tokenId,
          token0Address: position.token0,
          token1Address: position.token1,
          tickLower: Number(position.tickLower),
          tickUpper: Number(position.tickUpper),
          feePercent: Number(position.fee) / 10000,
          liquidity: BigInt(position.liquidity).toString(),
          feeGrowthInside0LastX128: BigInt(
            position.feeGrowthInside0LastX128
          ).toString(),
          feeGrowthInside1LastX128: BigInt(
            position.feeGrowthInside1LastX128
          ).toString(),
          tokensOwed0: BigInt(position.tokensOwed0).toString(),
          tokensOwed1: BigInt(position.tokensOwed1).toString(),
        };
      });
    },
  });
}

export function useSafeTransfer() {
  const migrationAddress = CONTRACT_ADDRESSES.migration;
  const {
    data: hash,
    isPending: isTxCreating,
    isError: isCreationError,
    writeContractAsync,
  } = useWriteContract();
  const {
    isLoading: isTxConfirming,
    isError: isConfirmError,
    isSuccess: isConfirmed,
    data: receipt,
  } = useWaitForTransactionReceipt({ hash });

  const safeTransferFrom = async (
    userAddress: Hex,
    tokenID: bigint,
    amountIn: bigint
  ) => {
    const expectedAmount = await getMinAmount(
      CONTRACT_ADDRESSES.wethAddress,
      CONTRACT_ADDRESSES.usdc,
      amountIn
    );

    const amountOutMinimum = ethers.AbiCoder.defaultAbiCoder().encode(
      ["uint256"],
      [expectedAmount]
    );

    await writeContractAsync({
      abi: NonfungiblePositionManagerAbi.abi,
      address: CONTRACT_ADDRESSES.nonFungiblePositionManagerAddress,
      functionName: "safeTransferFrom",
      args: [userAddress, migrationAddress, tokenID, amountOutMinimum],
    });
  };

  return {
    hash: hash,
    isPending: isTxCreating,
    isError: isCreationError || isConfirmError,
    isTxConfirming,
    isConfirmed,
    receipt,
    safeTransferFrom,
  };
}

export async function getMinAmount(
  tokenInAddress: string,
  tokenOutAddress: string,
  amountIn: bigint,
  slippage: number = 5,
  fee: number = 10000
) {
  if (!tokenInAddress || !tokenOutAddress) {
    return;
  }
  const quoterContract = new ethers.Contract(
    "0x3d4e44eb1374240ce5f1b871ab261cd16335b76a",
    IQuoterABI.abi,
    provider
  );

  const params = {
    tokenIn: tokenInAddress,
    tokenOut: tokenOutAddress,
    fee: fee,
    amountIn: amountIn,
    sqrtPriceLimitX96: 0,
  };

  const { amountOut } =
    await quoterContract.quoteExactInputSingle.staticCall(params);

  const slippageAdjustedAmountOut =
    (BigInt(amountOut) * BigInt(100 - slippage)) / BigInt(100);

  return slippageAdjustedAmountOut;
}
