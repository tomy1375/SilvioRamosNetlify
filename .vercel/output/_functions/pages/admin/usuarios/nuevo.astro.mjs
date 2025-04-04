/* empty css                                               */
import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_dC-6T-Kg.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_78FMoF68.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../../../renderers.mjs';

function NuevoUsuarioForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tipo, setTipo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/crear-usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre,
          email,
          password,
          tipo,
          empresa,
          telefono
        })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al crear el usuario");
      }
      setSuccess("Usuario creado correctamente");
      setNombre("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTipo("");
      setEmpresa("");
      setTelefono("");
      setTimeout(() => {
        window.location.href = "/admin";
      }, 2e3);
    } catch (err) {
      setError(err.message || "Error al crear el usuario. Por favor, inténtelo de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [
    error && /* @__PURE__ */ jsx("div", { className: "bg-destructive/15 text-destructive text-sm p-3 rounded-md", children: error }),
    success && /* @__PURE__ */ jsx("div", { className: "bg-green-100 text-green-800 text-sm p-3 rounded-md", children: success }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "nombre",
            className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            children: "Nombre Completo"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "nombre",
            className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            placeholder: "Nombre del usuario",
            value: nombre,
            onChange: (e) => setNombre(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "email",
            className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            children: "Correo Electrónico"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "email",
            type: "email",
            className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            placeholder: "correo@ejemplo.com",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "password",
            className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            children: "Contraseña"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "password",
            type: "password",
            className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "confirmPassword",
            className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            children: "Confirmar Contraseña"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "confirmPassword",
            type: "password",
            className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            value: confirmPassword,
            onChange: (e) => setConfirmPassword(e.target.value),
            required: true
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "tipo",
          className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          children: "Tipo de Usuario"
        }
      ),
      /* @__PURE__ */ jsxs(
        "select",
        {
          id: "tipo",
          className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          value: tipo,
          onChange: (e) => setTipo(e.target.value),
          required: true,
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Seleccione un tipo" }),
            /* @__PURE__ */ jsx("option", { value: "cliente", children: "Cliente" }),
            /* @__PURE__ */ jsx("option", { value: "admin", children: "Administrador" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "empresa",
          className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          children: "Empresa"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "empresa",
          className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          placeholder: "Nombre de la empresa (opcional)",
          value: empresa,
          onChange: (e) => setEmpresa(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "telefono",
          className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          children: "Teléfono"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "telefono",
          className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          placeholder: "Número de teléfono",
          value: telefono,
          onChange: (e) => setTelefono(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/admin",
          className: "inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          disabled: loading,
          children: loading ? "Creando..." : "Crear Usuario"
        }
      )
    ] })
  ] });
}

const $$Nuevo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Crear Usuario", "activeLink": "usuarios" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-6"> <div class="flex flex-col gap-2"> <h1 class="text-2xl font-bold tracking-tight">Crear Nuevo Usuario</h1> <p class="text-muted-foreground">
Cree una nueva cuenta de usuario para dar acceso a los planos.
</p> </div> <div class="rounded-lg border shadow-sm p-6"> ${renderComponent($$result2, "NuevoUsuarioForm", NuevoUsuarioForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/components/NuevoUsuarioForm", "client:component-export": "default" })} </div> </div> ` })}`;
}, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/usuarios/nuevo.astro", void 0);

const $$file = "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/usuarios/nuevo.astro";
const $$url = "/admin/usuarios/nuevo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Nuevo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
