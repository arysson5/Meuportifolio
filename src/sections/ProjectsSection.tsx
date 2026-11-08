import { SectionTitle } from '../components/SectionTitle'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { LinkButton, LiveProjectButton } from '../components/LiveProjectButton'
import { projects, type Project } from '../data/projects'

export function ProjectsSection() {
  return (
    <section
      id="projeto"
      className="relative -mt-10 rounded-t-[40px] bg-grid px-5 pb-24 pt-16 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-24"
    >
      <SectionTitle
            text={'Projeto'}
            className="hero-heading mb-12 text-center font-black uppercase leading-none tracking-tight sm:mb-16"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          />
      <div className="mx-auto max-w-6xl">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} total={projects.length} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div ref={ref} className="md:h-[85vh]">
      <motion.article
        style={{ scale, top: `calc(6rem + ${index * 28}px)` }}
        className="theme-dark sticky rounded-[40px] border-2 border-[#0a0a0a] bg-canvas p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-8">
            <span className="font-black leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
              {project.number}
            </span>
            <div className="pb-2">
              <p className="font-mono text-sm uppercase tracking-widest text-accent-2">{project.category}</p>
              <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                {project.name}
              </h3>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.liveUrl ? <LiveProjectButton href={project.liveUrl} /> : null}
            {project.codeUrl ? (
              <LinkButton href={project.codeUrl}>Ver o código da loja</LinkButton>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 md:mt-8 md:flex-row">
          <div className="flex w-full flex-col gap-3 md:w-[40%]">
            <ProjectImage image={project.images.leftTop} height="clamp(130px, 16vw, 230px)" />
            <ProjectImage image={project.images.leftBottom} height="clamp(160px, 22vw, 340px)" />
          </div>
          <div className="w-full md:w-[60%]">
            <img
              src={project.images.right.src}
              alt={project.images.right.alt}
              loading="lazy"
              className="h-[240px] w-full rounded-[40px] object-cover sm:h-[320px] sm:rounded-[50px] md:h-full md:min-h-full md:rounded-[60px]"
            />
          </div>
        </div>
      </motion.article>
    </div>
  )
}

function ProjectImage({
  image,
  height,
}: {
  image: Project['images']['leftTop']
  height: string
}) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      loading="lazy"
      style={{ height }}
      className="w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
    />
  )
}
