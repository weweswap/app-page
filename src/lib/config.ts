"use client";

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { base, mainnet } from "wagmi/chains";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

export const projectId = "db99d4d311764dbfb7e4563ce13e71fb";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "WEWE",
  description: "WEWE App",
  icons: ["/fav.svg"],
  url: "https://weweswap.com",
};

const { connectors } = getDefaultWallets({
  appName: "wewe",
  projectId,
});

export const config = defaultWagmiConfig({
  chains: [mainnet, base],
  connectors,
  projectId,
  metadata,
  ssr: true,
});
