import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/layout/layout";
import "../styles/globals.scss";
import "../styles/variables.scss";
import "../styles/range-input.scss";
import ControlsProvider from "../contexts/controls";

type GetChannel = () => number;

export type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getChannel: GetChannel;
};

type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
};

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <div>
      <ControlsProvider>
        <Head>
          <title>CampbellMBXJ | Software Engineer</title>
          <meta
            name="description"
            content="The software portfolio of Campbell Mercer-Butcher"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout channel={Component.getChannel()}>
          <Component {...pageProps} />
        </Layout>
      </ControlsProvider>
    </div>
  );
}

export default MyApp;
