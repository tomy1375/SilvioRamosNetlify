import bcrypt from "bcryptjs"
import { createUser, getUserByEmail } from "../../lib/db.js"

export async function POST({ request }) {
  try {
    const data = await request.json()

    // Validar datos requeridos
    if (!data.nombre || !data.email || !data.password || !data.tipo) {
      return new Response(JSON.stringify({ error: "Faltan datos requeridos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Verificar si el email ya está registrado
    const existingUser = await getUserByEmail(data.email)
    if (existingUser) {
      return new Response(JSON.stringify({ error: "El correo electrónico ya está registrado" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // Crear el usuario
    const usuario = await createUser({
      nombre: data.nombre,
      email: data.email,
      password: hashedPassword,
      tipo: data.tipo,
      empresa: data.empresa || null,
      telefono: data.telefono || null,
    })

    // No devolver la contraseña
    const { password, ...usuarioSinPassword } = usuario

    return new Response(JSON.stringify({ success: true, usuario: usuarioSinPassword }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error al crear usuario:", error)
    return new Response(JSON.stringify({ error: "Error al procesar la solicitud" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

