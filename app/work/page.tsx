import type { Metadata } from "next";

import { ProjectIndex } from "@/components/project-index";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected frontend projects by Suphawit Jaikaewma.",
};

export default function WorkPage() {
  return (
    <div className="site-shell">
      <main id="main-content">
        <ProjectIndex projects={getProjects()} showAllLink={false} />
      </main>
      <footer className="site-footer">
        <span>© 2026 Suphawit</span>
        <span>Made with care</span>
      </footer>
    </div>
  );
}
