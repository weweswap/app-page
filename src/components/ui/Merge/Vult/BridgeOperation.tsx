import React from "react";
import Image from "next/image";
import { Divider, NumberInput } from "@mantine/core";
import { Button, Card, Dropdown, Typography } from "~/components/common";
import { FROM_TOKEN_LIST, TO_TOKEN_LIST } from "~/constants";
import { FROM_CHAIN_LIST, TO_CHAIN_LIST } from "~/constants/chains";
import { verdana } from "~/fonts";
import clsx from "clsx";

type BridgeOperationProps = {
  onConversion: () => void;
};

const fromTokenOptions = FROM_TOKEN_LIST.map((token) => ({
  value: token.symbol,
  icon: token.icon,
}));

const ToTokenOptions = TO_TOKEN_LIST.map((token) => ({
  value: token.symbol,
  icon: token.icon,
}));

const fromChainOptions = FROM_CHAIN_LIST.map((chain) => ({
  value: chain.symbol,
  icon: chain.icon,
}));

const toChainOptions = TO_CHAIN_LIST.map((chain) => ({
  value: chain.symbol,
  icon: chain.icon,
}));

const BridgeOperation = (_props: BridgeOperationProps) => {
  return (
    <div className="flex flex-col gap-4">
      {/* <Card className="w-full flex flex-col"> */}
      <div className="flex flex-col justify-between gap-4 md:flex-row ">
        <div className="flex w-full flex-col gap-5 md:w-1/2">
          <Typography secondary size="sm" className="text-start">
            Token
          </Typography>
          <Dropdown
            value="VULT"
            defaultValue="VULT"
            options={fromTokenOptions}
            className="w-full "
          />
        </div>
        <div className="flex w-full flex-col gap-5  md:w-1/2">
          <Typography secondary size="sm" className="">
            From
          </Typography>
          <Dropdown
            value="BASE"
            defaultValue="BASE"
            options={fromChainOptions}
            className="w-full "
          />
        </div>
      </div>

      <div className="mt-10 flex h-1 items-center justify-center ">
        <button className="absolute bg-black  p-3">
          <Image src="/img/icons/refresh.svg" width={24} height={24} alt="" />
        </button>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4 md:flex-row ">
          <div className="flex w-full flex-col gap-5 md:w-1/2">
            <Typography secondary size="sm" className="text-start">
              Token
            </Typography>
            <Dropdown
              value="VULT"
              defaultValue="VULT"
              options={ToTokenOptions}
              className="w-full "
            />
          </div>
          <div className="flex w-full flex-col gap-5  md:w-1/2">
            <Typography secondary size="sm" className="">
              To
            </Typography>
            <Dropdown
              value="ETH"
              defaultValue="ETH"
              options={toChainOptions}
              className="w-full "
            />
          </div>
        </div>

        <div className="bg_rich_dark bg flex flex-row items-center justify-between px-2">
          <NumberInput
            classNames={{
              root: "flex-1  my-5 w-auto",
              input: clsx(
                verdana.className,
                "text-start bg-transparent text-white text-2xl h-auto border-transparent rounded-none"
              ),
            }}
            defaultValue="0"
            hideControls
          />
          <div className="flex items-center gap-5">
            <div className="flex flex-col ">
              <Typography size="sm">Balance</Typography>
              <Typography size="sm" className="text-end">
                -
              </Typography>
            </div>
            <Divider orientation="vertical" className="border_stroke" />
            <div>
              <Typography
                size="md"
                className="text_turq cursor-pointer underline"
              >
                MAX
              </Typography>
            </div>
          </div>
        </div>
        <div>
          <Typography size="xs">Est. Value:- </Typography>

          <div className="flex flex-col gap-10 md:flex-row">
            <div className="bg_rich_dark flex w-full flex-col gap-5 p-2 md:w-1/2">
              <div className="flex flex-row justify-between gap-3">
                <Typography size="xs">Gas Cost: </Typography>
                <Typography size="xs" className="text_turq">
                  Fast
                </Typography>
              </div>
              <Typography size="md">-</Typography>
              <Typography size="xs">Est. Time:-</Typography>
            </div>

            <div className="bg_rich_dark flex w-full flex-col gap-5 p-2 md:w-1/2">
              <div className="flex flex-row justify-between gap-3">
                <Typography size="xs">Gas Cost: </Typography>
                <Typography size="xs" className="text_yellow">
                  Economy
                </Typography>
              </div>
              <Typography size="md">-</Typography>
              <Typography size="xs">Max. Time:-</Typography>
            </div>
          </div>

          <Divider className="border_stroke my-5" />

          <div className="my-2 flex items-center justify-between gap-3">
            <Typography size="xs">You will receive</Typography>
            <Typography size="xs">-</Typography>
          </div>
          <div className="flex items-center justify-between gap-3 ">
            <Typography size="xs">Gas on destination</Typography>
            <Typography size="xs">-</Typography>
          </div>
        </div>
      </div>
      <Button className="my-2 w-full" disabled>
        <Typography secondary size="sm" tt="uppercase" fw="bold">
          Bridge
        </Typography>
      </Button>
      {/* </Card> */}
      <Card>
        <Typography size="lg">MERGE your WEWE into VULT</Typography>

        <ul className="text_light_gray list-inside list-decimal pt-3 text-sm">
          <li>Merge your $WEWE to secure your $VULT</li>
          <li>Starting price is 1,000 $WEWE to 1 $VULT, but this will rise</li>
          <li>Your $VULT will be locked until the public launch</li>
        </ul>
      </Card>
    </div>
  );
};

export default BridgeOperation;
