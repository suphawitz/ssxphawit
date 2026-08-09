"use client";

import type { MouseEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";

import { canNavigateBack } from "@/lib/navigation";

interface ProjectBackLinkProps {
  children: ReactNode;
  className: string;
  fallbackHref?: string;
}

export function ProjectBackLink({
  children,
  className,
  fallbackHref = "/work",
}: ProjectBackLinkProps) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (canNavigateBack(window.history.length)) {
      router.back();
      return;
    }

    router.replace(fallbackHref);
  };

  return (
    <a className={className} href={fallbackHref} onClick={handleClick}>
      {children}
    </a>
  );
}
