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

export const WithdrawModal = (props: ModalRootProps) => {
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
              <Title order={3}>Withdraw</Title>
            </Modal.Title>
            <Modal.CloseButton />
          </div>
        </Modal.Header>

        <Modal.Body className="flex flex-col gap-5 !pt-5">
          <Text size="sm" c="textGray" fw={500}>
            Balance: 19.934 BLOOD
          </Text>

          <div className="w-full flex items-center justify-between">
            <Title order={2}>0.00 BLOOD</Title>
            <Image src={BloodIcon} alt="token1" className="rounded w-9" />
          </div>

          <Text size="sm" c="textGray" fw={500}>
            $0.00
          </Text>

          <Button>Withdraw</Button>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
