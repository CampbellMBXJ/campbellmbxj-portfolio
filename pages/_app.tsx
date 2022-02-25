import "../styles/globals.scss";
import "../styles/variables.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from '../components/layout';
import { NextPage } from 'next';
import { ChannelName } from '../types';

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
      <Head>
        <title>CampbellMBXJ | Portfolio</title>
        <meta
          name="description"
          content="The software portfolio of Campbell Mercer-Butcher"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout channel={Component.getChannel()}>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
