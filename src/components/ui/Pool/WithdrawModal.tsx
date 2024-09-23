import { Divider, Loader, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import React, { useEffect } from "react";
import { Modal, Typography } from "~/components/common";
import { useWithdrawalWewePool } from "~/hooks/useWithdrawalWewePool";
import { usePoolContext } from "./PoolContext";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { Hex } from "viem";

export type PayloadWithdrawalModal = {
  burnAmount: number
}

type WithdrawModalProps = {
  onOpen: () => void;
  onClose: () => void;
  onTxError: (hash?: string) => void;
  onWithdrawSuccess: (hash?: Hex) => void;
  data?: PayloadWithdrawalModal;
} & ModalRootProps;

const WithdrawModal = ({ onWithdrawSuccess, onTxError, onClose, opened, data }: WithdrawModalProps) => {
  const { selectedPool } = usePoolContext();
  const { address } = useAccount();
  const {
    hash: hashWithdrawal,
    isPending: isPendingWithdrawal,
    isConfirming: isConfirmingWithdrawal,
    isError: isErrorWithdrawal,
    withdrawal,
  } = useWithdrawalWewePool();

  useEffect(() => {
    async function deposit () {
      if (selectedPool && data && address) {
        await withdrawal(selectedPool.address, ethers.parseUnits(String(data.burnAmount), 18), address)
      }
    }
    deposit()
  }, [selectedPool, data, address])

  useEffect(() => {
    if (isErrorWithdrawal) {
      onTxError(hashWithdrawal)
    }
  }, [isErrorWithdrawal, hashWithdrawal])


  useEffect(() => {
    if (hashWithdrawal && (!isPendingWithdrawal) && (!isConfirmingWithdrawal)) {
      onWithdrawSuccess(hashWithdrawal)
    }
  }, [hashWithdrawal, isPendingWithdrawal, isConfirmingWithdrawal])

  return (
    <Modal title="WITHDRAW TOKENS" onClose={onClose} opened={opened}>
      <div className="flex items-center justify-between gap-2">
        <Typography size="lg" secondary>
          WITHDRAW
        </Typography>
        {/* <Typography size="xl">$34.34</Typography> */}
      </div>
      <div className="flex gap-4 ">
        <Typography fw={1000} className="text_light_gray" size="sm">{data?.burnAmount} SHARES</Typography>
        <div className="flex items-center">
            <Image src={selectedPool?.token0.icon!} alt="" height={24} width={24} />
            <Image src={selectedPool?.token1.icon!} className="translate-x-[-5px]" alt="" height={24} width={24} />
        </div>
      </div>
      <div className="flex flex-col gap-6">
      {/* <div className="flex items-center gap-3">
        <Loader color="gray" size="md"/>
        <Typography>Unstake and claim rewards</Typography>
      </div> */}
      <div className="flex items-center gap-3">
        { 
          isPendingWithdrawal || isConfirmingWithdrawal || !hashWithdrawal 
            ? <Loader color="grey" />
            : <Image src="/img/icons/success.svg" width={36} height={36} alt='' /> 
        }
        <Typography>Withdraw and claim fees</Typography>
      </div>
      {
        !isConfirmingWithdrawal &&
        <div className='flex gap-3 items-center'>
          <Image src="/img/icons/inform.svg" width={36} height={36} alt='' />
          <Typography>Please sign transaction</Typography>
        </div>
      }
      </div>
      <Divider className="border-blue-700" />
    </Modal>
  );
};

export default WithdrawModal;
