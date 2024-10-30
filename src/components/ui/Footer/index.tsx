import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Lottie from "lottie-react";

import animation from "../../../../public/videos/burn-animation.json";

export const Footer = () => {
  const path = usePathname();

  return (
    <div className="flex flex-col items-center gap-9 p-4">
      {path === "/merge" ||
      path === "/merge/vult" ||
      path === "/swap" ||
      path === "/transfer" ? (
        <div className="w-full sm:w-[500px]">
          <Lottie animationData={animation} />
        </div>
      ) : (
        <Image
          src="/videos/pool-animation.gif"
          width={550}
          height={60}
          alt=""
        />
      )}
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
