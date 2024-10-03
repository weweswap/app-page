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
        "w-full bg-black border border-[var(--stroke)] text-white p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
