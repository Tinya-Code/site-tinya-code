export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Francisco",
    role: "Fundador",
    company: "Accesible Travel Peru",
    content:
      "Nuestra página no transmitía confianza y muchos clientes extranjeros se perdían en el proceso de reserva. Después de actualizarla, todo se volvió más claro y rápido. Ahora recibimos más consultas directas y las reservas se concretan con menos fricción. Fue un cambio que nos dio tranquilidad y nos permitió enfocarnos en atender mejor a los viajeros.",
    avatar: "/testimonials/francisco.webp",

  },
  {
    name: "Carla Villanueva",
    role: "Fundadora",
    company: "Inmobiliaria Regional",
    content:
      "Los interesados en nuestros proyectos tenían que llamar o escribir correos para obtener información básica, lo que generaba demoras y pérdida de oportunidades. Con la nueva plataforma, los clientes pueden ver planos, precios y agendar visitas en línea. Eso nos ha permitido cerrar ventas más rápido y con menos esfuerzo. Me parece una herramienta que cualquier inmobiliaria debería tener.",
    avatar: "/testimonials/person.webp",

  },
  {
    name: "Juan Carlos Pérez",
    role: "Fundador",
    company: "Repiit Shop",
    content:
      "Nuestro ecommerce tenía problemas de stock y los clientes se quejaban porque no sabían si los productos estaban disponibles. Con la integración de inventario en tiempo real, ahora la tienda muestra lo que realmente tenemos y los tiempos de entrega son claros. Los reclamos bajaron y las ventas repetidas aumentaron. Fue un alivio para nosotros y para los clientes.",
    avatar: "https://i.pinimg.com/736x/ca/e2/26/cae22683a2deee2868f8d345758bc122.jpg",

  },
];
