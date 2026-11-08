import { createContext } from 'react'

// false enquanto a abertura está na tela. O padrão é true (testes e qualquer uso sem a abertura).
export const IntroReadyContext = createContext(true)
