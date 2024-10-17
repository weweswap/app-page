"use client";

import { Loader, NumberInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { Button, Card, Typography } from "~/components/common";
import { CONTRACT_ADDRESSES } from "~/constants";
import { dogica } from "~/fonts";
import {
  useApproveAndCall,
  useQuoteVult,
  useVultBalance,
  useWeweBalance,
} from "~/hooks";
import { MergeCompleteModal } from "./MergeCompleteModal";
import { FailTXModal } from "~/components/common/FailTXModal";
import { fetchWEWEPrice } from "~/services";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import { usdConverter } from "~/utils";

const MergeOperation = () => {
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
  const [totalGasFee, setTotalGasFee] = useState<number>(0)
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
    fetchWEWEPrice().then((price) => {
      setWewePrice(price);
    });
  }, []);
  const [
    openedMergeCompleteModal,
    { open: openMergeCompleteModal, close: closeMergeCompleteModal },
  ] = useDisclosure(false);
  const [
    openedMergeFailModal,
    { open: openMergeFailModal, close: closeMergeFailModal },
  ] = useDisclosure(false);

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
  const {
    onWriteAsync: onApproveAndCall,
    isPending,
    isError,
    isConfirmed,
    hash,
    txReceipt
  } = useApproveAndCall();

  const handleSelect = (div: number) => {
    setAmount(Number(formatEther(balanceWewe)) / div);
  };
  useEffect(() => {
    if (isConfirmed) {
      
      openMergeCompleteModal();

      const totalFee = (txReceipt!?.gasUsed * txReceipt!?.effectiveGasPrice);
      const getUsdFees = async () => {
        const finalUsdValue = await usdConverter(totalFee)
        setTotalGasFee(finalUsdValue)

      }

    getUsdFees()  
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (isError) {
      openMergeCompleteModal();
    }
  }, [isError]);
  const handleMerge = () => {
    onApproveAndCall(amountValue);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* <Card className="flex flex-col gap-5"> */}
        <div className="bg_light_dark flex items-center justify-between gap-3 p-4">
          <div className="flex-1 flex items-center gap-3">
            <Image src="/img/tokens/wewe.png" width={32} height={32} alt="" />
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
            <Image src="/img/tokens/vult.svg" width={32} height={32} alt="" />
            <Typography secondary size="md">
              VULT
            </Typography>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3">
          <div className="flex-1">
            <div className="grid grid-cols-11  md:bg-black flex items-center justify-between md:justify-normal gap-3 p-4 md:p-0">
              <div className="col-span-5 flex-1 flex items-center gap-3">
                <NumberInput
                  classNames={{
                    root: "w-full md:w-full",
                    input: clsx(
                      dogica.className,
                      "bg_light_dark md:p-4 p-0 text-white text-lg h-auto border-transparent rounded-none lg:w-[20.8rem]"
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
                      {Number(formatEther(quoteAmount)).toLocaleString("en-US")} VULT
                    </Typography>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full flex items-center gap-4 mt-3">
              <div>
                <Typography size="xs" className="text_light_gray">
                  Available:
                </Typography>
                <Typography size="xs" className="text_light_gray">
                  {/* $4,690,420,090.00 */}
                  {Math.trunc(
                    Number(formatEther(balanceWewe))
                  ).toLocaleString("en-US")}
                </Typography>
              </div>
              <div className="flex gap-3 items-center">
                <button
                  className="bg_light_dark px-3 py-2"
                  onClick={() => handleSelect(4)}
                >
                  <Typography size="xs">25%</Typography>
                </button>
                <button
                  className="bg_light_dark px-3 py-2"
                  onClick={() => handleSelect(2)}
                >
                  <Typography size="xs">50%</Typography>
                </button>
                <button
                  className="bg_light_dark px-3 py-2"
                  onClick={() => handleSelect(1)}
                >
                  <Typography size="xs">MAX</Typography>
                </button>
              </div>
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
                <Typography secondary size="sm" fw={700} tt="uppercase">
                  Merge🔥
                </Typography>
              </Button>
            </div>
          </div>
        </div>
        {/* </Card> */}
        <Card>
          <Typography size="lg">MERGE your WEWE into VULT</Typography>

          <ul className="list-decimal list-inside pt-3 text-sm text_light_gray">
            <li>Merge your $WEWE to secure your $VULT</li>
            <li>
              Starting price is 1,000 $WEWE to 1 $VULT, but this will rise
            </li>
            <li>Your $VULT will be locked until the public launch</li>
          </ul>
        </Card>
      </div>
      {isConfirmed && ratio && (
        <MergeCompleteModal
          totalFees={totalGasFee}
          ratio={ratio}
          amount={Number(formatEther(quoteAmount)).toLocaleString("en-US")}
          opened={openedMergeCompleteModal}
          onClose={closeMergeCompleteModal}
          hash={hash!}
        />
      )}
      {isError && (
        <FailTXModal
          opened={openedMergeFailModal}
          onClose={closeMergeFailModal}
          hash={hash!}
        />
      )}
    </>
  );
};

export default MergeOperation;
