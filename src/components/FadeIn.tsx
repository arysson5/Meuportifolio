import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, type ElementType, type ReactNode } from 'react'

type FadeInProps = {
  as?: ElementType
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
  children: ReactNode
}

export function FadeIn({
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  children,
}: FadeInProps) {
  const reduce = useReducedMotion()
  const Component = useMemo(() => motion.create(as), [as])

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Component>
  )
}
