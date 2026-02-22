export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  href: string;
}

export const projects: Project[] = [
  {
    id: "inmobiliaria-lujo",
    title: "Portal Inmobiliario Premium",
    description: "Plataforma de alta gama para la visualización y venta de propiedades de lujo.",
    category: "Diseño Web",
    image: "/generico.jpeg",
    href: "/projects/inmobiliaria-lujo",
  },
  {
    id: "almacen-automatizado",
    title: "Sistema de Gestión de Almacén",
    description: "Automatización de inventarios y reportes dinámicos integrando Excel y AppScript.",
    category: "Automatización",
    image: "/generico.jpeg",
    href: "/projects/almacen-automatizado",
  },
  {
    id: "saas-proyectos",
    title: "Tinya SaaS Project Manager",
    description:
      "Software cloud para la gestión de equipos y presupuestos en el sector construcción.",
    category: "Software a Medida",
    image: "/generico.jpeg",
    href: "/projects/saas-proyectos",
  },
  {
    id: "landing-fintech",
    title: "Landing Page Fintech",
    description:
      "Página de alta conversión con enfoque AIDA para la captación de nuevos inversionistas.",
    category: "Landing Pages",
    image: "/generico.jpeg",
    href: "/projects/landing-fintech",
  },
  {
    id: "ecommerce-moda",
    title: "Tienda Online de Moda",
    description:
      "Plataforma de comercio electrónico con pasarela de pagos integrada y gestión de stock.",
    category: "E-commerce",
    image: "/generico.jpeg",
    href: "/projects/ecommerce-moda",
  },
];
