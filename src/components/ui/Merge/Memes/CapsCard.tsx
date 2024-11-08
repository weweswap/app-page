import { Typography } from "~/components/common";
import { MergeConfig } from "~/constants/mergeConfigs";
import { useMemeEaterCapsInfo } from "~/hooks/useMemeEater";
import * as dn from "dnum";

interface CapsCardProps {
  mergeConfig: MergeConfig;
}
export function CapsCard({mergeConfig}: CapsCardProps) {
  const { maxSupply, totalMerged } = useMemeEaterCapsInfo(mergeConfig.eaterContractAddress);
  const capsFilledPercentage = maxSupply === 0n ? 0 :  dn.toNumber(dn.mul(dn.div(totalMerged, maxSupply), 100), 0);

  return (
    <div className='text-center py-10 font-bold'>
      <Typography secondary className='text-center font-bold mb-5' size='sm'>
        {dn.format([maxSupply, mergeConfig.inputToken.decimals], { compact: true, locale: 'en' })} OF {mergeConfig.inputToken.symbol} CAPS 
      </Typography>
      <div className="w-full relative h-4 my-5">
      <div
        className="bg-blue-500 h-4 transition-all duration-300"
        style={{
          background: 'linear-gradient(to left,red, orange, yellow, green)',
        }}
      />
      <div style={{
        width: `${100 - capsFilledPercentage}%`
      }} className="absolute top-0 right-0 h-4 bg-slate-400"></div>
    </div>

      <Typography secondary className='text-center font-bold' size='sm'>
        {capsFilledPercentage}% CAPS FILLED
      </Typography>
    </div>
  );
}