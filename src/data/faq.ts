export interface FaqItem {
  question: string;
  answer: string;
  category: "general" | "proceso" | "precios" | "tecnico";
}

export const faqs: FaqItem[] = [
  {
    category: "general",
    question: "¿Cuánto tiempo toma desarrollar un sitio web?",
    answer:
      "Un sitio corporativo estándar suele tomar entre 2 y 4 semanas. Proyectos más complejos como ecommerces o software a medida pueden tomar de 2 a 3 meses dependiendo de los requerimientos.",
  },
  {
    category: "general",
    question: "¿Tengo que pagar mes a mes por mi web?",
    answer:
      "No. Nuestros planes de diseño web son de pago único por el desarrollo. Solo deberás renovar anualmente tu dominio y hosting, los cuales podemos gestionar por ti o entregarte los accesos.",
  },
  {
    category: "proceso",
    question: "¿Cómo es el proceso de pago?",
    answer:
      "Trabajamos con un adelanto del 50% para iniciar el proyecto y el 50% restante contra entrega y conformidad del sitio web.",
  },
  {
    category: "tecnico",
    question: "¿Ustedes dan mantenimiento a las páginas?",
    answer:
      "Sí, ofrecemos planes de mantenimiento mensual que incluyen actualizaciones de seguridad, copias de respaldo y cambios menores de contenido para que no te preocupes por nada técnico.",
  },
  {
    category: "tecnico",
    question: "¿Pueden automatizar mis reportes de Excel?",
    answer:
      "Absolutamente. Somos expertos en Google AppScript y macros de Excel. Podemos conectar tus hojas de cálculo con correos, formularios y otros servicios para eliminar tareas manuales.",
  },
  {
    category: "general",
    question: "¿Mi página aparecerá en Google?",
    answer:
      "Sí. Todos nuestros sitios incluyen una estructura técnica optimizada para SEO (Search Engine Optimization), lo que facilita que Google rastree e indexe tu contenido correctamente.",
  },
];
