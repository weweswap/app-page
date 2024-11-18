import { Hex } from "viem";

interface PoolStaticDetail {
  address: Hex;
  range: string;
}

export const POOLS_BLACKLIST = ["0xC3b2FfDE3403Fb9461F2690A72Fa701aE58140Bd"].map(address => address.toLowerCase());

export const PoolsStaticDetail = [
  {
    address: "0x3Fd7957D9F98D46c755685B67dFD8505468A7Cb6",
    range: "INFINITY",
  },
  {
    address: "0x137c8040d44e25D2c7677224165Da6Aa0901e33B",
    range: "0.1%"
  },
  {
    address: "0xA1dD90A50e423c7D7FEC1408e867606494BcDF2e",
    range: "INFINITY"
  }
]