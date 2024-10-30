import React from "react";
import { Loader, ModalRootProps, Modal as MtModal } from "@mantine/core";
import { Button, Typography } from "~/components/common";
import { Hex } from "viem";

type ClaimCompleteModalProps = {
  hash: Hex;
  amount?: string;
  onClose: () => void;
} & ModalRootProps;

const ClaimCompleteModal = (props: ClaimCompleteModalProps) => {
  const handleDetails = () => {
    window.open(
      `https://basescan.org/tx/${props.hash}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <MtModal.Root centered {...props}>
      <MtModal.Overlay />
      <MtModal.Content
        classNames={{ content: "bg-black border_stroke text-white p-6" }}
      >
        <MtModal.Body className="flex flex-col gap-5 p-0">
          <div className="flex flex-col items-center">
            <img
              src="/img/icons/check.svg"
              className="w-[76px]"
              alt="succesful"
            />
          </div>

          <Typography
            secondary
            size="xs"
            tt="uppercase"
            className="text_light_gray"
            ta="center"
          >
            successfully claimed
          </Typography>

          <div className="flex items-center justify-center gap-2">
            <img src="/img/tokens/wewe.svg" alt="WEWE logo" />
            <div className="flex flex-col">
              {props.amount ? (
                <>
                  <Typography size="sm" className="text_light_gray">
                    CLAIMED
                  </Typography>
                  <Typography size="md" className="font-bold">
                    {props.amount}
                  </Typography>
                </>
              ) : (
                <Loader />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button className="w-full" onClick={props.onClose}>
              <Typography secondary size="md" fw={700} tt="uppercase">
                completed
              </Typography>
            </Button>

            <Button
              className="border-1 w-full border border-white !bg-black !bg-none"
              onClick={handleDetails}
            >
              <Typography secondary size="md" fw={700} tt="uppercase">
                view details
              </Typography>
            </Button>
          </div>
        </MtModal.Body>
      </MtModal.Content>
    </MtModal.Root>
  );
};

export default ClaimCompleteModal;
