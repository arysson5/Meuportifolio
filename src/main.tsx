import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Intro } from './components/Intro'
import { IntroReadyContext } from './context/intro'
import './index.css'

const SEEN_KEY = 'arysson-intro-vista'

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

// A abertura aparece uma vez por sessão; recarregar a página na mesma aba não repete.
function Root() {
  const [showIntro, setShowIntro] = useState(() => !alreadySeen())
  const [ready, setReady] = useState(() => alreadySeen())

  return (
    <IntroReadyContext.Provider value={ready}>
      <App />
      {showIntro ? (
        <Intro
          onReveal={() => {
            setReady(true)
            try {
              sessionStorage.setItem(SEEN_KEY, '1')
            } catch {
              /* sem sessionStorage: a abertura volta na próxima visita */
            }
          }}
          onFinish={() => setShowIntro(false)}
        />
      ) : null}
    </IntroReadyContext.Provider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
