"use client";
import Image from "next/image";
import { Divider, Modal as MtModal, ModalRootProps } from "@mantine/core";
import { Typography } from "~/components/common/Typography";
import { Button } from "~/components/common/Button";

type SwapCompleteProps = {
  onClose: () => void;
} & ModalRootProps;

export const SwapCompleteModal = (props: SwapCompleteProps) => {
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
            successfuly swapped
          </Typography>

          <div className="flex items-center justify-center gap-2">
            <img src="/img/tokens/usdc.png" alt="USDC" />
            <div className="flex flex-col">
              <Typography size="md" fw={700}>
                $109.92
              </Typography>
              <Typography size="xs" className="text_light_gray">
                US$ 0.00 estimated fees
              </Typography>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button className="w-full" onClick={props.onClose}>
              <Typography secondary size="md" fw={700} tt="uppercase">
                completed
              </Typography>
            </Button>

            <Button className="w-full opacity-60" onClick={props.onClose}>
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
