"use client";
import Image from "next/image";
import { Divider, Modal as MtModal, ModalRootProps } from "@mantine/core";
import { Typography } from "~/components/common/Typography";
import { Button } from "~/components/common/Button";

type TransferCompleteProps = {
  onClose: () => void;
} & ModalRootProps;

export const TransferComplete = (props: TransferCompleteProps) => {
  return (
    <MtModal.Root centered {...props}>
      <MtModal.Overlay />
      <MtModal.Content
        classNames={{ content: "bg-black border_stroke text-white p-6" }}
      >
        <MtModal.Header className="bg-transparent p-0">
          <button className="ms-auto" onClick={props.onClose}>
            <Image src="/img/icons/close.svg" width={24} height={24} alt="" />
          </button>
        </MtModal.Header>

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
            successful transfer
          </Typography>

          <div className="flex items-center justify-center gap-2">
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

          <Typography size="xs" ta="start" className="text_light_gray">
            Received 100 VULT Ethereum from Base via Layer Zero
          </Typography>
          <div className="flex flex-col gap-2">
            <Button className="w-full" onClick={props.onClose}>
              <Typography secondary size="md" fw={700} tt="uppercase">
                completed
              </Typography>
            </Button>

            <Button className="w-full opacity-60"  onClick={props.onClose}>
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
