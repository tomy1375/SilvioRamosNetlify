import { getPlanos, getPlanosByUserId, createPlano } from "../lib/db.js"
import { verifyToken } from "./auth.js"

// Endpoint para obtener planos
export async function getPlanosByUser(req) {
  try {
    const user = verifyToken(req)

    if (!user) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    let planos

    if (user.tipo === "admin") {
      // Administrador puede ver todos los planos
      planos = await getPlanos()
    } else {
      // Cliente solo puede ver sus planos
      planos = await getPlanosByUserId(user.id)
    }

    return new Response(JSON.stringify(planos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error al obtener planos:", error)
    return new Response(JSON.stringify({ error: "Error al obtener planos" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// Endpoint para crear un plano
export async function createNewPlano(req) {
  try {
    const user = verifyToken(req)

    if (!user || user.tipo !== "admin") {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    const data = await req.json()

    // Validar datos
    if (!data.nombre || !data.tipo || !data.usuario_id || !data.archivo_url) {
      return new Response(JSON.stringify({ error: "Faltan datos requeridos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const plano = await createPlano(data)

    return new Response(JSON.stringify(plano), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error al crear plano:", error)
    return new Response(JSON.stringify({ error: "Error al crear plano" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

