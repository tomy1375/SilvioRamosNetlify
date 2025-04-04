import { c as createComponent, d as createAstro, b as renderTemplate, r as renderComponent, e as addAttribute, m as maybeRenderHead, f as renderSlot, g as renderHead } from './astro/server_dC-6T-Kg.mjs';
import 'kleur/colors';
import { i as isAuthenticated, T as TransitionLoader } from './TransitionLoader_DvmqssGw.mjs';
/* empty css                             */
import { T as ThemeToggle } from './ThemeToggle_DUU87XCa.mjs';

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$1 = createAstro();
const $$ClienteNavbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClienteNavbar;
  const usuario = isAuthenticated(Astro2.request);
  const links = [
    { href: "/cliente", text: "Mis Planos", active: "planos" },
    { href: "/cliente/historial", text: "Historial", active: "historial" }
  ];
  const { activeLink } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<header class="sticky top-0 z-40 w-full border-b bg-background"> <div class="container flex h-16 items-center justify-between"> <div class="flex items-center gap-2"> <a href="/cliente" class="font-bold text-xl">Gesti\xF3n de Planos</a> </div> <nav class="flex items-center gap-6"> <div class="hidden md:flex gap-6"> ', " </div> ", ` </nav> </div> </header> <script>
 // Manejar el men\xFA de usuario
 const userMenuBtn = document.getElementById('userMenuBtn');
 const userMenu = document.getElementById('userMenu');
 const logoutBtn = document.getElementById('logoutBtn');
 
 if (userMenuBtn && userMenu) {
   userMenuBtn.addEventListener('click', () => {
     userMenu.classList.toggle('hidden');
   });
   
   // Cerrar el men\xFA al hacer clic fuera de \xE9l
   document.addEventListener('click', (event) => {
     if (userMenuBtn && userMenu && event.target instanceof Node) {
       if (!userMenuBtn.contains(event.target) && !userMenu.contains(event.target)) {
         userMenu.classList.add('hidden');
       }
     }
   });
 }
 
 // Manejar el cierre de sesi\xF3n
 if (logoutBtn) {
   logoutBtn.addEventListener('click', (e) => {
     e.preventDefault();
     
     // Establecer la acci\xF3n para el TransitionLoader
     sessionStorage.setItem('navigationAction', 'logout');
     sessionStorage.setItem('navigationTarget', '/login');
     
     // Mostrar manualmente el loader con mensaje personalizado
     const event = new CustomEvent('showLoader', { 
       detail: { message: 'Cerrando sesi\xF3n...' } 
     });
     document.dispatchEvent(event);
     
     // Eliminar la cookie de sesi\xF3n
     document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
     
     // Peque\xF1o retraso para asegurar que el loader se muestre
     setTimeout(() => {
       // Redirigir a la p\xE1gina de inicio de sesi\xF3n
       window.location.href = "/login";
     }, 300);
   });
 }
<\/script>`])), maybeRenderHead(), links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(`text-sm font-medium transition-colors hover:text-primary ${activeLink === link.active ? "text-primary" : "text-muted-foreground"}`, "class")}> ${link.text} </a>`), usuario && renderTemplate`<div class="flex items-center gap-4"> <!-- Usar el ThemeToggle para el cambio de tema --> ${renderComponent($$result, "ThemeToggle", ThemeToggle, { "client:load": true, "client:component-hydration": "load", "client:component-path": "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/components/ThemeToggle", "client:component-export": "default" })} <!-- Menú de usuario --> <div class="relative"> <button id="userMenuBtn" class="flex items-center gap-2 rounded-full text-sm font-medium transition-colors hover:text-primary"> <span>${usuario.nombre}</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"> <path d="m6 9 6 6 6-6"></path> </svg> </button> <div id="userMenu" class="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 hidden dark:bg-gray-800"> <div class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300"> <div class="font-medium">${usuario.nombre}</div> <div class="text-xs text-gray-500 dark:text-gray-400">${usuario.email}</div> </div> <div class="border-t border-gray-100 dark:border-gray-700"></div> <button id="logoutBtn" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Cerrar sesión</button> </div> </div> </div>`);
}, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/components/ClienteNavbar.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$ClienteLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ClienteLayout;
  const usuario = isAuthenticated(Astro2.request);
  if (!usuario || usuario.tipo.toLowerCase() !== "cliente") {
    return Astro2.redirect("/login");
  }
  const { title, activeLink } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', " - Gesti\xF3n de Planos</title><!-- Script para prevenir el parpadeo blanco en modo oscuro --><script>\n      // Aplicar el tema oscuro inmediatamente si es necesario\n      (function() {\n        const savedTheme = localStorage.getItem('theme');\n        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;\n        \n        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {\n          document.documentElement.classList.add('dark');\n          document.documentElement.style.colorScheme = 'dark';\n          // Establecer un color de fondo oscuro para el body inmediatamente\n          document.documentElement.style.backgroundColor = '#1a1a1a';\n        } else {\n          document.documentElement.classList.remove('dark');\n          document.documentElement.style.colorScheme = 'light';\n        }\n      })();\n    <\/script>", '</head> <body class="min-h-screen bg-background"> <!-- Pantalla de carga para transiciones --> ', " ", ' <main class="container py-6"> ', ' </main> <footer class="border-t py-6 md:py-0"> <div class="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row"> <p class="text-sm text-muted-foreground">\n&copy; ', " Gesti\xF3n de Planos. Todos los derechos reservados.\n</p> </div> </footer> </body></html>"])), title, renderHead(), renderComponent($$result, "TransitionLoader", TransitionLoader, { "client:load": true, "client:component-hydration": "load", "client:component-path": "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/components/TransitionLoader", "client:component-export": "default" }), renderComponent($$result, "ClienteNavbar", $$ClienteNavbar, { "activeLink": activeLink }), renderSlot($$result, $$slots["default"]), (/* @__PURE__ */ new Date()).getFullYear());
}, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/layouts/ClienteLayout.astro", void 0);

export { $$ClienteLayout as $ };
