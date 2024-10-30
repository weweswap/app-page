import React from "react";
import Image from "next/image";
import { ModalRootProps } from "@mantine/core";
import { Button, Modal, Typography } from "~/components/common";

type SuccessModalProps = {
  onOpen: () => void;
  onClose: () => void;
} & ModalRootProps;

const SuccessModal = (props: SuccessModalProps) => {
  return (
    <Modal title="" opened={props.opened} onClose={props.onClose}>
      <div className="flex flex-col items-center gap-8 ">
        <div className="flex flex-col items-center gap-3">
          <Image src="/img/icons/success.svg" width={80} height={80} alt="" />
          <Typography size="md">SUCCESSFULLY TRANSFER</Typography>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <Image
              className="ml-[-10px] min-h-6 min-w-6"
              src="/img/tokens/eth.base.svg"
              alt=""
              width={48}
              height={48}
            />
          </div>
          <div>
            <Typography className="font-bold" size="md">
              0.00007172
            </Typography>
            <Typography className="text_light_gray" size="xs">
              US $0.10 estimated fees
            </Typography>
          </div>
        </div>
        <div>
          <Typography className="text_light_gray" size="xs">
            Received 100 VULT in Ethereum from Base
          </Typography>
        </div>

        <div className="flex w-full flex-col gap-4">
          <Button className="w-full">
            <Typography secondary size="sm" fw={700} tt="uppercase">
              COMPLETED
            </Typography>
          </Button>
          <Button className="w-full md:w-auto" disabled>
            <Typography secondary size="sm" fw={700} tt="uppercase">
              VIEW DETAILS
            </Typography>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
