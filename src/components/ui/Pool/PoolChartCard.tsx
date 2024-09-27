import { Hex } from "viem";
import { PoolVolumeChart } from "./PoolVolumeChart";

interface PoolChartCardProps {
  address: Hex;
}

export const PoolChartCard = ({ address }: PoolChartCardProps) => {

  return (
    <div className="w-full h-[300px]">
      <PoolVolumeChart address={address} />
    </div>
  )
}