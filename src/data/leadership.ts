/* ---------------------------------------------------------------------------
 * leadership.ts — university leadership and community roles.
 * ------------------------------------------------------------------------- */

export type LeadershipRole = {
  id: string
  role: string
  organization: string
  year: string
  /** Optional one-liner. Keep it factual; avoid claiming specific initiatives. */
  note?: string
}

export const leadershipRoles: LeadershipRole[] = [
  {
    id: 'src-tech',
    role: 'Technology and Innovation Committee Chair',
    organization: "Students' Representative Council, Koforidua Technical University",
    year: '2026',
    note: 'Technology and innovation initiatives within the student leadership structure.',
  },
  {
    id: 'fast-vp',
    role: 'Vice President',
    organization: 'Faculty of Applied Science and Technology, Koforidua Technical University',
    year: '2024',
  },
  {
    id: 'compsa-president',
    role: 'President',
    organization: "Computer Science Students' Association (COMPSA), Koforidua Technical University",
    year: '2024',
  },
]
