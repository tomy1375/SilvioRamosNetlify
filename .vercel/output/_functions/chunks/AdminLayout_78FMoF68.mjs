import { c as createComponent, d as createAstro, b as renderTemplate, f as renderSlot, r as renderComponent, g as renderHead, e as addAttribute } from './astro/server_dC-6T-Kg.mjs';
import 'kleur/colors';
/* empty css                             */
import { T as ThemeToggle } from './ThemeToggle_DUU87XCa.mjs';
import { jsx } from 'react/jsx-runtime';

function AdminNavLink({ href, children, isActive }) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      className: `flex items-center gap-2 rounded-lg px-3 py-2 ${isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"}`,
      children
    }
  );
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title, activeLink } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", " - Panel de Administraci\xF3n</title><!-- Estilos cr\xEDticos para prevenir parpadeo --><style>\n      /* Prevenir parpadeo en transiciones */\n      html.dark {\n        background-color: 'hsl(var(--background))' !important;\n        color-scheme: dark !important;\n      }\n      \n      html.dark body {\n        background-color: 'hsl(var(--background))' !important;\n      }\n      \n      /* Asegurar que las transiciones de p\xE1gina no muestren fondo blanco */\n      ::view-transition-old(root),\n      ::view-transition-new(root) {\n        animation: none;\n        mix-blend-mode: normal;\n      }\n      \n      /* Modo oscuro para las transiciones */\n      html.dark::view-transition-old(root),\n      html.dark::view-transition-new(root) {\n        background-color: #1a1a1a !important;\n      }\n    </style><!-- Script para prevenir el parpadeo blanco en modo oscuro --><script>\n      // Aplicar el tema oscuro inmediatamente si es necesario\n      (function() {\n        const savedTheme = localStorage.getItem('theme');\n        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;\n        \n        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {\n          document.documentElement.classList.add('dark');\n          document.documentElement.style.colorScheme = 'dark';\n          // Establecer un color de fondo oscuro para el body y html inmediatamente\n          document.documentElement.style.backgroundColor = '#1a1a1a';\n          document.body.style.backgroundColor = '#1a1a1a';\n        } else {\n          document.documentElement.classList.remove('dark');\n          document.documentElement.style.colorScheme = 'light';\n          // Asegurar que el fondo sea blanco en modo claro\n          document.documentElement.style.backgroundColor = '#ffffff';\n          document.body.style.backgroundColor = '#ffffff';\n        }\n        \n        // Limpiar cualquier acci\xF3n de navegaci\xF3n anterior al cargar una p\xE1gina de administraci\xF3n\n        if (window.location.pathname.startsWith('/admin')) {\n          sessionStorage.removeItem('navigationAction');\n        }\n      })();\n    <\/script>", '</head> <body class="min-h-screen flex flex-col bg-background"> <!-- Pantalla de carga para transiciones --> <div id="logout-loader" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-90"> <div class="text-center"> <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div> <p class="mt-4 text-lg font-medium text-white">Cerrando sesi\xF3n...</p> </div> </div> <header class="border-b"> <div class="container flex h-16 items-center justify-between px-4 md:px-6"> <a href="/" class="flex items-center gap-2 font-bold text-xl"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"> <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path> <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"></path> </svg> <span>s.m.r.</span> </a> <div class="flex items-center gap-4"> ', ' <div class="flex items-center gap-2"> <div class="relative h-8 w-8 rounded-full bg-muted"> <img src="/silvioRamos.webp" width="32" height="32" alt="Avatar" class="rounded-full object-cover"> </div> <span class="text-sm font-medium">Administrador</span> </div> <button id="logout-btn" class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4"> <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path> <polyline points="16 17 21 12 16 7"></polyline> <line x1="21" y1="12" x2="9" y2="12"></line> </svg>\nCerrar Sesi\xF3n\n</button> </div> </div> </header> <div class="flex flex-1"> <aside class="w-64 border-r bg-muted/40 hidden md:block"> <div class="flex flex-col gap-2 p-4"> ', " ", " ", " ", " ", ' <!-- Nuevo enlace para ver planos por usuario --> </div> </aside> <main class="flex-1 p-4 md:p-6"> ', ' </main> </div> <footer class="border-t"> <div class="container py-6"> <p class="text-center text-sm text-muted-foreground">\n\xA9 ', ` IngeCivil. Todos los derechos reservados.
</p> </div> </footer> <script>
      // Script para manejar el cierre de sesi\xF3n
      function setupLogoutButton() {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
          // Eliminar cualquier event listener anterior para evitar duplicados
          logoutBtn.removeEventListener('click', handleLogout);
          
          // Agregar el nuevo event listener
          logoutBtn.addEventListener('click', handleLogout);
        }
      }
      
      function handleLogout() {
        // Mostrar el loader de cierre de sesi\xF3n
        const logoutLoader = document.getElementById('logout-loader');
        if (logoutLoader) {
          logoutLoader.classList.remove('hidden');
        }
        
        // Eliminar la cookie de sesi\xF3n
        document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        // Peque\xF1o retraso para asegurar que el loader se muestre
        setTimeout(() => {
          // Redirigir a la p\xE1gina de inicio de sesi\xF3n
          window.location.href = "/login";
        }, 300);
      }
      
      // Ejecutar al cargar la p\xE1gina
      document.addEventListener('DOMContentLoaded', setupLogoutButton);
    <\/script> </body> </html>`])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderComponent($$result, "ThemeToggle", ThemeToggle, { "client:load": true, "client:component-hydration": "load", "client:component-path": "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/components/ThemeToggle", "client:component-export": "default" }), renderComponent($$result, "AdminNavLink", AdminNavLink, { "href": "/admin", "isActive": activeLink === "usuarios", "client:load": true, "client:component-hydration": "load", "client:component-path": "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/components/AdminNavLink", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"> <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path> <circle cx="9" cy="7" r="4"></circle> <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path> <path d="M16 3.13a4 4 0 0 1 0 7.75"></path> </svg> <span>Usuarios</span> ` }), renderComponent($$result, "AdminNavLink", AdminNavLink, { "href": "/admin/planos", "isActive": activeLink === "planos", "client:load": true, "client:component-hydration": "load", "client:component-path": "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/components/AdminNavLink", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"> <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path> <polyline points="14 2 14 8 20 8"></polyline> </svg> <span>Planos</span> ` }), renderComponent($$result, "AdminNavLink", AdminNavLink, { "href": "/admin/subir", "isActive": activeLink === "subir", "client:load": true, "client:component-hydration": "load", "client:component-path": "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/components/AdminNavLink", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path> <polyline points="17 8 12 3 7 8"></polyline> <line x1="12" y1="3" x2="12" y2="15"></line> </svg> <span>Subir Planos</span> ` }), renderComponent($$result, "AdminNavLink", AdminNavLink, { "href": "/admin/planos-por-usuario", "isActive": false, "client:load": true, "client:component-hydration": "load", "client:component-path": "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/components/AdminNavLink", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"> <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path> <circle cx="9" cy="7" r="4"></circle> <path d="M21 11v8"></path> <path d="M17 15h8"></path> </svg> <span>Planos por Usuario</span> ` }), renderComponent($$result, "AdminNavLink", AdminNavLink, { "href": "/admin/configuracion", "isActive": activeLink === "configuracion", "client:load": true, "client:component-hydration": "load", "client:component-path": "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/components/AdminNavLink", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"> <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path> <circle cx="12" cy="12" r="3"></circle> </svg> <span>Configuración</span> ` }), renderSlot($$result, $$slots["default"]), (/* @__PURE__ */ new Date()).getFullYear());
}, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
