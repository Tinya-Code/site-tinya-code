# Reglas de Lógica, SOLID, Interactividad y SEO — Tinya Code

## Propósito

Este documento define las reglas que un agente debe seguir para auditar,
refactorizar y mejorar la lógica de los componentes Astro del proyecto.
Cubre arquitectura de componentes, principios SOLID aplicados a Astro,
interactividad funcional, SEO técnico y buenas prácticas generales.

---

## Reglas Globales del Agente

- Leer este documento completo antes de tocar cualquier archivo de lógica.
- Leer `guiaEstilo.md` y `reglasUso.md` antes de modificar cualquier componente.
- No modificar estilos visuales en esta fase. Solo lógica, estructura y SEO.
- No agregar dependencias externas sin justificación documentada.
- Cada componente modificado se valida con `astro dev` antes de continuar.
- Ningún componente rompe el build. Si algo falla, se revierte y se corrige.
- Todo script de cliente usa TypeScript con tipos explícitos.
- No usar `any` en TypeScript. Si el tipo no se conoce, se define la interfaz.
- Los errores de TypeScript en `astro check` deben ser cero al finalizar.

---

## 1. Arquitectura de Componentes — Principios SOLID en Astro

---

### 1.1 Principio de Responsabilidad Única (SRP)

Cada componente tiene una sola razón para existir y una sola razón para cambiar.

**Reglas**

- Un componente que hace fetch de datos, aplica lógica de filtrado Y renderiza
  HTML viola SRP. Debe dividirse.
- El componente Smart hace solo una cosa: obtener y preparar datos.
  El componente Dumb hace solo una cosa: renderizar lo que recibe.
- Si un componente Astro tiene más de 60 líneas en el frontmatter (`---`),
  evaluar si tiene demasiadas responsabilidades.
- Los scripts de cliente (`<script>`) en un componente deben tener una sola
  responsabilidad. Si el script hace más de una cosa, extraer funciones.

**Checklist SRP**
- [ ] El frontmatter del componente no mezcla fetch, transformación y lógica de UI.
- [ ] El script de cliente no combina lógica de DOM, fetch y estado.
- [ ] Cada función dentro de un script tiene una sola responsabilidad.

---

### 1.2 Principio de Separación Smart / Dumb

Esta es la implementación concreta de SRP en el proyecto.

**Componente Smart — reglas**
- Vive en `src/components/smart/`.
- Es el único que importa desde `src/data/`.
- Es el único que usa `Astro.glob`, `getCollection` o `getEntry`.
- Prepara y transforma los datos antes de pasarlos.
- No contiene clases de Tailwind de presentación visual compleja.
- No contiene lógica de interactividad de cliente.
- Pasa datos a los componentes Dumb mediante props tipadas.
```astro
---
// ✅ CORRECTO — Smart component
import { services } from '@/data/services';
import ServiceCard from '@/components/ui/cards/ServiceCard.astro';

const webServices = services.filter(s => s.category === 'web');
---
<div class="grid-services">
  {webServices.map((service, i) => (
    <ServiceCard {...service} index={i} />
  ))}
</div>
```

**Componente Dumb — reglas**
- Vive en `src/components/ui/`.
- Solo recibe props. No importa desde `src/data/`.
- No usa `getCollection` ni `Astro.glob`.
- No contiene lógica de negocio.
- Define su interfaz de props con TypeScript explícito.
- Todo prop opcional tiene valor por defecto.
```astro
---
// ✅ CORRECTO — Dumb component
interface Props {
  title: string;
  description: string;
  icon: string;
  href: string;
  category: 'web' | 'software' | 'automatizacion';
  index?: number;
}

const {
  title,
  description,
  icon,
  href,
  category,
  index = 0
} = Astro.props;
---
```

**Checklist Smart/Dumb**
- [ ] Ningún componente en `ui/` importa desde `src/data/`.
- [ ] Ningún componente en `smart/` tiene lógica de presentación compleja.
- [ ] Todos los componentes Dumb tienen interfaz `Props` tipada.
- [ ] Todos los props opcionales tienen valores por defecto.

---

### 1.3 Principio Abierto/Cerrado (OCP)

Los componentes están abiertos para extensión y cerrados para modificación.

**Reglas**
- Usar props para controlar variantes en vez de duplicar componentes.
- Si un componente necesita un nuevo comportamiento, agregar un prop nuevo.
  No modificar la lógica interna existente.
- Las variantes de un componente se controlan con un prop `variant` tipado
  como union type.
```astro
---
// ✅ CORRECTO
interface Props {
  variant?: 'primary' | 'outline' | 'outline-white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit';
}
---
```

**Checklist OCP**
- [ ] No hay componentes duplicados que solo difieren en un detalle visual.
- [ ] Las variantes se controlan con props, no con componentes separados.
- [ ] Agregar una variante nueva no requiere modificar la lógica existente.

---

### 1.4 Principio de Sustitución de Liskov (LSP)

Los componentes que comparten una interfaz son intercambiables.

**Reglas**
- Las cards del mismo tipo (ServiceCard, BlogCard, ProjectCard) tienen props
  consistentes para los campos comunes: `title`, `description`, `href`, `image`.
- Si un componente Smart puede usar ServiceCard o BlogCard indistintamente
  en ciertos contextos, ambas deben tener los mismos props base.
- Definir interfaces base compartidas en `src/types/` cuando dos o más
  componentes comparten estructura.

**Archivo a crear: `src/types/index.ts`**
```typescript
export interface CardBase {
  title: string;
  description: string;
  href: string;
  image?: string;
}

export interface WithCategory {
  category: string;
}

export interface WithDate {
  date: Date;
}

export interface WithIcon {
  icon: string;
}
```

**Checklist LSP**
- [ ] Las cards del mismo tipo tienen props base consistentes.
- [ ] Las interfaces compartidas están en `src/types/index.ts`.
- [ ] Un componente Smart puede recibir cualquier variante de card sin cambios.

---

### 1.5 Principio de Segregación de Interfaces (ISP)

Los componentes no dependen de props que no usan.

**Reglas**
- No pasar un objeto completo a un componente Dumb cuando solo necesita
  dos o tres campos. Desestructurar y pasar solo lo necesario.
- Si un componente recibe un prop que nunca usa en su template, ese prop
  debe eliminarse de la interfaz.
```astro
---
// ❌ INCORRECTO — pasa el objeto completo
const { service } = Astro.props;
// El componente solo usa service.title y service.icon
---

---
// ✅ CORRECTO — pasa solo lo necesario
const { title, icon } = Astro.props;
---
```

**Checklist ISP**
- [ ] Ningún componente recibe props que no usa.
- [ ] No se pasan objetos completos cuando solo se necesitan campos específicos.

---

### 1.6 Principio de Inversión de Dependencias (DIP)

Los componentes de alto nivel no dependen de implementaciones concretas.

**Reglas**
- Los Smart components no deben depender de la implementación interna
  de los Dumb components. Solo de su interfaz (props).
- Si un Smart component necesita cambiar el Dumb component que usa,
  debe poder hacerlo sin modificar su propia lógica.
- Usar slots en lugar de props cuando el contenido es variable y complejo.
```astro
---
// ✅ CORRECTO — usa slot para contenido variable
---
<section class="section-base section-light">
  <div class="container-main">
    <slot name="header" />
    <slot />
    <slot name="footer" />
  </div>
</section>
```

**Checklist DIP**
- [ ] Los Smart components usan slots cuando el contenido interno varía.
- [ ] Cambiar el Dumb component en un Smart no requiere modificar la lógica del Smart.

---

## 2. Reglas de Frontmatter Astro

El frontmatter es la zona entre los `---`. Es código que corre en el servidor
en tiempo de build. Tiene reglas estrictas.

---

### 2.1 Estructura del Frontmatter

El frontmatter de cada componente sigue este orden estricto:
```astro
---
// 1. Imports de Astro y utilidades
import { getCollection } from 'astro:content';
import { Image } from 'astro:assets';

// 2. Imports de componentes
import SectionHeader from '@/components/ui/sections/SectionHeader.astro';
import ServiceCard from '@/components/ui/cards/ServiceCard.astro';

// 3. Imports de datos
import { services } from '@/data/services';

// 4. Imports de tipos
import type { CardBase } from '@/types';

// 5. Definición de Props (solo en componentes Dumb)
interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
}

// 6. Desestructuración de props
const { title, variant = 'primary' } = Astro.props;

// 7. Lógica de datos (solo en componentes Smart)
const filteredServices = services.filter(s => s.category === 'web');

// 8. Variables derivadas
const hasServices = filteredServices.length > 0;
---
```

**Reglas**
- El orden de los bloques es siempre el mismo en todos los componentes.
- No mezclar imports de componentes con imports de datos en el mismo bloque.
- Las variables derivadas van siempre al final del frontmatter.
- No usar lógica asíncrona compleja en el frontmatter de componentes Dumb.

---

### 2.2 Manejo de Content Collections
```astro
---
// ✅ CORRECTO — uso de getCollection
import { getCollection, type CollectionEntry } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => {
  return data.draft !== true;
});

const sortedPosts = posts.sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);

type Post = CollectionEntry<'blog'>;
---
```

**Reglas**
- Usar siempre el tipo `CollectionEntry<'nombre'>` para tipar entradas.
- Filtrar entradas en el `getCollection` directamente, no después.
- Ordenar siempre los posts por fecha descendente salvo excepción justificada.
- Los drafts (`draft: true`) nunca aparecen en producción. Filtrarlos siempre.
- No hacer `getCollection` en componentes Dumb. Solo en Smart o en páginas.

---

### 2.3 Rutas Dinámicas
```astro
---
// ✅ CORRECTO — getStaticPaths con tipos
import { getCollection, type CollectionEntry } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
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
---
```

**Reglas**
- `getStaticPaths` siempre devuelve `params` y `props` correctamente tipados.
- El `slug` viene del sistema de Content Collections, no se construye manualmente.
- En rutas dinámicas, el componente recibe la entrada como prop, no la busca.
- No usar `Astro.params` para buscar datos. Usar `Astro.props` que vienen
  de `getStaticPaths`.

---

## 3. Reglas de Scripts de Cliente

Los scripts de cliente son los bloques `<script>` dentro de los componentes.
Son TypeScript que corre en el navegador.

---

### 3.1 Estructura de un Script de Cliente
```astro
<script>
  // 1. Imports (si se necesitan)
  import { initScrollAnimations } from '@/scripts/observer';

  // 2. Selección de elementos del DOM con tipos explícitos
  const trigger = document.querySelector<HTMLButtonElement>('.faq-trigger');
  const content = document.querySelector<HTMLDivElement>('.faq-content');

  // 3. Guard — verificar que los elementos existen
  if (!trigger || !content) return;

  // 4. Lógica de interactividad
  function toggleFaq(): void {
    const isOpen = content.classList.contains('is-open');
    content.classList.toggle('is-open', !isOpen);
    trigger.setAttribute('aria-expanded', String(!isOpen));
  }

  // 5. Registro de event listeners
  trigger.addEventListener('click', toggleFaq);

  // 6. Cleanup (si aplica — para componentes con ciclo de vida)
  document.addEventListener('astro:before-swap', () => {
    trigger.removeEventListener('click', toggleFaq);
  });
</script>
```

**Reglas**
- Todo `querySelector` usa el tipo genérico: `querySelector<HTMLButtonElement>`.
- Siempre verificar que el elemento existe antes de usarlo (guard clause).
- Las funciones de lógica se nombran con verbos descriptivos.
- No usar `innerHTML` para insertar contenido. Usar `textContent` o
  manipulación del DOM con métodos seguros.
- No usar `eval()` bajo ninguna circunstancia.
- Los event listeners que se agregan en el script se limpian en
  `astro:before-swap` cuando se usan View Transitions.

---

### 3.2 Comunicación entre Scripts

Cuando dos componentes necesitan comunicarse, usar eventos del DOM.
```typescript
// Emitir evento desde un componente
const event = new CustomEvent('tinya:filter-change', {
  detail: { category: 'web' },
  bubbles: true,
});
document.dispatchEvent(event);

// Escuchar evento en otro componente
document.addEventListener('tinya:filter-change', (e: Event) => {
  const { category } = (e as CustomEvent<{ category: string }>).detail;
  // reaccionar al cambio
});
```

**Reglas**
- Los eventos personalizados tienen el prefijo `tinya:` para evitar colisiones.
- El `detail` del evento siempre está tipado con una interfaz.
- No usar variables globales (`window.algo`) para comunicar componentes.
- No usar `localStorage` para estado de UI que vive en la sesión actual.

---

### 3.3 Debounce

Toda función que reacciona a eventos de alta frecuencia (`scroll`, `input`,
`resize`) usa debounce.
```typescript
function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Uso
const handleSearch = debounce((query: string) => {
  filterFaqItems(query);
}, 300);

searchInput.addEventListener('input', (e) => {
  handleSearch((e.target as HTMLInputElement).value);
});
```

**Reglas**
- Delay de debounce para búsqueda: `300ms`.
- Delay de debounce para resize: `150ms`.
- Delay de debounce para scroll complejo: `100ms`.
- El scroll de la barra de progreso NO usa debounce porque necesita ser fluido.
- La función `debounce` se define en `src/scripts/observer.ts` y se importa
  donde se necesite. No duplicarla.

---

### 3.4 IntersectionObserver
```typescript
// ✅ CORRECTO — observer tipado y con cleanup
function initScrollAnimations(): void {
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const targets = document.querySelectorAll<HTMLElement>(
    '.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right'
  );

  if (prefersReduced) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

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

  targets.forEach(el => observer.observe(el));
}

export { initScrollAnimations };
```

**Reglas**
- El observer siempre hace `unobserve` después de que el elemento entra.
  No seguir observando elementos ya visibles.
- El threshold es `0.1` para animaciones de entrada generales.
- El threshold es `0.3` para el contador de estadísticas.
- Verificar `prefers-reduced-motion` antes de instanciar el observer.
- El observer se exporta desde `src/scripts/observer.ts` y se importa,
  no se redefine en cada componente.

---

## 4. Reglas de Interactividad Funcional

Esta sección define qué debe ser funcional en cada componente interactivo
y cómo verificarlo.

---

### 4.1 Acordeón FAQ

**Comportamiento esperado**
- Click en pregunta: abre la respuesta con transición suave.
- Click en pregunta abierta: la cierra.
- Click en otra pregunta: cierra la abierta y abre la nueva.
- `Escape` cuando el foco está en una pregunta: cierra el acordeón activo.
- `aria-expanded` cambia entre `"true"` y `"false"`.
- El ícono chevron rota `180deg` al abrir.

**Script requerido en FaqAccordion.astro**
```typescript
const triggers = document.querySelectorAll<HTMLButtonElement>('.faq-trigger');

function closeAll(): void {
  triggers.forEach(t => {
    const content = t.nextElementSibling as HTMLElement | null;
    const icon = t.querySelector<HTMLElement>('.faq-icon');
    t.setAttribute('aria-expanded', 'false');
    content?.classList.remove('is-open');
    icon?.classList.remove('is-open');
  });
}

triggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    closeAll();
    if (!isOpen) {
      const content = trigger.nextElementSibling as HTMLElement | null;
      const icon = trigger.querySelector<HTMLElement>('.faq-icon');
      trigger.setAttribute('aria-expanded', 'true');
      content?.classList.add('is-open');
      icon?.classList.add('is-open');
    }
  });

  trigger.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeAll();
  });
});
```

**Checklist FAQ**
- [ ] Solo un ítem abierto a la vez.
- [ ] `aria-expanded` cambia correctamente.
- [ ] El ícono rota en hover.
- [ ] `Escape` cierra el ítem activo.
- [ ] El buscador filtra con debounce.
- [ ] Los tabs filtran por categoría y cierran el ítem abierto.

---

### 4.2 Menú Mobile

**Comportamiento esperado**
- Click en hamburguesa: abre el menú con transición.
- Click en cualquier link del menú: cierra el menú.
- Click fuera del menú: cierra el menú.
- `Escape`: cierra el menú.
- `aria-expanded` en el botón cambia correctamente.
- `aria-label` del botón cambia entre "Abrir menú" y "Cerrar menú".
- El body tiene `overflow-hidden` mientras el menú está abierto.
- El foco queda atrapado dentro del menú mientras está abierto (focus trap).

**Focus trap requerido**
```typescript
function trapFocus(container: HTMLElement): () => void {
  const focusable = container.querySelectorAll<HTMLElement>(
    'a, button, input, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  container.addEventListener('keydown', handleKeydown);
  return () => container.removeEventListener('keydown', handleKeydown);
}
```

**Checklist Menú Mobile**
- [ ] Focus trap activo mientras el menú está abierto.
- [ ] `Escape` cierra el menú.
- [ ] `aria-expanded` y `aria-label` cambian correctamente.
- [ ] Click fuera cierra el menú.
- [ ] El body tiene `overflow-hidden` mientras está abierto.
- [ ] Al cerrar, el foco regresa al botón hamburguesa.

---

### 4.3 Modales (Portfolio y Blog)

**Comportamiento esperado**
- Click en trigger: abre el modal con transición.
- Click en overlay: cierra el modal.
- Click en botón X: cierra el modal.
- `Escape`: cierra el modal.
- Al abrir: foco va al botón X.
- Al cerrar: foco regresa al trigger que lo abrió.
- El body tiene `overflow-hidden` mientras el modal está abierto.
- Focus trap activo dentro del modal.
- `aria-modal="true"` y `role="dialog"` en el contenedor.
- El modal tiene `aria-labelledby` apuntando al ID del título dentro del modal.

**Script base de modal**
```typescript
function initModal(
  triggerSelector: string,
  overlaySelector: string,
  closeSelector: string
): void {
  const triggers = document.querySelectorAll<HTMLElement>(triggerSelector);
  const overlay = document.querySelector<HTMLElement>(overlaySelector);
  const closeBtn = document.querySelector<HTMLButtonElement>(closeSelector);

  if (!overlay || !closeBtn) return;

  let lastTrigger: HTMLElement | null = null;
  let removeTrap: (() => void) | null = null;

  function openModal(trigger: HTMLElement): void {
    lastTrigger = trigger;
    overlay!.classList.add('is-open');
    document.body.classList.add('overflow-hidden');
    closeBtn!.focus();
    removeTrap = trapFocus(overlay!);
  }

  function closeModal(): void {
    overlay!.classList.remove('is-open');
    document.body.classList.remove('overflow-hidden');
    removeTrap?.();
    lastTrigger?.focus();
    lastTrigger = null;
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => openModal(trigger));
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e: MouseEvent) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && overlay!.classList.contains('is-open')) {
      closeModal();
    }
  });
}
```

**Checklist Modal**
- [ ] Focus trap activo dentro del modal.
- [ ] `Escape` cierra el modal.
- [ ] Click en overlay cierra el modal.
- [ ] Al cerrar el foco regresa al trigger.
- [ ] `aria-modal`, `role`, `aria-labelledby` presentes.
- [ ] Body tiene `overflow-hidden` mientras está abierto.

---

### 4.4 Slider de Testimonios

**Comportamiento esperado**
- Click en flecha siguiente: avanza al siguiente slide.
- Click en flecha anterior: retrocede al slide anterior.
- Scroll táctil en mobile: funciona con `scroll-snap`.
- Los puntos de paginación reflejan el slide activo.
- Las flechas se deshabilitan (`disabled`) en el primer y último slide.
- `aria-live="polite"` en el contenedor activo.

**Checklist Slider**
- [ ] Las flechas tienen `aria-label` descriptivo.
- [ ] Los puntos de paginación tienen `aria-label` con el número de slide.
- [ ] El slide activo tiene `aria-current="true"`.
- [ ] Las flechas se deshabilitan correctamente en los extremos.
- [ ] El scroll táctil funciona en mobile.
- [ ] No hay autoplay.

---

### 4.5 Filtrado de Grillas (Servicios, Portfolio, Blog)

**Comportamiento esperado**
- Click en tab: filtra los ítems mostrando solo la categoría seleccionada.
- Tab "Todos": muestra todos los ítems.
- El tab activo tiene el estilo `text-brand border-b-2 border-brand`.
- Los ítems ocultos tienen `hidden-by-filter` y son inaccesibles con Tab.
- El cambio de tab no recarga la página.
- El tab activo tiene `aria-selected="true"`. Los demás `aria-selected="false"`.
- El contenedor de tabs tiene `role="tablist"`.
- Cada tab tiene `role="tab"`.

**Script base de filtrado**
```typescript
function initFilter(
  tabSelector: string,
  itemSelector: string,
  filterAttr: string
): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>(tabSelector);
  const items = document.querySelectorAll<HTMLElement>(itemSelector);

  function filter(category: string): void {
    tabs.forEach(tab => {
      const isActive = tab.dataset.category === category;
      tab.classList.toggle('text-brand', isActive);
      tab.classList.toggle('border-b-2', isActive);
      tab.classList.toggle('border-brand', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    items.forEach(item => {
      const match = category === 'all' || item.dataset[filterAttr] === category;
      item.classList.toggle('hidden-by-filter', !match);
      item.setAttribute('tabindex', match ? '0' : '-1');
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filter(tab.dataset.category ?? 'all');
    });
  });

  // Activar el tab inicial
  const firstTab = tabs[0];
  if (firstTab) filter(firstTab.dataset.category ?? 'all');
}
```

**Checklist Filtrado**
- [ ] El tab activo tiene `aria-selected="true"`.
- [ ] Los ítems ocultos tienen `tabindex="-1"`.
- [ ] El contenedor tiene `role="tablist"`.
- [ ] El tab "Todos" funciona correctamente.
- [ ] Los ítems ocultos no son focusables con Tab.

---

### 4.6 Toggle de Precios

**Comportamiento esperado**
- Click en toggle: cambia todos los precios de mensual a anual y viceversa.
- Los planes sin precio anual no cambian.
- El badge de ahorro aparece solo en modo anual.
- El toggle tiene `role="switch"` y `aria-checked`.
- El cambio de precio no tiene animación. Es instantáneo.

**Checklist Toggle**
- [ ] `role="switch"` y `aria-checked` presentes.
- [ ] Los precios cambian correctamente en ambas direcciones.
- [ ] Los planes sin precio anual no cambian.
- [ ] El badge de ahorro es visible solo en modo anual.

---

### 4.7 Navbar Dropdown

**Comportamiento esperado**
- Hover en el link padre en desktop: abre el dropdown.
- Salir del hover: cierra el dropdown.
- `Escape` cuando el foco está dentro del dropdown: cierra y devuelve
  el foco al link padre.
- En mobile: el dropdown no existe. Los links van en lista directa.
- El link padre tiene `aria-haspopup="true"` y `aria-expanded`.
- El dropdown tiene `role="menu"`. Cada link tiene `role="menuitem"`.

**Checklist Dropdown**
- [ ] Se abre en hover en desktop.
- [ ] Se cierra con `Escape`.
- [ ] `aria-haspopup` y `aria-expanded` presentes en el padre.
- [ ] No existe en mobile.
- [ ] Click fuera cierra el dropdown.

---

## 5. Reglas de SEO Técnico

---

### 5.1 Meta Tags Obligatorios

Cada página del sitio tiene los siguientes meta tags. Se gestionan desde
el componente `SEO.astro` que recibe props desde cada página.
```astro
---
// En cada página
import PageLayout from '@/layouts/PageLayout.astro';
import { siteConfig } from '@/data/siteConfig';

const seoProps = {
  title: 'Título de la página — Tinya Code',
  description: 'Descripción única de la página. Entre 120 y 160 caracteres.',
  canonical: new URL(Astro.url.pathname, siteConfig.url).toString(),
  openGraph: {
    type: 'website',
    image: '/og-default.jpg',
    imageAlt: 'Descripción de la imagen',
  },
};
---
<PageLayout {...seoProps}>
```

**Meta tags requeridos por página**

| Meta tag | Regla |
|---|---|
| `title` | Único por página. Formato: "Título — Tinya Code". Máximo 60 chars. |
| `description` | Único por página. Entre 120 y 160 caracteres. |
| `canonical` | URL absoluta de la página. Sin trailing slash. |
| `og:title` | Igual al `title` de la página. |
| `og:description` | Igual al `description`. |
| `og:image` | Imagen de 1200x630px. Ruta absoluta. |
| `og:image:alt` | Texto descriptivo de la imagen OG. |
| `og:type` | `website` para páginas, `article` para posts de blog. |
| `og:url` | URL canónica de la página. |
| `twitter:card` | `summary_large_image`. |
| `twitter:title` | Igual al `title`. |
| `twitter:description` | Igual al `description`. |
| `twitter:image` | Igual al `og:image`. |

**Reglas de title**
- El título sigue el formato: `"[Nombre de página] — Tinya Code"`.
- La Home es la excepción: `"Tinya Code — Diseño Web y Software para Empresas"`.
- Máximo 60 caracteres incluyendo el separador y el nombre de marca.
- No usar el mismo título en dos páginas.

**Reglas de description**
- Entre 120 y 160 caracteres.
- Describe el contenido de la página específica, no la empresa en general.
- Incluye al menos una palabra clave relevante para la página.
- No usar la misma description en dos páginas.
- No usar puntos suspensivos `...` al final.

---

### 5.2 Estructura de Headings

Cada página tiene una jerarquía de headings correcta y única.

**Reglas**
- Exactamente un `<h1>` por página. Es el título principal del Hero o de la página.
- Los `<h2>` son los títulos de cada sección de la página.
- Los `<h3>` son subsecciones dentro de un `<h2>`.
- No saltar niveles: no pasar de `<h2>` a `<h4>` directamente.
- El `<h1>` contiene la keyword principal de la página.
- `SectionHeader.astro` usa `<h2>` por defecto. Tiene prop `as` para cambiarlo.
```astro
---
interface Props {
  title: string;
  subtitle?: string;
  as?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
}

const { title, subtitle, as: Tag = 'h2', align = 'left' } = Astro.props;
---
<div class:list={['', align === 'center' && 'text-center']}>
  <Tag class="titulo-seccion">{title}</Tag>
  {subtitle && <p class="subtitulo text-gray mt-3">{subtitle}</p>}
</div>
```

**Checklist de Headings**
- [ ] Exactamente un `<h1>` por página.
- [ ] Los `<h2>` corresponden a secciones principales.
- [ ] No hay saltos de nivel.
- [ ] `SectionHeader` usa `<h2>` por defecto.
- [ ] El `<h1>` del Hero no está dentro de `SectionHeader`.

---

### 5.3 Imágenes y Alt Text

**Reglas**
- Todas las imágenes usan `<Image />` de `astro:assets`.
- Toda imagen tiene `alt` descriptivo y único.
- Las imágenes puramente decorativas tienen `alt=""` y `aria-hidden="true"`.
- Los avatares tienen `alt` con el nombre de la persona.
- Las imágenes de proyectos tienen `alt` con el nombre del proyecto.
- Los logos tienen `alt` con el nombre de la empresa.
- No usar el nombre del archivo como `alt`.
```astro
<!-- ✅ CORRECTO -->
<Image
  src="/generico.jpeg"
  alt="Dashboard del sistema de gestión de obra SaaS"
  width={800}
  height={450}
  loading="lazy"
  decoding="async"
/>

<!-- ❌ INCORRECTO -->
<Image src="/generico.jpeg" alt="imagen" width={800} height={450} />
```

**Atributos requeridos en Image**

| Atributo | Regla |
|---|---|
| `src` | Ruta de la imagen. |
| `alt` | Descriptivo y único. Vacío solo si es decorativa. |
| `width` | Siempre definido. |
| `height` | Siempre definido. |
| `loading` | `"lazy"` para imágenes debajo del fold. `"eager"` solo para el LCP. |
| `decoding` | `"async"` siempre. |
| `fetchpriority` | `"high"` solo para la imagen principal del Hero (LCP). |

**Checklist de imágenes**
- [ ] Toda imagen usa `<Image />`, no `<img>`.
- [ ] Toda imagen tiene `alt` descriptivo.
- [ ] La imagen del Hero tiene `loading="eager"` y `fetchpriority="high"`.
- [ ] Las imágenes debajo del fold tienen `loading="lazy"`.
- [ ] Toda imagen tiene `width` y `height` definidos.

---

### 5.4 Datos Estructurados (Schema.org)

Agregar Schema.org en JSON-LD para mejorar la representación en buscadores.

**Schemas requeridos**

En `BaseLayout.astro` — Schema de organización (todas las páginas):
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Tinya Code",
  "url": "https://tinyacode.com",
  "logo": "https://tinyacode.com/logo.png",
  "description": "Agencia de diseño web y desarrollo de software...",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lima",
    "addressCountry": "PE"
  },
  "sameAs": []
}
```

En `BlogLayout.astro` — Schema de artículo:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[título del post]",
  "datePublished": "[fecha ISO]",
  "dateModified": "[fecha ISO]",
  "author": {
    "@type": "Organization",
    "name": "Tinya Code"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Tinya Code"
  },
  "image": "[URL de imagen del post]",
  "url": "[URL canónica del post]"
}
```

En `pages/contact.astro` — Schema de LocalBusiness:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Tinya Code",
  "telephone": "[teléfono]",
  "email": "[email]",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lima",
    "addressCountry": "PE"
  }
}
```

**Regla de implementación**
- Los schemas van en un `<script type="application/ld+json">` dentro del `<head>`.
- Los datos del schema vienen de `siteConfig.ts` y del frontmatter del contenido.
- No hardcodear URLs ni datos de contacto en el schema. Usar las variables.

---

### 5.5 Sitemap y RSS

**Reglas de Sitemap**
- El sitemap se genera automáticamente con `@astrojs/sitemap`.
- La configuración en `astro.config.mjs` incluye el `site` con la URL de producción.
- Las páginas `privacy.astro` y `terms.astro` tienen `<meta name="robots"
  content="noindex">` para no indexarlas.
- Las páginas 404 no aparecen en el sitemap.

**Reglas de RSS**
- El feed RSS en `rss.xml.js` incluye todos los posts del blog.
- Cada entrada del feed tiene: `title`, `description`, `pubDate`, `link`.
- La `description` del feed usa el primer párrafo del post o el campo
  `excerpt` del frontmatter.
- El feed tiene `customData` con el idioma: `<language>es-PE</language>`.

---

### 5.6 Performance y Core Web Vitals

**Reglas de rendimiento**

- No importar CSS de terceros en el `<head>`. Todo CSS va por Tailwind y `global.css`.
- Las fuentes usan `font-display: swap` (ya definido en `global.css`).
- No usar `@import` de fuentes desde Google Fonts. Las fuentes son locales.
- Los scripts de terceros (si se agregan) usan `defer` o `async`.
- No usar imágenes de fondo en CSS para contenido importante. Usar `<Image />`.
- El LCP (Largest Contentful Paint) es siempre la imagen del Hero.
  Usar `fetchpriority="high"` y `loading="eager"` en esa imagen.

**Reglas de Astro específicas**

- No usar `client:load` si `client:idle` o `client:visible` es suficiente.
- Preferir `client:visible` para componentes que están debajo del fold.
- No hidratar componentes que no tienen interactividad real.
- En este proyecto no se usan frameworks de UI (React, Vue). Todo es Astro puro
  con scripts de cliente nativos.

**Checklist de Performance**
- [ ] La imagen del Hero tiene `fetchpriority="high"` y `loading="eager"`.
- [ ] Todas las demás imágenes tienen `loading="lazy"`.
- [ ] No hay `@import` de fuentes externas.
- [ ] No hay CSS de terceros en el `<head>`.
- [ ] No hay scripts síncronos bloqueantes en el `<head>`.

---

## 6. Reglas de Indentación y Formato de Código

---

### 6.1 Indentación

- Indentación: 2 espacios en todos los archivos `.astro`, `.ts`, `.css`.
- No usar tabs. Solo espacios.
- Máximo 100 caracteres por línea. Si supera, dividir en múltiples líneas.
- Las props largas se escriben una por línea.
```astro
<!-- ✅ CORRECTO — props en múltiples líneas -->
<Image
  src="/generico.jpeg"
  alt="Descripción de la imagen"
  width={800}
  height={450}
  loading="lazy"
  decoding="async"
/>

<!-- ❌ INCORRECTO — todo en una línea -->
<Image src="/generico.jpeg" alt="Descripción" width={800} height={450} loading="lazy" decoding="async" />
```

---

### 6.2 Formato del Frontmatter

- Los imports se agrupan con una línea en blanco entre grupos.
- No hay imports sin usar.
- Los tipos se importan con `import type { }`.
- Las variables del frontmatter tienen nombres descriptivos en camelCase.

---

### 6.3 Formato del Template

- Los atributos de elementos HTML se escriben en este orden:
  1. `id`
  2. `class` o `class:list`
  3. Atributos semánticos (`role`, `aria-*`, `data-*`)
  4. Atributos funcionales (`href`, `src`, `type`, `for`)
  5. Atributos de evento (`onclick` — evitar, usar scripts)

- Los elementos con muchos atributos van en múltiples líneas.
- No hay elementos HTML sin cerrar salvo los void elements (`<img>`, `<input>`, etc.)
  y en Astro se cierran con `/>`.

---

### 6.4 Comentarios

- Los comentarios en el frontmatter explican el por qué, no el qué.
- Los comentarios en el template marcan secciones grandes.
- No comentar código muerto. Si no se usa, se elimina.
- Los comentarios en scripts de cliente explican lógica no obvia.
```astro
<!-- ✅ CORRECTO — marca una sección -->
<!-- Hero section -->
<section class="section-base section-light">

<!-- ✅ CORRECTO — explica el por qué -->
// Usamos el primer post como featured aunque no tenga el campo
// porque garantiza que siempre haya un elemento grande en el Bento
const featured = posts.find(p => p.data.featured) ?? posts[0];

<!-- ❌ INCORRECTO — explica el qué (obvio) -->
// Filtrar los servicios
const filtered = services.filter(s => s.category === category);
```

---

## 7. Checklist de Auditoría Global

Usar este checklist para auditar cada componente del proyecto.

### Arquitectura
- [ ] El componente está en la carpeta correcta (`smart/` o `ui/`).
- [ ] El componente tiene una sola responsabilidad.
- [ ] Los componentes Dumb tienen interfaz `Props` completa y tipada.
- [ ] Los props opcionales tienen valores por defecto.
- [ ] No hay imports de `src/data/` en componentes Dumb.
- [ ] No hay lógica de presentación en componentes Smart.
- [ ] Los interfaces compartidas están en `src/types/index.ts`.

### Frontmatter
- [ ] Los imports están ordenados y agrupados correctamente.
- [ ] No hay imports sin usar.
- [ ] Los tipos se importan con `import type`.
- [ ] Las variables tienen nombres descriptivos en camelCase.
- [ ] No hay `any` en TypeScript.
- [ ] `astro check` no reporta errores.

### Scripts de cliente
- [ ] Todos los `querySelector` usan tipos genéricos.
- [ ] Hay guard clause antes de usar cualquier elemento del DOM.
- [ ] Los eventos de alta frecuencia usan debounce.
- [ ] Los event listeners se limpian en `astro:before-swap`.
- [ ] Los eventos personalizados tienen prefijo `tinya:`.
- [ ] No se usa `innerHTML` para insertar contenido.
- [ ] No se usa `eval()`.
- [ ] No se usan variables globales para comunicar componentes.

### Interactividad
- [ ] El acordeón cierra los demás al abrir uno.
- [ ] El menú mobile tiene focus trap.
- [ ] Los modales tienen focus trap y gestionan el foco al cerrar.
- [ ] Los filtros de grilla tienen `aria-selected` y `role="tablist"`.
- [ ] El slider tiene `aria-live` y controles con `aria-label`.
- [ ] El toggle de precios tiene `role="switch"` y `aria-checked`.
- [ ] El dropdown del Navbar cierra con `Escape`.

### SEO
- [ ] Cada página tiene `title` único de máximo 60 caracteres.
- [ ] Cada página tiene `description` único de 120-160 caracteres.
- [ ] Cada página tiene `canonical` absoluta.
- [ ] Cada página tiene meta tags OG y Twitter completos.
- [ ] Exactamente un `<h1>` por página.
- [ ] No hay saltos en la jerarquía de headings.
- [ ] Todas las imágenes tienen `alt` descriptivo.
- [ ] La imagen del Hero tiene `fetchpriority="high"`.
- [ ] Los schemas JSON-LD están presentes en las páginas correspondientes.
- [ ] El sitemap incluye todas las páginas indexables.
- [ ] Las páginas `privacy` y `terms` tienen `noindex`.

### Formato
- [ ] Indentación de 2 espacios en todos los archivos.
- [ ] No hay líneas de más de 100 caracteres.
- [ ] No hay código comentado sin usar.
- [ ] Los atributos HTML están en el orden correcto.
- [ ] Las props largas están en múltiples líneas.