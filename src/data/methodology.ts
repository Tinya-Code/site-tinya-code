export interface Phase {
  step: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

export const methodologyContent: Phase[] = [
  {
    step: "01",
    title: "Descubrimiento y Estrategia",
    description:
      "Identificamos las prioridades de tu negocio y los objetivos clave que deben cumplirse para generar impacto digital inmediato. A partir de este diagnóstico inicial, analizamos tu mercado y competencia, detectamos oportunidades reales y trazamos una hoja de ruta estratégica que conecta tu visión con resultados medibles.",
    icon: "mdi:magnify-scan",
    image: "/generico.jpeg",
  },
  {
    step: "02",
    title: "Diseño UX/UI Premium",
    description:
      "Creamos interfaces claras y atractivas que transmiten confianza y mejoran la experiencia del usuario desde el primer contacto. Complementamos el diseño con principios de usabilidad y branding, asegurando que cada interacción refuerce la identidad de tu marca y facilite la conversión.",
    icon: "mdi:brush-variant",
    image: "/generico.jpeg",
  },
  {
    step: "03",
    title: "Desarrollo de Alta Performance",
    description:
      "Transformamos el diseño en soluciones digitales rápidas, seguras y escalables que funcionan sin fricciones en cualquier dispositivo. Además, aplicamos buenas prácticas de código y tecnologías confiables para garantizar estabilidad, facilidad de mantenimiento y capacidad de crecimiento futuro.",
    icon: "mdi:xml",
    image: "/generico.jpeg",
  },
  {
    step: "04",
    title: "Control de Calidad (QA)",
    description:
      "Validamos cada detalle antes del lanzamiento mediante pruebas exhaustivas de velocidad, seguridad y compatibilidad. Este proceso asegura que tu proyecto cumpla con los más altos estándares y ofrezca una experiencia impecable, reduciendo riesgos y fortaleciendo la confianza del usuario.",
    icon: "mdi:check-circle-outline",
    image: "/generico.jpeg",
  },
  {
    step: "05",
    title: "Lanzamiento y Optimización",
    description:
      "Publicamos tu proyecto y lo acompañamos en sus primeras etapas para garantizar un inicio sólido y sin contratiempos. Posteriormente, monitoreamos métricas clave y aplicamos mejoras continuas que maximizan el alcance, la conversión y el retorno de inversión, asegurando que tu presencia digital evolucione con tu negocio.",
    icon: "mdi:rocket-launch-outline",
    image: "/generico.jpeg",
  },
];
