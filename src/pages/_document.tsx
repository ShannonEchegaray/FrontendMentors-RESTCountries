import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <link
          key="link-google-font"
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          key="link-gstatic-font"
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          key="link-font"
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
