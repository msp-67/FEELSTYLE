import { getCollection, type CollectionEntry } from 'astro:content';
import { zobrazitPlaceholdery } from '../config/placeholdery';
import { maObsah } from './text';

export type Sluzba = CollectionEntry<'sluzby'>;

/**
 * Služby, které se na webu zobrazují, seřazené podle pole `poradi`.
 * Při skrytých placeholderech se vynechá služba bez fotky nebo bez popisu – nevznikne ani její stránka
 * a zmizí i z patičky a z výpisů.
 */
export async function viditelneSluzby(): Promise<Sluzba[]> {
  return (await getCollection('sluzby'))
    .filter((x) => zobrazitPlaceholdery || (x.data.obrazek && maObsah(x.data.perex)))
    .sort((a, b) => a.data.poradi - b.data.poradi);
}

/**
 * Sloupce mřížky služeb podle počtu karet, aby v posledním řádku nezůstalo prázdné místo
 * (3 služby = 3 sloupce, 4 = 2 a na širokém displeji 4). Použití: <div class="mrizka-sluzeb" style={sloupceSluzeb(n)}>
 */
export function sloupceSluzeb(pocet: number): string {
  const stredni = pocet % 2 === 0 ? 2 : Math.min(pocet, 3);
  const siroke = pocet <= 4 ? pocet : pocet % 3 === 0 ? 3 : 4;
  return `--sloupce-stredni:${stredni};--sloupce-siroke:${siroke}`;
}

/** URL služeb, které jsou skryté – odkazy na ně se z menu a patičky vynechají. */
export async function skryteSluzbyUrl(): Promise<Set<string>> {
  const viditelne = new Set((await viditelneSluzby()).map((x) => x.id));
  return new Set(
    (await getCollection('sluzby')).filter((x) => !viditelne.has(x.id)).map((x) => `/sluzby/${x.id}`),
  );
}
