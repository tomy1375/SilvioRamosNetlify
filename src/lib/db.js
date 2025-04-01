import pg from "pg"
const { Pool } = pg

// Función para validar las variables de entorno
function validateEnvVars() {
  const requiredVars = ["DB_USER", "DB_HOST", "DB_NAME", "DB_PASSWORD", "DB_PORT"]

  const missing = requiredVars.filter((varName) => !import.meta.env[varName])

  if (missing.length > 0) {
    console.error(`Faltan variables de entorno requeridas: ${missing.join(", ")}`)
    return false
  }

  return true
}

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: import.meta.env.DB_USER || "",
  host: import.meta.env.DB_HOST || "",
  database: import.meta.env.DB_NAME || "",
  password: String(import.meta.env.DB_PASSWORD || ""), // Convertir explícitamente a string
  port: Number.parseInt(import.meta.env.DB_PORT || "5432"),
  ssl: import.meta.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Función para ejecutar consultas SQL
export async function query(text, params) {
  try {
    // Validar que las variables de entorno estén configuradas
    if (!validateEnvVars()) {
      throw new Error("Variables de entorno de base de datos no configuradas correctamente")
    }

    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log("Executed query", { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error("Error executing query", error)
    throw error
  }
}

// Modelos de datos

// Usuarios
// Modificar la función getUsers para asegurarnos de que no haya filtros
export async function getUsers() {
  console.log("Ejecutando getUsers() en db.js")
  try {
    // Consulta simple sin filtros
    const result = await query("SELECT * FROM usuarios")
    console.log(`Usuarios encontrados en db.js: ${result.rows.length}`)
    console.log("IDs de usuarios encontrados:", result.rows.map((u) => u.id).join(", "))
    console.log("Tipos de usuarios encontrados:", result.rows.map((u) => u.tipo).join(", "))
    return result.rows
  } catch (error) {
    console.error("Error en getUsers:", error)
    throw error
  }
}

export async function getUserById(id) {
  const result = await query("SELECT * FROM usuarios WHERE id = $1", [id])
  return result.rows[0]
}

export async function getUserByEmail(email) {
  const result = await query("SELECT * FROM usuarios WHERE email = $1", [email])
  return result.rows[0]
}

export async function createUser(userData) {
  const { nombre, email, password, tipo, empresa, telefono } = userData
  const result = await query(
    "INSERT INTO usuarios (nombre, email, password, tipo, empresa, telefono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [nombre, email, password, tipo, empresa, telefono],
  )
  return result.rows[0]
}

// Modificar la función updateUser para manejar la contraseña opcional
export async function updateUser(id, userData) {
  const { nombre, email, tipo, empresa, telefono, password } = userData

  // Si se proporciona una nueva contraseña, actualizarla también
  if (password) {
    const result = await query(
      "UPDATE usuarios SET nombre = $1, email = $2, tipo = $3, empresa = $4, telefono = $5, password = $6 WHERE id = $7 RETURNING *",
      [nombre, email, tipo, empresa, telefono, password, id],
    )
    return result.rows[0]
  } else {
    // Si no se proporciona contraseña, mantener la actual
    const result = await query(
      "UPDATE usuarios SET nombre = $1, email = $2, tipo = $3, empresa = $4, telefono = $5 WHERE id = $6 RETURNING *",
      [nombre, email, tipo, empresa, telefono, id],
    )
    return result.rows[0]
  }
}

export async function deleteUser(id) {
  await query("DELETE FROM usuarios WHERE id = $1", [id])
  return true
}

// Planos
// Modificar la función getPlanos para ordenar por fecha de subida en orden descendente
export async function getPlanos() {
  const result = await query(`
    SELECT p.*, u.nombre as cliente_nombre 
    FROM planos p
    LEFT JOIN usuarios u ON p.usuario_id = u.id
    ORDER BY p.fecha_subida DESC, p.id DESC
  `)
  return result.rows
}

// Función para obtener un plano por su ID
export async function getPlanoById(id) {
  console.log(`Buscando plano con ID: ${id}`)
  try {
    const result = await query(
      `
      SELECT p.*, u.nombre as cliente_nombre 
      FROM planos p
      LEFT JOIN usuarios u ON p.usuario_id = u.id
      WHERE p.id = $1
    `,
      [id],
    )
    console.log(`Resultado de getPlanoById: ${JSON.stringify(result.rows[0] || null)}`)
    return result.rows[0]
  } catch (error) {
    console.error(`Error en getPlanoById: ${error}`)
    throw error
  }
}

// También modificar la función para obtener los planos por usuario
export async function getPlanosByUserId(userId) {
  const result = await query(
    `
    SELECT * FROM planos 
    WHERE usuario_id = $1 
    ORDER BY fecha_subida DESC, id DESC
    `,
    [userId],
  )
  return result.rows
}

export async function createPlano(planoData) {
  const { nombre, tipo, descripcion, archivo_url, usuario_id } = planoData
  const result = await query(
    "INSERT INTO planos (nombre, tipo, descripcion, archivo_url, usuario_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [nombre, tipo, descripcion, archivo_url, usuario_id],
  )
  return result.rows[0]
}

export async function updatePlano(id, planoData) {
  const { nombre, tipo, descripcion } = planoData
  const result = await query("UPDATE planos SET nombre = $1, tipo = $2, descripcion = $3 WHERE id = $4 RETURNING *", [
    nombre,
    tipo,
    descripcion,
    id,
  ])
  return result.rows[0]
}

export async function deletePlano(id) {
  await query("DELETE FROM planos WHERE id = $1", [id])
  return true
}

// Historial de descargas
export async function getHistorialByUserId(userId) {
  const result = await query(
    `
    SELECT h.id, h.fecha, h.hora, p.nombre, p.tipo, p.archivo_url
    FROM historial h
    JOIN planos p ON h.plano_id = p.id
    WHERE h.usuario_id = $1
    ORDER BY h.fecha DESC, h.hora DESC
  `,
    [userId],
  )
  return result.rows
}

export async function createHistorial(historialData) {
  const { usuario_id, plano_id, fecha, hora } = historialData
  const result = await query(
    "INSERT INTO historial (usuario_id, plano_id, fecha, hora) VALUES ($1, $2, $3, $4) RETURNING *",
    [usuario_id, plano_id, fecha, hora],
  )
  return result.rows[0]
}

