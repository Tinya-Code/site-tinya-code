# Plan de Mejora del Navbar — Tinya Code
## Accesibilidad completa, UX/UI y links funcionales a todas las rutas

## Reglas del Agente para este Plan

- Leer `guiaEstilo.md` antes de modificar cualquier aspecto visual.
- Leer `reglasUso.md` antes de modificar la lógica del componente.
- Leer `refactorizacionCodigo.md` para respetar los principios de interactividad.
- No modificar datos de `src/data/navigation.ts` sin que la fase lo indique.
- Ejecutar `astro dev` y verificar cada ruta manualmente al finalizar cada fase.
- Ejecutar `astro check` al finalizar cada fase. Debe reportar cero errores.
- No romper el comportamiento existente al agregar funcionalidad nueva.
- Validar en mobile, tablet y desktop al finalizar cada fase.

---

## Estado Actual del Componente

El Navbar actual tiene:
- Logo con `font-rader` y link a `/`.
- Navegación desktop con soporte de sublinks via dropdown.
- Botón hamburguesa para mobile con focus trap.
- Indicador de scroll que agrega `navbar-scrolled`.
- Lógica de dropdown con hover y focus.
- Limpieza de listeners en `astro:before-swap`.

### Problemas identificados a resolver

- Los links del Navbar vienen de props (`navLinks`) pero no se verifica
  que cubran todas las rutas del sitio.
- El estado activo solo compara `currentPath === link.href` exacto,
  lo que falla para subrutas como `/services/web-design` cuando
  el link del Navbar es `/services`.
- Los sublinks del dropdown no tienen indicador de estado activo.
- El dropdown en desktop no tiene indicador visual de qué sublink está activo.
- El link del CTA en mobile aparece solo si existe en `navLinks`,
  pero no hay garantía de que el CTA exista.
- En mobile no se muestran los sublinks de los links que los tienen.
- Los links no cubren todas las rutas del sitio: sectores, portfolio,
  testimonios, metodología, etc.
- El dropdown usa `group-hover` de Tailwind en desktop lo que impide
  cerrar con `Escape` de forma consistente.
- No hay indicador visual de "has sublinks" suficientemente claro en mobile.
- El `aria-expanded` en el link padre del dropdown no se actualiza
  de forma confiable en todos los casos.

---

## Fase 1 — Auditoría y Definición del Mapa de Navegación

### Objetivo
Definir el mapa de navegación completo del sitio y actualizar
`src/data/navigation.ts` para que cubra todas las rutas existentes
con la estructura correcta.

### Archivos
- `src/data/navigation.ts`
- `src/pages/` — revisar todas las rutas existentes para no omitir ninguna

### Tareas

**Auditoría de rutas existentes**

Listar todas las rutas del sitio según la estructura de `src/pages/`:

| Ruta | Existe | Tipo |
|---|---|---|
| `/` | Sí | Página principal |
| `/about` | Sí | Página |
| `/services` | Sí | Índice |
| `/services/web-design` | Sí | Subpágina |
| `/services/ecommerce` | Sí | Subpágina |
| `/services/landing-pages` | Sí | Subpágina |
| `/services/software` | Sí | Subpágina |
| `/services/excel-appscript` | Sí | Subpágina |
| `/services/saas` | Sí | Subpágina |
| `/sectors` | Sí | Índice |
| `/sectors/construccion` | Sí | Subpágina |
| `/sectors/mineria` | Sí | Subpágina |
| `/sectors/industrias` | Sí | Subpágina |
| `/sectors/servicios-generales` | Sí | Subpágina |
| `/sectors/corporativos` | Sí | Subpágina |
| `/sectors/mypes` | Sí | Subpágina |
| `/portfolio` | Sí | Página |
| `/pricing` | Sí | Página |
| `/blog` | Sí | Índice |
| `/testimonials` | Sí | Página |
| `/methodology` | Sí | Página |
| `/faq` | Sí | Página |
| `/contact` | Sí | Página |
| `/privacy` | Sí | Legal |
| `/terms` | Sí | Legal |

**Definir la estructura del Navbar**

El Navbar no debe mostrar todas las rutas. Solo las de primer nivel de interés.
Las rutas legales (`/privacy`, `/terms`) van solo en el Footer.

Estructura propuesta del Navbar:
```typescript
// src/data/navigation.ts

export interface SubLink {
  text: string;
  href: string;
  description?: string;  // descripción breve para el dropdown enriquecido
  icon?: string;          // ícono opcional para el dropdown
}

export interface NavLink {
  text: string;
  href: string;
  isCTA?: boolean;
  sublinks?: SubLink[];
}

export const navLinks: NavLink[] = [
  {
    text: "Servicios",
    href: "/services",
    sublinks: [
      {
        text: "Diseño Web",
        href: "/services/web-design",
        description: "Sitios modernos y rápidos",
        icon: "mdi:web"
      },
      {
        text: "Tiendas Virtuales",
        href: "/services/ecommerce",
        description: "E-commerce optimizado",
        icon: "mdi:store"
      },
      {
        text: "Landing Pages",
        href: "/services/landing-pages",
        description: "Páginas de conversión AIDA",
        icon: "mdi:target"
      },
      {
        text: "Software a Medida",
        href: "/services/software",
        description: "Desarrollo personalizado",
        icon: "mdi:code-braces"
      },
      {
        text: "Excel y AppScript",
        href: "/services/excel-appscript",
        description: "Automatización con Google",
        icon: "mdi:table"
      },
      {
        text: "SaaS",
        href: "/services/saas",
        description: "Software de suscripción",
        icon: "mdi:cloud"
      }
    ]
  },
  {
    text: "Sectores",
    href: "/sectors",
    sublinks: [
      { text: "Construcción",        href: "/sectors/construccion",        icon: "mdi:crane" },
      { text: "Minería",             href: "/sectors/mineria",             icon: "mdi:hard-hat" },
      { text: "Industrias",          href: "/sectors/industrias",          icon: "mdi:factory" },
      { text: "Servicios Generales", href: "/sectors/servicios-generales", icon: "mdi:briefcase" },
      { text: "Corporativos",        href: "/sectors/corporativos",        icon: "mdi:office-building" },
      { text: "MyPes",               href: "/sectors/mypes",               icon: "mdi:store-outline" }
    ]
  },
  {
    text: "Portafolio",
    href: "/portfolio"
  },
  {
    text: "Nosotros",
    href: "/about"
  },
  {
    text: "Blog",
    href: "/blog"
  },
  {
    text: "Solicitar propuesta",
    href: "/contact",
    isCTA: true
  }
];

export const footerLinks: NavLink[] = [
  { text: "Precios",         href: "/pricing" },
  { text: "Testimonios",     href: "/testimonials" },
  { text: "Metodología",     href: "/methodology" },
  { text: "FAQ",             href: "/faq" },
  { text: "Privacidad",      href: "/privacy" },
  { text: "Términos",        href: "/terms" }
];
```

### Criterios de aceptación
- [ ] Todas las rutas del Navbar existen en `src/pages/`.
- [ ] Las rutas legales solo están en `footerLinks`, no en `navLinks`.
- [ ] Los links de "Servicios" cubren las 6 subpáginas del servicio.
- [ ] Los links de "Sectores" cubren las 6 subpáginas de sector.
- [ ] La interfaz `SubLink` tiene los campos `description` e `icon` opcionales.
- [ ] `astro check` no reporta errores en `navigation.ts`.

---

## Fase 2 — Lógica de Estado Activo

### Objetivo
Corregir la lógica de estado activo para que funcione correctamente
con rutas exactas, subrutas y sublinks.

### Archivos
- `src/components/ui/common/Navbar.astro`

### Problema actual
```astro
<!-- ❌ INCORRECTO — solo detecta coincidencia exacta -->
currentPath === link.href
```

Si el usuario está en `/services/web-design`, el link de "Servicios" (`/services`)
no se marca como activo porque la comparación es exacta.

### Solución

Crear una función de utilidad en el frontmatter para detectar si una ruta
está activa considerando subrutas:
```astro
---
const currentPath = Astro.url.pathname;

function isActive(href: string): boolean {
  if (href === '/') return currentPath === '/';
  return currentPath === href || currentPath.startsWith(href + '/');
}

function isSubActive(sublinks?: SubLink[]): boolean {
  if (!sublinks) return false;
  return sublinks.some(sub => isActive(sub.href));
}
---
```

### Tareas

**En el template del Navbar**

- Reemplazar `currentPath === link.href` por `isActive(link.href)`.
- El link padre que tiene sublinks activos también debe marcarse como activo.
  Usar `isActive(link.href) || isSubActive(link.sublinks)`.
- Los sublinks dentro del dropdown también tienen estado activo.
  Usar `isActive(sub.href)` en cada sublink.
- El sublink activo tiene: `text-brand font-semibold` dentro del dropdown.
- El sublink activo tiene un ícono de check o un punto a la izquierda
  para indicar la página actual: `•` en `text-brand`.

**Indicador visual en el link padre con sublinks activos**

- Si un link padre tiene un sublink activo, la línea inferior del `nav-link`
  debe estar visible aunque no sea el link padre el que está activo exactamente.
- Usar `class:list` para aplicar `nav-link-active` cuando
  `isActive(link.href) || isSubActive(link.sublinks)`.

### Criterios de aceptación
- [ ] Estar en `/services/web-design` marca "Servicios" como activo en el Navbar.
- [ ] Estar en `/sectors/mineria` marca "Sectores" como activo.
- [ ] Estar en `/blog` marca "Blog" como activo.
- [ ] Los sublinks en el dropdown muestran cuál está activo con estilo visual.
- [ ] La función `isActive` maneja correctamente la ruta raíz `/`.
- [ ] `astro check` sin errores.

---

## Fase 3 — Dropdown Desktop Enriquecido

### Objetivo
Mejorar el dropdown del desktop para que sea más informativo,
visualmente correcto y accesible, con descripción e ícono por sublink.

### Archivos
- `src/components/ui/common/Navbar.astro`

### Diseño del dropdown enriquecido

El dropdown enriquecido muestra ícono + texto + descripción por sublink.
Es especialmente útil para "Servicios" que tiene 6 subpáginas.

**Layout del dropdown de Servicios (2 columnas)**
```
[ ícono  Diseño Web          ] [ ícono  Software a Medida ]
         Sitios modernos               Desarrollo personalizado
[ ícono  Tiendas Virtuales   ] [ ícono  Excel y AppScript  ]
         E-commerce optimizado          Automatización con Google
[ ícono  Landing Pages       ] [ ícono  SaaS               ]
         Páginas de conversión          Software de suscripción
[ ── Ver todos los servicios → ]
```

**Layout del dropdown de Sectores (2 columnas)**
```
[ ícono  Construcción ] [ ícono  Corporativos ]
[ ícono  Minería      ] [ ícono  MyPes         ]
[ ícono  Industrias   ] [ ícono  Servicios G.  ]
```

### Tareas

**Agregar prop `rich` a la lógica del dropdown**

- Si el link tiene `sublinks` con `description`, usar el layout enriquecido.
- Si los sublinks no tienen `description`, usar el layout simple existente.

**Template del dropdown enriquecido**
```astro
{link.sublinks && link.sublinks[0]?.description ? (
  <!-- Dropdown enriquecido -->
  <div
    class="dropdown-panel absolute top-full left-1/2 -translate-x-1/2 pt-4
           opacity-0 pointer-events-none
           group-hover:opacity-100 group-hover:pointer-events-auto
           transition-opacity duration-200 z-50"
    role="menu"
    aria-label={`Submenú de ${link.text}`}
  >
    <div class="bg-white border border-gray-light rounded-sm shadow-sm p-4
                grid grid-cols-2 gap-1 min-w-[480px]">
      {link.sublinks.map((sub) => (
        
          href={sub.href}
          role="menuitem"
          class:list={[
            "flex items-start gap-3 px-3 py-3 rounded-xs",
            "hover:bg-light transition-colors duration-200",
            isActive(sub.href) && "bg-light"
          ]}
        >
          {sub.icon && (
            <Icon name={sub.icon} size={5}
              class:list={["mt-0.5 shrink-0",
                isActive(sub.href) ? "text-brand" : "text-gray"
              ]}
              ariaHidden={true}
            />
          )}
          <div>
            <span class:list={[
              "block font-poppins text-sm font-medium",
              isActive(sub.href) ? "text-brand" : "text-dark"
            ]}>
              {sub.text}
              {isActive(sub.href) && (
                <span class="ml-1 text-brand">•</span>
              )}
            </span>
            {sub.description && (
              <span class="block font-poppins text-xs text-gray mt-0.5">
                {sub.description}
              </span>
            )}
          </div>
        </a>
      ))}
      <!-- Link a la página índice del grupo -->
      
        href={link.href}
        role="menuitem"
        class="col-span-2 flex items-center justify-between
               px-3 py-3 mt-1 border-t border-gray-light
               font-poppins text-sm font-medium text-brand
               hover:text-brand-dark transition-colors duration-200"
      >
        Ver todos los {link.text.toLowerCase()}
        <Icon name="mdi:arrow-right" size={4} ariaHidden={true} />
      </a>
    </div>
  </div>
) : link.sublinks ? (
  <!-- Dropdown simple — para Sectores -->
  <div
    class="dropdown-panel absolute top-full left-0 pt-4
           opacity-0 pointer-events-none
           group-hover:opacity-100 group-hover:pointer-events-auto
           transition-opacity duration-200 z-50"
    role="menu"
    aria-label={`Submenú de ${link.text}`}
  >
    <div class="bg-white border border-gray-light rounded-sm shadow-sm p-2
                grid grid-cols-2 gap-1 min-w-[300px]">
      {link.sublinks.map((sub) => (
        
          href={sub.href}
          role="menuitem"
          class:list={[
            "flex items-center gap-2 px-3 py-2 rounded-xs",
            "font-poppins text-sm transition-colors duration-200",
            isActive(sub.href)
              ? "text-brand font-medium bg-light"
              : "text-dark hover:text-brand hover:bg-light/50"
          ]}
        >
          {sub.icon && (
            <Icon name={sub.icon} size={4}
              class="shrink-0"
              ariaHidden={true}
            />
          )}
          {sub.text}
          {isActive(sub.href) && (
            <span class="ml-auto text-brand text-xs">•</span>
          )}
        </a>
      ))}
      
        href={link.href}
        role="menuitem"
        class="col-span-2 flex items-center gap-2 px-3 py-2 mt-1
               border-t border-gray-light
               font-poppins text-sm font-medium text-brand
               hover:text-brand-dark transition-colors duration-200"
      >
        Ver todos
        <Icon name="mdi:arrow-right" size={4} ariaHidden={true} />
      </a>
    </div>
  </div>
) : null}
```

### Criterios de aceptación
- [ ] El dropdown de "Servicios" muestra ícono, título y descripción en 2 columnas.
- [ ] El dropdown de "Sectores" muestra ícono y título en 2 columnas.
- [ ] El sublink activo tiene fondo `bg-light` y texto `text-brand`.
- [ ] El indicador `•` aparece en el sublink activo.
- [ ] Cada dropdown tiene un link "Ver todos" al final.
- [ ] El dropdown tiene `role="menu"` y `aria-label`.
- [ ] Cada sublink tiene `role="menuitem"`.
- [ ] El dropdown es visible en hover y en focus-within.

---

## Fase 4 — Mobile: Sublinks Expandibles

### Objetivo
Agregar soporte de sublinks expandibles en el menú mobile.
Actualmente los sublinks no se muestran en mobile.

### Archivos
- `src/components/ui/common/Navbar.astro`

### Diseño mobile

En mobile cada link con sublinks tiene un botón de expansión (chevron)
que muestra u oculta la lista de sublinks.
```
[ Servicios                   ˅ ]   ← botón con chevron
  [ Diseño Web                  ]   ← sublinks expandibles
  [ Tiendas Virtuales           ]
  [ Landing Pages               ]
  ...
[ Sectores                    ˅ ]
[ Portafolio                    ]
[ Nosotros                      ]
[ Blog                          ]
──────────────────────────────────
[ Solicitar propuesta           ]   ← CTA
```

### Tareas

**Template del menú mobile con sublinks**

Reemplazar la sección de links del menú mobile por:
```astro
<div class="flex flex-col gap-2">
  {navLinks.filter(l => !l.isCTA).map((link) => (
    <div class="mobile-nav-group">
      {link.sublinks ? (
        <!-- Link con sublinks: botón expandible -->
        <div>
          <button
            class:list={[
              "mobile-nav-trigger w-full flex items-center justify-between",
              "py-3 font-poppins text-lg font-medium",
              "focus:outline-none focus:text-brand",
              isActive(link.href) || isSubActive(link.sublinks)
                ? "text-brand"
                : "text-dark"
            ]}
            aria-expanded="false"
            data-target={`mobile-sub-${link.href.replace('/', '')}`}
          >
            {link.text}
            <Icon
              name="mdi:chevron-down"
              size={5}
              class="mobile-chevron transition-transform duration-300 shrink-0"
              ariaHidden={true}
            />
          </button>
          <div
            id={`mobile-sub-${link.href.replace('/', '')}`}
            class="mobile-sublinks overflow-hidden max-h-0
                   transition-[max-height] duration-300 ease-in-out"
          >
            <div class="flex flex-col gap-1 pb-2 pl-4
                        border-l border-gray-light ml-1">
              <!-- Link a la página índice del grupo -->
              
                href={link.href}
                class:list={[
                  "py-2 font-poppins text-sm font-semibold",
                  "flex items-center gap-2",
                  isActive(link.href) ? "text-brand" : "text-gray"
                ]}
              >
                Ver todos los {link.text.toLowerCase()}
                <Icon name="mdi:arrow-right" size={4} ariaHidden={true} />
              </a>
              {link.sublinks.map((sub) => (
                
                  href={sub.href}
                  class:list={[
                    "py-2 font-poppins text-sm flex items-center gap-2",
                    "transition-colors duration-200",
                    isActive(sub.href)
                      ? "text-brand font-medium"
                      : "text-dark hover:text-brand"
                  ]}
                >
                  {sub.icon && (
                    <Icon name={sub.icon} size={4}
                      class="shrink-0 text-gray"
                      ariaHidden={true}
                    />
                  )}
                  {sub.text}
                  {isActive(sub.href) && (
                    <span class="ml-auto text-brand text-xs">•</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <!-- Link simple sin sublinks -->
        
          href={link.href}
          class:list={[
            "block py-3 font-poppins text-lg font-medium",
            "transition-colors duration-200",
            isActive(link.href) ? "text-brand" : "text-dark hover:text-brand"
          ]}
        >
          {link.text}
        </a>
      )}
    </div>
  ))}
</div>
```

**Script para los sublinks expandibles en mobile**

Agregar dentro de `initNavbar()`:
```typescript
// Mobile sublinks expansion
const mobileTriggers = document.querySelectorAll<HTMLButtonElement>(
  '.mobile-nav-trigger'
);

mobileTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const targetId = trigger.dataset.target;
    if (!targetId) return;

    const sublist = document.getElementById(targetId);
    const chevron = trigger.querySelector<HTMLElement>('.mobile-chevron');
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

    // Cerrar todos los demás
    mobileTriggers.forEach(otherTrigger => {
      if (otherTrigger === trigger) return;
      const otherId = otherTrigger.dataset.target;
      if (!otherId) return;
      const otherSublist = document.getElementById(otherId);
      const otherChevron = otherTrigger.querySelector<HTMLElement>('.mobile-chevron');
      otherTrigger.setAttribute('aria-expanded', 'false');
      if (otherSublist) otherSublist.style.maxHeight = '0px';
      otherChevron?.classList.remove('rotate-180');
    });

    // Toggle el actual
    trigger.setAttribute('aria-expanded', String(!isExpanded));
    if (!isExpanded && sublist) {
      sublist.style.maxHeight = sublist.scrollHeight + 'px';
      chevron?.classList.add('rotate-180');
    } else if (sublist) {
      sublist.style.maxHeight = '0px';
      chevron?.classList.remove('rotate-180');
    }
  });
});

// Abrir automáticamente el grupo activo al cargar
mobileTriggers.forEach(trigger => {
  const targetId = trigger.dataset.target;
  if (!targetId) return;
  const sublist = document.getElementById(targetId);
  const chevron = trigger.querySelector<HTMLElement>('.mobile-chevron');

  // Verificar si algún sublink dentro está activo
  const activeSublink = sublist?.querySelector<HTMLElement>('.text-brand');
  if (activeSublink && sublist) {
    trigger.setAttribute('aria-expanded', 'true');
    sublist.style.maxHeight = sublist.scrollHeight + 'px';
    chevron?.classList.add('rotate-180');
  }
});
```

### Criterios de aceptación
- [ ] En mobile los links con sublinks muestran un chevron.
- [ ] Al hacer click en el botón, se expande la lista de sublinks.
- [ ] Al expandir uno, los demás se cierran.
- [ ] El grupo activo se abre automáticamente al cargar la página.
- [ ] El sublink activo tiene `text-brand` y el indicador `•`.
- [ ] El link "Ver todos" aparece al inicio de cada grupo expandido.
- [ ] Al hacer click en un sublink, el menú mobile se cierra.
- [ ] Con `prefers-reduced-motion` la expansión es instantánea.

---

## Fase 5 — Accesibilidad: Keyboard Navigation en Dropdown Desktop

### Objetivo
Permitir navegar el dropdown del desktop completamente con teclado
siguiendo el patrón ARIA de menú de navegación.

### Archivos
- `src/components/ui/common/Navbar.astro`

### Comportamiento esperado con teclado

| Tecla | Comportamiento |
|---|---|
| `Tab` | Mueve el foco al siguiente link del Navbar |
| `Enter` en link padre | Navega a la URL del link padre |
| `Space` en link padre con sublinks | Abre el dropdown |
| `ArrowDown` en link padre abierto | Mueve el foco al primer sublink |
| `ArrowDown` en sublink | Mueve al siguiente sublink |
| `ArrowUp` en sublink | Mueve al sublink anterior |
| `ArrowUp` en primer sublink | Regresa al link padre |
| `Escape` en dropdown abierto | Cierra dropdown y regresa al padre |
| `Home` en dropdown | Va al primer sublink |
| `End` en dropdown | Va al último sublink |

### Tareas

Reemplazar la lógica de dropdown en el script por una versión con
navegación por teclado completa:
```typescript
// Dropdown keyboard navigation (Desktop)
const dropdownGroups = document.querySelectorAll<HTMLElement>('.group');

dropdownGroups.forEach(group => {
  const parentLink = group.querySelector<HTMLAnchorElement>(
    'a[aria-haspopup="true"]'
  );
  const dropdownPanel = group.querySelector<HTMLElement>('[role="menu"]');
  const menuItems = dropdownPanel?.querySelectorAll<HTMLAnchorElement>(
    '[role="menuitem"]'
  );

  if (!parentLink || !dropdownPanel || !menuItems?.length) return;

  let isOpen = false;

  function openDropdown(): void {
    isOpen = true;
    parentLink!.setAttribute('aria-expanded', 'true');
    dropdownPanel!.classList.add('opacity-100', 'pointer-events-auto');
    dropdownPanel!.classList.remove('opacity-0', 'pointer-events-none');
  }

  function closeDropdown(): void {
    isOpen = false;
    parentLink!.setAttribute('aria-expanded', 'false');
    dropdownPanel!.classList.remove('opacity-100', 'pointer-events-auto');
    dropdownPanel!.classList.add('opacity-0', 'pointer-events-none');
  }

  function focusItem(index: number): void {
    const items = Array.from(menuItems!);
    const target = items[Math.max(0, Math.min(index, items.length - 1))];
    target?.focus();
  }

  // Hover
  group.addEventListener('mouseenter', openDropdown);
  group.addEventListener('mouseleave', closeDropdown);

  // Space abre el dropdown sin navegar
  parentLink.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === ' ' && menuItems?.length) {
      e.preventDefault();
      openDropdown();
      focusItem(0);
    }
    if (e.key === 'ArrowDown' && menuItems?.length) {
      e.preventDefault();
      openDropdown();
      focusItem(0);
    }
    if (e.key === 'Escape') {
      closeDropdown();
    }
  });

  // Keyboard dentro del dropdown
  menuItems?.forEach((item, index) => {
    item.addEventListener('keydown', (e: KeyboardEvent) => {
      const items = Array.from(menuItems!);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (index < items.length - 1) {
            focusItem(index + 1);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (index === 0) {
            parentLink!.focus();
            closeDropdown();
          } else {
            focusItem(index - 1);
          }
          break;
        case 'Home':
          e.preventDefault();
          focusItem(0);
          break;
        case 'End':
          e.preventDefault();
          focusItem(items.length - 1);
          break;
        case 'Escape':
          e.preventDefault();
          closeDropdown();
          parentLink!.focus();
          break;
        case 'Tab':
          closeDropdown();
          break;
      }
    });
  });

  // Click fuera cierra el dropdown
  document.addEventListener('click', (e: MouseEvent) => {
    if (!group.contains(e.target as Node)) {
      closeDropdown();
    }
  });
});
```

### Criterios de aceptación
- [ ] `Space` en un link padre con sublinks abre el dropdown.
- [ ] `ArrowDown` mueve el foco al primer sublink.
- [ ] `ArrowDown` / `ArrowUp` navegan entre sublinks.
- [ ] `ArrowUp` en el primer sublink regresa al link padre.
- [ ] `Escape` cierra el dropdown y regresa el foco al padre.
- [ ] `Home` va al primer sublink.
- [ ] `End` va al último sublink.
- [ ] `Tab` cierra el dropdown y sigue el flujo normal.

---

## Fase 6 — Skip Link y Mejoras de Accesibilidad Global

### Objetivo
Agregar un skip link para lectores de pantalla y verificar todos los
atributos de accesibilidad del Navbar.

### Archivos
- `src/components/ui/common/Navbar.astro`
- `src/layouts/BaseLayout.astro`

### Tareas — Skip Link

Agregar el skip link como primer elemento del `<body>` en `BaseLayout.astro`:
```astro
<!-- Skip Link — primer elemento del body -->

  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
         focus:z-[100] focus:bg-white focus:border focus:border-brand
         focus:rounded-sm focus:px-4 focus:py-2
         focus:font-poppins focus:text-sm focus:font-semibold focus:text-brand
         focus:shadow-md transition-all"
>
  Ir al contenido principal
</a>
```

Y agregar `id="main-content"` al elemento `<main>` de `BaseLayout`.

### Tareas — Auditoría de accesibilidad del Navbar

Verificar y corregir cada punto:

**Logo**
- `aria-label="Ir a inicio — Tinya Code"` en el link del logo.
- El `<span>` del texto del logo tiene `aria-hidden="true"` si hay
  un texto alternativo en el `aria-label` del link.

**Navegación desktop**
- `<nav>` tiene `aria-label="Navegación principal"`.
- Los links simples tienen el texto correcto y descriptivo.
- El link activo tiene `aria-current="page"`.

**Dropdown**
- El link padre tiene `aria-haspopup="menu"` (no `"true"` — usar el valor correcto).
- El link padre tiene `aria-expanded` actualizado correctamente.
- El panel del dropdown tiene `role="menu"`.
- El panel tiene `aria-label` descriptivo.
- Cada ítem tiene `role="menuitem"`.

**Botón hamburguesa**
- `type="button"` explícito.
- `aria-expanded` cambia entre `"true"` y `"false"`.
- `aria-controls="mobile-menu"`.
- `aria-label` cambia entre "Abrir menú" y "Cerrar menú".

**Menú mobile**
- `id="mobile-menu"` coincide con `aria-controls` del botón.
- Los botones de expansión de subgrupos tienen `aria-expanded`.
- Los botones de expansión tienen `aria-controls` apuntando al sublist.
- El menú tiene `role="dialog"` y `aria-label="Menú de navegación"`.

**Links activos**
- El link activo tiene `aria-current="page"` además del estilo visual.

### CSS para el skip link en global.css
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Criterios de aceptación
- [ ] El skip link es el primer elemento focusable de la página.
- [ ] El skip link es visible cuando recibe foco.
- [ ] Al activar el skip link, el foco va al contenido principal.
- [ ] El link activo tiene `aria-current="page"`.
- [ ] `aria-haspopup="menu"` en los links con dropdown.
- [ ] Los botones de expansión mobile tienen `aria-expanded` y `aria-controls`.

---

## Fase 7 — Verificación de Links y Criterios de Aceptación

### Objetivo
Verificar manualmente que cada link del Navbar navega correctamente,
que no hay errores 404 y que el estado activo es correcto en cada ruta.

### Archivos
- No se modifican archivos en esta fase. Solo verificación.

### Checklist de verificación de links

**Links principales del Navbar**

| Link | URL | Página existe | Estado activo correcto |
|---|---|---|---|
| Logo | `/` | [x] | [x] |
| Servicios | `/services` | [x] | [x] |
| Sectores | `/sectors` | [x] | [x] |
| Portafolio | `/portfolio` | [x] | [x] |
| Nosotros | `/about` | [x] | [x] |
| Blog | `/blog` | [x] | [x] |
| Solicitar propuesta | `/contact` | [x] | [x] |

**Sublinks de Servicios**

| Sublink | URL | Página existe | Estado activo correcto |
|---|---|---|---|
| Diseño Web | `/services/web-design` | [x] | [x] |
| Tiendas Virtuales | `/services/ecommerce` | [x] | [x] |
| Landing Pages | `/services/landing-pages` | [x] | [x] |
| Software a Medida | `/services/software` | [x] | [x] |
| Excel y AppScript | `/services/excel-appscript` | [x] | [x] |
| SaaS | `/services/saas` | [x] | [x] |
| Ver todos los servicios | `/services` | [x] | [x] |

**Sublinks de Sectores**

| Sublink | URL | Página existe | Estado activo correcto |
|---|---|---|---|
| Construcción | `/sectors/construccion` | [x] | [x] |
| Minería | `/sectors/mineria` | [x] | [x] |
| Industrias | `/sectors/industrias` | [x] | [x] |
| Servicios Generales | `/sectors/servicios-generales` | [x] | [x] |
| Corporativos | `/sectors/corporativos` | [x] | [x] |
| MyPes | `/sectors/mypes` | [x] | [x] |
| Ver todos los sectores | `/sectors` | [x] | [x] |

**Rutas accesibles solo desde Footer (no Navbar)**

| Link | URL | Página existe |
|---|---|---|
| Precios | `/pricing` | [x] |
| Testimonios | `/testimonials` | [x] |
| Metodología | `/methodology` | [x] |
| FAQ | `/faq` | [x] |
| Privacidad | `/privacy` | [x] |
| Términos | `/terms` | [x] |

### Checklist de comportamiento UX

**Desktop**
- [x] El dropdown de Servicios se abre al hacer hover.
- [x] El dropdown de Sectores se abre al hacer hover.
- [x] El dropdown se cierra al salir del área del dropdown.
- [x] El dropdown se cierra al hacer click fuera.
- [x] El dropdown muestra ícono + título + descripción para Servicios.
- [x] El dropdown muestra ícono + título para Sectores.
- [x] El sublink activo tiene fondo `bg-light` y texto `text-brand`.
- [x] El link padre activo tiene la línea inferior visible.
- [x] El CTA "Solicitar propuesta" tiene el estilo `btn-primary`.
- [x] El Navbar gana sombra al hacer scroll más de 80px.

**Mobile**
- [x] El menú se abre al hacer click en el hamburguesa.
- [x] El menú se cierra al hacer click en el hamburguesa nuevamente.
- [x] El menú se cierra al hacer click en cualquier link.
- [x] El grupo "Servicios" se expande al hacer click en el botón.
- [x] El grupo "Sectores" se expande al hacer click en el botón.
- [x] Solo un grupo puede estar expandido a la vez.
- [x] El grupo activo está expandido al cargar la página.
- [x] El sublink activo tiene `text-brand` en mobile.
- [x] El CTA aparece al final del menú mobile con separador.

**Teclado**
- [x] El skip link funciona con `Tab` desde el inicio de la página.
- [x] Los links del Navbar son accesibles con `Tab`.
- [x] `Space` abre el dropdown en el link padre con sublinks.
- [x] `ArrowDown` navega entre sublinks.
- [x] `Escape` cierra el dropdown y regresa el foco al padre.
- [x] `Escape` cierra el menú mobile.
- [x] El focus trap funciona en el menú mobile.
- [x] `aria-current="page"` está en el link activo.

### Criterios de aceptación finales
- [x] `astro build` sin errores.
- [x] `astro check` sin errores.
- [x] No hay ningún link que devuelva 404.
- [x] Todos los links del Navbar navegan a la página correcta.
- [x] El estado activo es correcto en todas las rutas incluyendo subrutas.
- [x] El Navbar es completamente operable con teclado.
- [x] El Navbar es operable en mobile con touch.
- [x] El menú mobile tiene focus trap funcional.
- [x] El skip link es funcional.