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
    id: "launch",
    name: "Plan Launch",
    price: "S/ 1,200",
    priceMonthly: 1200,
    priceAnnual: 0, // Solo pago único disponible
    period: "pago único",
    description: "Perfecto para negocios que buscan su primera presencia profesional.",
    features: [
      "Diseño 100% Responsivo",
      "Hasta 5 secciones",
      "Integración con WhatsApp",
      "SEO Básico",
      "Certificado SSL Gratuito",
      "Soporte por 30 días",
    ],
    ctaText: "Empezar ahora",
    ctaHref: "/contact?plan=launch",
  },
  {
    id: "scale",
    name: "Plan Scale",
    price: "S/ 2,500",
    priceMonthly: 2500,
    priceAnnual: 2200, // Ahorro del ~12% en pago anual
    period: "pago único",
    description: "Ideal para empresas en crecimiento que necesitan herramientas avanzadas.",
    features: [
      "Todo lo del Plan Launch",
      "Hasta 10 secciones",
      "Blog o Portfolio autogestionable",
      "Integración con Analytics",
      "Formularios dinámicos",
      "Capacitación de uso",
      "Soporte por 90 días",
    ],
    ctaText: "Elegir Scale",
    ctaHref: "/contact?plan=scale",
    featured: true,
    badge: "Más Popular",
  },
  {
    id: "enterprise",
    name: "Corporate / SaaS",
    price: "Desde S/ 5,000",
    priceMonthly: 5000,
    priceAnnual: 4500,
    period: "proyecto",
    description: "Soluciones robustas a medida para necesidades corporativas complejas.",
    features: [
      "Arquitectura a medida",
      "Integración con APIs externas",
      "Sistemas de gestión interna",
      "Seguridad avanzada",
      "Escalabilidad en la nube",
      "Soporte prioritario 24/7",
    ],
    ctaText: "Contactar ventas",
    ctaHref: "/contact?plan=enterprise",
  },
];
