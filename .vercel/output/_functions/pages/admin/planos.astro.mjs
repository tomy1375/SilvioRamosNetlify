/* empty css                                            */
import { c as createComponent, r as renderComponent, a as renderScript, b as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_dC-6T-Kg.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_78FMoF68.mjs';
import { c as getPlanos } from '../../chunks/db_69Mb4jww.mjs';
export { renderers } from '../../renderers.mjs';

const $$Planos = createComponent(async ($$result, $$props, $$slots) => {
  let planos = [];
  try {
    const result = await getPlanos();
    planos = result;
  } catch (error) {
    console.error("Error al obtener planos:", error);
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Gesti\xF3n de Planos", "activeLink": "planos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-6"> <div class="flex items-center justify-between"> <div class="flex flex-col gap-2"> <h1 class="text-2xl font-bold tracking-tight">Gestión de Planos</h1> <p class="text-muted-foreground">
Administre los planos disponibles para los clientes.
</p> </div> <a href="/admin/subir" class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4"> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path> <polyline points="17 8 12 3 7 8"></polyline> <line x1="12" y1="3" x2="12" y2="15"></line> </svg>
Subir Plano
</a> </div> <!-- Filtros de búsqueda --> <div class="rounded-lg border shadow-sm p-4"> <div class="flex flex-col md:flex-row gap-4"> <div class="flex-1"> <label for="buscarNombre" class="text-sm font-medium mb-1 block">Buscar por nombre de plano</label> <input type="text" id="buscarNombre" placeholder="Nombre del plano..." class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"> </div> <div class="flex-1"> <label for="buscarCliente" class="text-sm font-medium mb-1 block">Buscar por nombre de cliente</label> <input type="text" id="buscarCliente" placeholder="Nombre del cliente..." class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"> </div> <div class="flex-1"> <label for="filtrarTipo" class="text-sm font-medium mb-1 block">Filtrar por tipo</label> <select id="filtrarTipo" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"> <option value="">Todos los tipos</option> <option value="Arquitectónico">Arquitectónico</option> <option value="Estructural">Estructural</option> <option value="Eléctrico">Eléctrico</option> <option value="Hidráulico">Hidráulico</option> <option value="Sanitario">Sanitario</option> <option value="Otro">Otro</option> </select> </div> </div> </div> <div class="rounded-lg border shadow-sm"> <div class="p-4"> ${planos.length === 0 ? renderTemplate`<div class="text-center py-8"> <p class="text-muted-foreground">No hay planos disponibles. Sube tu primer plano.</p> </div>` : renderTemplate`<div class="relative w-full overflow-auto"> <table class="w-full caption-bottom text-sm"> <thead class="[&_tr]:border-b"> <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nombre</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Cliente</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tipo</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Fecha Subida</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Acciones</th> </tr> </thead> <tbody id="planosTableBody" class="[&_tr:last-child]:border-0"> ${planos.map((plano) => renderTemplate`<tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted plano-row"${addAttribute(plano.nombre.toLowerCase(), "data-nombre")}${addAttribute(plano.cliente_nombre ? plano.cliente_nombre.toLowerCase() : "", "data-cliente")}${addAttribute(plano.tipo.toLowerCase(), "data-tipo")}${addAttribute(plano.id.toString(), "data-id")}> <td class="p-4 align-middle">${plano.nombre}</td> <td class="p-4 align-middle">${plano.cliente_nombre || `ID: ${plano.usuario_id}`}</td> <td class="p-4 align-middle">${plano.tipo}</td> <td class="p-4 align-middle">${new Date(plano.fecha_subida).toLocaleDateString()}</td> <td class="p-4 align-middle"> <div class="flex gap-2"> <a${addAttribute(plano.archivo_url, "href")} target="_blank" class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
Ver
</a> <a${addAttribute(`/admin/editar-plano/${plano.id}`, "href")} class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
Editar
</a> <button type="button" class="eliminar-plano inline-flex h-9 items-center justify-center rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground shadow-sm hover:bg-destructive/90"${addAttribute(plano.id.toString(), "data-id")}${addAttribute(plano.nombre, "data-nombre")}>
Eliminar
</button> </div> </td> </tr>`)} </tbody> </table> <!-- Mensaje cuando no hay resultados de búsqueda --> <div id="noResultados" class="hidden text-center py-8"> <p class="text-muted-foreground">No se encontraron planos que coincidan con los criterios de búsqueda.</p> </div> </div>`} </div> </div> </div> ` })} ${renderScript($$result, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/planos.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/planos.astro", void 0);

const $$file = "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/planos.astro";
const $$url = "/admin/planos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Planos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
