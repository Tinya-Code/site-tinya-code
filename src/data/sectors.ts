export interface Sector {
  id: string;
  name: string;
  icon: string;
  href: string;
  image: string;
  fullDescription: string;
  challenges: string[];
  solutions: string[];
}

export const sectors: Sector[] = [
  {
    id: "construccion",
    name: "Construcción",
    icon: "mdi:crane",
    href: "/sectors/construccion",
    image: "/generico.jpeg",
    fullDescription:
      "Soluciones digitales robustas para empresas del sector construcción, facilitando la gestión de proyectos y la visibilidad de obra.",
    challenges: [
      "Gestión de presupuestos complejos",
      "Coordinación de equipos en campo",
      "Actualización de estados de obra en tiempo real",
    ],
    solutions: [
      "Dashboards de control de proyectos",
      "Plataformas de gestión documental",
      "Sitios web de portafolio de proyectos inmobiliarios",
    ],
  },
  {
    id: "mineria",
    name: "Minería",
    icon: "mdi:pickaxe",
    href: "/sectors/mineria",
    image: "/generico.jpeg",
    fullDescription:
      "Tecnología aplicada a la eficiencia operativa y seguridad en el sector minero.",
    challenges: [
      "Logística en zonas remotas",
      "Cumplimiento de estándares de seguridad",
      "Optimización de recursos y maquinaria",
    ],
    solutions: [
      "Sistemas de gestión de inventarios críticos",
      "Portales de capacitación y seguridad industrial",
      "Automatización de reportes de producción",
    ],
  },
  {
    id: "industrias",
    name: "Industrias",
    icon: "mdi:factory",
    href: "/sectors/industrias",
    image: "/generico.jpeg",
    fullDescription:
      "Digitalizamos procesos industriales para mejorar la productividad y el control de la cadena de suministro.",
    challenges: [
      "Cuellos de botella en producción",
      "Falta de visibilidad en la cadena de suministro",
      "Sistemas legacy que no se comunican",
    ],
    solutions: [
      "Integración de sistemas (ERP/CRM)",
      "Monitoreo de procesos en tiempo real",
      "Ecommerces B2B para distribuidores",
    ],
  },
  {
    id: "servicios-generales",
    name: "Servicios Generales",
    icon: "mdi:tools",
    href: "/sectors/servicios-generales",
    image: "/generico.jpeg",
    fullDescription:
      "Optimizamos la prestación de servicios mediante plataformas de reserva y atención al cliente.",
    challenges: [
      "Agendamiento ineficiente",
      "Dificultad en el seguimiento de servicios",
      "Falta de canales de pago digitales",
    ],
    solutions: [
      "Sistemas de reservas online",
      "AppScripts para automatización de cotizaciones",
      "Landing pages de alta conversión para servicios específicos",
    ],
  },
  {
    id: "corporativos",
    name: "Corporativos",
    icon: "mdi:office-building",
    href: "/sectors/corporativos",
    image: "/generico.jpeg",
    fullDescription:
      "Transformación digital para grandes empresas buscando eficiencia interna y presencia de alto nivel.",
    challenges: [
      "Gestión de grandes volúmenes de datos",
      "Necesidad de una imagen de marca sólida",
      "Colaboración entre múltiples departamentos",
    ],
    solutions: [
      "Intranets personalizadas",
      "Webs corporativas premium con enfoque B2B",
      "Automatizaciones avanzadas con Excel y Cloud",
    ],
  },
  {
    id: "mypes",
    name: "MYPES",
    icon: "mdi:storefront-outline",
    href: "/sectors/mypes",
    image: "/generico.jpeg",
    fullDescription:
      "Acompañamos el crecimiento de las micro y pequeñas empresas con soluciones accesibles y escalables.",
    challenges: [
      "Presupuestos limitados para tecnología",
      "Baja visibilidad online inicial",
      "Procesos manuales que consumen tiempo",
    ],
    solutions: [
      "Ecommerce rápido de implementar",
      "Landing pages optimizadas para ventas locales",
      "Herramientas de automatización administrativa",
    ],
  },
];
