import Link from "next/link";

const baseStyles =
  "inline-flex h-12 items-center rounded-full px-7 text-sm font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

const variants = {
  primary: "bg-foreground text-background hover:opacity-90",
  secondary: "border border-border text-foreground hover:bg-muted/50",
} as const;

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: keyof typeof variants;
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={[baseStyles, variants[variant], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Link>
  );
}
