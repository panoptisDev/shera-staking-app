import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"


// This is the chainId your dApp will work on.
const activeChainId = ChainId.BinanceSmartChainMainnet;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Header />
      <Component {...pageProps} />
      {/* <Footer /> */}
    </ThirdwebProvider>
  );
}

export default MyApp;
