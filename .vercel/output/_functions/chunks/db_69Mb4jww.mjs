import pkg from 'pg';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const { Pool } = pkg;
function validateEnvVars() {
  const requiredVars = ["DB_USER", "DB_HOST", "DB_NAME", "DB_PASSWORD", "DB_PORT"];
  const missing = requiredVars.filter((varName) => !Object.assign(__vite_import_meta_env__, { DB_USER: "postgres", DB_HOST: "localhost", DB_NAME: "ingecivil", DB_PASSWORD: "admin", DB_PORT: "5432", NODE: process.env.NODE, NODE_ENV: process.env.NODE_ENV, OS: process.env.OS, _: process.env._ })[varName]);
  if (missing.length > 0) {
    console.error(`Faltan variables de entorno requeridas: ${missing.join(", ")}`);
    return false;
  }
  return true;
}
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ingecivil",
  password: String("admin"),
  // Convertir explícitamente a string
  port: Number.parseInt("5432"),
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});
async function query(text, params) {
  try {
    if (!validateEnvVars()) {
      throw new Error("Variables de entorno de base de datos no configuradas correctamente");
    }
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("Executed query", { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}
async function getUsers() {
  console.log("Ejecutando getUsers() en db.js");
  try {
    const result = await query("SELECT * FROM usuarios");
    console.log(`Usuarios encontrados en db.js: ${result.rows.length}`);
    console.log("IDs de usuarios encontrados:", result.rows.map((u) => u.id).join(", "));
    console.log("Tipos de usuarios encontrados:", result.rows.map((u) => u.tipo).join(", "));
    return result.rows;
  } catch (error) {
    console.error("Error en getUsers:", error);
    throw error;
  }
}
async function getUserById(id) {
  const result = await query("SELECT * FROM usuarios WHERE id = $1", [id]);
  return result.rows[0];
}
async function getUserByEmail(email) {
  const result = await query("SELECT * FROM usuarios WHERE email = $1", [email]);
  return result.rows[0];
}
async function createUser(userData) {
  const { nombre, email, password, tipo, empresa, telefono } = userData;
  const result = await query(
    "INSERT INTO usuarios (nombre, email, password, tipo, empresa, telefono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [nombre, email, password, tipo, empresa, telefono]
  );
  return result.rows[0];
}
async function updateUser(id, userData) {
  const { nombre, email, tipo, empresa, telefono, password } = userData;
  if (password) {
    const result = await query(
      "UPDATE usuarios SET nombre = $1, email = $2, tipo = $3, empresa = $4, telefono = $5, password = $6 WHERE id = $7 RETURNING *",
      [nombre, email, tipo, empresa, telefono, password, id]
    );
    return result.rows[0];
  } else {
    const result = await query(
      "UPDATE usuarios SET nombre = $1, email = $2, tipo = $3, empresa = $4, telefono = $5 WHERE id = $6 RETURNING *",
      [nombre, email, tipo, empresa, telefono, id]
    );
    return result.rows[0];
  }
}
async function deleteUser(id) {
  await query("DELETE FROM usuarios WHERE id = $1", [id]);
  return true;
}
async function getPlanos() {
  const result = await query(`
    SELECT p.*, u.nombre as cliente_nombre 
    FROM planos p
    LEFT JOIN usuarios u ON p.usuario_id = u.id
    ORDER BY p.fecha_subida DESC, p.id DESC
  `);
  return result.rows;
}
async function getPlanoById(id) {
  console.log(`Buscando plano con ID: ${id}`);
  try {
    const result = await query(
      `
      SELECT p.*, u.nombre as cliente_nombre 
      FROM planos p
      LEFT JOIN usuarios u ON p.usuario_id = u.id
      WHERE p.id = $1
    `,
      [id]
    );
    console.log(`Resultado de getPlanoById: ${JSON.stringify(result.rows[0] || null)}`);
    return result.rows[0];
  } catch (error) {
    console.error(`Error en getPlanoById: ${error}`);
    throw error;
  }
}
async function getPlanosByUserId(userId) {
  const result = await query(
    `
    SELECT * FROM planos 
    WHERE usuario_id = $1 
    ORDER BY fecha_subida DESC, id DESC
    `,
    [userId]
  );
  return result.rows;
}
async function createPlano(planoData) {
  const { nombre, tipo, descripcion, archivo_url, usuario_id } = planoData;
  const result = await query(
    "INSERT INTO planos (nombre, tipo, descripcion, archivo_url, usuario_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [nombre, tipo, descripcion, archivo_url, usuario_id]
  );
  return result.rows[0];
}
async function updatePlano(id, planoData) {
  const { nombre, tipo, descripcion } = planoData;
  const result = await query("UPDATE planos SET nombre = $1, tipo = $2, descripcion = $3 WHERE id = $4 RETURNING *", [
    nombre,
    tipo,
    descripcion,
    id
  ]);
  return result.rows[0];
}
async function deletePlano(id) {
  await query("DELETE FROM planos WHERE id = $1", [id]);
  return true;
}
async function getHistorialByUserId(userId) {
  const result = await query(
    `
    SELECT h.id, h.fecha, h.hora, p.id as plano_id, p.nombre, p.tipo, p.archivo_url
    FROM historial h
    JOIN planos p ON h.plano_id = p.id
    WHERE h.usuario_id = $1
    ORDER BY h.fecha DESC, h.hora DESC
    `,
    [userId]
  );
  return result.rows;
}
async function createHistorial(historialData) {
  const { usuario_id, plano_id, fecha, hora } = historialData;
  console.log(`Creando registro de historial: usuario=${usuario_id}, plano=${plano_id}, fecha=${fecha}, hora=${hora}`);
  try {
    const result = await query(
      "INSERT INTO historial (usuario_id, plano_id, fecha, hora) VALUES ($1, $2, $3, $4) RETURNING *",
      [usuario_id, plano_id, fecha, hora]
    );
    console.log("Historial creado:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear historial:", error);
    throw error;
  }
}

export { getUsers as a, getUserById as b, getPlanos as c, getPlanosByUserId as d, updateUser as e, getUserByEmail as f, getPlanoById as g, createUser as h, deletePlano as i, deleteUser as j, createHistorial as k, createPlano as l, getHistorialByUserId as m, query as q, updatePlano as u };
