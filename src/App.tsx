import { Backdrop } from './components/Backdrop'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { About } from './sections/About'
import { Achievements } from './sections/Achievements'
import { Contact } from './sections/Contact'
import { Education } from './sections/Education'
import { Experience } from './sections/Experience'
import { Gallery } from './sections/Gallery'
import { Hero } from './sections/Hero'
import { Leadership } from './sections/Leadership'
import { Projects } from './sections/Projects'
import { Research } from './sections/Research'
import { Skills } from './sections/Skills'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-medium focus:text-on-accent"
      >
        Skip to main content
      </a>

      <Backdrop />
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Leadership />
        <Education />
        <Research />
        <Achievements />
        <Gallery />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
