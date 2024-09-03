import { ethers, BigNumberish } from "ethers";

// import {
//   Pool,
//   Position,
//   NonfungiblePositionManager,
//   nearestUsableTick,
//   TickMath,
// } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import INONFUNGIBLE_POSITION_MANAGER from "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json";
import { ERC20Abi } from "~/lib/abis";

interface PositionInfo {
  tickLower: number;
  tickUpper: number;
  liquidity: BigInt;
  feeGrowthInside0LastX128: BigNumberish;
  feeGrowthInside1LastX128: BigNumberish;
  tokensOwed0: BigNumberish;
  tokensOwed1: BigNumberish;
  token0Name?: string;
  token1Name?: string;
}

const provider = new ethers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/3945d43169834eb0beda940e0933af3c"
);
const positionManagerAddress = "0xc36442b4a4522e871399cd717abdd847ab11fe88";

const positionManager = new ethers.Contract(
  positionManagerAddress,
  INONFUNGIBLE_POSITION_MANAGER.abi,
  provider
);

export async function getTokenNames(
  token0Address: string,
  token1Address: string
): Promise<{ token0Name: string; token1Name: string }> {
  const token0Contract = new ethers.Contract(token0Address, ERC20Abi, provider);
  const token1Contract = new ethers.Contract(token1Address, ERC20Abi, provider);

  const [token0Name, token1Name] = await Promise.all([
    token0Contract.name(),
    token1Contract.name(),
  ]);

  return { token0Name, token1Name };
}
export async function getTokenSymbols(
  token0Address: string,
  token1Address: string
): Promise<{ token0Name: string; token1Name: string }> {
  const token0Contract = new ethers.Contract(token0Address, ERC20Abi, provider);
  const token1Contract = new ethers.Contract(token1Address, ERC20Abi, provider);

  const [token0Name, token1Name] = await Promise.all([
    token0Contract.symbol(),
    token1Contract.symbol(),
  ]);

  return { token0Name, token1Name };
}

export async function getPositions(address: any) {
  const balance = await positionManager.balanceOf(address);
  const positions = [];

  for (let i = 0; i < balance; i++) {
    const tokenId = await positionManager.tokenOfOwnerByIndex(address, i);
    const position = await positionManager.positions(tokenId);
    positions.push(position);
  }

  const positionInfos = positions.map((position) => {
    return {
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
  console.log(positionInfos);

  console.log(
    getTokenNames(
      positionInfos[0].token0Address,
      positionInfos[0].token1Address
    )
  );

  return positionInfos;
}
