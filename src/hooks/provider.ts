import { ethers } from "ethers";

export const provider = new ethers.JsonRpcProvider(
  `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_APIKEY}`
);
