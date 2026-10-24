import { BookOpen, GraduationCap, HeartHandshake, Rocket, Users } from 'lucide-react'
import { DevHint } from '../components/DevHint'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { Timeline } from '../components/Timeline'
import type { TimelineItem } from '../components/Timeline'
import type { Engagement } from '../data/experience'
import { experiences } from '../data/experience'

/**
 * How each role was undertaken. Every label here comes straight from the role
 * itself — nothing is inferred about pay or employment status. Volunteer work
 * carries its own tone so unpaid tutoring reads as exactly that.
 */
const engagementBadges: Record<Engagement, { label: string; Icon: typeof Users; tone: 'neutral' | 'violet' }> = {
  volunteer: { label: 'Volunteer', Icon: HeartHandshake, tone: 'violet' },
  founding: { label: 'Founding team', Icon: Rocket, tone: 'neutral' },
  'student-leadership': { label: 'Student leadership', Icon: Users, tone: 'neutral' },
  internship: { label: 'Internship', Icon: BookOpen, tone: 'neutral' },
  'national-service': { label: 'National Service', Icon: GraduationCap, tone: 'neutral' },
}

export function Experience() {
  const items: TimelineItem[] = experiences.map((item) => {
    const badge = engagementBadges[item.engagement]

    return {
      id: item.id,
      // No date is rendered when the period is unknown — in dev an amber hint
      // takes its place, exactly as unconfigured links behave elsewhere.
      period:
        item.period.trim() !== ''
          ? item.period
          : import.meta.env.DEV
            ? <DevHint>Add dates</DevHint>
            : null,
      title: item.role,
      subtitle: item.organization,
      context: item.context,
      body: item.description,
      points: item.points,
      tags: item.focus,
      current: item.current,
      badge: {
        label: badge.label,
        tone: badge.tone,
        icon: <badge.Icon size={12} aria-hidden="true" />,
      },
    }
  })

  return (
    <Section id="experience" label="Professional Experience">
      <SectionHeading
        eyebrow="04 — Experience"
        title="Professional Experience"
        description="Teaching, tutoring, product work and student leadership — the roles where I've been responsible for something real, paid and unpaid alike."
      />
      <Timeline items={items} />
    </Section>
  )
}
