import {
  Modal,
  ModalRootProps,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import PerlIcon from "@/assets/img/tokens/perl.png";
import BloodIcon from "@/assets/img/tokens/blood.png";
import NetworkIcon from "@/assets/img/network.svg";
import { Button } from "@/components/common";

export const DepositModal = (props: ModalRootProps) => {
  const theme = useMantineTheme();

  return (
    <Modal.Root centered {...props}>
      <Modal.Overlay />
      <Modal.Content className="!rounded-xl !p-2">
        <Modal.Header>
          <div
            className="w-full flex items-center justify-between pb-3 border-b"
            style={{ borderColor: theme.colors.border[0] }}
          >
            <Modal.Title>
              <Title order={3}>Deposit</Title>
            </Modal.Title>
            <Modal.CloseButton />
          </div>
        </Modal.Header>

        <Modal.Body className="flex flex-col gap-5 !pt-5">
          <div className="w-full flex items-center justify-between">
            <Title order={2}>0.00 PERL</Title>
            <Image src={PerlIcon} alt="token0" className="rounded w-9" />
          </div>

          <Text size="sm" c="textGray" fw={500}>
            $0.00
          </Text>

          <Text size="sm" c="textGray" fw={500}>
            You will get
          </Text>

          <div className="w-full flex items-center justify-between">
            <Title order={2}>0.00 BLOOD</Title>
            <Image src={BloodIcon} alt="token1" className="rounded w-9" />
          </div>

          <Text size="sm" c="textGray" fw={500}>
            $0.00
          </Text>

          <hr
            className="w-full"
            style={{ borderColor: theme.colors.border[0] }}
          />

          <div className="w-full flex items-center justify-between">
            <Text size="sm">Rate</Text>
            <Text size="sm">1 PERL = 1 BLOOD ($1.00)</Text>
          </div>

          <div className="w-full flex items-center justify-between">
            <Text size="sm">Network cost</Text>
            <div className="flex items-center gap-[6px]">
              <Image src={NetworkIcon} alt="network" width={14} height={14} />
              <Text size="sm">-</Text>
            </div>
          </div>

          <Button>Merge</Button>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
