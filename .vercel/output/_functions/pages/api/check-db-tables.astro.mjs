import { q as query } from '../../chunks/db_69Mb4jww.mjs';
export { renderers } from '../../renderers.mjs';

async function GET() {
  try {
    console.log("Verificando tablas de la base de datos...");

    // Verificar la tabla de usuarios
    const usuariosResult = await query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'usuarios'
      ORDER BY ordinal_position
    `);

    // Verificar si hay registros en la tabla de usuarios
    const usuariosCount = await query("SELECT COUNT(*) FROM usuarios");

    // Obtener todos los usuarios para depuración
    const allUsers = await query("SELECT * FROM usuarios");

    return new Response(
      JSON.stringify({
        success: true,
        usuariosColumns: usuariosResult.rows,
        usuariosCount: usuariosCount.rows[0].count,
        allUsers: allUsers.rows,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Error al verificar tablas:", error);
    return new Response(
      JSON.stringify({
        error: "Error al verificar tablas",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
