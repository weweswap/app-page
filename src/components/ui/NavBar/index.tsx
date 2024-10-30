"use client";

import Image from "next/image";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { ConnectButton } from "~/components/common";

import { PAGE_LINKS } from "./links";
import { NavBarModal } from "./NavBarModal";
import NavLink from "./NavLink";

export const NavBar = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <header className="w-full">
      <nav className="flex items-center justify-between gap-4 px-4 py-8 md:px-8">
        <Link href="/" className="flex items-center">
          <Image src="/img/logo.svg" width={115} height={50} alt="logo" />
        </Link>

        <ul className="hidden items-center gap-4 lg:flex">
          {PAGE_LINKS.map((link, key) => (
            <NavLink
              icon={link.icon}
              text={link.text}
              href={link.href}
              key={key}
            />
          ))}
        </ul>

        <div className="flex items-center gap-2 lg:gap-4">
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
