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
  getSwipeStep,
  isProjectGalleryClick,
  wrapProjectIndex,
} from "@/lib/project-carousel";
import { getProjectGallery } from "@/lib/projects";
import type { Project, ProjectImage } from "@/types/project";

import { ProjectLightbox } from "./project-lightbox";

type PointerStart = {
  pointerId: number;
  time: number;
  x: number;
  y: number;
};

function getExpandLabel(image: ProjectImage) {
  return image.alt ? `Expand ${image.alt}` : "Expand project image";
}

function ExpandButton({ image, onExpand }: { image: ProjectImage; onExpand: () => void }) {
  return (
    <button
      aria-label={getExpandLabel(image)}
      className="project-gallery-expand"
      onClick={onExpand}
      type="button"
    >
      <span className="project-gallery-expand-icon" aria-hidden="true">↗</span>
    </button>
  );
}

function ProjectGalleryImage({
  image,
  index,
  isActive,
  offset,
  onExpand,
}: {
  image: ProjectImage;
  index: number;
  isActive: boolean;
  offset: number;
  onExpand: () => void;
}) {
  const isSvg = image.src.endsWith(".svg");
  const boundedOffset = Math.max(-2, Math.min(2, offset));
  const isHidden = Math.abs(offset) > 2;

  return (
    <figure
      aria-hidden={!isActive}
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
    </figure>
  );
}

function StaticProjectImage({
  image,
  onExpand,
}: {
  image: ProjectImage;
  onExpand: () => void;
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
  const pointerStart = useRef<PointerStart>({ pointerId: -1, time: 0, x: 0, y: 0 });
  const suppressExpand = useRef(false);

  function navigate(step: -1 | 1) {
    setActiveIndex((current) => wrapProjectIndex(current + step, images.length));
  }

  function resetPointerGesture() {
    pointerStart.current = { pointerId: -1, time: 0, x: 0, y: 0 };
    setDragX(0);
    setIsDragging(false);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    pointerStart.current = {
      pointerId: event.pointerId,
      time: performance.now(),
      x: event.clientX,
      y: event.clientY,
    };
    suppressExpand.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragX(0);
    setIsDragging(true);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerId !== pointerStart.current.pointerId) return;

    const width = galleryRef.current?.clientWidth ?? window.innerWidth;
    const deltaX = event.clientX - pointerStart.current.x;
    const maximumDrag = width * 0.24;
    setDragX(Math.max(-maximumDrag, Math.min(maximumDrag, deltaX)));
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerId !== pointerStart.current.pointerId) return;

    const deltaX = event.clientX - pointerStart.current.x;
    const deltaY = event.clientY - pointerStart.current.y;
    const elapsedMs = performance.now() - pointerStart.current.time;
    const width = galleryRef.current?.clientWidth ?? window.innerWidth;
    const step = getSwipeStep(deltaX, elapsedMs, width);
    suppressExpand.current = !isProjectGalleryClick(deltaX, deltaY);

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

  function handleExpand() {
    if (suppressExpand.current) {
      suppressExpand.current = false;
      return;
    }

    setIsLightboxOpen(true);
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
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={navigate}
      />
    </>
  );
}
