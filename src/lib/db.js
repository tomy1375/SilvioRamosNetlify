// db.js
import prisma from './prisma-client.js'

// Usuarios
export async function getUsers() {
  console.log("Ejecutando getUsers() en db.js")
  try {
    const users = await prisma.usuario.findMany()
    console.log(`Usuarios encontrados en db.js: ${users.length}`)
    console.log("IDs de usuarios encontrados:", users.map((u) => u.id).join(", "))
    console.log("Tipos de usuarios encontrados:", users.map((u) => u.tipo).join(", "))
    return users
  } catch (error) {
    console.error("Error en getUsers:", error)
    throw error
  }
}

export async function getUserById(id) {
  return await prisma.usuario.findUnique({
    where: { id: parseInt(id) }
  })
}

export async function getUserByEmail(email) {
  return await prisma.usuario.findUnique({
    where: { email }
  })
}

export async function createUser(userData) {
  const { nombre, email, password, tipo, empresa, telefono } = userData
  return await prisma.usuario.create({
    data: {
      nombre,
      email,
      password,
      tipo,
      empresa,
      telefono
    }
  })
}

export async function updateUser(id, userData) {
  const { nombre, email, tipo, empresa, telefono, password } = userData
  
  const data = {
    nombre,
    email,
    tipo,
    empresa,
    telefono
  }
  
  // Solo incluir password si se proporciona
  if (password) {
    data.password = password
  }
  
  return await prisma.usuario.update({
    where: { id: parseInt(id) },
    data
  })
}

export async function deleteUser(id) {
  await prisma.usuario.delete({
    where: { id: parseInt(id) }
  })
  return true
}

// Planos
export async function getPlanos() {
  return await prisma.plano.findMany({
    include: {
      usuario: {
        select: {
          nombre: true
        }
      }
    },
    orderBy: [
      { fecha_subida: 'desc' },
      { id: 'desc' }
    ]
  })
}

export async function getPlanoById(id) {
  console.log(`Buscando plano con ID: ${id}`)
  try {
    const plano = await prisma.plano.findUnique({
      where: { id: parseInt(id) },
      include: {
        usuario: {
          select: {
            nombre: true
          }
        }
      }
    })
    console.log(`Resultado de getPlanoById: ${JSON.stringify(plano || null)}`)
    return plano
  } catch (error) {
    console.error(`Error en getPlanoById: ${error}`)
    throw error
  }
}

export async function getPlanosByUserId(userId) {
  return await prisma.plano.findMany({
    where: { usuario_id: parseInt(userId) },
    orderBy: [
      { fecha_subida: 'desc' },
      { id: 'desc' }
    ]
  })
}

export async function createPlano(planoData) {
  const { nombre, tipo, descripcion, archivo_url, usuario_id } = planoData
  return await prisma.plano.create({
    data: {
      nombre,
      tipo,
      descripcion,
      archivo_url,
      usuario_id: parseInt(usuario_id)
    }
  })
}

export async function updatePlano(id, planoData) {
  const { nombre, tipo, descripcion } = planoData
  return await prisma.plano.update({
    where: { id: parseInt(id) },
    data: {
      nombre,
      tipo,
      descripcion
    }
  })
}

export async function deletePlano(id) {
  await prisma.plano.delete({
    where: { id: parseInt(id) }
  })
  return true
}

// Historial de descargas
export async function getHistorialByUserId(userId) {
  return await prisma.historial.findMany({
    where: { usuario_id: parseInt(userId) },
    include: {
      plano: true
    },
    orderBy: [
      { fecha: 'desc' },
      { hora: 'desc' }
    ]
  })
}

export async function createHistorial(historialData) {
  const { usuario_id, plano_id, fecha, hora } = historialData

  console.log(`Creando registro de historial: usuario=${usuario_id}, plano=${plano_id}, fecha=${fecha}, hora=${hora}`)

  try {
    const historial = await prisma.historial.create({
      data: {
        usuario_id: parseInt(usuario_id),
        plano_id: parseInt(plano_id),
        fecha: new Date(fecha),
        hora: new Date(`1970-01-01T${hora}`)
      }
    })
    console.log("Historial creado:", historial)
    return historial
  } catch (error) {
    console.error("Error al crear historial:", error)
    throw error
  }
}