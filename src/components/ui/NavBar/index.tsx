"use client";

import Image from "next/image";
import Link from "next/link";
import { PAGE_LINKS } from "./links";
import NavLink from "./NavLink";
import { ConnectButton } from "~/components/common";
import { useDisclosure } from "@mantine/hooks";
import { NavBarModal } from "./NavBarModal";

export const NavBar = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <header className="w-full">
      <nav className="flex items-center justify-between gap-4 py-8 px-4 md:px-8">
        <Link href="/" className="flex items-center">
          <Image src="/img/logo.svg" width={129} height={56} alt="logo" />
        </Link>

        <ul className="items-center gap-4 hidden sm:flex">
          {PAGE_LINKS.map((link, key) => (
            <NavLink
              icon={link.icon}
              text={link.text}
              href={link.href}
              key={key}
            />
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <ConnectButton />
          <button onClick={open} className="block lg:hidden">
            <Image
              src="/img/icons/hamburger.svg"
              width={40}
              height={40}
              alt=""
            />
          </button>
        </div>
      </nav>

      <NavBarModal opened={opened} onClose={close} />
    </header>
  );
};
