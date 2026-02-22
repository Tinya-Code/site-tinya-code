export interface Phase {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export const methodologyContent: Phase[] = [
  {
    step: "01",
    title: "Descubrimiento y Estrategia",
    description:
      "Analizamos tu modelo de negocio, competencia y objetivos para trazar la ruta de éxito digital.",
    icon: "mdi:magnify-scan",
  },
  {
    step: "02",
    title: "Diseño UX/UI Premium",
    description:
      "Creamos interfaces intuitivas y estéticas que reflejan la autoridad de tu marca y mejoran la experiencia de usuario.",
    icon: "mdi:brush-variant",
  },
  {
    step: "03",
    title: "Desarrollo de Alta Performance",
    description:
      "Convertimos el diseño en código limpio, rápido y seguro utilizando las tecnologías más avanzadas.",
    icon: "mdi:xml",
  },
  {
    step: "04",
    title: "Control de Calidad (QA)",
    description:
      "Pruebas rigurosas de velocidad, seguridad y compatibilidad en todos los dispositivos antes del lanzamiento.",
    icon: "mdi:check-circle-outline",
  },
  {
    step: "05",
    title: "Lanzamiento y Optimización",
    description:
      "Tu sitio sale al mundo. Monitoreamos el comportamiento inicial y optimizamos para maximizar resultados.",
    icon: "mdi:rocket-launch-outline",
  },
];
