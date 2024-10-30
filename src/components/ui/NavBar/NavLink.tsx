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
  const isActive = (href: string) => router.pathname.startsWith(href);

  return (
    <li>
      <Link
        href={href}
        aria-current="page"
        className="flex items-center gap-2 p-2"
        onClick={onClick}
      >
        <props.icon
          className={cn("size-6", isActive(href) ? "fill-turq" : "fill-yellow")}
        />
        <Typography
          secondary
          size="lg"
          tt="uppercase"
          className={isActive(href) ? "text-turq" : "text-yellow"}
        >
          {text}
        </Typography>
      </Link>
    </li>
  );
};

export default NavLink;
