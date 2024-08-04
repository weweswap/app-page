import { Divider, ModalRootProps, Text } from "@mantine/core";
import Image from "next/image";
import { Button, Modal } from "~/components/common";
import { dogica, verdana } from "~/fonts";

export const SwapModal = (props: ModalRootProps) => {
  return (
    <Modal title="Review swap" {...props}>
      <div className={`flex flex-col gap-4 ${verdana.className}`}>
        <Text size="xs" className={dogica.className}>
          Sell
        </Text>
        <div className="flex items-center justify-between gap-3">
          <Text size="xl" className={dogica.className}>
            0.030 ETH
          </Text>
          <Image src="/img/tokens/eth.png" width={36} height={36} alt="" />
        </div>
        <Text size="xs">$120.20</Text>
      </div>

      <div className="flex flex-col gap-4">
        <Text size="xs" className={dogica.className}>
          Buy
        </Text>
        <div className="flex items-center justify-between gap-3">
          <Text size="xl" className={dogica.className}>
            109.925 USDC
          </Text>
          <Image src="/img/tokens/usdc.png" width={36} height={36} alt="" />
        </div>
        <Text size="xs">$109.97</Text>
      </div>

      <Divider className="border-blue-700" />

      <div className="flex items-center justify-between gap-3">
        <Text size="xs">Rate</Text>
        <Text size="xs">1 USDC = 0.0027 ETH ($1.00)</Text>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Text size="xs">Fee (0.25%)</Text>
        <Text size="xs" fw={700}>
          {"<"}$0.01
        </Text>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Text size="xs">Network cost</Text>
        <div className="flex items-center gap-1">
          <Image src="/img/icons/fee.svg" width={14} height={14} alt="" />
          <Text size="xs" fw={700}>
            $5.34
          </Text>
        </div>
      </div>

      <Button className="w-full" onClick={props.onClose}>
        <Text size="md" fw={700} className={dogica.className}>
          Confirm Swap
        </Text>
      </Button>
    </Modal>
  );
};
