"use client"
import { SnackbarProvider } from "notistack"
import { ReactNode } from "react"

interface SnackbarProviderWrapperProps {
    children?:ReactNode
}

function SnackbarProviderWrapper({children}: SnackbarProviderWrapperProps) {
  return (
    <SnackbarProvider >
        {children}
    </SnackbarProvider>
  )
}

export default SnackbarProviderWrapper