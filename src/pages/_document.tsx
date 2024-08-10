import { Html, Head, Main, NextScript } from "next/document";
import { verdana } from "~/fonts";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/fav.svg" />
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/fav.svg" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/fav.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000" />
        <meta name="theme-color" content="#000" />
        <title>WEWE Swap</title>
        <meta
          name="description"
          content="Click MERGE to burn your $WEWE and receive $VULT. Starting price is 1,000 $WEWE to 1 $VULT, but this will rise. Your $VULT will be locked until the public launch."
        />
        <meta name="author" content="wewe swap" />
        <meta
          name="keywords"
          content="WeWe app,WeWe Swap,WeWe Token,DeFi,MEME,MEME Coin,DeFi,USDC Yield,Yields,Earnings,Chaos,Pools"
        />
        <meta
          property="og:title"
          content="Together We Earn - WEWESWAP"
        />
        <meta property="og:description" content="$WEWE | | $CHAOS" />
        <meta property="og:url" content="https://app.weweswap.com" />
        <meta property="og:site_name" content="WEWE Swap" />
        <meta
          property="og:image"
          content="https://app.weweswap.com/img/wewe-thumbnail.png"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="app.weweswap.com" />
        <meta
          name="twitter:title"
          content="Together We Earn - WEWESWAP"
        />
        <meta name="twitter:description" content="$WEWE | | $CHAOS" />
        <meta
          name="twitter:image"
          content="https://app.weweswap.com/img/wewe-thumbnail.png"
        />
      </Head>
      <body className={verdana.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
