import { describe, expect, it } from 'vitest'
import { projects } from './projects'

describe('projetos', () => {
  it('começa com um projeto ao vivo, a Hannover Store', () => {
    expect(projects).toHaveLength(1)
    expect(projects[0].name).toBe('Hannover Store')
    expect(projects[0].category).toBe('Cliente')
    expect(projects[0].number).toBe('01')
    expect(projects[0].liveUrl).toBe('https://hannover-store.vercel.app')
    expect(projects[0].codeUrl).toBe('https://github.com/arysson5/HannoverStore')
    expect(projects.filter((project) => project.liveUrl)).toHaveLength(1)
  })
})
