import { Github, Instagram, Linkedin } from 'lucide-react'
import { ContactButton } from '../components/ContactButton'
import { FadeIn } from '../components/FadeIn'
import { SectionTitle } from '../components/SectionTitle'
import { contact, whatsappUrl } from '../data/site'

export function ContactSection() {
  return (
    <section id="contato" className="flex min-h-[80vh] items-end px-5 py-16 sm:px-8 md:px-10 md:py-24">
      <FadeIn className="mx-auto flex w-full max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionTitle
            text={contact.title}
            className="hero-heading max-w-3xl font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 84px)' }}
          />
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-sm font-medium uppercase tracking-widest">
            <span>{contact.name}</span>
            <a href={contact.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2">
              <Github size={18} aria-hidden="true" />
              GitHub
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2">
              <Linkedin size={18} aria-hidden="true" />
              LinkedIn
            </a>
            <a href={contact.instagram} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2">
              <Instagram size={18} aria-hidden="true" />
              Instagram
            </a>
          </div>
        </div>
        <ContactButton href={whatsappUrl} />
      </FadeIn>
    </section>
  )
}
