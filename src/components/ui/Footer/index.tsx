import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export const Footer = () => {
  const path = usePathname()
  return (
    <div className="flex flex-col items-center gap-9 p-4">
      {path === "/merge" ?
        (
          <video style={{ width: "500px" }} autoPlay loop muted>
            <source src={"/videos/burn-animation.mp4"} type="video/mp4"></source>
          </video>
        ) :
        (
          <Image src="/img/footer-logo.svg" width={400} height={60} alt="" />
        )
      }
      
      <div className="flex items-center gap-6">
        <Link href="https://x.com/weweswap" target="_blank">
          <Image src="/img/socials/x.svg" width={40} height={40} alt="" />
        </Link>
        <Link href="https://discord.gg/cV95JF7kGM" target="_blank">
          <Image src="/img/socials/discord.svg" width={40} height={40} alt="" />
        </Link>
        <Link href="http://t.me/weweonbase" target="_blank">
          <Image
            src="/img/socials/telegram.svg"
            width={40}
            height={40}
            alt=""
          />
        </Link>
        <Link href="https://github.com/weweswap" target="_blank">
          <Image src="/img/socials/github.svg" width={40} height={40} alt="" />
        </Link>
      </div>
    </div>
  );
};
