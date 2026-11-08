import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import portrait from '@assets/arysson-3d.webp'

type IntroProps = {
  /** Chamado quando a abertura começa a sair: o site já pode animar por baixo. */
  onReveal: () => void
  /** Chamado quando a abertura terminou de sair. */
  onFinish: () => void
}

const LINES = [
  '> github.com/arysson5',
  '> Arysson Menezes — Desenvolvedor Web',
  '> back-end: PHP · Laravel · Node',
  '> no GitHub desde 2018',
]

const DURATION = 2.6 // segundos até 100%

/*
  Abertura: o rosto se materializa como holograma (sobe de baixo para cima, sai do borrão e do cinza),
  com uma linha de varredura limão, texto de terminal e contador. No fim, a tela preta sobe e revela o site.
*/
export function Intro({ onReveal, onFinish }: IntroProps) {
  const reduce = useReducedMotion()
  const progress = useMotionValue(0)
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const revealed = useRef(false)

  // rosto: recorte que sobe, borrão e cinza saindo
  const clip = useTransform(progress, [0.05, 0.75], ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'])
  const filter = useTransform(
    progress,
    [0.05, 0.85],
    ['blur(14px) grayscale(1) brightness(0.5)', 'blur(0px) grayscale(0) brightness(1)'],
  )
  const scale = useTransform(progress, [0, 1], [1.08, 1])
  const scanTop = useTransform(progress, [0.05, 0.75], ['100%', '0%'])
  const scanOpacity = useTransform(progress, [0.05, 0.1, 0.72, 0.8], [0, 1, 1, 0])
  const holoOpacity = useTransform(progress, [0.4, 0.95], [0.55, 0])
  const glow = useTransform(progress, [0, 1], [0.2, 0.9])

  const leave = () => {
    if (revealed.current) return
    revealed.current = true
    setLeaving(true)
    onReveal()
  }

  useEffect(() => {
    // trava a rolagem enquanto a abertura está na tela
    const html = document.documentElement
    const previous = html.style.overflow
    const previousBody = document.body.style.overflow
    html.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    // a abertura termina no hero: começa sempre do topo
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    const unsubscribe = progress.on('change', (v) => setCount(Math.round(v * 100)))
    const controls = animate(progress, 1, {
      duration: reduce ? 0.4 : DURATION,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => window.setTimeout(leave, reduce ? 0 : 350),
    })
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') leave()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      controls.stop()
      unsubscribe()
      window.removeEventListener('keydown', onKey)
      html.style.overflow = previous
      document.body.style.overflow = previousBody
    }
  }, [])

  const linesShown = Math.min(LINES.length, Math.floor((count / 100) * (LINES.length + 0.6)))

  return (
    <motion.div
      role="dialog"
      aria-label="Abertura do site"
      className="fixed inset-0 z-[100] flex touch-none items-center justify-center overflow-hidden overscroll-none bg-[#0a0a0a] text-[#aff21a]"
      initial={{ y: 0 }}
      animate={leaving ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: reduce ? 0.3 : 0.95, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (leaving) {
          document.documentElement.style.overflow = ''
          document.body.style.overflow = ''
          onFinish()
        }
      }}
      onClick={leave}
    >
      {/* grade de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgb(175 242 26 / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(175 242 26 / 0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* rosto */}
      <motion.div
        aria-hidden="true"
        className="relative h-[62vh] max-h-[640px] [height:62svh]"
        style={{ scale }}
        animate={leaving ? { scale: 1.15, opacity: 0 } : undefined}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="absolute left-1/2 top-[42%] aspect-square w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            opacity: glow,
            background: 'radial-gradient(circle, rgb(166 104 255 / 0.55) 0%, rgb(166 104 255 / 0.15) 40%, transparent 68%)',
          }}
        />
        <motion.img
          src={portrait}
          alt=""
          className="relative h-full w-auto max-w-none select-none"
          style={{ clipPath: clip, filter }}
          draggable={false}
        />
        {/* linhas de holograma por cima do rosto, somem no fim */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: holoOpacity,
            clipPath: clip,
            backgroundImage: 'repeating-linear-gradient(0deg, rgb(175 242 26 / 0.35) 0 1px, transparent 1px 4px)',
            mixBlendMode: 'screen',
            WebkitMaskImage: `url(${portrait})`,
            maskImage: `url(${portrait})`,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
          }}
        />
        {/* linha de varredura */}
        <motion.div
          className="pointer-events-none absolute -inset-x-[15%] h-[2px] bg-[#aff21a]"
          style={{ top: scanTop, opacity: scanOpacity, boxShadow: '0 0 18px 4px rgb(175 242 26 / 0.7)' }}
        />
      </motion.div>

      {/* terminal */}
      <div className="pointer-events-none absolute bottom-8 left-6 font-mono text-[0.7rem] leading-relaxed sm:bottom-10 sm:left-10 sm:text-sm">
        {LINES.slice(0, linesShown).map((line, i) => (
          <p key={line} className={i === 0 ? 'text-[#a668ff]' : 'text-[#aff21a]/85'}>
            {line}
            {i === linesShown - 1 && !leaving ? <span className="intro-caret">_</span> : null}
          </p>
        ))}
      </div>

      {/* contador */}
      <div className="pointer-events-none absolute right-6 top-6 text-right sm:right-10 sm:top-8">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#aff21a]/60 sm:text-xs">carregando</p>
        <p className="font-black leading-none tabular-nums" style={{ fontSize: 'clamp(3rem, 9vw, 120px)' }}>
          {String(count).padStart(3, '0')}
          <span className="text-[#a668ff]">%</span>
        </p>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          leave()
        }}
        className="absolute bottom-8 right-6 min-h-11 px-2 font-mono text-xs uppercase tracking-[0.25em] text-[#aff21a]/70 underline-offset-4 hover:text-[#aff21a] hover:underline sm:bottom-10 sm:right-10"
      >
        Pular
      </button>
    </motion.div>
  )
}
