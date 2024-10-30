import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TokenItem } from "~/models";
import { fetchPricePerAddressInUsdc } from "~/services/price";

export function useGetPrices(
  token0?: TokenItem,
  token1?: TokenItem
): UseQueryResult<
  { priceToken0: number; priceToken1: number } | undefined,
  Error | null
> {
  return useQuery({
    queryKey: ["price-tokens", token0, token1],
    queryFn: async (): Promise<{
      priceToken0: number;
      priceToken1: number;
    }> => {
      if (!token0 || !token1) {
        return { priceToken0: 0, priceToken1: 0 };
      }

      const [priceInUsdToken0, priceInUsdToken1] = await Promise.all([
        fetchPricePerAddressInUsdc(token0.address),
        fetchPricePerAddressInUsdc(token1.address),
      ]);

      return {
        priceToken0: priceInUsdToken0,
        priceToken1: priceInUsdToken1,
      };
    },
  });
}
