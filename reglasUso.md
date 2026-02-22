# Reglas de Uso y Estructura del Proyecto

📁 src
│
├── 📁 assets                           # Archivos estáticos procesados por Astro en build
│   ├── 📁 images                       # Imágenes del sitio optimizadas con <Image />
│   ├── 📁 fonts                        # Fuentes tipográficas locales
│   └── 📁 icons                        # SVGs únicos de marca (logo, ilustraciones)
│
├── 📁 components
│   │
│   ├── 📁 ui                           # Componentes Dumb — solo reciben props y pintan HTML
│   │   ├── 📁 common                   # Elementos globales presentes en todo el sitio
│   │   │   ├── Navbar.astro            # Barra de navegación principal
│   │   │   ├── Footer.astro            # Pie de página con links y redes
│   │   │   ├── BaseHead.astro          # Meta tags base, fuentes y estilos globales
│   │   │   ├── SEO.astro              # Componente astro-seo: OG, Twitter Cards, title
│   │   │   └── Icon.astro             # Wrapper de astro-icon para uso estandarizado
│   │   ├── 📁 buttons                  # Variantes de botones reutilizables
│   │   │   ├── Button.astro            # Botón primario
│   │   │   └── ButtonOutline.astro     # Botón con borde, sin relleno
│   │   ├── 📁 cards                    # Tarjetas presentacionales por tipo de contenido
│   │   │   ├── ServiceCard.astro       # Tarjeta individual de un servicio
│   │   │   ├── SectorCard.astro        # Tarjeta de sector atendido
│   │   │   ├── ProjectCard.astro       # Tarjeta de caso de éxito / portfolio
│   │   │   ├── BlogCard.astro          # Tarjeta de artículo del blog
│   │   │   ├── PricingCard.astro       # Tarjeta de plan de precios
│   │   │   ├── TestimonialCard.astro   # Tarjeta de testimonio de cliente
│   │   │   └── ReasonCard.astro        # Tarjeta de razón para elegir / confiar
│   │   └── 📁 sections                 # Secciones presentacionales de página
│   │       ├── Hero.astro              # Sección principal con CTA y headline
│   │       ├── SectionHeader.astro     # Título + subtítulo reutilizable entre secciones
│   │       ├── WhyChooseUs.astro       # Bloque con los 4 diferenciadores clave
│   │       ├── Methodology.astro       # Visualización de las 5 fases de trabajo
│   │       ├── PricingTable.astro      # Tabla/grilla comparativa de planes
│   │       ├── CallToAction.astro      # Banda CTA — ¿Listo para escalar tu negocio?
│   │       ├── ContactForm.astro       # Formulario de contacto visual
│   │       ├── AidaBanner.astro        # Banner explicativo de metodología AIDA
│   │       └── DepositBadge.astro      # Insignia "Empezamos con el 30%"
│   │
│   └── 📁 smart                        # Componentes Smart — importan datos y pasan props a los dumb
│       ├── ServicesGrid.astro          # Carga services.ts y renderiza ServiceCard
│       ├── SectorsGrid.astro           # Carga sectors.ts y renderiza SectorCard
│       ├── TestimonialsGrid.astro      # Carga testimonials.ts y renderiza TestimonialCard
│       ├── PortfolioGallery.astro      # Carga proyectos desde content/projects y renderiza ProjectCard
│       ├── BlogFeed.astro              # Carga posts desde content/blog y renderiza BlogCard
│       ├── PricingSection.astro        # Carga pricing.ts y renderiza PricingCard
│       ├── FaqAccordion.astro          # Carga faq.ts y renderiza el acordeón
│       └── ReasonsGrid.astro           # Carga reasons.ts y renderiza ReasonCard
│
├── 📁 content                          # Colecciones de contenido gestionadas por Astro Content Collections
│   ├── 📁 blog                         # Artículos del blog en formato .mdx
│   └── 📁 projects                     # Casos de éxito y portfolio en formato .mdx
│
├── 📁 data                             # Fuente única de verdad para textos y valores editables
│   ├── siteConfig.ts                   # Nombre del sitio, logo, meta global, datos de empresa
│   ├── navigation.ts                   # Links del navbar y footer
│   ├── services.ts                     # Lista completa de servicios con título, descripción e ícono
│   ├── sectors.ts                      # Sectores atendidos: construcción, minería, etc.
│   ├── pricing.ts                      # Planes, precios, características incluidas
│   ├── testimonials.ts                 # Testimonios: nombre, empresa, cargo, texto, foto
│   ├── reasons.ts                      # Las 4 Poderosas Razones para entrar al mundo digital
│   ├── whyUs.ts                        # Por qué elegir Tinya Code: velocidad, B2B, soporte, KPIs
│   ├── methodology.ts                  # Las 5 fases del proceso de trabajo
│   ├── faq.ts                          # Preguntas frecuentes generales y por servicio
│   └── social.ts                       # Redes sociales, teléfono, email, WhatsApp
│
├── 📁 layouts                          # Estructuras base que envuelven las páginas
│   ├── BaseLayout.astro                # Raíz: incluye BaseHead, Navbar, Footer y slot
│   ├── PageLayout.astro                # Para páginas estáticas — extiende BaseLayout
│   ├── BlogLayout.astro                # Para posts del blog — incluye autor, fecha, breadcrumb
│   └── ProjectLayout.astro             # Para casos de éxito — incluye cliente, sector, resultado
│
├── 📁 pages                            # ⚠️ Carpeta requerida por Astro — define rutas y compilación
│   │
│   ├── index.astro                     # / — Home: Hero, Razones, Sectores, Por qué, Metodología, CTA
│   │
│   ├── about.astro                     # /about — Quiénes somos, razones para confiar
│   ├── methodology.astro               # /methodology — Las 5 fases detalladas
│   ├── testimonials.astro              # /testimonials — Todos los testimonios y casos de éxito
│   ├── portfolio.astro                 # /portfolio — Portafolio general: webs, tiendas, aulas
│   ├── pricing.astro                   # /pricing — Inversión Transparente: todos los planes
│   ├── faq.astro                       # /faq — Preguntas frecuentes generales
│   ├── contact.astro                   # /contact — Formulario de contacto + CTA
│   │
│   ├── 📁 services                     # /services/* — Páginas por servicio
│   │   ├── index.astro                 # /services — Vista general de todos los servicios
│   │   ├── web-design.astro            # /services/web-design — Diseño de páginas web
│   │   ├── ecommerce.astro             # /services/ecommerce — Tiendas virtuales
│   │   ├── landing-pages.astro         # /services/landing-pages — Landing Pages con AIDA
│   │   ├── software.astro              # /services/software — Software a la medida
│   │   ├── excel-appscript.astro       # /services/excel-appscript — Excel y AppScript
│   │   └── saas.astro                  # /services/saas — Software de suscripción SaaS
│   │
│   ├── 📁 sectors                      # /sectors/* — Páginas por sector atendido
│   │   ├── index.astro                 # /sectors — Todos los sectores
│   │   ├── construccion.astro          # /sectors/construccion
│   │   ├── mineria.astro               # /sectors/mineria
│   │   ├── industrias.astro            # /sectors/industrias
│   │   ├── servicios-generales.astro   # /sectors/servicios-generales
│   │   ├── corporativos.astro          # /sectors/corporativos
│   │   └── mypes.astro                 # /sectors/mypes
│   │
│   ├── 📁 blog                         # /blog/* — Rutas del blog
│   │   ├── index.astro                 # /blog — Listado de artículos
│   │   └── [...slug].astro             # /blog/[slug] — Post individual dinámico
│   │
│   ├── 📁 projects                     # /projects/* — Rutas de casos de éxito
│   │   ├── index.astro                 # /projects — Listado de proyectos
│   │   └── [...slug].astro             # /projects/[slug] — Proyecto individual dinámico
│   │
│   └── rss.xml.js                      # /rss.xml — Feed RSS del blog
│
├── 📁 styles                           # Estilos globales del proyecto
│   ├── global.css                      # Reset, variables CSS, clases base con @apply de Tailwind
│   └── typography.css                  # Estilos de tipografía: headings, body, prose
│
├── content.config.ts                   # Define los schemas de las Content Collections (blog, projects)
└── consts.ts                           # Constantes globales: URL del sitio, nombre, etc.
## Reglas de Uso

### 1. Componentes — Separación Smart / Dumb (SOLID)

**Componentes Dumb (`/components/ui`)** son puramente presentacionales. Solo reciben props y renderizan HTML. No contienen lógica de negocio, no hacen fetch, no importan desde `/data` directamente.

```astro
---
// ✅ CORRECTO — ServiceCard.astro (dumb)
interface Props {
  title: string;
  description: string;
  icon: string;
  href: string;
}
const { title, description, icon, href } = Astro.props;
---
<a href={href} class="...">
  <Icon name={icon} />
  <h3>{title}</h3>
  <p>{description}</p>
</a>
```

**Componentes Smart (`/components/smart`)** son los únicos que importan desde `/data`, aplican filtros, transforman datos y los pasan hacia abajo a los dumb.

```astro
---
// ✅ CORRECTO — ServicesGrid.astro (smart)
import { services } from '@/data/services';
import ServiceCard from '@/components/ui/cards/ServiceCard.astro';
---
<section>
  {services.map(s => <ServiceCard {...s} />)}
</section>
```

> **Regla:** Si un componente necesita importar datos o aplicar lógica, va en `/smart`. Si solo pinta props, va en `/ui`.

---

### 2. Datos — Carpeta `/data`

Ningún texto visible, valor de configuración, precio, enlace de navegación o dato editable debe estar hardcodeado dentro de un componente o página. Todo va en `/data`.

```ts
// ✅ CORRECTO — data/services.ts
export const services = [
  {
    title: "Diseño Web",
    description: "Sitios modernos, rápidos y optimizados.",
    icon: "mdi:web",
    href: "/services#web-design",
  },
  {
    title: "Apps para Excel con AppScript",
    description: "Automatizaciones y herramientas a medida.",
    icon: "mdi:table",
    href: "/services#excel",
  },
];
```

```astro
<!-- ❌ INCORRECTO — texto hardcodeado en el componente -->
<h2>Diseño Web</h2>
<p>Sitios modernos, rápidos y optimizados.</p>
```

**Excepción permitida:** Textos de UI genérica no editable como labels de accesibilidad (`aria-label="Cerrar menú"`) o placeholders de formulario pueden vivir en el componente, siempre que no sean contenido de negocio.

---


### 3. Tailwind — Reglas de Uso

**Estilos en componentes:** Las clases de Tailwind se aplican directamente en el template del componente. No se crean archivos CSS por componente.

```astro
<!-- ✅ CORRECTO -->
<div class="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
```

---

### 4. Imágenes

Siempre usar el componente `<Image />` de `@astrojs/image` en lugar de la etiqueta `<img>`. Las imágenes del sitio viven en `src/assets/images`. Imágenes externas o dinámicas que no pueden optimizarse en build time son la única excepción.

---

### 5. Iconos

Usar exclusivamente el componente `<Icon />` de `astro-icon` con íconos de Iconify. No descargar ni agregar SVGs manualmente al proyecto salvo que sean logos o ilustraciones únicas de la marca, que van en `src/assets/icons`.

---

### 6. SEO y Meta

Cada página define su propio título y descripción, pero los valores por defecto y la configuración global viven en `data/siteConfig.ts`. El componente `<SEO />` de `astro-seo` se instancia una sola vez dentro de `BaseLayout.astro`.

---

### 7. Content Collections

El blog y el portfolio usan Astro Content Collections definidas en `content.config.ts`. Ninguna página de detalle (`[...slug].astro`) hardcodea contenido; todo viene del frontmatter del archivo `.mdx`.

---
