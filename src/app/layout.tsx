import "./styles/globals.css";
import "./styles/index.css";
import "@rainbow-me/rainbowkit/styles.css";
import "@mantine/core/styles.css";
import WagmiProviderComp from "@/lib/wagmiProvider";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import { Montserrat } from "next/font/google";
import NavBar from "./shared/NavBar";
import { theme } from "./theme";

const montserrat = Montserrat({ subsets: ["latin"] });

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
