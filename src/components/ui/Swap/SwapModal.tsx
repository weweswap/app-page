import { Divider, ModalRootProps, Text } from "@mantine/core";
import Image from "next/image";
import { Button, Modal } from "~/components/common";

export const SwapModal = (props: ModalRootProps) => {
  return (
    <Modal title="Review swap" {...props}>
      <div className="flex flex-col gap-4">
        <Text size="xs">Sell</Text>
        <div className="flex items-center justify-between gap-3">
          <Text size="xl">0.030 ETH</Text>
          <Image src="/img/tokens/eth.png" width={36} height={36} alt="" />
        </div>
        <Text size="xs" className="verdana">
          $120.20
        </Text>
      </div>

      <div className="flex flex-col gap-4">
        <Text size="xs">Buy</Text>
        <div className="flex items-center justify-between gap-3">
          <Text size="xl">109.925 USDC</Text>
          <Image src="/img/tokens/usdc.png" width={36} height={36} alt="" />
        </div>
        <Text size="xs" className="verdana">
          $109.97
        </Text>
      </div>

      <Divider className="border-blue-800" />

      <div className="flex items-center justify-between gap-3">
        <Text size="xs" className="verdana">
          Rate
        </Text>
        <Text size="xs" className="verdana">
          1 USDC = 0.0027 ETH ($1.00)
        </Text>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Text size="xs" className="verdana">
          Fee (0.25%)
        </Text>
        <Text size="xs" fw={700} className="verdana">
          {"<"}$0.01
        </Text>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Text size="xs" className="verdana">
          Network cost
        </Text>
        <div className="flex items-center gap-1">
          <Image src="/img/icons/fee.svg" width={14} height={14} alt="" />
          <Text size="xs" fw={700} className="verdana">
            $5.34
          </Text>
        </div>
      </div>

      <Button className="w-full" onClick={props.onClose}>
        <Text size="md" fw={700}>
          Confirm Swap
        </Text>
      </Button>
    </Modal>
  );
};
