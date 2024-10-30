import React from "react";
import Image from "next/image";
import { Divider, ModalRootProps } from "@mantine/core";
import { Button, Modal, Typography } from "~/components/common";

type DepositSuccessModalProps = {
  onClose: () => void;
} & ModalRootProps;

const DepositSuccessModal = (props: DepositSuccessModalProps) => {
  return (
    <Modal title="SUCCESS" onClose={props.onClose} opened={props.opened}>
      <div className="flex flex-col items-center gap-4">
        <Typography secondary>DEPOSIT CONFIRMED</Typography>
        <Image src="/img/icons/success.svg" alt="" width={64} height={64} />
        <Typography secondary>NEW DEPOSIT</Typography>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 sm:py-1 ">
        <div className="flex items-center gap-1">
          <Image src="/img/icons/memes.svg" width={20} height={20} alt="" />
          <Typography size="xs" className="translate-x-1">
            {/* {selectedPool.address} */}
            address
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
      <div className="flex items-center justify-between gap-4">
        <Typography secondary size="lg">
          AMOUNT
        </Typography>
        <div className="flex flex-col items-end gap-2">
          <Typography size="xl" fw={1000}>
            $34.54
          </Typography>
          <div className="text_light_gray flex items-center gap-3">
            <Typography size="xs">0.0000001231231 SHARES</Typography>
            <div className="flex">
              <Image src="/img/tokens/usdc.png" height={20} width={20} alt="" />
              <Image
                src="/img/tokens/wewe.png"
                height={20}
                width={20}
                alt=""
                className="translate-x-[-5px]"
              />
            </div>
          </div>
        </div>
      </div>

      <Divider className="border-blue-700" />
      <Typography className="text_light_gray text-right" size="xs">
        Total fees cost: $0.10
      </Typography>
      <Button onClick={props.onClose}>
        <Typography secondary size="lg">
          COMPLETED
        </Typography>
      </Button>
      <button className="custom_btn">
        <Typography secondary size="lg">
          VIEW DETAILS
        </Typography>
      </button>
    </Modal>
  );
};

export default DepositSuccessModal;
