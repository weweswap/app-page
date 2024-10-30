import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Divider, Loader, ModalRootProps } from "@mantine/core";
import { Modal, Typography } from "~/components/common";

type DepositModalProps = {
  onOpen: () => void;
  onClose: () => void;
  onDepositSuccess: () => void;
} & ModalRootProps;

const PoolDepositModal = ({
  onDepositSuccess,
  onClose,
  opened,
}: DepositModalProps) => {
  const [depositApproval] = useState<boolean>(false);

  useEffect(() => {
    if (depositApproval) onDepositSuccess();
  }, [depositApproval]);

  return (
    <Modal title="DEPOSIT TOKENS" onClose={onClose} opened={opened}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image src="/img/icons/rocket.svg" alt="" height={24} width={24} />
          <Typography size="xs" className="text_light_gray">
            MEMES 1%
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/img/icons/Infinity.svg" alt="" height={24} width={24} />
          <Typography size="xs" className="text_light_gray">
            INFINITY
          </Typography>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Typography size="lg" secondary>
          DEPOSIT
        </Typography>
        <Typography>$34.34</Typography>
      </div>
      <div className="flex items-start justify-between gap-2">
        <Typography className="text_light_gray">TOKENS</Typography>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <Typography>17.27</Typography>
            <Image src="/img/tokens/usdc.png" alt="" height={24} width={24} />
          </div>
          <div className="flex items-center gap-1">
            <Typography>4,283.15</Typography>
            <Image src="/img/tokens/wewe.png" alt="" height={24} width={24} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Loader color="gray" size="md" />
          <Typography>Please approve USDC</Typography>
        </div>
        <div className="flex items-center gap-3">
          <Loader color="gray" size="md" className="" />
          <Typography>Please approve WEWE</Typography>
        </div>
        <div className="flex items-center gap-3">
          <Loader color="gray" size="md" />
          <Typography>Please deposit and stake</Typography>
        </div>
        <div className="flex items-center gap-3">
          <Loader color="gray" size="md" />
          <Typography>Please sign transaction</Typography>
        </div>
      </div>
      <Divider className="border-blue-700" />
      <div className="flex justify-end">
        <Typography size="xs">Total fee cost: $0.10</Typography>
      </div>
    </Modal>
  );
};

export default PoolDepositModal;
