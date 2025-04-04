/* empty css                                            */
import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_dC-6T-Kg.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_78FMoF68.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { a as getUsers } from '../../chunks/db_69Mb4jww.mjs';
export { renderers } from '../../renderers.mjs';

function SubirPlanoForm({ usuarios = [] }) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("Arquitectónico");
  const [cliente, setCliente] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivo(file);
      setFileName(file.name);
      setFileSize(formatFileSize(file.size));
    }
  };
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      if (!nombre || !tipo || !cliente || !archivo) {
        setError("Por favor, complete todos los campos requeridos.");
        setIsLoading(false);
        return;
      }
      if (archivo.type !== "application/pdf") {
        setError("El archivo debe ser un PDF.");
        setIsLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("tipo", tipo);
      formData.append("cliente", cliente);
      formData.append("descripcion", descripcion);
      formData.append("archivo", archivo);
      const response = await fetch("/api/subir-plano", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("Plano subido correctamente.");
        setNombre("");
        setTipo("Arquitectónico");
        setCliente("");
        setDescripcion("");
        setArchivo(null);
        setFileName("");
        setFileSize("");
        document.getElementById("archivo").value = "";
      } else {
        setError(`Error al subir el plano: ${data.error || "Ocurrió un error desconocido"}`);
        if (data.setupUrl) {
          setError(
            `${data.error} <a href="${data.setupUrl}" class="text-primary hover:underline">Configurar base de datos</a>`
          );
        }
      }
    } catch (error2) {
      console.error("Error al subir el plano:", error2);
      setError("Error al procesar la solicitud. Por favor, inténtelo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
    error && /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-destructive/15 text-destructive p-4 rounded-md",
        dangerouslySetInnerHTML: { __html: error }
      }
    ),
    success && /* @__PURE__ */ jsx("div", { className: "bg-green-100 text-green-800 p-4 rounded-md", children: success }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "nombre",
            className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            children: "Nombre del Plano *"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "nombre",
            value: nombre,
            onChange: (e) => setNombre(e.target.value),
            required: true,
            className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "tipo",
            className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            children: "Tipo de Plano *"
          }
        ),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "tipo",
            value: tipo,
            onChange: (e) => setTipo(e.target.value),
            required: true,
            className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsx("option", { value: "Arquitectónico", children: "Arquitectónico" }),
              /* @__PURE__ */ jsx("option", { value: "Estructural", children: "Estructural" }),
              /* @__PURE__ */ jsx("option", { value: "Eléctrico", children: "Eléctrico" }),
              /* @__PURE__ */ jsx("option", { value: "Hidráulico", children: "Hidráulico" }),
              /* @__PURE__ */ jsx("option", { value: "Sanitario", children: "Sanitario" }),
              /* @__PURE__ */ jsx("option", { value: "Otro", children: "Otro" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "cliente",
            className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            children: "Cliente *"
          }
        ),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "cliente",
            value: cliente,
            onChange: (e) => setCliente(e.target.value),
            required: true,
            className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Seleccione un cliente" }),
              usuarios.length === 0 ? /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "No hay clientes disponibles" }) : usuarios.map((usuario) => /* @__PURE__ */ jsxs("option", { value: usuario.id, children: [
                usuario.nombre,
                " (ID: ",
                usuario.id,
                ")"
              ] }, usuario.id))
            ]
          }
        ),
        usuarios.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: "No se encontraron clientes. Verifique la base de datos." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "archivo",
            className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            children: "Archivo PDF *"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              id: "archivo",
              accept: "application/pdf",
              onChange: handleFileChange,
              required: true,
              className: "hidden"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "archivo",
                className: "inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                children: "Seleccionar archivo"
              }
            ),
            fileName && /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
              fileName,
              " (",
              fileSize,
              ")"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "descripcion",
          className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          children: "Descripción"
        }
      ),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          id: "descripcion",
          value: descripcion,
          onChange: (e) => setDescripcion(e.target.value),
          rows: "4",
          className: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        disabled: isLoading,
        className: "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              children: [
                /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  }
                )
              ]
            }
          ),
          "Subiendo..."
        ] }) : "Subir Plano"
      }
    ) })
  ] });
}

const $$Subir = createComponent(async ($$result, $$props, $$slots) => {
  let usuarios = [];
  try {
    console.log("P\xE1gina subir: Obteniendo usuarios...");
    usuarios = await getUsers();
    console.log(`P\xE1gina subir: Se encontraron ${usuarios.length} usuarios`);
    console.log("Usuarios antes de filtrar:", JSON.stringify(usuarios.map((u) => ({ id: u.id, nombre: u.nombre, tipo: u.tipo }))));
    usuarios = usuarios.filter(
      (usuario) => usuario.tipo && usuario.tipo.toLowerCase() === "cliente"
    );
    console.log(`P\xE1gina subir: Despu\xE9s de filtrar, quedan ${usuarios.length} clientes`);
    console.log("Clientes filtrados:", JSON.stringify(usuarios.map((u) => ({ id: u.id, nombre: u.nombre }))));
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Subir Plano", "activeLink": "subir" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-6"> <div class="flex flex-col gap-2"> <h1 class="text-2xl font-bold tracking-tight">Subir Plano</h1> <p class="text-muted-foreground">
Suba un nuevo plano para compartir con sus clientes.
</p> </div> <div class="rounded-lg border shadow-sm"> <div class="p-6"> ${renderComponent($$result2, "SubirPlanoForm", SubirPlanoForm, { "usuarios": usuarios, "client:load": true, "client:component-hydration": "load", "client:component-path": "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/components/SubirPlanoForm.jsx", "client:component-export": "default" })} </div> </div> </div> ` })}`;
}, "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/subir.astro", void 0);

const $$file = "E:/TrabajosProgramador/Silvio Ramos/ingecivil-website/src/pages/admin/subir.astro";
const $$url = "/admin/subir";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Subir,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
