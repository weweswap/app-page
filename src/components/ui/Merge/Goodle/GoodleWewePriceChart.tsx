import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Typography } from "~/components/common";
import { LoadingScreen } from "~/components/common/LoadingScreen";
import { API_BASE_URL } from "~/constants/configs";
import { formatNumber } from "~/utils";

interface PriceResponse {
  timestamp: number,
  wewePrice: number,
  mergeCoinPrice: number
}

export const GoodleWewePriceChart = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["goodle-wewe-price-chart"],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const response = await axios.get<PriceResponse[]>(`${API_BASE_URL}/merge/goodle`, {
        params: {
          timeframe:  "daily",
        }
      });

      return response.data.map((item) => {
        return {
          ...item,
          timestamp: item.timestamp * 1000,
        }
      });
    },
  });

  if (isLoading) return <LoadingScreen />

  if (!data || data.length === 0) return (
    <Typography secondary className='h-full flex justify-center items-center text-center py-10 font-bold' size='xl'>
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
          tickFormatter={(v) => dayjs(v).format("HH:mm")}
        />
        <YAxis
          axisLine={false}
          width={70}
          tickLine={false}
          className="text-xs"
          tickFormatter={(v) => `$${formatNumber(v, { decimalDigits: 7 })}`}
        />
        <Tooltip
          cursor={{ radius: 3, fillOpacity: 0.1 }}
          contentStyle={{ backgroundColor: "rgba(0,0,0,0.7)", border: "none", fontSize: "14px" }}
          formatter={(value, name) => {
            return [`$${formatNumber(value as number, { decimalDigits: 7 })}`, name === "wewePrice" ? "WEWE Price" : "Goodle Price"]
          }}
          labelFormatter={(v) => dayjs(v).format("DD.MMM YYYY HH:mm")}
        />
        <Area type="monotone" dataKey="wewePrice" stroke="#33e6bf" fill="#33e6bf" />
        <Area type="monotone" dataKey="mergeCoinPrice" stroke="#fce405" fill="#fce405" />
      </AreaChart>
    </ResponsiveContainer>
  );
};