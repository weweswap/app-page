import "@rainbow-me/rainbowkit/styles.css";
import "@mantine/core/styles.css";
import "~/styles/globals.css";
import { type AppType } from "next/app";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import WagmiProviderComp from "~/lib/wagmiProvider";
import { Background, Footer, NavBar } from "~/components/ui";
import { theme } from "~/theme";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <DirectionProvider>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <WagmiProviderComp>
          <main className="overflow-hidden relative text-white w-full min-h-screen flex flex-col items-center justify-between">
            <Background />
            <div className="w-full flex flex-col items-center">
              <NavBar />
              <div className="w-full max-w-[845px] flex flex-col items-center p-4 gap-5">
                <Component {...pageProps} />
              </div>
            </div>
            <Footer />
          </main>
        </WagmiProviderComp>
      </MantineProvider>
    </DirectionProvider>
  );
};

export default App;
