import { Divider, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import { Button, Modal, Typography } from "~/components/common";

type TransferModalProps = {
  onTransfer: () => void;
} & ModalRootProps;

export const TransferModal = (props: TransferModalProps) => {
  return (
    <Modal title="Transfer" {...props}>
      <Button className="w-full" onClick={props.onTransfer}>
        <Typography secondary size="md" fw={700}>
          Transfer
        </Typography>
      </Button>
    </Modal>
  );
};
