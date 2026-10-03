import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './theme.js'

const THEME_STORAGE_KEY = 'theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') {
      return saved
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme)

  // Apply theme to document and sync meta tag
  const applyTheme = useCallback((nextTheme) => {
    document.documentElement.setAttribute('data-theme', nextTheme)
    let meta = document.querySelector('meta[name="color-scheme"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'color-scheme'
      document.head.appendChild(meta)
    }
    meta.content = nextTheme
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  // Listen to OS preference changes if the user hasn't set an explicit override
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      const saved = localStorage.getItem(THEME_STORAGE_KEY)
      if (!saved) {
        setThemeState(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const setTheme = useCallback((next) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Ignore localStorage errors (e.g. private browsing restrictions)
    }
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme,
      setTheme,
    }),
    [theme, toggleTheme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
