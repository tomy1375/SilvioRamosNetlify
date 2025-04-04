import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { g as getPlanoById, i as deletePlano } from '../../chunks/db_69Mb4jww.mjs';
export { renderers } from '../../renderers.mjs';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorio donde se guardan los archivos
const uploadDir = path.join(__dirname, "../../../public");

async function POST({ request }) {
  try {
    console.log("Recibida solicitud para eliminar plano");

    const data = await request.json();
    console.log("Datos recibidos:", data);

    const { id } = data;

    if (!id) {
      console.error("ID de plano no proporcionado");
      return new Response(JSON.stringify({ error: "ID de plano no proporcionado" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Obtener información del plano antes de eliminarlo
    const plano = await getPlanoById(id);
    if (!plano) {
      console.error("Plano no encontrado");
      return new Response(JSON.stringify({ error: "Plano no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log("Plano encontrado:", plano);

    // Eliminar el archivo físico
    try {
      const filePath = path.join(uploadDir, plano.archivo_url);
      console.log("Intentando eliminar archivo:", filePath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Archivo eliminado correctamente");
      } else {
        console.log("El archivo no existe en el sistema de archivos");
      }
    } catch (fileError) {
      console.error("Error al eliminar el archivo físico:", fileError);
      // Continuamos con la eliminación del registro en la base de datos
    }

    // Eliminar el registro de la base de datos
    await deletePlano(id);
    console.log("Plano eliminado de la base de datos");

    return new Response(JSON.stringify({ success: true, message: "Plano eliminado correctamente" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error al eliminar el plano:", error);
    return new Response(JSON.stringify({ error: "Error al eliminar el plano", details: error.message }), {
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
