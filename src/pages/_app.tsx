import "@rainbow-me/rainbowkit/styles.css";
import "@mantine/core/styles.css";
import "~/styles/globals.css";
import { type AppType } from "next/app";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import WagmiProviderComp from "~/lib/wagmiProvider";
import { Background, Footer, NavBar } from "~/components/ui";
import { theme } from "~/theme";
import { usePathname } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';

const App: AppType = ({ Component, pageProps }) => {
  const path = usePathname();

  return (
    <DirectionProvider>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <WagmiProviderComp>
          <main className="overflow-hidden relative text-white w-full min-h-screen flex flex-col items-center justify-between">
            <Background />
            <div className="w-full flex flex-col items-center">
              <NavBar />
              {!path || (path.startsWith("/merge") || path === "/redeem") ? (
                <div className="w-full max-w-[1245px] flex flex-col items-center p-4 gap-5">
                  <Component {...pageProps} />
                </div>
              ) : (
                <div className={`w-full ${path == "/swap" ? "max-w-[600px]" : path == "/pools" ? "max-w-[1000px]" : "max-w-[845px]"}  flex flex-col items-center p-4 gap-5`} >
                  <Component {...pageProps} />
                </div>
              )}
            </div>
            <ToastContainer />
            <Footer />
          </main>
        </WagmiProviderComp>
      </MantineProvider>
    </DirectionProvider >
  );
};

export default App;
