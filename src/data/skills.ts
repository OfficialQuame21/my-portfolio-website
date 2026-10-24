/* ---------------------------------------------------------------------------
 * skills.ts
 *
 * Deliberately no percentages or star ratings — those invent a precision that
 * doesn't exist. Instead each item carries an honest level:
 *
 *   applied  — used to build something real (a project, coursework, product)
 *   working  — comfortable with it, less project mileage
 *   learning — actively building this skill right now
 * ------------------------------------------------------------------------- */

export type SkillLevel = 'applied' | 'working' | 'learning'

export const levelMeta: Record<SkillLevel, { label: string; short: string }> = {
  applied: { label: 'Used in projects', short: 'Applied' },
  working: { label: 'Working knowledge', short: 'Working' },
  learning: { label: 'Currently learning', short: 'Learning' },
}

export type Skill = { name: string; level: SkillLevel }

export type SkillGroup = {
  id: string
  title: string
  blurb: string
  icon: 'layout' | 'database' | 'brain' | 'wrench'
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend & Application Development',
    blurb: 'Where most of my build time goes — interfaces and mobile apps in the JavaScript ecosystem.',
    icon: 'layout',
    skills: [
      { name: 'JavaScript', level: 'applied' },
      { name: 'TypeScript', level: 'applied' },
      { name: 'React', level: 'applied' },
      { name: 'React Native', level: 'applied' },
      { name: 'Expo', level: 'applied' },
      // CONFIRM: adjust to 'learning' if you have not shipped a Next.js project.
      { name: 'Next.js', level: 'working' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Databases',
    blurb: 'Designing the data and services applications depend on.',
    icon: 'database',
    skills: [
      { name: 'Supabase', level: 'applied' },
      { name: 'PostgreSQL', level: 'applied' },
      { name: 'SQL', level: 'applied' },
      { name: 'FastAPI', level: 'applied' },
      { name: 'REST APIs', level: 'applied' },
      { name: 'MySQL', level: 'working' },
      { name: 'Database Administration', level: 'working' },
    ],
  },
  {
    id: 'ml',
    title: 'Python & Machine Learning',
    blurb: 'Used for the prediction components of my final-year project, and the area I am actively growing.',
    icon: 'brain',
    skills: [
      { name: 'Python', level: 'applied' },
      { name: 'scikit-learn', level: 'applied' },
      { name: 'pandas', level: 'applied' },
      { name: 'NumPy', level: 'applied' },
      { name: 'Machine learning fundamentals', level: 'working' },
      { name: 'AI model training', level: 'learning' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Workflow',
    blurb: 'The day-to-day of version control and shipping work.',
    icon: 'wrench',
    skills: [
      { name: 'Git', level: 'applied' },
      { name: 'GitHub', level: 'applied' },
      { name: 'Modern development workflows', level: 'working' },
    ],
  },
]
