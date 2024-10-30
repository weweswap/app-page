import { useState } from "react";
import { SegmentedControl } from "@mantine/core";
import { Hex } from "viem";

import { PoolPriceChart } from "./PoolPriceChart";
import { PoolTvlChart } from "./PoolTvlChart";
import { PoolVolumeChart } from "./PoolVolumeChart";

interface PoolChartCardProps {
  address: Hex;
}

export const PoolChartCard = ({ address }: PoolChartCardProps) => {
  const [chartTimeFrame, setChartTimeFrame] = useState("1D");
  const [chartType, setChartType] = useState("TVL");

  return (
    <div className="size-full">
      <div className="mb-5 flex w-full items-center justify-between">
        <SegmentedControl
          value={chartTimeFrame}
          onChange={(value) => setChartTimeFrame(value)}
          radius="0"
          size="sm"
          data={["1D", "1W"]}
          classNames={{
            indicator: "bg_blue",
          }}
        />

        <SegmentedControl
          value={chartType}
          onChange={(value) => setChartType(value)}
          radius="0"
          size="sm"
          data={["TVL", "Price"]}
          classNames={{
            indicator: "bg_blue",
          }}
        />
      </div>

      <div className="flex h-[300px] w-full items-center justify-center">
        {chartType === "Volume" && (
          <PoolVolumeChart timeFrame={chartTimeFrame} address={address} />
        )}
        {chartType === "TVL" && (
          <PoolTvlChart timeFrame={chartTimeFrame} address={address} />
        )}
        {chartType === "Price" && (
          <PoolPriceChart timeFrame={chartTimeFrame} address={address} />
        )}
      </div>
    </div>
  );
};
