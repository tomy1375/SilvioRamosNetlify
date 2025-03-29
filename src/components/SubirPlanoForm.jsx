"use client"

import { useState } from "react"
import { useRef } from "react"

export default function SubirPlanoForm() {
  const [nombre, setNombre] = useState("")
  const [tipo, setTipo] = useState("")
  const [cliente, setCliente] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [archivo, setArchivo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const fileInputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // Validar que se haya seleccionado un archivo
      if (!archivo) {
        throw new Error("Debe seleccionar un archivo PDF")
      }

      // Validar que sea un PDF
      if (archivo.type !== "application/pdf") {
        throw new Error("El archivo debe ser un PDF")
      }

      // Crear un FormData para enviar el archivo
      const formData = new FormData()
      formData.append("nombre", nombre)
      formData.append("tipo", tipo)
      formData.append("cliente", cliente)
      formData.append("descripcion", descripcion)
      formData.append("archivo", archivo)

      // Enviar el archivo al servidor
      const response = await fetch("/api/subir-plano", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Error al subir el plano")
      }

      // Mostrar mensaje de éxito
      setSuccess("Plano subido correctamente")

      // Limpiar el formulario
      setNombre("")
      setTipo("")
      setCliente("")
      setDescripcion("")
      setArchivo(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      // Redirigir después de 2 segundos
      setTimeout(() => {
        window.location.href = "/admin/planos"
      }, 2000)
    } catch (err) {
      setError(err.message || "Error al subir el plano. Por favor, inténtelo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>}
      {success && <div className="bg-green-100 text-green-800 text-sm p-3 rounded-md">{success}</div>}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="nombre"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Nombre del Plano
          </label>
          <input
            id="nombre"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Ej: Plano Estructural - Edificio A"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="tipo"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Tipo de Plano
          </label>
          <select
            id="tipo"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="estructural">Estructural</option>
            <option value="hidraulico">Hidráulico</option>
            <option value="electrico">Eléctrico</option>
            <option value="topografico">Topográfico</option>
            <option value="arquitectonico">Arquitectónico</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="cliente"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Cliente
        </label>
        <select
          id="cliente"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          required
        >
          <option value="">Seleccione un cliente</option>
          <option value="2">Juan Pérez</option>
          <option value="3">María López</option>
          <option value="4">Carlos Rodríguez</option>
        </select>
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
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Descripción del plano..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="archivo"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Archivo PDF
        </label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="archivo"
            className={`flex flex-col items-center justify-center w-full h-32 border-2 ${archivo ? "border-primary border-solid" : "border-dashed"} rounded-lg cursor-pointer ${archivo ? "bg-primary/10" : "bg-muted/50 hover:bg-muted"}`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {archivo ? (
                <>
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
                    className="w-8 h-8 mb-2 text-primary"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <p className="mb-2 text-sm font-semibold">{archivo.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(archivo.size / 1024).toFixed(2)} KB - Haga clic para cambiar
                  </p>
                </>
              ) : (
                <>
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
                    className="w-8 h-8 mb-2 text-muted-foreground"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Haga clic para cargar</span> o arrastre y suelte
                  </p>
                  <p className="text-xs text-muted-foreground">PDF (MAX. 10MB)</p>
                </>
              )}
            </div>
            <input
              id="archivo"
              type="file"
              accept=".pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => setArchivo(e.target.files[0])}
              required
            />
          </label>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <a
          href="/admin/planos"
          className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Cancelar
        </a>
        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
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

