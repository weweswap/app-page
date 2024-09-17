"use client";
import Image from "next/image";
import { Divider, Modal as MtModal, ModalRootProps } from "@mantine/core";
import { Typography } from "~/components/common/Typography";
import { Button } from "~/components/common/Button";
import { BuildData, TokenItem } from "~/models";
import { useSwapContext } from "./SwapContext";
import { Hex } from "viem";

type SwapCompleteProps = {
  hash: Hex;
  onClose: () => void;
} & ModalRootProps;

export const SwapCompleteModal = (props: SwapCompleteProps) => {
  const { encodedData, routeData } = useSwapContext();
  const handleDetails = () => {
    window.open(
      `https://basescan.org/tx/${props.hash}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  return (
    <MtModal.Root centered {...props}>
      <MtModal.Overlay />
      <MtModal.Content
        classNames={{ content: "bg-black border_stroke text-white p-6" }}
      >
        <MtModal.Body className="flex flex-col gap-5 p-0">
          <div className="flex flex-col items-center">
            <img
              src="/img/icons/check.svg"
              className="w-[60px]"
              alt="succesful"
            />
          </div>

          <Typography
            secondary
            size="xs"
            tt="uppercase"
            className="text_light_gray"
            ta="center"
          >
            successfuly swapped
          </Typography>
          <div className="flex items-center justify-center gap-3">
            <Image
              src={routeData!.inputToken.icon}
              alt={routeData!.inputToken.symbol}
              width={40}
              height={40}
            />
            <div className="flex flex-col">
              <Typography size="md" fw={700}>
                ${Number(encodedData!.amountInUsd).toFixed(2)}
              </Typography>
            </div>
          </div>

          <Image
            src="img/icons/chevron-down.svg"
            width={20}
            height={20}
            alt=""
            className="mx-auto"
          />
          <div className="flex items-center justify-center gap-3">
            <img
              src={routeData!.outputToken.icon}
              alt={routeData!.outputToken.symbol}
              width={40}
              height={40}
            />
            <div className="flex flex-col">
              <Typography size="md" fw={700}>
                ${Number(encodedData!.amountOutUsd).toFixed(2)}
              </Typography>
            </div>
          </div>
          <Typography size="xs" className="text_light_gray mx-auto">
            US$ {Number(encodedData!.gasUsd).toFixed(2)} estimated fees
          </Typography>
          <div className="flex flex-col gap-2">
            <Button className="w-full" onClick={props.onClose}>
              <Typography secondary size="md" fw={700} tt="uppercase">
                completed
              </Typography>
            </Button>

            <Button
              className="w-full bg-black border border-1 border-white"
              onClick={handleDetails}
            >
              <Typography secondary size="md" fw={700} tt="uppercase">
                view details
              </Typography>
            </Button>
          </div>
        </MtModal.Body>
      </MtModal.Content>
    </MtModal.Root>
  );
};
