/** Validace kontaktního formuláře – sdílí ji formulář (limity polí) i serverless funkce. */
import { TYPY } from '../content.config';
import { cs } from '../i18n/cs';

export const LIMITY = { jmeno: 120, email: 160, telefon: 40, zprava: 5000 } as const;

/** Možnosti „Typ projektu“: typy staveb + „Jiný“. */
export const TYPY_PROJEKTU = [...TYPY.map((k) => ({ k, nazev: cs.typy[k] })), { k: 'jiny', nazev: cs.formular.typJiny }];

export interface Poptavka {
  jmeno: string;
  email: string;
  telefon: string;
  typ: string;
  zprava: string;
}

export type Chyby = Partial<Record<keyof Poptavka | 'souhlas', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEFON_RE = /^[+\d][\d\s()/-]{5,}$/;

const text = (v: FormDataEntryValue | null | undefined) => (typeof v === 'string' ? v.trim() : '');
const jedenRadek = (s: string) => s.replace(/[\r\n]+/g, ' ');

export function validuj(data: FormData): { poptavka: Poptavka; chyby: Chyby } {
  const poptavka: Poptavka = {
    jmeno: jedenRadek(text(data.get('jmeno'))),
    email: jedenRadek(text(data.get('email'))),
    telefon: jedenRadek(text(data.get('telefon'))),
    typ: text(data.get('typ')),
    zprava: text(data.get('zprava')),
  };
  const chyby: Chyby = {};

  if (!poptavka.jmeno) chyby.jmeno = 'Vyplňte jméno.';
  else if (poptavka.jmeno.length > LIMITY.jmeno) chyby.jmeno = 'Jméno je příliš dlouhé.';

  if (!EMAIL_RE.test(poptavka.email) || poptavka.email.length > LIMITY.email) chyby.email = 'Zadejte platný e-mail.';

  if (poptavka.telefon && (!TELEFON_RE.test(poptavka.telefon) || poptavka.telefon.length > LIMITY.telefon))
    chyby.telefon = 'Zadejte platné telefonní číslo.';

  const typ = TYPY_PROJEKTU.find((t) => t.k === poptavka.typ);
  poptavka.typ = typ ? typ.nazev : '';

  if (!poptavka.zprava) chyby.zprava = 'Napište nám zprávu.';
  else if (poptavka.zprava.length > LIMITY.zprava) chyby.zprava = 'Zpráva je příliš dlouhá.';

  const souhlas = text(data.get('souhlas'));
  if (souhlas !== 'on' && souhlas !== 'true' && souhlas !== '1') chyby.souhlas = 'Bez souhlasu nemůžeme poptávku zpracovat.';

  return { poptavka, chyby };
}
