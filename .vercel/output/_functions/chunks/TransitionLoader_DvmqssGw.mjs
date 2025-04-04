import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

// Función para manejar el inicio de sesión
async function login(email, password, pool) {
    try {
      console.log(`Intentando iniciar sesión con email: ${email}`);
  
      // Consultar el usuario por email
      const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
  
      if (result.rows.length === 0) {
        console.log("Usuario no encontrado");
        return { success: false, error: "Usuario no encontrado" }
      }
  
      const usuario = result.rows[0];
      console.log(`Usuario encontrado: ${usuario.nombre} (${usuario.tipo})`);
  
      // Verificar la contraseña (en un sistema real, deberías usar bcrypt o similar)
      if (usuario.password !== password) {
        console.log("Contraseña incorrecta");
        return { success: false, error: "Contraseña incorrecta" }
      }
  
      // Crear objeto de sesión (sin incluir la contraseña)
      const { password: _, ...usuarioSesion } = usuario;
  
      const redirectUrl = usuario.tipo.toLowerCase() === "admin" ? "/admin" : "/cliente";
      console.log(`Inicio de sesión exitoso. Redirigiendo a: ${redirectUrl}`);
  
      return {
        success: true,
        usuario: usuarioSesion,
        redirect: redirectUrl,
      }
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, error: "Error al iniciar sesión" }
    }
  }
  
  // Función para verificar si el usuario está autenticado
  function isAuthenticated(request) {
    const cookies = request.headers.get("cookie");
    if (!cookies) return null
  
    // Buscar la cookie de sesión
    const sessionCookie = cookies.split(";").find((c) => c.trim().startsWith("session="));
    if (!sessionCookie) return null
  
    try {
      // Decodificar la cookie (en un sistema real, deberías verificar una firma)
      const sessionData = JSON.parse(decodeURIComponent(sessionCookie.split("=")[1]));
      return sessionData
    } catch (error) {
      console.error("Error al decodificar la sesión:", error);
      return null
    }
  }

function TransitionLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const detectAction = () => {
      const action = sessionStorage.getItem("navigationAction");
      const target = sessionStorage.getItem("navigationTarget") || "";
      const isAdminNavigation = target.startsWith("/admin");
      if (action === "login") {
        setMessage("Iniciando sesión...");
        setShowLoader(true);
      } else if (action === "logout") {
        setMessage("Cerrando sesión...");
        setShowLoader(true);
      } else if (isAdminNavigation) {
        setMessage("Cargando...");
        setShowLoader(true);
      } else {
        setMessage("Cargando...");
        setShowLoader(false);
      }
    };
    const handleShowLoader = (e) => {
      if (e.detail && e.detail.message) {
        setMessage(e.detail.message);
        setShowLoader(true);
      } else {
        detectAction();
      }
      setIsLoading(true);
    };
    const hideLoader = () => {
      setIsLoading(false);
    };
    document.addEventListener("showLoader", handleShowLoader);
    document.addEventListener("hideLoader", hideLoader);
    document.addEventListener("astro:before-preparation", handleShowLoader);
    document.addEventListener("astro:after-preparation", hideLoader);
    document.addEventListener("astro:before-swap", handleShowLoader);
    document.addEventListener("astro:after-swap", hideLoader);
    document.addEventListener("astro:page-load", () => {
      hideLoader();
      const currentPath = window.location.pathname;
      if (currentPath === "/login") {
        const action = sessionStorage.getItem("navigationAction");
        if (action === "logout") {
          console.log("Limpiando estado de logout en página de login");
          setTimeout(() => {
            sessionStorage.removeItem("navigationAction");
            sessionStorage.removeItem("navigationTarget");
          }, 500);
        }
      }
      if (!currentPath.startsWith("/admin") && currentPath !== "/login") {
        sessionStorage.removeItem("navigationAction");
        sessionStorage.removeItem("navigationTarget");
      }
    });
    const handleLinkClick = (e) => {
      if (e.target.closest("a") && e.target.closest("a").href) {
        try {
          const linkElement = e.target.closest("a");
          const url = new URL(linkElement.href);
          if (url.origin === window.location.origin) {
            sessionStorage.setItem("navigationTarget", url.pathname);
            if (!linkElement.id.includes("logout") && !url.pathname.startsWith("/admin") && url.pathname !== "/login") {
              sessionStorage.removeItem("navigationAction");
            }
          }
        } catch (error) {
          console.error("Error al procesar URL:", error);
        }
      }
    };
    document.addEventListener("click", handleLinkClick, true);
    const removeRedirectingMessage = () => {
      const redirectElements = document.querySelectorAll("*");
      redirectElements.forEach((el) => {
        if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE && el.textContent.trim() === "redirieigiendo") {
          el.style.display = "none";
        }
      });
    };
    removeRedirectingMessage();
    document.addEventListener("astro:page-load", removeRedirectingMessage);
    return () => {
      document.removeEventListener("showLoader", handleShowLoader);
      document.removeEventListener("hideLoader", hideLoader);
      document.removeEventListener("astro:before-preparation", handleShowLoader);
      document.removeEventListener("astro:after-preparation", hideLoader);
      document.removeEventListener("astro:before-swap", handleShowLoader);
      document.removeEventListener("astro:after-swap", hideLoader);
      document.removeEventListener("astro:page-load", hideLoader);
      document.removeEventListener("click", handleLinkClick, true);
      document.removeEventListener("astro:page-load", removeRedirectingMessage);
    };
  }, []);
  if (!isLoading || !showLoader || !message) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-90", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg font-medium text-white", children: message })
  ] }) });
}

export { TransitionLoader as T, isAuthenticated as i, login as l };
