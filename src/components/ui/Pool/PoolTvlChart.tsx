import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Hex } from "viem";
import { Typography } from "~/components/common";
import LoadingScreen from "~/components/common/LoadingScreen";
import { API_BASE_URL } from "~/constants/configs";
import { formatDollarValueNumber } from "~/utils";

interface PoolTvlChartProps {
  address: Hex,
  timeFrame: string
}

interface TvlResponse {
  timestamp: number,
  tvl: number
}

export const PoolTvlChart = ({ address, timeFrame }: PoolTvlChartProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["pool-tvl-chart", timeFrame],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const response = await axios.get<TvlResponse[]>(`${API_BASE_URL}/tvl/${address}`, {
        params: {
          timeframe: timeFrame === "1D" ? "daily" : "weekly"
        }
      });

      return response.data.map((item) => {
        return {
          timestamp: item.timestamp * 1000,
          tvl: item.tvl
        }
      });
    },
  });

  if (isLoading) return <LoadingScreen />

  if (!data) return (
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
            console.log(value, name, props)
            return [formatDollarValueNumber(value as string), "TVL"]
          }}
          labelFormatter={(v) => dayjs(v).format("DD.MMM YYYY HH:mm")}
        />
        <Area type="monotone" dataKey="tvl" stroke="#33e6bf" fill="#33e6bf" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
