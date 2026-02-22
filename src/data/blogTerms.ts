export interface BlogTerm {
  term: string;
  type: "internal-link" | "external-link" | "highlight" | "definition";
  href?: string;
  definition?: string;
  caseSensitive?: boolean;
}

export const blogTerms: BlogTerm[] = [
  { term: "Tinya Code", type: "internal-link", href: "/" },
  { term: "diseño web", type: "internal-link", href: "/services/web-design" },
  {
    term: "AppScript",
    type: "internal-link",
    href: "/services/excel-appscript",
  },
  {
    term: "tienda virtual",
    type: "internal-link",
    href: "/services/ecommerce",
  },
  {
    term: "landing page",
    type: "internal-link",
    href: "/services/landing-pages",
  },
  {
    term: "software a la medida",
    type: "internal-link",
    href: "/services/software",
  },
  {
    term: "SEO",
    type: "definition",
    definition:
      "Search Engine Optimization: Conjunto de técnicas para mejorar la visibilidad de una web en buscadores.",
  },
  {
    term: "UX",
    type: "definition",
    definition:
      "User Experience: Proceso de mejorar la satisfacción del usuario al interactuar con un producto.",
  },
  {
    term: "UI",
    type: "definition",
    definition:
      "User Interface: Conjunto de elementos visuales con los que el usuario interactúa en una web.",
  },
  { term: "Astro", type: "highlight" },
  { term: "Tailwind", type: "highlight" },
];
