import { createContext, useContext } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  return (
    <LanguageContext.Provider value={{ lang: 'en' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
