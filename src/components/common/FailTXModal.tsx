"use client";

import { ModalRootProps, Modal as MtModal } from "@mantine/core";
import { Button } from "~/components/common/Button";
import { Typography } from "~/components/common/Typography";
import { Hex } from "viem";

type FailTXProps = {
  hash: Hex;
  onClose: () => void;
} & ModalRootProps;

export const FailTXModal = (props: FailTXProps) => {
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
              src="/img/icons/fail.svg"
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
            failed TX
          </Typography>

          <div className="flex flex-col gap-2">
            <Button className="w-full" onClick={props.onClose}>
              <Typography secondary size="md" fw={700} tt="uppercase">
                close
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
        </MtModal.Body>
      </MtModal.Content>
    </MtModal.Root>
  );
};
