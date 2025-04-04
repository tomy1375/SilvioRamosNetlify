import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: toggleTheme,
      className: "flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all",
      "aria-label": "Cambiar tema",
      children: theme === "dark" ? /* @__PURE__ */ jsxs(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: "h-5 w-5",
          children: [
            /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4" }),
            /* @__PURE__ */ jsx("path", { d: "M12 2v2" }),
            /* @__PURE__ */ jsx("path", { d: "M12 20v2" }),
            /* @__PURE__ */ jsx("path", { d: "m4.93 4.93 1.41 1.41" }),
            /* @__PURE__ */ jsx("path", { d: "m17.66 17.66 1.41 1.41" }),
            /* @__PURE__ */ jsx("path", { d: "M2 12h2" }),
            /* @__PURE__ */ jsx("path", { d: "M20 12h2" }),
            /* @__PURE__ */ jsx("path", { d: "m6.34 17.66-1.41 1.41" }),
            /* @__PURE__ */ jsx("path", { d: "m19.07 4.93-1.41 1.41" })
          ]
        }
      ) : /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: "h-5 w-5",
          children: /* @__PURE__ */ jsx("path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" })
        }
      )
    }
  );
}

export { ThemeToggle as T };
