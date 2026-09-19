import type { AppProps } from "next/app";
import Head from "next/head";
import TvShell from "@/components/tv-shell/tv-shell";
import "@/styles/globals.scss";
import "@/styles/variables.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CampbellMBXJ | Senior Software Engineer</title>
        <meta name="description" content="The software portfolio of Campbell Mercer-Butcher" />
        <link rel="shortcut icon" href="/images/favicon.gif" />
      </Head>
      <TvShell><Component {...pageProps} /></TvShell>
    </>
  );
}
