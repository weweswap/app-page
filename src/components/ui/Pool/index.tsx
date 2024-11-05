"use client";

import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { PoolHome } from "./PoolHome";
import SuccessModal from "./SuccessModal";
import ApproveTokens, { PayloadApproveModal } from "./ApproveTokens";
import ClaimedFeesModal from "./ClaimFeesModal";
import ClaimSuccessModal from "./ClaimSuccessModal";
import { WewePosition } from "~/hooks/useWewePositions";
import { useClaimFees } from "~/hooks/useClaimFees";
import FailedModal from "./FailedModal";
import { useAccount } from "wagmi";
import PoolDepositModal from "./PoolDepositModal";
import DepositSuccessModal from "./DepositSuccessModal";
import WithdrawModal, { PayloadWithdrawalModal } from "./WithdrawModal";
import WithdrawSuccessModal, { PayloadWithdrawalSuccess } from "./WithdrawSuccessModal";
import PoolZapModal, { PayloadZapInModal, PayloadZapOutModal } from "./PoolZapModal";
import { Hex } from "viem";
import { usdConverter } from "~/utils";


export const Pool = () => {
  const [step, setStep] = useState(0);
  const [genericHashError, setGenericHashError] = useState<string>()
  const [wewePositionSelected, setWewePosition] = useState<WewePosition>()
  const [totalGasFee, setTotalGasFee] = useState<number>()
  const [payloadApprovalModal, setPayloadApprovalModal] = useState<PayloadApproveModal>()
  const [payloadWithdrawalModal, setPayloadWithdrawalModal] = useState<PayloadWithdrawalModal>()
  const [payloadWithdrawalSuccessModal, setPayloadWithdrawalSuccessModal] = useState<PayloadWithdrawalSuccess>()
  const [payloadZapInModal, setPayloadZapInModal] = useState<PayloadZapInModal>()
  const [payloadZapOutModal, setPayloadZapOutModal] = useState<PayloadZapOutModal>()

  const [openedDepositModal,{ open: openDepositModal, close: closeDepositModal }] =
  useDisclosure(false);
  const [openedDepositSuccessModal,{ open: openDepositSuccessModal, close: closeDepositSuccessModal }] =
  useDisclosure(false);

  const [openedWithdrawModal,{ open: openWithdrawModal, close: closeWithdrawModal }] =
  useDisclosure(false);
  const [openedWithdrawSuccessModal,{ open: openWithdrawSuccessModal, close: closeWithdrawSuccessModal }] =
  useDisclosure(false);
  const [openedZapInModal,{ open: openZapInModal, close: closeZapInModal }] =
  useDisclosure(false);

  const [openedZapOutModal,{ open: openZapOutModal, close: closeZapOutModal }] =
  useDisclosure(false);

  const [
    openedApproveModal,
    { open: openApproveModal, close: closeApproveModal },
  ] = useDisclosure(false);
  const [
    openedSuccessModal,
    { open: openSuccessModal, close: closeSuccessModal },
  ] = useDisclosure(false);
  const [
    openedClaimFeesModal,
    { open: openClaimFeesModal, close: closeClaimFeesModal },
  ] = useDisclosure(false);
  const [
    openedClaimSuccessModal,
    { open: openClaimSuccessModal, close: closeClaimSuccessModal },
  ] = useDisclosure(false);
  const [openedFailModal, { open: openFailModal, close: closeFailModal }] = useDisclosure(false);
  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);

  useDisclosure(false);

  const { address } = useAccount();

  const {
    hash,
    isPending,
    isError,
    isTxConfirming,
    isConfirmed,
    receipt: txReceipt,
    claimFees,
    gasPriceData
  } = useClaimFees();

  useEffect(() => {
    if (isConfirmed) {
      openClaimSuccessModal();

      const gasUsed = txReceipt?.gasUsed ?? 0n;
      const gasPrice = txReceipt?.effectiveGasPrice ?? 0n;
      const totalFee = gasUsed * gasPrice;
      const getUsdFees = async () => {
        const finalUsdValue = totalFee > 0n ? await usdConverter(totalFee) : 0;
        setTotalGasFee(finalUsdValue)

      }
      getUsdFees()  
    }
    if (isError) {
      openFailModal();
    }
  }, [isConfirmed, txReceipt, isError, isPending, isTxConfirming]);
  
  const handleApproveTokenModal = (amountToken0: number, amountToken1: number) => {
    setPayloadApprovalModal({
      amountToken0,
      amountToken1
    })
    openApproveModal();
  };

  const handleSuccessModal = () => {
    closeApproveModal();
    openSuccessModal();
  };

  const handleCloseApproveTokensModal = () => {
    setPayloadApprovalModal(undefined)
    closeApproveModal()
  }

  const handleErrorModal = (hash?: string | undefined) => {
    setPayloadApprovalModal(undefined)
    setPayloadWithdrawalModal(undefined)
    setGenericHashError(hash)
    closeApproveModal()
    closeWithdrawModal()
    openFailModal()
  }

  const handleCloseSuccesModal = () => {
    closeClaimFeesModal()
    closeClaimSuccessModal()
  }

  const handleClaimFeesModal = (wewePositionSelected: WewePosition) => {
    setWewePosition(wewePositionSelected)
    openClaimFeesModal()
  }

  const handleClaimSuccessModal = () => {
    claimFees(address!)
  }

  const handleCloseFailModal = () => {
    setGenericHashError(undefined)
    closeFailModal()
  }

  const handleDepositModal = () => {
    openDepositModal()
  }

  const handleDepositSuccess = () => {
    closeDepositModal()
    openDepositSuccessModal()
  }

  const handleWithdrawSuccess = (hash?: Hex) => {
    setPayloadWithdrawalModal(undefined)
    setPayloadWithdrawalSuccessModal({hash: hash})
    closeWithdrawModal()
    openWithdrawSuccessModal()
  }

  const handleWithdrawalModal = (burnAmount: bigint) => {
    setPayloadWithdrawalModal({burnAmount})
    openWithdrawModal()
  }

  const handleCloseWithdraw = () => {
    setPayloadWithdrawalModal(undefined)
    closeWithdrawModal()
  }

  const handleZapInModal = (zapInAmount: string, zapInTokenAddress: Hex) => {
    setPayloadZapInModal({zapInAmount, zapInTokenAddress})
    openZapInModal()
  }

  const handleZapOutModal = (zapOutAmount: string, zapOutTokenAddress: Hex) => {
    setPayloadZapOutModal({zapOutAmount, zapOutTokenAddress})
    openZapOutModal()
  }


  const handleCloseZapIn = () => {
    setPayloadZapInModal(undefined)
    closeZapInModal()
  }

  return (
    <>
      {step === 0 && (
        <PoolHome
          onClaim={handleClaimFeesModal}
          onDeposit={handleApproveTokenModal}
          onWithdraw={handleWithdrawalModal}
          onZapIn={handleZapInModal}
          onZapOut={handleZapOutModal}
          onNext={() => setStep(1)}
          onBack={() => setStep(0)} 
          onAdd={openAdd}
        />
      )}

      <PoolDepositModal 
        opened={openedDepositModal} 
        onOpen={() => openDepositModal()} 
        onClose={() => closeDepositModal()}
        onDepositSuccess={() => handleDepositSuccess()}
      />
      <WithdrawSuccessModal
        opened={openedWithdrawSuccessModal}
        onOpen={() => openWithdrawSuccessModal()}
        onClose={() => closeWithdrawSuccessModal()}
        data={payloadWithdrawalSuccessModal}
      />
      <SuccessModal
        onConfirm={closeSuccessModal}
        opened={openedSuccessModal}
        onOpen={handleSuccessModal}
        onClose={closeSuccessModal}
      />
      <ClaimedFeesModal 
        loading={isPending || isTxConfirming} 
        wewePosition={wewePositionSelected} 
        onClaim={handleClaimSuccessModal} 
        onOpen={() => {}} 
        opened={openedClaimFeesModal} 
        onClose={closeClaimFeesModal} 
      />
      {
        payloadWithdrawalModal &&
        <WithdrawModal 
          opened={openedWithdrawModal}
          onOpen={() => {}}
          onClose={handleCloseWithdraw}
          onWithdrawSuccess={handleWithdrawSuccess}
          onTxError={handleErrorModal}
          data={payloadWithdrawalModal}
        />
      }
      {
        payloadZapInModal &&
        <PoolZapModal 
          opened={openedZapInModal}
          onOpen={() => {}}
          onClose={handleCloseZapIn}
          onTxError={handleErrorModal}
          data={payloadZapInModal}
        />
      }
      {
        payloadApprovalModal &&
        <ApproveTokens
          opened={openedApproveModal}
          onOpen={() => {}} 
          onClose={handleCloseApproveTokensModal}
          onTxError={handleErrorModal}
          data={payloadApprovalModal}
        />
      }

      {isConfirmed && txReceipt && hash && (
        <ClaimSuccessModal
          opened={openedClaimSuccessModal}
          onClose={handleCloseSuccesModal}
          hash={hash!}
          data={{
            pendingUsdcReward: wewePositionSelected?.pendingUsdcReward || "0",
            pendingChaosReward: wewePositionSelected?.pendingChaosReward || "0",
            gasFee: totalGasFee
          }}
        />
      )}

      <DepositSuccessModal opened={openedDepositSuccessModal}
       onClose={closeDepositSuccessModal}  />
      
      <FailedModal
        hash={hash! || genericHashError}
        opened={openedFailModal}
        onClose={handleCloseFailModal}
      />
    </>
  );
};
