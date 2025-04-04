import { k as createHistorial } from '../../chunks/db_69Mb4jww.mjs';
export { renderers } from '../../renderers.mjs';

async function POST({ request }) {
  try {
    console.log("Recibida solicitud para registrar descarga");

    const data = await request.json();
    console.log("Datos recibidos:", data);

    const { plano_id, usuario_id } = data;

    // Validar que se recibieron todos los datos necesarios
    if (!plano_id || !usuario_id) {
      console.error("Faltan datos requeridos");
      return new Response(JSON.stringify({ error: "Faltan datos requeridos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Obtener la fecha y hora actual
    const ahora = new Date();
    const fecha = ahora.toISOString().split("T")[0]; // formato YYYY-MM-DD
    const hora = ahora.toTimeString().split(" ")[0]; // formato HH:MM:SS

    // Registrar la descarga en el historial
    const historial = await createHistorial({
      usuario_id,
      plano_id,
      fecha,
      hora,
    });

    console.log("Descarga registrada correctamente:", historial);

    return new Response(JSON.stringify({ success: true, historial }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error al registrar descarga:", error);
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
