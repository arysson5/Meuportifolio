import { BrainCircuit } from 'lucide-react'
import type { CSSProperties } from 'react'
import { FadeIn } from '../components/FadeIn'
import { SectionTitle } from '../components/SectionTitle'
import { stack, type StackItem } from '../data/stack'

function Logo({ item, copy = false }: { item: StackItem; copy?: boolean }) {
  return (
    <li
      aria-hidden={copy || undefined}
      className={`stack-chip group ${copy ? 'stack-copy ' : ''} flex shrink-0 items-center gap-3 rounded-2xl border-2 border-[#0a0a0a] bg-[#0a0a0a] px-5 py-4 text-[#aff21a] sm:gap-4 sm:px-7 sm:py-5`}
      style={{ '--brand': item.color } as CSSProperties}
    >
      {item.path ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="stack-logo h-7 w-7 fill-current sm:h-9 sm:w-9">
          <path d={item.path} />
        </svg>
      ) : (
        <BrainCircuit aria-hidden="true" className="stack-logo h-7 w-7 sm:h-9 sm:w-9" strokeWidth={1.75} />
      )}
      <span className="whitespace-nowrap font-mono text-sm font-bold uppercase tracking-[0.14em] sm:text-base">
        {item.name}
      </span>
    </li>
  )
}

// Uma faixa infinita: a lista vai duplicada e anda metade da largura, então o fim encosta no começo.
function Row({ items, reverse = false }: { items: StackItem[]; reverse?: boolean }) {
  return (
    <div className="stack-row overflow-hidden">
      <ul className={`stack-track flex w-max gap-4 ${reverse ? 'stack-track-reverse' : ''}`}>
        {items.map((item) => (
          <Logo key={item.name} item={item} />
        ))}
        {items.map((item) => (
          <Logo key={`${item.name}-copia`} item={item} copy />
        ))}
      </ul>
    </div>
  )
}

export function StackSection() {
  const shifted = [...stack.slice(4), ...stack.slice(0, 4)]

  return (
    <section id="stack" aria-label="Stack" className="overflow-hidden py-20 md:py-28">
      <div className="mx-auto mb-12 max-w-6xl px-5 sm:px-8 md:mb-16 md:px-10">
        <SectionTitle
          text="Stack"
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        />
        <FadeIn delay={0.2} y={20}>
          <p className="mt-4 font-mono text-sm font-bold uppercase tracking-[0.18em] sm:text-base">
            // linguagens e ferramentas do dia a dia
          </p>
        </FadeIn>
      </div>
      <div className="flex flex-col gap-4">
        <Row items={stack} />
        <Row items={shifted} reverse />
      </div>
    </section>
  )
}
