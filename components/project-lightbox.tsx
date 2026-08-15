"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { getKeyboardStep, getSwipeStep } from "@/lib/project-carousel";
import type { ProjectImage } from "@/types/project";

type LightboxPointerStart = {
  pointerId: number;
  time: number;
  x: number;
};

export type ProjectLightboxProps = {
  activeIndex: number;
  images: ProjectImage[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (step: -1 | 1) => void;
};

export function ProjectLightbox({
  activeIndex,
  images,
  isOpen,
  onClose,
  onNavigate,
}: ProjectLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerStart = useRef<LightboxPointerStart>({ pointerId: -1, time: 0, x: 0 });
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const activeImage = images[activeIndex];
  const hasNavigation = images.length > 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  function resetPointerGesture() {
    pointerStart.current = { pointerId: -1, time: 0, x: 0 };
    setDragX(0);
    setIsDragging(false);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (!hasNavigation) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    pointerStart.current = {
      pointerId: event.pointerId,
      time: performance.now(),
      x: event.clientX,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragX(0);
    setIsDragging(true);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerId !== pointerStart.current.pointerId) return;

    const deltaX = event.clientX - pointerStart.current.x;
    const maximumDrag = event.currentTarget.clientWidth * 0.2;
    setDragX(Math.max(-maximumDrag, Math.min(maximumDrag, deltaX)));
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerId !== pointerStart.current.pointerId) return;

    const step = getSwipeStep(
      event.clientX - pointerStart.current.x,
      performance.now() - pointerStart.current.time,
      event.currentTarget.clientWidth,
    );

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (step !== 0) onNavigate(step);
    resetPointerGesture();
  }

  function handlePointerCancel(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerId !== pointerStart.current.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    resetPointerGesture();
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDialogElement>) {
    if (!hasNavigation) return;

    const step = getKeyboardStep(event.key);
    if (step === 0) return;

    event.preventDefault();
    onNavigate(step);
  }

  function handleBackdropClick(event: ReactMouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) dialogRef.current?.close();
  }

  const lightboxStyle = {
    "--project-lightbox-drag": `${dragX}px`,
  } as CSSProperties;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Expanded project image"
      className={`project-lightbox${isDragging ? " is-dragging" : ""}`}
      onCancel={resetPointerGesture}
      onClick={handleBackdropClick}
      onClose={onClose}
      onKeyDown={handleKeyDown}
    >
      <button
        aria-label="Close expanded project image"
        className="project-lightbox-close"
        onClick={(event) => {
          event.stopPropagation();
          dialogRef.current?.close();
        }}
        type="button"
      >
        Close <span aria-hidden="true">×</span>
      </button>

      <div
        className="project-lightbox-media"
        onDragStart={(event) => event.preventDefault()}
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={lightboxStyle}
      >
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          draggable={false}
          fill
          sizes="100vw"
          unoptimized={activeImage.src.endsWith(".svg")}
        />
      </div>

      {hasNavigation ? (
        <div className="project-lightbox-dots" aria-hidden="true">
          {images.map((image, index) => (
            <span
              className={`project-gallery-dot${index === activeIndex ? " is-active" : ""}`}
              key={image.src}
            />
          ))}
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        Image {activeIndex + 1} of {images.length}
      </p>
    </dialog>
  );
}
