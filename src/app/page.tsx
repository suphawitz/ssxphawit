import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import TrustBar from "@/components/sections/TrustBar";
import SelectedWork from "@/components/sections/SelectedWork";
import ProjectCard from "@/components/project/ProjectCard";

export default function Home() {
  return (
    <>
      <Navbar />
       <main>
          <Hero />
          <TrustBar />
          <SelectedWork />
          {/* <ProjectCard /> */}
        </main>
    </>
  );
}
