"use client";

import { useDisclosure } from "@mantine/hooks";
import { SwapHome } from "./SwapHome";
import { SwapModal } from "./SwapModal";

export const Swap = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <SwapHome onSwap={open} />
      <SwapModal opened={opened} onClose={close} />
    </>
  );
};
