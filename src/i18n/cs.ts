/** Texty rozhraní v češtině. Pro další jazyk zkopírujte soubor (en.ts, de.ts) a přeložte hodnoty. */
export const cs = {
  meta: { lang: 'cs', locale: 'cs_CZ' },

  typy: {
    vila: 'Vila',
    'rodinny-dum': 'Rodinný dům',
    'bytovy-dum': 'Bytový dům',
    byt: 'Byt',
    renovace: 'Renovace',
    komercni: 'Komerční stavba',
    prumyslovy: 'Průmyslová stavba',
  },
  zeme: {
    CZ: 'Česko',
    AT: 'Rakousko',
    FR: 'Francie',
    SK: 'Slovensko',
  },
  stav: {
    dokonceno: 'Dokončeno',
    'v-realizaci': 'V realizaci',
  },

  parametry: {
    typ: 'Typ',
    lokalita: 'Lokalita',
    zeme: 'Země',
    klient: 'Klient',
    architekt: 'Architekt',
    rok: 'Dokončeno',
    rozsah: 'Rozsah',
    stav: 'Stav',
  },

  obecne: {
    preskocitNaObsah: 'Přeskočit na obsah',
    menu: 'Menu',
    zavritMenu: 'Zavřít menu',
    hlavniNavigace: 'Hlavní navigace',
    domu: 'Domů',
    vice: 'Více',
    zobrazitVse: 'Zobrazit vše',
    kOvereni: 'k ověření',
    drobeckovaNavigace: 'Drobečková navigace',
  },

  projekty: {
    nadpis: 'Projekty',
    vybrane: 'Vybrané projekty',
    vsechny: 'Všechny projekty',
    filtrTyp: 'Typ stavby',
    filtrZeme: 'Země',
    vse: 'Vše',
    zadnyVysledek: 'Pro zvolenou kombinaci filtrů zatím nemáme zveřejněný projekt.',
    zrusitFiltr: 'Zrušit filtry',
    zobrazitDalsi: 'Zobrazit další projekty',
    pocet: (n: number) => `${n} ${n === 1 ? 'projekt' : n >= 2 && n <= 4 ? 'projekty' : 'projektů'}`,
    dalsi: 'Další projekty',
    galerie: 'Fotogalerie',
    parametry: 'Parametry stavby',
    otevritFoto: (i: number, n: number) => `Otevřít fotografii ${i} z ${n}`,
    portfolio:
      '*Uvedeny jsou pouze některé stavby, pokud byste měli zájem, neváhejte nám napsat o celé portfolio.',
  },

  lightbox: {
    zavrit: 'Zavřít',
    predchozi: 'Předchozí fotografie',
    dalsi: 'Další fotografie',
    dialog: 'Prohlížeč fotografií',
  },

  vyzva: {
    nadpis: 'Máte projekt? Pojďme ho postavit.',
    text: 'Pracujeme výhradně pro přímé investory. Napište nám, rádi se vám ozveme.',
    tlacitko: 'Kontaktujte nás',
  },

  kariera: {
    otevrenePozice: 'Otevřené pozice',
    zadnePozice: 'Momentálně nemáme vypsanou žádnou pozici.',
    poslatCV: 'Životopis nám přesto můžete poslat – rádi se s vámi seznámíme.',
    tlacitkoCV: 'Poslat životopis',
    formularCV: 'Napište nám přes kontaktní formulář',
    reagovat: 'Reagovat na pozici',
    lokalita: 'Místo',
    uvazek: 'Úvazek',
    nastup: 'Nástup',
    zpet: 'Zpět na kariéru',
  },

  formular: {
    jmeno: 'Jméno a příjmení',
    email: 'E-mail',
    telefon: 'Telefon',
    typ: 'Typ projektu',
    typVyberte: 'Vyberte…',
    typJiny: 'Jiný',
    zprava: 'Zpráva',
    souhlas: 'Souhlasím se zpracováním osobních údajů za účelem vyřízení poptávky.',
    souhlasOdkaz: 'Více o ochraně osobních údajů',
    odeslat: 'Odeslat zprávu',
    odesilam: 'Odesílám…',
    povinne: 'povinné',
    uspech: 'Děkujeme, zprávu jsme přijali. Ozveme se vám co nejdříve.',
    chyba: 'Zprávu se nepodařilo odeslat. Zkuste to prosím znovu, nebo nám napište e-mail.',
    chybaPole: 'Zkontrolujte prosím zvýrazněná pole.',
  },
} as const;

export type Slovnik = typeof cs;
