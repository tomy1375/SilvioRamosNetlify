import { a as getUsers } from '../../chunks/db_69Mb4jww.mjs';
export { renderers } from '../../renderers.mjs';

async function GET() {
  try {
    console.log("API: Obteniendo usuarios...");
    const usuarios = await getUsers();
    console.log(`API: Se encontraron ${usuarios.length} usuarios`);

    // No devolver las contraseñas
    const usuariosSinPassword = usuarios.map(({ password, ...rest }) => rest);

    return new Response(JSON.stringify(usuariosSinPassword), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return new Response(JSON.stringify({ error: "Error al obtener usuarios", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
