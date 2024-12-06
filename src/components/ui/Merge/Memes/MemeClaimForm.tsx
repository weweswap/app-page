import { Button, Typography } from "~/components/common";
import { LoadingScreen } from "~/components/common/LoadingScreen";
import * as dn from "dnum";
import dayjs from "dayjs";
import {
  useMemeEaterVestingDuration,
  useVestingsInfo,
  useMemeEaterIsPaused2,
} from "~/hooks/useMemeEater";
import { useState } from "react";
import { Hex } from "viem";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import ClaimProcessingModal from "./ClaimProcessingModal";
import ClaimCompleteModal from "./ClaimCompleteModal";
import { FailTXModal } from "~/components/common/FailTXModal";
import { MergeConfig } from "~/constants/mergeConfigs";

interface MemeClaimFormProps {
  mergeConfig: MergeConfig;
}

export const MemeClaimForm = ({ mergeConfig }: MemeClaimFormProps) => {
  const { lockedAmount, lockedUntil, isLoading, refetch } = useVestingsInfo(
    mergeConfig.eaterContractAddress
  );
  const { vestingDuration } = useMemeEaterVestingDuration(
    mergeConfig.eaterContractAddress
  );
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { isPaused } = useMemeEaterIsPaused2(mergeConfig.eaterContractAddress);
  const [hash, setHash] = useState<Hex>();

  const remainingHours = dayjs.unix(Number(lockedUntil)).diff(dayjs(), "hours");
  const remainingDays = Math.floor(remainingHours / 24);

  const isClaimActive = () => {
    if (isPaused) {
      return true; // Claiming is paused (disabled)
    }

    return Number(lockedUntil) > Date.now() / 1000;
  };

  const handleClaim = () => {
    isConnected ? setIsProcessing(true) : openConnectModal?.();
  };

  const claimCopy = () => {
    if (isPaused) {
      return "CLAIMING IS PAUSED";
    }

    return isClaimActive() ? "NOT CLAIMABLE:" : "CLAIM YOUR WEWE NOW";
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (lockedAmount === 0n) {
    return (
      <Typography secondary className="text-center py-10 font-bold" size="sm">
        Claim your $WEWE {vestingDuration} after merging!
      </Typography>
    );
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : lockedAmount === 0n ? (
        <Typography secondary className="text-center py-10 font-bold" size="sm">
          Claim your $WEWE {vestingDuration} after merging!
        </Typography>
      ) : (
        <div className="flex flex-col my-5 text-center">
          {isClaimActive() ? (
            <>
              <Typography
                size="sm"
                secondary
                className="font-black text-yellow"
              >
                CLAIM WEWE IN:
              </Typography>

              <Typography size="sm" secondary className="font-black my-10">
                {remainingDays} DAYS {remainingHours % 24} HOURS
              </Typography>
            </>
          ) : (
            <Typography size="sm" secondary className="font-black text-yellow">
              YOU CAN CLAIM YOUR WEWE NOW
            </Typography>
          )}

          <div className="flex flex-col justify-center">
            <Typography
              size="sm"
              secondary
              className="font-black text-yellow mb-5"
            >
              YOUR VESTED $WEWE:
            </Typography>

            <Typography size="sm" secondary className="font-black">
              {dn.format([lockedAmount, 18], { locale: "en", digits: 2 })}
            </Typography>

            <Button
              className="flex items-center justify-center gap-3 mt-5"
              disabled={isClaimActive()}
              onClick={handleClaim}
            >
              <Typography secondary size="sm" fw={700} tt="uppercase">
                {claimCopy()}
              </Typography>
            </Button>
          </div>
        </div>
      )}

      {isProcessing && (
        <ClaimProcessingModal
          opened={isProcessing}
          eaterContractAddress={mergeConfig.eaterContractAddress}
          onTxError={(hash) => {
            setHash(hash);
            setIsFailed(true);
            setIsProcessing(false);
          }}
          onClose={() => {
            setIsProcessing(false);
          }}
          onMergeSuccess={(hash) => {
            setHash(hash);
            setIsComplete(true);
            setIsProcessing(false);
          }}
          onOpen={() => {}}
        />
      )}

      <FailTXModal
        hash={hash as Hex}
        opened={isFailed}
        onClose={() => {
          setIsFailed(false);
          setHash(undefined);
        }}
      />

      <ClaimCompleteModal
        amount={dn.format([lockedAmount, 18], { locale: "en", digits: 2 })}
        hash={hash as Hex}
        onClose={() => {
          setIsComplete(false);
          refetch();
        }}
        opened={isComplete}
      />
    </>
  );
};
