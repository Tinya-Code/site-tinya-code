export interface SubLink {
  text: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface NavLink {
  text: string;
  href: string;
  isCTA?: boolean;
  sublinks?: SubLink[];
}

export const navLinks: NavLink[] = [
 /* {
    text: "Servicios",
    href: "/services",
    sublinks: [
      {
        text: "Diseño Web",
        href: "/services/web-design",
        description: "Sitios modernos y rápidos",
        icon: "mdi:web",
      },
      {
        text: "Tiendas Virtuales",
        href: "/services/ecommerce",
        description: "E-commerce optimizado",
        icon: "mdi:store",
      },
      {
        text: "Landing Pages",
        href: "/services/landing-pages",
        description: "Páginas de conversión AIDA",
        icon: "mdi:target",
      },
      {
        text: "Software a Medida",
        href: "/services/software",
        description: "Desarrollo personalizado",
        icon: "mdi:code-braces",
      },
      {
        text: "Excel y AppScript",
        href: "/services/excel-appscript",
        description: "Automatización con Google",
        icon: "mdi:table",
      },
      {
        text: "SaaS",
        href: "/services/saas",
        description: "Software de suscripción",
        icon: "mdi:cloud",
      },
    ],
  },
  {
    text: "Sectores",
    href: "/sectors",
    sublinks: [
      {
        text: "Construcción",
        href: "/sectors/construccion",
        icon: "mdi:crane",
      },
      {
        text: "Minería",
        href: "/sectors/mineria",
        icon: "mdi:hard-hat",
      },
      {
        text: "Industrias",
        href: "/sectors/industrias",
        icon: "mdi:factory",
      },
      {
        text: "Servicios Generales",
        href: "/sectors/servicios-generales",
        icon: "mdi:briefcase",
      },
      {
        text: "Corporativos",
        href: "/sectors/corporativos",
        icon: "mdi:office-building",
      },
      {
        text: "MyPes",
        href: "/sectors/mypes",
        icon: "mdi:store-outline",
      },
    ],
  },
  {
    text: "Portafolio",
    href: "/portfolio",
  },
  {
    text: "Nosotros",
    href: "/about",
    sublinks: [
            {
        text: "Testimonios",
        href: "/testimonials",
        icon: "mdi:briefcase",
      },
                  {
        text: "Methodologia",
        href: "/methodology",
        icon: "mdi:briefcase",
      },
                        {
        text: "Contacto",
        href: "/contact",
        icon: "mdi:briefcase",
      },
    ]
  },
    {
    text: "Precios",
    href: "/pricing",
  },
  {
    text: "Blog",
    href: "/blog",
  },*/
  {
    text: "Solicitar propuesta",
    href: "/contact",
    isCTA: true,
  },
];

export const footerLinks = {
  main: [
    { text: "Diseño Web",href: "#precio" },//href: "/services/web-design" },
    { text: "Tiendas Virtuales",href: "#precio" }, //href: "/services/ecommerce" },
    { text: "Landing Pages",href: "#precio" }, //href: "/services/landing-pages" },
  //  { text: "Software a Medida", href: "/services/software" },
  //  { text: "Excel y AppScript", href: "/services/excel-appscript" },
    { text: "SaaS", href: "#precio" }//href: "/services/saas" },
  ],
  company: [
    //{ text: "Nosotros", href: "/about" },
    { text: "Metodología", href: "/methodology" },
    { text: "Precios", href: "/pricing" },
    { text: "Testimonios", href: "/testimonials" },
    { text: "FAQ", href: "/faq" },
  ],
  legal: [
    { text: "Privacidad", href: "/privacy" },
    { text: "Términos", href: "/terms" },
  ],
};
