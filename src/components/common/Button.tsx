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
    <button className={clsx("bg-blue-800 px-8 py-2", className)} {...props}>
      {children}
    </button>
  );
};
