import { usePathname } from "next/navigation";

export const Background = () => {
  const pathname = usePathname();

  if (!pathname) return null;

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
          className="fixed bottom-0 left-0 z-[-1] w-full "
          alt=""
        />
      )}
      {pathname.startsWith("/swap") && (
        <img
          src="/img/patterns/swap.svg"
          className="fixed bottom-0 left-0 z-[-1] w-full"
          alt=""
        />
      )}
      {pathname.startsWith("/earn") && (
        <img
          src="/img/patterns/earn.svg"
          className="fixed left-[4%] top-[20%] z-[-1] w-[96%]"
          alt=""
        />
      )}
      {pathname.startsWith("/merge") && (
        <img
          src="/img/patterns/earn.svg"
          className="fixed left-[4%] top-[20%] z-[-1] w-[96%]"
          alt=""
        />
      )}
      {pathname.startsWith("/transfer") && (
        <img
          src="/img/patterns/swap.svg"
          className="fixed bottom-0 left-0 z-[-1] w-full"
        />
      )}
      {pathname.startsWith("/redeem") && (
        <img
          src="/img/patterns/earn.svg"
          className="fixed left-[4%] top-[20%] z-[-1] w-[96%]"
          alt=""
        />
      )}
    </>
  );
};
