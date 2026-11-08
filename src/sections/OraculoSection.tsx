import { FadeIn } from '../components/FadeIn'
import { SectionTitle } from '../components/SectionTitle'
import { LinkButton } from '../components/LiveProjectButton'
import { oraculo } from '../data/site'

export function OraculoSection() {
  return (
    <section id="oraculo" className="px-5 py-20 sm:px-8 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle
            text={oraculo.title}
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 92px)' }}
          />
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed">{oraculo.lede}</p>
          <LinkButton href={oraculo.codeUrl} className="mt-8">
            {oraculo.codeLabel}
          </LinkButton>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {oraculo.sources.map((source, index) => (
            <FadeIn key={source.title} delay={index * 0.1} y={50}>
              <article className="h-full rounded-[28px] border-2 border-fg p-6">
                <h3 className="text-2xl font-medium uppercase">{source.title}</h3>
                <p className="mt-3 font-light leading-relaxed text-fg/80">{source.text}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
