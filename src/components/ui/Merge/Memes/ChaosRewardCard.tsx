import dayjs from "dayjs";
import { Typography } from "~/components/common";
import { MergeConfig } from "~/constants/mergeConfigs";
import { useMemeEaterRate } from "~/hooks/useMemeEater";

interface ChaosRewardCardProps {
  mergeConfig: MergeConfig;
}

export const ChaosRewardCard = ({ mergeConfig }: ChaosRewardCardProps) => {
  const { rate } = useMemeEaterRate(mergeConfig.eaterContractAddress);
  const daysPassedSinceMerge = dayjs().diff(mergeConfig.mergeStartTimestamp, "day");
  console.log(daysPassedSinceMerge)

  return (
    <div className="flex flex-col items-center gap-4 py-5">
      <Typography
        size="sm"
        secondary
        className="font-black text-yellow text-center">
        CURRENT <br />
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
        BE FAST. RATIO WILL DROP HARD BY THE END OF THE MERGE.
      </Typography>

      <Typography
        size="sm"
        secondary
        className="font-black text-yellow text-center">
        CURRENT <br />
        CHAOS MULTIPLIER
      </Typography>

      <Typography
        size="lg"
        className="mb-3"
        secondary
      >
        {
          daysPassedSinceMerge < 1 ? "10X" : daysPassedSinceMerge < 2 ? "5X" : "2X"
        }
      </Typography>

      <Typography
        size="xs"
        className="text-center"
      >
        HIGHEST MULTIPLIER OUTSET. <br />
        DETERMINES ALLOCATION TO FUTURE $WEWE AIRDROP.
      </Typography>

    </div>
  );
}