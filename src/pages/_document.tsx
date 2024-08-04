import { Html, Head, Main, NextScript } from "next/document";
import { dogica } from "~/fonts";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/fav.svg" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/fav.svg" />
        <link rel="icon" type="image/svg" sizes="16x16" href="/fav.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000" />
        <meta name="theme-color" content="#000" />
        <title>WEWE Swap</title>
      </Head>
      <body className={dogica.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
