import { createUser, getUserByEmail } from "../../lib/db.js"

export async function POST({ request }) {
  try {
    console.log("Recibida solicitud para crear usuario")

    const data = await request.json()
    console.log("Datos recibidos:", { ...data, password: "******" })

    const { nombre, email, password, tipo, empresa, telefono } = data

    // Validar que se recibieron todos los datos necesarios
    if (!nombre || !email || !password || !tipo) {
      console.error("Faltan datos requeridos")
      return new Response(JSON.stringify({ error: "Faltan datos requeridos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Verificar si ya existe un usuario con ese email
    const usuarioExistente = await getUserByEmail(email)
    if (usuarioExistente) {
      console.error("Ya existe un usuario con ese email")
      return new Response(JSON.stringify({ error: "Ya existe un usuario con ese email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Crear el usuario en la base de datos
    const nuevoUsuario = await createUser({
      nombre,
      email,
      password,
      tipo,
      empresa: empresa || null,
      telefono: telefono || null,
    })

    console.log("Usuario creado correctamente:", { ...nuevoUsuario, password: "******" })

    return new Response(JSON.stringify({ success: true, usuario: { ...nuevoUsuario, password: undefined } }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error al crear el usuario:", error)
    return new Response(JSON.stringify({ error: "Error al procesar la solicitud", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

