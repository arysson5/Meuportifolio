import { MetallicButton } from '@/components/ui/metallic-button'

type ContactButtonProps = {
  href: string
  label?: string
  className?: string
}

export function ContactButton({ href, label = 'Falar no WhatsApp', className = '' }: ContactButtonProps) {
  return <MetallicButton href={href} label={label} className={className} />
}
