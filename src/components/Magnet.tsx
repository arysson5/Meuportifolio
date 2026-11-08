import { useEffect, useRef, useState, type ReactNode } from 'react'

type MagnetProps = {
  children: ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
}

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('translate3d(0,0,0)')
  const [transition, setTransition] = useState(inactiveTransition)

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const near =
        event.clientX > rect.left - padding &&
        event.clientX < rect.right + padding &&
        event.clientY > rect.top - padding &&
        event.clientY < rect.bottom + padding

      if (!near) {
        setTransition(inactiveTransition)
        setTransform('translate3d(0,0,0)')
        return
      }

      const dx = (event.clientX - centerX) / strength
      const dy = (event.clientY - centerY) / strength
      setTransition(activeTransition)
      setTransform(`translate3d(${dx}px, ${dy}px, 0)`)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [activeTransition, inactiveTransition, padding, strength])

  return (
    <div ref={ref} className={className} style={{ transform, transition, willChange: 'transform' }}>
      {children}
    </div>
  )
}
