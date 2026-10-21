import { cs, type Slovnik } from './cs';

/** Podporované jazyky. Při přidání angličtiny: 'cs' | 'en', slovník en.ts a locales v astro.config.mjs. */
export const jazyky = ['cs'] as const;
export type Jazyk = (typeof jazyky)[number];
export const vychoziJazyk: Jazyk = 'cs';

const slovniky: Record<Jazyk, Slovnik> = { cs };

export function t(jazyk: Jazyk = vychoziJazyk): Slovnik {
  return slovniky[jazyk];
}

/** Sestaví URL pro daný jazyk (výchozí jazyk je bez prefixu: /projekty, ostatní /en/projekty). */
export function cesta(url: string, jazyk: Jazyk = vychoziJazyk): string {
  if (jazyk === vychoziJazyk) return url;
  return `/${jazyk}${url === '/' ? '' : url}`;
}

export function jazykZUrl(url: URL): Jazyk {
  const prvni = url.pathname.split('/')[1];
  return (jazyky as readonly string[]).includes(prvni) ? (prvni as Jazyk) : vychoziJazyk;
}
