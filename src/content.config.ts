import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    pillar: z.enum(["collection", "systems", "visualization", "workflow-automation", "insights"]),
    pillarOrder: z.number(),
    summary: z.string(),
    howWeDoIt: z.array(z.object({ title: z.string(), body: z.string() })).optional(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/portfolio" }),
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    description: z.string(),
    relatedServices: z.array(z.string()).optional(),
  }),
});

export const collections = { services, portfolio };
