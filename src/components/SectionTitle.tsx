import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion'
import { Fragment, useRef, type CSSProperties } from 'react'

type SectionTitleProps = {
  text: string
  className?: string
  style?: CSSProperties
  /** Quanto o título se desloca (px) enquanto a seção passa pela tela. 0 desliga o parallax. */
  parallax?: number
}

const word: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
}

/*
  Título de seção:
  - entrada: as letras sobem em sequência quando o título aparece;
  - parallax: o título anda um pouco mais devagar que a página;
  - cursor: a letra sob o cursor sobe e fica roxa, puxando as vizinhas (CSS .hover-title).
*/
export function SectionTitle({ text, className = '', style, parallax = 40 }: SectionTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [parallax, -parallax])

  const letter: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: '0.45em', rotate: 6 },
        show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }

  const words = text.split(' ')

  return (
    <motion.h2
      ref={ref}
      className={`hover-title ${className}`}
      style={{ ...style, y }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {words.map((w, wi) => (
        <Fragment key={`${w}-${wi}`}>
          <motion.span className="inline-block whitespace-nowrap" variants={word}>
            {Array.from(w).map((ch, ci) => (
              <motion.span key={`${ch}-${ci}`} className="inline-block" variants={letter}>
                <span className="hover-letter inline-block">{ch}</span>
              </motion.span>
            ))}
          </motion.span>
          {wi < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </motion.h2>
  )
}
