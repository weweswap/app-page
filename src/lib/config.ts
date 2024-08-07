"use client";

import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  phantomWallet,
} from "@rainbow-me/rainbowkit/wallets";

export const projectId = "db99d4d311764dbfb7e4563ce13e71fb";

if (!projectId) throw new Error("Project ID is not defined");

const connectors = connectorsForWallets(
  [
    {
      groupName: "Suggested",
      wallets: [
        rainbowWallet,
        metaMaskWallet,
        coinbaseWallet,
        walletConnectWallet,
        phantomWallet,
      ],
    },
  ],
  { appName: "WEWE App", projectId }
);

export const config = createConfig({
  chains: [mainnet],
  connectors,
  ssr: true,
  transports: {
    [mainnet.id]: http(),
  },
});
