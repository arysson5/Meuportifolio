import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

function body() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement
      if (parent?.closest('[data-placeholder]')) return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    },
  })
  let text = ''
  while (walker.nextNode()) text += walker.currentNode.textContent
  return text
}

describe('página', () => {
  it('mostra as seções que já existem e um único Live Project', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: /arysson/i })).toBeInTheDocument()
    expect(body()).toContain('Back-end pleno. PHP, Laravel e Node. Mais de 4 anos na BGF. Disponível para remoto.')
    expect(body()).toContain('Tecnologia que todo mundo entende.')
    expect(body()).toContain('Chatbot da Briza')
    expect(body()).toContain('O atendimento do estúdio no piloto automático')
    expect(body()).toContain('Bgf-contracts')
    expect(body()).toContain('Oráculo BGF')
    expect(body()).toContain('Também faço a cara do produto.')
    expect(body()).toContain('Se o sistema precisa existir de verdade, me chama.')

    const live = screen.getAllByRole('link', { name: /live project/i })
    expect(live).toHaveLength(1)
    expect(live[0]).toHaveAttribute('href', 'https://hannover-store.vercel.app')

    expect(screen.getByRole('link', { name: /ver o código da loja/i })).toHaveAttribute(
      'href',
      'https://github.com/arysson5/HannoverStore',
    )
    expect(screen.getAllByRole('link', { name: /falar no whatsapp/i }).length).toBeGreaterThanOrEqual(3)
    expect(screen.getByRole('link', { name: /^virada/i })).toHaveAttribute(
      'href',
      'https://arysson5.github.io/virada-extraordinaria-lp/',
    )
    expect(screen.getByRole('link', { name: /^intelligence/i })).toHaveAttribute(
      'href',
      'https://arysson5.github.io/intelligencecontabilidadelp/',
    )
    expect(screen.getByRole('link', { name: /^convites/i })).toHaveAttribute('href', 'https://izainvite.vercel.app')
  })

  it('abre as quatro âncoras a partir do botão de menu', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /abrir menu/i })
    expect(button.className).toContain('min-h-11')

    fireEvent.click(button)
    const menu = screen.getByRole('navigation', { name: 'Menu' })
    expect(within(menu).getByRole('link', { name: 'Sobre' })).toHaveAttribute('href', '#sobre')
    expect(within(menu).getByRole('link', { name: 'Cases' })).toHaveAttribute('href', '#cases')
    expect(within(menu).getByRole('link', { name: 'Cara' })).toHaveAttribute('href', '#cara')
    expect(within(menu).getByRole('link', { name: 'Contato' })).toHaveAttribute('href', '#contato')
  })
})
