export interface PricingPlan {
  id: string;
  name: string;
  price: string; // Se mantiene para compatilidad o primer render
  priceMonthly: number;
  priceAnnual: number;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  featured?: boolean;
  badge?: string;
  isPopular?: boolean; /* @deprecated — usar featured */
}

export const webPricing: PricingPlan[] = [
  {
    id: "landing",
    name: "Landing Page",
    price: "S/ 799",
    priceMonthly: 799,
    priceAnnual: 719, // 10% de descuento en pago completo
    period: "pago único",
    description: "Ideal para negocios que buscan una presencia digital rápida y profesional.",
    features: [
      "Diseño 100% Responsivo",
      "Hasta 3 secciones",
      "Integración con WhatsApp",
      "SEO Básico",
      "Certificado SSL Gratuito",
      "Soporte por 30 días",
    ],
    ctaText: "Empezar ahora",
    ctaHref: "/contact?plan=landing",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    price: "S/ 1,799",
    priceMonthly: 1799,
    priceAnnual: 1619, // 10% de descuento en pago completo
    period: "pago único",
    description: "Perfecto para empresas que quieren vender online con una tienda autogestionable.",
    features: [
      "Todo lo del Landing Page",
      "Hasta 10 secciones",
      "Tienda online con carrito y pagos",
      "Integración con Analytics",
      "Formularios dinámicos",
      "Capacitación de uso",
      "Soporte por 90 días",
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
    priceAnnual: 4500, // 10% de descuento en pago completo
    period: "proyecto",
    description: "Soluciones robustas y a medida para software corporativo o SaaS.",
    features: [
      "Arquitectura personalizada",
      "Integración con APIs externas",
      "Sistemas de gestión interna",
      "Seguridad avanzada",
      "Escalabilidad en la nube",
      "Soporte prioritario 24/7",
    ],
    ctaText: "Contactar ventas",
    ctaHref: "/contact?plan=saas",
  },
];

