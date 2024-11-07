import { Typography } from "~/components/common";
import { MergeConfig } from "~/constants/mergeConfigs";
import { useMemeEaterIsPaused } from "~/hooks/useMemeEater";

interface CapsCardProps {
  mergeConfig: MergeConfig;
}
export function CapsCard({mergeConfig}: CapsCardProps) {
  const { isPaused } = useMemeEaterIsPaused(mergeConfig.eaterContractAddress);

  return (
    <div className='text-center py-10 font-bold'>
      <Typography secondary className='text-center font-bold mb-5' size='sm'>
        $10K OF WEWE CAPS 
      </Typography>
      <div className="w-full bg-gray-200 h-4 my-5">
      <div
        className="bg-blue-500 h-4 transition-all duration-300"
        style={{
          width: `${90}%`,
          background: 'linear-gradient(to left,red, orange, yellow, green)',
        }}
      />
    </div>

      <Typography secondary className='text-center font-bold text-yellow' size='sm'>
        { isPaused ? "CAPS REACHED" : "CAPS UNFILLED" }
      </Typography>
    </div>
  );
}