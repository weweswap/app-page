import { Chain } from "~/constants";

export interface TokenItem {
  chain: Chain;
  symbol: string;
  address: `0x${string}`;
  icon: string;
  decimals: number;
}
