export interface Reason {
  percentage: string;     // Solo el número o porcentaje
  headline: string;       // Frase corta e impactante
  detail: string;         // Explicación breve
  source: string;         // Fuente citada
  icon: string;           // Ícono representativo
}

export const reasons: Reason[] = [
  {
    percentage: "58%",
    headline: "Más ingresos y clientes",
    detail:
      "Las empresas en Perú con página web reportan un aumento en sus ingresos y clientes.",
    source: "Asociación de Pequeñas Empresas de Perú, 2024",
    icon: "mdi:trending-up",
  },
  {
    percentage: "47%",
    headline: "Prefieren comprar en línea",
    detail:
      "Los consumidores peruanos eligen la compra online por comodidad y accesibilidad.",
    source: "Euromonitor International, 2023",
    icon: "mdi:cart",
  },
  {
    percentage: "30%",
    headline: "Publicidad más económica",
    detail:
      "La publicidad digital resulta más barata que los métodos tradicionales, maximizando la inversión.",
    source: "Deloitte, 2023",
    icon: "mdi:currency-usd",
  },
  {
    percentage: "18.8%",
    headline: "Crecimiento del e-commerce",
    detail:
      "El mercado de comercio electrónico en Perú sigue expandiéndose con más transacciones en línea.",
    source: "Cámara de Comercio de Lima",
    icon: "mdi:chart-line",
  },
];
