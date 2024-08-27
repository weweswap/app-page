"use client";

import { Loader, NumberInput } from "@mantine/core";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { fetchWewePrice } from "~/api/wewePrice";
import { Button, Card, Typography } from "~/components/common";
import { CONTRACT_ADDRESSES } from "~/constants";
import { dogica } from "~/fonts";
import {
  useApproveAndCall,
  useQuoteVult,
  useTokenBalance,
  useVultBalance,
  useWeweBalance,
} from "~/hooks";
import MergeOperation from "./MergeOperation";
import RedeemOperation from "./RedeemOperation";
import BridgeOperation from "./BridgeOperation";

type MergeHomeProps = {
  onConversion: () => void
}

export const MergeHome = (props: MergeHomeProps) => {
  const { address } = useAccount();
  const { data: balanceWewe } = useTokenBalance(
    address,
    CONTRACT_ADDRESSES.wewe
  );

  const [operations, setOperations] = useState<number>(0)
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
    fetchWewePrice().then((price) => {
      setWewePrice(price);
    });
  }, []);

  const totalVultSupply = 100000000; //100m
  const totalWeweSupply = 100000000000; //100bn
  const virtualBalance = 10000000000; //10bn
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

  return (
    <>
      <div className=" gap-5 grid grid-cols-12">
        <div className="md:col-span-8 col-span-12 md:order-1 order-2 xl:w-[45rem] ">
          <Card>
            <div className="md:flex items-center justify-between gap-3 text-center md:text-start  ">
              <Typography secondary size="xl" tt="uppercase">
                MERGE NO&ensp;W
              </Typography>
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

          <Card className="my-4">
            <div className="w-full bg-[#0F0F0F] pool_nav overflow-x-scroll pt-4">
              <div className=" flex items-center h-[3rem] gap-3 justify-evenly  min-w-[30rem] ">
                <div onClick={() => setOperations(0)} className={`${operations === 0 && "text_green"}`}>
                <nav className="nav">MERGE</nav>
                </div>
                <div onClick={() => setOperations(1)} className={`${operations === 1 && "text_green"}`}>
                <nav className="nav">REDEEM</nav>
                </div>
                <div onClick={() => setOperations(2)} className={`${operations === 2 && "text_green"}`}>
                <nav className="nav">BRIDGE</nav>
                </div>
              </div>
            </div>
          </Card>

          {operations === 0 && <MergeOperation/> }
          {operations === 1 && <RedeemOperation />}
          {operations === 2 && <BridgeOperation onConversion={props.onConversion} />}
         
        </div>
        <div className="md:col-span-4 col-span-12 md:order-2 order-1">
          <Card className="text-center h-full relative">
            <Typography
              secondary
              size="md"
              tt="uppercase"
              fw={600}
              className="leading-10 p-5"
            >
              <span className="text_yellow leading-10">
                TOTAL $WEWE <br /> LOCKED: <br />
              </span>
              
              {!isWeweBalanceFetching && (
                <>
                  {Math.trunc(
                    Number(formatEther(weweBalance))
                  ).toLocaleString()}
                </>
              )}
            </Typography>

            <div className="md:mt-10 mt-2">
              <div className="flex gap-2 justify-center">
                <Typography size="md" fw={600} className="md:py-5 py-2">
                  ≈ Value: ${vultPrice.toPrecision(4)}{" "}
                </Typography>
                <Image
                  src="/img/tokens/vult-border.svg"
                  width={17}
                  height={17}
                  alt="Vult"
                />
              </div>
              {!isVultBalanceFetching && (
                <Typography size="md" fw={600} className="md:py-5 py-2">
                  FDV: ${Math.trunc(vultFDV).toLocaleString()}
                </Typography>
              )}
              <div className="flex justify-center gap-2 md:my-5 my-2 md:mb-5 mb-10">
                <Typography size="md" fw={600}>
                  Ratio: 1000
                </Typography>
                <Image
                  src="/img/tokens/wewe.svg"
                  width={17}
                  height={17}
                  alt="Vult"
                />
                {!isRatioFetching && (
                  <Typography size="md" fw={600}>
                    ≈ {Number(formatEther(ratio)).toLocaleString()}
                  </Typography>
                )}
                <Image
                  src="/img/tokens/vult-border.svg"
                  width={17}
                  height={17}
                  alt="Vult"
                />
              </div>
            </div>

            <div className="mt-10 absolute md:bottom-10 bottom-5 right-0 left-0">
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
