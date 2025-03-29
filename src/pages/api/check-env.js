export async function GET() {
  try {
    // Obtener las variables de entorno (sin mostrar valores sensibles)
    const envStatus = {
      DB_USER: import.meta.env.DB_USER ? "Configurado" : "No configurado",
      DB_HOST: import.meta.env.DB_HOST ? "Configurado" : "No configurado",
      DB_NAME: import.meta.env.DB_NAME ? "Configurado" : "No configurado",
      DB_PASSWORD: import.meta.env.DB_PASSWORD ? "Configurado" : "No configurado",
      DB_PORT: import.meta.env.DB_PORT ? "Configurado" : "No configurado",
      // Verificar si la contraseña es una cadena
      PASSWORD_TYPE: typeof import.meta.env.DB_PASSWORD,
    }

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Verificación de variables de entorno",
        envStatus,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Error al verificar variables de entorno:", error)
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Error al verificar variables de entorno",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

