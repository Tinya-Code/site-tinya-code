export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Roberto Gómez",
    role: "Gerente General",
    company: "Constructora del Norte",
    content:
      "Tinya Code transformó por completo nuestra presencia digital. Ahora captamos un 40% más de leads industriales a través de nuestra web.",
    avatar: "/generico.jpeg",
    rating: 5,
  },
  {
    name: "Carla Villanueva",
    role: "Directora de Marketing",
    company: "Logística Regional SA",
    content:
      "La velocidad de carga y el diseño responsivo son impresionantes. El soporte técnico es impecable y siempre están dispuestos a ayudar.",
    avatar: "/generico.jpeg",
    rating: 5,
  },
  {
    name: "Juan Carlos Pérez",
    role: "Fundador",
    company: "BioTech Solutions",
    content:
      "Su enfoque en KPIs nos permitió entender realmente el retorno de nuestra inversión en marketing digital. Excelentes profesionales.",
    avatar: "/generico.jpeg",
    rating: 4,
  },
];
