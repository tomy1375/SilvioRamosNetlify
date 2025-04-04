/* empty css                                            */
import { c as createComponent, r as renderComponent, a as renderScript, b as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_dC-6T-Kg.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_78FMoF68.mjs';
import { a as getUsers } from '../../chunks/db_69Mb4jww.mjs';
export { renderers } from '../../renderers.mjs';

const $$Usuarios = createComponent(async ($$result, $$props, $$slots) => {
  let usuarios = [];
  try {
    console.log("Obteniendo usuarios desde la base de datos...");
    const result = await getUsers();
    console.log(`Se encontraron ${result.length} usuarios en la base de datos`);
    usuarios = result;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Gesti\xF3n de Usuarios", "activeLink": "usuarios" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-6"> <div class="flex items-center justify-between"> <div class="flex flex-col gap-2"> <h1 class="text-2xl font-bold tracking-tight">Gestión de Usuarios</h1> <p class="text-muted-foreground">
Administre los usuarios del sistema.
</p> </div> <a href="/admin/nuevo-usuario" class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4"> <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path> <circle cx="9" cy="7" r="4"></circle> <line x1="19" x2="19" y1="8" y2="14"></line> <line x1="22" x2="16" y1="11" y2="11"></line> </svg>
Nuevo Usuario
</a> </div> <div class="rounded-lg border shadow-sm"> <div class="p-4"> ${usuarios.length === 0 ? renderTemplate`<div class="text-center py-8"> <p class="text-muted-foreground">No hay usuarios disponibles. Cree su primer usuario.</p> </div>` : renderTemplate`<div class="relative w-full overflow-auto"> <table class="w-full caption-bottom text-sm"> <thead class="[&_tr]:border-b"> <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nombre</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tipo</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Empresa</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Acciones</th> </tr> </thead> <tbody id="usuariosTableBody" class="[&_tr:last-child]:border-0"> ${usuarios.map((usuario) => renderTemplate`<tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted usuario-row"${addAttribute(usuario.id.toString(), "data-id")}> <td class="p-4 align-middle">${usuario.id}</td> <td class="p-4 align-middle">${usuario.nombre}</td> <td class="p-4 align-middle">${usuario.email}</td> <td class="p-4 align-middle">${usuario.tipo}</td> <td class="p-4 align-middle">${usuario.empresa || "-"}</td> <td class="p-4 align-middle"> <div class="flex gap-2"> <a${addAttribute(`/admin/editar-usuario/${usuario.id}`, "href")} class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
Editar
</a> <button type="button" class="eliminar-usuario inline-flex h-9 items-center justify-center rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground shadow-sm hover:bg-destructive/90"${addAttribute(usuario.id.toString(), "data-id")}${addAttribute(usuario.nombre, "data-nombre")}>
Eliminar
</button> </div> </td> </tr>`)} </tbody> </table> </div>`} </div> </div> </div> ` })} ${renderScript($$result, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/usuarios.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/usuarios.astro", void 0);

const $$file = "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/usuarios.astro";
const $$url = "/admin/usuarios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Usuarios,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
