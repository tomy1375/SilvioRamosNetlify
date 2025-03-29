import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { createPlano } from "../../lib/db.js"

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Directorio donde se guardarán los archivos
const uploadDir = path.join(__dirname, "../../../public/planos")

// Asegurarse de que el directorio existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

export async function POST({ request }) {
  try {
    const formData = await request.formData()

    // Obtener los datos del formulario
    const nombre = formData.get("nombre")
    const tipo = formData.get("tipo")
    const usuario_id = formData.get("cliente")
    const descripcion = formData.get("descripcion")
    const archivo = formData.get("archivo")

    // Validar que se recibieron todos los datos necesarios
    if (!nombre || !tipo || !usuario_id || !archivo) {
      return new Response(JSON.stringify({ error: "Faltan datos requeridos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Validar que el archivo es un PDF
    if (archivo.type !== "application/pdf") {
      return new Response(JSON.stringify({ error: "El archivo debe ser un PDF" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Generar un nombre único para el archivo
    const timestamp = Date.now()
    const fileName = `${timestamp}-${archivo.name.replace(/\s+/g, "-")}`
    const filePath = path.join(uploadDir, fileName)

    // Guardar el archivo en el sistema de archivos
    const fileBuffer = await archivo.arrayBuffer()
    fs.writeFileSync(filePath, Buffer.from(fileBuffer))

    // Ruta relativa para guardar en la base de datos
    const archivo_url = `/planos/${fileName}`

    try {
      // Guardar la información en la base de datos
      const plano = await createPlano({
        nombre,
        tipo,
        descripcion: descripcion || "",
        archivo_url,
        usuario_id: Number.parseInt(usuario_id),
      })

      return new Response(JSON.stringify({ success: true, plano }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      })
    } catch (dbError) {
      // Si hay un error en la base de datos, eliminar el archivo subido
      fs.unlinkSync(filePath)

      // Verificar si es un error de tabla no existente
      if (dbError.code === "42P01") {
        return new Response(
          JSON.stringify({
            error: "La tabla de planos no existe en la base de datos. Por favor, configure la base de datos primero.",
            setupUrl: "/api/setup-db",
          }),
          { status: 500, headers: { "Content-Type": "application/json" } },
        )
      }

      throw dbError
    }
  } catch (error) {
    console.error("Error al subir el plano:", error)
    return new Response(JSON.stringify({ error: "Error al procesar la solicitud", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

