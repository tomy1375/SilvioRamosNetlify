export { renderers } from '../../renderers.mjs';

async function GET() {
  try {
    const envStatus = {
      DB_USER: "postgres" ? "Configurado" : "No configurado",
      DB_HOST: "localhost" ? "Configurado" : "No configurado",
      DB_NAME: "ingecivil" ? "Configurado" : "No configurado",
      DB_PASSWORD: "admin" ? "Configurado" : "No configurado",
      DB_PORT: "5432" ? "Configurado" : "No configurado",
      // Verificar si la contraseña es una cadena
      PASSWORD_TYPE: "string"
    };
    return new Response(
      JSON.stringify({
        status: "success",
        message: "Verificación de variables de entorno",
        envStatus
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error al verificar variables de entorno:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Error al verificar variables de entorno",
        error: error.message
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
