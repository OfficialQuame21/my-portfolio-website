/* ---------------------------------------------------------------------------
 * projects.ts
 *
 * To add a project: copy a block, fill it in, and it appears on the page.
 *
 * Link fields left as '' are hidden rather than rendered dead. `inProgress`
 * features render in a clearly separated "In development" list so planned work
 * is never presented as shipped.
 * ------------------------------------------------------------------------- */

export type ProjectLink = {
  /** Leave as '' until the real URL exists — the button then stays hidden. */
  href: string
  label: string
  kind: 'github' | 'demo' | 'appstore' | 'playstore' | 'site'
}

/** A result worth surfacing, e.g. a competition placing. */
export type ProjectAward = {
  /** Short badge text, e.g. '2nd Place'. */
  label: string
}

export type ProjectScreenshot = {
  /** Path under `public/`, e.g. '/projects/chatbot-conversation.webp'. */
  src: string
  /** Describe what the screen shows — this is read aloud by screen readers. */
  alt: string
}

export type Project = {
  id: string
  title: string
  /** Short title used on narrow screens and in the card header rail. */
  shortTitle: string
  category: string
  /** Period or status line, e.g. '2026' or 'Ongoing'. Optional. */
  period?: string
  /** Where the work happened, when that is not obvious from the category. */
  context?: string
  /** Competition placing or similar. Rendered as a small badge. */
  award?: ProjectAward
  featured?: boolean
  description: string
  problem: string
  contribution: string
  /** Shipped / demonstrated features only. */
  features: string[]
  /** Explicitly separated from `features` — never merge these two. */
  inProgress?: string[]
  tech: string[]
  /** Honest scope notes. Rendered as small print on the card. */
  notes?: string[]
  links: ProjectLink[]
  /**
   * Optional hero screenshot for the card header. Put the file in
   * `public/projects/` and set the path, e.g. '/projects/traffic-app.webp'.
   * Leave empty for the abstract motif — which is plainly not a screenshot, so
   * it can never be mistaken for a UI that does not exist.
   */
  image?: string
  imageAlt?: string
  /**
   * Further interface screenshots, shown as a thumbnail strip under the card.
   * Nothing renders while the list is empty.
   */
  screenshots?: ProjectScreenshot[]
  /** Which abstract motif to draw when there is no hero screenshot. */
  motif?: 'route' | 'broadcast' | 'community' | 'conversation'
  /** Accent used for the card's rail and category chip. */
  accent: 'blue' | 'violet' | 'cyan'
}

export const projects: Project[] = [
  {
    id: 'traffic-optimization',
    motif: 'route',
    title: 'Intelligent Traffic and Transport Optimization System for Urban Areas in Ghana',
    shortTitle: 'Traffic & Transport Optimization',
    category: 'Final-Year Research Project',
    featured: true,
    accent: 'blue',
    description:
      'An intelligent traffic and transport optimization project focused on helping road users in urban Ghana make better travel decisions. The system explores traffic congestion and travel-time prediction and recommends optimized routes.',
    problem:
      'Urban road users face congestion and real uncertainty about how long a journey will take. The project explores how machine learning and graph-based algorithms can support better route planning.',
    contribution:
      'Designed and implemented the mobile application, and integrated the prediction and route-optimization components using historical and simulated traffic data.',
    features: [
      'Traffic congestion prediction',
      'Travel-time prediction',
      'Route optimization',
      'Recommendations for alternative routes',
    ],
    tech: [
      'React Native',
      'Expo',
      'TypeScript',
      'Python',
      'scikit-learn',
      'pandas',
      'NumPy',
      'Supabase',
      'FastAPI',
      'Random Forest Regression',
      "Dijkstra's algorithm",
      'A* search',
    ],
    notes: [
      'Built on historical and simulated traffic data — not a live sensor network or GPS feed.',
      'An academic research project; it is not deployed for public use.',
      'Scoped to urban areas in Ghana, including Accra, Kumasi, Cape Coast and Koforidua.',
    ],
    links: [
      { kind: 'github', label: 'Source code', href: '' },
      { kind: 'demo', label: 'Live demo', href: '' },
    ],
  },
  {
    id: 'ktu-src-app',
    motif: 'broadcast',
    title: 'KTU SRC Mobile Application',
    shortTitle: 'KTU SRC App',
    category: 'Mobile Application Development',
    accent: 'violet',
    description:
      "A mobile application built to support communication between the Students' Representative Council and students at Koforidua Technical University.",
    problem:
      'Students rely on the SRC for announcements and campus event information; the application gives that communication a single, reliable channel.',
    contribution:
      'Worked on the application within the SRC Technology and Innovation Committee, focusing on the mobile build and how information reaches students.',
    features: ['Announcements', 'SRC and campus event information'],
    inProgress: ['Accommodation listings', 'Marketplace', 'Hostel booking', 'Tent booking'],
    // CONFIRM: list only the stack actually used in the shipped build.
    tech: ['React Native', 'Expo'],
    notes: ['Features listed under "In development" are planned or partially built — not publicly available.'],
    links: [
      { kind: 'github', label: 'Source code', href: '' },
      { kind: 'playstore', label: 'Google Play', href: '' },
      { kind: 'appstore', label: 'App Store', href: '' },
    ],
  },
  {
    id: 'xolace',
    motif: 'community',
    title: 'Xolace',
    shortTitle: 'Xolace',
    category: 'Digital Product Development',
    accent: 'cyan',
    description:
      'Xolace is a mental-wellness-focused digital product designed to give people ways to express themselves, reflect on their experiences, and connect through supportive community features.',
    problem:
      'People need accessible, low-pressure ways to express what they are going through and find supportive connection around it.',
    contribution:
      'Co-Founder and COO — working across product direction, the technology behind it, and day-to-day operations with the rest of the team.',
    // CONFIRM: move items between these two lists to match what has actually shipped.
    features: ['Community sharing and supportive interactions', 'Mental wellness content'],
    inProgress: ['AI-supported reflective conversations', 'Additional support-oriented features'],
    // CONFIRM: fill in the stack Xolace actually runs on; the row stays hidden while empty.
    tech: [],
    notes: [
      'Xolace is a wellness product. It is not a clinical service and is not a substitute for professional mental healthcare.',
    ],
    links: [
      { kind: 'site', label: 'Visit Xolace', href: '' },
      { kind: 'github', label: 'Source code', href: '' },
    ],
  },
  {
    id: 'srh-chatbot',
    motif: 'conversation',
    title: 'Sexual and Reproductive Health Chatbot',
    shortTitle: 'SRH Chatbot',
    category: 'Health Technology · Chatbot',
    context: 'Coding competition organized with DKT and Lydia',
    award: { label: '2nd Place' },
    accent: 'violet',
    description:
      'A chatbot concept designed to give people a safe, supportive and non-judgmental way to ask questions about sexual and reproductive health.',
    problem:
      'Sexual and reproductive health questions are easy to leave unasked. The project set out to make that information more approachable by giving people a way to ask comfortably, without fear of being judged.',
    contribution:
      'Built as part of a team representing the Computer Science Department in a coding competition organized with DKT and Lydia. Our team placed second.',
    features: [
      'Conversational interface for health questions',
      'Non-judgmental, supportive framing',
    ],
    // CONFIRM: fill in the stack the chatbot was actually built on; the row
    // stays hidden while this is empty rather than showing a guess.
    tech: [],
    notes: [
      'Built for a coding competition. It is a prototype — not a deployed public service.',
      'Not clinically validated, and not a substitute for professional medical advice.',
    ],
    // Add real URLs here and the buttons appear; they stay hidden while empty.
    links: [
      { kind: 'github', label: 'Source code', href: '' },
      { kind: 'demo', label: 'Live demo', href: '' },
    ],
    // Add interface screenshots here once you have them, e.g.
    //   { src: '/projects/srh-chatbot-conversation.webp', alt: 'Chatbot answering a question about contraception' }
    screenshots: [],
  },
]
