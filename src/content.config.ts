import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const TYPY = ['vila', 'rodinny-dum', 'bytovy-dum', 'byt', 'renovace', 'komercni', 'prumyslovy'] as const;
export const ZEME = ['CZ', 'AT', 'FR', 'SK'] as const;
export const STAVY = ['dokonceno', 'v-realizaci'] as const;

/** Soubory a složky začínající podtržítkem (_sablona) se na web nedostanou. */
const bezSablon = '!**/_*/**';

/**
 * PROJEKTY – jedna složka = jedna stavba:
 *   src/content/projekty/<slug>/index.md
 *   src/content/projekty/<slug>/hlavni.jpg
 *   src/content/projekty/<slug>/galerie/*.jpg
 */
const projekty = defineCollection({
  loader: glob({
    pattern: ['*/index.md', bezSablon],
    base: './src/content/projekty',
    generateId: ({ entry, data }) => (data.slug as string | undefined) ?? entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      nazev: z.string(),
      slug: z.string().optional(),
      typ: z.enum(TYPY),
      lokalita: z.string(),
      zeme: z.enum(ZEME).default('CZ'),
      klient: z.string().optional(),
      architekt: z.string().optional(),
      rok: z.number().int().optional(),
      rozsah: z.string().optional(),
      stav: z.enum(STAVY).optional(),
      hlavniFoto: image(),
      hlavniFotoAlt: z.string(),
      /** Když chybí, použijí se automaticky všechny fotky ze složky galerie/ (abecedně). */
      galerie: z.array(z.object({ src: image(), alt: z.string() })).optional(),
      popis: z.string(),
      featured: z.boolean().default(false),
      poradi: z.number().default(100),
      seoTitulek: z.string().optional(),
      seoPopis: z.string().optional(),
    }),
});

/** SLUŽBY – jeden soubor = jedna služba = stránka /sluzby/<název-souboru>. */
const sluzby = defineCollection({
  loader: glob({ pattern: ['*.md', '!_*'], base: './src/content/sluzby' }),
  schema: ({ image }) =>
    z.object({
      nazev: z.string(),
      /** Krátký název pro záložky na úvodní stránce (např. „Vily“). */
      kratkyNazev: z.string(),
      perex: z.string(),
      obrazek: image().optional(),
      obrazekAlt: z.string().optional(),
      /** Projekty těchto typů se zobrazí na stránce služby. */
      typyProjektu: z.array(z.enum(TYPY)).default([]),
      poradi: z.number().default(100),
      naUvodni: z.boolean().default(true),
      seoTitulek: z.string().optional(),
      seoPopis: z.string().optional(),
    }),
});

/** KARIÉRA – jeden soubor = jedna pozice = stránka /kariera/<název-souboru>. */
const pozice = defineCollection({
  loader: glob({ pattern: ['*.md', '!_*'], base: './src/content/pozice' }),
  schema: z.object({
    nazev: z.string(),
    lokalita: z.string(),
    uvazek: z.string(),
    nastup: z.string().optional(),
    perex: z.string(),
    aktivni: z.boolean().default(true),
    zverejneno: z.coerce.date(),
    seoPopis: z.string().optional(),
  }),
});

/** STATICKÉ STRÁNKY – texty stránek O nás, Jak pracujeme, GDPR, Cookies… */
const stranky = defineCollection({
  loader: glob({ pattern: ['*.md', '!_*'], base: './src/content/stranky' }),
  schema: ({ image }) =>
    z.object({
      titulek: z.string(),
      seoTitulek: z.string().optional(),
      seoPopis: z.string(),
      perex: z.string().optional(),
      obrazek: image().optional(),
      obrazekAlt: z.string().optional(),
      kroky: z.array(z.object({ nazev: z.string(), text: z.string() })).optional(),
      sekce: z
        .array(
          z.object({
            nadpis: z.string(),
            text: z.string(),
            obrazek: image().optional(),
            obrazekAlt: z.string().optional(),
          }),
        )
        .optional(),
      aktualizovano: z.coerce.date().optional(),
    }),
});

export const collections = { projekty, sluzby, pozice, stranky };
