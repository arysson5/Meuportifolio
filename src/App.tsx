import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { InkTrail } from './components/InkTrail'
import { AboutSection } from './sections/AboutSection'
import { BrizaSection } from './sections/BrizaSection'
import { CaraSection } from './sections/CaraSection'
import { CasesSection } from './sections/CasesSection'
import { ContactSection } from './sections/ContactSection'
import { ContratosSection } from './sections/ContratosSection'
import { HeroSection } from './sections/HeroSection'
import { MarqueeSection } from './sections/MarqueeSection'
import { OraculoSection } from './sections/OraculoSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { StackSection } from './sections/StackSection'

export default function App() {
  return (
    <>
    <InkTrail />
    <main className="overflow-x-clip">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <StackSection />
      <CasesSection />
      <ProjectsSection />
      <BrizaSection />
      <ContratosSection />
      <OraculoSection />
      <CaraSection />
      <ContactSection />
    </main>
    <FloatingWhatsApp />
    </>
  )
}
