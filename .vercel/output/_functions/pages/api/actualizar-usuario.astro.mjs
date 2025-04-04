import { b as getUserById, e as updateUser } from '../../chunks/db_69Mb4jww.mjs';
export { renderers } from '../../renderers.mjs';

async function POST({ request }) {
  try {
    console.log("Recibida solicitud para actualizar usuario");

    const data = await request.json();
    console.log("Datos recibidos:", data);

    const { id, nombre, email, tipo, empresa, telefono, password } = data;

    // Validar que se recibieron todos los datos necesarios
    if (!id || !nombre || !email || !tipo) {
      console.error("Faltan datos requeridos");
      return new Response(JSON.stringify({ error: "Faltan datos requeridos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Verificar que el usuario existe
    const usuarioExistente = await getUserById(id);
    if (!usuarioExistente) {
      console.error("Usuario no encontrado");
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Preparar los datos para actualizar
    const userData = {
      nombre,
      email,
      tipo,
      empresa: empresa || null,
      telefono: telefono || null,
    };

    // Si se proporcionó una nueva contraseña, actualizarla
    if (password && password.trim() !== "") {
      userData.password = password;
    }

    // Actualizar el usuario en la base de datos
    const usuarioActualizado = await updateUser(id, userData);

    console.log("Usuario actualizado correctamente:", usuarioActualizado);

    return new Response(JSON.stringify({ success: true, usuario: usuarioActualizado }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return new Response(JSON.stringify({ error: "Error al procesar la solicitud", details: error.message }), {
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
