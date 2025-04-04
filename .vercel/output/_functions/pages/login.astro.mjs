/* empty css                                         */
import { c as createComponent, d as createAstro, r as renderComponent, a as renderScript, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_dC-6T-Kg.mjs';
import 'kleur/colors';
import pkg from 'pg';
import { l as login, T as TransitionLoader } from '../chunks/TransitionLoader_DvmqssGw.mjs';
import { $ as $$Layout } from '../chunks/Layout_Bx8XhnyU.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const { Pool } = pkg;
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "ingecivil",
    password: String("admin"),
    port: Number.parseInt("5432"),
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
  });
  let error = null;
  let redirectUrl = "";
  if (Astro2.request.method === "POST") {
    try {
      const formData = await Astro2.request.formData();
      const email = formData.get("email");
      const password = formData.get("password");
      if (!email || !password) {
        error = "Por favor, complete todos los campos";
      } else {
        const result = await login(email.toString(), password.toString(), pool);
        if (result.success) {
          const sessionData = JSON.stringify(result.usuario);
          const cookieOptions = "Path=/; HttpOnly; SameSite=Strict; Max-Age=86400";
          redirectUrl = result.redirect || "/cliente";
          return new Response(
            `<html>
    <head>
      <meta http-equiv="refresh" content="0;url=${redirectUrl}">
      <script>
        // Establecer el mensaje para el TransitionLoader
        sessionStorage.setItem('navigationAction', 'login');
        sessionStorage.setItem('navigationTarget', '${redirectUrl}');
        
        // Aplicar el tema oscuro inmediatamente si es necesario
        (function() {
          const savedTheme = localStorage.getItem('theme');
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          
          if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
            document.documentElement.style.backgroundColor = '#1a1a1a';
          }
        })();
        
        // Mostrar el loader con mensaje específico
        document.addEventListener('DOMContentLoaded', function() {
          const event = new CustomEvent('showLoader', { 
            detail: { message: 'Iniciando sesión...' } 
          });
          document.dispatchEvent(event);
        });
      </script>
    </head>
    <body style="visibility: hidden; background-color: #1a1a1a;">
      <div id="loader" style="position: fixed; inset: 0; z-index: 50; display: flex; align-items: center; justify-content: center; background-color: rgba(17, 24, 39, 0.9); visibility: visible;">
        <div style="text-align: center;">
          <div style="display: inline-block; width: 3rem; height: 3rem; border-radius: 9999px; border: 4px solid; border-color: #0284c7; border-top-color: transparent; animation: spin 1s linear infinite;"></div>
          <p style="margin-top: 1rem; font-size: 1.125rem; font-weight: 500; color: white;">Iniciando sesión...</p>
        </div>
      </div>
      <style>
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    </body>
  </html>`,
            {
              status: 200,
              headers: {
                "Content-Type": "text/html",
                "Set-Cookie": `session=${encodeURIComponent(sessionData)}; ${cookieOptions}`
              }
            }
          );
        } else {
          error = result.error;
        }
      }
    } catch (err) {
      console.error("Error en el inicio de sesión:", err);
      error = "Error al procesar la solicitud. Por favor, inténtelo de nuevo.";
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Acceso Clientes", "data-astro-cid-sgpqyurt": true }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "TransitionLoader", TransitionLoader, { "client:load": true, "client:component-hydration": "load", "client:component-path": "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/components/TransitionLoader", "client:component-export": "default", "data-astro-cid-sgpqyurt": true })} ${maybeRenderHead()}<main id="login-container" class="min-h-screen flex items-center justify-center py-12" data-astro-cid-sgpqyurt> <div id="login-box" class="backdrop-blur-sm shadow-xl rounded-2xl p-12 max-w-md w-full space-y-8" data-astro-cid-sgpqyurt> <div class="text-center space-y-4" data-astro-cid-sgpqyurt> <h1 id="login-title" class="text-4xl font-bold tracking-tight mb-4 mt-16 md:mt-0" data-astro-cid-sgpqyurt>Acceso Clientes</h1> <p id="login-subtitle" class="text-lg" data-astro-cid-sgpqyurt>
Ingrese sus credenciales para acceder a su cuenta
</p> </div> ${error && renderTemplate`<div class="bg-destructive/15 text-destructive p-4 rounded-md mb-4" data-astro-cid-sgpqyurt> <p data-astro-cid-sgpqyurt>${error}</p> </div>`} <form id="loginForm" method="POST" class="space-y-6" data-astro-cid-sgpqyurt> <div class="space-y-2" data-astro-cid-sgpqyurt> <label for="email" class="block text-sm font-medium" data-astro-cid-sgpqyurt>Email</label> <input type="email" id="email" name="email" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="correo@ejemplo.com" data-astro-cid-sgpqyurt> </div> <div class="space-y-2" data-astro-cid-sgpqyurt> <label for="password" class="block text-sm font-medium" data-astro-cid-sgpqyurt>Contraseña</label> <input type="password" id="password" name="password" required class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="••••••••" data-astro-cid-sgpqyurt> </div> <div class="flex items-center justify-between" data-astro-cid-sgpqyurt> <div class="flex items-center" data-astro-cid-sgpqyurt> <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary transition-all" data-astro-cid-sgpqyurt> <label for="remember-me" class="ml-2 block text-sm " data-astro-cid-sgpqyurt>
Recordarme
</label> </div> <div class="text-sm" data-astro-cid-sgpqyurt> <a href="#" class="font-medium text-primary hover:text-primary/80 transition-colors" data-astro-cid-sgpqyurt>
¿Olvidó su contraseña?
</a> </div> </div> <button type="submit" id="submitBtn" class="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-astro-cid-sgpqyurt>
Iniciar Sesión
</button> </form> </div> </main> ` })} ${renderScript($$result, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/login.astro?astro&type=script&index=0&lang.ts")} `;
}, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/login.astro", void 0);
const $$file = "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
