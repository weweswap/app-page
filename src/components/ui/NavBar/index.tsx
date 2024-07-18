"use client";

import Image from "next/image";
import Link from "next/link";
import { PAGE_LINKS } from "./links";
import NavLink from "./NavLink";
import { ConnectButton } from "~/components/common";

export default function NavBar() {
  return (
    <header>
      <nav className="flex items-center justify-between gap-4 p-8">
        <Link href="/" className="flex items-center">
          <Image src="img/logo.svg" width={101} height={50} alt="logo" />
        </Link>

        <ul className="flex items-center gap-4">
          {PAGE_LINKS.map((link, key) => (
            <NavLink
              icon={link.icon}
              text={link.text}
              href={link.href}
              key={key}
            />
          ))}
        </ul>

        <ConnectButton />
      </nav>
    </header>
  );
}
