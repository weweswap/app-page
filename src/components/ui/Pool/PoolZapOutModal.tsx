import {Divider, Loader, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
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
  const [finalTxValue, setFinalTxValue] = useState<number>()

  const {
    hash: hashApproveToken,
    isPending: isPendingApproveToken,
    isConfirming: isConfirmingApproveToken,
    isError: isErrorApproveToken,
    approve: approveToken,
  } = useApproveToken();

  const {
    hash: hashZapOut,
    isPending: isPendingZapOut,
    isConfirming: isConfirmingZapOut,
    isError: isErrorZapOut,
    zapOut,
    zapOutError
  } = useZapOut();

  const zapOutToken = useMemo(() => {
    if (!data || !selectedPool) return null;
    const { zapOutTokenAddress } = data;
    if (
      zapOutTokenAddress.toLowerCase() ===
      selectedPool.token0.address.toLowerCase()
    ) {
      return selectedPool.token1;
    } else if (
        zapOutTokenAddress.toLowerCase() ===
      selectedPool.token1.address.toLowerCase()
    ) {
      return selectedPool.token0;
    }
  }, [data, selectedPool]);
  
  
  useEffect(() => {
    async function withdraw () {
        if(selectedPool && data && address) {
            const approveTx = await approveToken(
                CONTRACT_ADDRESSES.weweVault, //we need to approve SHARES token
                CONTRACT_ADDRESSES.zapContract,
                ethers.parseUnits(data.zapOutAmount, 18) //shares decimals, we SHOULD NOT HARDCODE THEM
            )
            

            
        const txReceipt= await zapOut(
            selectedPool?.address, 
            zapOutToken!.address,  
            ethers.parseUnits(data?.zapOutAmount, 18) //shares decimals, we SHOULD NOT HARDCODE THEM
            .toString() as `0x${string}`)

            const totalFee = (txReceipt!?.gasUsed * txReceipt!?.gasPrice);
            const getUsdFees = async () => {
              const finalUsdValue = await usdConverter(totalFee)
              setFinalTxValue(finalUsdValue)
            }
      
          getUsdFees() 
        }
    }
    withdraw()
  }, [data, selectedPool, address])

  useEffect(() => {
    if (isErrorApproveToken || isErrorZapOut) {
      onTxError(hashApproveToken || hashZapOut);
    }
  }, [isErrorApproveToken, isErrorZapOut, hashApproveToken, hashZapOut]);

  const finishSuccessfully =
    hashApproveToken &&
    hashZapOut && (!isPendingZapOut) && (!isConfirmingZapOut) &&
    (!zapOutError)


  return (
    <Modal title="ZAP OUT" onClose={onClose} opened={opened}>
     <div className="flex gap-4 ">
        <Typography fw={1000} className="text_light_gray" size="sm">
          {data?.zapOutAmount} SHARES
        </Typography>
        <div className="flex items-center">
          <Image
            src="/img/tokens/shares.png"
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
                Please Approve Shares
              </Typography>
            </>
          ) : (
            !isErrorApproveToken ?
            <>
              <Image
                src="/img/icons/success.svg"
                width={36}
                height={36}
                alt=""
              />
              <Typography>Shares Approved</Typography>
            </>
            :
             <>
             <Image
               src="/img/icons/fail.png"
               width={36}
               height={36}
               alt=""
             />
             <Typography>Error approving tokens</Typography>
           </>
          )}
        </div>
        <div className="flex gap-3 items-center">
          {(isPendingZapOut || !hashZapOut) && !zapOutError ? (
            <>
              <Loader color="grey" />
              <Typography>Please withdraw tokens</Typography>
            </>
          ) : (zapOutError ?
            <>
              <Image
                src="/img/icons/fail.png"
                width={36}
                height={36}
                alt=""
              />
              <Typography>Error in withdrawal</Typography>
            </>
            :
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
        {((isPendingZapOut || !hashZapOut) && !zapOutError) ? 
            <div className="flex gap-3 items-center">
              <Image
                src="/img/icons/inform.svg"
                width={36}
                height={36}
                alt=""
              />
              <Typography>Please sign transaction</Typography>
            </div>
            :
            <></>
          }
      </div>
     
      {(isPendingZapOut || !hashZapOut) && !zapOutError ? 
      <></> : (
        <>
     <Divider className="border-blue-700" />
        <div className="flex justify-end">
         <Typography size="xs" className="text_light_gray  flex">
          Total fee cost: {!finalTxValue ? <span className="animate-pulse">$0.00</span> 
            : <>
              {`${(finalTxValue)?.toFixed(4)}`}
            </>}
        </Typography>
      </div>
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
        </>
      )}
      
    </Modal>
  );
};

export default PoolZapOutModal;
