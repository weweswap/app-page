import clsx from "clsx";

export const Card = ({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) => {
  return (
    <div
      className={clsx(
        "w-full bg-black border_stroke text-white p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
