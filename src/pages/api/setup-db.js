import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { query } from "../../lib/db.js"

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function GET() {
  try {
    // Verificar las variables de entorno
    const requiredVars = ["DB_USER", "DB_HOST", "DB_NAME", "DB_PASSWORD", "DB_PORT"]

    const missing = requiredVars.filter((varName) => !import.meta.env[varName])

    if (missing.length > 0) {
      return new Response(
        JSON.stringify({
          error: "Faltan variables de entorno requeridas",
          missing: missing,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Verificar que la contraseña sea una cadena
    if (typeof import.meta.env.DB_PASSWORD !== "string") {
      return new Response(
        JSON.stringify({
          error: "La contraseña de la base de datos debe ser una cadena de texto",
          type: typeof import.meta.env.DB_PASSWORD,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Intentar una consulta simple para verificar la conexión
    try {
      await query("SELECT NOW()")
    } catch (connError) {
      return new Response(
        JSON.stringify({
          error: "Error de conexión a la base de datos",
          details: connError.message,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Ruta al archivo SQL
    const schemaPath = path.join(__dirname, "../../../db/schema.sql")

    // Verificar si el archivo existe
    if (!fs.existsSync(schemaPath)) {
      return new Response(
        JSON.stringify({
          error: "Archivo schema.sql no encontrado",
          path: schemaPath,
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Leer el archivo SQL
    const sqlScript = fs.readFileSync(schemaPath, "utf8")

    // Ejecutar el script SQL
    await query(sqlScript)

    return new Response(
      JSON.stringify({
        success: true,
        message: "Base de datos configurada correctamente",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Error al configurar la base de datos:", error)
    return new Response(
      JSON.stringify({
        error: "Error al configurar la base de datos",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

