import casa from '@assets/casa.jpg'
import hannover from '@assets/hannover.jpg'
import hannoverMobile from '@assets/hannover-m.jpg'
import intelligence from '@assets/intelligence.jpg'
import intelligenceMobile from '@assets/intelligence-m.jpg'
import iza from '@assets/iza.jpg'
import izaMobile from '@assets/iza-m.jpg'
import virada from '@assets/virada.jpg'
import viradaMobile from '@assets/virada-m.jpg'

export type MarqueeTile = {
  src: string
  alt: string
  fit: 'cover' | 'contain'
}

export const marqueeRowA: MarqueeTile[] = [
  { src: hannover, alt: '', fit: 'cover' },
  { src: virada, alt: '', fit: 'cover' },
  { src: intelligence, alt: '', fit: 'cover' },
  { src: iza, alt: '', fit: 'cover' },
]

export const marqueeRowB: MarqueeTile[] = [
  { src: hannoverMobile, alt: '', fit: 'cover' },
  { src: viradaMobile, alt: '', fit: 'cover' },
  { src: intelligenceMobile, alt: '', fit: 'cover' },
  { src: izaMobile, alt: '', fit: 'cover' },
  { src: casa, alt: '', fit: 'cover' },
]
