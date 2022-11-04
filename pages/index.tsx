import Head from "next/head";
import { useEffect, useState } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import Loader from "../components/Loader";
import { instantiateApi } from "../utils/utils";

export default function Home() {
  // instantiate the polkadotJS API connection to the default node
  // TODO: Custom hook
  const [api, setApi] = useState<null | ApiPromise>(null);

  // Subscribed stats for this page
  const [blockHeight, setBlockHeight] = useState<Number>();
  const [offences, setOffences] = useState<any>();

  useEffect(() => {
    // Call the async function with a sideffect to set the API at the top level.
    instantiateApi(setApi);
  }, []);

  // Set up subscriptions required for this page's data
  // NOTE: The responses from polkadotJS are not typed. We could use something like Zod to handle this.
  // TODO: Remove any
  useEffect(() => {
    if (api) {
      api.query.system.number((blockHeight: any) => {
        setBlockHeight(blockHeight.toJSON());
      });
      api.query.offencesSubspace.reports.entries((offences: any) => {
        offences.forEach(([]) => {
          console.log(offence[0].toJSON(), offence[1].toJSON());
        });
      });
    }
  }, [api]);

  return (
    <div>
      <Head>
        <title>Subspace Dashboard</title>
        <meta
          name="description"
          content="An overview dashboard for the subspace network"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-mono vh-100">
        {/* This title should be constant */}
        <div className="title-box flex flex-col justify-center font-mono items-center space-y-4 h-[200px]">
          <h1 className="text-2xl">Subspace Dashboard</h1>
          <p>The dashboard tracks key metrics on the subspace network</p>
        </div>
        {/* The body of the page -- changes happen here! */}
        <div>
          {/* Pop a full page loading mask while we instantiate the WS connection */}
          {!api && <Loader loadingText="Establishing connection..." />}
          {api && <div>Api loaded!</div>}
        </div>
      </main>
    </div>
  );
}
