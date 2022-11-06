import Head from "next/head";
import { useEffect, useState } from "react";
import { ApiPromise } from "@polkadot/api";
import numeral from "numeral";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { instantiateApi } from "../utils/utils";
import { useSsc } from "../utils/hooks";

// Key is the offender, value is the offence IDs.
type OffencesMap = Record<string, string[]>;

export default function Home() {
  // instantiate the polkadotJS API connection to the default node
  // TODO: Custom hook
  const [api, setApi] = useState<null | ApiPromise>(null);

  // UseState hooks for our subscriptions
  const [blockHeight, setBlockHeight] = useState<string | undefined>();
  const [offences, setOffences] = useState<
    Record<string, string[]> | undefined
  >();
  const [numOffences, setNumOffences] = useState<number | undefined>();
  const [currentEon, setCurrentEon] = useState<string | undefined>();
  const [_totalIssuance, setTotalIssuance, totalIssuanceSsc] =
    useSsc(undefined);

  useEffect(() => {
    // Call the async function with a sideffect to set the API at the top level.
    instantiateApi(setApi);
  }, []);

  // Set up subscriptions required for this page's data
  // NOTE: Some returns from PolkadotJS are not typed. We could use something like Zod to handle this.
  // I won't, because of time constraints - but could be nice to handle unexpected data.
  // TODO: Remove any
  useEffect(() => {
    if (api) {
      api.query.system.number((blockHeight: any) => {
        setBlockHeight(blockHeight.toJSON());
      });
      // Handles offences //
      api.query.offencesSubspace.reports.entries((offences: any) => {
        const updatedOffences: OffencesMap = {};
        // Set the number of offences by counting the entries
        setNumOffences(offences.length);
        // Roll up the offences into a datastructure keyed by "offender"
        offences.forEach(([offence, offender]: [any, any]) => {
          const offenderOutput = offender.toJSON().offender;
          const offenceOutput = offence.toJSON();
          if (updatedOffences[offenderOutput] === undefined) {
            updatedOffences[offenderOutput] = [];
          }
          updatedOffences[offenderOutput].push(offenceOutput);
        });
        setOffences(updatedOffences);
      });
      // Handles current eon
      api.query.subspace.eonIndex((index: any) => {
        setCurrentEon(index.toJSON());
      });
      // Current Blockheight
      api.query.system.number((blocknum: any) => {
        setBlockHeight(blocknum.toJSON());
      });
      // Total supply
      api.query.balances.totalIssuance((issuance: any) => {
        setTotalIssuance(issuance.toJSON()); // Must be handled with BigNumber
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

      <main className="font-mono vh-100 mx-20">
        {/* This title should be constant */}
        <div className="title-box flex flex-col justify-center font-mono items-center space-y-4 h-[200px]">
          <h1 className="text-2xl">SubMetrics</h1>
          <p>
            This dashboard tracks key, real-time metrics on the subspace
            network. Enjoy!
          </p>
        </div>
        {/* The body of the page -- changes happen here! */}
        <div>
          {/* Pop a full page loading mask while we instantiate the WS connection */}
          {!api && <Loader loadingText="Establishing connection..." />}
          {/* Otherwise, display data */}
          {api && (
            <div className="container flex flex-col space-y-24">
              <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4 md:space-y-0 space-y-4">
                <Card title="Current Eon" value={currentEon} />
                <Card
                  title="Blockheight"
                  value={numeral(blockHeight).format("0,0")}
                />
                <Card
                  title="Offences"
                  value={numeral(numOffences).format("0,0")}
                />
                <Card
                  title="Total Supply"
                  value={numeral(totalIssuanceSsc?.toString()).format("0,0")}
                />
              </div>
              <div className="md:grid md:grid-cols-2 gap-4 h-[45vh] space-y-10 md:space-y-0">
                {/* Offences table */}
                {/* TODO: own component - generic if reused */}
                <div className="flex flex-col space-y-10">
                  <h1 className="text-xl text-center">Offences</h1>
                  <div className="table-wrapper h-[45vh] overflow-y-scroll">
                    <table className="table-fixed w-full">
                      <thead>
                        <tr>
                          <th>Offender</th>
                          <th>Offence IDs</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(offences || []).map((offence) => (
                          <tr className="break-words" key={offence[0]}>
                            <td className="p-4">{offence[0]}</td>
                            <td className="p-4">
                              {offence[1].map((offenceId) => (
                                <p key={offenceId}>{offenceId}</p>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>placeholder</div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
