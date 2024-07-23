import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

export const Button = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button className={clsx("bg_blue p-4 font-bold", className)} {...props}>
      {children}
    </button>
  );
};
