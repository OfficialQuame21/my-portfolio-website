/* ---------------------------------------------------------------------------
 * achievements.ts
 *
 * `verified: false` keeps an entry out of the page entirely. Flip it to true
 * once you have the certificate, letter or official confirmation in hand — and
 * add detail lines only for things that document actually says.
 *
 * Fields left as '' or omitted are not rendered, so a missing year or an
 * unnamed competition never turns into a guess on the page.
 * ------------------------------------------------------------------------- */

export type Achievement = {
  id: string
  title: string
  /** Awarding institution, or the context the achievement came out of. */
  organization: string
  /** Leave as '' rather than guessing a date. */
  year: string
  /** One-line framing shown under the title, e.g. the qualification it relates to. */
  context?: string
  description: string
  /**
   * The thing that was built or submitted, where there was one.
   *
   * Deliberately no description here: `ref` points at the matching entry in
   * projects.ts, which already carries the full write-up. Repeating it would
   * put the same paragraph on the page twice.
   */
  project?: {
    name: string
    /** Project id from projects.ts — renders a link through to that card. */
    ref?: string
    /** What the work shows — framing that is NOT in the project card. */
    demonstrates: string[]
  }
  verified: boolean
  icon: 'award' | 'trophy'
  /** Accent used for the card's badge and rail. */
  accent: 'violet' | 'blue'
  /**
   * Optional certificate, award photo or project screenshot. Put the file in
   * `public/achievements/` and set the path, e.g. '/achievements/award.webp'.
   * Leave it out and the card renders a clean crest instead — no fabricated
   * certificate imagery.
   */
  image?: string
  imageAlt?: string
}

export const achievements: Achievement[] = [
  {
    id: 'best-graduating-student',
    title: 'Best Graduating Student — Computer Science Department',
    organization: 'Koforidua Technical University, Ghana',
    year: '2024',
    context: 'Higher National Diploma in Computer Network Management',
    description:
      'Recognized as the Best Graduating Student in the Computer Science Department on completing my Higher National Diploma in Computer Network Management.',
    verified: true,
    icon: 'award',
    accent: 'violet',
  },
  {
    id: 'srh-chatbot-competition',
    title: 'Second Place — Sexual and Reproductive Health Chatbot',
    // CONFIRM: if the competition has an official name you can evidence, add it here.
    organization: 'Coding competition organized with DKT and Lydia',
    year: '',
    context: 'Representing the Computer Science Department',
    description:
      'Represented the Computer Science Department in a coding competition organized with DKT and Lydia. Our team placed second.',
    project: {
      name: 'Sexual and Reproductive Health Chatbot',
      ref: 'srh-chatbot',
      demonstrates: [
        'Software development and problem-solving',
        'Technology applied to a real-world health challenge',
        'Collaborative project development',
        'Human-centered design and digital innovation',
      ],
    },
    verified: true,
    icon: 'trophy',
    accent: 'blue',
  },
]
