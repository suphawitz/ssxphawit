import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <p className="eyebrow">404 / Nothing here</p>
      <h1>
        This page took
        <br />
        <em>a different route.</em>
      </h1>
      <p>The project you&apos;re looking for doesn&apos;t exist in this portfolio.</p>
      <Link className="text-link" href="/">
        Return home <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
