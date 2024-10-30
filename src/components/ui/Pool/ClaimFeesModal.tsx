import { Divider, Loader, ModalRootProps } from "@mantine/core";
import { ethers } from "ethers";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useEstimateGas, useGasPrice } from "wagmi";
import { Button, Card, Modal, Typography } from "~/components/common";
import { WewePosition } from "~/hooks/useWewePositions";
import { formatNumber, usdConverter } from "~/utils";

type ClaimedFeesModalProps = {
  onClaim: () => void;
  onClose: () => void;
  onOpen: () => void;
  wewePosition?: WewePosition;
  loading: boolean;
} & ModalRootProps;

const ClaimedFeesModal = ({ wewePosition, opened, onClose, onClaim, loading}: ClaimedFeesModalProps) => {

  const {data: gasPrice} = useGasPrice()
  const {data: gasLimit} = useEstimateGas();
  const [estimateFee, setEstimateFee] = useState<number>();

 useEffect(() => {
  const feeCalculate = async () => {
    if(gasPrice && gasLimit) {
      const estimateFeeWei = gasPrice*gasLimit
      try {
        const data = await usdConverter(estimateFeeWei)
        setEstimateFee(data)
      } catch (error) {
        console.log("Error calculating fees:", error)
      }
    }
  }
  feeCalculate()
 }, [])

  return (
    <Modal
      title="CLAIM FEES AND REWARDS"
      onClose={onClose}
      opened={opened}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Image src="/img/icons/rocket.svg" alt="" height={20} width={20} />
          <Typography size="xs">MEMES 1%</Typography>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/img/icons/Infinity.svg" alt="" height={20} width={20} />
          <Typography size="xs">INFINITY</Typography>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Image
          src="/img/icons/pending.svg"
          alt="Pending"
          width={50}
          height={50}
        />
        <Typography size="sm" secondary>
          PENDING FEES
        </Typography>
        <Typography size="lg" className="font-bold">
          ${
            formatNumber(wewePosition?.pendingUsdcReward || "0", { decimalDigits: 6 })
          }
        </Typography>
        <div className="flex items-center gap-2">
          <Typography size="xs">{formatNumber(wewePosition?.pendingUsdcReward || "0", { decimalDigits: 6 })} USDC</Typography>
          <Image src="/img/tokens/usdc.png" alt="" height={20} width={20} />
        </div>
        {/* <Typography size="xs" className="text_light_gray pt-10">
          Estimated Fees: $0,017
        </Typography> */}
        <Divider className="border-blue-700 w-full" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <Image
          src="/img/icons/pending.svg"
          alt="Pending"
          width={50}
          height={50}
        />
        <Typography size="sm" secondary>
          PENDING CHAOS
        </Typography>
        <div className="flex items-center gap-2">
          <Typography size="xs">
            {
              formatNumber(wewePosition?.pendingChaosReward || "0", { decimalDigits: 6 })
            } CHAOS</Typography>
          <Image src="/img/icons/chaos.svg" alt="" height={20} width={20} />
        </div>
        <Typography size="xs" className="text_light_gray pt-10">
          Estimated Fees: ${estimateFee?.toFixed(4)}
        </Typography>
        <Button onClick={onClaim} className="w-full flex items-center justify-center gap-2" disabled={loading}>
          <Typography secondary>CLAIM</Typography>
          {loading && <Loader color="white" size="sm" />}
        </Button>
      </div>
    </Modal>
  );
};

export default ClaimedFeesModal;
