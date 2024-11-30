import { TokenItem } from "~/models";
import { Chain } from "./chains";

export const ETH_BASE = {
  chain: Chain.BASE,
  symbol: "ETH",
  address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" as `0x${string}`,
  icon: "/img/tokens/eth.base.svg",
  decimals: 18,
};

export const USDC_BASE =   {
  chain: Chain.BASE,
  symbol: "USDC",
  address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913" as `0x${string}`,
  icon: "/img/tokens/usdc.png",
  decimals: 6,
};

export const WEWE =   {
  chain: Chain.BASE,
  symbol: "WEWE",
  address: "0x6b9bb36519538e0C073894E964E90172E1c0B41F" as `0x${string}`,
  icon: "/img/tokens/wewe.png",
  decimals: 18,
};

export const USDT_BASE =   {
  chain: Chain.BASE,
  symbol: "USDT",
  address: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2" as `0x${string}`,
  icon: "/img/tokens/usdt.png",
  decimals: 6,
};

export const WETH_BASE = {
  chain: Chain.BASE,
  symbol: "WETH",
  address: "0x4200000000000000000000000000000000000006" as `0x${string}`,
  icon: "/img/tokens/weth.png",
  decimals: 18,
}

export const TOKEN_LIST: TokenItem[] = [
  ETH_BASE,
  USDC_BASE,
  WEWE,
  USDT_BASE,
  WETH_BASE,
];


export const TO_TOKEN_LIST = [
  {
    symbol: "VULT",
    icon: "/img/tokens/vult.eth.svg",
  },
];


export const FROM_TOKEN_LIST = [
  {
    symbol: "VULT",
    icon: "/img/tokens/vult.base.svg",
  },
];

export const WEWE_COINGECKO_ID = "upside-down-meme";
