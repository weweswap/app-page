import React from 'react'
import { Modal as MtModal, ModalRootProps, Loader } from "@mantine/core";
import { Button, Typography } from "~/components/common";
import Image from "next/image";
import * as dn from "dnum";
import { Hex } from 'viem';

type MergeCompleteModalProps = {
  hash: Hex;
  amount?: string;
  ratio: number;
  onClose: () => void;
} & ModalRootProps;

const MergeCompleteModal = (props:MergeCompleteModalProps) => {
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
            successfully merged
          </Typography>
          <div className="flex justify-center gap-2 md:my-5 my-2 md:mb-5 mb-10">
            <Typography size="md" fw={600}>
              Ratio: 1
            </Typography>
            <Image
              src="/img/tokens/goodle.svg"
              width={17}
              height={17}
              alt="GOODLE logo"
            />

            <Typography size="md" fw={600}>
              ≈ {dn.format(dn.from(props.ratio), { locale: "en" })}
            </Typography>

            <Image
              src="/img/tokens/wewe.svg"
              width={17}
              height={17}
              alt="WEWE logo"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <img
              src="/img/tokens/wewe.svg"
              alt="WEWE logo"
            />
            <div className="flex flex-col">
            {
                props.amount
                  ? <>
                    <Typography size="sm" className="text_light_gray">
                      RESERVED
                    </Typography>
                    <Typography size="md" className="font-bold">
                      {props.amount}
                    </Typography>
                  </>
                  : <Loader />
              }
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button className="w-full" onClick={props.onClose}>
              <Typography secondary size="md" fw={700} tt="uppercase">
                completed
              </Typography>
            </Button>

            <Button
              className="w-full !bg-none !bg-black border border-1 border-white"
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
  )
}

export default MergeCompleteModal