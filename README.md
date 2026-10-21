# Web Feel Style s.r.o.

Web stavební firmy Feel Style (www.feelstyle.cz). Postavený na [Astru](https://astro.build), obsah je v markdownových souborech, nasazuje se na Vercel.

- **Obsah** (projekty, služby, pozice, texty stránek) je v `src/content/`.
- **Firemní údaje** jsou v `src/config/firma.ts`.
- **Menu a patička** se nastavují v `src/config/navigace.ts`.
- **Vzhled** (barvy, písma, rozestupy) je v `src/styles/tokens.css`.

---

## Rychlý start

Potřebujete Node.js 22.22 nebo novější.

```bash
npm install        # instalace (jednou)
npm run dev        # vývojový server na http://localhost:4321
npm run build      # produkční build (kontroluje i správnost obsahu)
npm run check      # typová kontrola
npm run doplnit    # vypíše všechny chybějící údaje [DOPLNIT: …] a body k ověření
```

Pokud v obsahu chybí povinné pole nebo má špatnou hodnotu (třeba neexistující typ stavby), `npm run build` skončí chybou s názvem souboru. Na produkci se tak nedostane rozbitá stránka.

---

## Chybějící obsah

Placeholdery `[DOPLNIT: …]` zůstávají ve zdrojích, ale na webu se **nezobrazují**. Řídí to jeden přepínač v `src/config/placeholdery.ts`:

```ts
export const zobrazitPlaceholdery = false;   // true = zobrazit žlutě, co chybí
```

Při `false` se placeholdery vynechají a s nimi i všechno, co by po nich zůstalo prázdné: odstavec, položka seznamu, nadpis bez obsahu, blok na Kontaktu, sloupec s textem u projektu, karta služby i celé sekce s kroky spolupráce. Při `true` se web vrátí do pracovní podoby se žlutými boxy. Po přepnutí restartujte `npm run dev`.

Jakmile obsah doplníte (placeholder nahradíte skutečným textem), na webu se sám objeví, nic dalšího se nepřepíná.

Seznam skrytých placeholderů k 21. 10. 2026 (aktuální výpis s čísly řádků: `npm run doplnit`):

| Stránka | Sekce | Co chybí | Soubor |
|---|---|---|---|
| Úvod `/` | Jak pracujeme (celá sekce i s odkazem „Celý postup“) | Názvy a popisy 5 kroků spolupráce, viz řádek Jak pracujeme níže | `src/content/stranky/jak-pracujeme.md` (`kroky`) |
| Úvod `/`, Služby `/sluzby` | Karta „Komerční a průmyslové stavby“ (skrytá celá, stejně jako stránka `/sluzby/komercni-a-prumyslove-stavby` a odkaz v patičce) | Krátký popis služby (2–3 věty) a fotografie komerční nebo průmyslové stavby | `src/content/sluzby/komercni-a-prumyslove-stavby.md` |
| `/sluzby/komercni-a-prumyslove-stavby` | Text stránky | Popis služby: typy objektů (kanceláře, obchody, haly, sklady…), rozsah dodávky, reference | `src/content/sluzby/komercni-a-prumyslove-stavby.md` |
| `/sluzby/vily-a-rodinne-domy` | Text stránky | Podrobnější popis: co přesně dodáváte (hrubá stavba, dokončení na klíč, interiéry…), s jakými architekty spolupracujete, typická velikost zakázek | `src/content/sluzby/vily-a-rodinne-domy.md` |
| `/sluzby/bytove-domy-a-byty` | Text stránky | Popis výstavby bytových domů: rozsah, typ investorů, realizované bytové domy | `src/content/sluzby/bytove-domy-a-byty.md` |
| `/sluzby/renovace` | Text stránky | Podrobnější popis renovací: typy zakázek (historické objekty, interiéry, fasády…), příklady | `src/content/sluzby/renovace.md` |
| Jak pracujeme `/jak-pracujeme` | Postup krok za krokem (celá sekce) | 5 kroků, ke každému název a popis: 1. např. úvodní schůzka (co se děje, co investor dodává a co dostane), 2. např. rozpočet a nabídka, 3. např. smlouva a harmonogram, 4. např. realizace stavby (informování investora, kontrolní dny), 5. např. předání a servis (předání, záruky, servis) | `src/content/stranky/jak-pracujeme.md` |
| Jak pracujeme `/jak-pracujeme` | Úvodní text | Odstavec o procesu spolupráce s investorem: kdo je kontaktní osoba, jak často probíhá reporting, jak se řeší změny | `src/content/stranky/jak-pracujeme.md` |
| Projekt Byt Praha `/projekty/byt-praha1` | Text o projektu (sloupec vedle parametrů) | Text o projektu (rozsah prací, materiály, zajímavosti realizace) a krátký popis do Googlu (1–2 věty) | `src/content/projekty/byt-praha1/index.md` |
| Projekt Dům Praha `/projekty/byt-praha2` | Text o projektu (sloupec vedle parametrů) | Text o projektu (rozsah prací, materiály, zajímavosti realizace) a krátký popis do Googlu (1–2 věty) | `src/content/projekty/byt-praha2/index.md` |
| O nás `/o-nas` | Historie | Milníky historie firmy: založení, významné zakázky, vývoj firmy. Sjednotit rok: web uvádí 2001, ARES vznik s.r.o. 2014 | `src/content/stranky/o-nas.md` |
| O nás `/o-nas` | Tým | Vedení firmy a klíčoví lidé: jména, funkce, fotografie | `src/content/stranky/o-nas.md` |
| O nás `/o-nas` | Vlastní technika | Přehled techniky (typy strojů a vozidel, počty) a fotografie | `src/content/stranky/o-nas.md` |
| O nás `/o-nas` | Zahraniční zkušenosti | Konkrétní zahraniční realizace: místo, typ stavby, rok | `src/content/stranky/o-nas.md` |
| Kariéra `/kariera` | Úvodní text pod nadpisem | Text pro uchazeče: proč pracovat ve Feel Style, co firma nabízí zaměstnancům | `src/content/stranky/kariera.md` |
| Kariéra `/kariera` a detail pozice | Tlačítko pro zaslání CV | E-mail pro zasílání životopisů. Zatím tlačítko vede na kontaktní formulář. | `src/config/firma.ts` (`emaily.kariera`) |
| Kontakt `/kontakt` | Blok Telefon (skrytý celý) | Telefonní číslo. Chybí i ve strukturovaných datech pro Google. | `src/config/firma.ts` (`telefon`) |
| Kontakt `/kontakt`, patička | Adresa kanceláře | PSČ kanceláře (zobrazuje se jen „Malostranské nábřeží 563, Praha 1“) | `src/config/firma.ts` (`adresy.kancelar.psc`) |
| Ochrana osobních údajů `/ochrana-osobnich-udaju` | Úvod | Upozornění, že text je kostra a musí ho před spuštěním zkontrolovat právník / pověřenec | `src/content/stranky/ochrana-osobnich-udaju.md` |
| Ochrana osobních údajů | Účel a právní základ | Právní základ zpracování (souhlas, nebo jednání o smlouvě / oprávněný zájem) | `src/content/stranky/ochrana-osobnich-udaju.md` |
| Ochrana osobních údajů | Jak dlouho údaje uchováváme (skrytá celá i s nadpisem) | Doba uchování údajů | `src/content/stranky/ochrana-osobnich-udaju.md` |
| Ochrana osobních údajů | Kdo má k údajům přístup | Služba, na kterou míří webhook formuláře (Make, Zapier, CRM…): název a sídlo | `src/content/stranky/ochrana-osobnich-udaju.md` |
| Ochrana osobních údajů | Kdo má k údajům přístup | Informace o předávání údajů mimo EU a použitých zárukách (standardní smluvní doložky) | `src/content/stranky/ochrana-osobnich-udaju.md` |
| Cookies `/cookies` | Konec stránky | Interní poznámka: po přidání analytiky nebo vložených videí/map třetích stran stránku aktualizovat a doplnit lištu se souhlasem | `src/content/stranky/cookies.md` |

Doplněno: spisová značka **C 224341 vedená u Městského soudu v Praze** (ověřeno ve veřejném rejstříku or.justice.cz podle IČO 028 73 613, 21. 10. 2026).

---

## Jak přidat projekt (stavbu)

1. Zkopírujte složku `src/content/projekty/_sablona` a přejmenujte ji na adresu projektu, např. `vila-brno`.
   - Název složky = URL: `www.feelstyle.cz/projekty/vila-brno`
   - Jen malá písmena bez diakritiky, čísla a pomlčky.
2. Do složky nahrajte **hlavní fotku** jako `hlavni.jpg`.
3. Do podsložky `galerie/` nahrajte **ostatní fotky**. Řadí se abecedně, takže je můžete pojmenovat `01.jpg`, `02.jpg`…
4. Otevřete `index.md` a vyplňte údaje (návod je přímo v souboru):

| Pole | Povinné | Popis |
|---|---|---|
| `nazev` | ano | Název stavby |
| `typ` | ano | `vila`, `rodinny-dum`, `bytovy-dum`, `byt`, `renovace`, `komercni`, `prumyslovy` |
| `lokalita` | ano | Město / obec |
| `zeme` | ne (výchozí `CZ`) | `CZ`, `AT`, `FR`, `SK` |
| `klient`, `architekt`, `rok`, `rozsah`, `stav` | ne | Nevyplněné se na webu nezobrazí. `stav`: `dokonceno` / `v-realizaci` |
| `hlavniFoto`, `hlavniFotoAlt` | ano | Cesta k fotce a popis toho, co je na ní (pro nevidomé a Google) |
| `galerie` | ne | Když ho vynecháte, použijí se všechny fotky ze složky `galerie/`. Vyplňte ho, pokud chcete vlastní pořadí a popisky. |
| `popis` | ano | 1–2 věty do Googlu a sociálních sítí |
| `featured` | ne | `true` = projekt se ukáže na úvodní stránce |
| `poradi` | ne | Nižší číslo = výš ve výpisu |

5. Pod oddělovač `---` napište text o projektu, odstavce oddělte prázdným řádkem.

**Fotky:** stačí nahrát originály, web si je sám zmenší a převede do moderních formátů. Doporučujeme alespoň 2 400 px na delší straně a JPG.

Filtr na stránce Projekty se přizpůsobí sám: ukazuje jen typy a země, které mezi projekty jsou. Skupina „Země“ se objeví, až budou projekty aspoň ze dvou zemí.

---

## Jak přidat pracovní pozici

1. Zkopírujte `src/content/pozice/_sablona.md` a přejmenujte ho, např. `stavbyvedouci.md`. Stránka pak bude na `/kariera/stavbyvedouci`.
2. Vyplňte název, místo, úvazek, krátký popis a datum zveřejnění. Pod `---` napište text inzerátu.
3. Pozici stáhnete nastavením `aktivni: false` nebo smazáním souboru.

Když není otevřená žádná pozice, stránka Kariéra ukáže text „Momentálně nemáme vypsanou žádnou pozici“ a tlačítko pro zaslání CV. E-mail pro CV se nastavuje v `src/config/firma.ts` (`emaily.kariera`). Dokud není vyplněný, vede tlačítko na kontaktní formulář („Napište nám přes kontaktní formulář“).

> Při buildu bez pozic se v terminálu objeví varování `collection "pozice" … is empty`. Je to v pořádku.

---

## Jak přidat službu

Vytvořte nový soubor v `src/content/sluzby/`, např. `projektove-rizeni.md`. Jako vzor zkopírujte některou existující službu. Stránka bude na `/sluzby/projektove-rizeni` a sama se objeví v přehledu služeb.

`typyProjektu` určuje, které projekty se na stránce služby zobrazí jako realizace. `naUvodni: false` službu skryje z úvodní stránky. Do menu nebo patičky ji přidejte podle návodu níže.

---

## Jak přidat stránku do menu

Otevřete `src/config/navigace.ts` a přidejte řádek:

```ts
hlavni: [
  { nazev: 'Projekty', url: '/projekty' },
  { nazev: 'Nová stránka', url: '/nova-stranka' },   // ← nový řádek
  …
],
```

- `hlavni` je menu v hlavičce (na mobilu se zobrazí ve vysouvacím menu),
- `paticka` jsou sloupce odkazů v patičce,
- `pravni` jsou odkazy úplně dole (GDPR, cookies),
- `vyzva` je tlačítko vpravo v hlavičce.

Layout ani komponenty se neupravují. Samotnou novou stránku vytvoříte jako soubor `src/pages/nova-stranka.astro`; jako vzor poslouží třeba `src/pages/jak-pracujeme.astro`.

---

## Jak upravit firemní údaje

Všechno je v jednom souboru `src/config/firma.ts`: název, IČO, DIČ, adresy, e-maily, telefon, sociální sítě a klíčová čísla („250+ dokončených staveb“…). Změna se projeví v patičce, na Kontaktu, v GDPR textu i ve strukturovaných datech pro Google.

- Text ve tvaru `[DOPLNIT: …]` je placeholder za chybějící obsah. Jestli se na webu zobrazí, řídí přepínač v `src/config/placeholdery.ts` (viz [Chybějící obsah](#chybějící-obsah)).
- Položky označené `⚠ K OVĚŘENÍ` je potřeba potvrdit s klientem.
- Aktuální seznam obojího vypíše `npm run doplnit`.

Texty stránek (O nás, Jak pracujeme, Kariéra, GDPR, Cookies) jsou v `src/content/stranky/*.md`. Výchozí SEO popis webu a texty úvodního hero jsou v `src/config/web.ts`.

---

## Video v úvodu stránky

1. Nahrajte video do `public/video/`, např. `hero.mp4` a ideálně i `hero.webm`.
2. V `src/config/web.ts` vyplňte `hero.video.mp4: '/video/hero.mp4'` (a `webm`).

Doporučení: 10–20 s ve smyčce, bez zvuku, 1920×1080, do ~6 MB.

Fotka zůstává vždy jako poster a záloha. Video se nespustí uživatelům se zapnutým omezením pohybu nebo úsporou dat a při chybě načtení se automaticky schová.

---

## Kontaktní formulář

Formulář odesílá serverless funkce `src/pages/api/kontakt.ts` na Vercelu. Umí dva kanály:

- **e-mail** přes [Resend](https://resend.com),
- **webhook** (Make, Zapier, n8n, CRM…), který dostane JSON s daty poptávky.

Zapnout jde jeden z nich nebo oba. Stačí, když projde aspoň jeden.

**Nastavení:** ve Vercelu → Project → Settings → Environment Variables (lokálně v souboru `.env`, vzor je v `.env.example`):

| Proměnná | K čemu |
|---|---|
| `RESEND_API_KEY` | API klíč z Resend |
| `CONTACT_TO` | Kam chodí poptávky (víc adres oddělte čárkou) |
| `CONTACT_FROM` | Odesílatel, např. `Web Feel Style <web@feelstyle.cz>`. Doména musí být ověřená v Resend. |
| `CONTACT_WEBHOOK_URL` | URL webhooku |
| `CONTACT_WEBHOOK_SECRET` | Volitelné; pošle se v hlavičce `X-Webhook-Secret` |
| `PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Volitelná ochrana Cloudflare Turnstile |

**Ochrana proti spamu:** skryté pole (honeypot), kontrola minimální doby vyplnění a volitelně Cloudflare Turnstile. Robotům funkce odpoví „OK“, ale nic neodešle.

Formulář funguje i bez JavaScriptu. Po odeslání přesměruje na `/kontakt/odeslano`.

Po změně env proměnných je potřeba web znovu nasadit (Redeploy).

---

## Nasazení na Vercel

1. Nahrajte repozitář na GitHub / GitLab.
2. Na [vercel.com](https://vercel.com) zvolte **Add New → Project** a vyberte repozitář. Vercel sám pozná Astro, nic dalšího se nenastavuje.
3. Nastavte env proměnné formuláře (viz výše).
4. **Deploy.** Každý push do hlavní větve se pak nasadí automaticky, ostatní větve dostanou náhledovou URL.
5. Doména: Project → Settings → Domains → přidat `www.feelstyle.cz` (a `feelstyle.cz` s přesměrováním na www). DNS záznamy Vercel ukáže.

Adresy zůstávají stejné jako na starém webu (`/o-nas`, `/projekty/dum-ujezd`…), bez lomítka na konci. Adresa s lomítkem se automaticky přesměruje.

Sitemap (`/sitemap-index.xml`) a `robots.txt` se generují automaticky. Po spuštění sitemapu odešlete v Google Search Console.

---

## Přidání dalšího jazyka (EN / DE)

Struktura je připravená:

1. `src/i18n/cs.ts` zkopírujte jako `en.ts` a přeložte. Pak ho zaregistrujte v `src/i18n/index.ts` (`jazyky`, `slovniky`).
2. V `astro.config.mjs` doplňte `'en'` do `i18n.locales` a do sitemapy.
3. V `src/config/navigace.ts` přidejte blok `en: { … }`.
4. Stránky vytvořte v `src/pages/en/…`. Obsah kolekcí rozšiřte o jazyk (např. `index.en.md` vedle `index.md`), fotky zůstanou společné.

---

## Struktura projektu

```
inventura/            záloha původního webu (texty, fotky v plném rozlišení, HTML) – není součástí webu
public/               soubory servírované beze změny (favicon, video)
scripts/doplnit.mjs   výpis chybějících údajů
src/
  config/             firma.ts, navigace.ts, web.ts, placeholdery.ts
  content/            projekty/, sluzby/, pozice/, stranky/
  content.config.ts   schémata obsahu (která pole jsou povinná)
  components/         stavební bloky stránek
  i18n/               texty rozhraní
  layouts/            základní layout (hlavička, patička, SEO)
  lib/                pomocné funkce
  pages/              stránky = URL
  styles/             tokens.css (design tokeny), global.css
```

**Technologie:** Astro 7, content collections, čisté CSS s design tokeny, `astro:assets` pro optimalizaci obrázků, Astro Fonts API (písma Urbanist a Inter se servírují z vlastní domény), `@astrojs/sitemap`, `@astrojs/vercel`. Lightbox, filtr a animace jsou bez knihoven.
