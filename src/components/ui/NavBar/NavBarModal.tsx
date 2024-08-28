import { ModalRootProps } from "@mantine/core";
import { Modal } from "~/components/common";
import { PAGE_LINKS } from "./links";
import NavLink from "./NavLink";

export const NavBarModal = (props: ModalRootProps) => {
  return (
    <Modal title="WEWE SWAP" {...props}>
      <ul className="flex flex-col items-center gap-4">
        {PAGE_LINKS.map((link, key) => (
          <NavLink
            icon={link.icon}
            text={link.text}
            href={link.href}
            key={key}
            onClick={props.onClose}
          />
        ))}
      </ul>
    </Modal>
  );
};
