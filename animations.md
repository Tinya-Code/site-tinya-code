# Reglas de Animación y Micro-interacciones — Tinya Code

## Principio General

Las animaciones tienen un único propósito: **guiar la atención y confirmar interacciones**.
Nunca son decorativas. Nunca deben distraer del contenido ni ralentizar la percepción
de velocidad del sitio. Si una animación no cumple una función, no existe.

---

## Reglas Absolutas

- Nunca animar un elemento solo porque se puede.
- Nunca usar `animate-bounce`, `animate-spin` ni `animate-ping` en elementos de UI permanentes.
- Nunca animar más de un elemento al mismo tiempo en el mismo área visual.
- Nunca usar duraciones mayores a `600ms` salvo excepciones indicadas explícitamente.
- Nunca usar `transition-all`. Siempre especificar la propiedad exacta.
- Nunca usar animaciones de entrada en elementos visibles sin scroll al cargar.
- Respetar siempre `prefers-reduced-motion`. Toda animación tiene su versión reducida.
- No usar librerías externas de animación. Todo se resuelve con CSS nativo y Tailwind.
- Las animaciones CSS con `@keyframes` se definen únicamente en `global.css`.
- Ningún componente define sus propios `@keyframes` localmente.

---

## Duraciones Permitidas

| Uso | Duración | Referencia |
|---|---|---|
| Hover de color, borde | `200ms` | `duration-200` Tailwind |
| Hover de sombra | `200ms` | `duration-200` Tailwind |
| Indicador de link en navbar | `200ms` | CSS nativo |
| Aparición menú mobile | `300ms` | `duration-300` Tailwind |
| Acordeón FAQ abre/cierra | `300ms` | CSS nativo |
| Transición de página | `300ms` | Astro View Transitions |
| Entrada de elemento en viewport | `400ms` | CSS nativo |
| Animaciones de pulso o brillo decorativo | `600ms` | `@keyframes` CSS |
| Línea de progreso o carga | `800ms` | `@keyframes` CSS |

Duraciones fuera de esta tabla están prohibidas.

---

## Propiedades Animables

Solo estas propiedades pueden ser animadas.

| Propiedad | Uso permitido |
|---|---|
| `color` | Hover en links, botones, íconos |
| `background-color` | Hover en botones, chips, badges |
| `border-color` | Hover en cards, inputs, chips |
| `opacity` | Aparición, overlay, fade |
| `transform: translateY` | Entrada de elementos en viewport |
| `transform: translateX` | Entrada lateral puntual |
| `transform: rotate` | Ícono toggle del acordeón |
| `transform: scaleX` | Línea de subrayado en links |
| `max-height` | Acordeón FAQ |
| `width` | Solo en `::after` de indicadores de línea |
| `background-size` | Efecto de gradiente animado puntual |

Propiedades como `height`, `padding`, `margin`, `font-size` y `box-shadow`
directa **nunca se animan**.

---

## Categorías de Animación

---

### 1. Transiciones de Hover

Se aplican directamente con Tailwind. No requieren JavaScript.

#### Botones
```
transition-colors duration-200
```
Solo cambia `background-color` y `color`.

#### Cards de servicios y blog
```
transition-colors duration-200
```
Solo cambia `border-color`. Sin `scale`, sin `translateY`, sin sombra.

#### Links de navegación y footer
```
transition-colors duration-200
```
Solo cambia `color`.

#### Chips de sectores
```
transition-colors duration-200
```
Cambia `border-color` y `color`.

#### Inputs y textarea
```
transition-colors duration-200
```
Solo cambia `border-color` en focus.

#### Regla estricta de hover
- Nunca `hover:scale-*` en cards, botones ni contenedores.
- Nunca `hover:-translate-y-*` en cards ni botones.
- El hover solo cambia propiedades de color o borde, nunca mueve ni escala.

---

### 2. Animaciones de Entrada en Viewport

Se activan con `IntersectionObserver`. El elemento empieza invisible y aparece
al entrar al viewport.

#### Clases CSS en global.css
```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 400ms ease, transform 400ms ease;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.animate-on-scroll-left {
  opacity: 0;
  transform: translateX(-24px);
  transition: opacity 400ms ease, transform 400ms ease;
}

.animate-on-scroll-left.is-visible {
  opacity: 1;
  transform: translateX(0);
}

.animate-on-scroll-right {
  opacity: 0;
  transform: translateX(24px);
  transition: opacity 400ms ease, transform 400ms ease;
}

.animate-on-scroll-right.is-visible {
  opacity: 1;
  transform: translateX(0);
}

/* Delay escalonado para grillas — máximo 3 niveles */
.animate-delay-1 { transition-delay: 0ms; }
.animate-delay-2 { transition-delay: 100ms; }
.animate-delay-3 { transition-delay: 200ms; }

@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll,
  .animate-on-scroll-left,
  .animate-on-scroll-right {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .animate-delay-1,
  .animate-delay-2,
  .animate-delay-3 {
    transition-delay: 0ms;
  }
}
```

#### Script del observer — reutilizable en cualquier componente Astro
```astro
<script>
  const targets = document.querySelectorAll(
    '.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  targets.forEach((el) => observer.observe(el));
</script>
```

#### Qué elementos llevan animación de entrada

| Elemento | Clase |
|---|---|
| Título de sección | `animate-on-scroll` |
| Cards de servicios | `animate-on-scroll` + delay escalonado |
| Items de beneficios/razones | `animate-on-scroll` + delay escalonado |
| Steps de metodología | `animate-on-scroll` + delay escalonado |
| Bloques de testimonios | `animate-on-scroll` |
| Sección de estadísticas | `animate-on-scroll` |
| Columna izquierda de sección dividida | `animate-on-scroll-left` |
| Columna derecha de sección dividida | `animate-on-scroll-right` |
| Hero | **No** — visible sin scroll |
| Navbar | **No** |
| Footer | **No** |

---

### 3. Indicador de Link en Navbar

Línea inferior que crece desde la izquierda en hover y permanece en el link activo.

#### CSS en global.css
```css
.nav-link {
  position: relative;
  padding-bottom: 2px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-brand);
  transition: width 200ms ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link-active {
  position: relative;
  color: var(--color-brand);
  padding-bottom: 2px;
}

.nav-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--color-brand);
}

@media (prefers-reduced-motion: reduce) {
  .nav-link::after {
    transition: none;
  }
}
```

---

### 4. Acordeón FAQ

Abre y cierra con `max-height`. El ícono rota al abrir.

#### CSS en global.css
```css
.faq-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease;
}

.faq-content.is-open {
  max-height: 600px;
}

.faq-icon {
  transition: transform 300ms ease;
  flex-shrink: 0;
}

.faq-icon.is-open {
  transform: rotate(180deg);
}

@media (prefers-reduced-motion: reduce) {
  .faq-content {
    transition: none;
  }
  .faq-icon {
    transition: none;
  }
}
```

#### Reglas del acordeón
- Solo un ítem abierto a la vez. Al abrir uno, el anterior se cierra.
- El toggle lo maneja un script en `FaqAccordion.astro`.

---

### 5. Menú Mobile

Aparece con fade + desplazamiento vertical sutil.

#### CSS en global.css
```css
.mobile-menu {
  opacity: 0;
  transform: translateY(-8px);
  pointer-events: none;
  transition: opacity 300ms ease, transform 300ms ease;
}

.mobile-menu.is-open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu {
    transition: none;
  }
}
```

#### Reglas del menú mobile
- El botón hamburguesa gestiona `aria-expanded="true|false"`.
- Al abrir el menú se agrega `overflow-hidden` al `<body>`.
- Se cierra al hacer click en cualquier link del menú.

---

### 6. Botón — Efecto de Brillo en Hover

El botón primario tiene un destello de luz que cruza de izquierda a derecha al hacer hover.
Es un efecto CSS puro con `::before` y `@keyframes`.

#### CSS en global.css
```css
@keyframes btn-shine {
  0% {
    transform: translateX(-100%) skewX(-15deg);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: translateX(200%) skewX(-15deg);
    opacity: 0;
  }
}

.btn-primary {
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.18),
    transparent
  );
  transform: translateX(-100%) skewX(-15deg);
  opacity: 0;
}

.btn-primary:hover::before {
  animation: btn-shine 600ms ease forwards;
}

@media (prefers-reduced-motion: reduce) {
  .btn-primary::before {
    display: none;
  }
}
```

---

### 7. Link de Texto — Subrayado Animado

Para links inline dentro de párrafos o en el footer. El subrayado crece desde el centro.

#### CSS en global.css
```css
.link-animated {
  position: relative;
  display: inline-block;
  padding-bottom: 1px;
}

.link-animated::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  right: 50%;
  height: 1px;
  background-color: currentColor;
  transition: left 200ms ease, right 200ms ease;
}

.link-animated:hover::after {
  left: 0;
  right: 0;
}

@media (prefers-reduced-motion: reduce) {
  .link-animated::after {
    transition: none;
    left: 0;
    right: 0;
  }
}
```

---

### 8. Input — Borde con Transición de Color

El borde del input cambia de `gray-light` a `brand` con transición al recibir focus.
Ya está definido en las clases base pero se especifica el CSS nativo para mayor control.

#### CSS en global.css
```css
.input-base,
.textarea-base {
  border: 1px solid var(--color-gray-light);
  transition: border-color 200ms ease;
  outline: none;
}

.input-base:focus,
.textarea-base:focus {
  border-color: var(--color-brand);
}

@media (prefers-reduced-motion: reduce) {
  .input-base,
  .textarea-base {
    transition: none;
  }
}
```

---

### 9. Número de Estadística — Contador Animado

Los números de la sección de métricas cuentan desde `0` hasta su valor real cuando
entran al viewport. Es una animación funcional que da peso a las cifras.

#### CSS de soporte en global.css
```css
.stat-number {
  display: inline-block;
  font-variant-numeric: tabular-nums;
}

@media (prefers-reduced-motion: reduce) {
  /* El número se muestra directamente sin contar */
  .stat-number[data-target] {
    /* El script no ejecuta el contador y muestra el valor final */
  }
}
```

#### Script en StatsSection.astro
```astro
<script>
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const counters = document.querySelectorAll('.stat-number[data-target]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target') ?? '0', 10);
      const suffix = el.getAttribute('data-suffix') ?? '';

      if (prefersReduced) {
        el.textContent = target + suffix;
        observer.unobserve(el);
        return;
      }

      const duration = 1200;
      const step = 16;
      const increment = target / (duration / step);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
      }, step);

      observer.unobserve(el);
    });
  }, { threshold: 0.3 });

  counters.forEach((el) => observer.observe(el));
</script>
```

#### Uso en el componente de stats
```astro
<span class="stat-number" data-target="150" data-suffix="+">0+</span>
```

---

### 10. Línea Decorativa de Sección — Animación de Dibujado

Las líneas decorativas horizontales que separan el título de una sección del contenido
se "dibujan" de izquierda a derecha cuando entran al viewport.

#### CSS en global.css
```css
@keyframes draw-line {
  from {
    transform: scaleX(0);
    transform-origin: left center;
  }
  to {
    transform: scaleX(1);
    transform-origin: left center;
  }
}

.line-draw {
  display: block;
  height: 1px;
  background-color: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left center;
}

.line-draw.is-visible {
  animation: draw-line 400ms ease forwards;
}

@media (prefers-reduced-motion: reduce) {
  .line-draw {
    transform: scaleX(1);
    animation: none;
  }
}
```

#### Uso
```astro
<span class="line-draw animate-on-scroll w-12 mt-3 mb-8"></span>
```

Se coloca debajo del título de sección como separador decorativo fino.
Ancho máximo: `w-12`. Color siempre `accent`.

---

### 11. Card de Servicio — Borde de Acento Progresivo

En hover la card de servicio muestra el borde izquierdo en `brand` con un efecto
de crecimiento vertical usando `::before`.

#### CSS en global.css
```css
@keyframes border-grow {
  from { height: 0; }
  to   { height: 100%; }
}

.card-service {
  position: relative;
  overflow: hidden;
}

.card-service::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 0;
  background-color: var(--color-brand);
}

.card-service:hover::before {
  animation: border-grow 200ms ease forwards;
}

@media (prefers-reduced-motion: reduce) {
  .card-service::before {
    height: 100%;
    animation: none;
  }
}
```

---

### 12. Scroll Suave
```css
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

---

### 13. Transición entre Páginas

Usar `<ViewTransitions />` de Astro en `BaseLayout.astro`.
La transición por defecto `fade` de Astro es suficiente. No personalizar.
Duración: `300ms`. No usar slide, flip ni animaciones complejas entre páginas.

---

### 14. Skeleton de Carga — Pulse en Contenido Diferido

Si algún bloque de contenido carga de forma diferida, mostrar un skeleton
con animación de pulso mientras carga.

#### CSS en global.css
```css
@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.skeleton {
  background-color: var(--color-gray-light);
  border-radius: 2px;
  animation: skeleton-pulse 1200ms ease infinite;
}

.skeleton-text {
  height: 1em;
  width: 100%;
}

.skeleton-title {
  height: 1.5em;
  width: 60%;
}

.skeleton-image {
  aspect-ratio: 16 / 9;
  width: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
    opacity: 0.6;
  }
}
```

---

## Resumen de @keyframes Definidos

Todos los `@keyframes` van en `global.css`. Esta es la lista completa permitida.

| Nombre | Uso |
|---|---|
| `btn-shine` | Destello en botón primario al hacer hover |
| `draw-line` | Línea decorativa de sección que se dibuja |
| `border-grow` | Borde izquierdo de card de servicio que crece |
| `skeleton-pulse` | Pulso en skeleton de carga |

No se permiten otros `@keyframes` fuera de esta lista sin justificación documentada.

---

## prefers-reduced-motion — Regla de Implementación

Cada bloque CSS que use `transition`, `animation` o `@keyframes` debe tener
su contraparte en `@media (prefers-reduced-motion: reduce)`.

Patrón estándar:
```css
@media (prefers-reduced-motion: reduce) {
  .el-animado {
    transition: none;
    animation: none;
    transform: none;
    opacity: 1;
  }
}
```

Las transiciones de `color` y `border-color` con `duration-200` están exentas
porque no implican movimiento físico.

---

## Qué Nunca se Debe Animar

- El Hero — visible sin scroll al cargar.
- El Navbar — elemento de navegación permanente.
- El Footer — no es foco de atención.
- Textos de párrafo corrido — solo títulos y contenedores.
- Imágenes de forma independiente — si el contenedor se anima, la imagen va incluida.
- El logo de la empresa.
- Íconos inline dentro de párrafos.
- Formularios — solo `transition-colors` en borde de focus.
- Elementos ya visibles en pantalla al cargar sin scroll.

---

## Checklist de Validación

- [ ] La animación tiene propósito funcional claro.
- [ ] La duración no supera `600ms` salvo `skeleton-pulse`.
- [ ] No se usa `transition-all`.
- [ ] No se anima `height`, `padding`, `margin` ni `box-shadow` directa.
- [ ] No se usa `hover:scale-*` ni `hover:translate-*` en cards ni botones.
- [ ] Cada animación tiene su bloque `prefers-reduced-motion`.
- [ ] No se anima el Hero, Navbar ni Footer.
- [ ] El delay escalonado en grillas no supera `200ms`.
- [ ] El acordeón tiene solo un ítem abierto a la vez.
- [ ] El menú mobile gestiona `aria-expanded` correctamente.
- [ ] Los `@keyframes` están solo en `global.css`.
- [ ] El contador de estadísticas respeta `prefers-reduced-motion`.
- [ ] La línea decorativa usa solo color `accent` y ancho máximo `w-12`.
- [ ] El efecto `btn-shine` solo aparece en `btn-primary`, nunca en `btn-outline`.