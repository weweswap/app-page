"use client";

import Image from "next/image";
import { ModalRootProps, Modal as MtModal } from "@mantine/core";
import { Button } from "~/components/common/Button";
import { Typography } from "~/components/common/Typography";
import { formatBigIntegers, formatStringUnits } from "~/utils";
import { Hex } from "viem";

import { useSwapContext } from "./SwapContext";

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
              <Typography size="sm" fw={1000}>
                {formatBigIntegers(
                  Number(
                    formatStringUnits(
                      routeData!.routeSummary.amountIn,
                      routeData!.inputToken.decimals
                    )
                  )
                )}{" "}
                {routeData!.inputToken.symbol}
              </Typography>
              <Typography size="xs" fw={700} className="opacity-50">
                ${formatBigIntegers(Number(encodedData!.amountInUsd))}
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
              <Typography size="sm" fw={1000}>
                {formatBigIntegers(
                  Number(
                    formatStringUnits(
                      routeData!.routeSummary.amountOut,
                      routeData!.outputToken.decimals
                    )
                  )
                )}{" "}
                {routeData!.outputToken.symbol}
              </Typography>
              <Typography size="xs" fw={700} className="opacity-50">
                ${formatBigIntegers(Number(encodedData!.amountOutUsd))}
              </Typography>
            </div>
          </div>
          <Typography size="xs" className="text_light_gray mx-auto">
            US$ {Number(encodedData!.gasUsd).toFixed(3)} estimated fees
          </Typography>
          <div className="flex flex-col gap-2">
            <Button className="w-full" onClick={props.onClose}>
              <Typography secondary size="md" fw={700} tt="uppercase">
                completed
              </Typography>
            </Button>

            <Button
              className="border-1 w-full border border-white bg-black"
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
