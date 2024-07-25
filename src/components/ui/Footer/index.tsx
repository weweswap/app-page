import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex flex-col items-center gap-9 p-4">
      <Image src="/img/footer-logo.svg" width={400} height={60} alt="" />
      <div className="flex items-center gap-6">
        <Link href="https://x.com/weweonbase" target="_blank">
          <Image src="/img/socials/x.svg" width={34} height={34} alt="" />
        </Link>
        <Link href="https://discord.gg/cV95JF7kGM" target="_blank">
          <Image src="/img/socials/discord.svg" width={40} height={40} alt="" />
        </Link>
        <Link href="https://github.com/weweswap" target="_blank">
          <Image src="/img/socials/github.svg" width={42} height={42} alt="" />
        </Link>
      </div>
    </div>
  );
};
