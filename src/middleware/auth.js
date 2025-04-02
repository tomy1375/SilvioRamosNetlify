import { isAuthenticated } from "../lib/auth.js"

export function authMiddleware(request, redirect) {
  const usuario = isAuthenticated(request)

  // Si no hay usuario autenticado, redirigir al login
  if (!usuario) {
    return redirect("/login")
  }

  // Si es un cliente intentando acceder a rutas de admin, redirigir
  if (usuario.tipo.toLowerCase() === "cliente" && request.url.includes("/admin")) {
    return redirect("/cliente")
  }

  // Si es un admin intentando acceder a rutas de cliente, redirigir
  if (usuario.tipo.toLowerCase() === "admin" && request.url.includes("/cliente")) {
    return redirect("/admin")
  }

  // Si todo está bien, continuar
  return null
}

