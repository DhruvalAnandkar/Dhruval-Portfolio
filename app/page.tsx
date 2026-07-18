import HomeClient from "@/components/HomeClient";

/**
 * Server-rendered identity block so Google always sees name + bio in HTML,
 * even before the client intro finishes. Matches on-page content (not cloaking).
 */
export default function Home() {
  return (
    <>
      <section className="sr-only" aria-label="Dhruval Anandkar portfolio summary">
        <h1>Dhruval Anandkar</h1>
        <p>
          CS (Honors) at Ashland University. Software &amp; Systems Engineer
          building scalable backends and intelligent applications. Data
          Engineering, Full-Stack, AI/ML.
        </p>
        <p>
          Portfolio: projects, research, skills, experience, and contact at
          https://dhruvalanandkar.com
        </p>
      </section>
      <HomeClient />
    </>
  );
}
