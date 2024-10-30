import { useDisclosure } from "@mantine/hooks";

import ConversionModal from "./ConversionModal";
import { MergeHome } from "./MergeHome";
import SuccessModal from "./SuccessModal";

export const Merge = () => {
  const [
    openedConversionModal,
    { open: openConversionModal, close: closeConversionModal },
  ] = useDisclosure(false);
  const [
    openedSuccessModal,
    { open: openSuccessModal, close: closeSuccessModal },
  ] = useDisclosure(false);

  const handleConfirm = () => {
    openSuccessModal();
  };

  const handleConversionModal = () => {
    openConversionModal();
  };

  return (
    <>
      <MergeHome onConversion={handleConversionModal} />
      <ConversionModal
        onConfirm={handleConfirm}
        opened={openedConversionModal}
        onOpen={openConversionModal}
        onClose={closeConversionModal}
      />
      <SuccessModal
        opened={openedSuccessModal}
        onOpen={openSuccessModal}
        onClose={closeSuccessModal}
      />
    </>
  );
};
