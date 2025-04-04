import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_B-CbGU2m.mjs';
import { manifest } from './manifest_dmaI0bOK.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/configuracion.astro.mjs');
const _page2 = () => import('./pages/admin/editar-plano/_id_.astro.mjs');
const _page3 = () => import('./pages/admin/editar-usuario/_id_.astro.mjs');
const _page4 = () => import('./pages/admin/nuevo-usuario.astro.mjs');
const _page5 = () => import('./pages/admin/planos.astro.mjs');
const _page6 = () => import('./pages/admin/planos-por-usuario.astro.mjs');
const _page7 = () => import('./pages/admin/subir.astro.mjs');
const _page8 = () => import('./pages/admin/usuarios/nuevo.astro.mjs');
const _page9 = () => import('./pages/admin/usuarios.astro.mjs');
const _page10 = () => import('./pages/admin/verificar-db.astro.mjs');
const _page11 = () => import('./pages/admin/verificar-planos.astro.mjs');
const _page12 = () => import('./pages/admin.astro.mjs');
const _page13 = () => import('./pages/api/actualizar-plano.astro.mjs');
const _page14 = () => import('./pages/api/actualizar-usuario.astro.mjs');
const _page15 = () => import('./pages/api/check-db-tables.astro.mjs');
const _page16 = () => import('./pages/api/check-env.astro.mjs');
const _page17 = () => import('./pages/api/crear-usuario.astro.mjs');
const _page18 = () => import('./pages/api/eliminar-plano.astro.mjs');
const _page19 = () => import('./pages/api/eliminar-usuario.astro.mjs');
const _page20 = () => import('./pages/api/obtener-usuarios.astro.mjs');
const _page21 = () => import('./pages/api/registrar-descarga.astro.mjs');
const _page22 = () => import('./pages/api/setup-db.astro.mjs');
const _page23 = () => import('./pages/api/subir-plano.astro.mjs');
const _page24 = () => import('./pages/api/verificar-planos-usuarios.astro.mjs');
const _page25 = () => import('./pages/cliente/historial.astro.mjs');
const _page26 = () => import('./pages/cliente/plano/_id_.astro.mjs');
const _page27 = () => import('./pages/cliente.astro.mjs');
const _page28 = () => import('./pages/contacto.astro.mjs');
const _page29 = () => import('./pages/equipo.astro.mjs');
const _page30 = () => import('./pages/login.astro.mjs');
const _page31 = () => import('./pages/proyectos.astro.mjs');
const _page32 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/configuracion.astro", _page1],
    ["src/pages/admin/editar-plano/[id].astro", _page2],
    ["src/pages/admin/editar-usuario/[id].astro", _page3],
    ["src/pages/admin/nuevo-usuario.astro", _page4],
    ["src/pages/admin/planos.astro", _page5],
    ["src/pages/admin/planos-por-usuario.astro", _page6],
    ["src/pages/admin/subir.astro", _page7],
    ["src/pages/admin/usuarios/nuevo.astro", _page8],
    ["src/pages/admin/usuarios.astro", _page9],
    ["src/pages/admin/verificar-db.astro", _page10],
    ["src/pages/admin/verificar-planos.astro", _page11],
    ["src/pages/admin/index.astro", _page12],
    ["src/pages/api/actualizar-plano.js", _page13],
    ["src/pages/api/actualizar-usuario.js", _page14],
    ["src/pages/api/check-db-tables.js", _page15],
    ["src/pages/api/check-env.js", _page16],
    ["src/pages/api/crear-usuario.js", _page17],
    ["src/pages/api/eliminar-plano.js", _page18],
    ["src/pages/api/eliminar-usuario.js", _page19],
    ["src/pages/api/obtener-usuarios.js", _page20],
    ["src/pages/api/registrar-descarga.js", _page21],
    ["src/pages/api/setup-db.js", _page22],
    ["src/pages/api/subir-plano.js", _page23],
    ["src/pages/api/verificar-planos-usuarios.js", _page24],
    ["src/pages/cliente/historial.astro", _page25],
    ["src/pages/cliente/plano/[id].astro", _page26],
    ["src/pages/cliente/index.astro", _page27],
    ["src/pages/contacto.astro", _page28],
    ["src/pages/equipo.astro", _page29],
    ["src/pages/login.astro", _page30],
    ["src/pages/proyectos.astro", _page31],
    ["src/pages/index.astro", _page32]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "70828a71-5924-49b5-818e-7289180cf6c8",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
