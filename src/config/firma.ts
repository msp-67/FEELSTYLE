/**
 * FIREMNÍ ÚDAJE – jediné místo, kde se mění adresy, IČO, e-maily, čísla atd.
 * Používá se v patičce, na Kontaktu, v GDPR textech i ve strukturovaných datech pro Google.
 *
 * Text ve tvaru "[DOPLNIT: …]" se na webu zobrazí zvýrazněně, dokud ho nenahradíte.
 * Položky s `kOvereni: true` se na webu zobrazují, ale je potřeba je potvrdit s klientem.
 */

export const firma = {
  nazev: 'FEEL STYLE s.r.o.',
  znacka: 'Feel Style',
  ico: '028 73 613',
  dic: 'CZ 028 73 613',
  /** Ověřeno ve veřejném rejstříku (or.justice.cz) podle IČO 21. 10. 2026. */
  zapis: 'Spisová značka C 224341 vedená u Městského soudu v Praze',

  /**
   * ⚠ K OVĚŘENÍ: Na původním webu se objevují dvě různé adresy.
   * – Gerstelova (patička + fakturační adresa na Kontaktu; podle ARES k 16. 10. 2026 sídlo firmy)
   * – Malostranské nábřeží (na Kontaktu jako „Adresa kanceláře“)
   * Nerozhodnuto, která je sídlo / kam mají chodit klienti. Obě zatím zobrazujeme tak, jak byly.
   */
  adresy: {
    fakturacni: {
      nazev: 'Fakturační adresa',
      ulice: 'Gerstelova 1068/8',
      psc: '190 00',
      mesto: 'Praha 9 – Vysočany',
      zeme: 'CZ',
      kOvereni: true,
    },
    kancelar: {
      nazev: 'Adresa kanceláře',
      ulice: 'Malostranské nábřeží 563',
      psc: '[DOPLNIT: PSČ kanceláře]',
      mesto: 'Praha 1',
      zeme: 'CZ',
      kOvereni: true,
    },
  },

  /** Která adresa se použije jako hlavní ve strukturovaných datech (LocalBusiness). ⚠ K OVĚŘENÍ */
  hlavniAdresa: 'fakturacni' as 'fakturacni' | 'kancelar',

  emaily: {
    kontakt: ['hostakova@feelstyle.cz', 'drahonovska@feelstyle.cz'],
    faktury: 'faktury@feelstyle.cz',
    kariera: '[DOPLNIT: e-mail pro zasílání životopisů]',
  },

  telefon: '[DOPLNIT: telefonní číslo]',

  /** Odkazy na sociální sítě – prázdné se nezobrazí. */
  socialniSite: [] as { nazev: string; url: string }[],

  /** Rok, od kterého firma působí. ⚠ K OVĚŘENÍ: web uvádí 2001, ARES uvádí vznik s.r.o. 8. 4. 2014. */
  naTrhuOd: 2001,

  /** Klíčová čísla. „24+ let“ ponecháno pevně podle původního webu do potvrzení klientem. */
  cisla: [
    { hodnota: '24+', popis: 'let zkušeností', kOvereni: true },
    { hodnota: '250+', popis: 'dokončených staveb' },
    { hodnota: '> 1 mld. Kč', popis: 'celková hodnota projektů' },
    { hodnota: '80+', popis: 'stálých spolupracovníků' },
  ],

  /** Země, kde firma stavěla (z textu O nás). */
  zeme: ['CZ', 'AT', 'FR', 'SK'] as const,
} as const;

export type AdresaKlic = keyof typeof firma.adresy;
