"use client"

import { useState, useEffect } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Detectar cambios en el tema de Astro
  useEffect(() => {
    // Función para verificar el tema actual
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark")
      setIsDarkMode(isDark)

      // Forzar actualización de estilos
      const boxes = document.querySelectorAll(".theme-box")
      boxes.forEach((box) => {
        if (isDark) {
          box.style.backgroundColor = "rgb(30, 41, 59)" // slate-800
        } else {
          box.style.backgroundColor = "white"
        }
      })

      // Actualizar estilos de texto
      const textElements = document.querySelectorAll(".theme-text")
      textElements.forEach((el) => {
        if (isDark) {
          el.style.color = "rgb(229, 231, 235)" // gray-200
        } else {
          el.style.color = "rgb(31, 41, 55)" // gray-800
        }
      })

      const subtextElements = document.querySelectorAll(".theme-subtext")
      subtextElements.forEach((el) => {
        if (isDark) {
          el.style.color = "rgb(209, 213, 219)" // gray-300
        } else {
          el.style.color = "rgb(55, 65, 81)" // gray-700
        }
      })
    }

    // Verificar el tema inicial
    checkTheme()

    // Crear un observador para detectar cambios en la clase 'dark'
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkTheme()
        }
      })
    })

    // Iniciar la observación del elemento html
    observer.observe(document.documentElement, { attributes: true })

    // Limpiar el observador cuando el componente se desmonte
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "47fe8f90-f3f8-4f25-9050-87f4a0c96210",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitMessage("¡Mensaje enviado! Nos pondremos en contacto pronto.")
        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        setSubmitMessage("Hubo un error al enviar el mensaje. Por favor, intente nuevamente.")
      }
    } catch (error) {
      console.error("Error:", error)
      setSubmitMessage("Hubo un error al enviar el mensaje. Por favor, intente nuevamente.")
    } finally {
      setIsSubmitting(false)

      // Clear success/error message after 5 seconds
      setTimeout(() => {
        setSubmitMessage("")
      }, 5000)
    }
  }

  // Estilos inline para forzar los colores
  const boxStyle = {
    backgroundColor: isDarkMode ? "rgb(30, 41, 59)" : "white",
    color: isDarkMode ? "white" : "black",
    transition: "background-color 0.3s, color 0.3s",
  }

  const titleStyle = {
    color: isDarkMode ? "white" : "rgb(17, 24, 39)", // gray-900 en modo claro
    fontWeight: "bold",
    transition: "color 0.3s",
  }

  const textStyle = {
    color: isDarkMode ? "rgb(229, 231, 235)" : "rgb(31, 41, 55)", // gray-200 en oscuro, gray-800 en claro
    transition: "color 0.3s",
  }

  const subtextStyle = {
    color: isDarkMode ? "rgb(209, 213, 219)" : "rgb(55, 65, 81)", // gray-300 en oscuro, gray-700 en claro
    transition: "color 0.3s",
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4" style={titleStyle}>
          Contacto
        </h1>
        <p className="text-lg" style={subtextStyle}>
          Estamos listos para ayudarte con tu próximo proyecto de ingeniería civil
        </p>
      </div>

      <div className="flex flex-wrap gap-8 mb-12">
        <div className="flex-1 min-w-[300px] p-8 rounded-lg shadow-md theme-box" style={boxStyle}>
          <h2 className="text-2xl font-bold mb-6" style={titleStyle}>
            Información de Contacto
          </h2>

          <div className="flex mb-6">
            <div className="mr-4 text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 w-10 h-10 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1 theme-text" style={textStyle}>
                Teléfono
              </h3>
              <p className="theme-subtext" style={subtextStyle}>
                +54 388 123 4567
              </p>
            </div>
          </div>

          <div className="flex mb-6">
            <div className="mr-4 text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 w-10 h-10 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1 theme-text" style={textStyle}>
                Email
              </h3>
              <p className="theme-subtext" style={subtextStyle}>
                contacto@ingenieriacivil.com
              </p>
            </div>
          </div>

          <div className="flex mb-6">
            <div className="mr-4 text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 w-10 h-10 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1 theme-text" style={textStyle}>
                Dirección
              </h3>
              <p className="theme-subtext" style={subtextStyle}>
                Remedios de Escalada 193
                <br />
                Y4600 San Salvador de Jujuy, Jujuy
              </p>
            </div>
          </div>

          <div className="flex mb-6">
            <div className="mr-4 text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 w-10 h-10 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1 theme-text" style={textStyle}>
                Horario
              </h3>
              <p className="theme-subtext" style={subtextStyle}>
                Lunes - Viernes: 9:00 - 18:00
                <br />
                Sábado: 10:00 - 14:00
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <a
              href="#"
              className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center transition-all hover:bg-blue-600 hover:-translate-y-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center transition-all hover:bg-blue-600 hover:-translate-y-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center transition-all hover:bg-blue-600 hover:-translate-y-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>

        <div className="flex-[2] min-w-[300px] p-8 rounded-lg shadow-md theme-box" style={boxStyle}>
          <h2 className="text-2xl font-bold mb-6" style={titleStyle}>
            Envíanos un Mensaje
          </h2>

          {submitMessage && (
            <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 p-4 rounded-md mb-6 text-center">
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="access_key" value="47fe8f90-f3f8-4f25-9050-87f4a0c96210" />
            <input type="hidden" name="subject" value={formData.subject || "Nuevo mensaje de contacto"} />
            <input type="hidden" name="from_name" value="Formulario de Contacto" />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 font-medium theme-text" style={textStyle}>
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                style={{
                  backgroundColor: isDarkMode ? "rgb(51, 65, 85)" : "white",
                  color: isDarkMode ? "white" : "rgb(31, 41, 55)",
                }}
              />
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="email" className="block mb-2 font-medium theme-text" style={textStyle}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  style={{
                    backgroundColor: isDarkMode ? "rgb(51, 65, 85)" : "white",
                    color: isDarkMode ? "white" : "rgb(31, 41, 55)",
                  }}
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <label htmlFor="phone" className="block mb-2 font-medium theme-text" style={textStyle}>
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  style={{
                    backgroundColor: isDarkMode ? "rgb(51, 65, 85)" : "white",
                    color: isDarkMode ? "white" : "rgb(31, 41, 55)",
                  }}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block mb-2 font-medium theme-text" style={textStyle}>
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                style={{
                  backgroundColor: isDarkMode ? "rgb(51, 65, 85)" : "white",
                  color: isDarkMode ? "white" : "rgb(31, 41, 55)",
                }}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 font-medium theme-text" style={textStyle}>
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                style={{
                  backgroundColor: isDarkMode ? "rgb(51, 65, 85)" : "white",
                  color: isDarkMode ? "white" : "rgb(31, 41, 55)",
                }}
              ></textarea>
            </div>

            <div className="mb-6" style={{ display: "none" }}>
              <label htmlFor="botcheck" className="block mb-2 font-medium theme-text" style={textStyle}>
                No llenar si eres humano
              </label>
              <input
                type="text"
                id="botcheck"
                name="botcheck"
                onChange={handleChange}
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-md font-semibold text-white transition-colors ${
                isSubmitting
                  ? "bg-gray-500 dark:bg-gray-600 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center" style={titleStyle}>
          Nuestra Ubicación
        </h2>
        <div className="rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467.0304553374726!2d-65.31090980000001!3d-24.177588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941b0f135d53d4ab%3A0x2c760e0263ce334a!2sRemedios%20de%20Escalada%20193%2C%20Y4600%20San%20Salvador%20de%20Jujuy%2C%20Jujuy!5e0!3m2!1ses!2sar!4v1711644405000!5m2!1ses!2sar"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="dark:opacity-90"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

