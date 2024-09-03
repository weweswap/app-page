"use client";

import { Loader, NumberInput } from "@mantine/core";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatEther, formatUnits, parseEther } from "viem";
import { useAccount } from "wagmi";
import { fetchWewePrice } from "~/api/wewePrice";
import { Button, Card, Typography } from "~/components/common";
import { CONTRACT_ADDRESSES, TOKEN_LIST } from "~/constants";
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

  function addCommaSeparator(numberString: string) {
    // Convert the string to a number, format it, and convert it back to a string
    return parseFloat(numberString).toLocaleString("en-US");
  }

  return (
    <>
      <div className="gap-5 grid grid-cols-12">
        <div className="md:col-span-8 col-span-12 gap-3 xl:w-[45rem] h-[100%]">
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

          <Card className="mt-4 ">
            <div className="bg_light_dark flex items-center justify-between gap-3 h-[3.3rem] mb-5 overflow-x-scroll">
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
        <div className="md:col-span-4 col-span-12 md:order-2 order-1 h-full">
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

              <>
                {Math.trunc(Number(formatEther(weweBalance))).toLocaleString()}
              </>
            </Typography>

            <div className="mt-2">
              <div className="flex gap-2 justify-center">
                <Typography size="md" fw={600} className="py-2">
                  ≈ Value:
                </Typography>
                <Typography
                  size="md"
                  fw={600}
                  className="py-2 flex items-center gap-1"
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

              <div className="flex gap-2 justify-center">
                <Typography size="md" fw={600} className=" py-2">
                  Balance:
                </Typography>
                <Typography
                  size="md"
                  fw={600}
                  className="py-2 flex items-center gap-1"
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

              <div className="flex justify-center gap-2 md:my-5 my-2 md:mb-5 mb-10">
                <Typography size="md" fw={600}>
                  Ratio: 1
                </Typography>
                <Image
                  src="/img/tokens/wewe.svg"
                  width={17}
                  height={17}
                  alt="Vult"
                />

                <Typography size="md" fw={600}>
                  ≈ {Number(formatEther(ratio)).toLocaleString()}
                </Typography>

                <Image
                  src="/img/tokens/vult-border.svg"
                  width={17}
                  height={17}
                  alt="Vult"
                />
              </div>

              <div className="flex justify-center gap-2 md:my-5 my-2 md:mb-5 mb-10">
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
                  $  {(Number(formatUnits(balanceVult,18))*vultPrice).toLocaleString()  }
                </Typography>
              </div>

              <Typography
                size="md"
                fw={600}
                className="md:py-5 py-2 text_yellow"
              >
                FDV: ${Math.trunc(vultFDV).toLocaleString()}
              </Typography>
            </div>

            <div className="mt-10  md:bottom-10 bottom-5 right-0 left-0">
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
