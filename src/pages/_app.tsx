import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "@/components/layout/home"
import { createContext, useEffect, useState } from 'react'
import Head from 'next/head'

export const ThemeContext = createContext<any>(null)

const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState(false);

  function toggleTheme(){
    setTheme(!theme)
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark")
  }, [theme])

  return (
    <>
      <ThemeContext.Provider value={{toggleTheme, theme}}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
      </ThemeContext.Provider>
    </>
  )
}

export default App