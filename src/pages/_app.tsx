import "@rainbow-me/rainbowkit/styles.css";
import "@mantine/core/styles.css";
import "~/styles/globals.css";
import { type AppType } from "next/app";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import WagmiProviderComp from "~/lib/wagmiProvider";
import { NavBar } from "~/components/ui";
import { theme } from "~/theme";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <DirectionProvider>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <WagmiProviderComp>
          <main>
            <NavBar />
            <div className="flex flex-col items-center p-4">
              <div className="w-full max-w-[845px] flex flex-col items-center gap-5">
                <Component {...pageProps} />
              </div>
            </div>
          </main>
        </WagmiProviderComp>
      </MantineProvider>
    </DirectionProvider>
  );
};

export default App;
