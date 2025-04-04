import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { q as query } from '../../chunks/db_69Mb4jww.mjs';
export { renderers } from '../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function GET() {
  try {
    const requiredVars = ["DB_USER", "DB_HOST", "DB_NAME", "DB_PASSWORD", "DB_PORT"];
    const missing = requiredVars.filter((varName) => !Object.assign(__vite_import_meta_env__, { DB_USER: "postgres", DB_HOST: "localhost", DB_NAME: "ingecivil", DB_PASSWORD: "admin", DB_PORT: "5432", OS: process.env.OS, _: process.env._ })[varName]);
    if (missing.length > 0) {
      return new Response(
        JSON.stringify({
          error: "Faltan variables de entorno requeridas",
          missing
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    if (false) ;
    try {
      await query("SELECT NOW()");
    } catch (connError) {
      return new Response(
        JSON.stringify({
          error: "Error de conexión a la base de datos",
          details: connError.message
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const schemaPath = path.join(__dirname, "../../../db/schema.sql");
    if (!fs.existsSync(schemaPath)) {
      return new Response(
        JSON.stringify({
          error: "Archivo schema.sql no encontrado",
          path: schemaPath
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const sqlScript = fs.readFileSync(schemaPath, "utf8");
    await query(sqlScript);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Base de datos configurada correctamente"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error al configurar la base de datos:", error);
    return new Response(
      JSON.stringify({
        error: "Error al configurar la base de datos",
        details: error.message
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
