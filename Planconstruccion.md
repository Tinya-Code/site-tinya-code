# Plan de Construcción — Tinya Code

## Reglas Globales del Agente

- Antes de iniciar cualquier fase leer `guiaEstilo.md` y `reglasUso.md` ubicados en la raíz del proyecto.
- Cada fase debe completarse y validarse antes de iniciar la siguiente.
- Para cualquier imagen usar `/generico.jpeg` disponible en `public/generico.jpeg`.
- No inventar contenido real, usar placeholders descriptivos.
- No hardcodear textos en componentes, todo valor editable va en `src/data/`.
- Seguir en todo momento los principios definidos en `reglasUso.md`.
- Seguir en todo momento la guía visual definida en `guiaEstilo.md`.
- Seguir en todo momento el mapa del sitio que define el contneido del sitio definida en `mapasitio.md`.


---

## Fase 1 — Configuración Base y Archivos Globales

### Objetivo
Tener el proyecto funcional con navegación, estilos globales y layouts operativos.

### Archivos a trabajar
- `src/consts.ts`
- `src/data/siteConfig.ts`
- `src/data/navigation.ts`
- `src/data/social.ts`
- `src/styles/global.css`
- `src/styles/typography.css`
- `src/components/ui/common/BaseHead.astro`
- `src/components/ui/common/SEO.astro`
- `src/components/ui/common/Icon.astro`
- `src/components/ui/common/Navbar.astro`
- `src/components/ui/common/Footer.astro`
- `src/layouts/BaseLayout.astro`

### Validación
- [ ] El proyecto compila sin errores con `astro dev`
- [ ] Navbar y Footer se renderizan correctamente
- [ ] Los estilos globales de `guiaEstilo.md` están aplicados
- [ ] Los links del Navbar coinciden con los definidos en `navigation.ts`
- [ ] El SEO base se refleja en el `<head>` de la página

---

## Fase 2 — Layout de Páginas y Página Home (estructura)

### Objetivo
Tener `PageLayout.astro` funcionando y la página Home con su estructura de secciones vacías pero renderizando sin errores.

### Archivos a trabajar
- `src/layouts/PageLayout.astro`
- `src/components/ui/buttons/Button.astro`
- `src/components/ui/buttons/ButtonOutline.astro`
- `src/components/ui/sections/SectionHeader.astro`
- `src/pages/index.astro`

### Validación
- [ ] `PageLayout.astro` extiende correctamente `BaseLayout.astro`
- [ ] La página `/` carga sin errores
- [ ] `SectionHeader.astro` acepta props de título y subtítulo y los renderiza
- [ ] Los botones respetan los estilos de `guiaEstilo.md`
- [ ] No hay textos hardcodeados en los componentes

---

## Fase 3 — Sección Hero y CallToAction

### Objetivo
Tener las secciones Hero y CallToAction funcionales y conectadas a datos.

### Archivos a trabajar
- `src/data/siteConfig.ts` — agregar textos del Hero y CTA
- `src/components/ui/sections/Hero.astro`
- `src/components/ui/sections/CallToAction.astro`
- `src/pages/index.astro` — integrar Hero y CTA

### Validación
- [ ] Hero muestra headline, subtítulo y botones desde `siteConfig.ts`
- [ ] CallToAction muestra el texto y botón desde `siteConfig.ts`
- [ ] La imagen del Hero usa `/generico.jpeg`
- [ ] Ambas secciones son responsivas según `guiaEstilo.md`
- [ ] No hay valores hardcodeados en los componentes

---

## Fase 4 — Datos y Grilla de Servicios

### Objetivo
Tener los servicios definidos en data y renderizados en Home mediante el patrón Smart/Dumb.

### Archivos a trabajar
- `src/data/services.ts`
- `src/components/ui/cards/ServiceCard.astro`
- `src/components/smart/ServicesGrid.astro`
- `src/pages/index.astro` — integrar ServicesGrid

### Validación
- [ ] `services.ts` contiene todos los servicios definidos en el mapa del sitio
- [ ] `ServiceCard.astro` solo recibe props, no importa datos
- [ ] `ServicesGrid.astro` importa desde `services.ts` y pasa props a `ServiceCard`
- [ ] La grilla se renderiza correctamente en `/`
- [ ] Las imágenes de las cards usan `/generico.jpeg`

---

## Fase 5 — Razones, Por Qué Elegirnos y Metodología

### Objetivo
Tener las tres secciones informativas clave funcionando en Home con sus datos y componentes.

### Archivos a trabajar
- `src/data/reasons.ts`
- `src/data/whyUs.ts`
- `src/data/methodology.ts`
- `src/components/ui/cards/ReasonCard.astro`
- `src/components/ui/sections/WhyChooseUs.astro`
- `src/components/ui/sections/Methodology.astro`
- `src/components/smart/ReasonsGrid.astro`
- `src/pages/index.astro` — integrar las tres secciones

### Validación
- [ ] `ReasonsGrid.astro` carga desde `reasons.ts` y renderiza `ReasonCard`
- [ ] `WhyChooseUs.astro` carga desde `whyUs.ts`
- [ ] `Methodology.astro` carga desde `methodology.ts` y muestra las 5 fases
- [ ] Las tres secciones aparecen en `/` sin errores
- [ ] Todos los textos vienen desde los archivos de data

---

## Fase 6 — Testimonios y Sectores en Home

### Objetivo
Tener testimonios y sectores definidos en data y renderizados en Home.

### Archivos a trabajar
- `src/data/testimonials.ts`
- `src/data/sectors.ts`
- `src/components/ui/cards/TestimonialCard.astro`
- `src/components/ui/cards/SectorCard.astro`
- `src/components/smart/TestimonialsGrid.astro`
- `src/components/smart/SectorsGrid.astro`
- `src/pages/index.astro` — integrar ambas grillas

### Validación
- [ ] `TestimonialsGrid` y `SectorsGrid` siguen el patrón Smart/Dumb
- [ ] Las imágenes de testimonios usan `/generico.jpeg`
- [ ] Los sectores coinciden con los definidos en el mapa del sitio
- [ ] Ambas secciones se renderizan en `/` sin errores

---

## Fase 7 — Página de Servicios General e Individual

### Objetivo
Tener la página general de servicios y cada página individual funcionando.

### Archivos a trabajar
- `src/pages/services/index.astro`
- `src/pages/services/web-design.astro`
- `src/pages/services/ecommerce.astro`
- `src/pages/services/landing-pages.astro`
- `src/pages/services/software.astro`
- `src/pages/services/excel-appscript.astro`
- `src/pages/services/saas.astro`
- `src/components/ui/sections/AidaBanner.astro`
- `src/components/ui/sections/DepositBadge.astro`
- `src/data/services.ts` — ampliar con detalle por servicio

### Validación
- [ ] Todas las rutas `/services/*` cargan sin errores
- [ ] Cada página individual muestra datos desde `services.ts`
- [ ] `AidaBanner` aparece en `landing-pages.astro`
- [ ] `DepositBadge` aparece en las páginas que corresponden
- [ ] No hay contenido hardcodeado en ninguna página

---

## Fase 8 — Páginas de Sectores

### Objetivo
Tener todas las páginas de sectores funcionando con su contenido desde data.

### Archivos a trabajar
- `src/pages/sectors/index.astro`
- `src/pages/sectors/construccion.astro`
- `src/pages/sectors/mineria.astro`
- `src/pages/sectors/industrias.astro`
- `src/pages/sectors/servicios-generales.astro`
- `src/pages/sectors/corporativos.astro`
- `src/pages/sectors/mypes.astro`
- `src/data/sectors.ts` — ampliar con detalle por sector

### Validación
- [ ] Todas las rutas `/sectors/*` cargan sin errores
- [ ] Cada sector muestra su contenido desde `sectors.ts`
- [ ] Las imágenes usan `/generico.jpeg`
- [ ] Los links desde `SectorCard` en Home apuntan correctamente a cada ruta

---

## Fase 9 — Pricing y FAQ

### Objetivo
Tener las páginas de planes de precios y preguntas frecuentes completas.

### Archivos a trabajar
- `src/data/pricing.ts`
- `src/data/faq.ts`
- `src/components/ui/cards/PricingCard.astro`
- `src/components/ui/sections/PricingTable.astro`
- `src/components/smart/PricingSection.astro`
- `src/components/smart/FaqAccordion.astro`
- `src/pages/pricing.astro`
- `src/pages/faq.astro`

### Validación
- [ ] `/pricing` muestra todos los planes desde `pricing.ts`
- [ ] `/faq` muestra todas las preguntas desde `faq.ts`
- [ ] `FaqAccordion` abre y cierra cada pregunta correctamente
- [ ] `PricingSection` sigue el patrón Smart/Dumb
- [ ] Los estilos respetan `guiaEstilo.md`

---

## Fase 10 — Páginas About, Testimonios, Portfolio y Contacto

### Objetivo
Tener las páginas informativas y de conversión completas.

### Archivos a trabajar
- `src/pages/about.astro`
- `src/pages/testimonials.astro`
- `src/pages/portfolio.astro`
- `src/pages/contact.astro`
- `src/components/ui/sections/ContactForm.astro`
- `src/components/smart/PortfolioGallery.astro`
- `src/components/ui/cards/ProjectCard.astro`

### Validación
- [ ] Todas las rutas cargan sin errores
- [ ] `/testimonials` muestra todos los testimonios desde `testimonials.ts`
- [ ] `/portfolio` muestra las cards con `/generico.jpeg`
- [ ] `/contact` muestra el formulario correctamente
- [ ] `/about` muestra razones para confiar desde `reasons.ts`

---

## Fase 11 — Content Collections: Blog y Projects

### Objetivo
Tener las Content Collections configuradas con layouts propios y rutas dinámicas funcionando.

### Archivos a trabajar
- `src/content.config.ts` — definir schemas de blog y projects
- `src/layouts/BlogLayout.astro`
- `src/layouts/ProjectLayout.astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/[...slug].astro`
- `src/pages/projects/index.astro`
- `src/pages/projects/[...slug].astro`
- `src/components/smart/BlogFeed.astro`
- `src/content/blog/` — agregar 1 post de prueba en `.mdx`
- `src/content/projects/` — agregar 1 proyecto de prueba en `.mdx`

### Validación
- [ ] El schema de `content.config.ts` valida correctamente los frontmatter
- [ ] `/blog` lista el post de prueba
- [ ] `/blog/[slug]` renderiza el post individual sin errores
- [ ] `/projects` lista el proyecto de prueba
- [ ] `/projects/[slug]` renderiza el proyecto con `ProjectLayout`
- [ ] RSS en `/rss.xml` genera el feed correctamente

---

## Fase 12 — Revisión Final y Validación Global

### Objetivo
Validar que el sitio completo funciona, sin errores de build, con buena calidad visual y cumpliendo todas las reglas.

### Checklist de validación
- [ ] `astro build` ejecuta sin errores ni warnings críticos
- [ ] Todas las rutas del mapa del sitio responden correctamente
- [ ] Ningún componente tiene textos o valores hardcodeados
- [ ] Todas las imágenes usan `/generico.jpeg`
- [ ] Todos los componentes Dumb solo reciben props
- [ ] Todos los componentes Smart son los únicos que importan desde `src/data/`
- [ ] El sitemap en `/sitemap.xml` incluye todas las rutas
- [ ] El RSS en `/rss.xml` es válido
- [ ] Los meta tags SEO están presentes en todas las páginas
- [ ] El sitio es responsivo en mobile, tablet y desktop según `guiaEstilo.md`
- [ ] Los colores, tipografías y espaciados respetan `guiaEstilo.md`
- [ ] Todos los links internos del Navbar y Footer funcionan