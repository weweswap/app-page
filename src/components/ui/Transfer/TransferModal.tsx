"use client";
import { Divider, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import { Button, Dropdown, Modal, Typography } from "~/components/common";

type TransferModalProps = {
  onClose: () => void;
  onTransfer: () => void;
} & ModalRootProps;

export const TransferModal = (props: TransferModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const handleApprove = () => {
    // Handle token approval logic here, then move to the next step
    setCurrentStep(2);
  };


  return (
    <Modal title="conversion" {...props}>
      <div className="flex items-center gap-2">
        <img src="/img/tokens/vult.base.svg" alt="Vult.Base" />
        <div className="flex flex-col">
          <Typography size="md" fw={700}>
            100 VULT
          </Typography>
          <Typography size="xs" className="text_light_gray">
            US$ 0.02
          </Typography>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <img src="/img/tokens/vult.base.svg" alt="Vult.Base" />
        <img src="/img/tokens/vult.eth.svg" alt="Vult.Eth" />
        <div className="flex flex-col ms-auto ">
          <Typography size="xs" className="text_light_gray">
            Sending from Base via Layer Zero
          </Typography>
          <Typography size="xs" className="text_light_gray">
            100 VULT -{">"} 100 VULT Ethereum
          </Typography>
        </div>
      </div>
      {/* correct network */}
      {
        <div className="flex items-center gap-2">
          <img src="/img/icons/check.svg" alt="check" />
          <Typography size="xs" className="text_light_gray">
            Correct Network
          </Typography>
        </div>
      }
      {/* waiting approval */}
      {currentStep === 1 && (
        <div className="flex items-center gap-2">
          <img src="/img/icons/loading.svg" alt="waiting" />
          <Typography size="xs" className="text_light_gray">
            Please approve tokens
          </Typography>
        </div>
      )}
      {/* tokens approved && waiting sign */}
      {currentStep === 2 && (
        <>
          <div className="flex items-center gap-2">
            <img src="/img/icons/approved.svg" alt="aproved" />
            <Typography size="xs" className="text_light_gray">
              Tokens Approved
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <img src="/img/icons/info-circle.svg" alt="sign" />
            <Typography size="xs" className="text_light_gray">
              Please Sign transaction
            </Typography>
          </div>
        </>
      )}

      <div className="flex items-center gap-2">
        <img src="/img/tokens/eth.base.svg" alt="Eth.Base" />
        <div className="flex flex-col">
          <Typography size="md" fw={700}>
            0.00007172
          </Typography>
          <Typography size="xs" className="text_light_gray">
            US$ 0.00 estimated fees
          </Typography>
        </div>
      </div>
      <Divider className="border-blue-700" />

      <div className="flex justify-between">
        <Typography size="xs">1 VULT = 0.0027 ETH ($1.00)</Typography>
        <div className="flex gap-1 items-center">
          <img src="img/icons/fee.svg" alt="fee" />
          <Typography size="xs">$0.34</Typography>
          <img src="/img/icons/chevron-down.svg" alt="chevron-down" />
        </div>
      </div>

      {currentStep === 1 ? (
        <Button className="w-full" onClick={handleApprove}>
          <Typography secondary size="md" fw={700} tt="uppercase">
            Approve
          </Typography>
        </Button>
      ) : (
        <Button className="w-full" onClick={props.onTransfer}>
          <Typography secondary size="md" fw={700} tt="uppercase">
            Transfer
          </Typography>
        </Button>
      )}
    </Modal>
  );
};
