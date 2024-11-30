import { ethers } from "ethers";
import { CONTRACT_ADDRESSES } from "~/constants";
import { provider } from "~/hooks/provider";
import { COMMON_POOL_CONTRACT_ABI } from "~/lib/abis/CommonPool";

export const fetchWEWEPrice = async () => {
  const contract = new ethers.Contract(
    CONTRACT_ADDRESSES.weweUsdcContract,
    COMMON_POOL_CONTRACT_ABI,
    provider
  );
  const slot0 = await contract.slot0();
  return Math.pow(1.0001, Number(slot0.tick)) * Math.pow(10, 12);
};

export const fetchETHPrice = async () => {
  const contract = new ethers.Contract(
    CONTRACT_ADDRESSES.wethUsdcContract,
    COMMON_POOL_CONTRACT_ABI,
    provider
  );
  const slot0 = await contract.slot0();
  return Math.pow(1.0001, Number(slot0.tick)) * Math.pow(10, 12);
};

const mapTokenUsdcPair = {
  [CONTRACT_ADDRESSES.wewe.toLowerCase()]: CONTRACT_ADDRESSES.weweUsdcContract,
  [CONTRACT_ADDRESSES.weth.toLowerCase()]: CONTRACT_ADDRESSES.wethUsdcContract,
}

export const fetchPricePerAddressInUsdc = async (address: string) => {
  if (CONTRACT_ADDRESSES.usdc.toLowerCase() === address.toLowerCase()) {
    return 1
  }
  if (CONTRACT_ADDRESSES.usdt.toLowerCase() === address.toLowerCase()) {
    return 1
  }

  if (!mapTokenUsdcPair[address.toLowerCase()]) {
    throw Error ('Not supported token on price service')
  }
  const contract = new ethers.Contract(
    mapTokenUsdcPair[address.toLowerCase()],
    COMMON_POOL_CONTRACT_ABI,
    provider
  );
  const slot0 = await contract.slot0();
  return Math.pow(1.0001, Number(slot0.tick)) * Math.pow(10, 12);
}