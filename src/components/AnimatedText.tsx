import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Fragment, useRef } from 'react'

type AnimatedTextProps = {
  text: string
  className?: string
}

export function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })
  const characters = Array.from(text)
  const words = text.split(' ')
  let cursor = 0

  return (
    <p
      ref={ref}
      aria-label={text}
      className={className}
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      <span aria-hidden="true">
      {words.map((word, wordIndex) => {
        const start = cursor
        cursor += word.length + 1
        return (
          <Fragment key={`${word}-${wordIndex}`}>
          <span className="inline-block">
            {Array.from(word).map((character, offset) => (
              <Char
                key={`${character}-${start + offset}`}
                progress={scrollYProgress}
                index={start + offset}
                total={characters.length}
                character={character}
              />
            ))}
          </span>
          {wordIndex < words.length - 1 ? ' ' : null}
          </Fragment>
        )
      })}
      </span>
    </p>
  )
}

function Char({
  progress,
  index,
  total,
  character,
}: {
  progress: MotionValue<number>
  index: number
  total: number
  character: string
}) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(progress, [start, end], [0, 1])
  const shown = character

  return (
    <span className="relative inline-block">
      <span aria-hidden="true" data-placeholder="" className="text-accent-2">
        {shown}
      </span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {shown}
      </motion.span>
    </span>
  )
}
