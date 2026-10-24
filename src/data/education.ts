/* ---------------------------------------------------------------------------
 * education.ts
 *
 * `cgpa` is rendered as supplied. `honours` is gated behind `verified`: the
 * classification and departmental award stay off the page entirely until the
 * official record confirms them — flip `verified` to true and they appear.
 * ------------------------------------------------------------------------- */

export type Education = {
  id: string
  qualification: string
  institution: string
  location: string
  period: string
  summary: string
  record?: {
    cgpa?: string
    /** Rendered only when `verified` is true. */
    honours?: {
      verified: boolean
      classification?: string
      highlight?: string
    }
  }
  focus?: string[]
}

export const education: Education[] = [
  {
    id: 'btech-cs',
    qualification: 'Bachelor of Technology (B.Tech.) in Computer Science',
    institution: 'Koforidua Technical University',
    location: 'Ghana',
    period: 'January 2025 – September 2026',
    summary:
      'Built on the networking foundation of the HND with a full Computer Science curriculum, concluding with a final-year research project on traffic and transport optimization.',
    record: {
      cgpa: '4.89 / 5.00',
      honours: {
        // Set to true once the official transcript confirms the classification.
        verified: false,
        classification: 'Distinction',
      },
    },
    focus: ['Software Engineering', 'Databases', 'Machine Learning', 'Algorithms'],
  },
  {
    id: 'hnd-cnm',
    qualification: 'Higher National Diploma (HND) in Computer Network Management',
    institution: 'Koforidua Technical University',
    location: 'Ghana',
    period: 'January 2022 – October 2024',
    summary:
      'Grounding in computer networks, systems and infrastructure — the background that shapes my interest in security research today.',
    record: {
      cgpa: '4.46 / 5.00',
      honours: {
        verified: true,
        highlight: 'Best Graduating Student, Computer Science Department — 2024',
      },
    },
    focus: ['Computer Networks', 'Network Administration', 'Systems'],
  },
]
