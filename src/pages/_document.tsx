import { Html, Head, Main, NextScript } from "next/document";
import { verdana } from "~/fonts";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
         {/* Google Tag Manager Script */}
         <script
          dangerouslySetInnerHTML={{
            __html: `
             (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WC9Q45VH');
            `,
          }}
        />
        <link rel="apple-touch-icon" type="image/png" sizes="180x180" href="/fav.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/fav.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/fav.png" />
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
      <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WC9Q45VH"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
