import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "~/constants/configs";
import axios from "axios";

type TokenPriceResponse = {
  [key: string]: {
    usd: number;
  };
};

export const useCoinGeckoGetPrice = (tokenIds: string[]) => {
  const query = useQuery({
    queryKey: ["token-price", ...tokenIds],
    refetchInterval: 10000,
    queryFn: async () => {
      const response = await axios.get<TokenPriceResponse>(
        `${API_BASE_URL}/coingecko`,
        {
          params: {
            ids: tokenIds.join(","),
            vs_currencies: "usd",
          },
        }
      );

      return tokenIds.map((id) => response.data[id].usd);
    },
  });

  return query;
};
