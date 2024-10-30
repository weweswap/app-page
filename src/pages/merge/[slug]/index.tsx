import React from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Card, Typography } from "~/components/common";
import { CapsCard } from "~/components/ui/Merge/Memes/CapsCard";
import { ChaosRewardCard } from "~/components/ui/Merge/Memes/ChaosRewardCard";
import { MemeClaimForm } from "~/components/ui/Merge/Memes/MemeClaimForm";
import MemeMergeForm from "~/components/ui/Merge/Memes/MemeMergeForm";
import { MergeConfig, slugToMergeConfig } from "~/constants/mergeConfigs";
import { useMemeEaterVestingDuration } from "~/hooks/useMemeEater";

interface MemeMergePageProps {
  mergeConfig: MergeConfig;
}

export const getServerSideProps: GetServerSideProps<
  MemeMergePageProps
> = async ({ params }) => {
  const mergeConfig = slugToMergeConfig[params?.slug as string];

  if (!mergeConfig) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      mergeConfig,
    },
  };
};

const MemeMergePage = ({ mergeConfig }: MemeMergePageProps) => {
  const { vestingDuration } = useMemeEaterVestingDuration(
    mergeConfig.eaterContractAddress
  );

  return (
    <div>
      <Card className="mb-5">
        <Typography secondary size="lg" className="text-center uppercase">
          Last Call to Merge & Upgrade,{" "}
          <span className="text-yellow">
            Merge live until {mergeConfig.mergeDeadline}!
          </span>
        </Typography>
      </Card>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 h-full gap-3 md:col-span-8">
          <Card>
            <div className="items-center justify-between gap-3 text-center md:flex md:text-start">
              <Link href="/merge">
                <Typography secondary size="xl" tt="uppercase">
                  <span>{"<"}</span> MERGE NO&ensp;W
                </Typography>
              </Link>
            </div>
            <div className="mt-5 items-center justify-between gap-3 text-center md:flex md:text-start">
              <Typography
                size="sm"
                tt="uppercase"
                className="text-center md:text-start"
              >
                Merge your coins
              </Typography>
            </div>
          </Card>
          <Card className="border-t-0">
            <div className="my-5 flex flex-col">
              <ul className="text_light_gray list-inside list-decimal text-base font-bold">
                <li>
                  Sacrifice your ${mergeConfig.inputToken.symbol} to get $WEWE
                </li>
                <li>Speed pays. Be fast to get maximum $WEWE and $CHAOS</li>
                <li>Claim your $WEWE in {vestingDuration}</li>
              </ul>
            </div>
          </Card>
          <Card className="border-t-0">
            <div className="mb-10">
              <MemeMergeForm mergeConfig={mergeConfig} />
            </div>
          </Card>
          <Card className="border-t-0">
            <div className="h-full">
              <div id="dexscreener-embed">
                <iframe src={mergeConfig.chartUrl}></iframe>
              </div>
            </div>
          </Card>
        </div>

        <div className="order-1 col-span-12 flex flex-col gap-5 md:order-2 md:col-span-4">
          <Card>
            <MemeClaimForm mergeConfig={mergeConfig} />
          </Card>
          <Card>
            <CapsCard mergeConfig={mergeConfig} />
          </Card>
          <Card>
            <ChaosRewardCard mergeConfig={mergeConfig} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MemeMergePage;
