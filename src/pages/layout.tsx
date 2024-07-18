"use server";

import "./styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "@mantine/core/styles.css";
import WagmiProviderComp from "@/lib/wagmiProvider";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import { Montserrat } from "next/font/google";
import NavBar from "../components/ui/NavBar";
import { theme } from "../theme";
import { Metadata } from "next";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WEWE - Together We Earn",
  description: "WeWe Swap - Together We Earn",
  metadataBase: new URL("https://weweswap.com"),
  keywords: ["WeWe", "WeWe Swap", "WeWe Token"],
  authors: [{ name: "Wewe" }, { name: "Wewe", url: "weweswap.com" }],
  openGraph: {
    siteName: "WeWe",
    title: "WeWe - Together We Earn ",
    description: "We Love Yields!",
    url: "https://weweswap.com",
    type: "website",
    images: "https://weweswap.com/img/wewe-thumbnail.png",
  },
  twitter: {
    site: "weweswap.com",
    card: "summary_large_image",
    title: "WeWe - Together We Earn",
    description: "We Love Yields!",
    images: "https://weweswap.com/img/wewe-thumbnail.png",
  },
  icons: {
    icon: "fav.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DirectionProvider>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            <WagmiProviderComp>
              <main className={montserrat.className}>
                <NavBar />
                <div className="w-full text-white flex flex-col items-center p-4">
                  {children}
                </div>
              </main>
            </WagmiProviderComp>
          </MantineProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
