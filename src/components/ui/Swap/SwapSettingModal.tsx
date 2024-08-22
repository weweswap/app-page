"use client";
import Image from "next/image";
import {
  Divider,
  Modal as MtModal,
  ModalRootProps,
  NumberInput,
} from "@mantine/core";
import { Slider, rem } from "@mantine/core";
import { Typography } from "~/components/common/Typography";
import { Button } from "~/components/common/Button";
import { Modal } from "~/components/common/Modal";
import classes from "./SwapSettingModal.module.scss";
import clsx from "clsx";
import { dogica } from "~/fonts";
import { useState } from "react";

type SwapSettingProps = {
  onClose: () => void;
  setSwapSlippage: (slippage: number) => void;
  setZapSlippage: (slippage: number) => void;
  swapSlippage: number;
  zapSlippage: number;
} & ModalRootProps;

export const SwapSettingModal = (props: SwapSettingProps) => {
  return (
    <Modal title="Settings" onClose={props.onClose} opened={props.opened}>
      <div className="flex justify-between items-center">
        <Typography secondary size="sm" tt="uppercase">
          SWAP
        </Typography>
        <Image src="/img/icons/settings.svg" width={24} height={24} alt="" />
      </div>
      <div className="gap-2 items-center grid grid-cols-12">
        <Typography
          className="col-span-5"
          secondary
          size="xs"
          tt="uppercase"
          fw={600}
        >
          slippage %
        </Typography>
        <Button
          className="bg_turq col-span-2"
          onClick={() => props.setSwapSlippage(1)}
        >
          <Typography
            secondary
            size="xs"
            tt="uppercase"
            fw={600}
            className="text-black"
          >
            1%
          </Typography>
        </Button>
        <Button
          className="bg_turq col-span-2"
          onClick={() => props.setSwapSlippage(2)}
        >
          <Typography
            secondary
            size="xs"
            tt="uppercase"
            fw={600}
            className="text-black"
          >
            2%
          </Typography>
        </Button>
        <div className="bg_turq flex col-span-3 items-center px-1">
          <NumberInput
            classNames={{
              root: "w-auto",
              input: clsx(
                dogica.className,
                "text-center  md:text-start bg_turq text-black text-xs h-[42px] border-transparent rounded-none"
              ),
            }}
            defaultValue={props.swapSlippage}
            value={props.swapSlippage}
            onChange={(value) => props.setSwapSlippage(value as number)}
            hideControls
          />
          <Typography
            secondary
            size="xs"
            tt="uppercase"
            fw={600}
            className="text-black"
          >
            %
          </Typography>
        </div>
      </div>
      <Slider
        color="#33E6BF"
        classNames={classes}
        defaultValue={40}
        label={null}
        onChange={(value) => props.setSwapSlippage(value)}
        value={props.swapSlippage}
      />

      <div className="flex justify-between items-center ps-2">
        <Typography secondary size="sm" tt="uppercase">
          ZAPS
        </Typography>
        <Image src="/img/icons/settings.svg" width={24} height={24} alt="" />
      </div>
      <div className="gap-2 items-center grid grid-cols-12">
        <Typography
          className="col-span-5"
          secondary
          size="xs"
          tt="uppercase"
          fw={600}
        >
          slippage %
        </Typography>
        <Button
          className="bg_turq col-span-2"
          onClick={() => props.setZapSlippage(1)}
        >
          <Typography
            secondary
            size="xs"
            tt="uppercase"
            fw={600}
            className="text-black"
          >
            1%
          </Typography>
        </Button>
        <Button
          className="bg_turq col-span-2"
          onClick={() => props.setZapSlippage(2)}
        >
          <Typography
            secondary
            size="xs"
            tt="uppercase"
            fw={600}
            className="text-black"
          >
            2%
          </Typography>
        </Button>
        <div className="bg_turq flex col-span-3 items-center px-1">
          <NumberInput
            classNames={{
              root: "w-auto",
              input: clsx(
                dogica.className,
                "text-center  md:text-start bg_turq text-black text-xs  h-[42px] border-transparent rounded-none"
              ),
            }}
            defaultValue={props.zapSlippage}
            hideControls
            value={props.zapSlippage}
            onChange={(value) => props.setZapSlippage(value as number)}
          />
          <Typography
            secondary
            size="sm"
            tt="uppercase"
            fw={600}
            className="text-black"
          >
            %
          </Typography>
        </div>
      </div>
      <Slider
        color="#33E6BF"
        classNames={classes}
        defaultValue={40}
        label={null}
        onChange={(value) => props.setZapSlippage(value)}
        value={props.zapSlippage}
      />
    </Modal>
  );
};
