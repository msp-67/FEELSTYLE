/**
 * NAVIGACE – menu v hlavičce i patičce se generují odsud.
 * Novou stránku do menu přidáte jedním řádkem; layout neupravujete.
 * Klíč nejvyšší úrovně je jazyk (zatím jen 'cs'; pro en/de přidejte další blok).
 */
import type { Jazyk } from '../i18n';

export interface Odkaz {
  nazev: string;
  url: string;
}

interface Navigace {
  /** Hlavní menu v hlavičce. */
  hlavni: Odkaz[];
  /** Sloupce odkazů v patičce. */
  paticka: { nadpis: string; odkazy: Odkaz[] }[];
  /** Drobné odkazy pod patičkou (právní stránky). */
  pravni: Odkaz[];
  /** Tlačítko v hlavičce. */
  vyzva: Odkaz;
}

export const navigace: Record<Jazyk, Navigace> = {
  cs: {
    hlavni: [
      { nazev: 'Projekty', url: '/projekty' },
      { nazev: 'Služby', url: '/sluzby' },
      { nazev: 'Jak pracujeme', url: '/jak-pracujeme' },
      { nazev: 'O nás', url: '/o-nas' },
      { nazev: 'Kariéra', url: '/kariera' },
    ],
    vyzva: { nazev: 'Kontakt', url: '/kontakt' },
    paticka: [
      {
        nadpis: 'Firma',
        odkazy: [
          { nazev: 'O nás', url: '/o-nas' },
          { nazev: 'Jak pracujeme', url: '/jak-pracujeme' },
          { nazev: 'Kariéra', url: '/kariera' },
          { nazev: 'Kontakt', url: '/kontakt' },
        ],
      },
      {
        nadpis: 'Služby',
        odkazy: [
          { nazev: 'Vily a rodinné domy', url: '/sluzby/vily-a-rodinne-domy' },
          { nazev: 'Bytové domy a byty', url: '/sluzby/bytove-domy-a-byty' },
          { nazev: 'Renovace', url: '/sluzby/renovace' },
          { nazev: 'Komerční a průmyslové stavby', url: '/sluzby/komercni-a-prumyslove-stavby' },
        ],
      },
      {
        nadpis: 'Projekty',
        odkazy: [{ nazev: 'Všechny projekty', url: '/projekty' }],
      },
    ],
    pravni: [
      { nazev: 'Ochrana osobních údajů', url: '/ochrana-osobnich-udaju' },
      { nazev: 'Cookies', url: '/cookies' },
    ],
  },
};
