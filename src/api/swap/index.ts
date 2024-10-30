import { Chain } from "~/constants";
import { RouterApiResponse, RouteSummary, TokenItem } from "~/models";
import axios from "axios";

const AGGREGATOR_KYBERSWAP_BASEURL = "https://aggregator-api.kyberswap.com";
const CLIENT_ID = "weweswap";

const api = axios.create({
  baseURL: AGGREGATOR_KYBERSWAP_BASEURL,
  headers: { accept: "application/json", "x-client-id": CLIENT_ID },
});

export default {
  router: {
    get: async (
      chain: Chain,
      tokenIn: TokenItem,
      amountIn: number,
      tokenOut: TokenItem
    ) => {
      const amountInFormatted = (
        amountIn *
        10 ** tokenIn.decimals
      ).toLocaleString("fullwide", { useGrouping: false });
      const targetPathConfig = {
        params: {
          tokenIn: tokenIn.address,
          tokenOut: tokenOut.address,
          amountIn: amountInFormatted,
          gasInclude: "true",
          source: CLIENT_ID,
        },
      };
      return await api.get<RouterApiResponse>(
        `${chain.toLowerCase()}/api/v1/routes?${new URLSearchParams(
          targetPathConfig.params
        )}`
      );
    },
    build: async (
      chain: Chain,
      routeSummary: RouteSummary,
      address: `0x${string}`,
      slippage: number
    ) => {
      const requestBody = {
        routeSummary: routeSummary,
        sender: address,
        recipient: address,
        slippageTolerance: slippage,
        enableGasEstimation: true,
        skipSimulateTx: false,
        deadline: Math.floor(new Date().getTime() / 1000) + 1200,
        source: CLIENT_ID,
      };
      return await api.post<RouterApiResponse>(
        `/${chain.toLocaleLowerCase()}/api/v1/route/build`,
        JSON.stringify(requestBody)
      );
    },
  },
};
