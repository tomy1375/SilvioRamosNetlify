import { b as getUserById, j as deleteUser } from '../../chunks/db_69Mb4jww.mjs';
export { renderers } from '../../renderers.mjs';

async function POST({ request }) {
  try {
    const data = await request.json();
    const { id } = data;

    if (!id) {
      return new Response(JSON.stringify({ error: "ID de usuario no proporcionado" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Verificar que el usuario existe
    const usuario = await getUserById(id);
    if (!usuario) {
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Eliminar el usuario de la base de datos
    await deleteUser(id);

    return new Response(JSON.stringify({ success: true, message: "Usuario eliminado correctamente" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return new Response(JSON.stringify({ error: "Error al eliminar el usuario", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
