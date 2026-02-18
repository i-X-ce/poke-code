"use client";

import { ZenKakuGothicNew } from "@/lib/util/fonts";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import React from "react";

function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createTheme({
    palette: { mode: isDarkMode ? "dark" : "light" },
    typography: {
      fontFamily: ZenKakuGothicNew.style.fontFamily,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {children}
      <CssBaseline />
    </ThemeProvider>
  );
}

export default CustomThemeProvider;
