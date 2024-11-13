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
  mergeDeadline: dayjs().year(2024).month(9).date(31).format("DD.MMM"),
  mergeStartTimestamp: 1731512264447,
  isMergeDisabled: false,
}


export const slugToMergeConfig: Record<string, MergeConfig> = {
  boomer: boomerMergeConfig
}