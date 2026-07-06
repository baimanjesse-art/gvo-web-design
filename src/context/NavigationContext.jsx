import { createContext, useContext, useState } from 'react'

const NavigationContext = createContext(null)

export function NavigationProvider({ children }) {
  const [active, setActive] = useState('home')

  const goTo = (section) => {
    setActive(section)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <NavigationContext.Provider value={{ active, goTo }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error('useNavigation must be used within a NavigationProvider')
  return ctx
}
