import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { deletePlano, getPlanoById } from "../../lib/db.js"

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Directorio donde se guardan los archivos
const uploadDir = path.join(__dirname, "../../../public")

export async function POST({ request }) {
  try {
    const data = await request.json()
    const { id } = data

    if (!id) {
      return new Response(JSON.stringify({ error: "ID de plano no proporcionado" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Obtener información del plano antes de eliminarlo
    const plano = await getPlanoById(id)
    if (!plano) {
      return new Response(JSON.stringify({ error: "Plano no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Eliminar el archivo físico
    try {
      const filePath = path.join(uploadDir, plano.archivo_url)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    } catch (fileError) {
      console.error("Error al eliminar el archivo físico:", fileError)
      // Continuamos con la eliminación del registro en la base de datos
    }

    // Eliminar el registro de la base de datos
    await deletePlano(id)

    return new Response(JSON.stringify({ success: true, message: "Plano eliminado correctamente" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error al eliminar el plano:", error)
    return new Response(JSON.stringify({ error: "Error al eliminar el plano", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

