import Link from 'next/link'
import React from 'react'
import { Card, Typography } from '~/components/common'
import GoodleMergeForm from '~/components/ui/Merge/Goodle/GoodleMergeForm'
import { CONTRACT_ADDRESSES } from '~/constants'
import * as dn from "dnum";
import { GoodleWewePriceChart } from '~/components/ui/Merge/Goodle/GoodleWewePriceChart'
import { useMemeEaterRate, useMemeEaterVestingDuration, useVestingsInfo } from '~/hooks/useMemeEater'
import { GoodleClaimForm } from '~/components/ui/Merge/Goodle/GoodleClaimForm'

const GoodleMergePage = () => {
  const { rate } = useMemeEaterRate(CONTRACT_ADDRESSES.goodleEater);
  const { vestingDuration } = useMemeEaterVestingDuration(CONTRACT_ADDRESSES.goodleEater);

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
            <Typography size="lg">MERGE your GOODLE into WEWE</Typography>

            <ul className="list-decimal list-inside pt-3 text-sm text_light_gray">
              <li>Merge your $GOODLE to grab your $WEWE</li>
              <li>Fixed Rate of <strong>1 $GOODLE to {rate} $WEWE</strong></li>
              <li>Claim your $WEWE in {vestingDuration}</li>
            </ul>
          </div>
        </Card>
        <Card className="border-t-0">
          <div className="mb-10">
            <GoodleMergeForm />
          </div>
        </Card>
        <Card className="border-t-0">
          <div className="h-[300px]">
            <GoodleWewePriceChart />
          </div>
        </Card>
      </div>

      <div className="flex flex-col justify-between md:col-span-4 col-span-12 md:order-2 order-1">
        <Card>
          <GoodleClaimForm
          />
        </Card>
      </div>
    </div>
  )
}

export default GoodleMergePage;
