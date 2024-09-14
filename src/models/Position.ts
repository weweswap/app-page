export interface Position {
  tokenId: bigint;
  token0Address: string;
  token1Address: string;
  tickLower: number;
  tickUpper: number;
  liquidity: string;
  feePercent: number;
  feeGrowthInside0LastX128: string;
  feeGrowthInside1LastX128: string;
  tokensOwed0: string;
  tokensOwed1: string;
}
