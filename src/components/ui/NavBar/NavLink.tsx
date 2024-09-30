import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Typography } from "~/components/common";
import { cn } from "~/utils";

type NavLinkProps = {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  href: string;
  onClick?: () => void;
};

const NavLink = (props: NavLinkProps) => {
  const { text, href, onClick } = props;
  const router = useRouter();
  const isActive = (href: string) => router.pathname === href;

  return (
    <li>
      <Link
        href={href}
        aria-current="page"
        className="flex items-center p-2 gap-2"
        onClick={onClick}
      >
        <props.icon className={cn("w-6 h-6", isActive(href) ? 'fill-turq' : 'fill-yellow')} />
        <Typography secondary size="lg" tt="uppercase" className={isActive(href) ? 'text-turq' : 'text-yellow'}>
          {text}
        </Typography>
      </Link>
    </li>
  );
};

export default NavLink;
