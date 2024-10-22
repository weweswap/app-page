import { usePathname } from "next/navigation";

export const Background = () => {
  const pathname = usePathname();

  if(!pathname) return null;

  return (
    <>
    {/* <img 
    src="/img/background.svg"
    alt=""
    className=""
    /> */}
      {pathname.startsWith("/pools") && (
        <img
          src="/img/patterns/pool.svg"
          className="z-[-1] fixed w-full left-0 bottom-0 "
          alt=""
        />
      )}
      {pathname.startsWith("/swap") && (
        <img
          src="/img/patterns/swap.svg"
          className="z-[-1] fixed w-full left-0 bottom-0"
          alt=""
        />
      )}
      {pathname.startsWith("/earn") && (
        <img
          src="/img/patterns/earn.svg"
          className="z-[-1] fixed w-[96%] left-[4%] top-[20%]"
          alt=""
        />
      )}
      {pathname.startsWith("/merge") && (
        <img
          src="/img/patterns/earn.svg"
          className="z-[-1] fixed w-[96%] left-[4%] top-[20%]"
          alt=""
        />
      )}
      {pathname.startsWith("/transfer") && (
        <img
          src="/img/patterns/swap.svg"
          className="z-[-1] fixed w-full left-0 bottom-0"
        />
      )}
      {pathname.startsWith("/redeem") && (
        <img
          src="/img/patterns/earn.svg"
          className="z-[-1] fixed w-[96%] left-[4%] top-[20%]"
          alt=""
        />
      )}
    </>
  );
};
