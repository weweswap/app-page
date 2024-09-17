import { Divider, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { Button, Card, Modal, Typography } from "~/components/common";

type ClaimedFeesModalProps = {
  onClaim: () => void;
  onClose: () => void;
  onOpen: () => void;
} & ModalRootProps;

const ClaimedFeesModal = (props: ClaimedFeesModalProps) => {
  return (
    <Modal
      title="CLAIM FEES AND REWARDS"
      onClose={props.onClose}
      opened={props.opened}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Image src="/img/icons/rocket.svg" alt="" height={20} width={20} />
          <Typography size="xs">MEMES 1%</Typography>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/img/icons/Infinity.svg" alt="" height={20} width={20} />
          <Typography size="xs">INFINITY</Typography>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Image
          src="/img/icons/pending.svg"
          alt="Pending"
          width={50}
          height={50}
        />
        <Typography size="sm" secondary>
          PENDING FEES
        </Typography>
        <Typography size="lg" className="font-bold">
          $2,34
        </Typography>
        <div className="flex items-center gap-2">
          <Typography size="xs">2,34 USDC</Typography>
          <Image src="/img/tokens/usdc.png" alt="" height={20} width={20} />
        </div>
        <Typography size="xs" className="text_light_gray pt-10">
          Estimated Fees: $0,017
        </Typography>
        <Divider className="border-blue-700 w-full" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <Image
          src="/img/icons/pending.svg"
          alt="Pending"
          width={50}
          height={50}
        />
        <Typography size="sm" secondary>
          PENDING CHAOS
        </Typography>
        <Typography size="lg" className="font-bold">
          $2,34
        </Typography>
        <div className="flex items-center gap-2">
          <Typography size="xs">1020,02 CHAOS</Typography>
          <Image src="/img/icons/chaos.svg" alt="" height={20} width={20} />
        </div>
        <Typography size="xs" className="text_light_gray">
          Estimated Fees: $0,017
        </Typography>
        <Button onClick={props.onClaim} className="w-full">
          <Typography secondary>CLAIM</Typography>
        </Button>
      </div>
    </Modal>
  );
};

export default ClaimedFeesModal;
