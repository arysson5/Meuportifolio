import { useEffect, useRef, useState } from 'react'
import { marqueeRowA, marqueeRowB, type MarqueeTile } from '../data/marquee'

export function MarqueeSection() {
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const update = () => {
      const el = ref.current
      if (!el || reduce) return
      const sectionTop = el.getBoundingClientRect().top + window.scrollY
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section
      ref={ref}
      aria-label="Prints dos trabalhos"
      className="overflow-hidden pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div className="flex flex-col gap-3">
        <Row tiles={marqueeRowA} offset={offset - 200} />
        <Row tiles={marqueeRowB} offset={-(offset - 200)} />
      </div>
    </section>
  )
}

function Row({ tiles, offset }: { tiles: MarqueeTile[]; offset: number }) {
  const loop = [...tiles, ...tiles, ...tiles]

  return (
    <div className="flex gap-3" style={{ transform: `translateX(${offset}px)`, willChange: 'transform' }}>
      {loop.map((tile, index) => (
        <img
          key={`${tile.src}-${index}`}
          src={tile.src}
          alt=""
          loading="lazy"
          className={`h-[148px] w-[230px] shrink-0 rounded-2xl sm:h-[200px] sm:w-[320px] md:h-[270px] md:w-[420px] ${
            tile.fit === 'contain' ? 'bg-surface object-contain p-6' : 'object-cover'
          }`}
        />
      ))}
    </div>
  )
}
