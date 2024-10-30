"use client";

/* eslint-disable */
import { useEffect, useState } from "react";
import Image from "next/image";
import { NumberInput } from "@mantine/core";
import { Button, Card, Typography } from "~/components/common";
import { CONTRACT_ADDRESSES } from "~/constants";
import { dogica } from "~/fonts";
import { useVultBalance, useWeweBalance } from "~/hooks";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import { fetchWEWEPrice } from "~/services";
import clsx from "clsx";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";

export const RedeemHome = () => {
  const { address } = useAccount();
  const { data: balanceVult } = useTokenBalance(
    address,
    CONTRACT_ADDRESSES.vult
  );
  const [amount, setAmount] = useState<string | number>("");
  const amountValue = parseEther(String(amount) ?? 0);

  const [wewePrice, setWewePrice] = useState<number>(0);
  const [vultPrice, setVultPrice] = useState<number>(0);
  const [vultFDV, setVultFDV] = useState<number>(0);
  const { data: weweBalance, isFetching: isWeweBalanceFetching } =
    useWeweBalance();
  const { data: vultBalance, isFetching: isVultBalanceFetching } =
    useVultBalance();
  // fetch wewe price
  useEffect(() => {
    fetchWEWEPrice().then((price) => {
      setWewePrice(price);
    });
  }, []);

  const totalVultSupply = 100000000; //100m
  const totalWeweSupply = 100000000000; //100bn
  const virtualBalance = 10000000000 - 10000000000; //10bn - 10bn
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

  const handleSelect = (div: number) => {
    setAmount(Number(formatEther(balanceVult)) / div);
  };
  const [state, setState] = useState(0);
  const handleRedeem = () => {
    if (state == 0) setState(1);
    else {
      setState(0);
    }
  };
  return (
    <>
      <div className=" grid grid-cols-12 gap-5">
        <div className="order-2 col-span-12 md:order-1 md:col-span-8">
          <Card>
            <div className="items-center justify-between gap-3 py-3 text-center md:flex md:text-start  ">
              <Typography secondary size="xl" tt="uppercase">
                REDEEM YOUR COINS
              </Typography>
            </div>
            <div className="mt-2 items-center justify-between gap-3 py-3 text-center md:flex md:text-start">
              <Typography
                size="sm"
                tt="uppercase"
                className="pt-2 text-center md:text-start"
              >
                GET YOUR WAITED $VULT
              </Typography>
            </div>
          </Card>

          <Card className="my-5 flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3 bg-gray-900 p-4">
              <div className="flex flex-1 items-center gap-3">
                <Image
                  src="/img/tokens/iou-vult.svg"
                  width={32}
                  height={32}
                  alt=""
                />
                <Typography secondary size="md">
                  IOU-VULT
                </Typography>
              </div>
              <Image
                src="/img/icons/arrow_right.svg"
                width={16}
                height={16}
                alt=""
              />
              <div className="flex flex-1 items-center justify-end gap-3">
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

            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row sm:items-start">
              <div className="flex-1">
                <div className="flex grid grid-cols-11 items-center justify-between gap-3 bg-gray-900 p-4 md:justify-normal md:bg-black md:p-0">
                  <div className="col-span-5 flex flex-1 items-center gap-3">
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
                  <div className="col-span-5 flex  flex-1 items-center justify-end gap-3 md:flex-none">
                    <div className="overflow-x-auto">
                      <Typography size="xl">{amount} VULT</Typography>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex w-full items-center gap-3">
                  <button
                    className="bg-gray-900 px-3 py-2"
                    onClick={() => handleSelect(1)}
                  >
                    <Typography size="sm">MAX</Typography>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-1 flex-col items-center gap-3 sm:flex-row">
                  <Button
                    onClick={handleRedeem}
                    className="flex w-full items-center justify-center gap-3 md:h-[62px] md:w-auto"
                  >
                    {state == 0 ? (
                      <Typography secondary size="md" fw={700} tt="uppercase">
                        redeem
                      </Typography>
                    ) : (
                      <Typography secondary size="md" fw={700} tt="uppercase">
                        approve
                      </Typography>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <Typography size="lg" ta="center" className="text_light_gray my-20">
              Redeem at 1:1 Your $IOU.VULT into $VULT <br />
              Bridge Your $BASE.VULT To $ETH.VULT
            </Typography>
          </Card>
        </div>
        <div className="order-1 col-span-12 md:order-2 md:col-span-4">
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
              {!isWeweBalanceFetching && (
                <>
                  {Math.trunc(Number(formatEther(weweBalance))).toLocaleString(
                    "en-US"
                  )}
                </>
              )}
            </Typography>

            <div className="mt-2 md:mt-5">
              <div className="flex justify-center gap-2 md:justify-start ">
                <Image
                  src="/img/tokens/vult-border.svg"
                  width={17}
                  height={17}
                  alt="Vult"
                />
                <Typography size="md" fw={600} className="py-2 md:py-5">
                  ≈ Value: ${vultPrice.toPrecision(4)}
                </Typography>
              </div>

              <div className="flex justify-center gap-2 md:justify-start ">
                <Image
                  src="/img/tokens/vult-border.svg"
                  width={17}
                  height={17}
                  alt="Vult"
                />
                <Typography size="md" fw={600} className="py-2 md:py-5">
                  Balance:{" "}
                  {Number(formatEther(balanceVult)).toLocaleString("en-US")}
                </Typography>
              </div>
              <div className="my-2 flex justify-center gap-2 md:my-5 md:justify-start ">
                <Image
                  src="/img/tokens/vult.svg"
                  width={17}
                  height={17}
                  alt="Vult"
                />
                <Typography size="md" fw={600}>
                  Ratio: 1000 ≈ 1000
                </Typography>
                <Image
                  src="/img/tokens/vult-border.svg"
                  width={17}
                  height={17}
                  alt="Vult"
                />
              </div>
              <div className="flex justify-center gap-2 md:justify-start  ">
                <Image
                  src="/img/tokens/vult-border.svg"
                  width={17}
                  height={17}
                  alt="Vult"
                />
                <Typography size="md" fw={600} className="py-2 md:py-5">
                  Balance ≈ Value: $
                  {(
                    Number(formatEther(balanceVult)) * vultPrice
                  ).toLocaleString("en-US")}
                </Typography>
              </div>
              {!isVultBalanceFetching && (
                <Typography
                  size="md"
                  fw={600}
                  className="text_yellow py-2 md:py-5"
                >
                  FDV: ${Math.trunc(vultFDV).toLocaleString("en-US")}
                </Typography>
              )}
            </div>

            <div className="  inset-x-0">
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
