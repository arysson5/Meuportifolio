import { FadeIn } from '../components/FadeIn'
import { SectionTitle } from '../components/SectionTitle'
import { cases } from '../data/site'

export function CasesSection() {
  return (
    <section
      id="cases"
      className="rounded-t-[40px] theme-dark bg-grid px-5 py-20 text-fg sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <SectionTitle
            text={'Cases'}
            className="hero-heading mb-16 text-center font-black uppercase leading-none sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          />
      <ul className="mx-auto max-w-5xl border-t border-fg/15 pb-16">
        {cases.map((item, index) => (
          <li key={item.number} className="border-b border-fg/15">
            <FadeIn delay={index * 0.08} x={-60} y={0}>
              <div className="flex flex-col gap-4 py-8 sm:py-10 md:flex-row md:items-center md:gap-12 md:py-12">
                <span
                  className="font-black leading-none text-fg"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {item.number}
                </span>
                <div>
                  <h3
                    className="font-medium uppercase leading-tight"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="mt-3 max-w-2xl font-light leading-relaxed text-fg/85"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          </li>
        ))}
      </ul>
    </section>
  )
}
