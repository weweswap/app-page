"use client";
import { TransferHome } from "./TransferHome";
import { useDisclosure } from "@mantine/hooks";
import { TransferModal } from "./TransferModal";
import { TransferComplete } from "./TransferComplete";
export const Transfer = () => {
  const [openedTransfer, { open: openTrasfer, close: closeTransfer }] =
    useDisclosure(false);
  const [openedComplete, { open: openComplete, close: closeComplete }] =
    useDisclosure(false);

  const handleTransfer = () => {
    closeTransfer();
    openComplete();
  };
  return (
    <>
      <TransferHome onTransfer={openTrasfer} />
      <TransferModal
        opened={openedTransfer}
        onClose={closeTransfer}
        onTransfer={handleTransfer}
      />
      <TransferComplete opened={openedComplete} onClose={closeComplete} />
    </>
  );
};
