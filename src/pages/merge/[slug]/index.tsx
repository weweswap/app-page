import Link from 'next/link'
import React from 'react'
import { Card, Typography } from '~/components/common'
import { useMemeEaterVestingDuration } from '~/hooks/useMemeEater'
import { MemeClaimForm } from '~/components/ui/Merge/Memes/MemeClaimForm'
import { MergeConfig, slugToMergeConfig } from '~/constants/mergeConfigs'
import { GetServerSideProps } from 'next'
import MemeMergeForm from '~/components/ui/Merge/Memes/MemeMergeForm'
import { MergePriceChart } from '~/components/ui/Merge/Memes/MergePriceChart'
import { ChaosRewardCard } from '~/components/ui/Merge/Memes/ChaosRewardCard'

interface MemeMergePageProps {
  mergeConfig: MergeConfig
}

export const getServerSideProps: GetServerSideProps<MemeMergePageProps> = async ({ params }) => {
  const mergeConfig = slugToMergeConfig[params?.slug as string];

  if (!mergeConfig) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      mergeConfig
    }
  }
}

const MemeMergePage = ({mergeConfig}: MemeMergePageProps) => {
  const { vestingDuration } = useMemeEaterVestingDuration(mergeConfig.eaterContractAddress);

  return (
    <div className="gap-5 grid grid-cols-12">
      <div className="md:col-span-8 col-span-12 gap-3 h-[100%]">
        <Card>
          <div className="md:flex items-center justify-between gap-3 text-center md:text-start">
            <Link href="/merge">
              <Typography secondary size="xl" tt="uppercase">
                <span>{"<"}</span>  MERGE NO&ensp;W
              </Typography>
            </Link>
          </div>
          <div className="md:flex items-center justify-between gap-3 text-center md:text-start mt-5">
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
          <div className="flex flex-col my-5">
            <Typography size="lg">MERGE your {mergeConfig.inputToken.symbol} into WEWE</Typography>

            <ul className="list-decimal list-inside pt-3 text-sm text_light_gray">
              <li>Merge your ${mergeConfig.inputToken.symbol} to grab your $WEWE</li>
              <li>Dynamic ratio. The sooner you merge, the more WEWE you get!</li>
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
          <div className="h-[300px]">
            <MergePriceChart tokenName={mergeConfig.inputToken.symbol} chartId={mergeConfig.chartId} />
          </div>
        </Card>
      </div>

      <div className="flex flex-col md:col-span-4 col-span-12 md:order-2 order-1 gap-5">
        <Card>
          <MemeClaimForm mergeConfig={mergeConfig} />
        </Card>
        <Card>
          <ChaosRewardCard mergeConfig={mergeConfig} />
        </Card>
      </div>
    </div>
  )
}

export default MemeMergePage;
