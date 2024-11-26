import { Hex } from "viem";

interface PoolStaticDetail {
  address: Hex;
  range: string;
}

export const POOLS_BLACKLIST = [
  "0xC3b2FfDE3403Fb9461F2690A72Fa701aE58140Bd", 
  "0xA1dD90A50e423c7D7FEC1408e867606494BcDF2e", 
  "0x137c8040d44e25D2c7677224165Da6Aa0901e33B"
].map(address => address.toLowerCase());

export const PoolsStaticDetail = [
  {
    address: "0x3Fd7957D9F98D46c755685B67dFD8505468A7Cb6",
    range: "INFINITY",
  },
  {
    address: "0xf5E50FA50a9053a03f8dF54bEaA56f1E4870B569",
    range: "0.1%"
  },
  {
    address: "0xb1c7a879de8dd961526433525b85587dcF4BD6ff",
    range: "INFINITY"
  }
]