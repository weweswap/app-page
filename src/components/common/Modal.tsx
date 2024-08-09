import { Divider, Modal as MtModal, ModalRootProps } from "@mantine/core";
import Image from "next/image";
import { Typography } from "./Typography";

type ModalProps = {
  title: string;
} & ModalRootProps;

export const Modal = ({ title, children, ...props }: ModalProps) => {
  return (
    <MtModal.Root centered {...props}>
      <MtModal.Overlay />
      <MtModal.Content
        classNames={{ content: "bg-black border_stroke text-white p-6" }}
      >
        <MtModal.Header className="bg-transparent p-0">
          <div className="w-full flex items-center justify-between pb-3">
            <MtModal.Title>
              <Typography secondary size="lg" tt="uppercase">
                {title}
              </Typography>
            </MtModal.Title>
            <button onClick={props.onClose}>
              <Image src="/img/icons/close.svg" width={24} height={24} alt="" />
            </button>
          </div>
        </MtModal.Header>

        <MtModal.Body className="flex flex-col gap-5 p-0">
          <Divider className="border-blue-700" />
          {children}
        </MtModal.Body>
      </MtModal.Content>
    </MtModal.Root>
  );
};
