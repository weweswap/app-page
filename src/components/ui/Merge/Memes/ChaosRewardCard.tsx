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
        className="text-center font-black text-yellow"
      >
        CURRENT <br />
        {mergeConfig.inputToken.symbol}:WEWE RATIO
      </Typography>

      <Typography size="lg" secondary className="mb-3">
        1:{rate}
      </Typography>

      <Typography size="xs" className="mb-5 text-center">
        BE FAST. RATIO WILL DROP TO ZERO BY THE END OF THE MERGE.
      </Typography>

      <Typography
        size="sm"
        secondary
        className="text-center font-black text-yellow"
      >
        CURRENT <br />
        CHAOS MULTIPLIER
      </Typography>

      <Typography size="lg" className="mb-3" secondary>
        5X
      </Typography>

      <Typography size="xs" className="text-center">
        HIGHEST MULTIPLIER OUTSET. <br />
        DETERMINES ALLOCATION TO FUTURE $WEWE AIRDROP.
      </Typography>
    </div>
  );
};
