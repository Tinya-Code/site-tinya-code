export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceMonthly: number;
  priceAnnual: number;
  period: string;
  description: string;
  features: (string | { text: string; tooltip: string })[];
  ctaText: string;
  ctaHref: string;
  featured?: boolean;
  badge?: string;
}

export const webPricing: PricingPlan[] = [
  {
    id: "landing",
    name: "Landing Page",
    price: "S/ 799",
    priceMonthly: 799,
    priceAnnual: 719,
    period: "pago único",
    description: "Ideal para negocios que buscan una presencia digital rápida y profesional.",
    features: [
      { text: "Diseño 100% Responsivo", tooltip: "Tu web se verá perfecta en celulares, tablets y computadoras." },
      { text: "Hasta 3 secciones", tooltip: "Incluye Inicio, Servicios y Contacto (o similares según tu necesidad)." },
      { text: "Integración con WhatsApp", tooltip: "Botón flotante directo a tu chat para captar clientes al instante." },
      { text: "SEO Básico", tooltip: "Optimización de títulos y etiquetas para que aparezcas en Google." },
      { text: "Certificado SSL Gratuito", tooltip: "El candado de seguridad que protege los datos y da confianza." },
      { text: "Soporte por 30 días", tooltip: "Acompañamiento post-entrega para cualquier duda técnica inicial." },
    ],
    ctaText: "Empezar ahora",
    ctaHref: "/contact?plan=landing",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    price: "S/ 1,799",
    priceMonthly: 1799,
    priceAnnual: 1619,
    period: "pago único",
    description: "Perfecto para empresas que quieren vender online con una tienda autogestionable.",
    features: [
      { text: "Todo lo del Landing Page", tooltip: "Hereda todas las ventajas del plan anterior." },
      { text: "Hasta 10 secciones", tooltip: "Mayor profundidad para mostrar categorías, catálogo y más." },
      { text: "Tienda online con carrito y pagos", tooltip: "Gestión de inventario y pasarela de pagos (Izipay, Culqi, etc.)." },
      { text: "Integración con Analytics", tooltip: "Mide quién te visita y cuánto vendes con Google Analytics." },
      { text: "Formularios dinámicos", tooltip: "Captura datos específicos de tus clientes según el producto." },
      { text: "Capacitación de uso", tooltip: "Sesión personalizada para que aprendas a subir productos tú mismo." },
      { text: "Soporte por 60 días", tooltip: "Doble tiempo de garantía y soporte técnico para tu tranquilidad." },
    ],
    ctaText: "Elegir E-commerce",
    ctaHref: "/contact?plan=ecommerce",
    featured: true,
    badge: "Más Popular",
  },
  {
    id: "saas",
    name: "SaaS / Corporate",
    price: "Desde S/ 5,000",
    priceMonthly: 5000,
    priceAnnual: 5000,
    period: "desde",
    description: "Soluciones robustas y a medida para software corporativo o SaaS.",
    features: [
      { text: "Arquitectura personalizada", tooltip: "Hardware y software diseñado específicamente para tu flujo de trabajo." },
      { text: "Integración con APIs externas", tooltip: "Conectamos tu sistema con CRMs, ERPs o servicios de terceros." },
      { text: "Sistemas de gestión interna", tooltip: "Paneles de administración a medida para controlar tu operación." },
      { text: "Seguridad avanzada", tooltip: "Protección de datos sensible y roles de usuario granulares." },
      { text: "Escalabilidad en la nube", tooltip: "Tu plataforma crecerá junto a tu base de usuarios sin problemas." },
      { text: "Soporte prioritario 24/7", tooltip: "Atención inmediata para cualquier incidencia crítica en tu plataforma." },
    ],
    ctaText: "Contactar ventas",
    ctaHref: "/contact?plan=saas",
  },
];

