import "@rainbow-me/rainbowkit/styles.css";
import "@mantine/core/styles.css";
import "~/styles/globals.css";

import { type AppType } from "next/app";
import { usePathname } from "next/navigation";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import { Background, Footer, NavBar } from "~/components/ui";
import WagmiProviderComp from "~/lib/wagmiProvider";
import { theme } from "~/theme";
import { ToastContainer } from "react-toastify";

const App: AppType = ({ Component, pageProps }) => {
  const path = usePathname();

  return (
    <DirectionProvider>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <WagmiProviderComp>
          <main className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden text-white">
            <Background />
            <div className="flex w-full flex-col items-center">
              <NavBar />
              {!path || path.startsWith("/merge") || path === "/redeem" ? (
                <div className="flex w-full max-w-[1245px] flex-col items-center gap-5 p-4">
                  <Component {...pageProps} />
                </div>
              ) : (
                <div
                  className={`w-full ${path == "/swap" ? "max-w-[600px]" : path == "/pools" ? "max-w-[1000px]" : "max-w-[845px]"}  flex flex-col items-center gap-5 p-4`}
                >
                  <Component {...pageProps} />
                </div>
              )}
            </div>
            <ToastContainer />
            <Footer />
          </main>
        </WagmiProviderComp>
      </MantineProvider>
    </DirectionProvider>
  );
};

export default App;
