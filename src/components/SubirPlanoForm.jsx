"use client"

import { useState } from "react"

// Definir el tipo de props con TypeScript
/**
 * @typedef {Object} Usuario
 * @property {number} id - ID del usuario
 * @property {string} nombre - Nombre del usuario
 * @property {string} tipo - Tipo de usuario
 * @property {string} email - Email del usuario
 * @property {string} [empresa] - Empresa del usuario (opcional)
 * @property {string} [telefono] - Teléfono del usuario (opcional)
 */

/**
 * @param {Object} props
 * @param {Usuario[]} props.usuarios - Lista de usuarios
 */
export default function SubirPlanoForm({ usuarios = [] }) {
  const [nombre, setNombre] = useState("")
  const [tipo, setTipo] = useState("Arquitectónico")
  const [cliente, setCliente] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [archivo, setArchivo] = useState(null)
  const [fileName, setFileName] = useState("")
  const [fileSize, setFileSize] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setArchivo(file)
      setFileName(file.name)
      setFileSize(formatFileSize(file.size))
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // Validar que se hayan completado todos los campos
      if (!nombre || !tipo || !cliente || !archivo) {
        setError("Por favor, complete todos los campos requeridos.")
        setIsLoading(false)
        return
      }

      // Validar que el archivo sea un PDF
      if (archivo.type !== "application/pdf") {
        setError("El archivo debe ser un PDF.")
        setIsLoading(false)
        return
      }

      const formData = new FormData()
      formData.append("nombre", nombre)
      formData.append("tipo", tipo)
      formData.append("cliente", cliente)
      formData.append("descripcion", descripcion)
      formData.append("archivo", archivo)

      const response = await fetch("/api/subir-plano", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess("Plano subido correctamente.")
        // Limpiar el formulario
        setNombre("")
        setTipo("Arquitectónico")
        setCliente("")
        setDescripcion("")
        setArchivo(null)
        setFileName("")
        setFileSize("")
        // Limpiar el input de archivo
        document.getElementById("archivo").value = ""
      } else {
        setError(`Error al subir el plano: ${data.error || "Ocurrió un error desconocido"}`)

        // Si hay una URL de configuración, mostrar un enlace
        if (data.setupUrl) {
          setError(
            `${data.error} <a href="${data.setupUrl}" class="text-primary hover:underline">Configurar base de datos</a>`,
          )
        }
      }
    } catch (error) {
      console.error("Error al subir el plano:", error)
      setError("Error al procesar la solicitud. Por favor, inténtelo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div
          className="bg-destructive/15 text-destructive p-4 rounded-md"
          dangerouslySetInnerHTML={{ __html: error }}
        ></div>
      )}
      {success && <div className="bg-green-100 text-green-800 p-4 rounded-md">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="nombre"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Nombre del Plano *
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="tipo"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Tipo de Plano *
          </label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="Arquitectónico">Arquitectónico</option>
            <option value="Estructural">Estructural</option>
            <option value="Eléctrico">Eléctrico</option>
            <option value="Hidráulico">Hidráulico</option>
            <option value="Sanitario">Sanitario</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="cliente"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Cliente *
          </label>
          <select
            id="cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Seleccione un cliente</option>
            {usuarios.length === 0 ? (
              <option value="" disabled>
                No hay clientes disponibles
              </option>
            ) : (
              usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nombre} (ID: {usuario.id})
                </option>
              ))
            )}
          </select>
          {usuarios.length === 0 && (
            <p className="text-xs text-red-500 mt-1">No se encontraron clientes. Verifique la base de datos.</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="archivo"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Archivo PDF *
          </label>
          <div className="flex flex-col gap-2">
            <input
              type="file"
              id="archivo"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              className="hidden"
            />
            <div className="flex items-center gap-2">
              <label
                htmlFor="archivo"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
              >
                Seleccionar archivo
              </label>
              {fileName && (
                <span className="text-sm text-muted-foreground">
                  {fileName} ({fileSize})
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="descripcion"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Descripción
        </label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows="4"
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        ></textarea>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Subiendo...
            </>
          ) : (
            "Subir Plano"
          )}
        </button>
      </div>
    </form>
  )
}

