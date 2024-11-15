import { Hex } from "viem"
import { TokenItem } from "~/models"
import { Chain } from "./chains";
import dayjs from "dayjs";


export interface MergeConfig {
  eaterContractAddress: Hex;
  inputToken: TokenItem;
  tokenCoinGeckoId: string;
  uniAdaptorAddress: Hex;
  chartUrl: string;
  mergeDeadline: string;
  mergeStartTimestamp: number;
  isMergeDisabled: boolean;
}

const fomoMergeConfig: MergeConfig = {
  eaterContractAddress: "0xa931E644538768707cf75c26B899440e4302D3Ca" as `0x${string}`,
  inputToken: {
    chain: Chain.BASE,
    symbol: "FOMO",
    address: "0xd327d36EB6E1f250D191cD62497d08b4aaa843Ce" as `0x${string}`,
    icon: "/img/tokens/FOMO.webp",
    decimals: 9,
  },
  tokenCoinGeckoId: "father-of-meme-origin",
  uniAdaptorAddress: "0xbb1a07e99f7638dcC730b523e1b107FdC7c379Ac" as `0x${string}`,
  chartUrl: "https://dexscreener.com/base/0x7bCD8185B7f4171017397993345726E15457B1eE?embed=1&theme=dark&trades=0&info=0",
  mergeDeadline: dayjs(1729787400000).add(7, "day").format("DD.MMM"),
  mergeStartTimestamp: 1729787400000,
  isMergeDisabled: false,
}

const boomerMergeConfig: MergeConfig = {
  eaterContractAddress: "0x11120f499D0A6563f7c70F16310Bb3367d97B0F1" as `0x${string}`,
  inputToken: {
    chain: Chain.BASE,
    symbol: "BOOMER",
    address: "0xcdE172dc5ffC46D228838446c57C1227e0B82049" as `0x${string}`,
    icon: "/img/tokens/boomer.webp",
    decimals: 18,
  },
  tokenCoinGeckoId: "boomer",
  uniAdaptorAddress: "0xbb1a07e99f7638dcC730b523e1b107FdC7c379Ac" as `0x${string}`,
  chartUrl: "https://dexscreener.com/base/0xa926342d7f9324A1DbDe8F5ab77c92706f289b5d?embed=1&theme=dark&trades=0&info=0",
  mergeDeadline: dayjs(1731688200000).add(7, "day").format("DD.MMM"),
  mergeStartTimestamp: 1731688200000,
  isMergeDisabled: false,
}


export const slugToMergeConfig: Record<string, MergeConfig> = {
  fomo: fomoMergeConfig,
  boomer: boomerMergeConfig
}