"use client";

/* eslint-disable */
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader, NumberInput } from "@mantine/core";
import { Button, Card, Typography } from "~/components/common";
import { CONTRACT_ADDRESSES, TOKEN_LIST } from "~/constants";
import { dogica } from "~/fonts";
import {
  useApproveAndCall,
  useQuoteVult,
  useVultBalance,
  useWeweBalance,
} from "~/hooks";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import { fetchWEWEPrice } from "~/services";
import clsx from "clsx";
import { formatEther, formatUnits, parseEther } from "viem";
import { useAccount } from "wagmi";

import BridgeOperation from "./BridgeOperation";
import MergeOperation from "./MergeOperation";
import RedeemOperation from "./RedeemOperation";

type MergeHomeProps = {
  onConversion: () => void;
};

export const MergeHome = (props: MergeHomeProps) => {
  const { address } = useAccount();
  const { data: balanceWewe } = useTokenBalance(
    address,
    CONTRACT_ADDRESSES.wewe
  );
  const { data: balanceVult } = useTokenBalance(
    address,
    CONTRACT_ADDRESSES.vult
  );
  const [operations, setOperations] = useState<number>(0);
  const [amount, setAmount] = useState<string | number>("");
  const amountValue = parseEther(String(amount) ?? 0);
  const { data: quoteAmount, isFetching } = useQuoteVult(amountValue);
  const [wewePrice, setWewePrice] = useState<number>(0);
  const [vultPrice, setVultPrice] = useState<number>(0);
  const [vultFDV, setVultFDV] = useState<number>(0);
  // 1000 ratio
  const { data: ratio, isFetching: isRatioFetching } = useQuoteVult(
    parseEther(String("1000"))
  );
  const { data: weweBalance, isFetching: isWeweBalanceFetching } =
    useWeweBalance();
  const { data: vultBalance, isFetching: isVultBalanceFetching } =
    useVultBalance();
  // fetch wewe price
  useEffect(() => {
    const fetchPrice = async () => {
      setWewePrice(await fetchWEWEPrice());
    };
    fetchPrice();
  }, []);

  const totalVultSupply = 100000000; //100m
  const totalWeweSupply = 100000000000; //100bn
  const virtualBalance = 10000000000; //10bn (fixed from the last update)
  useEffect(() => {
    if (wewePrice > 0) {
      const weweBalanceNumber = Number(formatEther(weweBalance));
      const vultBalanceNumber = Number(formatEther(vultBalance));
      const weweFDV = wewePrice * totalWeweSupply;
      setVultFDV(
        ((weweBalanceNumber + virtualBalance) / totalWeweSupply) *
          weweFDV *
          (totalVultSupply / vultBalanceNumber)
      );
    }
  }, [weweBalance, vultBalance, wewePrice]);

  useEffect(() => {
    if (vultFDV > 0) {
      setVultPrice(vultFDV / totalVultSupply);
    }
  }, [vultFDV, totalVultSupply]);
  const { onWriteAsync: onApproveAndCall, isPending } = useApproveAndCall();

  const handleSelect = (div: number) => {
    setAmount(Number(formatEther(balanceWewe)) / div);
  };

  const handleMerge = () => {
    onApproveAndCall(amountValue);
  };

  function addCommaSeparator(numberString: string) {
    // Convert the string to a number, format it, and convert it back to a string
    return parseFloat(numberString).toLocaleString("en-US");
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 h-full gap-3 md:col-span-8 xl:w-[45rem]">
          <Card>
            <div className="items-center justify-between gap-3 text-center md:flex md:text-start  ">
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

          <Card className="mt-4 ">
            <div className="bg_light_dark mb-5 flex h-[3.3rem] items-center justify-between gap-3 overflow-x-scroll">
              <div
                onClick={() => setOperations(0)}
                className={`${operations === 0 && "nav_selected"} nav`}
              >
                <Typography size="sm">MERGE</Typography>
              </div>
              <div
                onClick={() => setOperations(1)}
                className={`${operations === 1 && "nav_selected"} nav`}
              >
                <Typography size="sm">REDEEM</Typography>
              </div>
              <div
                onClick={() => setOperations(2)}
                className={`${operations === 2 && "nav_selected"} nav`}
              >
                <Typography size="sm">BRIDGE</Typography>
              </div>
            </div>

            {operations === 0 && <MergeOperation />}
            {operations === 1 && <RedeemOperation />}
            {operations === 2 && (
              <BridgeOperation onConversion={props.onConversion} />
            )}
          </Card>
        </div>
        <div className="order-1 col-span-12 h-full md:order-2 md:col-span-4">
          <Card className="relative h-full text-center">
            <Typography
              secondary
              size="md"
              tt="uppercase"
              fw={600}
              className="p-5 leading-10"
            >
              <span className="text_yellow leading-10">
                TOTAL $WEWE <br /> LOCKED: <br />
              </span>

              <>
                {Math.trunc(Number(formatEther(weweBalance))).toLocaleString(
                  "en-US"
                )}
              </>
            </Typography>

            <div className="mt-2">
              <div className="flex justify-center gap-2">
                <Typography size="md" fw={600} className="py-2">
                  ≈ Value:
                </Typography>
                <Typography
                  size="md"
                  fw={600}
                  className="flex items-center gap-1 py-2"
                >
                  <Image
                    src="/img/tokens/vult-border.svg"
                    width={17}
                    height={17}
                    alt="Vult"
                  />{" "}
                  ${vultPrice.toPrecision(4)}{" "}
                </Typography>
              </div>
              {/* {!isVultBalanceFetching && (
                <Typography size="md" fw={600} className="md:py-5 py-2">
                  FDV: ${Math.trunc(vultFDV).toLocaleString()}
                </Typography>
              )} */}

              <div className="flex justify-center gap-2">
                <Typography size="md" fw={600} className=" py-2">
                  Balance:
                </Typography>
                <Typography
                  size="md"
                  fw={600}
                  className="flex items-center gap-1 py-2"
                >
                  <Image
                    src="/img/tokens/vult-border.svg"
                    width={17}
                    height={17}
                    alt="Vult"
                  />{" "}
                  {addCommaSeparator(formatEther(balanceVult).slice(0, 10))}
                </Typography>
              </div>

              <div className="my-2 mb-10 flex justify-center gap-2 md:my-5">
                <Typography size="md" fw={600}>
                  Ratio: 1000
                </Typography>
                <Image
                  src="/img/tokens/wewe.svg"
                  width={17}
                  height={17}
                  alt="Vult"
                />

                <Typography size="md" fw={600}>
                  ≈ {Number(formatEther(ratio)).toLocaleString("en-US")}
                </Typography>

                <Image
                  src="/img/tokens/vult-border.svg"
                  width={17}
                  height={17}
                  alt="Vult"
                />
              </div>

              <div className="my-2 mb-10 flex justify-center gap-2 md:my-5">
                <Typography size="md" fw={600}>
                  Total ≈ Value:
                </Typography>
                <Image
                  src="/img/tokens/vult-border.svg"
                  width={17}
                  height={17}
                  alt="Vult"
                />
                <Typography size="md" fw={600}>
                  ${" "}
                  {(
                    Number(formatUnits(balanceVult, 18)) * vultPrice
                  ).toLocaleString("en-US")}
                </Typography>
              </div>

              <Typography
                size="md"
                fw={600}
                className="text_yellow py-2 md:py-5"
              >
                FDV: ${Math.trunc(vultFDV).toLocaleString("en-US")}
              </Typography>
            </div>

            <div className="inset-x-0  bottom-5 mt-10 md:bottom-10">
              <Typography secondary size="xl">
                🔥 🔥 🔥
              </Typography>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
