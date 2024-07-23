import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/fav.jpg" />
        <link rel="icon" type="image/jpeg" sizes="32x32" href="/fav.jpg" />
        <link rel="icon" type="image/jpeg" sizes="16x16" href="/fav.jpg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000" />
        <meta name="theme-color" content="#000" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
