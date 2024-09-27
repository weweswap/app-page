import { useQuery } from "@tanstack/react-query"
import { Hex } from "viem";
import { request, gql } from "graphql-request";
import { ethers } from "ethers";
import { ArrakisVaultABI } from "~/lib/abis/ArrakisVault";
import { provider } from "~/hooks/provider";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from "dayjs";
import { formatDollarValueNumber } from "~/utils";
import { useState } from "react";


interface PoolVolumeChartProps {
  address: Hex;
}

interface VolumeResponse {
  liquidityPool?: {
    hourlySnapshots: {
      timestamp: number;
      hourlyVolumeUSD: string;
    }[];
  }
}
export const PoolVolumeChart = ({ address }: PoolVolumeChartProps) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const {data, isLoading, isError} = useQuery({
    queryKey: ["pool-volumes", "1W"],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const arrakisVault = new ethers.Contract(
        address,
        ArrakisVaultABI,
        provider
      );
      const poolAddressList = await arrakisVault.getPools();

      const response = await request<VolumeResponse>({
      url: process.env.NEXT_PUBLIC_UNI_V3_SUBGRAPH_URL!,
      document: gql`
      query {
        liquidityPool(id: ${poolAddressList[0]}) {
          hourlySnapshots {
            hourlyVolumeUSD,
            timestamp
          },
        }
      }`,
    });

    return response?.liquidityPool?.hourlySnapshots || [];
  }});
  

  console.log(data, isError, isLoading)

  return (
      <ResponsiveContainer width="100%" height="100%"
      >
        <BarChart
          height={300}
          data={data}
          onMouseEnter={() => setIsMouseOver(true)} onMouseLeave={() => setIsMouseOver(false)}
          
        >
          <XAxis axisLine={false} tickLine={false} className="text-xs" dataKey="timestamp" tickFormatter={(timeStr) => dayjs(timeStr * 1000).format("HH:mm")} padding="gap" />
          <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={(v) => formatDollarValueNumber(v)} />
          <Tooltip cursor={{fill: 'gray', radius: 3, markerWidth: "100%"}} />
          <Bar dataKey="hourlyVolumeUSD" fill={isMouseOver ? "#32e7bf61" : "#32e7bf"} radius={3}  activeBar={{ fill : "#32e7bf"}} />
        </BarChart>
      </ResponsiveContainer>
  )
}