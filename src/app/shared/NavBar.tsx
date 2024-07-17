"use client";

import logo from "@/assets/img/navbar-logo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";

export default function NavBar() {
  const pathName = usePathname();
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (pathName) {
      setLocation(pathName);
    }
  }, [pathName]);

  return (
    <header>
      <nav className="px-4 lg:px-6 py-2.5">
        <div className="flex justify-between items-center mx-auto max-w-screen-2xl">
          <div className="flex items-center gap-4">
            <Link href="#" className="flex items-center">
              <Image
                src={logo}
                height={50}
                className="mr-3"
                alt="vampire-attack"
              />
            </Link>
            <ul className="items-center gap-2 hidden md:flex">
              <li>
                <Link
                  href="/merge"
                  className={`block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white uppercase`}
                  aria-current="page"
                >
                  Merge
                </Link>
              </li>
            </ul>
          </div>

          <ConnectButton label="Connect" />
        </div>
      </nav>
    </header>
  );
}
