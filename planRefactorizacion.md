# Plan de Implementación de Refactorización Visual — Tinya Code

## Reglas del Agente para este Plan

- Leer `guiaEstilo.md` completo antes de iniciar cualquier fase.
- Leer `reglasUso.md` antes de modificar cualquier componente.
- Leer `refactorizacion.md` completo antes de iniciar cualquier fase.
- Leer las reglas de animación antes de agregar cualquier movimiento nuevo.
- No modificar lógica de datos ni schemas salvo que la fase lo indique explícitamente.
- Cada fase se valida completamente antes de continuar con la siguiente.
- Usar `/generico.jpeg` para toda imagen placeholder.
- Ningún componente define `@keyframes` localmente. Todo va en `global.css`.
- Verificar `prefers-reduced-motion` en cada elemento animado nuevo.
- Validar en mobile, tablet y desktop al finalizar cada fase.

---

## Fase 1 — Infraestructura CSS para la Refactorización

### Objetivo
Agregar en `global.css` todos los bloques CSS nuevos que requiere la
refactorización antes de tocar cualquier componente. Esta fase no modifica
ningún componente ni dato.

### Archivos
- `src/styles/global.css`

### Tareas

**Bloque 1 — Bento Grid**
- Agregar `.bento-grid` con `grid-template-columns: repeat(6, 1fr)`.
- Agregar `.bento-item-featured`, `.bento-item-secondary`, `.bento-item-small`.
- Agregar breakpoint mobile que colapsa todo a `grid-cols-1`.
- Agregar `.bento-overlay` con `opacity: 0` y `transition: opacity 300ms ease`.
- Agregar `.bento-item:hover .bento-overlay` con `opacity: 1`.
- Agregar bloque `prefers-reduced-motion` que fija `opacity: 1` en `.bento-overlay`.

**Bloque 2 — Blog Bento**
- Agregar `.blog-bento` con `grid-template-columns: repeat(6, 1fr)`.
- Agregar `.blog-bento-featured` y `.blog-bento-secondary`.
- Agregar breakpoint mobile.

**Bloque 3 — Prose Blog**
- Agregar clase `.prose-blog` completa con todos los elementos tipográficos:
  `p`, `h2`, `h3`, `ul`, `ol`, `li`, `code`, `pre`, `blockquote`, `img`, `a`.

**Bloque 4 — TOC**
- Agregar `.toc-link`, `.toc-link.active`, `.toc-link-h3`.
- Agregar `prefers-reduced-motion`.

**Bloque 5 — Barra de progreso de lectura**
- Agregar `.reading-progress-bar`.
- Agregar `prefers-reduced-motion`.

**Bloque 6 — Formateador de blog**
- Agregar `.blog-link-internal` con `::after` de flecha `→`.
- Agregar `.blog-link-external` con `::after` de flecha `↗`.
- Agregar `.blog-highlight`.
- Agregar `.blog-definition` con tooltip `::after`.
- Agregar estados hover y focus en `.blog-definition`.
- Agregar `prefers-reduced-motion` para el tooltip.

**Bloque 7 — Chips y Badges nuevos**
- Agregar `.chip-sector`, `.chip-sector:hover`, `.chip-sector.active`.
- Agregar `.chip-category`.
- Agregar `.chip-tech`.
- Agregar `.badge-status-live` con `::before` animado.
- Agregar `.badge-status-demo`.
- Agregar `@keyframes pulse-dot`.
- Agregar `prefers-reduced-motion` para `pulse-dot`.

**Bloque 8 — Modal de portfolio y proyectos**
- Agregar `.project-modal-overlay` con `opacity: 0` y `pointer-events: none`.
- Agregar `.project-modal-overlay.is-open`.
- Agregar `.project-modal-content` con `transform: translateY(16px)`.
- Agregar `.project-modal-overlay.is-open .project-modal-content`.
- Agregar `prefers-reduced-motion`.

**Bloque 9 — Team Card**
- Agregar `.team-photo` con `filter: grayscale(20%)` y `transition: filter 300ms ease`.
- Agregar `.team-card:hover .team-photo` con `filter: grayscale(0%)`.
- Agregar `prefers-reduced-motion`.

**Bloque 10 — Navbar scroll shadow**
- Agregar `.navbar-scrolled` con `shadow-sm` y `transition: box-shadow 300ms ease`.

**Bloque 11 — Filtrado de grillas**
- Agregar `.service-card-item` con `transition: opacity 300ms ease`.
- Agregar `.service-card-item.hidden-by-filter`.
- Agregar `.faq-item.hidden-by-search`.
- Agregar `prefers-reduced-motion` para `.service-card-item`.

**Bloque 12 — Logos scroll infinito**
- Agregar `@keyframes logos-scroll`.
- Agregar `.logos-track` con `animation: logos-scroll 20s linear infinite`.
- Agregar `prefers-reduced-motion` que desactiva la animación y usa `flex-wrap`.

**Bloque 13 — Secciones con patrón de puntos**
- Agregar `.section-stats-bg` con `radial-gradient` sobre `bg-dark`.
- Agregar `.section-cta-bg` con `radial-gradient` sobre `bg-brand`.

**Bloque 14 — Metodología horizontal**
- Agregar `.methodology-step-number` con estilos de hover.
- Agregar `.methodology-connector` para la línea horizontal en desktop.

### Validación
- [ ] `astro dev` compila sin errores.
- [ ] No hay `@keyframes` duplicados.
- [ ] Cada bloque animado tiene su `prefers-reduced-motion`.
- [ ] No se modificó ningún componente en esta fase.

---

## Fase 2 — Datos: Nuevos Campos y Archivos

### Objetivo
Actualizar los archivos de `src/data/` con los nuevos campos que requieren
los componentes refactorizados y crear los archivos nuevos necesarios.

### Archivos
- `src/data/services.ts` — agregar campo `category`
- `src/data/faq.ts` — agregar campo `category`
- `src/data/pricing.ts` — agregar campos `priceMonthly`, `priceAnnual`, `featured`
- `src/data/team.ts` — crear desde cero
- `src/data/blogTerms.ts` — crear desde cero
- `src/data/siteConfig.ts` — agregar textos del CTA de confianza

### Tareas — services.ts
- Agregar campo `category: 'web' | 'software' | 'automatizacion'` a cada servicio.
- Agregar campo `technologies: string[]` — máximo 4 tecnologías por servicio.
- Agregar campo `estimatedTime: string` — ejemplo: "7 días hábiles".
- Agregar campo `longDescription: string` — para la expansión de card.
- No modificar campos existentes, solo agregar los nuevos.

### Tareas — faq.ts
- Agregar campo `category: 'general' | 'proceso' | 'precios' | 'tecnico'` a cada pregunta.
- No modificar campos existentes.

### Tareas — pricing.ts
- Agregar campo `priceMonthly: number` a cada plan.
- Agregar campo `priceAnnual: number` a cada plan.
- Agregar campo `featured: boolean` — solo un plan tiene `true`.
- Agregar campo `badge?: string` — texto del badge del plan destacado.
- Renombrar o adaptar el campo de precio existente para no romper componentes actuales.

### Tareas — team.ts
- Crear el archivo con la interfaz `TeamMember` completa.
- Definir el array `team` con al menos 2 miembros placeholder.
- Campos: `name`, `role`, `bio`, `photo`, `skills`, `linkedin?`, `github?`.
- Usar `/generico.jpeg` en el campo `photo`.
- Las `skills` tienen máximo 4 ítems.

### Tareas — blogTerms.ts
- Crear el archivo con la interfaz `BlogTerm` completa.
- Definir el array `blogTerms` con los términos iniciales:
  - "Tinya Code" → internal-link → "/"
  - "diseño web" → internal-link → "/services/web-design"
  - "AppScript" → internal-link → "/services/excel-appscript"
  - "tienda virtual" → internal-link → "/services/ecommerce"
  - "landing page" → internal-link → "/services/landing-pages"
  - "software a la medida" → internal-link → "/services/software"
  - "SEO" → definition
  - "UX" → definition
  - "UI" → definition
  - "Astro" → highlight
  - "Tailwind" → highlight

### Tareas — siteConfig.ts
- Agregar sección `ctaTrustItems` con los 3 ítems de confianza del CTA:
  texto, ícono y descripción de cada uno.

### Validación
- [ ] `astro dev` compila sin errores después de cada archivo modificado.
- [ ] Los nuevos campos tienen valores en todos los ítems del array.
- [ ] `team.ts` tiene al menos 2 miembros con todos los campos requeridos.
- [ ] `blogTerms.ts` tiene al menos 8 términos definidos.
- [ ] Ningún componente existente se rompió por los cambios en los datos.

---

## Fase 3 — Navbar Refactorizado

### Objetivo
Navbar con dropdown, indicador de scroll y menú mobile mejorado.

### Archivos
- `src/components/ui/common/Navbar.astro`

### Tareas

**Estructura de tres zonas**
- Verificar que el layout tiene logo izquierda, nav centro, CTA derecha.
- En mobile el CTA del header desaparece y vive solo dentro del menú mobile.

**Dropdown para links con subpáginas**
- Identificar qué links de `navigation.ts` tienen subpáginas.
- Para esos links, agregar un contenedor de dropdown con clase
  `opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200`.
- El link padre tiene clase `group` para activar el grupo de hover.
- El dropdown tiene `bg-white border border-gray-light rounded-sm shadow-sm`.
- Los links del dropdown usan `font-poppins text-sm text-dark hover:text-brand`.
- El dropdown se cierra con `Escape` y con click fuera.

**Indicador de scroll**
- Agregar script que escucha `window.scroll`.
- Si `window.scrollY > 80`, agregar clase `navbar-scrolled` al Navbar.
- Si `window.scrollY <= 80`, quitar la clase.
- La clase `.navbar-scrolled` está definida en `global.css` desde Fase 1.

**CTA del header**
- Actualizar el texto del botón CTA a "Solicitar propuesta".
- Usar `btn-primary` con `px-4 py-2 text-xs`.

**Separador en menú mobile**
- Agregar `border-t border-gray-light` antes del CTA dentro del menú mobile.

### Validación
- [ ] El dropdown aparece en hover en desktop con transición suave.
- [ ] El dropdown se cierra con `Escape` y con click fuera.
- [ ] El Navbar gana `shadow-sm` al hacer scroll hacia abajo.
- [ ] El CTA dice "Solicitar propuesta".
- [ ] En mobile el CTA está dentro del menú con separador encima.
- [ ] El menú mobile gestiona `aria-expanded` correctamente.

---

## Fase 4 — Hero Refactorizado

### Objetivo
Hero con etiqueta de categoría, elemento visual compuesto y fila de confianza.

### Archivos
- `src/components/ui/sections/Hero.astro`
- `src/data/siteConfig.ts` — verificar campos del Hero

### Tareas

**Etiqueta de categoría**
- Agregar elemento sobre el título con layout `flex items-center gap-3`.
- Línea decorativa: `border-t border-brand w-8`.
- Texto: `font-poppins text-xs font-semibold uppercase tracking-widest text-brand`.
- Texto viene de `siteConfig.ts`.

**Elemento visual derecha**
- Implementar la Opción B: imagen con tarjeta flotante de métrica.
- Imagen principal: `<Image />` con `src="/generico.jpeg"` y `aspect-square object-cover rounded-sm`.
- Tarjeta flotante: `position: absolute` sobre la imagen con
  `bg-white border border-gray-light rounded-sm p-4 shadow-sm`.
- La tarjeta muestra una métrica de `siteConfig.ts`.

**Fila de confianza**
- Agregar bajo los botones con layout `flex items-center gap-4 mt-8 flex-wrap`.
- Texto: `font-poppins text-xs text-gray`.
- Logos placeholder con `/generico.jpeg` y `opacity-60`.

### Validación
- [ ] La etiqueta de categoría aparece sobre el título.
- [ ] La tarjeta flotante de métrica está posicionada correctamente.
- [ ] La fila de confianza aparece bajo los botones.
- [ ] El Hero es responsivo. En mobile la columna visual va debajo del contenido.
- [ ] Ningún texto está hardcodeado.

---

## Fase 5 — Sección de Servicios con Tabs y Expansión

### Objetivo
Grilla de servicios con filtrado por tabs y expansión de card en desktop.

### Archivos
- `src/components/smart/ServicesGrid.astro`
- `src/components/ui/cards/ServiceCard.astro`

### Tareas — Tabs

**En ServicesGrid.astro**
- Agregar los tabs sobre la grilla: "Todos", "Web", "Software", "Automatización".
- Los tabs son botones `<button>` con `data-category`.
- Tab activo: `text-brand border-b-2 border-brand`.
- Agregar script que al hacer click en un tab:
  - Marca el tab clickeado como activo.
  - Agrega clase `hidden-by-filter` a las cards que no corresponden a la categoría.
  - Quita la clase a las que sí corresponden.
- El tab "Todos" muestra todas las cards.
- En mobile los tabs hacen scroll horizontal si no caben: `overflow-x-auto`.

### Tareas — Expansión de card

**En ServiceCard.astro**
- Agregar un área expandible al final de la card con clase `faq-content`
  (reutiliza el CSS de acordeón ya definido) o una clase propia `card-expand`.
- El área expandible contiene:
  - Lista de tecnologías como chips `chip-tech`.
  - Tiempo estimado: `font-poppins text-xs text-gray`.
  - Botón de acción: `btn-primary w-full mt-4`.
- El botón de expansión es el link al final de la card. Al hacer click en desktop,
  expande en vez de navegar.
- Agregar `data-service-card` al elemento raíz de la card.
- Agregar script en `ServicesGrid` que:
  - Al hacer click en el link de una card en desktop, previene la navegación.
  - Colapsa la card previamente expandida.
  - Expande la card clickeada alternando clase `is-open`.
  - En mobile no previene la navegación.

### Validación
- [ ] Los tabs filtran las cards correctamente.
- [ ] El tab "Todos" muestra todas las cards.
- [ ] En desktop, el click en la card la expande mostrando tecnologías y tiempo.
- [ ] Solo una card puede estar expandida a la vez.
- [ ] En mobile el click navega a la página del servicio.
- [ ] Las clases `hidden-by-filter` usan la transición de opacidad.

---

## Fase 6 — Sección de Estadísticas Refactorizada

### Objetivo
Stats con patrón de puntos en el fondo y sufijos visuales mejorados.

### Archivos
- `src/components/ui/sections/Stats.astro`
- `src/components/smart/StatsSection.astro`

### Tareas
- Reemplazar clase `bg-dark` del contenedor de sección por `.section-stats-bg`.
- Agregar el separador `divide-x divide-accent/20` entre celdas en desktop.
- Actualizar cada celda para que el número use `.stat-number` con `data-target`
  y el sufijo esté fuera del span del contador con `text-2xl font-bold text-accent`.
- Verificar que el script del contador de la fase de animaciones funciona
  con la nueva estructura.

### Validación
- [ ] El patrón de puntos es visible sobre el fondo `dark`.
- [ ] El patrón no afecta el contraste del texto.
- [ ] El separador entre métricas es visible en desktop.
- [ ] El sufijo aparece siempre, no forma parte del contador.
- [ ] El contador sigue funcionando con `prefers-reduced-motion`.

---

## Fase 7 — Sección de Metodología con Layout Horizontal

### Objetivo
Layout horizontal para desktop con línea conectora superior y hover en steps.

### Archivos
- `src/components/ui/sections/Methodology.astro`
- `src/components/smart/MethodologySection.astro`

### Tareas
- Agregar detección de viewport en el componente para aplicar layout distinto.
- En desktop (si hay exactamente 5 steps): layout `grid grid-cols-5 gap-0 relative`.
- Agregar línea conectora horizontal con `position: absolute` entre los números.
- El número del step usa clase `.methodology-step-number` definida en Fase 1.
- En hover el número cambia a `border-brand text-brand`.
- En mobile mantener el layout vertical existente.
- Si no hay exactamente 5 steps, usar siempre el layout vertical.

### Validación
- [ ] En desktop con 5 steps el layout es horizontal con línea conectora.
- [ ] El hover en cada número cambia el color correctamente.
- [ ] En mobile el layout es vertical.
- [ ] Con menos o más de 5 steps el layout es siempre vertical.

---

## Fase 8 — FAQ con Tabs y Buscador

### Objetivo
FAQ con categorización por tabs y buscador local.

### Archivos
- `src/components/smart/FaqAccordion.astro`

### Tareas

**Tabs de categoría**
- Agregar tabs: "General", "Proceso", "Precios", "Técnico".
- Tab activo por defecto: "General".
- Al cambiar de tab, cerrar todos los ítems abiertos.
- Filtrar ítems por `category` del dato usando `.hidden-by-search` (reutilizar).

**Buscador**
- Agregar input `input-base` sobre los tabs con `placeholder="Buscar pregunta..."`.
- Script con `debounce` de `300ms` que filtra por texto en pregunta y respuesta.
- La búsqueda es case-insensitive y sin distinción de tildes.
- Usar `normalize('NFD').replace(/[\u0300-\u036f]/g, '')` para quitar tildes.
- Si no hay resultados, mostrar mensaje con link a `/contact`.
- Al escribir en el buscador, el tab activo pasa a mostrar todos los resultados
  independientemente de la categoría.

### Validación
- [ ] Los tabs filtran por categoría correctamente.
- [ ] Al cambiar de tab los ítems abiertos se cierran.
- [ ] El buscador filtra en tiempo real con debounce.
- [ ] La búsqueda ignora mayúsculas y tildes.
- [ ] El mensaje de sin resultados tiene link a contacto.
- [ ] El acordeón sigue funcionando con un ítem abierto a la vez.

---

## Fase 9 — Pricing con Toggle y Plan Destacado

### Objetivo
Toggle mensual/anual y plan recomendado con badge y posición elevada.

### Archivos
- `src/components/smart/PricingSection.astro`
- `src/components/ui/cards/PricingCard.astro`
- `src/components/ui/sections/PricingTable.astro`

### Tareas — Toggle

**En PricingSection.astro**
- Agregar toggle sobre la grilla con dos opciones: "Mensual" y "Anual".
- El toggle usa `role="switch"` y `aria-checked`.
- Estilo: pill con indicador deslizante.
- Script que al cambiar el toggle:
  - Cambia todos los precios visibles al valor `priceMonthly` o `priceAnnual`.
  - Si el plan no tiene `priceAnnual`, no cambia.
  - Muestra u oculta el badge de ahorro.

### Tareas — Plan destacado

**En PricingCard.astro**
- Si `featured: true`, agregar badge con `bg-brand text-white` en la parte superior.
- Si `featured: true`, usar `border-brand` en la card.
- En desktop, la card `featured` usa `mt-0` y las otras `mt-4`.
- El ícono de check en la lista de características usa `chip` sin contenedor.

### Validación
- [ ] El toggle cambia los precios correctamente.
- [ ] El toggle tiene `role="switch"` y `aria-checked`.
- [ ] El plan `featured` tiene badge y borde `brand`.
- [ ] En desktop el plan `featured` está elevado visualmente.
- [ ] Los planes sin `priceAnnual` no cambian al activar el toggle anual.

---

## Fase 10 — CTA Final Refactorizado

### Objetivo
CTA con patrón de puntos, línea decorativa y elementos de confianza.

### Archivos
- `src/components/ui/sections/CallToAction.astro`

### Tareas
- Reemplazar `bg-brand` por `.section-cta-bg` en el contenedor de sección.
- Agregar `<span class="line-draw">` sobre el título.
- La línea usa `@keyframes draw-line` ya definido. Color: `white/40`.
- Agregar fila de 3 ítems de confianza bajo el botón.
- Cada ítem: `flex items-center gap-2 font-poppins text-xs text-white/70`.
- Ícono: `size-4 text-white/70`.
- Los textos vienen de `siteConfig.ts`.

### Validación
- [ ] El patrón de puntos es visible sobre el fondo `brand`.
- [ ] La línea decorativa se dibuja al entrar al viewport.
- [ ] Los 3 ítems de confianza aparecen bajo el botón.
- [ ] Los textos vienen de `siteConfig.ts`, no están hardcodeados.

---

## Fase 11 — Testimonios con Slider y Logos

### Objetivo
Slider de testimonios con controles y barra de logos en loop.

### Archivos
- `src/components/smart/TestimonialsGrid.astro`
- `src/components/ui/common/TestimonialQuote.astro`

### Tareas — Slider

**En TestimonialsGrid.astro**
- Reemplazar el grid por la estructura de slider:
  - Contenedor externo con overflow hidden.
  - Track interno con clase `testimonials-track`.
  - Cada `TestimonialQuote` dentro de `.testimonial-slide`.
- Agregar controles: botón anterior y siguiente con `aria-label`.
- Agregar puntos de paginación.
- Script que:
  - Al hacer click en flecha, hace scroll programático en el track.
  - Detecta el scroll del track para actualizar el punto activo.
  - Las flechas se deshabilitan (`disabled`) en el primer y último slide.

**En TestimonialQuote.astro**
- Agregar campo de empresa del cliente: `font-poppins text-xs text-gray uppercase tracking-widest`.
- Agregar estrellas si el dato de rating existe: 5 íconos `size-4 text-brand`.
- Los nuevos campos vienen de `testimonials.ts`. Agregar `company` y `rating?`
  a la interfaz si no existen.

### Tareas — Barra de logos

**En TestimonialsGrid.astro**
- Agregar la barra de logos debajo del slider.
- Fondo: `bg-light border-y border-gray-light py-6`.
- Contenedor con `overflow: hidden`.
- Track con clase `logos-track` definido en Fase 1.
- El track contiene los logos duplicados para el loop infinito.
- Logos: `<Image />` con `alt`, `opacity-50 hover:opacity-100 transition-opacity duration-200`.
- Los logos vienen de `siteConfig.ts` o de un campo nuevo `clients` en el archivo.

### Validación
- [ ] El slider muestra 1 testimonio en mobile y 2 en desktop.
- [ ] Las flechas avanzan y retroceden correctamente.
- [ ] Las flechas se deshabilitan en los extremos.
- [ ] Los puntos de paginación reflejan el slide activo.
- [ ] `aria-live="polite"` está en el contenedor activo.
- [ ] La barra de logos hace scroll infinito en loop.
- [ ] Con `prefers-reduced-motion` los logos son estáticos en `flex-wrap`.
- [ ] No hay autoplay en el slider.

---

## Fase 12 — Equipo de Desarrolladores

### Objetivo
Crear el componente de equipo desde cero con el efecto de desaturación en foto.

### Archivos
- `src/components/ui/cards/TeamCard.astro` — crear
- `src/components/smart/TeamGrid.astro` — crear
- `src/pages/about.astro` — integrar TeamGrid

### Tareas — TeamCard.astro

- Elemento raíz: `<article class="team-card">`.
- Imagen: `<Image />` con clase `team-photo aspect-square object-cover w-full rounded-sm`.
- Nombre: `font-poppins font-semibold text-base text-dark mt-4`.
- Rol: `font-poppins text-xs text-brand uppercase tracking-widest mt-1`.
- Bio: `font-poppins text-sm text-gray leading-relaxed mt-2 line-clamp-2`.
- Skills: `flex flex-wrap gap-1 mt-3` con cada skill como `.chip-tech`.
- Links sociales: `flex items-center gap-3 mt-4` con íconos `size-4`.
- El componente es dumb. Recibe todos los campos como props desde `TeamGrid`.

### Tareas — TeamGrid.astro

- Importar `team` desde `src/data/team.ts`.
- Layout: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8`.
- Fondo de sección: `bg-white`.
- Agregar `SectionHeader` con título y subtítulo del equipo.
- Cada `TeamCard` tiene clase `animate-on-scroll` con delay escalonado.
- Llamar `initScrollAnimations()`.

### Tareas — about.astro

- Integrar `<TeamGrid />` en la página `about.astro`.
- Verificar que la sección del equipo alterna correctamente con las secciones
  de fondo adyacentes.

### Validación
- [ ] Las fotos del equipo tienen efecto de desaturación que desaparece en hover.
- [ ] Con `prefers-reduced-motion` las fotos están sin desaturación.
- [ ] Los skills son chips `chip-tech` sin contenedor.
- [ ] Los links sociales tienen `aria-label`.
- [ ] Los datos vienen de `team.ts`.
- [ ] Con menos de 3 miembros el grid usa 2 columnas centradas.

---

## Fase 13 — Portfolio con Bento Grid y Modal

### Objetivo
Reemplazar el grid uniforme de portfolio por un Bento Grid con modal de detalle
y botones de demo según disponibilidad.

### Archivos
- `src/components/smart/PortfolioGallery.astro`
- `src/components/ui/cards/ProjectCard.astro`
- `src/pages/portfolio.astro`
- `src/content/projects/` — actualizar frontmatter de proyectos existentes
- `src/content.config.ts` — agregar campos al schema de projects

### Tareas — Schema de projects

- Agregar campo `size: z.enum(['featured', 'secondary', 'small'])` al schema.
- Agregar campo `type: z.enum(['web', 'tienda', 'software', 'excel'])`.
- Agregar campo `demo: z.string().url().optional()`.
- Agregar campo `preview: z.string().optional()`.
- Agregar campo `technologies: z.array(z.string())`.
- Actualizar el frontmatter del proyecto de prueba existente con los nuevos campos.

### Tareas — PortfolioGallery.astro

- Reemplazar el grid actual por `.bento-grid`.
- Cada proyecto recibe la clase `bento-item-featured`, `bento-item-secondary`
  o `bento-item-small` según su campo `size`.
- La imagen de fondo usa `object-cover w-full h-full`.
- El overlay `.bento-overlay` contiene:
  - Badge de categoría `.chip-category` en la esquina superior.
  - Badge de estado `.badge-status-live` o `.badge-status-demo` según corresponda.
  - Título del proyecto en `font-poppins font-bold text-white`.
  - Fila de botones según disponibilidad de `demo` y `preview`.
- Tabs de filtrado: "Todos", "Web", "Tienda", "Software", "Excel".
- Script de filtrado que alterna `hidden-by-filter`.
- Script del modal que:
  - Al hacer click en "Ver detalle", abre `.project-modal-overlay`.
  - Rellena el modal con los datos del proyecto clickeado.
  - Gestiona foco: al abrir va al botón X, al cerrar regresa a la celda.
  - Se cierra con `Escape`, con click en overlay y con botón X.
  - Agrega `overflow-hidden` al body al abrir.

### Tareas — Modal HTML

- Agregar el HTML del modal al final de `PortfolioGallery.astro`.
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` al título del modal.
- Botón X con `aria-label="Cerrar proyecto"`.
- Estructura interna: imagen, título, descripción, tecnologías, botones.

### Validación
- [ ] El Bento Grid muestra proyectos con tamaños distintos.
- [ ] En mobile todos los proyectos están en lista vertical.
- [ ] El overlay aparece en hover con los botones correctos.
- [ ] Si el proyecto tiene `demo`, aparece el botón "Ver demo".
- [ ] Si no tiene `demo`, solo aparece "Ver detalle".
- [ ] El modal se abre y cierra correctamente.
- [ ] El foco se gestiona correctamente en el modal.
- [ ] El filtrado por tabs funciona correctamente.
- [ ] Los badges de estado muestran el estado correcto.
- [ ] Con `prefers-reduced-motion` el overlay es visible sin transición.

---

## Fase 14 — Blog Bento Grid y Layout de Listado

### Objetivo
Reemplazar el grid uniforme del blog por un Bento Grid en desktop
y una lista vertical en mobile.

### Archivos
- `src/components/smart/BlogFeed.astro`
- `src/components/ui/cards/BlogCard.astro`
- `src/pages/blog/index.astro`
- `src/content.config.ts` — agregar campos al schema de blog

### Tareas — Schema de blog

- Agregar campo `featured: z.boolean().default(false)`.
- Agregar campo `category: z.string()`.
- Agregar campo `readingTime: z.number()` — en minutos.
- Actualizar los posts de prueba existentes con los nuevos campos.

### Tareas — BlogFeed.astro

- Identificar el post `featured: true` o el más reciente.
- Asignar clase `blog-bento-featured` al post destacado.
- Asignar clase `blog-bento-secondary` al resto.
- El contenido de cada celda Bento:
  - Imagen de fondo `object-cover w-full h-full`.
  - Overlay gradiente `bg-gradient-to-t from-dark/80 to-transparent` permanente.
  - Badge de categoría `.chip-category bg-brand text-white` en esquina superior.
  - Título en la parte inferior: `font-poppins font-bold text-white`.
  - Fila inferior: fecha y tiempo de lectura en `font-poppins text-xs text-white/60`.
  - El post `featured` tiene título `text-2xl`, los demás `text-base`.
- En mobile: reemplazar el Bento por lista vertical.
  - Cada ítem: `flex gap-4 items-start`.
  - Imagen: `size-16 object-cover rounded-sm flex-shrink-0`.
  - Título y metadata a la derecha.

### Validación
- [ ] En desktop el primer post ocupa la celda grande `featured`.
- [ ] Los demás posts ocupan celdas `secondary`.
- [ ] En mobile el listado es vertical con imagen pequeña izquierda.
- [ ] El badge de categoría está en la esquina superior de cada celda.
- [ ] El tiempo de lectura aparece en todas las celdas.
- [ ] Los links de cada celda navegan al post correcto.

---

## Fase 15 — Layout del Artículo con Formateador y TOC

### Objetivo
Enriquecer el artículo con el formateador de términos, TOC lateral,
barra de progreso y artículos relacionados.

### Archivos
- `src/layouts/BlogLayout.astro`
- `src/components/ui/common/BlogContentFormatter.astro` — crear
- `src/pages/blog/[...slug].astro`

### Tareas — BlogLayout.astro

- Actualizar el layout del artículo a
  `grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-16 items-start`.
- El contenido del artículo envuelto en `BlogContentFormatter`.
- El TOC en la columna derecha con `position: sticky top-24`.
- El TOC no se renderiza en mobile.
- Agregar `.reading-progress-bar` al inicio del `<body>`.
- Agregar script de la barra de progreso.
- Aplicar clase `.prose-blog` al contenedor del contenido.

### Tareas — BlogContentFormatter.astro

- Crear el componente con `<div class="blog-content" id="blog-content"><slot /></div>`.
- Agregar el script completo del formateador que:
  - Importa `blogTerms` de `@/data/blogTerms`.
  - Define `walkTextNodes` y `processTextNode`.
  - Procesa el contenido al cargar.
  - Respeta los nodos prohibidos: `CODE`, `PRE`, `A`, `H1-H4`, `MARK`, `SPAN`.
  - Solo transforma la primera aparición por párrafo.

### Tareas — TOC

- Agregar script en `BlogLayout.astro` que:
  - Lee todos los `h2` y `h3` del artículo.
  - Construye dinámicamente el TOC con links a cada heading.
  - Los `h3` tienen clase `toc-link-h3` con indentación.
  - Usa `IntersectionObserver` para marcar el link activo con `active`.

### Tareas — Artículos relacionados

- Al final del artículo, agregar sección de 3 posts relacionados por `category`.
- Cada ítem: `flex gap-4 items-start`.
- Imagen: `size-16 object-cover rounded-sm flex-shrink-0`.
- Los posts relacionados se obtienen en el `[...slug].astro` filtrando por `category`.

### Validación
- [ ] El formateador transforma los términos de `blogTerms.ts`.
- [ ] No transforma texto dentro de `code`, `pre`, `a`, `h1-h4`.
- [ ] Solo transforma la primera aparición por párrafo.
- [ ] Los links internos tienen `→` en el `::after`.
- [ ] Los highlights usan `blog-highlight` con color `accent`.
- [ ] Los términos con definición muestran tooltip en hover y focus.
- [ ] El TOC aparece en desktop y no en mobile.
- [ ] El TOC marca el heading activo mientras se lee.
- [ ] La barra de progreso avanza al hacer scroll.
- [ ] Con `prefers-reduced-motion` la barra no tiene transición.
- [ ] Los artículos relacionados aparecen al final con imagen pequeña.

---

## Fase 16 — Chips y Badges — Sistema Completo

### Objetivo
Reemplazar todos los chips y badges existentes por las variantes del sistema
definido en `refactorizacion.md` y verificar consistencia en todo el sitio.

### Archivos
- `src/components/ui/chips/SectorChip.astro`
- Todos los componentes que usan chips o badges.

### Tareas — SectorChip.astro
- Actualizar para usar clase `.chip-sector`.
- Verificar que el ícono usa `size-4` sin contenedor.
- Agregar prop `active?: boolean` que agrega la clase `active` al chip.

### Tareas — Auditoría global de chips y badges
- Buscar en todos los componentes el uso de clases de badge o chip existentes.
- Reemplazar según la tabla de uso definida en `refactorizacion.md`:
  - Filtros interactivos → `.chip-sector`
  - Categoría sobre imagen → `.chip-category`
  - Tecnologías en cards → `.chip-tech`
  - Estado de proyecto → `.badge-status-live` o `.badge-status-demo`
  - Etiquetas genéricas → `.badge` existente

### Validación
- [ ] No hay chips con estilos inline o clases fuera del sistema.
- [ ] Los badges de estado tienen el pulso animado y su `prefers-reduced-motion`.
- [ ] Los chips de sector cambian correctamente al estado `active`.
- [ ] Los chips de tecnología son compactos y sin contenedor propio.

---

## Fase 17 — Revisión Final y Validación Global

### Objetivo
Verificar que toda la refactorización funciona correctamente, sin errores,
sin regresiones y con buena calidad en todos los dispositivos.

### Checklist técnico

- [ ] `astro build` ejecuta sin errores ni warnings críticos.
- [ ] No hay `@keyframes` definidos fuera de `global.css`.
- [ ] No hay textos hardcodeados en ningún componente.
- [ ] No hay tokens de color descartados en ningún componente.
- [ ] No hay familias tipográficas fuera de `font-poppins` y `font-rader`.
- [ ] No hay íconos encerrados en cajas con fondo propio.
- [ ] No hay `transition-all` en ningún componente.
- [ ] No hay `hover:scale-*` en cards ni botones.

### Checklist por sección

- [ ] Navbar: dropdown, scroll shadow y CTA actualizados.
- [ ] Hero: etiqueta, elemento visual compuesto y fila de confianza.
- [ ] Servicios: tabs de filtrado y expansión de card en desktop.
- [ ] Stats: patrón de puntos y sufijos visuales.
- [ ] Metodología: layout horizontal en desktop con 5 steps.
- [ ] FAQ: tabs y buscador con debounce.
- [ ] Pricing: toggle mensual/anual y plan destacado elevado.
- [ ] CTA: patrón de puntos, línea decorativa y ítems de confianza.
- [ ] Testimonios: slider con controles y barra de logos en loop.
- [ ] Equipo: TeamCard con desaturación y TeamGrid integrado en about.
- [ ] Portfolio: Bento Grid con modal, botones de demo y filtrado.
- [ ] Blog listado: Bento Grid en desktop y lista en mobile.
- [ ] Blog artículo: formateador, TOC, barra de progreso y relacionados.
- [ ] Chips y badges: sistema completo aplicado en todo el sitio.

### Checklist de accesibilidad

- [ ] Todos los modales tienen `role="dialog"` y `aria-modal="true"`.
- [ ] Los modales gestionan el foco al abrir y al cerrar.
- [ ] Los sliders tienen `aria-label` en los controles.
- [ ] Los toggles tienen `role="switch"` y `aria-checked`.
- [ ] Los tooltips de definición son accesibles con teclado.
- [ ] Los badges de estado comunican el estado con texto, no solo con color.
- [ ] La barra de progreso tiene `aria-hidden="true"` — es decorativa.
- [ ] El TOC tiene `aria-label="Tabla de contenidos"`.

### Checklist de prefers-reduced-motion

- [ ] Bento overlay es visible sin transición.
- [ ] Logos de clientes son estáticos en `flex-wrap`.
- [ ] Slider usa `scroll-behavior: auto`.
- [ ] Fotos del equipo sin desaturación.
- [ ] Pulse de badges de estado desactivado.
- [ ] Formateador de blog sin transición en tooltips.
- [ ] Barra de progreso sin transición.
- [ ] Todas las animaciones de entrada son inmediatas.

### Checklist de dispositivos

- [ ] Mobile: Bento colapsa a lista vertical en portfolio y blog.
- [ ] Mobile: TOC no se renderiza.
- [ ] Mobile: expansión de card de servicio navega directamente.
- [ ] Mobile: controles de slider son táctiles con scroll-snap.
- [ ] Tablet: layouts intermedios son correctos.
- [ ] Desktop: todos los layouts de dos columnas funcionan.