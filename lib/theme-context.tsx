'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface ThemeContextValue {
  imageIndex: number
  setImageIndex: (index: number) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [imageIndex, setImageIndex] = useState(0)

  return (
    <ThemeContext.Provider value={{ imageIndex, setImageIndex }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
