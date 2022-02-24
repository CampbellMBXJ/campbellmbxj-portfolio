import "../styles/globals.scss";
import "../styles/variables.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>CampbellMBXJ | Portfolio</title>
        <meta
          name="description"
          content="The software portfolio of Campbell Mercer-Butcher"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
