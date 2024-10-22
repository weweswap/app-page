import { Hex } from "viem"
import { TokenItem } from "~/models"
import { Chain } from "./chains";


export interface MergeConfig {
  eaterContractAddress: Hex;
  inputToken: TokenItem;
  uniAdaptorAddress: Hex;
}

const goodleMergeConfig: MergeConfig = {
  eaterContractAddress: "0x2C56C080451d86eb708B44F8b5942cf797acC6be" as `0x${string}`,
  inputToken: {
    chain: Chain.BASE,
    symbol: "GOODLE",
    address: "0x9F235D23354857EfE6c541dB92a9eF1877689BCB" as `0x${string}`,
    icon: "/img/tokens/goodle.svg",
    decimals: 18,
  },
  uniAdaptorAddress: "0xbb1a07e99f7638dcC730b523e1b107FdC7c379Ac" as `0x${string}`,
}


export const slugToMergeConfig: Record<string, MergeConfig> = {
  goodle: goodleMergeConfig
}