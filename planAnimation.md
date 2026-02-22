# Plan de Implementación de Animaciones — Tinya Code

## Reglas del Agente para este Plan

- Leer `animations.md` completa antes de iniciar cualquier fase.
- Leer `guiaEstilo.md` completa antes de iniciar cualquier fase.
- Leer el documento de reglas de animación completo antes de iniciar cualquier fase.
- No modificar lógica ni datos. Este plan es exclusivamente de animaciones.
- No modificar estilos visuales ya normalizados en el plan de estilos.
- Cada fase se valida antes de continuar con la siguiente.
- Verificar `prefers-reduced-motion` en cada fase sin excepción.
- Usar únicamente los `@keyframes` y clases definidos en las reglas de animación.
- Ningún componente define `@keyframes` localmente. Todo va en `global.css`.

---

## Fase 1 — Infraestructura Base de Animaciones en global.css

### Objetivo
Tener todas las clases CSS y `@keyframes` definidos en `global.css` antes de
tocar cualquier componente. Esta fase no toca ningún componente.

### Archivos
- `src/styles/global.css`

### Tareas

Agregar en `global.css` dentro de `@layer components` o después del bloque de
componentes, en este orden exacto:

**Bloque 1 — Animaciones de entrada en viewport**
- Definir clase `.animate-on-scroll`
- Definir clase `.animate-on-scroll-left`
- Definir clase `.animate-on-scroll-right`
- Definir clase `.animate-on-scroll.is-visible`
- Definir clase `.animate-on-scroll-left.is-visible`
- Definir clase `.animate-on-scroll-right.is-visible`
- Definir clases de delay `.animate-delay-1`, `.animate-delay-2`, `.animate-delay-3`
- Agregar bloque `prefers-reduced-motion` para todas las anteriores

**Bloque 2 — Acordeón FAQ**
- Definir clase `.faq-content`
- Definir clase `.faq-content.is-open`
- Definir clase `.faq-icon`
- Definir clase `.faq-icon.is-open`
- Agregar bloque `prefers-reduced-motion`

**Bloque 3 — Menú mobile**
- Definir clase `.mobile-menu`
- Definir clase `.mobile-menu.is-open`
- Agregar bloque `prefers-reduced-motion`

**Bloque 4 — Indicador de link en navbar**
- Definir `::after` en `.nav-link` para la línea que crece
- Definir `::after` permanente en `.nav-link-active`
- Agregar bloque `prefers-reduced-motion`

**Bloque 5 — Link animado de texto**
- Definir clase `.link-animated` con `::after` que crece desde el centro
- Agregar bloque `prefers-reduced-motion`

**Bloque 6 — Input y textarea focus**
- Definir transición de `border-color` en `.input-base` y `.textarea-base`
- Agregar bloque `prefers-reduced-motion`

**Bloque 7 — Skeleton de carga**
- Definir `@keyframes skeleton-pulse`
- Definir clase `.skeleton`
- Definir clase `.skeleton-text`
- Definir clase `.skeleton-title`
- Definir clase `.skeleton-image`
- Agregar bloque `prefers-reduced-motion`

**Bloque 8 — @keyframes globales**
- Definir `@keyframes btn-shine`
- Definir `@keyframes draw-line`
- Definir `@keyframes border-grow`

**Bloque 9 — Clases que usan los @keyframes anteriores**
- Definir `.btn-primary::before` y `.btn-primary:hover::before` para `btn-shine`
- Definir `.line-draw` y `.line-draw.is-visible` para `draw-line`
- Definir `.card-service::before` y `.card-service:hover::before` para `border-grow`
- Agregar bloques `prefers-reduced-motion` para cada uno

**Bloque 10 — Número de estadística**
- Definir clase `.stat-number` con `font-variant-numeric: tabular-nums`

**Bloque 11 — Scroll suave**
- Verificar que `html { scroll-behavior: smooth; }` está presente
- Agregar bloque `prefers-reduced-motion` que lo cambia a `auto`

### Validación
- [ ] `astro dev` compila sin errores después de agregar todos los bloques.
- [ ] No hay `@keyframes` duplicados.
- [ ] Cada bloque de animación tiene su contraparte `prefers-reduced-motion`.
- [ ] Las clases `.animate-on-scroll*` existen y tienen estado `.is-visible`.
- [ ] Las clases `.faq-content`, `.faq-icon`, `.mobile-menu` existen.
- [ ] Los cuatro `@keyframes` están definidos: `btn-shine`, `draw-line`, `border-grow`, `skeleton-pulse`.
- [ ] `.btn-primary` tiene `position: relative` y `overflow: hidden`.
- [ ] `.card-service` tiene `position: relative` y `overflow: hidden`.

---

## Fase 2 — Script Reutilizable del IntersectionObserver

### Objetivo
Crear el script del observer una sola vez y hacerlo disponible para todos los
componentes que lo necesiten, sin duplicar código.

### Archivos
- `src/scripts/observer.ts` — crear este archivo nuevo

### Tareas
- Crear la carpeta `src/scripts/` si no existe.
- Crear el archivo `src/scripts/observer.ts`.
- Dentro del archivo definir y exportar la función `initScrollAnimations()` que:
  - Selecciona todos los elementos con clases `.animate-on-scroll`,
    `.animate-on-scroll-left` y `.animate-on-scroll-right`.
  - Instancia el `IntersectionObserver` con `threshold: 0.1`.
  - Al intersectar agrega la clase `is-visible` y deja de observar el elemento.
  - Respeta `prefers-reduced-motion`: si está activo, agrega `is-visible`
    directamente sin observer y retorna.
- El script se importa en los componentes que lo necesiten con:
```astro
  <script>
    import { initScrollAnimations } from '@/scripts/observer';
    initScrollAnimations();
  </script>
```

### Validación
- [ ] El archivo `src/scripts/observer.ts` existe y exporta `initScrollAnimations`.
- [ ] La función no lanza errores en consola al ejecutarse.
- [ ] Con `prefers-reduced-motion: reduce` activo, los elementos son visibles
      inmediatamente sin animación.

---

## Fase 3 — Animación de Entrada en SectionHeader

### Objetivo
El título y subtítulo de cada sección aparecen con fade + translateY al entrar
al viewport. Es el primer componente en recibir animación de entrada.

### Archivos
- `src/components/ui/sections/SectionHeader.astro`

### Tareas
- Agregar clase `animate-on-scroll` al elemento del título.
- Agregar clase `animate-on-scroll` al elemento del subtítulo con `animate-delay-2`.
- Importar y llamar `initScrollAnimations()` en el script del componente.
- Verificar que el componente no tenga `opacity-0` hardcodeado en Tailwind
  ya que eso lo gestiona la clase CSS.

### Validación
- [ ] El título de sección aparece con fade + desplazamiento al hacer scroll.
- [ ] El subtítulo aparece con un delay de `100ms` después del título.
- [ ] Con `prefers-reduced-motion` activo, los elementos son visibles sin animación.
- [ ] El componente no parpadea ni queda invisible si el observer tarda en ejecutarse.

---

## Fase 4 — Animaciones de Entrada en ServicesGrid y ServiceCard

### Objetivo
Las cards de servicios entran escalonadas al viewport. La card tiene el efecto
de borde izquierdo que crece en hover.

### Archivos
- `src/components/smart/ServicesGrid.astro`
- `src/components/ui/cards/ServiceCard.astro`

### Tareas — ServicesGrid
- Agregar clase `animate-on-scroll` a cada `ServiceCard` dentro del loop.
- Agregar `animate-delay-1`, `animate-delay-2`, `animate-delay-3` de forma
  escalonada. El ciclo se reinicia cada 3 elementos.
- Importar y llamar `initScrollAnimations()`.

### Tareas — ServiceCard
- Agregar clase `card-service` al elemento raíz de la card, además de las
  clases visuales ya existentes.
- Verificar que el elemento raíz tenga `position: relative` y `overflow: hidden`
  que vienen de la clase `card-service` definida en `global.css`.
- El efecto de borde izquierdo ya está definido en CSS. No agregar JS adicional.

### Validación
- [ ] Las cards entran escalonadas con delay de `0ms`, `100ms`, `200ms`.
- [ ] El hover muestra el borde izquierdo `brand` creciendo verticalmente.
- [ ] Con `prefers-reduced-motion` el borde izquierdo está visible sin animación.
- [ ] No hay más de 3 niveles de delay en ninguna fila de la grilla.

---

## Fase 5 — Animaciones de Entrada en ReasonsGrid y ReasonItem

### Objetivo
Los ítems de la lista de razones entran uno a uno con fade + translateY escalonado.

### Archivos
- `src/components/smart/ReasonsGrid.astro`
- `src/components/ui/common/ReasonItem.astro`

### Tareas — ReasonsGrid
- Agregar clase `animate-on-scroll` a cada `ReasonItem` en el loop.
- Agregar delay escalonado: `animate-delay-1`, `animate-delay-2`, `animate-delay-3`.
  Reiniciar el ciclo cada 3 elementos.
- Importar y llamar `initScrollAnimations()`.

### Tareas — ReasonItem
- No agregar animación directamente en `ReasonItem`. La animación la gestiona
  el componente padre `ReasonsGrid`.
- Verificar que el componente no tenga `opacity` ni `transform` hardcodeados.

### Validación
- [ ] Los ítems entran uno a uno al hacer scroll.
- [ ] El delay escalonado no supera `200ms`.
- [ ] Con `prefers-reduced-motion` todos los ítems son visibles sin animación.

---

## Fase 6 — Animaciones en WhyChooseUs y Stats

### Objetivo
La sección de diferenciadores entra con animación lateral de dos columnas.
La sección de estadísticas entra como bloque completo y los números cuentan.

### Archivos
- `src/components/ui/sections/WhyChooseUs.astro`
- `src/components/smart/WhyChooseUsSection.astro`
- `src/components/ui/sections/Stats.astro`
- `src/components/smart/StatsSection.astro`

### Tareas — WhyChooseUs
- Columna izquierda (título + párrafo): agregar clase `animate-on-scroll-left`.
- Columna derecha (lista de ítems): agregar clase `animate-on-scroll-right`.
- Importar y llamar `initScrollAnimations()`.

### Tareas — Stats
- El contenedor de la sección completa: agregar clase `animate-on-scroll`.
- Cada celda de métrica: agregar clase `.stat-number` con atributos
  `data-target` y `data-suffix` según el valor real del dato.
- Agregar el script del contador en `StatsSection.astro`:
  - Seleccionar todos los `.stat-number[data-target]`.
  - Instanciar un `IntersectionObserver` con `threshold: 0.3`.
  - Al intersectar, ejecutar el contador si no hay `prefers-reduced-motion`.
  - Si hay `prefers-reduced-motion`, mostrar el valor final directamente.
- Importar y llamar `initScrollAnimations()` también para el fade de la sección.

### Validación
- [ ] La columna izquierda de WhyChooseUs entra desde la izquierda.
- [ ] La columna derecha entra desde la derecha.
- [ ] Los números de Stats cuentan desde `0` al valor final.
- [ ] El contador respeta `prefers-reduced-motion` mostrando el valor final directamente.
- [ ] Con `prefers-reduced-motion` la sección es visible sin animación ni contador.

---

## Fase 7 — Animaciones en Testimonios y Metodología

### Objetivo
Los bloques de testimonios entran con fade. Los steps de metodología entran
uno a uno de forma escalonada.

### Archivos
- `src/components/ui/common/TestimonialQuote.astro`
- `src/components/smart/TestimonialsGrid.astro`
- `src/components/ui/sections/Methodology.astro`
- `src/components/smart/MethodologySection.astro`

### Tareas — TestimonialsGrid
- Agregar clase `animate-on-scroll` a cada `TestimonialQuote` en el loop.
- Agregar delay escalonado: `animate-delay-1`, `animate-delay-2`.
  Máximo 2 niveles ya que la grilla es de 2 columnas.
- Importar y llamar `initScrollAnimations()`.

### Tareas — Methodology
- Agregar clase `animate-on-scroll` a cada step en el loop.
- Agregar delay escalonado: `animate-delay-1`, `animate-delay-2`, `animate-delay-3`.
  Reiniciar cada 3 elementos.
- Importar y llamar `initScrollAnimations()`.

### Validación
- [ ] Los bloques de testimonios entran con fade al hacer scroll.
- [ ] Los steps de metodología entran uno a uno escalonados.
- [ ] Con `prefers-reduced-motion` todos los elementos son visibles sin animación.

---

## Fase 8 — Acordeón FAQ

### Objetivo
El acordeón abre y cierra con transición de `max-height`. El ícono rota al abrir.
Solo un ítem puede estar abierto a la vez.

### Archivos
- `src/components/smart/FaqAccordion.astro`

### Tareas
- Verificar que cada ítem del acordeón tiene:
  - Botón de pregunta con clase `faq-trigger` y `aria-expanded="false"`.
  - Contenedor de respuesta con clase `faq-content`.
  - Ícono con clase `faq-icon`.
- Agregar script en el componente que:
  - Selecciona todos los `.faq-trigger`.
  - Al hacer click en uno, cierra todos los demás ítems quitando `is-open`
    y actualizando `aria-expanded="false"`.
  - Alterna `is-open` en el `.faq-content` y `.faq-icon` del ítem clickeado.
  - Actualiza `aria-expanded` del botón clickeado.
- Verificar que las clases `.faq-content` y `.faq-icon` están en `global.css`
  desde la Fase 1.
- No agregar `display: none` ni `visibility: hidden` al contenido.

### Validación
- [ ] Al hacer click en una pregunta, la respuesta se abre con transición suave.
- [ ] Al abrir una pregunta, la que estaba abierta se cierra.
- [ ] El ícono chevron rota `180deg` al abrir.
- [ ] `aria-expanded` cambia correctamente entre `true` y `false`.
- [ ] Con `prefers-reduced-motion` el acordeón abre y cierra sin transición.

---

## Fase 9 — Menú Mobile

### Objetivo
El menú mobile aparece y desaparece con fade + desplazamiento vertical sutil.
El botón hamburguesa gestiona correctamente el estado de accesibilidad.

### Archivos
- `src/components/ui/common/Navbar.astro`

### Tareas
- Verificar que el contenedor del menú mobile tiene clase `mobile-menu`.
- Agregar script en el componente que:
  - Selecciona el botón hamburguesa y el contenedor `.mobile-menu`.
  - Al hacer click en el botón, alterna la clase `is-open` en `.mobile-menu`.
  - Alterna `aria-expanded` en el botón entre `true` y `false`.
  - Alterna `overflow-hidden` en `document.body` al abrir y cerrar.
  - Cierra el menú al hacer click en cualquier link del menú.
  - Cierra el menú al hacer click fuera del menú.
- Verificar que el botón hamburguesa tiene `aria-label="Abrir menú"` y lo
  cambia a `"Cerrar menú"` al abrir.
- Verificar que las clases `.mobile-menu` y `.mobile-menu.is-open` están
  en `global.css` desde la Fase 1.

### Validación
- [ ] El menú abre con fade + desplazamiento vertical suave.
- [ ] El menú cierra al hacer click en cualquier link.
- [ ] El menú cierra al hacer click fuera.
- [ ] `aria-expanded` cambia correctamente.
- [ ] El body tiene `overflow-hidden` mientras el menú está abierto.
- [ ] Con `prefers-reduced-motion` el menú aparece sin transición.

---

## Fase 10 — Indicador de Link en Navbar

### Objetivo
Los links del navbar muestran una línea inferior que crece al hacer hover.
El link activo tiene la línea permanente.

### Archivos
- `src/components/ui/common/Navbar.astro`

### Tareas
- Verificar que los links usan la clase `nav-link` definida en `global.css`.
- Verificar que el link activo usa la clase `nav-link-active`.
- Verificar que `global.css` tiene el `::after` con `width: 0` y
  `transition: width 200ms ease` en `.nav-link`.
- Verificar que `.nav-link-active::after` tiene `width: 100%` permanente.
- Verificar que los links tienen `position: relative` necesario para el `::after`.
- No agregar JS para este efecto. Es puramente CSS.

### Validación
- [ ] Al hacer hover en un link, la línea inferior crece de izquierda a derecha.
- [ ] El link activo tiene la línea permanente sin necesidad de hover.
- [ ] Con `prefers-reduced-motion` la línea aparece sin animación en hover.

---

## Fase 11 — Botón Primario con Efecto Shine

### Objetivo
El botón primario muestra un destello de luz de izquierda a derecha al hacer hover.

### Archivos
- `src/components/ui/buttons/Button.astro`

### Tareas
- Verificar que el elemento raíz del botón tiene la clase `btn-primary`.
- Verificar que `global.css` tiene `position: relative` y `overflow: hidden`
  en `.btn-primary` y el `::before` con `@keyframes btn-shine`.
- No agregar JS. Es puramente CSS con `::before` y `@keyframes`.
- Verificar que el `ButtonOutline` no tiene este efecto. Solo `btn-primary`.

### Validación
- [ ] Al hacer hover en el botón primario, aparece el destello de izquierda a derecha.
- [ ] El botón outline no tiene destello.
- [ ] Con `prefers-reduced-motion` el `::before` está oculto y no hay destello.
- [ ] El destello no afecta el texto ni el layout del botón.

---

## Fase 12 — Línea Decorativa de Sección

### Objetivo
Agregar la línea decorativa animada debajo del título en las secciones
que lo requieran según la guía visual.

### Archivos
- `src/components/ui/sections/SectionHeader.astro`

### Tareas
- Agregar un elemento `<span class="line-draw animate-on-scroll w-12 mt-3 mb-8"></span>`
  debajo del título en `SectionHeader.astro`.
- Verificar que la clase `.line-draw` y `.line-draw.is-visible` están en `global.css`.
- La línea usa `@keyframes draw-line` que ya fue definido en la Fase 1.
- El `initScrollAnimations()` ya está importado en `SectionHeader` desde la Fase 3.
- La línea solo aparece cuando `SectionHeader` tiene `align="left"`. En `center`
  la línea no se muestra.

### Validación
- [ ] La línea se dibuja de izquierda a derecha al entrar al viewport.
- [ ] La línea tiene color `accent` y ancho máximo `w-12`.
- [ ] La línea solo aparece en headers con `align="left"`.
- [ ] Con `prefers-reduced-motion` la línea es visible sin animación de dibujado.

---

## Fase 13 — Links Animados en Footer

### Objetivo
Los links del footer tienen el efecto de subrayado que crece desde el centro.

### Archivos
- `src/components/ui/common/Footer.astro`

### Tareas
- Agregar clase `link-animated` a los links del footer junto a las clases
  de color ya existentes.
- Verificar que la clase `.link-animated` con `::after` está en `global.css`
  desde la Fase 1.
- No agregar JS. Es puramente CSS.
- No aplicar `link-animated` a links del Navbar. El Navbar tiene su propio
  indicador definido en la Fase 10.

### Validación
- [ ] Al hacer hover en un link del footer, el subrayado crece desde el centro.
- [ ] El efecto no aparece en links del Navbar.
- [ ] Con `prefers-reduced-motion` el subrayado está visible permanentemente.

---

## Fase 14 — Animación de Entrada en Portfolio y Blog

### Objetivo
Las cards de portfolio y blog entran con fade al hacer scroll.

### Archivos
- `src/components/smart/PortfolioGallery.astro`
- `src/components/smart/BlogFeed.astro`
- `src/components/ui/cards/ProjectCard.astro`
- `src/components/ui/cards/BlogCard.astro`

### Tareas — PortfolioGallery
- Agregar clase `animate-on-scroll` a cada `ProjectCard` en el loop.
- Agregar delay escalonado `animate-delay-1`, `animate-delay-2` (grilla de 2 columnas).
- Importar y llamar `initScrollAnimations()`.

### Tareas — BlogFeed
- Agregar clase `animate-on-scroll` a cada `BlogCard` en el loop.
- Agregar delay escalonado `animate-delay-1`, `animate-delay-2`, `animate-delay-3`.
- Importar y llamar `initScrollAnimations()`.

### Tareas — BlogCard
- Verificar que el elemento raíz de `BlogCard` no bloquea la animación
  con `opacity` o `transform` hardcodeados.

### Validación
- [ ] Las cards de portfolio entran con fade escalonado.
- [ ] Las cards de blog entran con fade escalonado.
- [ ] Con `prefers-reduced-motion` todas las cards son visibles sin animación.

---

## Fase 15 — Animación de Entrada en Pricing y CTA

### Objetivo
Las cards de precios entran escalonadas. La sección CTA entra como bloque completo.

### Archivos
- `src/components/smart/PricingSection.astro`
- `src/components/ui/cards/PricingCard.astro`
- `src/components/ui/sections/CallToAction.astro`

### Tareas — PricingSection
- Agregar clase `animate-on-scroll` a cada `PricingCard` en el loop.
- Agregar delay escalonado `animate-delay-1`, `animate-delay-2`, `animate-delay-3`.
- Importar y llamar `initScrollAnimations()`.

### Tareas — CallToAction
- Agregar clase `animate-on-scroll` al contenedor interno del CTA,
  no al contenedor de fondo de sección.
- Importar y llamar `initScrollAnimations()`.

### Validación
- [ ] Las cards de precios entran escalonadas.
- [ ] El CTA entra con fade como bloque.
- [ ] Con `prefers-reduced-motion` todo es visible sin animación.

---

## Fase 16 — Revisión Global y Validación Final

### Objetivo
Verificar que todas las animaciones funcionan correctamente en el sitio completo,
sin errores, sin conflictos y respetando accesibilidad.

### Checklist técnico

- [ ] `astro build` ejecuta sin errores ni warnings.
- [ ] No hay `@keyframes` definidos fuera de `global.css`.
- [ ] No hay `transition-all` en ningún componente.
- [ ] No hay `hover:scale-*` ni `hover:translate-*` en cards ni botones.
- [ ] No hay animaciones en Hero, Navbar ni Footer.
- [ ] El delay escalonado no supera `200ms` en ninguna grilla.
- [ ] El acordeón tiene solo un ítem abierto a la vez.
- [ ] El menú mobile gestiona `aria-expanded` correctamente.
- [ ] Los números de Stats cuentan correctamente y se detienen al llegar al target.
- [ ] La línea decorativa aparece solo en `SectionHeader` con `align="left"`.
- [ ] El efecto shine solo aparece en `btn-primary`.
- [ ] Los links del footer tienen `link-animated` y los del Navbar no.

### Checklist de prefers-reduced-motion

- [ ] Con `prefers-reduced-motion: reduce` activo en el sistema operativo:
- [ ] Ningún elemento entra con fade ni translateY.
- [ ] El acordeón abre y cierra sin transición.
- [ ] El menú mobile aparece sin transición.
- [ ] Los números de Stats muestran el valor final directamente.
- [ ] La línea decorativa es visible sin animación de dibujado.
- [ ] El botón primario no muestra el destello.
- [ ] La línea del navbar en hover aparece sin animación de width.
- [ ] El scroll es instantáneo.

### Checklist visual en dispositivos

- [ ] Las animaciones funcionan correctamente en mobile.
- [ ] Las animaciones funcionan correctamente en tablet.
- [ ] Las animaciones funcionan correctamente en desktop.
- [ ] No hay elementos que queden invisibles por el estado inicial `opacity: 0`
      si el observer falla en ejecutarse.