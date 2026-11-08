import hannover from '@assets/hannover.jpg'
import hannoverMobile from '@assets/hannover-m.jpg'

export type ProjectImage = {
  src: string
  alt: string
}

export type Project = {
  number: string
  name: string
  category: string
  liveUrl?: string
  codeUrl?: string
  images: {
    leftTop: ProjectImage
    leftBottom: ProjectImage
    right: ProjectImage
  }
}

const homeAlt =
  'Home da Hannover Store com o banner principal da loja.'

export const projects: Project[] = [
  {
    number: '01',
    name: 'Hannover Store',
    category: 'Cliente',
    liveUrl: 'https://hannover-store.vercel.app',
    codeUrl: 'https://github.com/arysson5/HannoverStore',
    images: {
      leftTop: { src: hannover, alt: homeAlt },
      leftBottom: {
        src: hannoverMobile,
        alt: 'Home da Hannover Store no celular, com o banner principal da loja.',
      },
      right: { src: hannover, alt: homeAlt },
    },
  },
]
