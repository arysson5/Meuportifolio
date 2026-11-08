import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { FadeIn } from '../components/FadeIn'
import { LinkButton } from '../components/LiveProjectButton'
import { SectionTitle } from '../components/SectionTitle'
import { briza } from '../data/site'

/*
  Rolagem horizontal: a seção fica presa na tela e a rolagem vertical empurra os cards para o lado.
  Com "reduzir movimento" (ou se os cards cabem na tela), vira uma faixa comum com rolagem lateral.
*/
export function BrizaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      const viewport = viewportRef.current
      if (!track || !viewport) return
      setDistance(Math.max(0, Math.round(track.scrollWidth - viewport.clientWidth)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const pinned = !reduce && distance > 0

  return (
    <section
      id="briza"
      ref={sectionRef}
      className={pinned ? 'briza-pin' : undefined}
      style={pinned ? ({ '--briza-distance': `${distance}px` } as CSSProperties) : undefined}
    >
      <div className={pinned ? 'sticky top-0 flex h-screen h-svh flex-col justify-center overflow-hidden' : 'py-20 md:py-28'}>
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 md:px-10">
          <FadeIn>
            <SectionTitle
              text={briza.title}
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 7vw, 92px)' }}
              parallax={0}
            />
            <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-fg">{briza.lede}</p>
            <LinkButton href={briza.codeUrl} className="mt-8">
              {briza.codeLabel}
            </LinkButton>
          </FadeIn>

          <div ref={viewportRef} className={`mt-10 ${pinned ? '' : 'snap-x snap-mandatory overflow-x-auto'}`}>
            <motion.div ref={trackRef} style={{ x: pinned ? x : 0 }} className="flex w-max gap-4 pb-2">
              {briza.steps.map((step, index) => (
                <article
                  key={step.title}
                  className="flex w-[270px] shrink-0 snap-start flex-col rounded-[28px] border-2 border-fg p-6 sm:w-[340px] md:p-8"
                >
                  <p className="font-mono text-sm font-bold uppercase tracking-widest text-accent-2">0{index + 1}</p>
                  <h3 className="mt-3 text-2xl font-medium uppercase md:text-3xl">{step.title}</h3>
                  <p className="mt-3 font-light leading-relaxed text-fg/80">{step.text}</p>
                </article>
              ))}
            </motion.div>
          </div>

          {pinned ? (
            <div aria-hidden="true" className="mt-8 h-1 w-full overflow-hidden rounded-full bg-fg/15">
              <motion.div className="h-full origin-left rounded-full bg-accent-2" style={{ scaleX: scrollYProgress }} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
