import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getUserByEmail } from "../lib/db.js"

// Función para autenticar un usuario
export async function authenticateUser(email, password) {
  try {
    // Buscar usuario por email
    const user = await getUserByEmail(email)

    // Si no existe el usuario, retornar null
    if (!user) {
      return null
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return null
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        tipo: user.tipo,
      },
      import.meta.env.JWT_SECRET,
      { expiresIn: "24h" },
    )

    return {
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        tipo: user.tipo,
      },
    }
  } catch (error) {
    console.error("Error en la autenticación:", error)
    throw error
  }
}

// Middleware para verificar token JWT
export function verifyToken(req) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, import.meta.env.JWT_SECRET)

    return decoded
  } catch (error) {
    console.error("Error al verificar token:", error)
    return null
  }
}

