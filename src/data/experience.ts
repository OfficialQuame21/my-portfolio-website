/* ---------------------------------------------------------------------------
 * experience.ts — professional timeline, newest first.
 *
 * `engagement` drives the small badge on each entry. Volunteer work is given
 * its own tone so unpaid tutoring is never mistaken for employment.
 *
 * `period` left as '' renders no date at all rather than a guessed one; use
 * `context` to say when or where something happened when there is no range.
 * ------------------------------------------------------------------------- */

export type Engagement = 'founding' | 'student-leadership' | 'internship' | 'national-service' | 'volunteer'

export type Experience = {
  id: string
  role: string
  organization: string
  /** Leave as '' to render no date rather than invent a range. */
  period: string
  /** Shown under the organization — e.g. the event a role sat within. */
  context?: string
  location?: string
  description: string
  /** Optional bullets. Only add responsibilities you can confirm. */
  points?: string[]
  /** Subject areas the role covered. Rendered as chips. */
  focus?: string[]
  type: 'academic' | 'product' | 'leadership' | 'tutoring'
  engagement: Engagement
  current?: boolean
}

export const experiences: Experience[] = [
  {
    id: 'src-tech-chair',
    role: 'Technology and Innovation Committee Chair',
    organization: "Students' Representative Council, Koforidua Technical University",
    period: '2026',
    type: 'leadership',
    engagement: 'student-leadership',
    current: true,
    description:
      'Contribute to technology and innovation initiatives within the student leadership structure, including the development and improvement of digital tools intended to support the university community.',
  },
  {
    id: 'xolace-coo',
    role: 'Co-Founder and Chief Operating Officer',
    organization: 'Xolace',
    // CONFIRM: add the real start date, e.g. '2025 – Present'.
    period: '',
    type: 'product',
    engagement: 'founding',
    current: true,
    description:
      'Contribute to the development and operations of a mental-wellness-focused digital product, working across product coordination, technology, and organizational activities.',
  },
  {
    id: 'cs-club-tutor',
    role: 'Volunteer Technical Tutor',
    organization: 'Computer Science Department, Koforidua Technical University',
    context: "Computer Science Department's technical club",
    period: 'February 2026 – May 2026',
    type: 'tutoring',
    engagement: 'volunteer',
    description:
      "Volunteered as a tutor for the Computer Science Department's technical club, supporting students in learning and developing practical skills in web development, mobile application development, and database administration. The club gave students a space to explore software development concepts and build practical technical knowledge.",
    focus: [
      'Web Development',
      'Mobile Application Development',
      'Database Administration',
      'Technical Mentoring',
      'Knowledge Sharing',
    ],
  },
  {
    id: 'ta-internship',
    role: 'Teaching Assistant — Semester-Out Internship',
    organization: 'Koforidua Technical University',
    period: 'January 2026 – Early May 2026',
    type: 'academic',
    engagement: 'internship',
    description:
      'Completed a semester-out internship as a Teaching Assistant, gaining further experience in a university academic environment.',
  },
  {
    id: 'gnut-digital-skills',
    role: 'Technical Training Tutor',
    organization: 'Ghana National Union of Technical Students (GNUT)',
    context: 'SRC Week celebration, Koforidua Technical University',
    // CONFIRM: add the dates once you have them — no date is shown while this is empty.
    period: '',
    type: 'tutoring',
    engagement: 'volunteer',
    description:
      'Served as a tutor during a GNUT training program associated with the SRC Week celebration, facilitating practical training in Microsoft Office applications and digital productivity tools, including creating and working with Google Forms. The training helped participants build practical digital skills and grow more confident with common productivity tools.',
    focus: [
      'Microsoft Office Applications',
      'Google Forms Creation',
      'Digital Productivity',
      'Technical Training',
      'Communication and Knowledge Sharing',
    ],
  },
  {
    id: 'ta-national-service',
    role: 'Teaching Assistant — National Service',
    organization: 'Koforidua Technical University',
    period: 'October 2024 – September 2025',
    type: 'academic',
    engagement: 'national-service',
    description:
      'Served as a Teaching Assistant during national service at Koforidua Technical University, supporting teaching and academic activities within the university.',
  },
]
