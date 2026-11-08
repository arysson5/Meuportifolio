import { AnimatedText } from '../components/AnimatedText'
import { ContactButton } from '../components/ContactButton'
import { FadeIn } from '../components/FadeIn'
import { SectionTitle } from '../components/SectionTitle'
import { aboutText, whatsappUrl } from '../data/site'

export function AboutSection() {
  return (
    <section id="sobre" className="relative flex min-h-screen min-h-svh items-center justify-center overflow-hidden px-5 py-20 sm:px-8 md:px-10">

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-10 text-center sm:gap-14 md:gap-16">
        <FadeIn y={40}>
          <SectionTitle
            text={'Sobre'}
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          />
        </FadeIn>
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text={aboutText}
            className="max-w-[560px] text-center font-medium leading-relaxed text-fg"
          />
          <FadeIn delay={0.2} y={40}>
            <ContactButton href={whatsappUrl} />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
