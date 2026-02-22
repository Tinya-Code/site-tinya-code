# Reglas de Refactorización Visual y Creatividad de Secciones — Tinya Code
## v2 — Incluye Blog, Proyectos, Bento Grid, Cards y Chips

## Principio General

El objetivo no es rediseñar el sitio desde cero. Es elevar cada sección de
un estado funcional a un estado memorable. Cada sección debe tener una razón
visual para existir. Si una sección puede reemplazarse por texto plano sin
perder información, necesita rediseño.

La creatividad aquí no significa complejidad. Significa encontrar la forma
más inteligente y directa de comunicar cada bloque de contenido.

---

## Reglas Globales del Agente

- Leer `guiaEstilo.md` completo antes de tocar cualquier componente.
- Leer las reglas de animación antes de agregar cualquier movimiento.
- No romper la paleta de colores ni la tipografía definida.
- No agregar dependencias externas salvo las ya instaladas en el proyecto.
- Cada sección refactorizada sigue el patrón Smart/Dumb.
- Los datos siempre vienen de `src/data/`. Nunca hardcodear contenido.
- Usar `/generico.jpeg` para cualquier imagen placeholder.
- Mantener accesibilidad: contraste, foco, aria, alt en imágenes.
- Verificar `prefers-reduced-motion` en cada elemento animado nuevo.
- No usar librerías de slider externas. Los sliders se implementan en CSS y JS nativo.
- Validar en mobile, tablet y desktop antes de dar una fase por completada.

---

## Sección 1 — Navbar / Header

### Estado actual
Header básico con logo, links y botón. Funcional pero sin personalidad.

### Objetivo
Un header que comunique profesionalismo desde el primer pixel. Conciso,
con jerarquía clara y un detalle visual que lo diferencie.

### Reglas de refactorización

**Estructura**
- El Navbar tiene tres zonas: logo izquierda, navegación centro, CTA derecha.
- En mobile: logo izquierda, hamburguesa derecha. El CTA desaparece del header
  y vive dentro del menú mobile.
- La navegación central muestra solo las páginas principales. Máximo 5 links.
- Los links con subpáginas usan un dropdown minimalista, no un megamenú.

**Logo**
- El logo tiene un pequeño detalle animado al hacer hover: el ícono o símbolo
  rota o cambia de color con `transition-colors duration-200`.
- El nombre de la empresa en el logo usa `font-rader` si es texto, no imagen.

**Links de navegación**
- Cada link tiene el indicador de línea inferior definido en las reglas de animación.
- El link activo siempre es visible con la línea permanente en `brand`.
- No usar dropdown para mobile. En mobile todos los links van en lista vertical.

**Dropdown para links con subpáginas**
- Aparece al hacer hover en desktop con `opacity` y `translateY` suave.
- Fondo: `bg-white border border-gray-light rounded-sm shadow-sm`.
- Links del dropdown: `font-poppins text-sm text-dark hover:text-brand`.
- No usar `display: none`. Usar `opacity-0 pointer-events-none` y
  `opacity-100 pointer-events-auto` con `transition-opacity duration-200`.

**Indicador de scroll**
- Cuando el usuario hace scroll hacia abajo más de `80px`, el Navbar agrega
  una sombra sutil: `shadow-sm` con `transition-shadow duration-300`.
- Esto se implementa con un evento `scroll` en un script del componente.
- Al volver arriba la sombra desaparece.

**CTA en header**
- El botón CTA del header dice exactamente lo que el usuario puede hacer:
  "Solicitar propuesta" no "Contactar".
- Usa `btn-primary` con tamaño reducido: `px-4 py-2 text-xs`.

**Puntos a considerar**
- El Navbar nunca compite visualmente con el Hero. Es discreto por diseño.
- No agregar iconos decorativos en los links del Navbar.
- El dropdown se cierra al hacer click fuera o al presionar `Escape`.
- El menú mobile tiene fondo `bg-white` y ocupa el ancho completo.
- El menú mobile tiene un separador `border-t border-gray-light` antes del CTA.

---

## Sección 2 — Hero

### Estado actual
Hero con título, subtítulo, dos botones e imagen. Correcto pero genérico.

### Objetivo
Un Hero que comunique velocidad y confianza en menos de 3 segundos de lectura.

### Reglas de refactorización

**Estructura**
- Layout de dos columnas en desktop: contenido izquierda, elemento visual derecha.
- En mobile: columna única, contenido arriba, elemento visual abajo.
- Jerarquía estricta de 4 elementos en el contenido:
  1. Etiqueta pequeña de categoría
  2. Título principal en `font-rader`
  3. Subtítulo breve — máximo 2 líneas
  4. Fila de botones

**Etiqueta de categoría**
- `font-poppins text-xs font-semibold uppercase tracking-widest text-brand`
- Tiene una línea horizontal `border-t border-brand w-8` antes del texto.
- Layout: `flex items-center gap-3`

**Elemento visual derecha**
- Opción A: Imagen real con `aspect-square object-cover rounded-sm`.
- Opción B: Tarjeta flotante con métrica real sobre la imagen.
- Opción C: Composición de tres imágenes en mosaico `grid grid-cols-2 gap-2`.

**Elementos de confianza bajo los botones**
- Fila de logos de clientes o sectores con `opacity-60`.
- `font-poppins text-xs text-gray`
- Layout: `flex items-center gap-4 mt-8 flex-wrap`

**Puntos a considerar**
- Sin card contenedora ni sombra en ningún elemento de texto.
- Fondo `bg-light`. No agregar gradientes ni patrones.

---

## Sección 3 — Testimonios

### Estado actual
Grid de bloques de cita estáticos.

### Objetivo
Slider interactivo con barra de logos de clientes debajo.

### Reglas de refactorización

**Slider CSS con scroll-snap**
```css
.testimonials-track {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: 1.5rem;
  scrollbar-width: none;
}

.testimonials-track::-webkit-scrollbar {
  display: none;
}

.testimonial-slide {
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 100%;
}

@media (min-width: 768px) {
  .testimonial-slide {
    width: calc(50% - 0.75rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .testimonials-track {
    scroll-behavior: auto;
  }
}
```

**Controles**
- Flechas con `aria-label` y estilo `size-10 border border-gray-light rounded-sm`.
- Puntos de paginación `size-1.5 rounded-full bg-gray-light`. Activo: `bg-brand`.

**Barra de logos en loop**
```css
@keyframes logos-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.logos-track {
  display: flex;
  animation: logos-scroll 20s linear infinite;
  width: max-content;
}

@media (prefers-reduced-motion: reduce) {
  .logos-track {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
  }
}
```

**Puntos a considerar**
- Sin autoplay. El slider solo avanza con interacción.
- `aria-live="polite"` en el contenedor del testimonio activo.
- Logos con `alt` descriptivo aunque estén en `opacity-50`.

---

## Sección 4 — Equipo de Desarrolladores

### Estado actual
No existe. Debe crearse desde cero.

### Archivos a crear
- `src/data/team.ts`
- `src/components/ui/cards/TeamCard.astro`
- `src/components/smart/TeamGrid.astro`

### Estructura de datos
```typescript
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  skills: string[];     // máximo 4
  linkedin?: string;
  github?: string;
}
```

### Diseño de TeamCard

**Foto**
```css
.team-photo {
  filter: grayscale(20%);
  transition: filter 300ms ease;
}
.team-card:hover .team-photo {
  filter: grayscale(0%);
}
@media (prefers-reduced-motion: reduce) {
  .team-photo {
    filter: grayscale(0%);
    transition: none;
  }
}
```

- Sin `border` ni `shadow` en la card.
- Nombre: `font-poppins font-semibold text-base text-dark`
- Rol: `font-poppins text-xs text-brand uppercase tracking-widest mt-1`
- Bio: `font-poppins text-sm text-gray leading-relaxed mt-2 line-clamp-2`
- Skills: chips `text-xs border border-gray-light rounded-sm px-2 py-0.5`
- Links: íconos `size-4 text-gray hover:text-brand transition-colors duration-200`

### TeamGrid
- Layout: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8`
- Fondo: `bg-white`
- Cada card entra con `animate-on-scroll` y delay escalonado.

---

## Sección 5 — Servicios

### Estado actual
Grid de cards estáticas.

### Objetivo
Grilla con filtrado por categoría y cards con estado expandido.

### Reglas de refactorización

**Tabs de categoría**
- "Todos", "Web", "Software", "Automatización"
- El campo `category` se agrega a `services.ts`.
- Tab activo: `text-brand border-b-2 border-brand`.

**Filtrado**
```css
.service-card-item {
  transition: opacity 300ms ease, transform 300ms ease;
}
.service-card-item.hidden-by-filter {
  opacity: 0;
  pointer-events: none;
  position: absolute;
}
@media (prefers-reduced-motion: reduce) {
  .service-card-item { transition: none; }
}
```

**Expansión de card en desktop**
- Click expande la card con `max-height` animado mostrando tecnologías,
  tiempo estimado y botón de acción.
- Solo una card expandida a la vez.
- En mobile el click navega a la página del servicio directamente.

---

## Sección 6 — Métricas y Estadísticas

**Fondo con patrón de puntos**
```css
.section-stats-bg {
  background-color: var(--color-dark);
  background-image: radial-gradient(
    circle,
    rgba(237, 241, 232, 0.06) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
}
```

- Separador `border-l border-accent/20` entre métricas en desktop.
- Sufijo `+`, `%`, `k` en `text-2xl font-bold text-accent` junto al número.

---

## Sección 7 — Proceso / Metodología

**Layout adaptativo**
- Mobile: vertical con línea conectora.
- Desktop: horizontal con 5 columnas y línea conectora superior.

**Número del step en hover**
- `border-brand text-brand transition-colors duration-200`

---

## Sección 8 — FAQ

**Tabs de categoría**
- "General", "Proceso", "Precios", "Técnico"
- Campo `category` en `faq.ts`.

**Buscador local**
- Input `input-base` que filtra preguntas en tiempo real con `debounce` de `300ms`.
- Sin resultados: mensaje con link al formulario de contacto.
```css
.faq-item.hidden-by-search { display: none; }
```

---

## Sección 9 — Pricing

**Toggle mensual / anual**
- Pill deslizante con `role="switch"` y `aria-checked`.
- Campos `priceMonthly` y `priceAnnual` en `pricing.ts`.

**Plan recomendado**
- Badge `bg-brand text-white` en la parte superior.
- Card con `border-brand` y `mt-0` mientras las otras tienen `mt-4` en desktop.

---

## Sección 10 — CTA Final

**Fondo**
```css
.section-cta-bg {
  background-color: var(--color-brand);
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.06) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
}
```

**Elementos de confianza bajo el botón**
- 3 ítems: "Sin permanencia", "Respuesta en 24h", "Presupuesto sin costo".
- `flex items-center gap-2 font-poppins text-xs text-white/70`

---

## Sección 11 — Portfolio con Bento Grid

### Estado actual
Grid uniforme de cards con imagen, título y categoría.

### Objetivo
Reemplazar el grid uniforme por un **Bento Grid** que asigne tamaños distintos
a los proyectos según su relevancia, generando un layout asimétrico y moderno.

### Qué es el Bento Grid en este contexto

Un Bento Grid es una grilla CSS donde cada celda puede ocupar distintas
cantidades de columnas y filas. Los proyectos destacados ocupan más espacio.
El resultado visual es dinámico sin ser caótico.

### Estructura del Bento Grid
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 240px;
  gap: 1rem;
}

/* Proyecto destacado — ocupa 4 columnas y 2 filas */
.bento-item-featured {
  grid-column: span 4;
  grid-row: span 2;
}

/* Proyecto secundario — ocupa 2 columnas y 1 fila */
.bento-item-secondary {
  grid-column: span 2;
  grid-row: span 1;
}

/* Proyecto pequeño — ocupa 2 columnas y 1 fila */
.bento-item-small {
  grid-column: span 2;
  grid-row: span 1;
}

/* Mobile: todos ocupan el ancho completo */
@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 200px;
  }
  .bento-item-featured,
  .bento-item-secondary,
  .bento-item-small {
    grid-column: span 1;
    grid-row: span 1;
  }
}
```

### Patrón de distribución recomendado para 5 proyectos
```
[ Proyecto 1 — featured (4col x 2row) ] [ Proyecto 2 — secondary (2col x 1row) ]
                                         [ Proyecto 3 — secondary (2col x 1row) ]
[ Proyecto 4 — small (3col x 1row)     ] [ Proyecto 5 — small (3col x 1row)     ]
```

### Campo `size` en el frontmatter de proyectos

Cada proyecto en `content/projects/` define su tamaño en el frontmatter:
```yaml
---
title: "Nombre del proyecto"
type: "web"
size: "featured"   # featured | secondary | small
demo: "https://..."
preview: "/generico.jpeg"
---
```

El campo `size` determina qué clase Bento se aplica a la celda.

### Contenido visual de cada celda Bento

- La celda tiene la imagen como fondo con `object-cover` y `w-full h-full`.
- Sobre la imagen hay un overlay `bg-dark/50` que aparece en hover.
- El overlay contiene: título, categoría y botones de acción.
- En estado normal (sin hover): solo la imagen visible.
- En hover: overlay con `opacity-0 → opacity-100 transition-opacity duration-300`.
```css
.bento-overlay {
  opacity: 0;
  transition: opacity 300ms ease;
}

.bento-item:hover .bento-overlay {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .bento-overlay {
    opacity: 1;
  }
}
```

### Botones de acción dentro del overlay

Cada celda del Bento tiene botones según lo que el proyecto permita mostrar:

**Si el proyecto tiene `demo`**
- Botón primario: "Ver demo" — `btn-outline-white` que abre la URL en nueva pestaña.
- Botón secundario: "Ver detalle" — navega a la página del proyecto.

**Si el proyecto NO tiene `demo`**
- Botón único: "Ver detalle" — `btn-outline-white`.

**Si el proyecto tiene `preview` (video o gif)**
- Botón "Ver preview" — abre un modal con el video o imagen animada.

Los botones van en `flex gap-3 mt-4 flex-wrap`.

### Modal de detalle del proyecto

- Overlay: `bg-dark/60 backdrop-blur-sm fixed inset-0 z-50`
- Contenedor: `bg-white rounded-sm max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto`
- Imagen: `aspect-video object-cover w-full rounded-sm`
- Título: `font-poppins font-bold text-2xl text-dark mt-6`
- Descripción larga: texto formateado del MDX.
- Tecnologías: chips `text-xs border border-gray-light rounded-sm px-2 py-0.5`
- Botones: "Ver demo" (si existe) y "Cerrar"
```css
.project-modal-overlay {
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms ease;
}

.project-modal-overlay.is-open {
  opacity: 1;
  pointer-events: auto;
}

.project-modal-content {
  transform: translateY(16px);
  transition: transform 300ms ease;
}

.project-modal-overlay.is-open .project-modal-content {
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .project-modal-overlay,
  .project-modal-content {
    transition: none;
  }
}
```

**Accesibilidad del modal**
- `role="dialog"` y `aria-modal="true"` en el contenedor.
- Al abrir: foco va al botón de cierre.
- Al cerrar: foco regresa a la celda del Bento que abrió el modal.
- `Escape` cierra el modal.
- El body tiene `overflow-hidden` mientras el modal está abierto.

### Filtrado por tipo en Portfolio

- Tabs: "Todos", "Web", "Tienda", "Software", "Excel".
- El campo `type` del frontmatter determina la categoría.
- Al filtrar, las celdas que no corresponden tienen `opacity-0 pointer-events-none`.
- Al filtrar, el Bento Grid se reorganiza automáticamente con CSS grid.
- El tab activo: `text-brand border-b-2 border-brand`.

---

## Sección 12 — Blog — Refactorización Completa

### Estado actual
Grid de cards con imagen, título y fecha. El contenido de cada post se
renderiza tal cual del MDX sin procesamiento visual adicional.

### Objetivo
Dos mejoras independientes:
1. Mejorar el listado del blog con Bento Grid.
2. Mejorar el contenido de cada post con un formateador que enriquece
   el texto con links internos automáticos, resaltado de términos clave
   y mejoras tipográficas.

---

### 12.1 — Listado del Blog con Bento Grid

**Estructura del Bento para el blog**
```css
.blog-bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 280px;
  gap: 1rem;
}

/* Post destacado — el más reciente o marcado como featured */
.blog-bento-featured {
  grid-column: span 4;
  grid-row: span 2;
}

/* Posts secundarios */
.blog-bento-secondary {
  grid-column: span 2;
  grid-row: span 1;
}

@media (max-width: 768px) {
  .blog-bento {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  .blog-bento-featured,
  .blog-bento-secondary {
    grid-column: span 1;
    grid-row: span 1;
  }
}
```

**Contenido de la celda del post en el Bento**
- Imagen de fondo `object-cover w-full h-full`.
- Overlay permanente con gradiente: `bg-gradient-to-t from-dark/80 to-transparent`.
- El overlay no desaparece. Siempre visible para mantener legibilidad.
- Categoría: chip `bg-brand text-white text-xs` en la esquina superior izquierda.
- Título: `font-poppins font-bold text-white` en la parte inferior.
- Fecha y tiempo de lectura: `font-poppins text-xs text-white/60`.
- El post `featured` tiene el título más grande: `text-2xl` vs `text-base`.

**Campo `featured` en el frontmatter del blog**
```yaml
---
title: "Título del artículo"
date: 2025-01-01
category: "Diseño Web"
featured: true
readingTime: 5      # en minutos
---
```

**Puntos a considerar**
- Solo el post más reciente o el marcado como `featured: true` ocupa la celda grande.
- Si no hay ningún post `featured`, el primero en la lista es el grande.
- En mobile todos los posts se muestran en lista vertical con imagen, no Bento.
- La lista en mobile usa `flex flex-col gap-4` con cada item en
  `flex gap-4 items-start` (imagen pequeña izquierda + texto derecha).

---

### 12.2 — Formateador de Contenido del Post

#### Objetivo
Enriquecer automáticamente el contenido MDX de cada post con:
- Links internos automáticos para términos que coinciden con páginas del sitio.
- Resaltado visual de términos técnicos y nombres propios definidos en un glosario.
- Mejoras tipográficas en la lectura del artículo.

#### Qué es el Formateador

El formateador es un componente Astro `BlogContentFormatter.astro` que recibe
el contenido renderizado del MDX como slot y lo procesa con JS en el cliente
para enriquecer el texto.

**Archivo a crear**
- `src/components/ui/common/BlogContentFormatter.astro`
- `src/data/blogTerms.ts` — glosario de términos con sus links o definiciones

#### Estructura de blogTerms.ts
```typescript
export interface BlogTerm {
  term: string;           // texto exacto a buscar (case-insensitive)
  type: 'internal-link' | 'external-link' | 'highlight' | 'definition';
  href?: string;          // para internal-link y external-link
  definition?: string;    // para definition — aparece en tooltip
  caseSensitive?: boolean;
}

export const blogTerms: BlogTerm[] = [
  {
    term: "Tinya Code",
    type: "internal-link",
    href: "/"
  },
  {
    term: "diseño web",
    type: "internal-link",
    href: "/services/web-design"
  },
  {
    term: "AppScript",
    type: "internal-link",
    href: "/services/excel-appscript"
  },
  {
    term: "tienda virtual",
    type: "internal-link",
    href: "/services/ecommerce"
  },
  {
    term: "landing page",
    type: "internal-link",
    href: "/services/landing-pages"
  },
  {
    term: "SEO",
    type: "definition",
    definition: "Search Engine Optimization — optimización para motores de búsqueda"
  },
  {
    term: "UX",
    type: "definition",
    definition: "User Experience — experiencia del usuario al interactuar con el producto"
  },
  {
    term: "Astro",
    type: "highlight"
  },
  {
    term: "Tailwind",
    type: "highlight"
  }
];
```

#### Reglas de procesamiento del formateador

**Búsqueda de términos**
- El formateador busca los términos de `blogTerms.ts` en los nodos de texto
  del contenido del post.
- La búsqueda es case-insensitive por defecto salvo que `caseSensitive: true`.
- Solo se transforma la primera aparición de cada término por párrafo.
  Las siguientes apariciones del mismo término en el mismo párrafo se ignoran.
- No transformar términos dentro de: `<code>`, `<pre>`, `<a>`, `<h1>`, `<h2>`,
  `<h3>`, `<h4>`. Solo en `<p>` y `<li>`.

**Tipo: internal-link**
- Reemplaza el término con `<a href="${href}" class="blog-link-internal">término</a>`.
- El link tiene un ícono de flecha pequeño al lado: `→` en CSS con `::after`.
```css
.blog-link-internal {
  color: var(--color-brand);
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid var(--color-brand);
  transition: border-color 200ms ease, color 200ms ease;
}

.blog-link-internal:hover {
  color: var(--color-brand-dark);
  border-color: var(--color-brand-dark);
}

.blog-link-internal::after {
  content: ' →';
  font-size: 0.75em;
  opacity: 0.7;
}
```

**Tipo: external-link**
- Igual que `internal-link` pero con `target="_blank" rel="noopener noreferrer"`.
- El ícono `::after` es `↗` en vez de `→`.

**Tipo: highlight**
- Envuelve el término en `<mark class="blog-highlight">término</mark>`.
```css
.blog-highlight {
  background-color: color-mix(in srgb, var(--color-accent) 30%, transparent);
  color: inherit;
  border-radius: 2px;
  padding: 0 2px;
}
```

**Tipo: definition**
- Envuelve el término en `<span class="blog-definition" data-def="...">término</span>`.
- Al hacer hover o focus aparece un tooltip con la definición.
- El término tiene `border-bottom: 1px dashed var(--color-gray)`.
```css
.blog-definition {
  position: relative;
  border-bottom: 1px dashed var(--color-gray);
  cursor: help;
}

.blog-definition::after {
  content: attr(data-def);
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-dark);
  color: var(--color-light);
  font-family: var(--font-poppins);
  font-size: 0.75rem;
  line-height: 1.4;
  padding: 6px 10px;
  border-radius: 2px;
  white-space: nowrap;
  max-width: 280px;
  white-space: normal;
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms ease;
  z-index: 10;
}

.blog-definition:hover::after,
.blog-definition:focus::after {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .blog-definition::after {
    transition: none;
  }
}
```

#### Implementación del formateador en JS

El procesamiento se hace en el cliente después del render. No modifica el MDX.
```astro
<!-- BlogContentFormatter.astro -->
<div class="blog-content" id="blog-content">
  <slot />
</div>

<script>
  import { blogTerms } from '@/data/blogTerms';

  function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function processTextNode(node: Text): void {
    const parent = node.parentElement;
    if (!parent) return;

    const forbidden = ['CODE', 'PRE', 'A', 'H1', 'H2', 'H3', 'H4', 'MARK', 'SPAN'];
    if (forbidden.includes(parent.tagName)) return;

    let html = node.textContent ?? '';
    const usedTerms = new Set<string>();

    for (const entry of blogTerms) {
      if (usedTerms.has(entry.term.toLowerCase())) continue;

      const flags = entry.caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(`\\b${escapeRegex(entry.term)}\\b`, flags);

      let replaced = false;
      html = html.replace(regex, (match) => {
        if (replaced) return match;
        replaced = true;
        usedTerms.add(entry.term.toLowerCase());

        if (entry.type === 'internal-link') {
          return `<a href="${entry.href}" class="blog-link-internal">${match}</a>`;
        }
        if (entry.type === 'external-link') {
          return `<a href="${entry.href}" class="blog-link-external" target="_blank" rel="noopener noreferrer">${match}</a>`;
        }
        if (entry.type === 'highlight') {
          return `<mark class="blog-highlight">${match}</mark>`;
        }
        if (entry.type === 'definition') {
          return `<span class="blog-definition" tabindex="0" data-def="${entry.definition}">${match}</span>`;
        }
        return match;
      });
    }

    if (html !== node.textContent) {
      const span = document.createElement('span');
      span.innerHTML = html;
      parent.replaceChild(span, node);
    }
  }

  function walkTextNodes(root: Element): void {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    let node: Text | null;
    while ((node = walker.nextNode() as Text | null)) {
      nodes.push(node);
    }
    nodes.forEach(processTextNode);
  }

  const content = document.getElementById('blog-content');
  if (content) walkTextNodes(content);
</script>
```

---

### 12.3 — Tipografía y UX del Artículo

#### Mejoras tipográficas en el contenido del post

El artículo usa una clase `prose-blog` que define estilos de lectura optimizados.
```css
.prose-blog {
  max-width: 68ch;
  margin-left: auto;
  margin-right: auto;
}

.prose-blog p {
  font-family: var(--font-poppins);
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--color-dark);
  margin-bottom: 1.5rem;
}

.prose-blog h2 {
  font-family: var(--font-poppins);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-dark);
  margin-top: 3rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-gray-light);
}

.prose-blog h3 {
  font-family: var(--font-poppins);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-dark);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.prose-blog ul,
.prose-blog ol {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.prose-blog li {
  font-family: var(--font-poppins);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-dark);
  margin-bottom: 0.5rem;
}

.prose-blog code {
  font-family: monospace;
  font-size: 0.875rem;
  background-color: var(--color-gray-light);
  color: var(--color-dark);
  padding: 2px 6px;
  border-radius: 2px;
}

.prose-blog pre {
  background-color: var(--color-dark);
  color: var(--color-light);
  padding: 1.5rem;
  border-radius: 2px;
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

.prose-blog blockquote {
  border-left: 2px solid var(--color-accent);
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  color: var(--color-gray);
}

.prose-blog img {
  width: 100%;
  border-radius: 2px;
  margin: 2rem 0;
}

.prose-blog a {
  color: var(--color-brand);
  border-bottom: 1px solid var(--color-brand);
  text-decoration: none;
  transition: color 200ms ease, border-color 200ms ease;
}

.prose-blog a:hover {
  color: var(--color-brand-dark);
  border-color: var(--color-brand-dark);
}
```

#### Barra de progreso de lectura

- Una barra fina en la parte superior del viewport que indica el progreso
  de lectura del artículo.
- Fondo: `bg-gray-light`. Barra activa: `bg-brand`.
- Altura: `2px`. Posición: `fixed top-0 left-0 z-50 w-full`.
```css
.reading-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background-color: var(--color-brand);
  width: 0%;
  z-index: 100;
  transition: width 100ms linear;
}

@media (prefers-reduced-motion: reduce) {
  .reading-progress-bar {
    transition: none;
  }
}
```

Script en `BlogLayout.astro`:
```astro
<script>
  const bar = document.querySelector('.reading-progress-bar') as HTMLElement | null;
  if (bar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${Math.min(progress, 100)}%`;
    }, { passive: true });
  }
</script>
```

#### Tabla de contenidos lateral (TOC)

- En desktop, el artículo tiene un TOC flotante en la columna derecha.
- El TOC lista los `h2` y `h3` del artículo.
- El link activo en el TOC (la sección visible) se marca con `text-brand`.
- El TOC usa `position: sticky top-24` para mantenerse visible al hacer scroll.
- En mobile el TOC no aparece.
```css
.toc-link {
  font-family: var(--font-poppins);
  font-size: 0.8125rem;
  color: var(--color-gray);
  display: block;
  padding: 3px 0;
  border-left: 2px solid transparent;
  padding-left: 0.75rem;
  transition: color 200ms ease, border-color 200ms ease;
}

.toc-link:hover,
.toc-link.active {
  color: var(--color-brand);
  border-left-color: var(--color-brand);
}

.toc-link-h3 {
  padding-left: 1.5rem;
  font-size: 0.75rem;
}

@media (prefers-reduced-motion: reduce) {
  .toc-link { transition: none; }
}
```

#### Layout del artículo con TOC
```
[ Contenido del artículo — max-w-2xl ]  [ TOC — w-56 sticky ]
```

- Layout: `grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-16 items-start`
- En mobile: `grid-cols-1`, el TOC no se renderiza.

#### Sección de artículos relacionados al final del post

- 3 artículos relacionados por `category` del post actual.
- Mostrados en una fila de cards compactas: imagen pequeña izquierda + título derecha.
- `flex gap-4 items-start`
- Imagen: `size-16 object-cover rounded-sm flex-shrink-0`
- Título: `font-poppins font-semibold text-sm text-dark`
- Categoría: `font-poppins text-xs text-gray mt-0.5`

---

## Sección 13 — Chips y Badges — Refactorización

### Estado actual
Chips básicos para sectores. Badges simples de texto.

### Objetivo
Definir un sistema de chips y badges más rico con variantes claras
para cada contexto de uso.

### Variantes de Chip

**Chip de sector — interactivo**
```css
.chip-sector {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--color-gray-light);
  border-radius: 2px;
  padding: 0.375rem 0.875rem;
  background-color: var(--color-white);
  font-family: var(--font-poppins);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-dark);
  cursor: pointer;
  transition: border-color 200ms ease, color 200ms ease;
}

.chip-sector:hover,
.chip-sector.active {
  border-color: var(--color-brand);
  color: var(--color-brand);
}
```

**Chip de categoría — informativo, no interactivo**
```css
.chip-category {
  display: inline-flex;
  align-items: center;
  border-radius: 2px;
  padding: 0.25rem 0.625rem;
  background-color: color-mix(in srgb, var(--color-accent) 25%, transparent);
  font-family: var(--font-poppins);
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-dark);
}
```

**Chip de tecnología — en proyectos y equipo**
```css
.chip-tech {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-gray-light);
  border-radius: 2px;
  padding: 0.125rem 0.5rem;
  font-family: var(--font-poppins);
  font-size: 0.6875rem;
  color: var(--color-gray);
  background-color: transparent;
}
```

**Badge de estado — para proyectos**
```css
.badge-status-live {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-family: var(--font-poppins);
  font-size: 0.6875rem;
  font-weight: 600;
  color: #2d6a4f;
  background-color: #d8f3dc;
  border-radius: 2px;
  padding: 0.25rem 0.625rem;
}

.badge-status-live::before {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #2d6a4f;
  animation: pulse-dot 2s ease infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

.badge-status-demo {
  color: #7b4f12;
  background-color: #fde8c8;
}

.badge-status-demo::before {
  background-color: #7b4f12;
  animation: none;
}

@media (prefers-reduced-motion: reduce) {
  .badge-status-live::before {
    animation: none;
  }
}
```

### Uso de cada variante

| Variante | Dónde se usa |
|---|---|
| `chip-sector` | Filtros de sectores, tabs de categoría |
| `chip-category` | Sobre imagen en cards de blog y portfolio |
| `chip-tech` | Lista de tecnologías en TeamCard y ProjectCard |
| `badge-status-live` | Proyectos en producción en el Bento |
| `badge-status-demo` | Proyectos con demo disponible |
| `badge` (existente) | Etiquetas genéricas de información |

---

## Checklist General de Validación

Antes de dar por completada cualquier sección refactorizada:

- [ ] Los datos vienen de `src/data/` o `src/content/`. Nada hardcodeado.
- [ ] El componente sigue el patrón Smart/Dumb.
- [ ] La paleta de colores no tiene tokens descartados.
- [ ] Las familias tipográficas son solo `font-poppins` y `font-rader`.
- [ ] Los íconos no tienen contenedor con fondo propio.
- [ ] Las animaciones nuevas tienen bloque `prefers-reduced-motion`.
- [ ] No se usaron librerías externas no instaladas previamente.
- [ ] El componente es responsivo en mobile, tablet y desktop.
- [ ] Los elementos interactivos tienen estados `focus` visibles.
- [ ] Los modales tienen `role`, `aria-modal` y gestión de foco correcta.
- [ ] Los sliders tienen controles con `aria-label`.
- [ ] Los toggles tienen `role="switch"` y `aria-checked`.
- [ ] Las imágenes tienen `alt` descriptivo.
- [ ] El formateador de blog no transforma texto dentro de `code`, `pre` ni `a`.
- [ ] Los tooltips de definición son accesibles con teclado (`tabindex="0"`).
- [ ] La barra de progreso de lectura tiene `prefers-reduced-motion`.
- [ ] El TOC no se renderiza en mobile.
- [ ] El Bento Grid colapsa a lista vertical en mobile.
- [ ] Los modales de portfolio gestionan el foco correctamente.
- [ ] Los badges de estado tienen `prefers-reduced-motion` para el pulso.
- [ ] `astro dev` compila sin errores después de cada cambio.