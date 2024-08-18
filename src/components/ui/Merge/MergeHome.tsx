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

export const MergeHome = () => {
  const { address } = useAccount();
  const { data: balanceWewe } = useTokenBalance(
    address,
    CONTRACT_ADDRESSES.wewe
  );
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
        <div className="md:col-span-8 col-span-12 md:order-1 order-2">
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
                className="pt-4 text-center md:text-start"
              >
                Merge your coins
              </Typography>
            </div>
          </Card>

          <Card className="flex flex-col gap-5">
            <div className="bg-gray-900 flex items-center justify-between gap-3 p-4">
              <div className="flex-1 flex items-center gap-3">
                <Image
                  src="/img/tokens/wewe.png"
                  width={32}
                  height={32}
                  alt=""
                />
                <Typography secondary size="md">
                  WEWE
                </Typography>
              </div>
              <Image
                src="/img/icons/arrow_right.svg"
                width={16}
                height={16}
                alt=""
              />
              <div className="flex-1 flex items-center justify-end gap-3">
                <Image
                  src="/img/tokens/vult.svg"
                  width={32}
                  height={32}
                  alt=""
                />
                <Typography secondary size="md">
                  VULT
                </Typography>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3">
              <div className="flex-1">
                <div className="grid grid-cols-11 bg-gray-900 md:bg-black flex items-center justify-between md:justify-normal gap-3 p-4 md:p-0">
                  <div className="col-span-5 flex-1 flex items-center gap-3">
                    <NumberInput
                      classNames={{
                        root: "w-full md:w-full",
                        input: clsx(
                          dogica.className,
                          "bg-gray-900 md:p-4 p-0 text-white text-lg h-auto border-transparent rounded-none"
                        ),
                      }}
                      hideControls
                      value={amount}
                      onChange={setAmount}
                    />
                  </div>
                  <Image
                    className="col-span-1"
                    src="/img/icons/arrow_right.svg"
                    width={16}
                    height={16}
                    alt=""
                  />
                  <div className="col-span-5 items-center flex-1  md:flex-none flex items-center justify-end gap-3">
                    {!isFetching && (
                      <div className="overflow-x-auto">
                        <Typography size="xl">
                          {Number(formatEther(quoteAmount)).toLocaleString()}{" "}
                          VULT
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full flex items-center justify-end gap-3 mt-3">
                  <button
                    className="bg-gray-900 px-3 py-2"
                    onClick={() => handleSelect(4)}
                  >
                    <Typography size="sm">25%</Typography>
                  </button>
                  <button
                    className="bg-gray-900 px-3 py-2"
                    onClick={() => handleSelect(2)}
                  >
                    <Typography size="sm">50%</Typography>
                  </button>
                  <button
                    className="bg-gray-900 px-3 py-2"
                    onClick={() => handleSelect(1)}
                  >
                    <Typography size="sm">MAX</Typography>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto ">
                <div className="flex-1 flex flex-col sm:flex-row items-center gap-3 ">
                  <Button
                    className="flex items-center justify-center gap-3 w-full md:w-auto md:h-[62px]"
                    disabled={!address || !amountValue || isPending}
                    onClick={handleMerge}
                  >
                    {isPending && <Loader color="white" size="sm" />}
                    <Typography secondary size="lg" fw={700} tt="uppercase">
                      Merge🔥
                    </Typography>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <Typography size="lg">MERGE your WEWE into VULT</Typography>

            <ul className="list-decimal list-inside pt-3 text-sm">
              <li>Merge your $WEWE to secure your $VULT</li>
              <li>
                Starting price is 1,000 $WEWE to 1 $VULT, but this will rise
              </li>
              <li>Your $VULT will be locked until the public launch</li>
            </ul>
          </Card>
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
