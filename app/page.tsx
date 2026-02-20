import Navbar from "@/components/Navbar";
import FloatingParticles from "@/components/FloatingParticles";
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

export default function Home() {
  return (
    <>
      {/* Subtle emerald-only floating particles background */}
      <FloatingParticles />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Timeline />
        <SocialProof />
        <Volunteering />
      </main>

      <Footer />

      {/* Floating "Let's Talk" action button */}
      <FAB />
    </>
  );
}
