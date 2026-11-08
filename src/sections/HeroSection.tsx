import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Github, Instagram, Linkedin, Menu, X } from 'lucide-react'
import { useContext, useRef, useState } from 'react'
import portrait from '@assets/arysson-3d.webp'
import portraitDepth from '@assets/arysson-3d-depth.jpg'
import { ContactButton } from '../components/ContactButton'
import { FadeIn } from '../components/FadeIn'
import { Magnet } from '../components/Magnet'
import { Portrait3D } from '../components/Portrait3D'
import { MetallicButton } from '@/components/ui/metallic-button'
import { IntroReadyContext } from '../context/intro'
import { heroParts, nav, socials, whatsappUrl } from '../data/site'

const socialIcons = { LinkedIn: Linkedin, GitHub: Github, Instagram } as const

const navLinkClass =
  'block py-4 text-2xl font-medium uppercase tracking-wider text-fg transition-opacity duration-200 hover:text-accent-2 md:py-0 md:text-lg lg:text-[1.4rem]'

function SocialIcons() {
  return socials.map((item) => {
    const Icon = socialIcons[item.label]
    return (
      <MetallicButton
        key={item.label}
        href={item.href}
        viewMode="icon"
        label={item.label}
        ariaLabel={`${item.label}: ${item.handle}`}
        title={item.handle}
        icon={<Icon size={18} strokeWidth={1.75} aria-hidden="true" />}
      />
    )
  })
}

export function HeroSection() {
  const [open, setOpen] = useState(false)
  // o conteúdo do hero só monta quando a abertura começa a sair, para as animações de entrada aparecerem
  const ready = useContext(IntroReadyContext)
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  // Parallax ao sair do hero: nome sobe rápido, cabeça encolhe presa pela base, textos somem.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const k = reduce ? 0 : 1
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -220 * k])
  const nameOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0])
  const headY = useTransform(scrollYProgress, [0, 1], [0, -40 * k])
  const headScale = useTransform(scrollYProgress, [0, 1], [1, 1 - 0.15 * k])
  const uiY = useTransform(scrollYProgress, [0, 1], [0, 120 * k])
  const uiOpacity = useTransform(scrollYProgress, [0, 0.45], [1, reduce ? 1 : 0])

  return (
    <section ref={sectionRef} aria-label="Abertura" className="relative h-screen h-svh overflow-hidden">
      {ready ? (
      <>
      <FadeIn delay={0} y={-20} className="relative z-30 px-6 pt-6 md:px-10 md:pt-8">
        <div className="flex items-center">
          <nav className="hidden w-full items-center justify-between md:flex" aria-label="Seções">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium uppercase tracking-wider text-fg transition-opacity duration-200 hover:text-accent-2 md:text-lg lg:text-[1.4rem]">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-2 md:hidden">
            <SocialIcons />
          </div>
          <button
            type="button"
            className="ml-auto inline-flex min-h-11 min-w-11 items-center justify-center text-fg md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </FadeIn>

      {open ? (
        <nav aria-label="Menu" className="fixed inset-0 z-40 flex flex-col bg-canvas px-6 pb-10 pt-6">
          <button
            type="button"
            className="ml-auto inline-flex min-h-11 min-w-11 items-center justify-center"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
          >
            <X aria-hidden="true" />
          </button>
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={navLinkClass} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}

      <motion.div
        style={{ y: nameY, opacity: nameOpacity }}
        className="pointer-events-none absolute inset-x-0 top-[4.5rem] z-[2] overflow-hidden sm:top-16"
      >
        <FadeIn
          as="h1"
          delay={0.15}
          y={40}
          className="whitespace-nowrap text-center font-black text-fg uppercase leading-[0.78] tracking-[-0.045em] text-[23vw] sm:text-[21vw] lg:text-[19vw]"
        >
          Arysson
        </FadeIn>
      </motion.div>

      <div className="hero-portrait absolute bottom-0 left-1/2 z-10 w-auto -translate-x-1/2">
        <motion.div style={{ y: headY, scale: headScale }} className="h-full origin-bottom">
        <FadeIn delay={0.6} y={30} className="h-full">
          <Magnet className="h-full" strength={7}>
            <Portrait3D
              src={portrait}
              depth={portraitDepth}
              alt="Retrato 3D de Arysson Menezes, com circuitos e telas de código no rosto."
              className="h-full"
            />
          </Magnet>
        </FadeIn>
        </motion.div>
      </div>

      {/* Redes no desktop: coluna de ícones à direita (no celular ficam na barra do topo) */}
      <motion.div style={{ opacity: uiOpacity }} className="pointer-events-none absolute inset-y-0 right-6 z-20 hidden items-center md:flex lg:right-10">
        <FadeIn delay={0.75} x={20} y={0} className="pointer-events-auto flex flex-col gap-3">
          <SocialIcons />
        </FadeIn>
      </motion.div>

      <motion.div
        style={{ y: uiY, opacity: uiOpacity }}
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-start gap-3 px-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4 pb-7 sm:px-8 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20} className="sm:mb-6">
          <p className="hud theme-dark relative flex max-w-[290px] flex-col items-start gap-2 px-5 py-4 sm:max-w-[320px] sm:gap-2.5 md:max-w-[360px]">
            <span aria-hidden="true" className="hud-corner left-0 top-0 border-l-2 border-t-2" />
            <span aria-hidden="true" className="hud-corner bottom-0 right-0 border-b-2 border-r-2" />
            <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.22em] text-accent-2 before:content-['//_'] sm:text-xs">
              {heroParts.role}
            </span>{' '}
            <span className="font-semibold leading-[1.02] tracking-tight text-fg" style={{ fontSize: 'clamp(1.25rem, 2.2vw, 2.1rem)' }}>
              {heroParts.stack}
            </span>{' '}
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fg/75 sm:text-xs">
              {heroParts.experience}
            </span>{' '}
            <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-fg sm:text-xs">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-accent-2" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
              </span>
              {heroParts.status}
            </span>
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} className="self-end sm:self-auto">
          <ContactButton href={whatsappUrl} />
        </FadeIn>
      </motion.div>
      </>
      ) : null}
    </section>
  )
}
