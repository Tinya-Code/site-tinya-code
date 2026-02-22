import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.string().optional(),
      author: z.string().default("Tinya Code"),
      category: z.string(),
      featured: z.boolean().default(false),
      readingTime: z.number().optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      heroImage: z.string().optional(),
      category: z.string(),
      client: z.string().optional(),
      technologies: z.array(z.string()),
      size: z.enum(["featured", "secondary", "small"]).default("secondary"),
      type: z.enum(["web", "tienda", "software", "excel"]).default("web"),
      demo: z.string().url().optional(),
      preview: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, projects };
