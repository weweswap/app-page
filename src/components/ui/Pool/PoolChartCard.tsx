import { Hex } from "viem";
import { PoolVolumeChart } from "./PoolVolumeChart";
import { SegmentedControl, Select } from '@mantine/core';
import { useState } from "react";
import { dogica } from "~/fonts";
import { PoolPriceChart } from "./PoolPriceChart";
import { PoolTvlChart } from "./PoolTvlChart";

interface PoolChartCardProps {
  address: Hex;
}

export const PoolChartCard = ({ address }: PoolChartCardProps) => {
  const [chartTimeFrame, setChartTimeFrame] = useState('1D');
  const [chartType, setChartType] = useState('TVL');

  return (
    <div className="h-full w-full">
      <div className="w-full flex items-center justify-between mb-5">
        <SegmentedControl
          value={chartTimeFrame}
          onChange={(value) => setChartTimeFrame(value)}
          radius="0"
          size="sm"
          data={['1D', '1W']}
          classNames={{
            indicator: 'bg_blue',
          }}
        />

        <SegmentedControl
          value={chartType}
          onChange={(value) => setChartType(value)}
          radius="0"
          size="sm"
          data={['TVL', 'Price']}
          classNames={{
            indicator: 'bg_blue',
          }}
        />
      </div>


      <div className="w-full h-[300px] flex items-center justify-center">
        {chartType === 'Volume' && <PoolVolumeChart timeFrame={chartTimeFrame} address={address} />}
        {chartType === 'TVL' && <PoolTvlChart timeFrame={chartTimeFrame} address={address} />}
        {chartType === 'Price' && <PoolPriceChart timeFrame={chartTimeFrame} address={address} />}
      </div>
    </div>
  );
}