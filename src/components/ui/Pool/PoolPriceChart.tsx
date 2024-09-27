import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Hex } from "viem";
import { Typography } from "~/components/common";
import { LoadingScreen } from "~/components/common/LoadingScreen";
import { API_BASE_URL } from "~/constants/configs";
import { formatDollarValueNumber } from "~/utils";

interface PoolPriceChartProps {
  address: Hex,
  timeFrame: string
}

interface PriceResponse {
  timestamp: number,
  price: number
}

export const PoolPriceChart = ({ address, timeFrame }: PoolPriceChartProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["pool-price-chart", address, timeFrame],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const response = await axios.get<PriceResponse[]>(`${API_BASE_URL}/price/${address}`, {
        params: {
          timeframe: timeFrame === "1D" ? "daily" : "weekly"
        }
      });

      return response.data.map((item) => {
        return {
          timestamp: item.timestamp * 1000,
          price: item.price
        }
      });
    },
  });

  if (isLoading) return <LoadingScreen />

  if (!data || data.length === 0) return (
    <Typography secondary className='text-center py-10 font-bold' size='xl'>
      NOTHING TO SHOW HERE
    </Typography>
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
      >
        <XAxis
          axisLine={false}
          tickLine={false}
          className="text-xs"
          dataKey="timestamp"
          padding="gap"
          allowDuplicatedCategory={false}
          minTickGap={0}
          tickFormatter={(v) => dayjs(v).format(timeFrame === "1W" ? "DD.MMM HH:mm" : "HH:mm")}
        />
        <YAxis
          axisLine={false}
          width={40}
          tickLine={false}
          className="text-xs"
          tickFormatter={formatDollarValueNumber}
        />
        <Tooltip
          cursor={{ radius: 3, fillOpacity: 0.1 }}
          contentStyle={{ backgroundColor: "rgba(0,0,0,0.7)", border: "none", fontSize: "14px" }}
          formatter={(value, name, props) => {
            return [formatDollarValueNumber(value as number), "Price"]
          }}
          labelFormatter={(v) => dayjs(v).format("DD.MMM YYYY HH:mm")}
        />
        <Area type="monotone" dataKey="price" stroke="#33e6bf" fill="#33e6bf" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
