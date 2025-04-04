/* empty css                                         */
import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_dC-6T-Kg.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_Bx8XhnyU.mjs';
export { renderers } from '../renderers.mjs';

const $$Contacto = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contacto - Ingenier\xEDa Civil" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container px-4 md:px-6 py-12 md:py-24"> ${renderComponent($$result2, "ContactPage", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/components/ContactPage", "client:component-export": "default" })} </div> ` })}`;
}, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/contacto.astro", void 0);

const $$file = "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/contacto.astro";
const $$url = "/contacto";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contacto,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
