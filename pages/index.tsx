import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { ApiPromise, WsProvider } from "@polkadot/api";
import Loader from "../components/Loader";
import { DEFAULT_NODE_WEBSOCKET_URI } from "../utils/consts";

export default function Home() {
  // instantiate the polkadotJS API connection to the default node
  // TODO: Custom hook
  const [api, setApi] = useState<null | ApiPromise>(null);

  useEffect(() => {
    // Call the async function with a sideffect to set the API at the top level.
    const instantiateApiAsync = async () => {
      const wsProvider = new WsProvider(DEFAULT_NODE_WEBSOCKET_URI);
      const api = await ApiPromise.create({ provider: wsProvider });
      // Set the api
      setApi(api);
    };
    instantiateApiAsync();
  }, []);

  return (
    <div>
      <Head>
        <title>Subspace - Offensive</title>
        <meta
          name="description"
          content="Tracking offenses on the subspace network"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-mono vh-100">
        {/* This title should be constant */}
        <div className="title-box flex flex-col justify-center font-mono items-center space-y-4 h-[200px]">
          <h1 className="text-2xl">Offensive</h1>
          <p>
            <span className="italic">Offensive</span> tracks all validator
            offenses on the subspace network. Naughty!
          </p>
        </div>
        {/* The body of the page -- changes happen here! */}
        <div>
          {/* Pop a full page loading mask while we instantiate the WS connection */}
          {!api && <Loader loadingText="Establishing connection..." />}
        </div>
      </main>
    </div>
  );
}
