import { useQuery } from "@tanstack/react-query";
import { Typography } from "~/components/common";
import { LoadingScreen } from "~/components/common/LoadingScreen";
import { provider } from "~/hooks/provider";
import { ArrakisVaultABI } from "~/lib/abis/ArrakisVault";
import { formatNumber } from "~/utils";
import dayjs from "dayjs";
import { ethers } from "ethers";
import { gql, request } from "graphql-request";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Hex } from "viem";

interface PoolVolumeChartProps {
  address: Hex;
  timeFrame: string;
}

interface VolumeHourlySnapshotResponse {
  liquidityPool?: {
    hourlySnapshots: {
      timestamp: string;
      hourlyVolumeUSD: string;
    }[];
  };
}

interface VolumeDailySnapshotResponse {
  liquidityPool?: {
    dailySnapshots: {
      timestamp: string;
      dailyVolumeUSD: string;
    }[];
  };
}

async function fetchOneDayVolume(address: Hex) {
  const arrakisVault = new ethers.Contract(address, ArrakisVaultABI, provider);
  const poolAddressList = await arrakisVault.getPools();

  const response = await request<VolumeHourlySnapshotResponse>({
    url: process.env.NEXT_PUBLIC_UNI_V3_SUBGRAPH_URL!,
    document: gql`
    query {
      liquidityPool(id: "${poolAddressList[0]}") {
        hourlySnapshots (first: 25, orderBy: timestamp, orderDirection: desc) {
          hourlyVolumeUSD,
          timestamp
        },
      }
    }`,
  });

  return (
    response?.liquidityPool?.hourlySnapshots.map((item) => {
      return {
        timestamp: parseInt(item.timestamp) * 1000,
        value: parseFloat(item.hourlyVolumeUSD),
      };
    }) || []
  );
}

async function fetchOneWeekVolume(address: Hex) {
  const arrakisVault = new ethers.Contract(address, ArrakisVaultABI, provider);
  const poolAddressList = await arrakisVault.getPools();

  const response = await request<VolumeDailySnapshotResponse>({
    url: process.env.NEXT_PUBLIC_UNI_V3_SUBGRAPH_URL!,
    document: gql`
    query {
      liquidityPool(id: "${poolAddressList[0]}") {
        dailySnapshots (first: 7, orderBy: timestamp, orderDirection: desc) {
          dailyVolumeUSD,
          timestamp
        },
      }
    }`,
  });

  return (
    response?.liquidityPool?.dailySnapshots.map((item) => {
      return {
        timestamp: parseInt(item.timestamp) * 1000,
        value: parseFloat(item.dailyVolumeUSD),
      };
    }) || []
  );
}

export const PoolVolumeChart = ({
  address,
  timeFrame,
}: PoolVolumeChartProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["pool-volume-chart", address, timeFrame],
    staleTime: 1000 * 60 * 5,
    queryFn: () =>
      timeFrame === "1D"
        ? fetchOneDayVolume(address)
        : fetchOneWeekVolume(address),
  });

  if (isLoading) return <LoadingScreen />;

  if (!data || data.length === 0)
    return (
      <Typography secondary className="py-10 text-center font-bold" size="xl">
        NOTHING TO SHOW HERE
      </Typography>
    );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={[...data].reverse()}>
        <XAxis
          axisLine={false}
          tickLine={false}
          className="text-xs"
          dataKey="timestamp"
          padding="gap"
          tickFormatter={(v) =>
            dayjs(v).format(timeFrame === "1W" ? "DD.MMM" : "HH:mm")
          }
        />
        <YAxis
          axisLine={false}
          width={40}
          tickLine={false}
          className="text-xs"
          tickFormatter={(value) =>
            `$${formatNumber(value, { compact: true })}`
          }
        />
        <Tooltip
          cursor={{ radius: 3, fillOpacity: 0.1 }}
          contentStyle={{
            backgroundColor: "rgba(0,0,0,0.7)",
            border: "none",
            fontSize: "14px",
          }}
          formatter={(value) => {
            return [
              `$${formatNumber(value as string, { compact: true })}`,
              "Volume",
            ];
          }}
          labelFormatter={(v) => dayjs(v).format("DD.MMM YYYY HH:mm")}
        />
        <Bar dataKey="value" fill="#32e7bf" radius={3} />
      </BarChart>
    </ResponsiveContainer>
  );
};
