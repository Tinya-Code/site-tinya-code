/**
 * Inicializa las animaciones al hacer scroll usando IntersectionObserver.
 */
export const initScrollAnimations = (): void => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const targets = document.querySelectorAll<HTMLElement>(
    ".animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right",
  );

  if (prefersReduced) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  targets.forEach((el) => observer.observe(el));
};

/**
 * Función debounce para limitar la ejecución de funciones de alta frecuencia.
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Atrapa el foco dentro de un contenedor (Focus Trap).
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusable = container.querySelectorAll<HTMLElement>(
    'a, button, input, textarea, [tabindex]:not([tabindex="-1"])',
  );
  if (focusable.length === 0) return () => {};

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key !== "Tab") return;
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

  container.addEventListener("keydown", handleKeydown);
  return () => container.removeEventListener("keydown", handleKeydown);
}

/**
 * Inicializa la lógica de un modal genérico.
 */
export function initModal(
  triggerSelector: string,
  overlaySelector: string,
  closeSelector: string,
): void {
  const triggers = document.querySelectorAll<HTMLElement>(triggerSelector);
  const overlay = document.querySelector<HTMLElement>(overlaySelector);
  const closeBtn = document.querySelector<HTMLButtonElement>(closeSelector);

  if (!overlay || !closeBtn) return;

  let lastTrigger: HTMLElement | null = null;
  let removeTrap: (() => void) | null = null;

  function openModal(trigger: HTMLElement): void {
    lastTrigger = trigger;
    overlay!.classList.add("is-open");
    document.body.classList.add("overflow-hidden");
    closeBtn!.focus();
    removeTrap = trapFocus(overlay!);
  }

  function closeModal(): void {
    overlay!.classList.remove("is-open");
    document.body.classList.remove("overflow-hidden");
    removeTrap?.();
    lastTrigger?.focus();
    lastTrigger = null;
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openModal(trigger));
  });

  closeBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", (e: MouseEvent) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && overlay!.classList.contains("is-open")) {
      closeModal();
    }
  });

  document.addEventListener("astro:before-swap", closeModal);
}

/**
 * Inicializa el filtrado de grillas por categorías.
 */
export function initFilter(tabSelector: string, itemSelector: string, filterAttr: string): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>(tabSelector);
  const items = document.querySelectorAll<HTMLElement>(itemSelector);

  function filter(category: string): void {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.category === category;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    items.forEach((item) => {
      const match = category === "all" || item.dataset[filterAttr] === category;
      item.classList.toggle("hidden-by-filter", !match);
      item.setAttribute("tabindex", match ? "0" : "-1");
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filter(tab.dataset.category ?? "all");
    });
  });

  const firstTab = tabs[0];
  if (firstTab) filter(firstTab.dataset.category ?? "all");
}
