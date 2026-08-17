"use client";

import Image from "next/image";
import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import {
  getCircularOffset,
  getKeyboardStep,
  getSideCardStep,
  getSwipeStep,
  isProjectGalleryClick,
  isProjectGallerySideControl,
  shouldCaptureProjectGalleryPointer,
  wrapProjectIndex,
} from "@/lib/project-carousel";
import { getProjectGallery } from "@/lib/projects";
import type { Project, ProjectImage } from "@/types/project";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

import { ProjectLightbox } from "./project-lightbox";

type PointerStart = {
  isInteractiveControl: boolean;
  pointerId: number;
  time: number;
  x: number;
  y: number;
};

function getExpandLabel(image: ProjectImage) {
  return image.alt ? `Expand ${image.alt}` : "Expand project image";
}

function ExpandButton({
  image,
  onExpand,
}: {
  image: ProjectImage;
  onExpand: (trigger: HTMLButtonElement) => void;
}) {
  return (
    <button
      aria-label={getExpandLabel(image)}
      className="project-gallery-expand"
      onClick={(event) => onExpand(event.currentTarget)}
      type="button"
    >
      <span className="project-gallery-expand-icon" aria-hidden="true">↗</span>
    </button>
  );
}

function SideCardButton({
  image,
  step,
  onNavigate,
}: {
  image: ProjectImage;
  step: -1 | 1;
  onNavigate: (step: -1 | 1) => void;
}) {
  const direction = step === -1 ? "previous" : "next";
  const arrow = step === -1 ? faCaretLeft : faCaretRight;

  return (
    <button
      aria-label={`View ${direction} project image`}
      className="project-gallery-side-control"
      onClick={(event) => {
        event.stopPropagation();
        onNavigate(step);
      }}
      style={{ position: "absolute", inset: 0, zIndex: 6 }}
      type="button"
    >
      <span className="project-gallery-side-control-icon" aria-hidden="true">
        <FontAwesomeIcon icon={arrow} />
      </span>
      <span className="sr-only">{image.alt || `View ${direction} project image`}</span>
    </button>
  );
}

function ProjectGalleryImage({
  image,
  index,
  isActive,
  offset,
  onExpand,
  onNavigate,
}: {
  image: ProjectImage;
  index: number;
  isActive: boolean;
  offset: number;
  onExpand: (trigger: HTMLButtonElement) => void;
  onNavigate: (step: -1 | 1) => void;
}) {
  const isSvg = image.src.endsWith(".svg");
  const boundedOffset = Math.max(-2, Math.min(2, offset));
  const isHidden = Math.abs(offset) > 2;
  const sideStep = getSideCardStep(offset);
  const isAccessible = isActive || sideStep !== 0;

  return (
    <figure
      aria-hidden={!isAccessible}
      className="project-gallery-card"
      data-hidden={isHidden ? "true" : undefined}
      data-offset={boundedOffset}
    >
      <Image
        src={image.src}
        alt={isActive ? image.alt : ""}
        draggable={false}
        fill
        loading={index === 0 ? undefined : "lazy"}
        preload={index === 0}
        sizes="(max-width: 700px) 78vw, (max-width: 1200px) 78vw, 54rem"
        unoptimized={isSvg}
      />
      {isActive ? <ExpandButton image={image} onExpand={onExpand} /> : null}
      {!isActive && sideStep !== 0 ? (
        <SideCardButton image={image} step={sideStep} onNavigate={onNavigate} />
      ) : null}
    </figure>
  );
}

function StaticProjectImage({
  image,
  onExpand,
}: {
  image: ProjectImage;
  onExpand: (trigger: HTMLButtonElement) => void;
}) {
  const isSvg = image.src.endsWith(".svg");

  return (
    <div className="project-gallery project-gallery-single" aria-label="Project cover image">
      <figure className="project-gallery-card">
        <Image
          src={image.src}
          alt={image.alt}
          draggable={false}
          fill
          preload
          sizes="(max-width: 700px) 100vw, (max-width: 1200px) 92vw, 73.75rem"
          unoptimized={isSvg}
        />
        <ExpandButton image={image} onExpand={onExpand} />
      </figure>
    </div>
  );
}

export function ProjectGallery({ project }: { project: Project }) {
  const images = getProjectGallery(project);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const galleryRef = useRef<HTMLElement>(null);
  const expandTriggerRef = useRef<HTMLButtonElement | null>(null);
  const pointerStart = useRef<PointerStart>({
    isInteractiveControl: false,
    pointerId: -1,
    time: 0,
    x: 0,
    y: 0,
  });
  const suppressExpand = useRef(false);

  function navigate(step: -1 | 1) {
    setActiveIndex((current) => wrapProjectIndex(current + step, images.length));
  }

  function resetPointerGesture() {
    pointerStart.current = {
      isInteractiveControl: false,
      pointerId: -1,
      time: 0,
      x: 0,
      y: 0,
    };
    setDragX(0);
    setIsDragging(false);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const control = event.target instanceof Element ? event.target.closest("button") : null;
    const isInteractiveControl = isProjectGallerySideControl(control?.className ?? null);

    pointerStart.current = {
      isInteractiveControl,
      pointerId: event.pointerId,
      time: performance.now(),
      x: event.clientX,
      y: event.clientY,
    };
    suppressExpand.current = false;
    setDragX(0);
    setIsDragging(!isInteractiveControl);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerId !== pointerStart.current.pointerId) return;

    const width = galleryRef.current?.clientWidth ?? window.innerWidth;
    const deltaX = event.clientX - pointerStart.current.x;
    const deltaY = event.clientY - pointerStart.current.y;

    if (
      shouldCaptureProjectGalleryPointer(
        deltaX,
        deltaY,
        pointerStart.current.isInteractiveControl,
      ) &&
      !event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    const maximumDrag = width * 0.24;
    setDragX(Math.max(-maximumDrag, Math.min(maximumDrag, deltaX)));
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerId !== pointerStart.current.pointerId) return;

    const deltaX = event.clientX - pointerStart.current.x;
    const deltaY = event.clientY - pointerStart.current.y;
    const elapsedMs = performance.now() - pointerStart.current.time;
    const width = galleryRef.current?.clientWidth ?? window.innerWidth;
    const isInteractiveControl = pointerStart.current.isInteractiveControl;
    const step = isInteractiveControl ? 0 : getSwipeStep(deltaX, elapsedMs, width);
    suppressExpand.current =
      !isInteractiveControl && !isProjectGalleryClick(deltaX, deltaY);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (step !== 0) navigate(step);
    resetPointerGesture();

    if (suppressExpand.current) {
      window.setTimeout(() => {
        suppressExpand.current = false;
      }, 0);
    }
  }

  function handlePointerCancel(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerId !== pointerStart.current.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    suppressExpand.current = false;
    resetPointerGesture();
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    const step = getKeyboardStep(event.key);
    if (step === 0) return;

    event.preventDefault();
    navigate(step);
  }

  function handleExpand(trigger: HTMLButtonElement) {
    if (suppressExpand.current) {
      suppressExpand.current = false;
      return;
    }

    expandTriggerRef.current = trigger;
    setIsLightboxOpen(true);
  }

  function handleLightboxClose() {
    setIsLightboxOpen(false);
    window.requestAnimationFrame(() => expandTriggerRef.current?.focus());
  }

  const galleryStyle = {
    "--project-gallery-drag": `${dragX}px`,
  } as CSSProperties;

  const gallery = images.length === 1 ? (
    <StaticProjectImage image={images[0]} onExpand={handleExpand} />
  ) : (
    <section
      ref={galleryRef}
      aria-label={`Project image gallery. Image ${activeIndex + 1} of ${images.length}`}
      aria-roledescription="carousel"
      className={`project-gallery${isDragging ? " is-dragging" : ""}`}
      onDragStart={(event) => event.preventDefault()}
      onKeyDown={handleKeyDown}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="region"
      style={galleryStyle}
      tabIndex={0}
    >
      <div className="project-gallery-stage">
        {images.map((image, index) => {
          const offset = getCircularOffset(index, activeIndex, images.length);

          return (
            <ProjectGalleryImage
              image={image}
              index={index}
              isActive={offset === 0}
              key={image.src}
              offset={offset}
              onExpand={handleExpand}
              onNavigate={navigate}
            />
          );
        })}
      </div>

      <div className="project-gallery-dots" aria-hidden="true">
        {images.map((image, index) => (
          <span
            className={`project-gallery-dot${index === activeIndex ? " is-active" : ""}`}
            key={image.src}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Image {activeIndex + 1} of {images.length}
      </p>
    </section>
  );

  return (
    <>
      {gallery}
      <ProjectLightbox
        activeIndex={activeIndex}
        images={images}
        isOpen={isLightboxOpen}
        onClose={handleLightboxClose}
        onNavigate={navigate}
      />
    </>
  );
}
