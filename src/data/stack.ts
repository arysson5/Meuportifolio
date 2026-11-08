import { siDocker, siJavascript, siMysql, siPhp, siPostgresql, siPython, siReact, siVite } from 'simple-icons'

export type StackItem = {
  name: string
  /** Caminho SVG (viewBox 0 0 24 24) do simple-icons. Sem path, usa o ícone de LLMs. */
  path?: string
  /** Cor oficial da marca, mostrada no hover. */
  color: string
}

// Ordem em que aparecem na faixa. Para acrescentar, importe o ícone do simple-icons e adicione aqui.
export const stack: StackItem[] = [
  { name: 'PHP', path: siPhp.path, color: `#${siPhp.hex}` },
  { name: 'JavaScript', path: siJavascript.path, color: `#${siJavascript.hex}` },
  { name: 'React', path: siReact.path, color: `#${siReact.hex}` },
  { name: 'Vite', path: siVite.path, color: `#${siVite.hex}` },
  { name: 'MySQL', path: siMysql.path, color: `#${siMysql.hex}` },
  { name: 'PostgreSQL', path: siPostgresql.path, color: `#${siPostgresql.hex}` },
  { name: 'Docker', path: siDocker.path, color: `#${siDocker.hex}` },
  { name: 'Python', path: siPython.path, color: `#${siPython.hex}` },
  { name: 'LLMs', color: '#a668ff' },
]
