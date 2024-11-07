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
  isMergeDisabled: boolean;
}

const fomoMergeConfig: MergeConfig = {
  eaterContractAddress: "0x5F0922b8dF86B028571B84cB943f7Dbb13E3fcB2" as `0x${string}`,
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
  mergeDeadline: dayjs().year(2024).month(9).date(31).format("DD.MMM"),
  isMergeDisabled: false,
}


export const slugToMergeConfig: Record<string, MergeConfig> = {
  fomo: fomoMergeConfig
}