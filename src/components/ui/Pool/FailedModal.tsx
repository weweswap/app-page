import React from "react";
import Image from "next/image";
import { ModalRootProps } from "@mantine/core";
import { Button, Modal, Typography } from "~/components/common";

type FailedModalProps = {
  onClose: () => void;
  hash: string;
} & ModalRootProps;

const FailedModal = (props: FailedModalProps) => {
  const handleDetails = () => {
    window.open(
      `https://basescan.org/tx/${props.hash}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  return (
    <Modal title="UNSUCCESSFUL" onClose={props.onClose} opened={props.opened}>
      <div className="flex w-full flex-col items-center gap-4 text-center">
        <Image src="/img/icons/fail.png" alt="" width={72} height={72} />
        <Typography secondary>FAILED TX</Typography>
        <Button className="w-full" onClick={props.onClose}>
          <Typography size="xs" secondary>
            CLOSE
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
    </Modal>
  );
};

export default FailedModal;
