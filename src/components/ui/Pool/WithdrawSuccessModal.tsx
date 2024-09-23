import { Loader, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { Button, Modal, Typography } from "~/components/common";
import { useGetBurnEvents } from "~/hooks/useGetBurnEvents";
import { usePoolContext } from "./PoolContext";
import { Hex } from "viem";
import { ethers } from "ethers";

export type PayloadWithdrawalSuccess = {
  hash?: Hex
}

type WithdrawSuccessModalProps = {
  onOpen: () => void;
  onClose: () => void;
  data?: PayloadWithdrawalSuccess
} & ModalRootProps;

const handleDetails = (hash: string) => {
  window.open(
    `https://basescan.org/tx/${hash}`,
    "_blank",
    "noopener,noreferrer"
  );
};

const WithdrawSuccessModal = ({
  onClose,
  opened,
  data
}: WithdrawSuccessModalProps) => {
  const { selectedPool } = usePoolContext();
  const { data: event } = useGetBurnEvents(selectedPool?.address, data?.hash)

  if (!event) {
    return (
      <Modal title="WITHDRAW SUCCESS" onClose={onClose} opened={opened}>
        <div className="flex flex-col items-center gap-6">
          <Loader color="grey" />
        </div>
      </Modal>
    );
  }
  
  return (
    <Modal title="WITHDRAW SUCCESS" onClose={onClose} opened={opened}>
      <div className="flex flex-col items-center gap-6">
        <Typography size="lg" secondary className="text-center">
          WITHDRAW CONFIRMED
        </Typography>
        <div className="my-2 mx-auto">
          <Image src={"/img/icons/success.svg"} alt="" height={64} width={64} />
        </div>
        <Typography secondary size="md" className="text-center">
          WITHDRAW SHARES
        </Typography>
        {/* <div className="flex items-center gap-9 justify-center">
          <Typography secondary size="sm">
            AMOUNT
          </Typography>
          <Typography size="xl" fw={1000}>
            34.34
          </Typography>
        </div> */}
        <div className="flex gap-4 justify-center">
          <Typography fw={1000} className="text_light_gray" size="sm">
            {ethers.formatUnits(event.args.burnAmount.toString(), 18)} SHARES
          </Typography>
          <div className="flex items-center">
            <Image src={selectedPool?.token0.icon!} alt="" height={24} width={24} />
            <Image
              src={selectedPool?.token1.icon!}
              className="translate-x-[-5px]"
              alt=""
              height={24}
              width={24}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 justify-between w-full">
          <Typography fw={1000} className="text_light_gray" size="sm">
            TOKENS CLAIMED
          </Typography>
          <div className="flex  gap-3">
            <div className="flex gap-2 items-center">
              <Typography fw={1000} size="sm">
                {Number(ethers.formatUnits(event.args.amount0Out.toString(), selectedPool?.token0.decimals)).toFixed(4)}
              </Typography>
              <Image
                src={selectedPool?.token0.icon!}
                alt=""
                height={32}
                width={32}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Typography fw={1000} size="sm">
                {Number(ethers.formatUnits(event.args.amount1Out.toString(), selectedPool?.token1.decimals)).toFixed(4)}
              </Typography>
              <Image
                src={selectedPool?.token1.icon!}
                alt=""
                height={32}
                width={32}
              />
            </div>
          </div>
        </div>
        {/* <Typography secondary size="lg">
          CLAIMED FEES
        </Typography>
        <Typography fw={1000} size="xxl">
          $2.34
        </Typography>
        <div className="flex gap-2 items-center">
          <Typography fw={1000} size="lg">
            2.34 USDC
          </Typography>
          <Image src={"/img/tokens/usdc.png"} alt="" height={40} width={40} />
        </div>
        <Typography secondary size="lg">
          CLAIMED CHAOS
        </Typography>
        <Typography fw={1000} size="xxl">
          $2.34
        </Typography>
        <div className="flex gap-2 items-center">
          <Typography fw={1000} size="lg">
          1020,02 CHAOS
          </Typography>
          <Image src={"/img/icons/chaos.svg"} alt="" height={40} width={40} />
        </div> */}
        <Typography size="sm" fw={1000} className="text-right w-full text_light_gray">Total fee cost: $0.10</Typography>
        <Button className="w-full" onClick={onClose}>
            COMPLETED
        </Button>
        <button className="custom_btn w-full" onClick={() => handleDetails(data?.hash!)}>
            VIEW DETAILS
        </button>
      </div>
    </Modal>
  );
};

export default WithdrawSuccessModal;
