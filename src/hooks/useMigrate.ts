import { ethers } from "ethers";
import { erc20Abi, Hex } from "viem";
import { useQuery } from "wagmi/query";
import { useWriteContract, useReadContract } from "wagmi";
import { CONTRACT_ADDRESSES } from "~/constants";
import { NonFungiblePositionManagerAbi } from "~/lib/abis/NonFungiblePositionManager";
import { Position } from "~/models";

const provider = new ethers.JsonRpcProvider(
  `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_APIKEY}`
);

const NonFungiblePositionManagerAddress =
  "0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1";

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
        NonFungiblePositionManagerAddress,
        NonFungiblePositionManagerAbi,
        provider
      );
      const balance = await positionManager.balanceOf(address);
      const positions = [];

      for (let i = 0; i < balance; i++) {
        const tokenId = await positionManager.tokenOfOwnerByIndex(address, i);
        const position = await positionManager.positions(tokenId);
        if (
          position.token0 == CONTRACT_ADDRESSES.wethAddress &&
          position.token1 == CONTRACT_ADDRESSES.wewe
          && BigInt(position.liquidity)>0
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
    error: errorCreation,
    isPending: isTxCreating,
    isError: isCreationError,
    writeContractAsync,
  } = useWriteContract();

  const safeTransferFrom = async (userAddress: Hex, tokenID: bigint) => {
    await writeContractAsync({
      abi: NonFungiblePositionManagerAbi,
      address: NonFungiblePositionManagerAddress,
      functionName: "safeTransferFrom",
      args: [userAddress, migrationAddress, tokenID],
    });
  };
  return {
    hash: hash,
    isPending: isTxCreating,
    isError: isCreationError,
    safeTransferFrom,
  };
}
