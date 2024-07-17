"use client";

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { base, mainnet } from "wagmi/chains";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

export const projectId = "db99d4d311764dbfb7e4563ce13e71fb";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Vampire Attack",
  description: "Vampire Attack WebApp",
  icons: [
    "/apple-touch-icon.png",
    "/favicon-32x32.png",
    "/favicon-16x16.png",
    "/safari-pinned-tab.svg",
  ],
  url: "https://app.vampireattack.com",
};

const { connectors } = getDefaultWallets({
  appName: "vampire-attack",
  projectId,
});

export const config = defaultWagmiConfig({
  chains: [mainnet, base],
  connectors,
  projectId,
  metadata,
  ssr: true,
});
