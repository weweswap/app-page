import React, { useState } from 'react'
import { Modal as MtModal, ModalRootProps, Loader } from "@mantine/core";
import { Button, Typography } from "~/components/common";
import Image from "next/image";
import * as dn from "dnum";
import { Hex } from 'viem';

import { useAccount, useWatchContractEvent } from 'wagmi';
import MemeEaterAbi from '~/lib/abis/MemeEaterABI';
import { MergeConfig } from '~/constants/mergeConfigs';

type MergeCompleteModalProps = {
  hash: Hex;
  ratio: number;
  onClose: () => void;
  mergeConfig: MergeConfig;
} & ModalRootProps;

const MergeCompleteModal = (props:MergeCompleteModalProps) => {
  const { mergeConfig, ...restOfTheProps } = props;
  const { address} = useAccount();
  const [mergedAmount, setMergedAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const handleDetails = () => {
    window.open(
      `https://basescan.org/tx/${props.hash}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  useWatchContractEvent({
    address: mergeConfig.eaterContractAddress,
    abi: MemeEaterAbi,
    eventName: "Merged",
    onLogs: (data) => {
      const eventInfo = data[0].args;
      if(eventInfo.account?.toLowerCase() === address?.toLocaleLowerCase()) {
        setMergedAmount(dn.format([eventInfo.weweAmount || 0n, 18], { locale: "en", digits: 3 }));
        setIsLoading(false);
      }
    },
  });

  return (
    <MtModal.Root centered {...restOfTheProps}>
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
              src={mergeConfig.inputToken.icon}
              width={17}
              height={17}
              className="rounded-full h-5 w-5"
              alt={`${mergeConfig.inputToken.symbol} logo`}
            />

            <Typography size="md" fw={600}>
              ≈ {dn.format(dn.from(props.ratio), { locale: "en" })}
            </Typography>

            <Image
              src="/img/tokens/wewe.svg"
              width={17}
              height={17}
              className="rounded-full h-5 w-5"
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
                isLoading
                  ? <Loader /> : <>
                    <Typography size="sm" className="text_light_gray">
                      RESERVED
                    </Typography>
                    <Typography size="md" className="font-bold">
                      {mergedAmount}
                    </Typography>
                  </>
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