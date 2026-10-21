/**
 * NASTAVENÍ WEBU – výchozí SEO, OG obrázek a úvodní hero.
 */
import heroFoto from '../content/projekty/dum-ujezd/hlavni.png';

export const web = {
  url: 'https://www.feelstyle.cz',
  nazev: 'Feel Style',
  /** Doplňuje se za titulek každé stránky: „O nás | Feel Style“. */
  titulekSuffix: ' | Feel Style',
  popis:
    'Feel Style s.r.o. – pražská stavební firma realizující vily, rodinné a bytové domy, renovace i komerční stavby výhradně pro přímé investory. Na trhu od roku 2001.',

  /** Výchozí obrázek pro sdílení na sociálních sítích (stránky bez vlastní fotky). */
  ogObrazek: heroFoto,

  hero: {
    nadpis: 'Měníme plány ve skutečnost',
    podnadpis: 'Feel Style je dynamická a inovativní stavební firma, která dokáže váš sen změnit v realitu.',
    /** Fotka – zobrazí se vždy jako poster videa a jako náhrada, když video chybí nebo se nenačte. */
    foto: heroFoto,
    fotoAlt: 'Dům Trněný Újezd za soumraku – tři hmoty domu s prosvětlenými okny',
    /**
     * Video: nahrajte soubory do /public/video/ a vyplňte cesty (např. '/video/hero.mp4').
     * Doporučeno: MP4 (H.264) + WebM, 10–20 s, bez zvuku, max. ~6 MB, 1920×1080.
     * Prázdné = zobrazí se jen fotka.
     */
    video: {
      mp4: '',
      webm: '',
    },
  },
} as const;
