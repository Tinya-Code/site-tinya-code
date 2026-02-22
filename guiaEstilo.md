# Guía de Estilos — Tinya Code

## Reglas Generales del Agente

- Leer esta guía completa antes de crear o modificar cualquier componente visual.
- Nunca usar valores de color, fuente o espaciado arbitrarios. Solo los tokens definidos aquí.
- Nunca usar `rounded-full` en contenedores, cards o botones. Máximo `rounded-sm`.
- Todo estilo se aplica con clases de Tailwind directamente en el template del componente.
- Si un conjunto de clases se repite en más de dos componentes, extraer en `global.css` con `@apply`.
- Diseño mobile-first. Todo componente debe ser responsivo desde su creación.
- Los íconos nunca van dentro de una card, caja o contenedor con fondo y borde propio.
- Las cards NO son el patrón por defecto. Evaluar siempre alternativas antes de usarlas.

---

## Paleta de Colores

Se usan únicamente 5 colores del sistema original. El resto queda descartado para mantener
armonía y coherencia visual.

| Token | Valor | Rol |
|---|---|---|
| `light` | `#EDF1E8` | Fondo principal del sitio |
| `dark` | `#141414` | Texto principal, fondos de contraste |
| `accent` | `#D3B9AA` | Detalles decorativos, bordes, líneas, hover suave |
| `brand` | `#8C6A5D` | Acciones: botones primarios, links activos, énfasis |
| `brand-dark` | `#5F473E` | Hover de brand |
| `gray` | `#60739F` | Texto secundario, placeholders, metadata |
| `gray-light` | `#E5E9F0` | Bordes, separadores, fondo de inputs |

Los colores `celeste`, `azule`, `gray-dark`, `primary` y `secondary` quedan
**fuera de uso** en componentes y secciones. No usarlos.

### Combinaciones permitidas

| Fondo | Texto | Elementos de acento |
|---|---|---|
| `light` | `dark` | `brand`, `accent` |
| `white` (bg-white) | `dark` | `brand`, `accent` |
| `dark` | `light` o `white` | `accent` |
| `brand` | `white` | `light` como detalle |
| `accent` | `dark` | `brand` como detalle |

### Reglas de color

- El fondo principal del sitio es siempre `light`. Las secciones alternan con `white`.
- `brand` se usa exclusivamente en acciones: botones, links activos, íconos de énfasis.
- `accent` se usa para líneas decorativas, bordes sutiles y hover de elementos no interactivos.
- `gray` solo para texto de apoyo, metadata y placeholders. Nunca para títulos.
- Nunca texto `dark` sobre fondo `dark`.
- Nunca texto `light` o `white` sobre fondo `light` o `white`.
- Nunca texto `gray` sobre fondo `accent` — el contraste es insuficiente.
- Nunca usar `brand` como fondo de sección completa excepto en el CTA final.
- `accent` nunca como fondo de sección completa.

---

## Tipografía

Se usan únicamente **dos familias**: `Poppins` y `RaderBoldItalic`.
Son complementarias: una serif expresiva de alto impacto y una sans-serif limpia y funcional.
Las demás familias quedan **descartadas** para mantener coherencia.

| Token | Familia | Rol |
|---|---|---|
| `font-poppins` | Poppins | Todo el texto funcional: cuerpo, labels, botones, nav, subtítulos |
| `font-rader` | RaderBoldItalic | Títulos de máximo impacto, uno por página o sección hero |

Las familias `font-supply`, `font-tan` y `font-satisfy` **no se usan**.

### Escala tipográfica

| Rol | Clases Tailwind | Fuente | Notas |
|---|---|---|---|
| Título hero | `text-5xl lg:text-7xl font-bold leading-tight tracking-tight` | `font-rader` | Solo uno por página |
| Título de sección | `text-3xl lg:text-4xl font-bold leading-snug` | `font-poppins` | Máximo uno por sección |
| Título de bloque | `text-xl lg:text-2xl font-semibold leading-snug` | `font-poppins` | Para subsecciones |
| Subtítulo | `text-lg font-medium` | `font-poppins` | Acompaña al título hero |
| Cuerpo principal | `text-base leading-relaxed` | `font-poppins` | Párrafos de lectura |
| Texto de apoyo | `text-sm leading-relaxed` | `font-poppins` | Color `gray` |
| Label / Chip | `text-xs font-semibold uppercase tracking-widest` | `font-poppins` | Etiquetas, badges |
| Número destacado | `text-4xl lg:text-5xl font-bold leading-none` | `font-poppins` | Métricas, estadísticas |

### Reglas tipográficas

- `font-rader` aparece una sola vez por página, en el título principal del hero.
- Todo lo demás es `font-poppins`.
- El interlineado de párrafos es siempre `leading-relaxed`.
- Los títulos usan `leading-tight` o `leading-snug` según jerarquía.
- Nunca usar `text-xs` para texto corrido. Solo para labels, chips y metadata.
- El peso mínimo de texto sobre fondos de color es `font-medium`.
- No usar `italic` salvo para citas textuales puntuales.

---

## Filosofía de Layout

### Principio principal

El diseño prioriza **espacio, tipografía y composición** sobre la acumulación de elementos
visuales. Una página bien resuelta con texto, espaciado generoso y pocos elementos de color
es mejor que una llena de cards, íconos en cajas y sombras.

### Íconos — Regla estricta

- Los íconos nunca van dentro de una card, caja, círculo o contenedor con fondo propio.
- El ícono va directamente sobre el fondo de sección, alineado con el texto que acompaña.
- No usar ícono + card + título + descripción como patrón de lista. Es el antipatrón principal.
- Si el contenido necesita un ícono, el ícono acompaña al texto en línea o encima del título,
  sin ningún contenedor visual.

### Cuándo NO usar cards

| Contenido | Patrón correcto | Patrón prohibido |
|---|---|---|
| Beneficios o razones | Lista vertical: ícono inline + título + texto | Card por beneficio |
| Proceso o fases | Steps numerados con línea conectora | Cards en grilla |
| Estadísticas o métricas | Números grandes en fila | Card por métrica |
| Testimonios | Bloque de cita con línea izquierda `accent` | Card con sombra |
| FAQ | Acordeón con borde inferior | Cards individuales |
| Sectores atendidos | Chips en fila horizontal | Grid de cards |
| Íconos de tecnologías | Lista horizontal de logos/íconos simples | Cards con ícono centrado |

### Cuándo sí usar cards

- **Servicios principales**: contenido comparable con título y descripción breve.
- **Proyectos del portfolio**: imagen + título + categoría.
- **Planes de precios**: comparativa de características con precio.
- **Artículos del blog**: imagen + título + fecha.

---

## Espaciado y Layout

### Contenedor principal
```
max-w-6xl mx-auto px-4 md:px-8
```

### Espaciado entre secciones

- Separación vertical entre secciones: `py-16 md:py-24`
- Entre título de sección y su contenido: `mt-8 md:mt-12`
- Entre párrafos: `space-y-4`
- Entre ítems de lista: `space-y-6` o `space-y-8`

### Grillas según contexto

| Contexto | Clases |
|---|---|
| Servicios | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` |
| Portfolio | `grid grid-cols-1 sm:grid-cols-2 gap-6` |
| Blog | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` |
| Precios | `grid grid-cols-1 md:grid-cols-3 gap-6` |
| Estadísticas | `grid grid-cols-2 md:grid-cols-4 gap-8` |
| Sectores | `flex flex-wrap gap-3` |
| Beneficios / Razones | `flex flex-col gap-8` |
| Proceso / Fases | `flex flex-col gap-0` |

---

## Secciones — Estilos Específicos

### Hero

- Fondo: `bg-light`
- Layout: `flex flex-col lg:flex-row items-center gap-12 min-h-[80vh]`
- Título: `font-rader text-5xl lg:text-7xl font-bold leading-tight text-dark`
- Subtítulo: `font-poppins text-lg font-medium text-gray mt-4 max-w-lg`
- Botones: `flex flex-col sm:flex-row gap-4 mt-10`
- Imagen: ocupa el 50% en desktop, usa `/generico.jpeg`
- Sin card, sin sombra, sin borde en ningún elemento del Hero.

### Beneficios o Razones

- Fondo: `bg-white`
- Patrón: lista vertical, sin cards.
- Cada ítem: `flex items-start gap-4`
- Ícono: `size-6 text-brand mt-0.5 shrink-0` — directo, sin contenedor
- Título del ítem: `font-poppins font-semibold text-base text-dark`
- Descripción: `font-poppins text-sm text-gray leading-relaxed mt-1`

### Estadísticas o Métricas

- Fondo: `bg-dark`
- Patrón: fila de números grandes, sin cards, con `divide-x divide-accent/30`
- Layout: `grid grid-cols-2 md:grid-cols-4 divide-x divide-accent/30`
- Número: `font-poppins text-4xl lg:text-5xl font-bold text-accent`
- Label: `font-poppins text-sm text-light/60 mt-2`
- Cada celda: `flex flex-col items-center text-center px-8 py-10`

### Metodología / Proceso

- Fondo: `bg-light`
- Patrón: steps numerados con línea vertical conectora.
- Layout general: `flex flex-col`
- Cada step: `flex gap-6 relative`
- Número: `font-poppins text-xs font-bold text-brand border border-brand rounded-sm px-2 py-1 shrink-0 h-fit mt-1`
- Línea conectora: `absolute left-[11px] top-8 bottom-0 border-l border-gray-light`
- Título: `font-poppins font-semibold text-base text-dark`
- Descripción: `font-poppins text-sm text-gray leading-relaxed mt-1`

### Testimonios

- Fondo: `bg-white`
- Patrón: bloque de cita con línea izquierda, sin cards con sombra.
- Layout del bloque: `border-l-2 border-accent pl-6 flex flex-col gap-4`
- Cita: `font-poppins text-base italic text-dark leading-relaxed`
- Autor: `flex items-center gap-3`
- Avatar: `size-10 rounded-full object-cover`
- Nombre: `font-poppins font-semibold text-sm text-dark`
- Cargo: `font-poppins text-xs text-gray`

### FAQ

- Fondo: `bg-light`
- Patrón: acordeón, sin cards.
- Cada ítem: `border-b border-gray-light`
- Pregunta: `flex justify-between items-center py-5 cursor-pointer font-poppins font-semibold text-base text-dark`
- Ícono toggle: `size-4 text-gray transition-transform duration-200 shrink-0`
- Respuesta: `font-poppins text-sm text-gray leading-relaxed pb-5`

### Sectores

- Fondo: `bg-white`
- Patrón: chips en fila con wrap, sin cards.
- Chip: `flex items-center gap-2 border border-gray-light rounded-sm px-4 py-2 bg-white hover:border-brand hover:text-brand transition-colors duration-200 cursor-pointer`
- Texto: `font-poppins text-sm font-medium text-dark`
- Ícono del chip: `size-4` sin contenedor

### Servicios — Cards

- Fondo de sección: `bg-light`
- Card: `bg-white border border-gray-light rounded-sm p-6 hover:border-accent transition-colors duration-200`
- Sin sombra. El hover cambia el borde a `accent`, no agrega sombra.
- Ícono: `size-7 text-brand mb-5` — sin caja, sin fondo, directo sobre la card
- Título: `font-poppins font-semibold text-base text-dark`
- Descripción: `font-poppins text-sm text-gray leading-relaxed mt-2`
- Link: `inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark mt-4 transition-colors duration-200`

### Portfolio

- Fondo de sección: `bg-white`
- Card: sin borde ni sombra. Solo imagen + texto debajo.
- Imagen: `aspect-video object-cover w-full rounded-sm`
- Título: `font-poppins font-semibold text-base text-dark mt-3`
- Categoría: `font-poppins text-xs text-gray uppercase tracking-widest mt-1`

### CTA Final

- Fondo: `bg-brand`
- Layout: `flex flex-col items-center text-center gap-6 py-20 md:py-28`
- Título: `font-poppins text-3xl lg:text-4xl font-bold text-white`
- Subtítulo: `font-poppins text-base text-white/80 max-w-xl`
- Botón: `btn-outline-white`
- Sin imagen, sin card, sin ícono decorativo.

---

## Botones

### Primario — `Button.astro`
```
bg-brand text-white font-poppins font-semibold text-sm uppercase tracking-widest
px-6 py-3 rounded-sm hover:bg-brand-dark transition-colors duration-200
```

Usar sobre fondos `light` o `white`.

### Outline oscuro — `ButtonOutline.astro`
```
bg-transparent text-dark border border-dark font-poppins font-semibold text-sm
uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-dark hover:text-white
transition-colors duration-200
```

Usar solo sobre fondos `light` o `white`.

### Outline blanco
```
bg-transparent text-white border border-white font-poppins font-semibold text-sm
uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-white hover:text-dark
transition-colors duration-200
```

Usar solo sobre fondos `dark` o `brand`.

### Reglas de botones

- Máximo dos botones por bloque. Si hay dos: uno primario y uno outline.
- Nunca botón `bg-brand` sobre fondo `bg-brand`.
- Nunca outline oscuro sobre fondo `dark`.
- No usar botones con ícono centrado sin texto.

---

## Formularios

- El formulario de contacto va directamente sobre el fondo de sección, sin card contenedora.
- Separación entre campos: `space-y-5`
- Input: `w-full bg-white border border-gray-light rounded-sm px-4 py-3 font-poppins text-sm text-dark placeholder:text-gray focus:outline-none focus:border-brand transition-colors duration-200`
- Textarea: igual que input más `resize-none min-h-32`
- Label: `block font-poppins text-sm font-medium text-dark mb-1`
- Error: `font-poppins text-xs text-red-500 mt-1`
- El botón de envío usa `btn-primary` a ancho completo en mobile: `w-full sm:w-auto`

---

## Íconos

- Usar exclusivamente `<Icon />` de `astro-icon` con Iconify.
- `size-4` — inline dentro de texto, chips, links.
- `size-5` — navegación, botones con ícono.
- `size-6` — listas de beneficios, items de proceso.
- `size-7` — cards de servicios.
- El color del ícono se hereda del texto del contenedor. Nunca declarar color inline.
- **Nunca encerrar un ícono en una caja, círculo o contenedor con fondo propio.**
- No usar íconos puramente decorativos sin relación directa con el contenido.

---

## Imágenes

- Usar siempre `<Image />` de `@astrojs/image`.
- Placeholder en desarrollo: `/generico.jpeg`.
- Siempre declarar `alt` descriptivo.
- Portfolio y blog: `aspect-video object-cover w-full rounded-sm`
- Avatares: `size-10 rounded-full object-cover`
- Imágenes decorativas: `alt=""` y `aria-hidden="true"`

---

## Navegación

- Fondo: `bg-white border-b border-gray-light sticky top-0 z-50`
- Links: `font-poppins text-sm font-medium text-dark hover:text-brand transition-colors duration-200`
- Link activo: `text-brand`
- Logo: `h-8` alineado a la izquierda
- Mobile: menú oculto, hamburguesa con `aria-label="Abrir menú"`
- Sin fondo de color, sin gradiente, sin sombra en el Navbar.

---

## Footer

- Fondo: `bg-dark`
- Texto base: `text-light`
- Links: `font-poppins text-sm text-accent hover:text-light transition-colors duration-200`
- Título de columna: `font-poppins text-xs font-semibold text-light/50 uppercase tracking-widest mb-4`
- Separador: `border-t border-accent/20`
- Copyright: `font-poppins text-xs text-gray`
- Layout: `grid grid-cols-1 md:grid-cols-4 gap-8 py-16`

---

## Alternancia de Fondos por Sección

| Sección | Fondo | Texto base |
|---|---|---|
| Hero | `bg-light` | `dark` |
| Beneficios | `bg-white` | `dark` |
| Servicios | `bg-light` | `dark` |
| Por qué elegirnos | `bg-white` | `dark` |
| Estadísticas | `bg-dark` | `light` |
| Metodología | `bg-light` | `dark` |
| Testimonios | `bg-white` | `dark` |
| Sectores | `bg-light` | `dark` |
| Precios | `bg-white` | `dark` |
| FAQ | `bg-light` | `dark` |
| CTA Final | `bg-brand` | `white` |
| Footer | `bg-dark` | `light` |

Nunca dos secciones consecutivas con el mismo fondo.

---

## Accesibilidad

- Contraste mínimo texto/fondo: 4.5:1 para texto normal, 3:1 para texto grande.
- Todo interactivo debe tener `focus:ring-2 focus:ring-brand focus:outline-none`.
- Imágenes decorativas: `alt=""` y `aria-hidden="true"`.
- Botones de solo ícono: `aria-label` obligatorio.
- El orden del DOM coincide con el orden visual.
- Los inputs siempre tienen `<label>` asociado con `for` e `id`.
- El color nunca es el único medio para transmitir información.

---

## Prohibiciones Absolutas

- No usar colores fuera de la paleta definida: `celeste`, `azule`, `gray-dark`, `primary`, `secondary` están descartados.
- No usar familias tipográficas fuera de `font-poppins` y `font-rader`.
- No usar colores arbitrarios con sintaxis `[#abc]`.
- No hardcodear textos en componentes.
- No usar `rounded-full` salvo en avatares.
- No usar `shadow-xl` ni `shadow-2xl`.
- No usar animaciones complejas. Solo `transition-colors` y `transition-shadow`.
- No crear CSS por componente.
- No usar `!important`.
- No colocar texto claro sobre fondo claro ni oscuro sobre oscuro.
- No usar dos secciones consecutivas con el mismo fondo.
- No encerrar íconos en cajas, círculos o contenedores con fondo propio.
- No usar el patrón ícono-en-card como layout por defecto de listas.
- No usar `font-rader` más de una vez por página.