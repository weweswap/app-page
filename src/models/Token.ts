import { Chain } from "~/constants";
import { Hex } from "viem";

export interface TokenItem {
  chain: Chain;
  symbol: string;
  address: Hex;
  icon: string;
  decimals: number;
}
