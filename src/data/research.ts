/* ---------------------------------------------------------------------------
 * research.ts
 *
 * These are stated INTERESTS and a direction of travel — not a record of
 * completed research. There is deliberately no publications list: add one only
 * when there is something real to cite.
 * ------------------------------------------------------------------------- */

export const researchIntro =
  "I'm interested in advancing my technical knowledge through postgraduate research, particularly in cybersecurity and related areas of computing. My HND in Computer Network Management gave me a grounding in how networks and systems behave; my Computer Science degree added the software and machine learning side. A research master's is the next step I'm working towards."

export const researchNote =
  'These interests are a direction, not a fixed thesis. I expect them to sharpen as I work with a supervisor on a specific research question.'

export type ResearchInterest = {
  title: string
  body: string
  icon: 'shield' | 'network' | 'lock' | 'cpu' | 'chart'
}

export const researchInterests: ResearchInterest[] = [
  {
    icon: 'shield',
    title: 'Cybersecurity',
    body: 'The broad area I want to specialize in through a research-based master’s degree.',
  },
  {
    icon: 'network',
    title: 'Computer and Network Security',
    body: 'Built directly on my Computer Network Management background and how systems communicate.',
  },
  {
    icon: 'lock',
    title: 'Secure Software and Systems',
    body: 'Designing applications where security is part of the architecture rather than an afterthought.',
  },
  {
    icon: 'cpu',
    title: 'Artificial Intelligence and Machine Learning',
    body: 'Where learning-based methods meet security problems — and where my current Python work points.',
  },
  {
    icon: 'chart',
    title: 'Data-Driven Approaches to Computing Problems',
    body: 'Using real data to reason about systems, as I did in my final-year traffic optimization project.',
  },
]

/** Pointer to the project used as evidence of academic project experience. */
export const researchProjectId = 'traffic-optimization'

/**
 * A line written for this section specifically. The project card carries the
 * full description — repeating it here would say the same thing twice.
 */
export const researchProjectNote =
  'A full academic research project: framing a question, building the system, and evaluating it on real and simulated data.'
