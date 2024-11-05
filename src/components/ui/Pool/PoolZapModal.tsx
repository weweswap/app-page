import {Divider, Loader, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { Button, Modal, Typography } from "~/components/common";
import { Hex } from "viem";
import { usePoolContext } from "./PoolContext";
import { useAccount } from "wagmi";
import { useZapIn } from "../../../hooks/useZapIn";
import { ethers } from "ethers";
import { useApproveToken } from "../../../hooks/useApproveToken";
import { CONTRACT_ADDRESSES } from "../../../constants";

export type PayloadZapInModal = {
  zapInAmount: string;
  zapInTokenAddress: Hex;
};

const handleDetails = (hash: string) => {
  window.open(
    `https://basescan.org/tx/${hash}`,
    "_blank",
    "noopener,noreferrer"
  );
};

type ZapModalProps = {
  onOpen: () => void;
  onClose: () => void;
  onTxError: (hash?: string) => void;
  data?: PayloadZapInModal;
} & ModalRootProps;

const PoolZapModal = ({ onTxError, onClose, opened, data }: ZapModalProps) => {
  const { selectedPool } = usePoolContext();
  const { address } = useAccount();

  const {
    hash: hashApproveToken,
    isPending: isPendingApproveToken,
    isConfirming: isConfirmingApproveToken,
    isError: isErrorApproveToken,
    approve: approveToken,
  } = useApproveToken();

  const {
    hash: hashZapIn,
    isPending: isPendingZapIn,
    isConfirming: isConfirmingZapIn,
    isError: isErrorZapIn,
    zapIn,
  } = useZapIn();

  // Determine the zap-in token based on the address
  const zapInToken = useMemo(() => {
    if (!data || !selectedPool) return null;
    const { zapInTokenAddress } = data;
    if (
      zapInTokenAddress.toLowerCase() ===
      selectedPool.token0.address.toLowerCase()
    ) {
      return selectedPool.token0;
    } else if (
      zapInTokenAddress.toLowerCase() ===
      selectedPool.token1.address.toLowerCase()
    ) {
      return selectedPool.token1;
    }
  }, [data, selectedPool]);

  useEffect(() => {
    async function deposit() {
      if (selectedPool && data && address) {
        await approveToken(
          data.zapInTokenAddress,
          CONTRACT_ADDRESSES.zapContract,
          ethers.parseUnits(data.zapInAmount, zapInToken?.decimals),
        );
        await zapIn(
          selectedPool.address,
          zapInToken!.address,
          ethers
            .parseUnits(data.zapInAmount, zapInToken?.decimals)
            .toString()
        );
      }
    }
    deposit();
  }, [selectedPool, data, address]);

  useEffect(() => {
    if (isErrorApproveToken || isErrorZapIn) {
      onTxError(hashApproveToken || hashZapIn);
    }
  }, [isErrorApproveToken, isErrorZapIn, hashApproveToken, hashZapIn]);

  const finishSuccessfully =
    hashApproveToken &&
    hashZapIn &&
    (!isPendingApproveToken || !isPendingZapIn) &&
    (!isConfirmingApproveToken || !isConfirmingZapIn);

  return (
    <Modal title="ZAP IN" onClose={onClose} opened={opened}>
      <div className="flex items-center justify-between gap-2">
        <Typography size="lg" secondary>
          ZAP-IN
        </Typography>
      </div>
      <div className="flex gap-4 ">
        <Typography fw={1000} className="text_light_gray" size="sm">
          {data?.zapInAmount} {zapInToken?.symbol}
        </Typography>
        <div className="flex items-center">
          <Image
            src={zapInToken?.icon!}
            alt=""
            height={24}
            width={24}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 items-center">
          {isPendingApproveToken ||
          isConfirmingApproveToken ||
          !hashApproveToken ? (
            <>
              <Loader color="grey" />
              <Typography>
                Please Approve {zapInToken?.symbol}
              </Typography>
            </>
          ) : (
            <>
              <Image
                src="/img/icons/success.svg"
                width={36}
                height={36}
                alt=""
              />
              <Typography>{zapInToken?.symbol} Approved</Typography>
            </>
          )}
        </div>
        <div className="flex gap-3 items-center">
          {isPendingZapIn || !hashZapIn ? (
            <>
              <Loader color="grey" />
              <Typography>Please deposit tokens</Typography>
            </>
          ) : (
            <>
              <Image
                src="/img/icons/success.svg"
                width={36}
                height={36}
                alt=""
              />
              <Typography>Tokens deposited</Typography>
            </>
          )}
        </div>
        {!isConfirmingApproveToken &&
          !isConfirmingZapIn &&
          !finishSuccessfully && (
            <div className="flex gap-3 items-center">
              <Image
                src="/img/icons/inform.svg"
                width={36}
                height={36}
                alt=""
              />
              <Typography>Please sign transaction</Typography>
            </div>
          )}
      </div>
      <Divider className="border-blue-700" />
      <div className="flex justify-end">
        <Typography className="text_light_gray" size="xs">
          Total fee cost: $0.10
        </Typography>
      </div>
      {finishSuccessfully && (
        <div className="flex flex-col gap-4 w-full">
          <Button onClick={onClose} className="w-full">
            <Typography secondary size="xs" fw={700} tt="uppercase">
              COMPLETED
            </Typography>
          </Button>
          <Button
            className="w-full md:w-auto"
            onClick={() => handleDetails(hashZapIn!)}
          >
            <Typography secondary size="xs" fw={700} tt="uppercase">
              VIEW DETAILS
            </Typography>
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default PoolZapModal;
