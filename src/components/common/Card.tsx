import { cn } from "~/utils";

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
      className={cn(
        "w-full border border-[var(--stroke)] bg-black p-4 text-white",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
