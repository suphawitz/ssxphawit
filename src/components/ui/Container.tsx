interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={["mx-auto w-full max-w-[1280px] px-8", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Component>
  );
}
