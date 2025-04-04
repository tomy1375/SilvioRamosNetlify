/* empty css                                         */
import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, a as renderScript, e as addAttribute } from '../chunks/astro/server_dC-6T-Kg.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_Bx8XhnyU.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

function ProjectModal({ projects }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const lockScroll = () => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflowY = "scroll";
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  };
  const unlockScroll = () => {
    const scrollY = parseInt(document.body.style.top || "0") * -1;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.overflowY = "";
    document.body.style.paddingRight = "";
    window.scrollTo(0, scrollY);
  };
  useEffect(() => {
    const handleOpenModal = (event) => {
      const { projectId } = event.detail;
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        lockScroll();
        setCurrentProject(project);
        setIsOpen(true);
      }
    };
    document.addEventListener("openProjectModal", handleOpenModal);
    return () => document.removeEventListener("openProjectModal", handleOpenModal);
  }, [projects]);
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      unlockScroll();
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? "animate-fade-out" : "animate-fade-in"}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/70 backdrop-blur-sm", onClick: closeModal }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden ${isClosing ? "animate-scale-out" : "animate-scale-in"}`,
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: closeModal,
                  className: "absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-gray-800 dark:text-white backdrop-blur-sm transition-colors hover:bg-white/20",
                  "aria-label": "Cerrar",
                  children: /* @__PURE__ */ jsxs(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "24",
                      height: "24",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      children: [
                        /* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }),
                        /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })
                      ]
                    }
                  )
                }
              ),
              currentProject && /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row", children: [
                /* @__PURE__ */ jsx("div", { className: "md:w-1/2", children: /* @__PURE__ */ jsx("div", { className: "relative h-full", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: currentProject.image || "/placeholder.svg",
                    alt: currentProject.title,
                    className: "w-full h-full object-cover aspect-square md:aspect-auto"
                  }
                ) }) }),
                /* @__PURE__ */ jsxs("div", { className: "md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto max-h-[80vh]", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4", children: currentProject.title }),
                  /* @__PURE__ */ jsx("div", { className: "prose dark:prose-invert max-w-none flex-grow", children: /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300", children: currentProject.description }) }),
                  /* @__PURE__ */ jsx("div", { className: "mt-6 pt-6 border-t border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: closeModal,
                      className: "w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors",
                      children: "Cerrar"
                    }
                  ) })
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}

const $$Proyectos = createComponent(($$result, $$props, $$slots) => {
  const projects = [
    {
      id: 1,
      title: "Monumento del Bicentenario - Jujuy",
      description: "Proyecto de ingenier\xEDa que integra an\xE1lisis estructural y dise\xF1o de cimentaci\xF3n para una estructura de 30 m. Ubicada junto a la nueva terminal de \xF3mnibus. Incorpora un sistema de iluminaci\xF3n inteligente para realzar su impacto urbano y cultural.",
      image: "monumento.webp"
    },
    {
      id: 2,
      title: "Shopping Annuar",
      description: "Proyecto integral de ingenier\xEDa y arquitectura para el dise\xF1o y construcci\xF3n de un centro comercial. Incluy\xF3 an\xE1lisis estructural, dise\xF1o de cimentaciones y optimizaci\xF3n de flujos peatonales y vehiculares, impulsando la dinamizaci\xF3n de la zona.",
      image: "shop.webp"
    },
    {
      id: 3,
      title: "Sistema de Drenaje",
      description: "Dise\xF1o e implementaci\xF3n de sistema de drenaje urbano. Este proyecto resolvi\xF3 problemas hist\xF3ricos de inundaciones en un \xE1rea residencial, implementando soluciones innovadoras de captaci\xF3n y conducci\xF3n de aguas pluviales que respetan el medio ambiente.",
      image: "/1.jpg"
    },
    {
      id: 4,
      title: "Complejo Residencial",
      description: "Dise\xF1o estructural para complejo de apartamentos. Este desarrollo residencial incluye 120 unidades distribuidas en 5 edificios, con \xE1reas comunes, estacionamientos subterr\xE1neos y espacios verdes. El dise\xF1o estructural garantiza seguridad y durabilidad.",
      image: "/2.jpg"
    },
    {
      id: 5,
      title: "Carretera Regional",
      description: "Dise\xF1o y supervisi\xF3n de construcci\xF3n de carretera. Este proyecto de 45 km conecta varias comunidades rurales, mejorando el acceso a servicios esenciales y fomentando el desarrollo econ\xF3mico de la regi\xF3n. Incluye puentes, sistemas de drenaje y se\xF1alizaci\xF3n completa.",
      image: "/3.jpg"
    },
    {
      id: 6,
      title: "Planta de Tratamiento",
      description: "Dise\xF1o de planta de tratamiento de aguas residuales. Esta instalaci\xF3n procesa hasta 500,000 litros diarios, utilizando tecnolog\xEDas avanzadas de tratamiento biol\xF3gico y qu\xEDmico para devolver agua limpia al medio ambiente, cumpliendo con todas las normativas ambientales.",
      image: "/4.jpg"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Nuestros Proyectos", "data-astro-cid-arbd3op2": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="modal-container" data-astro-cid-arbd3op2></div> <section class="w-full py-12 md:py-24 lg:py-32 mt-" data-astro-cid-arbd3op2> <div class="container px-4 md:px-6" data-astro-cid-arbd3op2> <div class="flex flex-col items-center justify-center space-y-4 text-center" data-astro-cid-arbd3op2> <div class="space-y-2" data-astro-cid-arbd3op2> <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl mt-16 md:mt-0" data-astro-cid-arbd3op2>Nuestros Proyectos</h1> <p class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed" data-astro-cid-arbd3op2>
Explore nuestra cartera de proyectos completados y en curso.
</p> </div> </div> <div class="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3" data-astro-cid-arbd3op2> ${projects.map((project) => renderTemplate`<div class="group relative overflow-hidden rounded-lg border cursor-pointer project-card"${addAttribute(project.id, "data-project-id")} data-astro-cid-arbd3op2> <div class="w-full aspect-[4/3] overflow-hidden" data-astro-cid-arbd3op2> <img${addAttribute(project.image || "/placeholder.svg", "src")} width="600" height="450"${addAttribute(project.title, "alt")} class="w-full h-full object-cover transition-transform group-hover:scale-105" data-astro-cid-arbd3op2> </div> <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" data-astro-cid-arbd3op2></div> <div class="absolute bottom-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100" data-astro-cid-arbd3op2> <h3 class="font-bold" data-astro-cid-arbd3op2>${project.title}</h3> <p class="text-sm" data-astro-cid-arbd3op2>${project.description.split(".")[0]}.</p> </div> </div>`)} </div> </div> </section> <section class="w-full py-12 md:py-24 lg:py-32 bg-muted" data-astro-cid-arbd3op2> <div class="container px-4 md:px-6" data-astro-cid-arbd3op2> <div class="flex flex-col items-center justify-center space-y-4 text-center" data-astro-cid-arbd3op2> <div class="space-y-2" data-astro-cid-arbd3op2> <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl" data-astro-cid-arbd3op2>Categorías de Proyectos</h2> <p class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed" data-astro-cid-arbd3op2>
Explore nuestros proyectos por categoría.
</p> </div> </div> <div class="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-4" data-astro-cid-arbd3op2> <a href="/proyectos/categoria/estructuras" class="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:bg-accent" data-astro-cid-arbd3op2> <div class="rounded-full bg-primary/10 p-4" data-astro-cid-arbd3op2> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-primary" data-astro-cid-arbd3op2> <rect width="18" height="18" x="3" y="3" rx="2" data-astro-cid-arbd3op2></rect> <path d="M3 9h18" data-astro-cid-arbd3op2></path> <path d="M9 21V9" data-astro-cid-arbd3op2></path> </svg> </div> <h3 class="text-lg font-bold" data-astro-cid-arbd3op2>Estructuras</h3> <p class="text-center text-sm text-muted-foreground" data-astro-cid-arbd3op2>
Edificios, puentes y otras estructuras.
</p> </a> <a href="/proyectos/categoria/vias" class="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:bg-accent" data-astro-cid-arbd3op2> <div class="rounded-full bg-primary/10 p-4" data-astro-cid-arbd3op2> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-primary" data-astro-cid-arbd3op2> <path d="M4 19h16" data-astro-cid-arbd3op2></path> <path d="M4 15h16" data-astro-cid-arbd3op2></path> <path d="M4 11h16" data-astro-cid-arbd3op2></path> <path d="M4 7h16" data-astro-cid-arbd3op2></path> </svg> </div> <h3 class="text-lg font-bold" data-astro-cid-arbd3op2>Vías y Carreteras</h3> <p class="text-center text-sm text-muted-foreground" data-astro-cid-arbd3op2>
Carreteras, caminos y vías urbanas.
</p> </a> <a href="/proyectos/categoria/hidraulica" class="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:bg-accent" data-astro-cid-arbd3op2> <div class="rounded-full bg-primary/10 p-4" data-astro-cid-arbd3op2> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-primary" data-astro-cid-arbd3op2> <path d="M20.5 10c-.5-4.5-4-8-8.5-8s-8 3.5-8.5 8c-.5 4.5 2.5 8 6 8.5h5c3.5-.5 6.5-4 6-8.5Z" data-astro-cid-arbd3op2></path> <path d="M12 12v6" data-astro-cid-arbd3op2></path> <path d="M12 12a4 4 0 0 1-4-4" data-astro-cid-arbd3op2></path> </svg> </div> <h3 class="text-lg font-bold" data-astro-cid-arbd3op2>Hidráulica</h3> <p class="text-center text-sm text-muted-foreground" data-astro-cid-arbd3op2>
Sistemas de agua, drenaje y tratamiento.
</p> </a> <a href="/proyectos/categoria/urbanismo" class="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:bg-accent" data-astro-cid-arbd3op2> <div class="rounded-full bg-primary/10 p-4" data-astro-cid-arbd3op2> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-primary" data-astro-cid-arbd3op2> <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" data-astro-cid-arbd3op2></path> <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" data-astro-cid-arbd3op2></path> <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" data-astro-cid-arbd3op2></path> </svg> </div> <h3 class="text-lg font-bold" data-astro-cid-arbd3op2>Urbanismo</h3> <p class="text-center text-sm text-muted-foreground" data-astro-cid-arbd3op2>
Planificación urbana y desarrollo.
</p> </a> </div> </div> </section> <section class="w-full py-12 md:py-24 lg:py-32" data-astro-cid-arbd3op2> <div class="container grid items-center justify-center gap-4 px-4 text-center md:px-6" data-astro-cid-arbd3op2> <div class="space-y-3" data-astro-cid-arbd3op2> <h2 class="text-3xl font-bold tracking-tighter md:text-4xl/tight" data-astro-cid-arbd3op2>
¿Tiene un proyecto en mente?
</h2> <p class="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed" data-astro-cid-arbd3op2>
Contáctenos para discutir cómo podemos ayudarle a hacer realidad su proyecto.
</p> </div> <div class="mx-auto flex flex-col gap-2 min-[400px]:flex-row" data-astro-cid-arbd3op2> <a href="/contacto" class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" data-astro-cid-arbd3op2>
Contactar Ahora
</a> </div> </div> </section>  ${renderComponent($$result2, "ProjectModal", ProjectModal, { "client:load": true, "projects": projects, "client:component-hydration": "load", "client:component-path": "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/components/ProjectModal.jsx", "client:component-export": "default", "data-astro-cid-arbd3op2": true })} ${renderScript($$result2, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/proyectos.astro?astro&type=script&index=0&lang.ts")} ` })} `;
}, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/proyectos.astro", void 0);

const $$file = "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/proyectos.astro";
const $$url = "/proyectos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Proyectos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
