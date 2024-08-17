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

export const RedeemHome = () => {
  const [amount, setAmount] = useState<string | number>("");
  const handleSelect = (div: number) => {};
  const [state, setState] = useState(0);
  const handleRedeem = () => {
    if (state == 0) setState(1);
    else {
      setState(0);
    }
  };
  return (
    <>
      <Card>
        <div className="md:flex items-center justify-between gap-3 text-center md:text-start  ">
          <Typography secondary size="xl" tt="uppercase">
            REDEEM YOUR COINS
          </Typography>
        </div>
        <div className="md:flex items-center justify-between gap-3 text-center md:text-start mt-2">
          <Typography
            size="sm"
            tt="uppercase"
            className="pt-2 text-center md:text-start"
          >
            GET YOUR WAITED $VULT
          </Typography>
        </div>
      </Card>

      <Card className="flex flex-col gap-5">
        <div className="bg-gray-900 flex items-center justify-between gap-3 p-4">
          <div className="flex-1 flex items-center gap-3">
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
          <div className="flex-1 flex items-center justify-end gap-3">
            <Image src="/img/tokens/vult.svg" width={32} height={32} alt="" />
            <Typography secondary size="md">
              VULT
            </Typography>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3">
          <div className="flex-1">
            <NumberInput
              classNames={{
                root: "w-full md:w-auto",
                input: clsx(
                  dogica.className,
                  "bg-gray-900 p-4 text-white text-lg h-auto border-transparent rounded-none"
                ),
              }}
              hideControls
              value={amount}
              onChange={setAmount}
            />

            <div className="w-full flex items-center justify-end gap-3 mt-3">
              <button
                className="bg-gray-900 px-3 py-2"
                onClick={() => handleSelect(1)}
              >
                <Typography size="sm">MAX</Typography>
              </button>
            </div>
          </div>

          <div className=" flex-1 flex flex-col gap-3">
            <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 flex items-center justify-center gap-3">
                <Image
                  src="/img/icons/arrow_right.svg"
                  width={19}
                  height={9}
                  alt=""
                />
                <div>
                  <Typography size="xl">1000 VULT</Typography>
                </div>
              </div>
              <Button
                onClick={handleRedeem}
                className="flex items-center justify-center gap-3"
              >
                {/* <Loader color="white" size="sm" /> */}
                {state == 0 ? (
                  <Typography secondary size="lg" fw={700} tt="uppercase">
                    redeem
                  </Typography>
                ) : (
                  <Typography secondary size="lg" fw={700} tt="uppercase">
                    approve
                  </Typography>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <Typography size="lg" ta="center" className="my-3">
          Redeem your IOU VULT for $VULT
        </Typography>
      </Card>
    </>
  );
};
