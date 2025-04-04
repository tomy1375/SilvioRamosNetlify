/* empty css                                               */
import { c as createComponent, d as createAstro, b as renderTemplate, h as defineScriptVars, r as renderComponent, m as maybeRenderHead, e as addAttribute } from '../../../chunks/astro/server_dC-6T-Kg.mjs';
import 'kleur/colors';
import { $ as $$ClienteLayout } from '../../../chunks/ClienteLayout_C5zfv1x7.mjs';
import { g as getPlanoById } from '../../../chunks/db_69Mb4jww.mjs';
import { i as isAuthenticated } from '../../../chunks/TransitionLoader_DvmqssGw.mjs';
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const usuario = isAuthenticated(Astro2.request);
  if (!usuario || usuario.tipo.toLowerCase() !== "cliente") {
    return Astro2.redirect("/login");
  }
  const { id } = Astro2.params;
  let plano = null;
  let error = null;
  try {
    if (id) {
      const result = await getPlanoById(parseInt(id));
      plano = result;
      if (!plano || plano.usuario_id !== usuario.id) {
        error = "No tiene acceso a este plano o el plano no existe.";
        plano = null;
      }
    } else {
      error = "ID de plano no proporcionado";
    }
  } catch (err) {
    console.error("Error al obtener plano:", err);
    error = "Error al cargar el plano. Por favor, int\xE9ntelo de nuevo m\xE1s tarde.";
  }
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", "\n  // Funci\xF3n para registrar la descarga en el historial\n  async function registrarDescarga(planoId, userId) {\n    try {\n      console.log(`Registrando descarga: plano=${planoId}, usuario=${userId}`);\n      \n      const response = await fetch('/api/registrar-descarga', {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json',\n        },\n        body: JSON.stringify({\n          plano_id: planoId,\n          usuario_id: userId\n        }),\n      });\n      \n      const data = await response.json();\n      console.log('Respuesta del servidor:', data);\n      \n      if (!data.success) {\n        console.error('Error al registrar descarga:', data.error);\n      }\n    } catch (error) {\n      console.error('Error al registrar descarga:', error);\n    }\n  }\n  \n  // Agregar event listeners a todos los botones de descarga\n  document.addEventListener('DOMContentLoaded', () => {\n    const downloadButtons = document.querySelectorAll('.download-btn');\n    \n    downloadButtons.forEach(button => {\n      button.addEventListener('click', function(e) {\n        // No prevenir el comportamiento predeterminado para permitir la descarga\n        const planoId = this.getAttribute('data-plano-id');\n        const userId = this.getAttribute('data-usuario-id') || usuarioId;\n        \n        // Registrar la descarga\n        registrarDescarga(planoId, userId);\n      });\n    });\n  });\n})();<\/script>"], ["", " <script>(function(){", "\n  // Funci\xF3n para registrar la descarga en el historial\n  async function registrarDescarga(planoId, userId) {\n    try {\n      console.log(\\`Registrando descarga: plano=\\${planoId}, usuario=\\${userId}\\`);\n      \n      const response = await fetch('/api/registrar-descarga', {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json',\n        },\n        body: JSON.stringify({\n          plano_id: planoId,\n          usuario_id: userId\n        }),\n      });\n      \n      const data = await response.json();\n      console.log('Respuesta del servidor:', data);\n      \n      if (!data.success) {\n        console.error('Error al registrar descarga:', data.error);\n      }\n    } catch (error) {\n      console.error('Error al registrar descarga:', error);\n    }\n  }\n  \n  // Agregar event listeners a todos los botones de descarga\n  document.addEventListener('DOMContentLoaded', () => {\n    const downloadButtons = document.querySelectorAll('.download-btn');\n    \n    downloadButtons.forEach(button => {\n      button.addEventListener('click', function(e) {\n        // No prevenir el comportamiento predeterminado para permitir la descarga\n        const planoId = this.getAttribute('data-plano-id');\n        const userId = this.getAttribute('data-usuario-id') || usuarioId;\n        \n        // Registrar la descarga\n        registrarDescarga(planoId, userId);\n      });\n    });\n  });\n})();<\/script>"])), renderComponent($$result, "ClienteLayout", $$ClienteLayout, { "title": plano ? plano.nombre : "Detalle de Plano", "activeLink": "planos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-6"> <div class="flex items-center gap-2"> <a href="/cliente" class="text-primary hover:underline flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-1"> <path d="m15 18-6-6 6-6"></path> </svg>
Volver a Mis Planos
</a> </div> ${error && renderTemplate`<div class="bg-destructive/15 text-destructive p-4 rounded-md"> <p>${error}</p> </div>`} ${plano && renderTemplate`<div class="rounded-lg border shadow-sm"> <div class="p-6"> <h1 class="text-2xl font-bold tracking-tight mb-4">${plano.nombre}</h1> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"> <div> <h2 class="text-lg font-semibold mb-2">Información del Plano</h2> <dl class="space-y-2"> <div class="flex flex-col"> <dt class="text-sm font-medium text-muted-foreground">Tipo</dt> <dd>${plano.tipo}</dd> </div> <div class="flex flex-col"> <dt class="text-sm font-medium text-muted-foreground">Fecha de Subida</dt> <dd>${new Date(plano.fecha_subida).toLocaleDateString()}</dd> </div> </dl> </div> <div> <h2 class="text-lg font-semibold mb-2">Descripción</h2> <div class="max-h-60 overflow-auto rounded-md p-2 bg-muted/20"> <p class="text-muted-foreground break-words whitespace-pre-wrap">${plano.descripcion || "Sin descripci\xF3n"}</p> </div> </div> </div> <div class="flex justify-center"> <a${addAttribute(plano.archivo_url, "href")} target="_blank" class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 download-btn"${addAttribute(plano.id, "data-plano-id")}${addAttribute(usuario.id, "data-usuario-id")}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-5 w-5"> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path> <polyline points="7 10 12 15 17 10"></polyline> <line x1="12" y1="15" x2="12" y2="3"></line> </svg>
Descargar Plano
</a> </div> </div> </div>`} </div> ` }), defineScriptVars({ usuarioId: usuario.id }));
}, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/cliente/plano/[id].astro", void 0);

const $$file = "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/cliente/plano/[id].astro";
const $$url = "/cliente/plano/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
