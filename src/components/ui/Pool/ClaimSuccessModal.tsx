import React from "react";
import Image from "next/image";
import { ModalRootProps } from "@mantine/core";
import { Button, Modal, Typography } from "~/components/common";
import { formatNumber } from "~/utils";

type ClaimSuccessModalProps = {
  onClose: () => void;
  hash: string;
  data: {
    pendingUsdcReward: string;
    pendingChaosReward: string;
    gasFee?: number;
  };
} & ModalRootProps;

const ClaimSuccessModal = (props: ClaimSuccessModalProps) => {
  const handleDetails = () => {
    window.open(
      `https://basescan.org/tx/${props.hash}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  return (
    <Modal title="SUCCESS" onClose={props.onClose} opened={props.opened}>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-7">
          <Image src="/img/icons/success.svg" width={80} height={80} alt="" />
          <Typography size="md" secondary className="text-center">
            SUCCESSFULLY CLAIMED FEES
          </Typography>
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Image src="/img/icons/memes.svg" width={20} height={20} alt="" />
              <Typography size="xs" className="translate-x-1">
                MEMES: 1%
              </Typography>
            </div>

            <div className="flex items-center gap-1">
              <Image
                src="/img/icons/Infinity.svg"
                width={20}
                height={20}
                alt=""
              />
              <Typography size="xs" className="translate-x-1">
                INFINITY
              </Typography>
            </div>
          </div>
          <div className="mb-5 flex flex-col items-center gap-3">
            <Typography size="sm" secondary>
              CLAIMED FEES
            </Typography>
            <Typography size="lg" className="font-bold">
              $
              {formatNumber(props.data.pendingUsdcReward, { decimalDigits: 6 })}
            </Typography>
            <div className="mb-3 flex items-center gap-2">
              <Typography size="xs">
                {formatNumber(props.data.pendingUsdcReward, {
                  decimalDigits: 6,
                })}{" "}
                USDC
              </Typography>
              <Image src="/img/tokens/usdc.png" alt="" height={30} width={30} />
            </div>
            <Typography size="sm" secondary className="mt-5">
              CLAIMED CHAOS
            </Typography>
            <div className="flex items-center gap-2">
              <Typography size="xs">
                {formatNumber(props.data.pendingChaosReward, {
                  decimalDigits: 6,
                })}{" "}
                CHAOS
              </Typography>
              <Image
                src="/img/tokens/rewards.svg"
                alt=""
                height={30}
                width={30}
              />
            </div>
          </div>
          <Typography className="mb-3 flex w-full justify-end" size="xs">
            Total estimated fees:US$ {props?.data?.gasFee?.toFixed(4)}
          </Typography>
        </div>
        <div className="mt-5 flex w-full flex-col gap-4">
          <Button onClick={props.onClose} className="w-full">
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
    </Modal>
  );
};

export default ClaimSuccessModal;
