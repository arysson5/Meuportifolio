import { describe, expect, it } from 'vitest'
import { aboutText, cases, heroLine, nav, whatsappUrl } from './site'

describe('conteúdo do site', () => {
  it('guarda a frase do topo, o sobre e o WhatsApp', () => {
    expect(heroLine).toBe('Back-end pleno. PHP, Laravel e Node. Mais de 4 anos na BGF. Disponível para remoto.')
    expect(aboutText).toContain('Tecnologia que todo mundo entende.')
    expect(`${aboutText} ${cases.map((c) => c.description).join(' ')}`).not.toMatch(/não|nunca|ainda/i)
    expect(aboutText).toContain('quem contrata entende o que ele faz.')
    expect(whatsappUrl).toBe('https://wa.me/?text=Oi%20Arysson%2C%20vi%20o%20portf%C3%B3lio%20e%20quero%20conversar.')
  })

  it('lista os cinco cases na ordem do site', () => {
    expect(cases.map((item) => item.name)).toEqual([
      'Hannover Store',
      'Chatbot da Briza',
      'Bgf-contracts',
      'Oráculo BGF',
      'Cara do produto',
    ])
    expect(cases[0].description).toContain('Hannovinho')
    expect(cases[0].description).toContain('Fastify')
  })

  it('aponta o menu para Sobre, Cases, Cara e Contato', () => {
    expect(nav.map((item) => item.label)).toEqual(['Sobre', 'Cases', 'Cara', 'Contato'])
    expect(nav.map((item) => item.href)).toEqual(['#sobre', '#cases', '#cara', '#contato'])
  })
})
