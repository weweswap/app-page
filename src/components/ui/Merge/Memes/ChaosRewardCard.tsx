import { Typography } from "~/components/common";
import { MergeConfig } from "~/constants/mergeConfigs";
import { useMemeEaterRate } from "~/hooks/useMemeEater";

interface ChaosRewardCardProps {
  mergeConfig: MergeConfig;
}

export const ChaosRewardCard = ({ mergeConfig }: ChaosRewardCardProps) => {
  const { rate } = useMemeEaterRate(mergeConfig.eaterContractAddress);
  
  return (
    <div className="flex flex-col items-center gap-4 py-5">
      <Typography
        size="sm"
        secondary
        className="font-black text-yellow">
        {mergeConfig.inputToken.symbol}:WEWE RATIO
      </Typography>

      <Typography
        size="lg"
        secondary
        className="mb-3"
      >
        1:{rate}
      </Typography>

      <Typography
        size="xs"
        className="text-center mb-5"
        >
        Merge your tokens early to get a premium on your tokens!
      </Typography>

      <Typography
        size="sm"
        secondary
        className="font-black text-yellow">
        CHAOS MULTIPLIER
      </Typography>

      <Typography
        size="lg"
        className="mb-3"
        secondary
      >
        5X
      </Typography>

      <Typography
        size="xs"
        className="text-center"
        >
        Get rewarded for merging EARLY! <br />
        More CHAOS points if you merge NOW!
      </Typography>

    </div>
  );
}