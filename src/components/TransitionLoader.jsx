"use client"

import { useEffect, useState } from "react"

export default function TransitionLoader() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    // Función para detectar la acción y mostrar el mensaje correspondiente
    const detectAction = () => {
      const action = sessionStorage.getItem("navigationAction")
      const target = sessionStorage.getItem("navigationTarget") || ""

      // Verificar si estamos navegando dentro del panel de administración
      const isAdminNavigation = target.startsWith("/admin")

      if (action === "login") {
        setMessage("Iniciando sesión...")
        setShowLoader(true)
      } else if (action === "logout") {
        setMessage("Cerrando sesión...")
        setShowLoader(true)
      } else if (isAdminNavigation) {
        // Para navegación dentro del panel de administración
        setMessage("Cargando...")
        setShowLoader(true)
      } else {
        // Para navegación normal, no mostrar nada específico
        setMessage("Cargando...")
        setShowLoader(false) // No mostrar el loader para navegación normal
      }
    }

    // Modificar la función showLoader para asegurarnos de que el mensaje se establezca correctamente
    const handleShowLoader = (e) => {
      if (e.detail && e.detail.message) {
        setMessage(e.detail.message)
        setShowLoader(true)
      } else {
        detectAction()
      }
      setIsLoading(true)
    }

    // Función para ocultar el loader
    const hideLoader = () => {
      setIsLoading(false)
    }

    // Evento personalizado para mostrar el loader
    document.addEventListener("showLoader", handleShowLoader)

    // Evento personalizado para ocultar el loader
    document.addEventListener("hideLoader", hideLoader)

    // Eventos de Astro para transiciones de página
    document.addEventListener("astro:before-preparation", handleShowLoader)
    document.addEventListener("astro:after-preparation", hideLoader)
    document.addEventListener("astro:before-swap", handleShowLoader)
    document.addEventListener("astro:after-swap", hideLoader)

    // Cuando la página termina de cargar completamente
    document.addEventListener("astro:page-load", () => {
      hideLoader()

      // Verificar la ruta actual para limpiar estados específicos
      const currentPath = window.location.pathname

      // Si estamos en la página de login después de un logout, limpiar el estado
      if (currentPath === "/login") {
        const action = sessionStorage.getItem("navigationAction")
        if (action === "logout") {
          console.log("Limpiando estado de logout en página de login")
          setTimeout(() => {
            sessionStorage.removeItem("navigationAction")
            sessionStorage.removeItem("navigationTarget")
          }, 500)
        }
      }

      // Si estamos en cualquier página que no sea admin o login, limpiar cualquier estado de navegación
      if (!currentPath.startsWith("/admin") && currentPath !== "/login") {
        sessionStorage.removeItem("navigationAction")
        sessionStorage.removeItem("navigationTarget")
      }
    })

    // Guardar la ruta de destino cuando se hace clic en un enlace
    const handleLinkClick = (e) => {
      if (e.target.closest("a") && e.target.closest("a").href) {
        try {
          const linkElement = e.target.closest("a")
          const url = new URL(linkElement.href)

          // No establecer navigationTarget para enlaces internos del mismo sitio
          if (url.origin === window.location.origin) {
            sessionStorage.setItem("navigationTarget", url.pathname)

            // Si no es un enlace de logout o login específico, y no estamos navegando al panel de admin,
            // limpiar cualquier acción anterior
            if (!linkElement.id.includes("logout") && !url.pathname.startsWith("/admin") && url.pathname !== "/login") {
              sessionStorage.removeItem("navigationAction")
            }
          }
        } catch (error) {
          console.error("Error al procesar URL:", error)
        }
      }
    }

    // Evento para capturar clics en enlaces - usar event delegation para capturar todos los clics
    document.addEventListener("click", handleLinkClick, true)

    // Eliminar el mensaje "redirieigiendo" que aparece en una esquina
    const removeRedirectingMessage = () => {
      const redirectElements = document.querySelectorAll("*")
      redirectElements.forEach((el) => {
        if (
          el.childNodes.length === 1 &&
          el.childNodes[0].nodeType === Node.TEXT_NODE &&
          el.textContent.trim() === "redirieigiendo"
        ) {
          el.style.display = "none"
        }
      })
    }

    // Ejecutar al montar el componente y en cada cambio de página
    removeRedirectingMessage()
    document.addEventListener("astro:page-load", removeRedirectingMessage)

    return () => {
      // Limpiar los event listeners
      document.removeEventListener("showLoader", handleShowLoader)
      document.removeEventListener("hideLoader", hideLoader)
      document.removeEventListener("astro:before-preparation", handleShowLoader)
      document.removeEventListener("astro:after-preparation", hideLoader)
      document.removeEventListener("astro:before-swap", handleShowLoader)
      document.removeEventListener("astro:after-swap", hideLoader)
      document.removeEventListener("astro:page-load", hideLoader)
      document.removeEventListener("click", handleLinkClick, true)
      document.removeEventListener("astro:page-load", removeRedirectingMessage)
    }
  }, [])

  // No mostrar nada si no hay mensaje o no se debe mostrar el loader
  if (!isLoading || !showLoader || !message) return null

  // Usar un fondo oscuro para todas las acciones
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-90">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-lg font-medium text-white">{message}</p>
      </div>
    </div>
  )
}

