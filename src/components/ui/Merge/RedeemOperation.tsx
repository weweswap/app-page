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

const RedeemOperation = () => {
  const { address } = useAccount();
  const { data: balanceWewe } = useTokenBalance(
    address,
    CONTRACT_ADDRESSES.wewe
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
    <div className="flex flex-col gap-4">
      <Card className="flex flex-col gap-5">
        <div className="bg_light_dark flex items-center justify-between gap-3 p-4">
          <div className="flex-1 flex items-center gap-3">
            <Image src="/img/tokens/vult.svg" width={32} height={32} alt="" />
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
          <div className="flex-1 flex items-center justify-end gap-3">
            <Image src="/img/tokens/vult.svg" width={32} height={32} alt="" />
            <Typography secondary size="md">
              VULT
            </Typography>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3">
          <div className="flex-1">
            <div className="grid grid-cols-11 bg_light_dark md:bg-black flex items-center justify-between md:justify-normal gap-3 p-4 md:p-0">
              <div className="col-span-5 flex-1 flex items-center gap-3">
                <NumberInput
                  defaultValue={"10000"}
                  classNames={{
                    root: "w-full md:w-full",
                    input: clsx(
                      dogica.className,
                      "bg_light_dark md:p-4 p-0 text-white text-lg h-auto border-transparent rounded-none"
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
              <div className="col-span-5 items-center flex-1  md:flex-none flex justify-end gap-3">
                {!isFetching && (
                  <div className="overflow-x-auto">
                    <Typography size="xl">
                      {Number(formatEther(quoteAmount)).toLocaleString()} VULT
                    </Typography>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full flex items-center gap-5 mt-3">
                 <div>
                    <Typography size="xs" className="text_light_gray">
                      Available:
                    </Typography>
                    <Typography size="xs" className="text_light_gray">
                    {Math.trunc(
                    Number(formatEther(weweBalance))
                  ).toLocaleString()}
                    </Typography>
                 </div>
              <button
                className="bg_light_dark px-3 py-2"
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
                disabled={true || !address || !amountValue || isPending}
              >
                {isPending && <Loader color="white" size="sm" />}
                <Typography secondary size="sm" fw={700} tt="uppercase">
                  REDEEM
                </Typography>
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <Card className="h-[8rem] text-center">
        <Typography className="text_light_gray" size="md">Redeem 1:1 IOU.VULT for $VULT</Typography>
      </Card>
    </div>
  );
};

export default RedeemOperation;
