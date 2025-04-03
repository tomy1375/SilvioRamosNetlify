"use client"

export default function AdminNavLink({ href, children, isActive }) {
  // Eliminar el manejo de eventos que muestra el loader
  return (
    <a
      href={href}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 ${isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"}`}
    >
      {children}
    </a>
  )
}

