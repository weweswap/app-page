import { Hex } from "viem"
import { TokenItem } from "~/models"
import { Chain } from "./chains";


export interface MergeConfig {
  eaterContractAddress: Hex;
  inputToken: TokenItem;
  uniAdaptorAddress: Hex;
  chartId: string;
}

const fomoMergeConfig: MergeConfig = {
  eaterContractAddress: "0x56080973a9626a3Aa7A7E2e7E5c6cA7A3DeFA5b0" as `0x${string}`,
  inputToken: {
    chain: Chain.BASE,
    symbol: "FOMO",
    address: "0xd327d36EB6E1f250D191cD62497d08b4aaa843Ce" as `0x${string}`,
    icon: "/img/tokens/FOMO.webp",
    decimals: 9,
  },
  uniAdaptorAddress: "0xbb1a07e99f7638dcC730b523e1b107FdC7c379Ac" as `0x${string}`,
  chartId: "father-of-meme-origin",
}


export const slugToMergeConfig: Record<string, MergeConfig> = {
  fomo: fomoMergeConfig
}