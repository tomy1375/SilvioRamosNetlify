/* empty css                                            */
import { c as createComponent, d as createAstro, b as renderTemplate, h as defineScriptVars, r as renderComponent, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_dC-6T-Kg.mjs';
import 'kleur/colors';
import { $ as $$ClienteLayout } from '../../chunks/ClienteLayout_C5zfv1x7.mjs';
import { m as getHistorialByUserId } from '../../chunks/db_69Mb4jww.mjs';
import { i as isAuthenticated } from '../../chunks/TransitionLoader_DvmqssGw.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Historial = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Historial;
  const usuario = isAuthenticated(Astro2.request);
  if (!usuario || usuario.tipo.toLowerCase() !== "cliente") {
    return Astro2.redirect("/login");
  }
  let historial = [];
  let error = null;
  try {
    console.log(`Obteniendo historial para el usuario ${usuario.id} (${usuario.nombre})`);
    const result = await getHistorialByUserId(usuario.id);
    historial = result;
    console.log(`Se encontraron ${historial.length} registros de historial para el usuario ${usuario.id}`);
    console.log("Historial:", historial);
  } catch (err) {
    console.error("Error al obtener historial:", err);
    error = "Error al cargar el historial. Por favor, int\xE9ntelo de nuevo m\xE1s tarde.";
  }
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", "\n  // Funci\xF3n para registrar la descarga en el historial\n  async function registrarDescarga(planoId, userId) {\n    try {\n      console.log(`Registrando descarga: plano=${planoId}, usuario=${userId}`);\n      \n      const response = await fetch('/api/registrar-descarga', {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json',\n        },\n        body: JSON.stringify({\n          plano_id: planoId,\n          usuario_id: userId\n        }),\n      });\n      \n      const data = await response.json();\n      console.log('Respuesta del servidor:', data);\n      \n      if (!data.success) {\n        console.error('Error al registrar descarga:', data.error);\n      }\n    } catch (error) {\n      console.error('Error al registrar descarga:', error);\n    }\n  }\n  \n  // Agregar event listeners a todos los botones de descarga\n  document.addEventListener('DOMContentLoaded', () => {\n    const downloadButtons = document.querySelectorAll('.download-btn');\n    \n    downloadButtons.forEach(button => {\n      button.addEventListener('click', function(e) {\n        // No prevenir el comportamiento predeterminado para permitir la descarga\n        const planoId = this.getAttribute('data-plano-id');\n        const userId = this.getAttribute('data-usuario-id') || usuarioId;\n        \n        // Registrar la descarga\n        registrarDescarga(planoId, userId);\n      });\n    });\n    \n    // Agregar event listener al bot\xF3n de actualizar\n    const refreshBtn = document.getElementById('refresh-btn');\n    if (refreshBtn) {\n      refreshBtn.addEventListener('click', function() {\n        window.location.reload();\n      });\n    }\n  });\n})();<\/script>"], ["", " <script>(function(){", "\n  // Funci\xF3n para registrar la descarga en el historial\n  async function registrarDescarga(planoId, userId) {\n    try {\n      console.log(\\`Registrando descarga: plano=\\${planoId}, usuario=\\${userId}\\`);\n      \n      const response = await fetch('/api/registrar-descarga', {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json',\n        },\n        body: JSON.stringify({\n          plano_id: planoId,\n          usuario_id: userId\n        }),\n      });\n      \n      const data = await response.json();\n      console.log('Respuesta del servidor:', data);\n      \n      if (!data.success) {\n        console.error('Error al registrar descarga:', data.error);\n      }\n    } catch (error) {\n      console.error('Error al registrar descarga:', error);\n    }\n  }\n  \n  // Agregar event listeners a todos los botones de descarga\n  document.addEventListener('DOMContentLoaded', () => {\n    const downloadButtons = document.querySelectorAll('.download-btn');\n    \n    downloadButtons.forEach(button => {\n      button.addEventListener('click', function(e) {\n        // No prevenir el comportamiento predeterminado para permitir la descarga\n        const planoId = this.getAttribute('data-plano-id');\n        const userId = this.getAttribute('data-usuario-id') || usuarioId;\n        \n        // Registrar la descarga\n        registrarDescarga(planoId, userId);\n      });\n    });\n    \n    // Agregar event listener al bot\xF3n de actualizar\n    const refreshBtn = document.getElementById('refresh-btn');\n    if (refreshBtn) {\n      refreshBtn.addEventListener('click', function() {\n        window.location.reload();\n      });\n    }\n  });\n})();<\/script>"])), renderComponent($$result, "ClienteLayout", $$ClienteLayout, { "title": "Historial de Descargas", "activeLink": "historial" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-6"> <div class="flex flex-col gap-2"> <h1 class="text-2xl font-bold tracking-tight">Historial de Descargas</h1> <p class="text-muted-foreground">
Bienvenido, ${usuario.nombre}. Vea un registro de todos los planos que ha descargado.
</p> </div> ${error && renderTemplate`<div class="bg-destructive/15 text-destructive p-4 rounded-md"> <p>${error}</p> </div>`} <div class="rounded-lg border shadow-sm"> <div class="p-4"> ${historial.length === 0 ? renderTemplate`<div class="text-center py-8"> <p class="text-muted-foreground">Aún no ha descargado ningún plano. Visite la sección "Mis Planos" para ver los planos disponibles.</p> </div>` : renderTemplate`<div class="relative w-full overflow-auto"> <table class="w-full caption-bottom text-sm"> <thead class="[&_tr]:border-b"> <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Fecha</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Hora</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nombre del Plano</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tipo</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Acción</th> </tr> </thead> <tbody class="[&_tr:last-child]:border-0"> ${historial.map((item) => renderTemplate`<tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"> <td class="p-4 align-middle">${new Date(item.fecha).toLocaleDateString()}</td> <td class="p-4 align-middle">${item.hora}</td> <td class="p-4 align-middle">${item.nombre}</td> <td class="p-4 align-middle">${item.tipo}</td> <td class="p-4 align-middle"> <a${addAttribute(item.archivo_url, "href")} target="_blank" class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 download-btn"${addAttribute(item.plano_id, "data-plano-id")}${addAttribute(usuario.id, "data-usuario-id")}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4"> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path> <polyline points="7 10 12 15 17 10"></polyline> <line x1="12" y1="15" x2="12" y2="3"></line> </svg>
Descargar de nuevo
</a> </td> </tr>`)} </tbody> </table> </div>`} </div> </div> <div class="flex justify-center"> <button id="refresh-btn" class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4"> <path d="M21 2v6h-6"></path> <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path> <path d="M3 22v-6h6"></path> <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path> </svg>
Actualizar historial
</button> </div> </div> ` }), defineScriptVars({ usuarioId: usuario.id }));
}, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/cliente/historial.astro", void 0);

const $$file = "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/cliente/historial.astro";
const $$url = "/cliente/historial";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Historial,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
