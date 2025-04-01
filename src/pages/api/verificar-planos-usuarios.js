import { query } from "../../lib/db.js"

export async function GET() {
  try {
    console.log("Verificando relación entre planos y usuarios...")

    // Obtener todos los planos con información de usuario
    const planosResult = await query(`
      SELECT p.id, p.nombre, p.tipo, p.fecha_subida, p.usuario_id, 
             u.id as usuario_real_id, u.nombre as usuario_nombre, u.tipo as usuario_tipo
      FROM planos p
      LEFT JOIN usuarios u ON p.usuario_id = u.id
      ORDER BY p.fecha_subida DESC, p.id DESC
    `)

    // Verificar si hay planos sin usuario asociado
    const planosSinUsuario = planosResult.rows.filter((plano) => !plano.usuario_real_id)

    // Obtener todos los usuarios de tipo cliente
    const clientesResult = await query(`
      SELECT id, nombre, email, tipo
      FROM usuarios
      WHERE tipo = 'cliente' OR tipo = 'Cliente'
      ORDER BY id ASC
    `)

    return new Response(
      JSON.stringify({
        success: true,
        totalPlanos: planosResult.rows.length,
        planosSinUsuario: planosSinUsuario.length,
        detallesPlanosSinUsuario: planosSinUsuario,
        totalClientes: clientesResult.rows.length,
        clientes: clientesResult.rows,
        todosLosPlanos: planosResult.rows,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Error al verificar planos y usuarios:", error)
    return new Response(
      JSON.stringify({
        error: "Error al verificar planos y usuarios",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

