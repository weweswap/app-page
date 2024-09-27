import { useQuery } from "@tanstack/react-query"
import { Hex } from "viem";
import { request, gql } from "graphql-request";
import { ethers } from "ethers";
import { ArrakisVaultABI } from "~/lib/abis/ArrakisVault";
import { provider } from "~/hooks/provider";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from "dayjs";
import { formatDollarValueNumber } from "~/utils";
import LoadingScreen from "~/components/common/LoadingScreen";
import { Typography } from "~/components/common";


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
  }
}

interface VolumeDailySnapshotResponse {
  liquidityPool?: {
    dailySnapshots: {
      timestamp: string;
      dailyVolumeUSD: string;
    }[];
  }
}

async function fetchOneDayVolume(address: Hex) {
  const arrakisVault = new ethers.Contract(
    address,
    ArrakisVaultABI,
    provider
  );
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
    }`
  });

  return response?.liquidityPool?.hourlySnapshots.map((item) => {
    return {
      timestamp: parseInt(item.timestamp) * 1000,
      value: parseFloat(item.hourlyVolumeUSD)
    }
  }) || [];
}


async function fetchOneWeekVolume(address: Hex) {
  const arrakisVault = new ethers.Contract(
    address,
    ArrakisVaultABI,
    provider
  );
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
    }`
  });

  return response?.liquidityPool?.dailySnapshots.map((item) => {
    return {
      timestamp: parseInt(item.timestamp) * 1000,
      value: parseFloat(item.dailyVolumeUSD)
    }
  }) || [];
}

export const PoolVolumeChart = ({ address, timeFrame }: PoolVolumeChartProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["pool-volume-chart", timeFrame],
    staleTime: 1000 * 60 * 5,
    queryFn: () => timeFrame === "1D" ? fetchOneDayVolume(address) : fetchOneWeekVolume(address),
  });


  if (isLoading) return <LoadingScreen />

  if (!data) return (
    <Typography secondary className='text-center py-10 font-bold' size='xl'>
      NOTHING TO SHOW HERE
    </Typography>
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={[...data].reverse()}
      >
        <XAxis
          axisLine={false}
          tickLine={false}
          className="text-xs"
          dataKey="timestamp"
          padding="gap"
          tickFormatter={(v) => dayjs(v).format(timeFrame === "1W" ? "DD.MMM" : "HH:mm")}
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
            return [formatDollarValueNumber(value as string), "Volume"]
          }}
          labelFormatter={(v) => dayjs(v).format("DD.MMM YYYY HH:mm")}
        />
        <Bar dataKey="value" fill="#32e7bf" radius={3} />
      </BarChart>
    </ResponsiveContainer>
  )
}