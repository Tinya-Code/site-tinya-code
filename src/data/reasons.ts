export interface Reason {
  title: string;
  description: string;
  icon: string;
}

export const reasons: Reason[] = [
  {
    title: "Velocidad de Carga",
    description:
      "Optimizamos cada línea de código para garantizar que tu sitio vuele, mejorando la retención y el SEO.",
    icon: "mdi:speedometer",
  },
  {
    title: "Enfoque B2B",
    description:
      "Diseñamos procesos pensados en la venta a empresas, maximizando la generación de leads cualificados.",
    icon: "mdi:business",
  },
  {
    title: "Soporte Continuo",
    description:
      "No te dejamos solo. Ofrecemos acompañamiento técnico post-lanzamiento para que tu negocio nunca se detenga.",
    icon: "mdi:headset",
  },
  {
    title: "KPIs Reales",
    description:
      "Nos enfocamos en métricas que importan: conversión, ROI y crecimiento tangible para tu marca.",
    icon: "mdi:chart-timeline-variant-shimmer",
  },
];
