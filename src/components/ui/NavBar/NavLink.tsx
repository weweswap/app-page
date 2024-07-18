import { Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

type NavLinkProps = {
  icon: string;
  text: string;
  href: string;
};

const NavLink = ({ icon, text, href }: NavLinkProps) => {
  return (
    <li>
      <Link
        href={href}
        aria-current="page"
        className="flex items-center p-2 gap-2"
      >
        <Image src={icon} width={25} height={25} alt="" />
        <Text size="lg" className="uppercase">
          {text}
        </Text>
      </Link>
    </li>
  );
};

export default NavLink;
