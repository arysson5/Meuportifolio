import { FadeIn } from '../components/FadeIn'
import { SectionTitle } from '../components/SectionTitle'
import { LinkButton } from '../components/LiveProjectButton'
import { contratos } from '../data/site'

export function ContratosSection() {
  return (
    <section id="contratos" className="px-5 py-20 sm:px-8 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <FadeIn>
          <SectionTitle
            text={contratos.title}
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 92px)' }}
          />
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed">{contratos.lede}</p>
          <LinkButton href={contratos.codeUrl} className="mt-8">
            {contratos.codeLabel}
          </LinkButton>
        </FadeIn>
        <ul className="flex flex-col gap-4">
          {contratos.checks.map((check, index) => (
            <FadeIn
              as="li"
              key={check}
              delay={0.15 + index * 0.1}
              x={60}
              y={0}
              className="rounded-[24px] border-2 border-fg px-5 py-4 font-light leading-relaxed"
            >
              {check}
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  )
}
