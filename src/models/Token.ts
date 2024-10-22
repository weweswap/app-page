import { Hex } from "viem";
import { Chain } from "~/constants";

export interface TokenItem {
  chain: Chain;
  symbol: string;
  address:Hex;
  icon: string;
  decimals: number;
  disabled: boolean
}
