export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  longDescription: string;
  icon: string;
  href: string;
  image: string;
  category: "web" | "software" | "automatizacion";
  technologies: string[];
  estimatedTime: string;
  features: string[];
  detailedFeatures: { title: string; description: string; icon: string }[];
  benefits: string[];
  targetAudience: string;
}

export const services: Service[] = [
  {
    id: "web-design",
    title: "Diseño Web Premium",
    description:
      "Sitios web de alto impacto visual y rendimiento optimizado para convertir visitantes en clientes.",
    fullDescription:
      "Creamos experiencias digitales que no solo se ven increíbles, sino que están diseñadas con un objetivo claro: impulsar el crecimiento de tu negocio. Nuestra metodología combina diseño UX/UI de vanguardia con desarrollo optimizado.",
    longDescription:
      "Nuestros sitios web premium están construidos para destacar. Utilizamos las últimas tecnologías como Astro y Tailwind CSS para garantizar tiempos de carga instantáneos y una experiencia de usuario fluida que guía al visitante hacia la acción.",
    icon: "mdi:web",
    href: "/services/web-design",
    image: "/generico.jpeg",
    category: "web",
    technologies: ["Astro", "Tailwind CSS", "TypeScript", "Figma"],
    estimatedTime: "15-20 días hábiles",
    features: ["Diseño UX/UI", "Responsive", "SEO Base"],
    detailedFeatures: [
      {
        title: "Velocidad de Carga",
        description: "Optimizamos cada elemento para que tu web vuele.",
        icon: "mdi:lightning-bolt",
      },
      {
        title: "Diseño Responsivo",
        description: "Perfecto en móviles, tablets y computadoras.",
        icon: "mdi:cellphone-link",
      },
      {
        title: "SEO Integrado",
        description: "Nacidos para aparecer en los mejores puestos de Google.",
        icon: "mdi:google-analytics",
      },
    ],
    benefits: [
      "Menor tasa de rebote por lentitud",
      "Mayor autoridad de marca online",
      "Estructura lista para escalar",
    ],
    targetAudience:
      "Empresas B2B, consultoras y marcas que buscan una presencia profesional de alto nivel.",
  },
  {
    id: "ecommerce",
    title: "Ecommerce / Ventas Online",
    description:
      "Tiendas virtuales robustas y escalables con pasarelas de pago y gestión de inventarios.",
    fullDescription:
      "Llevamos tu tienda física al mundo digital o escalamos tu negocio online actual. Desarrollamos soluciones ecommerce que facilitan la compra y gestionan todo el proceso de venta de manera automatizada.",
    longDescription:
      "Transformamos tu catálogo en una máquina de ventas 24/7. Implementamos plataformas robustas con gestión de stock, múltiples pasarelas de pago y una interfaz de administración intuitiva para que gestiones tu negocio sin complicaciones.",
    icon: "mdi:cart-outline",
    href: "/services/ecommerce",
    image: "/generico.jpeg",
    category: "web",
    technologies: ["Shopify", "WooCommerce", "Stripe", "Node.js"],
    estimatedTime: "25-35 días hábiles",
    features: ["Pagos Seguros", "Gestión de Stock", "Analytics"],
    detailedFeatures: [
      {
        title: "Pasarelas de Pago",
        description: "Integración con Visa, Mastercard, PayPal y más.",
        icon: "mdi:credit-card-outline",
      },
      {
        title: "Gestión de Inventario",
        description: "Control total de tus productos y stock en tiempo real.",
        icon: "mdi:package-variant-closed",
      },
      {
        title: "Optimización de Checkout",
        description: "Mínimos pasos para asegurar la venta.",
        icon: "mdi:basket-check",
      },
    ],
    benefits: [
      "Ventas 24/7 sin fronteras geográficas",
      "Automatización de procesos de venta",
      "Análisis profundo de comportamiento de compra",
    ],
    targetAudience:
      "Pequeñas y medianas empresas que desean digitalizar su catálogo y empezar a vender online.",
  },
  {
    id: "landing-pages",
    title: "Landing Pages",
    description:
      "Páginas de aterrizaje diseñadas específicamente para maximizar la tasa de conversión de tus campañas.",
    fullDescription:
      "Si estás invirtiendo en publicidad, necesitas una página que convierta ese tráfico en dinero. Nuestras Landing Pages están construidas bajo el modelo AIDA para maximizar el ROI de tus campañas de Ads.",
    longDescription:
      "No desperdicies tu inversión en publicidad. Creamos landing pages de alto rendimiento enfocadas exclusivamente en un objetivo: capturar leads o generar ventas directas con un mensaje claro y un diseño persuasivo.",
    icon: "mdi:target",
    href: "/services/landing-pages",
    image: "/generico.jpeg",
    category: "web",
    technologies: ["Astro", "Tailwind CSS", "AIDA Model", "Analytics"],
    estimatedTime: "5-7 días hábiles",
    features: ["Enfoque en CTA", "Carga Rápida", "A/B Testing"],
    detailedFeatures: [
      {
        title: "Enfoque en Conversión",
        description: "Cada pixel está puesto para que el usuario tome acción.",
        icon: "mdi:bullseye-arrow",
      },
      {
        title: "Carga Ultra Rápida",
        description: "Ideal para tráfico de redes sociales y Google Ads.",
        icon: "mdi:timer-sand-complete",
      },
      {
        title: "Formularios Optimizados",
        description: "Captura datos valiosos sin fricción.",
        icon: "mdi:form-select",
      },
    ],
    benefits: [
      "Mayor tasa de conversión por campaña",
      "Menor costo por lead (CPL)",
      "Mensaje directo y sin distracciones",
    ],
    targetAudience: "Emprendedores y empresas que lanzan campañas específicas o productos únicos.",
  },
  {
    id: "software",
    title: "Software a Medida",
    description:
      "Desarrollamos soluciones tecnológicas personalizadas que se adaptan exactamente a tus procesos de negocio.",
    fullDescription:
      "A veces el software comercial no es suficiente. Construimos herramientas personalizadas que resuelven problemas específicos de tu operación, desde CRMs hasta plataformas internas de gestión.",
    longDescription:
      "Digitalizamos tu ventaja competitiva. Creamos soluciones de software que se ajustan a tu flujo de trabajo real, eliminando cuellos de botella y proporcionando datos precisos para la toma de decisiones estratégicas.",
    icon: "mdi:code-braces",
    href: "/services/software",
    image: "/generico.jpeg",
    category: "software",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    estimatedTime: "45-90 días hábiles",
    features: ["Escalable", "Seguro", "Soporte 24/7"],
    detailedFeatures: [
      {
        title: "Arquitectura Escalable",
        description: "Software que crece junto con tu empresa.",
        icon: "mdi:layers-triple-outline",
      },
      {
        title: "Seguridad Robusta",
        description: "Protección de datos bajo estándares industriales.",
        icon: "mdi:shield-lock-outline",
      },
      {
        title: "API-First",
        description: "Listo para integrarse con cualquier otra herramienta.",
        icon: "mdi:api",
      },
    ],
    benefits: [
      "Control total sobre la herramienta",
      "Adaptación perfecta a tus procesos internos",
      "Sin costos de licencias por usuario a largo plazo",
    ],
    targetAudience:
      "Empresas corporativas con necesidades específicas de automatización y gestión de datos.",
  },
  {
    id: "excel-appscript",
    title: "Excel y AppScripts",
    description:
      "Automatizamos tus hojas de cálculo y procesos administrativos para ahorrarte horas de trabajo manual.",
    fullDescription:
      "No subestimes el poder de Google Sheets y Excel. Automatizamos tus flujos de trabajo con AppScripts, conectando tus hojas de cálculo con correos, calendarios y APIs externas.",
    longDescription:
      "Llevamos tus hojas de cálculo al siguiente nivel. Transformamos archivos estáticos en aplicaciones dinámicas que interactúan con el ecosistema de Google y MS Office, automatizando reportes y tareas repetitivas.",
    icon: "mdi:microsoft-excel",
    href: "/services/excel-appscript",
    image: "/generico.jpeg",
    category: "automatizacion",
    technologies: ["AppScript", "VBA", "Sheets API", "Power Query"],
    estimatedTime: "7-12 días hábiles",
    features: ["Automatización", "Reportes Reales", "Integración"],
    detailedFeatures: [
      {
        title: "Macros Avanzadas",
        description: "Automatización de tareas repetitivas en Excel.",
        icon: "mdi:keyboard-settings-outline",
      },
      {
        title: "Google AppScripts",
        description: "Conexión total entre el ecosistema Google.",
        icon: "mdi:google",
      },
      {
        title: "Dashboards Dinámicos",
        description: "Visualización de datos para toma de decisiones.",
        icon: "mdi:view-dashboard-outline",
      },
    ],
    benefits: [
      "Ahorro masivo de tiempo operativo",
      "Reducción de errores manuales",
      "Reportes generados automáticamente",
    ],
    targetAudience:
      "PYMES y departamentos administrativos que manejan grandes volúmenes de datos en hojas de cálculo.",
  },
  {
    id: "saas",
    title: "SaaS (Software as a Service)",
    description:
      "Llevamos tu idea de producto digital a la nube con modelos de suscripción y multitenancy.",
    fullDescription:
      "¿Tienes una idea de producto digital escalable? Te ayudamos a construir y lanzar tu propia plataforma SaaS, gestionando la infraestructura en la nube y el sistema de suscripciones recurrente.",
    longDescription:
      "Construimos el motor de tu startup. Diseñamos plataformas preparadas para servir a miles de usuarios simultáneamente, con gestión de planes, cobros automatizados y una infraestructura de alta disponibilidad.",
    icon: "mdi:cloud-check",
    href: "/services/saas",
    image: "/generico.jpeg",
    category: "software",
    technologies: ["Next.js", "Supabase", "Stripe", "Vercel"],
    estimatedTime: "60-120 días hábiles",
    features: ["Cloud Native", "Suscripciones", "Multi-usuario"],
    detailedFeatures: [
      {
        title: "Backend Multitenant",
        description: "Una sola base, múltiples clientes aislados.",
        icon: "mdi:account-group-outline",
      },
      {
        title: "Gestión de Suscripciones",
        description: "Integración con Stripe o Paddle para cobros.",
        icon: "mdi:cash-sync",
      },
      {
        title: "Infraestructura en la Nube",
        description: "Desplegado en AWS, Google Cloud o Vercel.",
        icon: "mdi:cloud-outline",
      },
    ],
    benefits: [
      "Modelo de ingresos recurrentes",
      "Fácil acceso desde cualquier lugar",
      "Actualizaciones simplificadas para todos los usuarios",
    ],
    targetAudience:
      "Startups y emprendedores tecnológicos que buscan lanzar un producto digital al mercado.",
  },
];
