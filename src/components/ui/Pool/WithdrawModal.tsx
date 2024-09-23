import { Divider, Loader, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Typography } from "~/components/common";

type WithdrawModalProps = {
  onOpen: () => void;
  onClose: () => void;
  onWithdrawSuccess: () => void;
} & ModalRootProps;

const WithdrawModal = ({ onWithdrawSuccess, onClose, opened }: WithdrawModalProps) => {
    
    const [withdrawApproval, setWithdrawApproval] = useState<boolean>(false)

    useEffect(() => {
        if(withdrawApproval) onWithdrawSuccess()
    }, [withdrawApproval])

  return (
    <Modal title="WITHDRAW TOKENS" onClose={onClose} opened={opened}>
    
      <div className="flex items-center justify-between gap-2">
        <Typography size="lg" secondary>
          WITHDRAW
        </Typography>
        <Typography size="xl">$34.34</Typography>
      </div>
      <div className="flex gap-4 ">
        <Typography fw={1000} className="text_light_gray" size="sm">0.00000000123344 SHARES</Typography>
        <div className="flex items-center">
            <Image src={"/img/tokens/usdc.png"} alt="" height={24} width={24} />
            <Image src={"/img/tokens/wewe.png"} className="translate-x-[-5px]" alt="" height={24} width={24} />
        </div>
      </div>
<div className="flex flex-col gap-6">
    <div className="flex items-center gap-3">
          <Loader color="gray" size="md"/>
          <Typography>Unstake and claim rewards</Typography>
    </div>
    <div className="flex items-center gap-3">
          <Loader color="gray" size="md" className="" />
          <Typography>Withdraw and claim fees</Typography>
    </div>
    <div className="flex items-center gap-3">
          <Loader color="gray" size="md" />
          <Typography>Please sign transaction</Typography>
    </div>
</div>
<Divider className="border-blue-700" />
    </Modal>
  );
};

export default WithdrawModal;
