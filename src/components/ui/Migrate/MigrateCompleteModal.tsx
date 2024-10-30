"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Divider, ModalRootProps, Modal as MtModal } from "@mantine/core";
import { Button } from "~/components/common/Button";
import { Typography } from "~/components/common/Typography";
import { fetchETHPrice } from "~/services";
import { ethers, formatEther } from "ethers";
import { Hex } from "viem";

type MigrateCompleteProps = {
  hash: Hex;
  data: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  onClose: () => void;
} & ModalRootProps;

export const MigrateCompleteModal = (props: MigrateCompleteProps) => {
  const [totalGasCostUSD, setTotalGasCostUSD] = useState("0.00");
  const handleDetails = () => {
    window.open(
      `https://basescan.org/tx/${props.hash}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  useEffect(() => {
    if (props.data.receipt) {
      const calculateGasCostInUSD = async () => {
        try {
          if (
            !props.data.receipt.gasUsed ||
            !props.data.receipt.effectiveGasPrice
          )
            return;
          const ethPriceInUSD = await fetchETHPrice();
          const gasUsed = BigInt(props.data.receipt.gasUsed);
          const effectiveGasPrice = BigInt(
            props.data.receipt.effectiveGasPrice
          );
          const gasCostInETH = ethers.formatEther(gasUsed * effectiveGasPrice);
          const gasCostInUSD = parseFloat(gasCostInETH) * ethPriceInUSD;
          setTotalGasCostUSD(gasCostInUSD.toFixed(2));
        } catch (error) {
          console.error("Error calculating gas cost in USD:", error);
        }
      };

      calculateGasCostInUSD();
    }
  }, [props.data]);
  return (
    <MtModal.Root centered {...props}>
      <MtModal.Overlay />
      <MtModal.Content
        classNames={{ content: "bg-black border_stroke text-white p-6" }}
      >
        {props.data && (
          <MtModal.Body className="flex flex-col gap-5 p-0">
            <div className="flex w-full flex-col items-center justify-center gap-6">
              <Typography
                secondary
                size="xl"
                tt="uppercase"
                className="text_turq"
              >
                Nice!!!
              </Typography>
              <Image
                src="/img/nice.png"
                width={250}
                height={250}
                className="max-w-full"
                alt=""
              />
              <div className="flex w-full flex-col items-center">
                <div className="flex w-full flex-col items-center gap-7">
                  <Image
                    src="/img/icons/success.svg"
                    width={50}
                    height={50}
                    alt=""
                  />
                  <Typography size="md" secondary className="text-center">
                    SUCCESSFULLY MIGRATED
                  </Typography>

                  <Divider className="w-full border-blue-700" />
                  <div className="flex w-auto items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <Image
                        src="/img/icons/memes.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Typography size="xs" className="translate-x-1">
                        MEMES: 1%
                      </Typography>
                    </div>

                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        <Image
                          src="/img/icons/Infinity.svg"
                          className="translate-x-[5px]"
                          width={20}
                          height={20}
                          alt=""
                        />
                      </div>
                      <Typography size="xs" className="translate-x-1">
                        INFINITY
                      </Typography>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between gap-3">
                    <Typography secondary size="sm">
                      AMOUNT
                    </Typography>
                    <div className="flex flex-col gap-2 text-right">
                      <Typography>
                        ${props.data.amountUsd.toFixed(2)}
                      </Typography>
                      <div className="flex items-center gap-2">
                        <Typography className="text_light_gray" size="xs">
                          {Number(formatEther(props.data.shares))} SHARES
                        </Typography>
                        <div className="flex items-center">
                          <Image
                            className="min-h-6 min-w-6"
                            src="/img/tokens/wewe.svg"
                            alt=""
                            width={32}
                            height={32}
                          />
                          <Image
                            className="ml-[-10px] min-h-6 min-w-6"
                            src="/img/tokens/usdc.png"
                            alt=""
                            width={32}
                            height={32}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between gap-3">
                    <Typography secondary size="sm">
                      LEFTOVERS
                    </Typography>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2">
                        <Typography className="text_light_gray" size="xs">
                          {props.data.leftover0}
                        </Typography>
                        <Image
                          src="/img/tokens/wewe.svg"
                          alt=""
                          height={32}
                          width={32}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Typography className="text_light_gray" size="xs">
                          {props.data.leftover1}
                        </Typography>
                        <Image
                          src="/img/tokens/usdc.png"
                          alt=""
                          height={32}
                          width={32}
                        />
                      </div>
                    </div>
                  </div>
                  <Typography
                    className="mb-3 flex w-full justify-end"
                    size="xs"
                  >
                    Total fee cost: $ {Number(totalGasCostUSD!)}
                  </Typography>
                </div>
                <div className="flex w-full flex-col gap-4">
                  <Button className="w-full" onClick={props.onClose}>
                    <Typography secondary size="xs" fw={700} tt="uppercase">
                      COMPLETED
                    </Typography>
                  </Button>
                  <button
                    className="custom_btn w-full md:w-auto"
                    onClick={handleDetails}
                  >
                    <Typography secondary size="xs" fw={700} tt="uppercase">
                      VIEW DETAILS
                    </Typography>
                  </button>
                </div>
              </div>
            </div>
          </MtModal.Body>
        )}
      </MtModal.Content>
    </MtModal.Root>
  );
};
