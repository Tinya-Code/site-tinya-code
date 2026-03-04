export type Align = "left" | "center";
export type HeadingTag = "h1" | "h2" | "h3" | "h4";
export type ButtonVariant = "primary" | "outline" | "outline-white";
export type ButtonSize = "sm" | "md" | "lg";
export type BadgeVariant = "default" | "brand" | "live" | "demo";

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

export interface WithIndex {
  index?: number;
}
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceSplit: number | string;
  priceFull: number | string;
  period: string;
  features: (string | { text: string; tooltip: string })[];
  ctaLabel?: string;
  ctaHref: string;
  featured?: boolean;
  badge?: string;
  hideDiscount?: boolean;
  customDiscountLabel?: string;
}
