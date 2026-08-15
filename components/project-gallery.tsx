import Image from "next/image";

import { getProjectGallery } from "@/lib/projects";
import type { Project, ProjectImage } from "@/types/project";

function GalleryImage({
  image,
  index,
  duplicate = false,
}: {
  image: ProjectImage;
  index: number;
  duplicate?: boolean;
}) {
  const isSvg = image.src.endsWith(".svg");

  return (
    <figure className={`project-gallery-card${index === 0 ? " is-cover" : ""}`}>
      <Image
        src={image.src}
        alt={duplicate ? "" : image.alt}
        fill
        loading={duplicate || index !== 0 ? "lazy" : undefined}
        preload={!duplicate && index === 0}
        sizes="(max-width: 700px) 78vw, (max-width: 1200px) 42vw, 34rem"
        unoptimized={isSvg}
      />
      {!duplicate && index === 0 ? (
        <figcaption className="project-gallery-cover-label">Cover image</figcaption>
      ) : null}
    </figure>
  );
}

export function ProjectGallery({ project }: { project: Project }) {
  const images = getProjectGallery(project);
  const hasLoop = images.length > 1;

  if (!hasLoop) {
    return (
      <div className="project-gallery project-gallery-single" aria-label="Project cover image">
        <GalleryImage image={images[0]} index={0} />
      </div>
    );
  }

  return (
    <section className="project-gallery" aria-label="Project image gallery">
      <div className="project-gallery-track">
        <div className="project-gallery-group">
          {images.map((image, index) => (
            <GalleryImage image={image} index={index} key={image.src} />
          ))}
        </div>
        <div className="project-gallery-group project-gallery-group-duplicate" aria-hidden="true">
          {images.map((image, index) => (
            <GalleryImage image={image} index={index} duplicate key={`duplicate-${image.src}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
