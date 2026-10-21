import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { t, type Jazyk } from '../i18n';
import { bezDoplnit, zkrat } from './text';

export type Projekt = CollectionEntry<'projekty'>;

export async function vsechnyProjekty(): Promise<Projekt[]> {
  const projekty = await getCollection('projekty');
  return projekty.sort(
    (a, b) => a.data.poradi - b.data.poradi || a.data.nazev.localeCompare(b.data.nazev, 'cs'),
  );
}

// Všechny fotky ve složkách galerie/ – pro projekty, které nemají galerii vypsanou ve frontmatteru.
const fotkyGalerii = import.meta.glob<ImageMetadata>(
  '/src/content/projekty/*/galerie/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}',
  { eager: true, import: 'default' },
);

export interface Foto {
  src: ImageMetadata;
  alt: string;
}

export function galerieProjektu(projekt: Projekt): Foto[] {
  if (projekt.data.galerie?.length) return projekt.data.galerie;
  const slozka = '/' + (projekt.filePath ?? '').replace(/\/index\.md$/, '') + '/galerie/';
  return Object.entries(fotkyGalerii)
    .filter(([cesta]) => cesta.startsWith(slozka))
    .sort(([a], [b]) => a.localeCompare(b, 'cs', { numeric: true }))
    .map(([, src], i) => ({ src, alt: `${projekt.data.nazev} – fotografie ${i + 1}` }));
}

/** Meta description projektu: vlastní → krátký popis → složená z parametrů (když popis chybí). */
export function seoPopisProjektu(projekt: Projekt, jazyk: Jazyk = 'cs'): string {
  const d = projekt.data;
  const vlastni = bezDoplnit(d.seoPopis) ?? bezDoplnit(d.popis);
  if (vlastni) return zkrat(vlastni);
  const s = t(jazyk);
  return `${d.nazev} – realizace stavební firmy Feel Style. ${s.typy[d.typ]}, ${d.lokalita}, ${s.zeme[d.zeme]}.`;
}

/** Další projekty pod detailem: nejdřív stejný typ, pak ostatní podle pořadí. */
export function dalsiProjekty(vse: Projekt[], aktualni: Projekt, pocet = 3): Projekt[] {
  const ostatni = vse.filter((p) => p.id !== aktualni.id);
  const stejnyTyp = ostatni.filter((p) => p.data.typ === aktualni.data.typ);
  const zbytek = ostatni.filter((p) => p.data.typ !== aktualni.data.typ);
  return [...stejnyTyp, ...zbytek].slice(0, pocet);
}
