import { Pause, Play } from 'lucide-react'
import { useRef, useState } from 'react'
import intelligencePoster from '@assets/intelligence-m.jpg'
import intelligenceVideo from '@assets/intelligence.mp4'
import izaPoster from '@assets/iza-m.jpg'
import izaVideo from '@assets/iza.mp4'
import viradaPoster from '@assets/virada-m.jpg'
import viradaVideo from '@assets/virada.mp4'
import { FadeIn } from '../components/FadeIn'
import { SectionTitle } from '../components/SectionTitle'
import { LinkButton } from '../components/LiveProjectButton'
import { MetallicButton } from '@/components/ui/metallic-button'
import { face } from '../data/site'

const reels = [
  {
    name: 'Virada',
    tag: 'landing',
    href: 'https://arysson5.github.io/virada-extraordinaria-lp/',
    poster: viradaPoster,
    video: viradaVideo,
    alt: 'Landing do evento Virada Extraordinária no celular.',
    playLabel: 'Ver a Virada passando',
  },
  {
    name: 'Intelligence',
    tag: 'contabilidade',
    href: 'https://arysson5.github.io/intelligencecontabilidadelp/',
    poster: intelligencePoster,
    video: intelligenceVideo,
    alt: 'Site da Intelligence Contabilidade no celular.',
    playLabel: 'Ver a Intelligence passando',
  },
  {
    name: 'Convites',
    tag: 'Iza',
    href: 'https://izainvite.vercel.app',
    poster: izaPoster,
    video: izaVideo,
    alt: 'Convite XV da Iza no celular.',
    playLabel: 'Ver o convite da Iza passando',
  },
]

export function CaraSection() {
  return (
    <section id="cara" className="theme-dark bg-grid px-5 py-20 sm:px-8 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle
            text={face.title}
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 80px)' }}
          />
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {reels.map((reel, index) => (
            <FadeIn key={reel.name} delay={index * 0.12} y={60}>
              <Reel reel={reel} />
            </FadeIn>
          ))}
        </div>
        <p className="mt-10">
          <LinkButton href={face.moreHref}>{face.moreLabel}</LinkButton>
        </p>
      </div>
    </section>
  )
}

function Reel({ reel }: { reel: (typeof reels)[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  function toggle() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play()
      setPlaying(true)
      return
    }
    video.pause()
    setPlaying(false)
  }

  return (
    <article>
      <div className="relative overflow-hidden rounded-[32px] bg-black">
        <img src={reel.poster} alt={reel.alt} className={`aspect-[9/16] w-full object-cover ${playing ? 'opacity-0' : 'opacity-100'}`} />
        <video
          ref={videoRef}
          src={reel.video}
          poster={reel.poster}
          playsInline
          muted
          loop
          preload="none"
          className={`absolute inset-0 h-full w-full object-cover ${playing ? 'opacity-100' : 'opacity-0'}`}
        />
        <PlayButton pressed={playing} label={reel.playLabel} onToggle={toggle} />
      </div>
      <LinkButton href={reel.href} className="mt-4">
        {reel.name}{' '}
        <span className="font-light opacity-70">{reel.tag}</span>
      </LinkButton>
    </article>
  )
}

function PlayButton({
  pressed,
  label,
  onToggle,
}: {
  pressed: boolean
  label: string
  onToggle: () => void
}) {
  return (
    <div className="absolute bottom-4 right-4 z-10">
      <MetallicButton
        onClick={onToggle}
        viewMode="icon"
        label={label}
        ariaPressed={pressed}
        icon={pressed ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
      />
    </div>
  )
}
