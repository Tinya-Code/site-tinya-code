# Plan de Normalización de Estilos — Tinya Code

## Reglas del Agente para este Plan

- Leer `guiaEstilo.md` completa antes de iniciar cualquier fase.
- Leer `reglasUso.md` antes de modificar cualquier componente.
- No modificar lógica ni datos. Este plan es exclusivamente de estilos y estructura visual.
- Cada fase se valida visualmente antes de continuar con la siguiente.
- Usar únicamente los tokens de color y tipografía definidos en `guiaEstilo.md`.
- Imagen placeholder: `/generico.jpeg`. No cambiar imágenes, solo clases.
- No tocar archivos de `src/data/`, `src/content/` ni `src/layouts/` salvo que se indique.

---

## Fase 1 — Tokens Base y Global CSS

### Objetivo
Asegurar que `global.css` tenga todos los tokens, clases base y componentes reutilizables
correctamente definidos antes de tocar cualquier componente.

### Archivos
- `src/styles/global.css`
- `src/styles/typography.css`

### Tareas
- Verificar que `@theme` declare únicamente los colores activos de la paleta:
  `light`, `dark`, `accent`, `brand`, `brand-dark`, `gray`, `gray-light`.
- Eliminar del `@theme` los tokens descartados:
  `celeste`, `azule`, `gray-dark`, `primary`, `secondary`.
- Verificar que solo estén declaradas las fuentes en uso: `Poppins` y `RaderBoldItalic`.
- Eliminar declaraciones `@font-face` de fuentes descartadas:
  `SupplyMono`, `TAN Nimbus`, `Satisfy`.
- Verificar que existan y sean correctas las clases de `@layer components`:
  - `container-main`
  - `section-base`
  - `section-light`, `section-white`, `section-dark`, `section-brand`
  - `titulo-hero`
  - `titulo-seccion`
  - `subtitulo`
  - `texto-cuerpo`
  - `texto-apoyo`
  - `texto-label`
  - `btn-primary`
  - `btn-outline`
  - `btn-outline-white`
  - `card-base`
  - `card-image`
  - `card-avatar`
  - `badge`
  - `input-base`
  - `textarea-base`
  - `label-base`
  - `nav-link`
  - `nav-link-active`
  - `divider`
- Verificar que `typography.css` no declare fuentes ni colores fuera de los tokens activos.

### Validación
- [ ] `astro dev` compila sin errores.
- [ ] No aparecen tokens de colores descartados en `global.css`.
- [ ] No aparecen `@font-face` de fuentes descartadas.
- [ ] Todas las clases de `@layer components` están presentes y usan solo tokens activos.

---

## Fase 2 — Componentes Base Comunes

### Objetivo
Normalizar los componentes globales que aparecen en todas las páginas.

### Archivos
- `src/components/ui/common/Navbar.astro`
- `src/components/ui/common/Footer.astro`
- `src/components/ui/common/BaseHead.astro`
- `src/components/ui/common/SEO.astro`
- `src/components/ui/common/Icon.astro`
- `src/components/BaseHead.astro` — verificar si es duplicado y eliminar si corresponde

### Tareas — Navbar
- Fondo: `bg-white border-b border-gray-light sticky top-0 z-50`.
- Links: clase `nav-link` de `global.css`.
- Link activo: clase `nav-link-active`.
- Logo: altura `h-8`, alineado a la izquierda.
- Mobile: botón hamburguesa con `aria-label="Abrir menú"`.
- Sin sombra, sin gradiente, sin color de fondo distinto a `white`.
- Verificar que los links vengan de `src/data/navigation.ts`.

### Tareas — Footer
- Fondo: `bg-dark`.
- Texto base: `text-light`.
- Links: `font-poppins text-sm text-accent hover:text-light transition-colors duration-200`.
- Título de columna: `font-poppins text-xs font-semibold text-light/50 uppercase tracking-widest mb-4`.
- Separador: `border-t border-accent/20`.
- Copyright: `font-poppins text-xs text-gray`.
- Layout: `grid grid-cols-1 md:grid-cols-4 gap-8 py-16`.
- Verificar que los datos vengan de `src/data/navigation.ts` y `src/data/social.ts`.

### Tareas — Icon
- Verificar que no aplique ningún color inline.
- El color debe heredarse del contenedor.
- Verificar que no tenga contenedor con fondo propio.

### Validación
- [ ] Navbar se ve correctamente en mobile y desktop.
- [ ] Footer usa solo colores de la paleta activa sobre fondo `dark`.
- [ ] El contraste de texto en Footer cumple 4.5:1.
- [ ] No hay fuentes ni colores descartados en ninguno de estos componentes.
- [ ] El archivo `src/components/BaseHead.astro` duplicado fue evaluado y resuelto.

---

## Fase 3 — Botones

### Objetivo
Asegurar que todos los botones del sitio usen las clases correctas sin variantes no definidas.

### Archivos
- `src/components/ui/buttons/Button.astro`
- `src/components/ui/buttons/ButtonOutline.astro`

### Tareas — Button.astro
- Aplicar clase `btn-primary` de `global.css`.
- Verificar que acepte prop `href` para funcionar como enlace y como botón.
- Verificar que acepte prop `label` o slot para el texto.
- Sin ícono centrado sin texto.

### Tareas — ButtonOutline.astro
- Aplicar clase `btn-outline` de `global.css` para uso sobre fondo claro.
- Agregar variante `white` que aplique `btn-outline-white` para uso sobre fondo oscuro.
- La variante se controla con prop `variant: 'dark' | 'white'`.

### Reglas a verificar
- Nunca `btn-primary` sobre fondo `bg-brand`.
- Nunca `btn-outline` sobre fondo `bg-dark`.
- `btn-outline-white` solo sobre `bg-dark` o `bg-brand`.

### Validación
- [ ] `Button.astro` funciona como `<a>` y como `<button>`.
- [ ] `ButtonOutline.astro` tiene la variante `white` funcional.
- [ ] Ambos botones tienen estado `focus:ring-2 focus:ring-brand focus:outline-none`.
- [ ] Ningún botón usa colores fuera de la paleta activa.

---

## Fase 4 — SectionHeader y Hero

### Objetivo
Normalizar el componente de encabezado de sección y la sección Hero principal.

### Archivos
- `src/components/ui/sections/SectionHeader.astro`
- `src/components/ui/sections/Hero.astro`

### Tareas — SectionHeader
- Título: clase `titulo-seccion` (`font-poppins text-3xl lg:text-4xl font-bold leading-snug`).
- Subtítulo opcional: clase `subtitulo` con color `text-gray`.
- No usar `font-rader` en `SectionHeader`. Ese rol es exclusivo del Hero.
- El componente acepta props: `title`, `subtitle?`, `align?: 'left' | 'center'`.
- Alineación por defecto: `left`.

### Tareas — Hero
- Fondo de sección: `bg-light`.
- Layout: `flex flex-col lg:flex-row items-center gap-12 min-h-[80vh]`.
- Título: clase `titulo-hero` (`font-rader text-5xl lg:text-7xl font-bold leading-tight text-dark`).
- Subtítulo: `font-poppins text-lg font-medium text-gray mt-4 max-w-lg`.
- Botones en fila: `flex flex-col sm:flex-row gap-4 mt-10`.
- Imagen: `<Image />` con `src="/generico.jpeg"`, ocupa 50% en desktop.
- Sin card, sin sombra, sin borde en ningún elemento.
- Los textos vienen de `src/data/siteConfig.ts`.

### Validación
- [ ] `SectionHeader` no usa `font-rader`.
- [ ] `Hero` usa `font-rader` una sola vez.
- [ ] Hero es responsivo en mobile y desktop.
- [ ] Ningún elemento del Hero tiene card, sombra o borde decorativo.
- [ ] Los textos no están hardcodeados.

---

## Fase 5 — Cards de Servicios y ServiceCard

### Objetivo
Normalizar el único grupo de cards justificadas por la guía y asegurar que los íconos
no tengan contenedor propio.

### Archivos
- `src/components/ui/cards/ServiceCard.astro`
- `src/components/smart/ServicesGrid.astro`

### Tareas — ServiceCard
- Card: `bg-white border border-gray-light rounded-sm p-6 hover:border-accent transition-colors duration-200`.
- Sin `shadow-sm`, sin `shadow-md`. El hover cambia el borde, no agrega sombra.
- Ícono: `size-7 text-brand mb-5` — directo sobre la card, sin caja, sin fondo, sin borde.
- Título: `font-poppins font-semibold text-base text-dark`.
- Descripción: `font-poppins text-sm text-gray leading-relaxed mt-2`.
- Link al final: `inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark mt-4 transition-colors duration-200`.
- Verificar que los datos vengan como props desde `ServicesGrid`.

### Tareas — ServicesGrid
- Layout: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`.
- Importa desde `src/data/services.ts` y pasa props a `ServiceCard`.
- No hardcodear ningún servicio.

### Validación
- [ ] El ícono no tiene caja, círculo ni contenedor con fondo.
- [ ] El hover de la card cambia el borde a `accent`, no agrega sombra.
- [ ] Los datos vienen de `services.ts`.
- [ ] La grilla es responsiva.

---

## Fase 6 — ReasonsGrid y ReasonItem

### Objetivo
Asegurar que el bloque de razones use lista vertical con ícono inline, sin cards.

### Archivos
- `src/components/ui/common/ReasonItem.astro`
- `src/components/smart/ReasonsGrid.astro`

### Tareas — ReasonItem
- Layout: `flex items-start gap-4`.
- Ícono: `size-6 text-brand mt-0.5 shrink-0` — sin contenedor, sin fondo.
- Título: `font-poppins font-semibold text-base text-dark`.
- Descripción: `font-poppins text-sm text-gray leading-relaxed mt-1`.
- Sin borde, sin fondo propio, sin sombra. Es un ítem de lista, no una card.

### Tareas — ReasonsGrid
- Layout: `flex flex-col gap-8`.
- Importa desde `src/data/reasons.ts`.
- Pasa props a `ReasonItem`.

### Validación
- [ ] Ningún `ReasonItem` tiene borde, fondo o sombra.
- [ ] El ícono no tiene contenedor propio.
- [ ] Los datos vienen de `reasons.ts`.

---

## Fase 7 — WhyChooseUs y Stats

### Objetivo
Normalizar la sección de diferenciadores y la sección de estadísticas.

### Archivos
- `src/components/ui/sections/WhyChooseUs.astro`
- `src/components/smart/WhyChooseUsSection.astro`
- `src/components/ui/sections/Stats.astro`
- `src/components/smart/StatsSection.astro`

### Tareas — WhyChooseUs
- Layout: `grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`.
- Lado izquierdo: título de sección + párrafo introductorio.
- Lado derecho: lista vertical con ícono inline, mismo patrón que `ReasonItem`.
- Fondo de sección: `bg-white`.
- Datos desde `src/data/whyUs.ts`.

### Tareas — Stats
- Fondo de sección: `bg-dark`.
- Layout de métricas: `grid grid-cols-2 md:grid-cols-4 divide-x divide-accent/30`.
- Número: `font-poppins text-4xl lg:text-5xl font-bold text-accent`.
- Label: `font-poppins text-sm text-light/60 mt-2`.
- Cada celda: `flex flex-col items-center text-center px-8 py-10`.
- Sin cards, sin bordes individuales por métrica.
- Verificar contraste: texto `accent` sobre `dark` es válido según la guía.
- Datos hardcodeados aceptables aquí solo si no existe archivo en `data/`. Si existe, usarlo.

### Validación
- [ ] `WhyChooseUs` usa lista vertical sin cards.
- [ ] Los íconos en `WhyChooseUs` no tienen contenedor propio.
- [ ] `Stats` usa fondo `dark` con texto `accent` y `light/60`.
- [ ] El contraste en `Stats` cumple 4.5:1.

---

## Fase 8 — Testimonios y Sectores

### Objetivo
Normalizar los bloques de testimonios y sectores para que no usen cards con sombra.

### Archivos
- `src/components/ui/common/TestimonialQuote.astro`
- `src/components/smart/TestimonialsGrid.astro`
- `src/components/ui/chips/SectorChip.astro`
- `src/components/smart/SectorsGrid.astro`

### Tareas — TestimonialQuote
- Layout: `border-l-2 border-accent pl-6 flex flex-col gap-4`.
- Cita: `font-poppins text-base italic text-dark leading-relaxed`.
- Autor: `flex items-center gap-3`.
- Avatar: `<Image />` con `src="/generico.jpeg"`, clase `size-10 rounded-full object-cover`.
- Nombre: `font-poppins font-semibold text-sm text-dark`.
- Cargo: `font-poppins text-xs text-gray`.
- Sin card, sin sombra, sin borde exterior.

### Tareas — TestimonialsGrid
- Layout: `grid grid-cols-1 md:grid-cols-2 gap-6`.
- Fondo de sección: `bg-white`.
- Datos desde `src/data/testimonials.ts`.

### Tareas — SectorChip
- `flex items-center gap-2 border border-gray-light rounded-sm px-4 py-2 bg-white hover:border-brand hover:text-brand transition-colors duration-200`.
- Texto: `font-poppins text-sm font-medium text-dark`.
- Ícono: `size-4` sin contenedor.

### Tareas — SectorsGrid
- Layout: `flex flex-wrap gap-3`.
- Fondo de sección: `bg-light`.
- Datos desde `src/data/sectors.ts`.

### Validación
- [ ] Los testimonios usan línea izquierda `accent`, sin card con sombra.
- [ ] El avatar usa `rounded-full` correctamente.
- [ ] Los chips de sectores no son cards.
- [ ] El ícono dentro del chip no tiene contenedor propio.

---

## Fase 9 — Metodología y FAQ

### Objetivo
Normalizar las secciones de proceso y preguntas frecuentes.

### Archivos
- `src/components/ui/sections/Methodology.astro`
- `src/components/smart/MethodologySection.astro`
- `src/components/smart/FaqAccordion.astro`

### Tareas — Methodology
- Fondo de sección: `bg-light`.
- Layout general: `flex flex-col` con línea conectora vertical.
- Cada step: `flex gap-6 relative`.
- Número: `font-poppins text-xs font-bold text-brand border border-brand rounded-sm px-2 py-1 shrink-0 h-fit mt-1`.
- Línea conectora: `absolute left-[11px] top-8 bottom-0 border-l border-gray-light`.
- Título del step: `font-poppins font-semibold text-base text-dark`.
- Descripción: `font-poppins text-sm text-gray leading-relaxed mt-1`.
- Sin cards, sin íconos en cajas.
- Datos desde `src/data/methodology.ts`.

### Tareas — FaqAccordion
- Fondo de sección: `bg-light`.
- Cada ítem: `border-b border-gray-light`.
- Pregunta: `flex justify-between items-center py-5 cursor-pointer font-poppins font-semibold text-base text-dark`.
- Ícono toggle: `size-4 text-gray transition-transform duration-200 shrink-0`.
- Respuesta: `font-poppins text-sm text-gray leading-relaxed pb-5`.
- Sin cards, sin fondos de color por ítem.
- Datos desde `src/data/faq.ts`.

### Validación
- [ ] El proceso muestra steps con número y línea conectora, sin cards.
- [ ] El FAQ funciona como acordeón con borde inferior únicamente.
- [ ] Ningún ítem de metodología ni FAQ tiene card con fondo propio.

---

## Fase 10 — Cards de Portfolio, Blog y Precios

### Objetivo
Normalizar las tres familias de cards justificadas por la guía.

### Archivos
- `src/components/ui/cards/ProjectCard.astro`
- `src/components/smart/PortfolioGallery.astro`
- `src/components/ui/cards/BlogCard.astro`
- `src/components/smart/BlogFeed.astro`
- `src/components/ui/cards/PricingCard.astro`
- `src/components/smart/PricingSection.astro`
- `src/components/ui/sections/PricingTable.astro`

### Tareas — ProjectCard
- Sin card con borde ni sombra. Solo imagen + texto debajo.
- Imagen: `<Image />` clase `aspect-video object-cover w-full rounded-sm`.
- Título: `font-poppins font-semibold text-base text-dark mt-3`.
- Categoría: `font-poppins text-xs text-gray uppercase tracking-widest mt-1`.

### Tareas — BlogCard
- Card: `bg-white border border-gray-light rounded-sm overflow-hidden hover:border-accent transition-colors duration-200`.
- Sin sombra.
- Imagen: `aspect-video object-cover w-full`.
- Contenido interno: `p-5`.
- Título: `font-poppins font-semibold text-base text-dark`.
- Fecha: `font-poppins text-xs text-gray mt-1`.
- Descripción: `font-poppins text-sm text-gray leading-relaxed mt-2`.

### Tareas — PricingCard
- Card: `bg-white border border-gray-light rounded-sm p-6`.
- Card destacada (plan recomendado): `border-brand`.
- Sin sombra en cards normales. Card destacada puede tener `shadow-sm`.
- Precio: `font-poppins text-4xl font-bold text-dark mt-4`.
- Lista de características: `flex flex-col gap-3 mt-6`.
- Cada característica: `flex items-start gap-2 font-poppins text-sm text-gray`.
- Ícono de check: `size-4 text-brand shrink-0 mt-0.5` sin contenedor.
- Botón al final: `btn-primary` a ancho completo `w-full mt-8`.

### Validación
- [ ] `ProjectCard` no tiene card con borde ni sombra.
- [ ] `BlogCard` usa hover de borde, sin sombra.
- [ ] `PricingCard` destaca el plan recomendado con `border-brand`.
- [ ] Los íconos de check en `PricingCard` no tienen contenedor.
- [ ] Los datos vienen de sus respectivos archivos en `data/` o `content/`.

---

## Fase 11 — Secciones CTA, ContactForm, AidaBanner y DepositBadge

### Objetivo
Normalizar las secciones de conversión y elementos de apoyo a la venta.

### Archivos
- `src/components/ui/sections/CallToAction.astro`
- `src/components/ui/sections/ContactForm.astro`
- `src/components/ui/sections/AidaBanner.astro`
- `src/components/smart/AidaBannerSection.astro`
- `src/components/ui/sections/DepositBadge.astro`

### Tareas — CallToAction
- Fondo: `bg-brand`.
- Layout: `flex flex-col items-center text-center gap-6 py-20 md:py-28`.
- Título: `font-poppins text-3xl lg:text-4xl font-bold text-white`.
- Subtítulo: `font-poppins text-base text-white/80 max-w-xl`.
- Botón: `btn-outline-white`.
- Sin imagen, sin card, sin ícono decorativo.
- Textos desde `src/data/siteConfig.ts`.

### Tareas — ContactForm
- El formulario va directamente sobre el fondo de sección, sin card contenedora.
- Separación entre campos: `space-y-5`.
- Inputs: clase `input-base` de `global.css`.
- Textarea: clase `textarea-base`.
- Labels: clase `label-base`.
- Botón de envío: `btn-primary w-full sm:w-auto`.
- Cada campo tiene `<label>` con `for` e `id` asociados.

### Tareas — AidaBanner
- Presentar las 4 fases de AIDA como lista horizontal o vertical según viewport.
- Sin cards por fase. Cada fase: letra grande de la fase en `text-brand` + texto descriptivo.
- Fondo: `bg-light`.
- Letra AIDA: `font-poppins text-4xl font-bold text-brand`.
- Título de fase: `font-poppins font-semibold text-base text-dark`.
- Descripción: `font-poppins text-sm text-gray`.

### Tareas — DepositBadge
- Elemento inline o en línea, no una sección completa.
- Estilo: `inline-flex items-center gap-2 border border-accent rounded-sm px-4 py-2`.
- Texto: `font-poppins text-sm font-semibold text-dark`.
- Número `30%`: `text-brand font-bold`.

### Validación
- [ ] El CTA usa `btn-outline-white` y no `btn-outline` ni `btn-primary`.
- [ ] El formulario no tiene card contenedora.
- [ ] Todos los inputs tienen label asociado.
- [ ] `AidaBanner` no usa cards por fase.
- [ ] `DepositBadge` es un elemento compacto, no una sección.

---

## Fase 12 — Alternancia de Fondos en Páginas

### Objetivo
Verificar que todas las páginas principales respetan la alternancia de fondos definida
en la guía y que no hay dos secciones consecutivas con el mismo fondo.

### Archivos
- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/services/index.astro`
- `src/pages/pricing.astro`
- `src/pages/contact.astro`
- `src/pages/testimonials.astro`
- `src/pages/portfolio.astro`
- `src/pages/faq.astro`
- `src/pages/methodology.astro`

### Orden correcto para la Home

| Orden | Sección | Fondo |
|---|---|---|
| 1 | Hero | `bg-light` |
| 2 | Beneficios / Razones | `bg-white` |
| 3 | Servicios | `bg-light` |
| 4 | Por qué elegirnos | `bg-white` |
| 5 | Estadísticas | `bg-dark` |
| 6 | Metodología | `bg-light` |
| 7 | Testimonios | `bg-white` |
| 8 | Sectores | `bg-light` |
| 9 | CTA Final | `bg-brand` |

### Tareas
- Recorrer cada página y verificar que ninguna sección consecutiva comparte fondo.
- Verificar que el CTA siempre va antes del Footer.
- Verificar que cada sección usa el componente Smart correspondiente.
- Verificar que los Smart components usan el fondo correcto de sección internamente
  o que la página se lo pasa como prop.

### Validación
- [ ] Ninguna página tiene dos secciones consecutivas con el mismo fondo.
- [ ] El CTA siempre es la última sección antes del Footer.
- [ ] Cada sección usa las clases `section-base` + `section-[variante]` de `global.css`.

---

## Fase 13 — Revisión de Accesibilidad y Contraste

### Objetivo
Verificar que todos los componentes normalizados cumplen los requisitos de accesibilidad
definidos en la guía.

### Archivos
Todos los componentes modificados en las fases anteriores.

### Checklist

- [ ] Todo elemento interactivo tiene `focus:ring-2 focus:ring-brand focus:outline-none`.
- [ ] Todas las imágenes tienen `alt` descriptivo o `alt=""` + `aria-hidden="true"`.
- [ ] Los botones de solo ícono tienen `aria-label`.
- [ ] Los inputs tienen `<label>` con `for` e `id`.
- [ ] No hay texto `dark` sobre fondo `dark`.
- [ ] No hay texto claro sobre fondo claro.
- [ ] El texto `gray` solo aparece sobre fondo `light` o `white`, nunca sobre `accent`.
- [ ] Los íconos decorativos sin función tienen `aria-hidden="true"`.
- [ ] El orden del DOM coincide con el orden visual.
- [ ] Los avatares usan `rounded-full` correctamente.
- [ ] Ningún otro elemento usa `rounded-full`.

---

## Fase 14 — Revisión Final Global

### Objetivo
Validar que el sitio completo compile, se vea correctamente y cumpla todas las reglas
de la guía de estilos.

### Checklist

- [ ] `astro build` ejecuta sin errores ni warnings críticos.
- [ ] No aparece ningún token de color descartado en ningún componente.
- [ ] No aparece `font-supply`, `font-tan` ni `font-satisfy` en ningún componente.
- [ ] No aparece `rounded-full` fuera de avatares.
- [ ] No aparece `shadow-xl` ni `shadow-2xl`.
- [ ] No aparece `!important`.
- [ ] No aparecen colores arbitrarios `[#abc]`.
- [ ] No hay textos hardcodeados en componentes.
- [ ] Ningún ícono está encerrado en caja, círculo o contenedor con fondo propio.
- [ ] Ninguna sección de beneficios, razones, FAQ o proceso usa cards.
- [ ] Los testimonios usan línea izquierda `accent`, no cards con sombra.
- [ ] Los sectores usan chips, no cards.
- [ ] La alternancia de fondos es correcta en todas las páginas.
- [ ] El sitio es completamente responsivo en mobile, tablet y desktop.
- [ ] Todos los links del Navbar y Footer funcionan correctamente.