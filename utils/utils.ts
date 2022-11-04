import {ApiPromise, WsProvider} from "@polkadot/api"
import { DEFAULT_NODE_WEBSOCKET_URI } from "./consts";

/**
 * Helper function to instantiate the API and set it in a useState hook.
 * @param apiSetter - the setter function to house the API
 */
export const instantiateApi = async (apiSetter: (api: ApiPromise) => void) => {
    const wsProvider = new WsProvider(DEFAULT_NODE_WEBSOCKET_URI);
    const api = await ApiPromise.create({ provider: wsProvider });
    await api.isReady;
    // Set the api
    apiSetter(api);
  };