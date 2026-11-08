import type { ReactNode } from 'react'
import { MetallicButton } from '@/components/ui/metallic-button'

type LinkButtonProps = {
  href: string
  children: ReactNode
  className?: string
  block?: boolean
}

// Link com o mesmo botão de metal líquido do resto do site.
export function LinkButton({ href, children, className, block }: LinkButtonProps) {
  return (
    <MetallicButton href={href} className={className} block={block}>
      {children}
    </MetallicButton>
  )
}

export function LiveProjectButton({ href }: { href: string }) {
  return <LinkButton href={href}>Live Project</LinkButton>
}
