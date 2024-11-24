import { Table } from '@mantine/core'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button, Typography } from '~/components/common'
import { slugToMergeConfig } from '~/constants/mergeConfigs'
import { useMemeEaterCapsInfo, useMemeEaterRate } from '~/hooks/useMemeEater'
import * as dn from "dnum";
import { useEaterRate } from '~/hooks/useEater'
import { CONTRACT_ADDRESSES, WEWE_COINGECKO_ID } from '~/constants'
import { useCoinGeckoGetPrice } from '~/hooks/useCoingeckoGetPrice'


interface MergerCardProps  {
    logo: string,
    name: string,
    mergeLink?: string
}

type MergerProps = {
    token: MergerCardProps;
  };

const MergerCards = ({token}:MergerProps) => {

    const tokenName = token?.name?.toLocaleLowerCase()

    const mergeConfig = slugToMergeConfig[tokenName];

    const { rate } = useMemeEaterRate(mergeConfig?.eaterContractAddress);
    const { maxSupply, totalMerged } = useMemeEaterCapsInfo(mergeConfig?.eaterContractAddress);
    const daysPassedSinceMerge = dayjs().diff(mergeConfig?.mergeStartTimestamp, "day");
    
    const snapShotDate = dayjs(mergeConfig?.mergeStartTimestamp);
    const formattedDate = snapShotDate.format('DD/MM/YYYY')
    const capsFilledPercentage = maxSupply === 0n ? 0 :  dn.toNumber(dn.mul(dn.div(totalMerged, maxSupply, 4), 100), 2);

    const { data: tokenPrices } = useCoinGeckoGetPrice([mergeConfig?.tokenCoinGeckoId, WEWE_COINGECKO_ID]);
    const tokenPrice = tokenPrices?.[0] ?? 0;
    const wewePrice = tokenPrices?.[1] ?? 0;

    const premium = (rate*wewePrice/tokenPrice)-1;
    const premiumPercentage = Number(premium*100).toFixed(2);

  return (
    <>
     <Table.Tr>
          <Table.Td>
            <div className="flex items-center gap-2">
              <Image src={token.logo} alt="" height={30} width={30} />
              <Typography size="sm">{token.name}</Typography>
            </div>
          </Table.Td>
          <Table.Td>
            <Typography>
                {!token?.mergeLink || 
                token?.name === "VULT" || 
                token?.name === "BRO" ? 
                  "-": `1:${Math.round(rate)}`}
            </Typography>
          </Table.Td>
          <Table.Td>
            <Typography>
            {premiumPercentage && Number(premiumPercentage) > 0? `${premiumPercentage}%` : "-"}
            </Typography>
          </Table.Td>
          <Table.Td>
            <Typography>
            {!token?.mergeLink ? 
            daysPassedSinceMerge < 1 || 
            token?.name === "VULT" || 
            token?.name === "BRO" || 
            token?.name === "FOMO" ? 
            "-" : "10x" : daysPassedSinceMerge < 2 ? 
            "5x" : "2x"}
            </Typography>
          </Table.Td>
          <Table.Td>
            <Typography>
            {!token?.mergeLink || 
            token?.name === "BRO" || 
            token?.name === "VULT" ? 
            "-" : formattedDate}
            </Typography>
          </Table.Td>
          <Table.Td>
          {!token?.mergeLink ? 
          "-" : capsFilledPercentage === 0 ? 
          `0%` : `${capsFilledPercentage}%`}
          </Table.Td>
          <Table.Td>
          {
        token?.mergeLink ? (
          <Link href={token.mergeLink}>
            <Button
              className="w-full md:w-auto min-w-[5rem]"
              aria-label={`Merge`}
            >
              <Typography
                secondary
                size="xs"
                fw="700"
                tt="uppercase"
              >
                MERGE
              </Typography>
            </Button>
          </Link>) : (
          <Button
            className="w-full md:w-auto min-w-[6rem]"
            aria-label={`Merge`}
            disabled
          >
            <Typography
              secondary
              size="xs"
              fw="700"
              tt="uppercase"
            >
              SOON
            </Typography>
          </Button>
        )
      }
          </Table.Td>
        </Table.Tr>
    </>
  )
}

export default MergerCards