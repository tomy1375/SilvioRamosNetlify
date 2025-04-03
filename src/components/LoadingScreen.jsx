"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Mostrar la pantalla de carga cuando se inicia la navegación
    const handleBeforeUnload = () => {
      setIsVisible(true)
    }

    // Ocultar la pantalla de carga cuando se completa la navegación
    const handleLoad = () => {
      setIsVisible(false)
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("load", handleLoad)

    // Limpiar los event listeners
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("load", handleLoad)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-lg font-medium text-foreground dark:text-white">Cargando...</p>
      </div>
    </div>
  )
}

