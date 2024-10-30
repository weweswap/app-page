"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, Typography } from "~/components/common";
import { BBroMergeForm } from "~/components/ui/Merge/Bro/BBroMergeForm";
import { BroMergeForm } from "~/components/ui/Merge/Bro/BroMergeForm";
import { CONTRACT_ADDRESSES } from "~/constants";
import { useEaterRate } from "~/hooks/useEater";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import dayjs from "dayjs";
import * as dn from "dnum";

const startDateTimeStamp = 1728288000000;
const endDateTimeStamp = 1733472000000;

const BroMergePage = () => {
  const { rate: broEaterRate } = useEaterRate(CONTRACT_ADDRESSES.broEater);
  const { rate: bbroEaterRate } = useEaterRate(CONTRACT_ADDRESSES.bbroEater);

  const { data: broContractBalance } = useTokenBalance(
    CONTRACT_ADDRESSES.broEater,
    CONTRACT_ADDRESSES.wewe
  );
  const { data: bbroContractBalance } = useTokenBalance(
    CONTRACT_ADDRESSES.bbroEater,
    CONTRACT_ADDRESSES.wewe
  );

  const getDaysRemaining = () => {
    return dayjs(endDateTimeStamp).diff(dayjs(), "day");
  };

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 h-full gap-3 md:col-span-8 xl:w-[45rem]">
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
            <Typography size="lg">MERGE your BRO into WEWE</Typography>

            <ul className="text_light_gray list-inside list-decimal pt-3 text-sm">
              <li>Merge your $BRO to grab your $WEWE</li>
              <li>
                Fixed Rate of 1 $BRO to{" "}
                {dn.format([broEaterRate, 2], { locale: "en" })} $WEWE.
              </li>
              <li>
                Your can Merge $BRO from{" "}
                {dayjs(startDateTimeStamp).format("DD/MM/YY")} to{" "}
                {dayjs(endDateTimeStamp).format("DD/MM/YY")}
              </li>
            </ul>
          </div>
        </Card>

        <Card className="border-t-0 py-10">
          <BroMergeForm />
        </Card>

        <Card className="border-t-0">
          <div className="my-5 flex flex-col">
            <Typography size="lg">MERGE your bBRO into WEWE</Typography>

            <ul className="text_light_gray list-inside list-decimal pt-3 text-sm">
              <li>Merge your $bBRO to grab your $WEWE</li>
              <li>
                Fixed Rate of 1 $bBRO to{" "}
                {dn.format([bbroEaterRate, 2], { locale: "en" })} $WEWE.
              </li>
              <li>
                Your can Merge $bBRO from{" "}
                {dayjs(startDateTimeStamp).format("DD/MM/YY")} to{" "}
                {dayjs(endDateTimeStamp).format("DD/MM/YY")}
              </li>
            </ul>
          </div>
        </Card>

        <Card className="border-t-0 py-10">
          <BBroMergeForm />
        </Card>
      </div>

      <div className="order-1 col-span-12 flex flex-col justify-between md:order-2 md:col-span-4">
        <Card className="h-unset flex flex-col items-center justify-between py-10 md:h-[544px]">
          <div className="flex flex-col items-center">
            <Typography size="sm" secondary className="font-black text-yellow">
              COUNTDOWN
            </Typography>

            <Typography size="lg" secondary className="my-8 font-bold">
              {getDaysRemaining() > 0 ? getDaysRemaining() : 0} DAYS
            </Typography>
          </div>

          <div className="mb-5 flex flex-col items-center">
            <div className="mb-5 flex justify-center gap-2 md:mb-4">
              <Typography size="md" fw={600}>
                Ratio: 1
              </Typography>
              <Image
                src="/img/tokens/bro.svg"
                width={17}
                height={17}
                alt="BRO Logo"
              />

              <Typography size="md" fw={600}>
                ≈ {dn.format([broEaterRate, 2], { locale: "en" })}
              </Typography>

              <Image
                src="/img/tokens/wewe.svg"
                width={17}
                height={17}
                alt="WEWE Logo"
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Typography
              secondary
              size="sm"
              className="my-4 font-black text-yellow"
            >
              AVAILABLE $WEWE:
            </Typography>

            <Typography secondary size="sm" className="font-black">
              {dn.format([broContractBalance, 18], { locale: "en", digits: 0 })}
            </Typography>
          </div>
        </Card>

        <Card className="h-unset flex flex-col items-center justify-between py-10 md:h-[270px]">
          <div className="mb-5 flex flex-col items-center">
            <div className="mb-5 flex justify-center gap-2 md:mb-4">
              <Typography size="md" fw={600}>
                Ratio: 1
              </Typography>
              <Image
                src="/img/tokens/bbro.svg"
                width={17}
                height={17}
                alt="bBRO Logo"
              />

              <Typography size="md" fw={600}>
                ≈ {dn.format([bbroEaterRate, 2], { locale: "en" })}
              </Typography>

              <Image
                src="/img/tokens/wewe.svg"
                width={17}
                height={17}
                alt="WEWE Logo"
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Typography
              secondary
              size="sm"
              className="my-4 font-black text-yellow"
            >
              AVAILABLE $WEWE:
            </Typography>

            <Typography secondary size="sm" className="font-black">
              {dn.format([bbroContractBalance, 18], {
                locale: "en",
                digits: 0,
              })}
            </Typography>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BroMergePage;
