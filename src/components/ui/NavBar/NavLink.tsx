import { Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

type NavLinkProps = {
  icon: string;
  text: string;
  href: string;
  onClick?: () => void;
};

const NavLink = ({ icon, text, href, onClick }: NavLinkProps) => {
  return (
    <li>
      <Link
        href={href}
        aria-current="page"
        className="flex items-center p-2 gap-2"
        onClick={onClick}
      >
        <Image src={icon} width={25} height={25} alt="" />
        <Text size="lg" className="uppercase text_yellow">
          {text}
        </Text>
      </Link>
    </li>
  );
};

export default NavLink;
