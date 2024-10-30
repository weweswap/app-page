"use client";

import Image from "next/image";
import { ModalRootProps, NumberInput, Slider } from "@mantine/core";
import { Button } from "~/components/common/Button";
import { Modal } from "~/components/common/Modal";
import { Typography } from "~/components/common/Typography";
import { dogica } from "~/fonts";
import clsx from "clsx";

import { useSwapContext } from "./SwapContext";
import classes from "./SwapSettingModal.module.scss";

type SwapSettingProps = {
  onClose: () => void;
} & ModalRootProps;

export const SwapSettingModal = (props: SwapSettingProps) => {
  const { swapSlippage, setSwapSlippage, zapSlippage, setZapSlippage } =
    useSwapContext();
  return (
    <Modal title="Settings" onClose={props.onClose} opened={props.opened}>
      <div className="flex items-center justify-between">
        <Typography secondary size="sm" tt="uppercase">
          SWAP
        </Typography>
        <Image src="/img/icons/settings.svg" width={24} height={24} alt="" />
      </div>
      <div className="grid grid-cols-12 items-center gap-2">
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
          onClick={() => setSwapSlippage(1)}
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
          onClick={() => setSwapSlippage(2)}
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
        <div className="bg_turq col-span-3 flex items-center px-1">
          <NumberInput
            classNames={{
              root: "w-auto",
              input: clsx(dogica.className, classes.inputField),
            }}
            defaultValue={swapSlippage}
            value={swapSlippage}
            onChange={(value) => setSwapSlippage(value as number)}
            hideControls
            max={19.99}
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
        label={null}
        onChange={(value) => setSwapSlippage(value)}
        value={swapSlippage}
        max={19.99}
      />

      <div className="flex items-center justify-between ps-2">
        <Typography secondary size="sm" tt="uppercase">
          ZAPS
        </Typography>
        <Image src="/img/icons/settings.svg" width={24} height={24} alt="" />
      </div>
      <div className="grid grid-cols-12 items-center gap-2">
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
          onClick={() => setZapSlippage(1)}
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
          onClick={() => setZapSlippage(2)}
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
        <div className="bg_turq col-span-3 flex items-center px-1">
          <NumberInput
            classNames={{
              root: "w-auto",
              input: clsx(dogica.className, classes.inputField),
            }}
            defaultValue={zapSlippage}
            hideControls
            value={zapSlippage}
            onChange={(value) => setZapSlippage(value as number)}
            max={19.99}
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
        onChange={(value) => setZapSlippage(value)}
        value={zapSlippage}
        max={19.99}
      />
    </Modal>
  );
};
