/* empty css                                         */
import { c as createComponent, r as renderComponent, a as renderScript, b as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_dC-6T-Kg.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_78FMoF68.mjs';
import { c as getPlanos, a as getUsers } from '../chunks/db_69Mb4jww.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let totalPlanos = 0;
  let totalUsuarios = 0;
  let ultimosPlanos = [];
  let clientes = [];
  try {
    const planos = await getPlanos();
    totalPlanos = planos.length;
    ultimosPlanos = planos.slice(0, 5);
    const usuarios = await getUsers();
    totalUsuarios = usuarios.length;
    clientes = usuarios.filter(
      (usuario) => usuario.tipo && usuario.tipo.toLowerCase() === "cliente"
    ).slice(0, 5);
  } catch (error) {
    console.error("Error al obtener estad\xEDsticas:", error);
  }
  return renderTemplate`<!-- Cambiamos activeLink a "planos" que es uno de los valores permitidos -->${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard", "activeLink": "planos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-6"> <div class="flex flex-col gap-2"> <h1 class="text-2xl font-bold tracking-tight">Dashboard</h1> <p class="text-muted-foreground">
Bienvenido al panel de administración.
</p> </div> <!-- Tarjetas de estadísticas --> <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4"> <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6"> <div class="flex flex-col space-y-1.5"> <h3 class="text-sm font-medium text-muted-foreground">Total de Planos</h3> <div class="text-2xl font-bold">${totalPlanos}</div> </div> </div> <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6"> <div class="flex flex-col space-y-1.5"> <h3 class="text-sm font-medium text-muted-foreground">Total de Usuarios</h3> <div class="text-2xl font-bold">${totalUsuarios}</div> </div> </div> <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6"> <div class="flex flex-col space-y-1.5"> <h3 class="text-sm font-medium text-muted-foreground">Descargas Hoy</h3> <div class="text-2xl font-bold">0</div> </div> </div> <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6"> <div class="flex flex-col space-y-1.5"> <h3 class="text-sm font-medium text-muted-foreground">Planos Esta Semana</h3> <div class="text-2xl font-bold">0</div> </div> </div> </div> <!-- Últimos planos --> <div class="rounded-lg border shadow-sm"> <div class="p-6"> <div class="flex items-center justify-between mb-4"> <h2 class="text-xl font-semibold">Últimos Planos Subidos</h2> <a href="/admin/planos" class="text-sm text-primary hover:underline">
Ver todos los planos
</a> </div> ${ultimosPlanos.length === 0 ? renderTemplate`<p class="text-muted-foreground">No hay planos disponibles.</p>` : renderTemplate`<div class="relative w-full overflow-auto"> <table class="w-full caption-bottom text-sm"> <thead class="[&_tr]:border-b"> <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nombre</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Cliente</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tipo</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Fecha</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Acciones</th> </tr> </thead> <tbody class="[&_tr:last-child]:border-0"> ${ultimosPlanos.map((plano) => renderTemplate`<tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"> <td class="p-4 align-middle">${plano.nombre}</td> <td class="p-4 align-middle">${plano.cliente_nombre || `ID: ${plano.usuario_id}`}</td> <td class="p-4 align-middle">${plano.tipo}</td> <td class="p-4 align-middle">${new Date(plano.fecha_subida).toLocaleDateString()}</td> <td class="p-4 align-middle"> <div class="flex gap-2"> <a${addAttribute(plano.archivo_url, "href")} target="_blank" class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
Ver
</a> <a${addAttribute(`/admin/editar-plano/${plano.id}`, "href")} class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
Editar
</a> </div> </td> </tr>`)} </tbody> </table> </div>`} </div> </div> <!-- Clientes --> <div class="rounded-lg border shadow-sm"> <div class="p-6"> <div class="flex items-center justify-between mb-4"> <h2 class="text-xl font-semibold">Clientes</h2> <div class="flex gap-2"> <a href="/admin/usuarios" class="text-sm text-primary hover:underline">
Ver todos los usuarios
</a> <a href="/admin/nuevo-usuario" class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4"> <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path> <circle cx="9" cy="7" r="4"></circle> <line x1="19" x2="19" y1="8" y2="14"></line> <line x1="22" x2="16" y1="11" y2="11"></line> </svg>
Nuevo Usuario
</a> </div> </div> ${clientes.length === 0 ? renderTemplate`<p class="text-muted-foreground">No hay clientes disponibles.</p>` : renderTemplate`<div class="relative w-full overflow-auto"> <table class="w-full caption-bottom text-sm"> <thead class="[&_tr]:border-b"> <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nombre</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Empresa</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Acciones</th> </tr> </thead> <tbody id="clientesTableBody" class="[&_tr:last-child]:border-0"> ${clientes.map((cliente) => renderTemplate`<tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cliente-row"${addAttribute(cliente.id.toString(), "data-id")}> <td class="p-4 align-middle">${cliente.id}</td> <td class="p-4 align-middle">${cliente.nombre}</td> <td class="p-4 align-middle">${cliente.email}</td> <td class="p-4 align-middle">${cliente.empresa || "-"}</td> <td class="p-4 align-middle"> <div class="flex gap-2"> <a${addAttribute(`/admin/editar-usuario/${cliente.id}`, "href")} class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
Editar
</a> <button type="button" class="eliminar-usuario inline-flex h-9 items-center justify-center rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground shadow-sm hover:bg-destructive/90"${addAttribute(cliente.id.toString(), "data-id")}${addAttribute(cliente.nombre, "data-nombre")}>
Eliminar
</button> </div> </td> </tr>`)} </tbody> </table> </div>`} </div> </div> </div> ` })} <!-- Incluir SweetAlert2 --> ${renderScript($$result, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/index.astro?astro&type=script&index=1&lang.ts")}`;
}, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/index.astro", void 0);

const $$file = "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
