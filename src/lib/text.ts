import { zobrazitPlaceholdery } from '../config/placeholdery';

/** Vzor placeholderu: [DOPLNIT: co chybí] */
export const DOPLNIT_RE = /\[DOPLNIT:[^\]]*\]/g;

export function jeDoplnit(text: string | undefined | null): boolean {
  return !!text && /\[DOPLNIT:/.test(text);
}

export function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/** Text bez placeholderů [DOPLNIT: …], oříznutý. */
export function odstranDoplnit(text: string): string {
  return text.replace(DOPLNIT_RE, '').replace(/[ \t]{2,}/g, ' ').trim();
}

/**
 * Zůstane z textu na webu něco vidět? Při skrytých placeholderech se text složený
 * jen z placeholderů (a interpunkce) počítá jako prázdný – jeho blok se má skrýt celý.
 */
export function maObsah(text: string | undefined | null): boolean {
  if (!text?.trim()) return false;
  return zobrazitPlaceholdery || /[\p{L}\p{N}]/u.test(odstranDoplnit(text));
}

/** Vrátí bezpečné HTML, ve kterém jsou placeholdery [DOPLNIT: …] zvýrazněné, nebo odstraněné (src/config/placeholdery.ts). */
export function zvyrazni(text: string): string {
  if (!zobrazitPlaceholdery) return escapeHtml(odstranDoplnit(text));
  return escapeHtml(text).replace(
    /\[DOPLNIT:[^\]]*\]/g,
    (m) => `<mark class="doplnit">${m}</mark>`,
  );
}

/** Rozdělí víceřádkový text (z frontmatteru) na odstavce. */
export function odstavce(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Text bez placeholderů – pro meta description a strukturovaná data. */
export function bezDoplnit(text: string | undefined | null): string | undefined {
  if (!text || jeDoplnit(text)) return undefined;
  return text;
}

/** Zkrátí text pro meta description (~160 znaků) na hranici slova. */
export function zkrat(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:–-]$/, '') + '…';
}
