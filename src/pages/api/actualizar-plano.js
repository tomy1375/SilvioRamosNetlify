import { updatePlano, getPlanoById } from "../../lib/db.js"

export async function POST({ request }) {
  try {
    console.log("Recibida solicitud para actualizar plano")

    const data = await request.json()
    console.log("Datos recibidos:", data)

    const { id, nombre, tipo, usuario_id, descripcion } = data

    // Validar que se recibieron todos los datos necesarios
    if (!id || !nombre || !tipo || !usuario_id) {
      console.error("Faltan datos requeridos")
      return new Response(JSON.stringify({ error: "Faltan datos requeridos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Verificar que el plano existe
    const planoExistente = await getPlanoById(id)
    if (!planoExistente) {
      console.error("Plano no encontrado")
      return new Response(JSON.stringify({ error: "Plano no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Actualizar el plano en la base de datos
    const planoActualizado = await updatePlano(id, {
      nombre,
      tipo,
      descripcion: descripcion || "",
    })

    console.log("Plano actualizado correctamente:", planoActualizado)

    return new Response(JSON.stringify({ success: true, plano: planoActualizado }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error al actualizar el plano:", error)
    return new Response(JSON.stringify({ error: "Error al procesar la solicitud", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

