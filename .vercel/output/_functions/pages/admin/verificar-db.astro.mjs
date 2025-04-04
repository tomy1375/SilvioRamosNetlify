/* empty css                                            */
import { c as createComponent, r as renderComponent, a as renderScript, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_dC-6T-Kg.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_78FMoF68.mjs';
export { renderers } from '../../renderers.mjs';

const $$VerificarDb = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Verificar Base de Datos", "activeLink": "configuracion" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-6"> <div class="flex flex-col gap-2"> <h1 class="text-2xl font-bold tracking-tight">Verificar Base de Datos</h1> <p class="text-muted-foreground">
Herramienta para verificar la estructura y datos de la base de datos.
</p> </div> <div class="rounded-lg border shadow-sm"> <div class="p-6"> <h2 class="text-xl font-semibold mb-4">Información de Tablas</h2> <div id="db-info" class="space-y-4"> <p>Cargando información de la base de datos...</p> </div> <div class="mt-6"> <button id="refresh-btn" class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
Actualizar Información
</button> </div> </div> </div> </div> ` })} ${renderScript($$result, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/verificar-db.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/verificar-db.astro", void 0);

const $$file = "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/verificar-db.astro";
const $$url = "/admin/verificar-db";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$VerificarDb,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
