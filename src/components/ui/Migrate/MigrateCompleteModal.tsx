"use client";
import Image from "next/image";
import { Divider, Modal as MtModal, ModalRootProps } from "@mantine/core";
import { Typography } from "~/components/common/Typography";
import { Button } from "~/components/common/Button";
import { BuildData, TokenItem } from "~/models";

import { Hex } from "viem";
import { ethers, formatEther } from "ethers";
import { useEffect, useState } from "react";

type MigrateCompleteProps = {
  hash: Hex;
  data: any;
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
  async function fetchETHPriceInUSD() {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const data = await response.json();
    return data.ethereum.usd;
  }
  useEffect(() => {
    if (props.data.receipt) {
      const calculateGasCostInUSD = async () => {
        try {
          const ethPriceInUSD = await fetchETHPriceInUSD();
          const gasUsed = BigInt(props.data.gasUsed);
          const effectiveGasPrice = BigInt(props.data.effectiveGasPrice);
          const gasCostInETH = ethers.formatEther(gasUsed * effectiveGasPrice);
          const gasCostInUSD = parseFloat(gasCostInETH) * ethPriceInUSD;
          setTotalGasCostUSD(gasCostInUSD.toFixed(2));
        } catch (error) {
          console.error("Error calculating gas cost in USD:", error);
        }
      };

      calculateGasCostInUSD();
    }
  }, [props.data.receipt]);
  return (
    <MtModal.Root centered {...props}>
      <MtModal.Overlay />
      <MtModal.Content
        classNames={{ content: "bg-black border_stroke text-white p-6" }}
      >
        <MtModal.Body className="flex flex-col gap-5 p-0">
          <div className="w-full flex flex-col items-center justify-center gap-6">
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
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-col items-center gap-7 w-full">
                <Image
                  src="/img/icons/success.svg"
                  width={50}
                  height={50}
                  alt=""
                />
                <Typography size="md" secondary className="text-center">
                  SUCCESSFULLY MIGRATED
                </Typography>

                <Divider className="border-blue-700 w-full" />
                <div className="flex items-center justify-between w-auto gap-2">
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
                <div className="flex items-center justify-between gap-3">
                  <Typography secondary size="sm">
                    AMOUNT
                  </Typography>
                  <div className="text-right flex flex-col gap-2">
                    <Typography>${props.data.amountUsd.toFixed(2)}</Typography>
                    <div className="flex gap-2 items-center">
                      <Typography className="text_light_gray" size="xs">
                        {Number(formatEther(props.data.shares))} SHARES
                      </Typography>
                      <div className="flex items-center">
                        <Image
                          className="min-w-6 min-h-6"
                          src="/img/tokens/wewe.svg"
                          alt=""
                          width={32}
                          height={32}
                        />
                        <Image
                          className="ml-[-10px] min-w-6 min-h-6"
                          src="/img/tokens/usdc.png"
                          alt=""
                          width={32}
                          height={32}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Typography className="flex justify-end w-full mb-3" size="xs">
                  Total fee cost: $ {totalGasCostUSD}
                </Typography>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <Button className="w-full">
                  <Typography secondary size="xs" fw={700} tt="uppercase">
                    COMPLETED
                  </Typography>
                </Button>
                <button
                  className="w-full md:w-auto custom_btn"
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
      </MtModal.Content>
    </MtModal.Root>
  );
};
