"use client"

import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'
import React from 'react'

function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createTheme({
    palette: { mode: isDarkMode ? "dark" : "light" },
  })

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default CustomThemeProvider