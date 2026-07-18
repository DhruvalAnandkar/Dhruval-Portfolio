"use client";

import IntroExperience from "@/components/IntroExperience";
import Navbar from "@/components/Navbar";
import DeferredFX from "@/components/DeferredFX";
import EliteCursor from "@/components/EliteCursor";
import ScrollProgress from "@/components/ScrollProgress";
import WorldPath from "@/components/WorldPath";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import SocialProof from "@/components/SocialProof";
import Timeline from "@/components/Timeline";
import Volunteering from "@/components/Volunteering";
import Footer from "@/components/Footer";
import FAB from "@/components/FAB";
import QuickNav from "@/components/QuickNav";

export default function HomeClient() {
  return (
    <>
      {/* Outside intro opacity gate — otherwise cursor is invisible */}
      <EliteCursor />
      <IntroExperience>
        <ScrollProgress />
        <DeferredFX />

        <Navbar />

        <main className="relative z-10">
          <Hero />
          <div className="section-seam" aria-hidden />
          <WorldPath />
          <div className="section-seam" aria-hidden />
          <About />
          <Skills />
          <Projects />
          <Research />
          <Timeline />
          <SocialProof />
          <Volunteering />
        </main>

        <Footer />
        <QuickNav />
        <FAB />
      </IntroExperience>
    </>
  );
}
