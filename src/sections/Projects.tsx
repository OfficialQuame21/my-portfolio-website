import { Reveal } from '../components/Reveal'
import { ProjectCard } from '../components/ProjectCard'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { projects } from '../data/projects'

export function Projects() {
  return (
    <Section id="projects" label="Featured Projects" tone="raised">
      <SectionHeading
        eyebrow="03 — Projects"
        title="Featured Projects"
        description="Academic research, a campus application, and a product I helped start. Each card separates what is built from what is still in development."
      />

      {projects.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-dashed border-line-strong p-10 text-center text-muted">
          Projects will appear here once added to <code className="font-mono text-sm">src/data/projects.ts</code>.
        </p>
      ) : (
        <div className="mt-12 space-y-7">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 60}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  )
}
