import Image from "next/image";
import Link from "next/link";
import { Typography } from "~/components/common";

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
        <Typography secondary size="lg" tt="uppercase" className="text_yellow">
          {text}
        </Typography>
      </Link>
    </li>
  );
};

export default NavLink;
