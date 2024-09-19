import { ethers } from "ethers";
import { CONTRACT_ADDRESSES } from "~/constants";
import { provider } from "~/hooks/useMigrate";
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
