/* empty css                                            */
import { c as createComponent, d as createAstro, r as renderComponent, a as renderScript, b as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_dC-6T-Kg.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_78FMoF68.mjs';
import { a as getUsers, d as getPlanosByUserId } from '../../chunks/db_69Mb4jww.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$PlanosPorUsuario = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PlanosPorUsuario;
  let clientes = [];
  try {
    const usuarios = await getUsers();
    clientes = usuarios.filter(
      (usuario) => usuario.tipo && usuario.tipo.toLowerCase() === "cliente"
    );
  } catch (error2) {
    console.error("Error al obtener usuarios:", error2);
  }
  let planosUsuario = [];
  let usuarioSeleccionado = null;
  let error = null;
  const usuarioId = Astro2.url.searchParams.get("usuario");
  if (usuarioId) {
    try {
      planosUsuario = await getPlanosByUserId(parseInt(usuarioId));
      usuarioSeleccionado = clientes.find((cliente) => cliente.id === parseInt(usuarioId)) || null;
    } catch (err) {
      console.error("Error al obtener planos del usuario:", err);
      error = "Error al cargar los planos del usuario. Por favor, int\xE9ntelo de nuevo.";
    }
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Planos por Usuario", "activeLink": "planos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-6"> <div class="flex flex-col gap-2"> <h1 class="text-2xl font-bold tracking-tight">Planos por Usuario</h1> <p class="text-muted-foreground">
Visualice y gestione los planos asignados a cada usuario.
</p> </div> <!-- Selector de usuario --> <div class="rounded-lg border shadow-sm p-6"> <form id="seleccionarUsuarioForm" class="space-y-4"> <div class="space-y-2"> <label for="usuario" class="text-sm font-medium leading-none">Seleccionar Usuario</label> <div class="flex gap-4"> <select id="usuario" name="usuario" class="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"> <option value="">Seleccione un usuario</option> ${clientes.map((cliente) => renderTemplate`<option${addAttribute(cliente.id, "value")}${addAttribute(usuarioSeleccionado && usuarioSeleccionado.id === cliente.id, "selected")}> ${cliente.nombre} (${cliente.email})
</option>`)} </select> <button type="submit" class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
Ver Planos
</button> </div> </div> </form> </div> ${error && renderTemplate`<div class="bg-destructive/15 text-destructive p-4 rounded-md"> <p>${error}</p> </div>`} ${usuarioSeleccionado && renderTemplate`<div class="rounded-lg border shadow-sm"> <div class="p-6"> <h2 class="text-xl font-semibold mb-4">
Planos de ${usuarioSeleccionado.nombre} </h2> ${planosUsuario.length === 0 ? renderTemplate`<p class="text-muted-foreground">Este usuario no tiene planos asignados.</p>` : renderTemplate`<div class="relative w-full overflow-auto"> <table class="w-full caption-bottom text-sm"> <thead class="[&_tr]:border-b"> <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nombre</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tipo</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Fecha</th> <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Acciones</th> </tr> </thead> <tbody class="[&_tr:last-child]:border-0"> ${planosUsuario.map((plano) => renderTemplate`<tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"${addAttribute(plano.id, "data-id")}> <td class="p-4 align-middle">${plano.nombre}</td> <td class="p-4 align-middle">${plano.tipo}</td> <td class="p-4 align-middle">${new Date(plano.fecha_subida).toLocaleDateString()}</td> <td class="p-4 align-middle"> <div class="flex gap-2"> <a${addAttribute(plano.archivo_url, "href")} target="_blank" class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
Ver
</a> <a${addAttribute(`/admin/editar-plano/${plano.id}`, "href")} class="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
Editar
</a> <button type="button" class="eliminar-plano inline-flex h-9 items-center justify-center rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground shadow-sm hover:bg-destructive/90"${addAttribute(plano.id.toString(), "data-id")}${addAttribute(plano.nombre, "data-nombre")}>
Eliminar
</button> </div> </td> </tr>`)} </tbody> </table> </div>`} </div> </div>`} </div> ` })} ${renderScript($$result, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/planos-por-usuario.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/planos-por-usuario.astro", void 0);

const $$file = "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/planos-por-usuario.astro";
const $$url = "/admin/planos-por-usuario";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$PlanosPorUsuario,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
