import {Divider, Loader, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { Button, Modal, Typography } from "~/components/common";
import { Hex } from "viem";
import { usePoolContext } from "./PoolContext";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useApproveToken } from "../../../hooks/useApproveToken";
import { CONTRACT_ADDRESSES } from "../../../constants";
import { useZapOut } from "~/hooks/useZapOut";
import { usdConverter } from "~/utils";

export type PayloadZapOutModal = {
  zapOutAmount: string;
  zapOutTokenAddress: Hex;
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
  data?: PayloadZapOutModal;
} & ModalRootProps;

const PoolZapOutModal = ({ onTxError, onClose, opened, data }: ZapModalProps) => {

  const handleDetails = (hash: string) => {
    window.open(
      `https://basescan.org/tx/${hash}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

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
    hash: hashZapOut,
    isPending: isPendingZapIn,
    isConfirming: isConfirmingZapIn,
    isError: isErrorZapIn,
    zapOut,
  } = useZapOut();


  const zapOutToken = useMemo(() => {
    if (!data || !selectedPool) return null;
    const { zapOutTokenAddress } = data;
    if (
      zapOutTokenAddress.toLowerCase() ===
      selectedPool.token0.address.toLowerCase()
    ) {
      return selectedPool.token0;
    } else if (
        zapOutTokenAddress.toLowerCase() ===
      selectedPool.token1.address.toLowerCase()
    ) {
      return selectedPool.token1;
    }
  }, [data, selectedPool]);
  
  
  useEffect(() => {
    async function withdraw () {
        if(selectedPool && data && address) {
            await approveToken(
                CONTRACT_ADDRESSES.weweVault, //we need to approve SHARES token
                CONTRACT_ADDRESSES.zapContract,
                ethers.parseUnits(data.zapOutAmount, 18) //shares decimals, we SHOULD NOT HARDCODE THEM
            )
            console.log("Is approved:", !isErrorApproveToken)
        const txReceipt = await zapOut(
            selectedPool?.address, 
            zapOutToken!.address,  
            ethers.parseUnits(data?.zapOutAmount, 18) //shares decimals, we SHOULD NOT HARDCODE THEM
            .toString() as `0x${string}`)

            console.log("REceipt:", txReceipt)

            const totalFee = (txReceipt!?.gasUsed * txReceipt!?.gasPrice);
            const getUsdFees = async () => {
              const finalUsdValue = await usdConverter(totalFee)
              // setTotalGasFee(finalUsdValue)
      
            }
      
          getUsdFees() 
        }
    }
    withdraw()
  }, [data, selectedPool, address])

  useEffect(() => {
    if (isErrorApproveToken || isErrorZapIn) {
      onTxError(hashApproveToken || hashZapOut);
    }
  }, [isErrorApproveToken, isErrorZapIn, hashApproveToken, hashZapOut]);

  const finishSuccessfully =
    hashApproveToken &&
    hashZapOut &&
    (!isPendingApproveToken || !isPendingZapIn) &&
    (!isConfirmingApproveToken || !isConfirmingZapIn);

  return (
    <Modal title="ZAP OUT" onClose={onClose} opened={opened}>
     <div className="flex gap-4 ">
        <Typography fw={1000} className="text_light_gray" size="sm">
          {data?.zapOutAmount} {zapOutToken?.symbol}
        </Typography>
        <div className="flex items-center">
          <Image
            src={zapOutToken?.icon!}
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
                Please Approve {zapOutToken?.symbol}
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
              <Typography>{zapOutToken?.symbol} Approved</Typography>
            </>
          )}
        </div>
        <div className="flex gap-3 items-center">
          {isPendingZapIn || !hashZapOut ? (
            <>
              <Loader color="grey" />
              <Typography>Please withdraw tokens</Typography>
            </>
          ) : (
            <>
              <Image
                src="/img/icons/success.svg"
                width={36}
                height={36}
                alt=""
              />
              <Typography>Token withdrawal successful</Typography>
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
            onClick={() => handleDetails(hashZapOut!)}
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

export default PoolZapOutModal;
