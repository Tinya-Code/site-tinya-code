# Plan de Implementación — refactorizacionCodigo.md
## Auditoría de Lógica, SOLID, Interactividad y SEO — Tinya Code

## Reglas del Agente para este Plan

- Leer `refactorizacionCodigo.md` completo antes de iniciar cualquier fase.
- Leer `guiaEstilo.md` y `reglasUso.md` antes de modificar cualquier componente.
- No modificar estilos visuales. Solo lógica, estructura, interactividad y SEO.
- Ejecutar `astro check` al finalizar cada fase. Debe reportar cero errores.
- Ejecutar `astro build` al finalizar cada fase. Debe completar sin errores.
- Cada archivo modificado se valida individualmente antes de continuar.
- No usar `any` en TypeScript en ningún archivo nuevo o modificado.
- Commit conceptual por fase: no mezclar cambios de fases distintas.

---

## Fase 1 — Infraestructura de Tipos y Scripts Base

### Objetivo
Crear los archivos de infraestructura compartida que todos los demás
componentes van a consumir. Esta fase no toca ningún componente existente.

### Archivos a crear
- `src/types/index.ts`
- `src/scripts/observer.ts` — revisar y completar si ya existe

### Tareas — src/types/index.ts

Crear el archivo con las interfaces base compartidas:

- Definir interfaz `CardBase` con campos: `title`, `description`, `href`, `image?`.
- Definir interfaz `WithCategory` con campo: `category: string`.
- Definir interfaz `WithDate` con campo: `date: Date`.
- Definir interfaz `WithIcon` con campo: `icon: string`.
- Definir interfaz `WithIndex` con campo: `index?: number`.
- Definir type `Align` como `'left' | 'center'`.
- Definir type `HeadingTag` como `'h1' | 'h2' | 'h3' | 'h4'`.
- Definir type `ButtonVariant` como `'primary' | 'outline' | 'outline-white'`.
- Definir type `ButtonSize` como `'sm' | 'md' | 'lg'`.
- Definir type `BadgeVariant` como `'default' | 'brand' | 'live' | 'demo'`.
- Exportar todo con `export type`.

### Tareas — src/scripts/observer.ts

Verificar que el archivo existente contiene y exporta correctamente:

- Función `initScrollAnimations(): void` — completa con tipos explícitos.
- Función `debounce<T>(fn: T, delay: number)` — genérica y tipada.
- Función `trapFocus(container: HTMLElement): () => void` — retorna cleanup.
- Función `initModal(triggerSelector, overlaySelector, closeSelector): void`.
- Función `initFilter(tabSelector, itemSelector, filterAttr): void`.

Si alguna función no existe, crearla siguiendo el código definido
en `refactorizacionCodigo.md`. Si existe pero sin tipos, agregar los tipos.

### Validación
- [ ] `src/types/index.ts` existe y exporta todas las interfaces.
- [ ] `src/scripts/observer.ts` exporta las 5 funciones requeridas.
- [ ] `astro check` reporta cero errores después de crear estos archivos.
- [ ] No hay `any` en ninguno de los dos archivos.

---

## Fase 2 — Layouts: Tipos, SEO Base y Schemas

### Objetivo
Asegurar que todos los layouts tienen tipos correctos, SEO completo
y schemas JSON-LD donde corresponde.

### Archivos
- `src/layouts/BaseLayout.astro`
- `src/layouts/PageLayout.astro`
- `src/layouts/BlogLayout.astro`
- `src/layouts/BlogPost.astro`
- `src/layouts/ProjectLayout.astro`

### Tareas — BaseLayout.astro

- Verificar que el frontmatter tiene interfaz `Props` completa con:
  `title`, `description`, `canonical?`, `ogImage?`, `ogType?`.
- Verificar que importa y usa `SEO.astro`.
- Agregar el schema JSON-LD de `Organization` en el `<head>`.
  Los datos vienen de `siteConfig.ts`. No hardcodear.
- Verificar que tiene los slots: `default`, y si aplica `header` y `footer`.
- Verificar que `<html>` tiene atributo `lang="es"`.
- Verificar que `<meta charset="UTF-8">` está presente.
- Verificar que `<meta name="viewport">` está presente.
- Agregar `<link rel="sitemap" href="/sitemap-index.xml">`.
- Agregar `<link rel="alternate" type="application/rss+xml">` apuntando al feed.

### Tareas — PageLayout.astro

- Verificar que extiende `BaseLayout` pasando todos los props de SEO.
- Verificar que tiene interfaz `Props` que extiende la de `BaseLayout`.
- No debe tener lógica de contenido. Solo estructura de layout.

### Tareas — BlogLayout.astro

- Verificar que la interfaz `Props` incluye campos del post:
  `title`, `description`, `date`, `updatedDate?`, `heroImage?`, `category`, `author?`.
- Agregar schema JSON-LD de `Article` en el `<head>`.
  Los datos vienen de las props del layout.
- Agregar `<meta property="og:type" content="article">`.
- Agregar `<meta property="article:published_time">` con la fecha ISO.
- Verificar que el layout incluye `BlogContentFormatter` envolviendo el slot.
- Agregar la barra de progreso de lectura `.reading-progress-bar`.
- Agregar el script de la barra de progreso.
- Verificar que el layout tiene el grid de dos columnas con TOC en desktop.

### Tareas — ProjectLayout.astro

- Verificar que la interfaz `Props` incluye: `title`, `description`,
  `type`, `demo?`, `technologies`, `date`, `heroImage?`.
- Agregar `<meta property="og:type" content="article">`.
- Verificar la estructura del layout de proyecto.

### Validación
- [ ] `astro check` sin errores en los 5 layouts.
- [ ] `<html lang="es">` en `BaseLayout`.
- [ ] Schema de `Organization` en `BaseLayout`.
- [ ] Schema de `Article` en `BlogLayout`.
- [ ] La barra de progreso está en `BlogLayout`.
- [ ] Ningún layout tiene `any` en TypeScript.

---

## Fase 3 — SEO.astro y BaseHead.astro

### Objetivo
Asegurar que el componente SEO genera todos los meta tags requeridos
y que BaseHead es correcto.

### Archivos
- `src/components/ui/common/SEO.astro`
- `src/components/ui/common/BaseHead.astro`

### Tareas — SEO.astro

Definir la interfaz `Props` completa:
```typescript
interface Props {
  title: string;
  description: string;
  canonical: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  ogImageAlt?: string;
  noindex?: boolean;
}
```

Verificar que el componente genera en este orden exacto:

- `<title>` con el formato correcto.
- `<meta name="description">`.
- `<link rel="canonical">`.
- Si `noindex`: `<meta name="robots" content="noindex, nofollow">`.
- `<meta property="og:title">`.
- `<meta property="og:description">`.
- `<meta property="og:url">`.
- `<meta property="og:type">`.
- `<meta property="og:image">`.
- `<meta property="og:image:alt">`.
- `<meta property="og:site_name">` con el nombre de la empresa.
- `<meta name="twitter:card" content="summary_large_image">`.
- `<meta name="twitter:title">`.
- `<meta name="twitter:description">`.
- `<meta name="twitter:image">`.

Valores por defecto:
- `ogType` por defecto: `'website'`.
- `ogImage` por defecto: imagen OG genérica del sitio desde `siteConfig.ts`.
- `ogImageAlt` por defecto: nombre del sitio.
- `noindex` por defecto: `false`.

### Tareas — BaseHead.astro

- Verificar que solo contiene meta tags técnicos: charset, viewport, favicon.
- No debe duplicar meta tags que genera `SEO.astro`.
- Verificar que el favicon tiene las variantes correctas: `favicon.ico`,
  `favicon.svg`, `apple-touch-icon.png`.
- Agregar `<meta name="theme-color">` con el color `brand` del sitio.

### Validación
- [ ] `SEO.astro` genera los 14 meta tags requeridos.
- [ ] El prop `noindex` agrega `robots: noindex, nofollow`.
- [ ] No hay duplicación entre `BaseHead` y `SEO`.
- [ ] `astro check` sin errores.

---

## Fase 4 — Páginas: SEO Individual y Headings

### Objetivo
Verificar que cada página tiene SEO único, un solo `<h1>` y jerarquía
correcta de headings.

### Archivos
- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/pages/faq.astro`
- `src/pages/methodology.astro`
- `src/pages/portfolio.astro`
- `src/pages/pricing.astro`
- `src/pages/testimonials.astro`
- `src/pages/privacy.astro`
- `src/pages/terms.astro`
- `src/pages/services/index.astro`
- `src/pages/services/web-design.astro`
- `src/pages/services/ecommerce.astro`
- `src/pages/services/landing-pages.astro`
- `src/pages/services/software.astro`
- `src/pages/services/excel-appscript.astro`
- `src/pages/services/saas.astro`
- `src/pages/sectors/index.astro`
- `src/pages/sectors/construccion.astro`
- `src/pages/sectors/mineria.astro`
- `src/pages/sectors/industrias.astro`
- `src/pages/sectors/servicios-generales.astro`
- `src/pages/sectors/corporativos.astro`
- `src/pages/sectors/mypes.astro`

### Tareas por cada página

Para cada página verificar y corregir:

**SEO**
- Que pasa `title` único con formato `"[Nombre] — Tinya Code"`. Máximo 60 chars.
- Que pasa `description` única de 120-160 caracteres.
- Que pasa `canonical` construida con `new URL(Astro.url.pathname, siteConfig.url)`.
- Que `privacy.astro` y `terms.astro` pasan `noindex: true`.

**Headings**
- Que existe exactamente un `<h1>` en la página.
- Que el `<h1>` está en el Hero o en el header de la página, no en `SectionHeader`.
- Que `SectionHeader` usa `<h2>` en todas las secciones de la página.
- Que no hay saltos de nivel de heading.

**SectionHeader**
- Verificar que `SectionHeader.astro` tiene prop `as?: HeadingTag` importado
  desde `src/types/index.ts`.
- El `as` por defecto es `'h2'`.

### Tabla de títulos y descriptions a definir

| Página | Title (máx 60 chars) | Description (120-160 chars) |
|---|---|---|
| `/` | Tinya Code — Diseño Web y Software B2B en Lima | Agencia de diseño web, desarrollo de software y automatización para empresas de construcción, minería e industria en Lima, Perú. |
| `/about` | Nosotros — Tinya Code | Conoce al equipo detrás de Tinya Code. Diseñadores y desarrolladores especializados en soluciones digitales para empresas B2B en Lima. |
| `/contact` | Contacto — Tinya Code | Solicita tu propuesta sin costo. Respondemos en menos de 24 horas con un plan personalizado para tu empresa. |
| `/services` | Servicios — Tinya Code | Diseño web, desarrollo de software, tiendas virtuales y automatización con Excel y AppScript para empresas en Lima, Perú. |
| `/pricing` | Planes y Precios — Tinya Code | Inversión transparente para diseño web y desarrollo de software. Planes desde el 30% de anticipo. Sin letra pequeña. |
| `/portfolio` | Portafolio — Tinya Code | Proyectos de diseño web, tiendas virtuales y software a medida para empresas de construcción, minería y servicios en Perú. |
| `/blog` | Blog — Tinya Code | Artículos sobre diseño web profesional, desarrollo de software, automatización y transformación digital para empresas en Lima. |
| `/faq` | Preguntas Frecuentes — Tinya Code | Resolvemos tus dudas sobre nuestros procesos, tiempos de entrega, precios y metodología de trabajo en Tinya Code. |
| `/methodology` | Metodología — Tinya Code | Conoce las 5 fases de trabajo de Tinya Code: análisis, diseño UX, desarrollo, pruebas y lanzamiento con monitoreo. |
| `/testimonials` | Testimonios — Tinya Code | Lo que dicen nuestros clientes sobre Tinya Code. Casos de éxito en diseño web y desarrollo de software para empresas B2B. |
| `/privacy` | Política de Privacidad — Tinya Code | Política de privacidad y tratamiento de datos personales de Tinya Code conforme a la legislación peruana vigente. |
| `/terms` | Términos y Condiciones — Tinya Code | Términos y condiciones de los servicios de diseño web y desarrollo de software de Tinya Code en Lima, Perú. |

### Validación
- [ ] `astro check` sin errores en todas las páginas.
- [ ] Ninguna página tiene título duplicado.
- [ ] Ninguna página tiene description duplicada.
- [ ] `privacy.astro` y `terms.astro` tienen `noindex: true`.
- [ ] Cada página tiene exactamente un `<h1>`.
- [ ] No hay saltos de nivel de heading en ninguna página.

---

## Fase 5 — Rutas Dinámicas: Blog y Projects

### Objetivo
Asegurar que las rutas dinámicas del blog y proyectos tienen tipos correctos,
SEO completo y lógica de `getStaticPaths` correcta.

### Archivos
- `src/pages/blog/[...slug].astro`
- `src/pages/blog/index.astro`
- `src/pages/projects/[...slug].astro`
- `src/pages/projects/index.astro`
- `src/content.config.ts`

### Tareas — content.config.ts

Verificar que el schema de `blog` incluye:
- `title: z.string()`
- `description: z.string()`
- `date: z.coerce.date()`
- `updatedDate: z.coerce.date().optional()`
- `heroImage: z.string().optional()`
- `category: z.string()`
- `featured: z.boolean().default(false)`
- `readingTime: z.number().optional()`
- `draft: z.boolean().default(false)`

Verificar que el schema de `projects` incluye:
- `title: z.string()`
- `description: z.string()`
- `date: z.coerce.date()`
- `heroImage: z.string().optional()`
- `type: z.enum(['web', 'tienda', 'software', 'excel'])`
- `size: z.enum(['featured', 'secondary', 'small'])`
- `demo: z.string().url().optional()`
- `preview: z.string().optional()`
- `technologies: z.array(z.string())`
- `draft: z.boolean().default(false)`

### Tareas — blog/[...slug].astro
```typescript
// Verificar que getStaticPaths es correcto
export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

interface Props {
  post: CollectionEntry<'blog'>;
}

const { post } = Astro.props;
const { Content } = await post.render();
```

- Verificar que el SEO usa los datos del frontmatter del post.
- Verificar que `canonical` es la URL absoluta del post.
- Verificar que `og:type` es `'article'`.
- Verificar que se muestran 3 posts relacionados por `category` al final.
- Los posts relacionados excluyen el post actual.
- Los drafts no aparecen en producción.

### Tareas — blog/index.astro

- Verificar que obtiene los posts con `getCollection('blog', ({ data }) => !data.draft)`.
- Verificar que ordena por fecha descendente.
- Verificar que pasa el SEO correcto al layout.

### Tareas — projects/[...slug].astro

- Mismo patrón que blog pero para la colección `projects`.
- El SEO usa los datos del frontmatter del proyecto.
- Verificar que el botón "Ver demo" solo aparece si `demo` existe.

### Tareas — projects/index.astro

- Verificar que filtra drafts correctamente.
- Verificar que pasa el SEO correcto.

### Validación
- [ ] `astro check` sin errores en las 4 páginas.
- [ ] `astro build` genera las rutas dinámicas correctamente.
- [ ] Los drafts no aparecen en el build de producción.
- [ ] El schema de `blog` tiene todos los campos requeridos.
- [ ] El schema de `projects` tiene todos los campos requeridos.
- [ ] Los posts relacionados excluyen el post actual.

---

## Fase 6 — Componentes Comunes: Navbar y Footer

### Objetivo
Refactorizar Navbar y Footer para que tengan tipos correctos,
interactividad funcional completa y lógica correcta.

### Archivos
- `src/components/ui/common/Navbar.astro`
- `src/components/ui/common/Footer.astro`

### Tareas — Navbar.astro

**Frontmatter**
- Verificar que importa `navigation` desde `src/data/navigation.ts`.
- Verificar que importa `siteConfig` desde `src/data/siteConfig.ts`.
- No debe tener props propios. El Navbar es un componente sin props.

**Template**
- Verificar el atributo `aria-label="Navegación principal"` en el `<nav>`.
- Verificar que el logo tiene `aria-label` con el nombre del sitio.
- Verificar que los links usan `class:list` para el estado activo.
- Verificar que el botón hamburguesa tiene:
  - `id="mobile-menu-btn"`
  - `aria-expanded="false"`
  - `aria-controls="mobile-menu"`
  - `aria-label="Abrir menú"`
- Verificar que el menú mobile tiene:
  - `id="mobile-menu"`
  - `role="dialog"`
  - `aria-label="Menú de navegación"`
  - clase `mobile-menu`

**Script**
- Verificar que el script importa `trapFocus` desde `@/scripts/observer`.
- Verificar que gestiona `aria-expanded` y `aria-label` del botón.
- Verificar que agrega `overflow-hidden` al body al abrir.
- Verificar que cierra el menú con `Escape`.
- Verificar que cierra el menú al hacer click fuera.
- Verificar que cierra el menú al hacer click en cualquier link.
- Verificar que el focus trap está activo mientras el menú está abierto.
- Verificar que al cerrar el foco regresa al botón hamburguesa.
- Verificar el indicador de scroll: agrega `navbar-scrolled` a `>80px`.
- Verificar la lógica del dropdown: abre en hover, cierra con `Escape`.
- Limpiar event listeners en `astro:before-swap`.

### Tareas — Footer.astro

**Frontmatter**
- Importar `navigation` desde `src/data/navigation.ts`.
- Importar `social` desde `src/data/social.ts`.
- Importar `siteConfig` desde `src/data/siteConfig.ts`.
- No debe tener props propios.

**Template**
- Verificar que tiene `<footer>` con `role="contentinfo"`.
- Verificar que los links sociales tienen `aria-label` con el nombre de la red.
- Verificar que los links externos tienen `rel="noopener noreferrer"`.
- Verificar que el copyright usa el año dinámico: `new Date().getFullYear()`.
- Agregar schema JSON-LD de `LocalBusiness` si no está en `contact.astro`.

**Checklist Navbar**
- [ ] `aria-expanded` cambia correctamente entre `true` y `false`.
- [ ] `aria-label` del botón cambia entre "Abrir menú" y "Cerrar menú".
- [ ] Focus trap activo en menú mobile.
- [ ] `Escape` cierra el menú.
- [ ] El scroll agrega `navbar-scrolled` correctamente.
- [ ] El dropdown del desktop cierra con `Escape` y click fuera.
- [ ] Los event listeners se limpian en `astro:before-swap`.

**Checklist Footer**
- [ ] Links sociales tienen `aria-label`.
- [ ] Links externos tienen `rel="noopener noreferrer"`.
- [ ] El año del copyright es dinámico.
- [ ] No hay datos hardcodeados. Todo viene de `data/`.

---

## Fase 7 — Componentes Dumb: Props e Interfaces

### Objetivo
Verificar que todos los componentes Dumb tienen interfaces `Props` completas,
tipadas y sin `any`. Ninguno importa de `src/data/`.

### Archivos
- `src/components/ui/buttons/Button.astro`
- `src/components/ui/cards/BlogCard.astro`
- `src/components/ui/cards/PricingCard.astro`
- `src/components/ui/cards/ProjectCard.astro`
- `src/components/ui/cards/ReasonCard.astro`
- `src/components/ui/cards/SectorCard.astro`
- `src/components/ui/cards/ServiceCard.astro`
- `src/components/ui/cards/TeamCard.astro`
- `src/components/ui/cards/TestimonialCard.astro`
- `src/components/ui/chips/SectorChip.astro`
- `src/components/ui/common/Icon.astro`
- `src/components/ui/common/ReasonItem.astro`
- `src/components/ui/common/TestimonialQuote.astro`
- `src/components/ui/sections/SectionHeader.astro`
- `src/components/ui/sections/Hero.astro`
- `src/components/ui/sections/CallToAction.astro`
- `src/components/ui/sections/ContactForm.astro`
- `src/components/ui/sections/Stats.astro`
- `src/components/ui/sections/WhyChooseUs.astro`
- `src/components/ui/sections/Methodology.astro`
- `src/components/ui/sections/PricingTable.astro`
- `src/components/ui/sections/AidaBanner.astro`
- `src/components/ui/sections/DepositBadge.astro`

### Tareas por cada componente

**Button.astro**
```typescript
interface Props {
  label: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  class?: string;
}
```
- Si `href` existe, renderizar como `<a>`. Si no, como `<button>`.
- Si `external`, agregar `target="_blank" rel="noopener noreferrer"`.
- Si `disabled`, agregar atributo `disabled` y `aria-disabled="true"`.

**SectionHeader.astro**
```typescript
import type { HeadingTag, Align } from '@/types';

interface Props {
  title: string;
  subtitle?: string;
  as?: HeadingTag;
  align?: Align;
  showLine?: boolean;
}
const { title, subtitle, as: Tag = 'h2', align = 'left', showLine = true } = Astro.props;
```

**ServiceCard.astro**
```typescript
interface Props {
  title: string;
  description: string;
  icon: string;
  href: string;
  category: 'web' | 'software' | 'automatizacion';
  technologies?: string[];
  estimatedTime?: string;
  longDescription?: string;
  index?: number;
}
```

**BlogCard.astro**
```typescript
interface Props {
  title: string;
  description: string;
  href: string;
  image: string;
  date: Date;
  category: string;
  readingTime?: number;
  featured?: boolean;
}
```

**ProjectCard.astro**
```typescript
interface Props {
  title: string;
  description: string;
  href: string;
  image: string;
  type: 'web' | 'tienda' | 'software' | 'excel';
  size: 'featured' | 'secondary' | 'small';
  demo?: string;
  technologies?: string[];
}
```

**PricingCard.astro**
```typescript
interface Props {
  name: string;
  priceMonthly: number;
  priceAnnual?: number;
  features: string[];
  featured?: boolean;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
}
```

**TeamCard.astro**
```typescript
interface Props {
  name: string;
  role: string;
  bio: string;
  photo: string;
  skills: string[];
  linkedin?: string;
  github?: string;
}
```

**TestimonialQuote.astro**
```typescript
interface Props {
  quote: string;
  name: string;
  role: string;
  company?: string;
  photo?: string;
  rating?: number;
}
```

**SectorChip.astro**
```typescript
interface Props {
  label: string;
  icon?: string;
  href?: string;
  active?: boolean;
  dataCategory?: string;
}
```

**Icon.astro**
```typescript
interface Props {
  name: string;
  size?: 4 | 5 | 6 | 7 | 8 | 10;
  ariaHidden?: boolean;
  ariaLabel?: string;
  class?: string;
}
const { name, size = 5, ariaHidden = true, ariaLabel, class: className } = Astro.props;
```

### Reglas generales para todos los Dumb
- Ninguno tiene `import` de `src/data/`.
- Ninguno usa `getCollection` ni `Astro.glob`.
- Todo prop opcional tiene valor por defecto explícito.
- Los tipos se importan desde `src/types/index.ts`.
- No hay `any` en ninguna interfaz.

### Validación
- [ ] `astro check` sin errores en los 23 componentes.
- [ ] Ningún componente Dumb importa desde `src/data/`.
- [ ] Todos los props opcionales tienen valores por defecto.
- [ ] No hay `any` en ningún archivo.

---

## Fase 8 — Componentes Smart: Lógica y Datos

### Objetivo
Verificar que todos los componentes Smart obtienen datos correctamente,
los transforman si es necesario y los pasan tipados a los Dumb.

### Archivos
- `src/components/smart/ServicesGrid.astro`
- `src/components/smart/SectorsGrid.astro`
- `src/components/smart/ReasonsGrid.astro`
- `src/components/smart/WhyChooseUsSection.astro`
- `src/components/smart/StatsSection.astro`
- `src/components/smart/MethodologySection.astro`
- `src/components/smart/TestimonialsGrid.astro`
- `src/components/smart/FaqAccordion.astro`
- `src/components/smart/PricingSection.astro`
- `src/components/smart/PortfolioGallery.astro`
- `src/components/smart/BlogFeed.astro`
- `src/components/smart/TeamGrid.astro`
- `src/components/smart/AidaBannerSection.astro`

### Tareas generales para todos los Smart

- Verificar que cada Smart importa datos solo desde `src/data/` o `astro:content`.
- Verificar que los datos se transforman en el frontmatter antes de pasarlos.
- Verificar que los props que se pasan a los Dumb tienen tipos correctos.
- No debe haber `any` en ningún componente Smart.
- Si el componente tiene un script de cliente, verificar que usa las
  funciones de `src/scripts/observer.ts` y no las redefine.

### Tareas específicas por componente

**ServicesGrid.astro**
- Importar `services` de `src/data/services.ts`.
- Tipar el array importado con la interfaz de `services.ts`.
- Pasar `index` a cada `ServiceCard` para el delay de animación.
- Verificar que el script de filtrado usa `initFilter` de `observer.ts`.
- Verificar que el script de expansión de card usa tipos explícitos.

**FaqAccordion.astro**
- Importar `faq` de `src/data/faq.ts`.
- Verificar que el script del acordeón usa tipos explícitos en los selectors.
- Verificar que el buscador usa `debounce` importado de `observer.ts`.
- Verificar que `closeAll` cierra correctamente todos los ítems.
- Verificar la lógica de tabs por categoría.

**TestimonialsGrid.astro**
- Importar `testimonials` de `src/data/testimonials.ts`.
- Verificar que el script del slider usa tipos explícitos.
- Verificar que las flechas se deshabilitan en los extremos.
- Verificar que los puntos de paginación se actualizan con el scroll.
- Verificar que `aria-live="polite"` está implementado.

**PricingSection.astro**
- Importar `pricing` de `src/data/pricing.ts`.
- Verificar que el script del toggle tiene `role="switch"` y `aria-checked`.
- Verificar que el cambio de precio actualiza todos los planes correctamente.
- Verificar que los planes sin `priceAnnual` no cambian en modo anual.

**PortfolioGallery.astro**
- Importar proyectos con `getCollection('projects')`.
- Verificar que el script del modal usa `initModal` de `observer.ts`.
- Verificar que el modal rellena su contenido con los datos del proyecto clickeado.
- Verificar la lógica de filtrado por `type`.
- Verificar los atributos de accesibilidad del modal.

**BlogFeed.astro**
- Obtener posts con `getCollection('blog', ({ data }) => !data.draft)`.
- Ordenar por fecha descendente.
- Identificar el post `featured` correctamente.
- Pasar `featured: true` al post destacado en el Bento.

**StatsSection.astro**
- Importar datos de stats desde `src/data/siteConfig.ts` o archivo propio.
- Verificar que el script del contador usa tipos explícitos.
- Verificar que el contador respeta `prefers-reduced-motion`.
- Verificar que el `IntersectionObserver` hace `unobserve` después de activar.

**TeamGrid.astro**
- Importar `team` de `src/data/team.ts`.
- Verificar que pasa todos los props requeridos a `TeamCard`.
- Verificar que llama `initScrollAnimations()` de `observer.ts`.

### Validación
- [ ] `astro check` sin errores en los 13 Smart components.
- [ ] Ningún Smart redefine funciones que están en `observer.ts`.
- [ ] No hay `any` en ningún componente Smart.
- [ ] Los datos de cada Smart vienen exclusivamente de `src/data/` o `astro:content`.

---

## Fase 9 — Interactividad: Acordeón y Menú Mobile

### Objetivo
Verificar que el acordeón FAQ y el menú mobile tienen la interactividad
completa definida en `refactorizacionCodigo.md`.

### Archivos
- `src/components/smart/FaqAccordion.astro`
- `src/components/ui/common/Navbar.astro`

### Tareas — FaqAccordion.astro (script)

Verificar que el script implementa:
- Selección tipada: `querySelectorAll<HTMLButtonElement>('.faq-trigger')`.
- Función `closeAll(): void` que cierra todos los ítems.
- Cada trigger al hacer click:
  - Llama `closeAll()`.
  - Si el ítem estaba cerrado, lo abre.
  - Actualiza `aria-expanded` del trigger.
  - Agrega `is-open` al `.faq-content` adyacente.
  - Agrega `is-open` al `.faq-icon` dentro del trigger.
- Cada trigger con `keydown` para `Escape` llama `closeAll()`.
- El buscador usa `debounce(fn, 300)` importado de `observer.ts`.
- La búsqueda normaliza tildes con `normalize('NFD').replace(/[\u0300-\u036f]/g, '')`.
- Los tabs llaman `closeAll()` antes de filtrar.
- Los ítems ocultos tienen `tabindex="-1"`.
- Cleanup en `astro:before-swap`.

### Tareas — Navbar.astro (script — verificación)

Verificar que el script implementa:
- `trapFocus` importado de `observer.ts`.
- Cleanup de todos los listeners en `astro:before-swap`.
- La función de indicador de scroll usa `{ passive: true }` en el listener.

### Validación
- [ ] Click en pregunta abre la respuesta.
- [ ] Click en otra pregunta cierra la anterior y abre la nueva.
- [ ] `Escape` cierra el ítem activo.
- [ ] El buscador filtra sin distinguir tildes ni mayúsculas.
- [ ] Los tabs filtran y cierran el ítem abierto.
- [ ] El menú mobile tiene focus trap activo.
- [ ] `Escape` cierra el menú mobile.
- [ ] Los listeners se limpian en `astro:before-swap`.

---

## Fase 10 — Interactividad: Modales y Slider

### Objetivo
Verificar que los modales del portfolio y el slider de testimonios
tienen la interactividad completa y accesible.

### Archivos
- `src/components/smart/PortfolioGallery.astro`
- `src/components/smart/TestimonialsGrid.astro`

### Tareas — PortfolioGallery.astro (modal)

Verificar que el modal implementa:
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` apuntando al título.
- Al abrir: foco va al botón X (`closeBtn.focus()`).
- Al cerrar: foco regresa al trigger que abrió el modal.
- `trapFocus` activo dentro del modal mientras está abierto.
- `Escape` cierra el modal.
- Click en overlay cierra el modal.
- Body con `overflow-hidden` mientras está abierto.
- El listener de `Escape` verifica que el modal esté abierto antes de cerrar.
- Cleanup en `astro:before-swap`.

Verificar que el modal se rellena dinámicamente con los datos del proyecto:
- Título.
- Imagen.
- Descripción.
- Tecnologías como `.chip-tech`.
- Botón "Ver demo" solo si `demo` existe en los datos del proyecto.

### Tareas — TestimonialsGrid.astro (slider)

Verificar que el slider implementa:
- Selección tipada del track, flechas y puntos.
- Función `scrollToSlide(index: number): void`.
- Función `getCurrentSlide(): number` basada en `scrollLeft`.
- Función `updatePagination(index: number): void`.
- La flecha anterior se deshabilita en el slide 0.
- La flecha siguiente se deshabilita en el último slide.
- Los puntos tienen `aria-label="Ir al testimonio [N]"`.
- El punto activo tiene `aria-current="true"`.
- El contenedor tiene `aria-live="polite"`.
- El scroll del track detecta el slide activo y llama `updatePagination`.
- Cleanup en `astro:before-swap`.

### Validación
- [ ] El modal del portfolio tiene `role`, `aria-modal`, `aria-labelledby`.
- [ ] El foco va al botón X al abrir el modal.
- [ ] El foco regresa al trigger al cerrar.
- [ ] `Escape` cierra el modal.
- [ ] El slider deshabilita las flechas en los extremos.
- [ ] Los puntos de paginación reflejan el slide activo.
- [ ] `aria-live="polite"` está implementado en el slider.

---

## Fase 11 — Interactividad: Filtros, Toggle y Dropdown

### Objetivo
Verificar que el filtrado de grillas, el toggle de precios y el dropdown
del Navbar tienen la interactividad correcta y accesible.

### Archivos
- `src/components/smart/ServicesGrid.astro`
- `src/components/smart/PortfolioGallery.astro`
- `src/components/smart/PricingSection.astro`
- `src/components/ui/common/Navbar.astro`

### Tareas — Filtros de grillas

Para `ServicesGrid` y `PortfolioGallery` verificar:
- El contenedor de tabs tiene `role="tablist"`.
- Cada tab tiene `role="tab"`.
- El tab activo tiene `aria-selected="true"`. Los demás `aria-selected="false"`.
- Los ítems ocultos tienen `tabindex="-1"`.
- Los ítems visibles tienen `tabindex="0"`.
- El tab "Todos" muestra todos los ítems.
- La transición de opacidad usa la clase `hidden-by-filter` de `global.css`.
- El primer tab está activo al cargar la página.

### Tareas — Toggle de precios

Para `PricingSection` verificar:
- El botón toggle tiene `role="switch"`.
- El botón toggle tiene `aria-checked="false"` inicial.
- Al cambiar: `aria-checked` alterna entre `"true"` y `"false"`.
- Los precios de todos los planes se actualizan al cambiar.
- Los planes sin `priceAnnual` no cambian al activar el modo anual.
- El badge de ahorro aparece solo en modo anual.
- El cambio de precio es instantáneo (sin animación).

### Tareas — Dropdown del Navbar

Verificar:
- El link padre tiene `aria-haspopup="true"`.
- El link padre tiene `aria-expanded="false"` inicial.
- En hover en desktop: `aria-expanded` pasa a `"true"`.
- El dropdown tiene `role="menu"`.
- Cada link del dropdown tiene `role="menuitem"`.
- `Escape` cuando el foco está dentro del dropdown: cierra y devuelve foco al padre.
- Click fuera del dropdown cierra el dropdown.
- En mobile el dropdown no existe en el DOM.

### Validación
- [ ] Los filtros tienen `role="tablist"` y `role="tab"`.
- [ ] `aria-selected` cambia correctamente en los filtros.
- [ ] Los ítems ocultos tienen `tabindex="-1"`.
- [ ] El toggle tiene `role="switch"` y `aria-checked`.
- [ ] El dropdown tiene `role="menu"` y los items `role="menuitem"`.
- [ ] `Escape` cierra el dropdown y devuelve el foco.

---

## Fase 12 — BlogContentFormatter y TOC

### Objetivo
Verificar que el formateador de contenido del blog y el TOC funcionan
correctamente con tipos y sin errores.

### Archivos
- `src/components/ui/common/BlogContentFormatter.astro`
- `src/layouts/BlogLayout.astro`
- `src/data/blogTerms.ts`

### Tareas — blogTerms.ts

Verificar que la interfaz `BlogTerm` tiene todos los campos:
- `term: string`
- `type: 'internal-link' | 'external-link' | 'highlight' | 'definition'`
- `href?: string`
- `definition?: string`
- `caseSensitive?: boolean`

Verificar que el array `blogTerms` tiene al menos 8 términos bien definidos.
Verificar que los `href` de los `internal-link` apuntan a rutas existentes.

### Tareas — BlogContentFormatter.astro

Verificar que el script implementa:

- `escapeRegex(str: string): string` — tipada.
- `processTextNode(node: Text): void` — tipada.
- Guard de nodos prohibidos: `['CODE', 'PRE', 'A', 'H1', 'H2', 'H3', 'H4', 'MARK', 'SPAN']`.
- Solo transforma la primera aparición por nodo de texto (variable `replaced: boolean`).
- `walkTextNodes(root: Element): void` — usa `TreeWalker` tipado.
- El script no usa `innerHTML` para insertar. Usa `span.innerHTML` de forma controlada
  solo para el nodo procesado, verificando que el HTML insertado es seguro
  (viene de los datos controlados de `blogTerms.ts`).
- La función importa `blogTerms` correctamente desde `@/data/blogTerms`.

### Tareas — TOC en BlogLayout.astro

Verificar que el script del TOC:
- Lee todos los `h2` y `h3` del contenido con tipos:
  `querySelectorAll<HTMLHeadingElement>('h2, h3')`.
- Construye el TOC dinámicamente con links al `id` de cada heading.
- Si los headings no tienen `id`, los genera desde el texto del heading.
- Usa `IntersectionObserver` para marcar el link activo.
- El link activo tiene clase `active`.
- El TOC tiene `aria-label="Tabla de contenidos"`.
- El TOC tiene `role="navigation"`.
- El TOC no se renderiza si hay menos de 2 headings.

### Validación
- [ ] El formateador transforma `internal-link` correctamente.
- [ ] El formateador no transforma texto dentro de nodos prohibidos.
- [ ] Solo transforma la primera aparición por nodo.
- [ ] El TOC se genera dinámicamente con los headings del artículo.
- [ ] El TOC marca el heading activo al hacer scroll.
- [ ] El TOC tiene `role="navigation"` y `aria-label`.
- [ ] `astro check` sin errores en ambos archivos.

---

## Fase 13 — Imágenes: Auditoría Global

### Objetivo
Verificar que todas las imágenes del sitio usan `<Image />` de `astro:assets`,
tienen `alt` descriptivo, `width`, `height` y los atributos correctos de carga.

### Archivos
Todos los componentes que contienen imágenes.

### Tareas

Recorrer los siguientes componentes y verificar cada imagen:

- `src/components/ui/sections/Hero.astro`
- `src/components/ui/cards/BlogCard.astro`
- `src/components/ui/cards/ProjectCard.astro`
- `src/components/ui/cards/TeamCard.astro`
- `src/components/ui/common/TestimonialQuote.astro`
- `src/components/smart/TestimonialsGrid.astro` — logos de clientes
- `src/layouts/BlogLayout.astro` — imagen del post
- `src/layouts/ProjectLayout.astro` — imagen del proyecto

Para cada imagen verificar:

| Verificación | Regla |
|---|---|
| Usa `<Image />` de `astro:assets` | No usar `<img>` |
| Tiene `alt` no vacío | Salvo decorativas |
| Tiene `width` y `height` | Siempre |
| Imagen del Hero | `loading="eager"` + `fetchpriority="high"` |
| Imágenes debajo del fold | `loading="lazy"` + `decoding="async"` |
| Imágenes decorativas | `alt=""` + `aria-hidden="true"` |
| Avatares | `alt` con nombre de persona |
| Logos de clientes | `alt` con nombre de empresa |
| Imágenes de proyectos | `alt` con nombre del proyecto |

### Validación
- [ ] No hay `<img>` sin `<Image />` en ningún componente.
- [ ] Toda imagen tiene `alt` (descriptivo o vacío según su rol).
- [ ] La imagen del Hero tiene `fetchpriority="high"`.
- [ ] Todas las imágenes debajo del fold tienen `loading="lazy"`.
- [ ] `astro check` sin errores relacionados con imágenes.

---

## Fase 14 — Schemas JSON-LD y Datos Estructurados

### Objetivo
Implementar todos los schemas JSON-LD requeridos en las páginas correctas.

### Archivos
- `src/layouts/BaseLayout.astro`
- `src/layouts/BlogLayout.astro`
- `src/pages/contact.astro`
- `src/data/siteConfig.ts`

### Tareas — siteConfig.ts

Verificar que tiene los campos necesarios para los schemas:
- `name: string` — nombre de la empresa
- `url: string` — URL de producción
- `logo: string` — ruta al logo
- `description: string` — descripción de la empresa
- `address.city: string`
- `address.country: string`
- `phone?: string`
- `email?: string`
- `social: string[]` — URLs de redes sociales

### Tareas — Schemas en layouts y páginas

**BaseLayout.astro** — Schema `Organization`
- Construir el objeto del schema con datos de `siteConfig.ts`.
- Insertarlo como `<script type="application/ld+json">` en el `<head>`.
- No hardcodear ningún valor.

**BlogLayout.astro** — Schema `Article`
- Construir el objeto con datos de las props del layout.
- `headline` del `title`.
- `datePublished` y `dateModified` en formato ISO.
- `author` con el nombre de la empresa.
- `image` con la URL absoluta de la imagen del post.
- `url` con la URL canónica del post.

**contact.astro** — Schema `LocalBusiness`
- Construir el objeto con datos de `siteConfig.ts`.
- Incluir `telephone`, `email`, `address`.

### Validación
- [ ] El schema de `Organization` está en `BaseLayout`.
- [ ] El schema de `Article` está en `BlogLayout`.
- [ ] El schema de `LocalBusiness` está en `contact.astro`.
- [ ] Ningún schema tiene valores hardcodeados.
- [ ] Los schemas son JSON válido (verificar con validador de schema.org).

---

## Fase 15 — Auditoría de Indentación y Formato

### Objetivo
Verificar que todos los archivos del proyecto tienen indentación correcta,
formato consistente y sin código muerto.

### Archivos
Todos los archivos en `src/`.

### Tareas

**Indentación**
- Verificar que todos los archivos `.astro`, `.ts` y `.css` usan 2 espacios.
- Verificar que no hay tabs mezclados con espacios.
- Verificar que ninguna línea supera 100 caracteres.

**Orden de atributos en HTML**
Verificar el orden correcto en los elementos:
1. `id`
2. `class` o `class:list`
3. `role`, `aria-*`, `data-*`
4. `href`, `src`, `type`, `for`
5. `loading`, `decoding`, `fetchpriority`

**Imports sin usar**
- Recorrer todos los componentes y eliminar imports que no se usan.

**Código comentado**
- Eliminar bloques de código comentado que ya no se usan.
- Los comentarios que quedan explican el por qué, no el qué.

**Props en múltiples líneas**
- Verificar que los elementos con más de 3 props están en múltiples líneas.

**Variables descriptivas**
- Verificar que todas las variables del frontmatter tienen nombres en camelCase.
- No usar nombres de una sola letra salvo en iteradores (`i`, `j`).

### Validación
- [ ] `astro check` sin errores ni warnings.
- [ ] `astro build` sin errores.
- [ ] No hay imports sin usar en ningún archivo.
- [ ] No hay código comentado sin propósito.
- [ ] La indentación es consistente en todos los archivos.

---

## Fase 16 — Revisión Final y Validación Global

### Objetivo
Validación completa del proyecto después de todas las fases. Verificar
que el sitio funciona correctamente, tiene SEO completo y cero errores.

### Checklist Técnico

- [ ] `astro check` reporta cero errores.
- [ ] `astro build` completa sin errores ni warnings críticos.
- [ ] No hay `any` en ningún archivo TypeScript o Astro.
- [ ] No hay imports sin usar en ningún archivo.
- [ ] `src/types/index.ts` es importado correctamente en los componentes que lo necesitan.
- [ ] `src/scripts/observer.ts` exporta las 5 funciones y todas están en uso.

### Checklist de Arquitectura

- [ ] Ningún componente en `ui/` importa desde `src/data/`.
- [ ] Ningún componente en `smart/` tiene lógica de presentación compleja.
- [ ] Todos los componentes Dumb tienen interfaz `Props` completa.
- [ ] Todos los props opcionales tienen valores por defecto.
- [ ] Los tipos compartidos están en `src/types/index.ts`.
- [ ] Las interfaces de datos están en sus archivos `src/data/*.ts`.

### Checklist de Interactividad

- [ ] El acordeón FAQ cierra los demás al abrir uno.
- [ ] El acordeón responde a `Escape`.
- [ ] El buscador del FAQ usa debounce y normaliza tildes.
- [ ] El menú mobile tiene focus trap.
- [ ] El menú mobile gestiona `aria-expanded` y `aria-label`.
- [ ] Los modales tienen focus trap y gestionan el foco al cerrar.
- [ ] Los filtros tienen `role="tablist"`, `role="tab"`, `aria-selected`.
- [ ] El slider tiene `aria-live` y controles accesibles.
- [ ] El toggle de precios tiene `role="switch"` y `aria-checked`.
- [ ] El dropdown del Navbar cierra con `Escape`.
- [ ] Todos los listeners se limpian en `astro:before-swap`.

### Checklist de SEO

- [ ] Cada página tiene `title` único de máximo 60 caracteres.
- [ ] Cada página tiene `description` única de 120-160 caracteres.
- [ ] Cada página tiene `canonical` absoluta.
- [ ] Cada página tiene meta tags OG y Twitter completos.
- [ ] Exactamente un `<h1>` por página.
- [ ] No hay saltos en la jerarquía de headings.
- [ ] Todas las imágenes tienen `alt` descriptivo o vacío según su rol.
- [ ] La imagen del Hero tiene `fetchpriority="high"`.
- [ ] Los schemas JSON-LD están en las páginas correspondientes.
- [ ] `privacy.astro` y `terms.astro` tienen `noindex: true`.
- [ ] `<html lang="es">` en `BaseLayout`.

### Checklist de Accesibilidad

- [ ] Todo elemento interactivo tiene estado `focus` visible.
- [ ] Los botones de solo ícono tienen `aria-label`.
- [ ] Las imágenes decorativas tienen `alt=""` y `aria-hidden="true"`.
- [ ] Los inputs tienen `<label>` con `for` e `id` asociados.
- [ ] El color no es el único medio para comunicar información.
- [ ] Los modales tienen `role="dialog"` y `aria-modal="true"`.
- [ ] El TOC tiene `role="navigation"` y `aria-label`.
- [ ] Los elementos ocultos por filtrado tienen `tabindex="-1"`.