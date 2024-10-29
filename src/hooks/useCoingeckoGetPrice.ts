import { useQuery } from "@tanstack/react-query"
import axios from "axios";

type TokenPriceResponse = {
  [key: string]: {
    usd: number
  }
}

export const useCoinGeckoGetPrice = (tokenIds: string[]) => {
  const query = useQuery({
    queryKey: ["token-price", ...tokenIds],
    refetchInterval: 10000,
    queryFn: async () => {
      // TODO: should change the base url
      const response = await axios.get<TokenPriceResponse>(`https://app-backend-production-676d.up.railway.app/coingecko`, {
        params: {
          ids: tokenIds.join(","),
          vs_currencies: "usd"
        }
      });

      return tokenIds.map((id) => response.data[id].usd);
    }
  })

  return query;
}