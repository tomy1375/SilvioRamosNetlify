"use client"

export default function AdminNavLink({ href, children, isActive }) {
  const handleClick = (e) => {
    // Establecer un mensaje específico para navegación dentro del panel de administración
    sessionStorage.setItem("navigationTarget", href)

    // Asegurarse de que no haya una acción específica establecida
    sessionStorage.removeItem("navigationAction")

    // Mostrar el loader con un mensaje genérico
    const event = new CustomEvent("showLoader", {
      detail: { message: "Cargando..." },
    })
    document.dispatchEvent(event)
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 ${isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"}`}
    >
      {children}
    </a>
  )
}

