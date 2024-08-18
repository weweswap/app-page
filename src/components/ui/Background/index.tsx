import { usePathname } from "next/navigation";

export const Background = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname.startsWith("/pools") && (
        <img
          src="/img/patterns/pool.svg"
          className="z-[-1] absolute w-full left-0 bottom-0"
          alt=""
        />
      )}
      {pathname.startsWith("/swap") && (
        <img
          src="/img/patterns/swap.svg"
          className="z-[-1] absolute w-full left-0 bottom-0"
          alt=""
        />
      )}
      {pathname.startsWith("/earn") && (
        <img
          src="/img/patterns/earn.svg"
          className="z-[-1] absolute w-[96%] left-[4%] top-[20%]"
          alt=""
        />
      )}
      {pathname.startsWith("/merge") && (
        <img
          src="/img/patterns/earn.svg"
          className="z-[-1] absolute w-[96%] left-[4%] top-[20%]"
          alt=""
        />
      )}
         {pathname.startsWith("/redeem") && (
        <img
          src="/img/patterns/earn.svg"
          className="z-[-1] absolute w-[96%] left-[4%] top-[20%]"
          alt=""
        />
      )}
    </>
  );
};
