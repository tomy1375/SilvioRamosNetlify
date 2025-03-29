import { getUsers } from "../../lib/db.js"

export async function GET() {
  try {
    const usuarios = await getUsers()

    // No devolver las contraseñas
    const usuariosSinPassword = usuarios.map(({ password, ...rest }) => rest)

    return new Response(JSON.stringify(usuariosSinPassword), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error al obtener usuarios:", error)
    return new Response(JSON.stringify({ error: "Error al obtener usuarios", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

