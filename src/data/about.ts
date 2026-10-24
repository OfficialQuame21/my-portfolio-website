export const aboutHeading = 'A Little About Me'

export const aboutParagraphs = [
  "I'm a Computer Science graduate of Koforidua Technical University in Ghana, with an academic path that runs from Computer Network Management into Computer Science — a foundation in how networks and systems actually work, built on before the software layer.",
  'My work centers on software development: building for web and mobile, designing and administering the databases behind those products, and increasingly exploring machine learning as a way to make them smarter.',
  "I've also spent time on the other side of the desk — as a Teaching Assistant, as a volunteer tutor for the department's technical club, and as a trainer on digital skills. Explaining something well is its own test of whether you understand it.",
  'Alongside that I co-founded Xolace, a mental-wellness product, which has meant learning what it takes to build and run something rather than only write code for it.',
  "Right now I'm deepening my technical capability — particularly AI model training with Python — while working towards postgraduate research in cybersecurity.",
]

export type Highlight = {
  title: string
  body: string
  /** lucide-react icon name, resolved in the About section. */
  icon: 'code' | 'brain' | 'compass'
}

export const highlights: Highlight[] = [
  {
    icon: 'code',
    title: 'Building',
    body: 'Web and mobile applications, and the databases that sit behind them.',
  },
  {
    icon: 'brain',
    title: 'AI and Data',
    body: 'Developing Python-based skills in machine learning, AI model training, and data-driven applications.',
  },
  {
    icon: 'compass',
    title: 'Teaching and Research',
    body: 'Tutoring other students, leading within the university, and working towards cybersecurity research.',
  },
]
