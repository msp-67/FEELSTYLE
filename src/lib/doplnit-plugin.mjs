/**
 * Sätteri (markdown procesor Astra) hast plugin pro placeholdery [DOPLNIT: …].
 * – zobrazit: true  → zvýrazní je jako <mark class="doplnit">,
 * – zobrazit: false → odstraní je; odstavec, položka seznamu nebo citace, ve kterých nic nezůstane,
 *   zmizí celé, stejně jako nadpis, pod kterým pak není žádný obsah.
 * Přepínač je v src/config/placeholdery.ts.
 */
const RE = /\[DOPLNIT:[^\]]*\]/g;

/** Bloky, které po odstranění placeholderu zmizí celé, když v nich nezůstane žádný text. */
const BLOKY = new Set(['p', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'td', 'th', 'dd', 'dt']);
const NADPIS = /^h([1-6])$/;
const maText = (text) => /[\p{L}\p{N}]/u.test(text);
const jeElement = (node) => node.type === 'element';

// Názvy se liší záměrně: jsou součástí otisku konfigurace, takže po přepnutí Astro zahodí cache vykresleného obsahu.
const zvyraznit = {
  name: 'doplnit-zobrazit',
  text(node, ctx) {
    const value = node.value;
    if (!value.includes('[DOPLNIT:')) return;
    const parts = [];
    let last = 0;
    for (const m of value.matchAll(RE)) {
      if (m.index > last) parts.push({ type: 'text', value: value.slice(last, m.index) });
      parts.push({
        type: 'element',
        tagName: 'mark',
        properties: { className: ['doplnit'] },
        children: [{ type: 'text', value: m[0] }],
      });
      last = m.index + m[0].length;
    }
    if (last === 0) return;
    if (last < value.length) parts.push({ type: 'text', value: value.slice(last) });
    ctx.replaceNode(node, parts);
  },
};

const skryt = {
  name: 'doplnit-skryt',
  before(root, ctx) {
    /**
     * Projde děti uzlu a vrátí, jestli v něm po odstranění placeholderů zůstal obsah.
     * Úpravy textu se jen sbírají do `upravy` – provedou se až u bloků, které na webu zůstanou.
     */
    function vycisti(rodic, upravy) {
      let obsah = false;
      const zachovane = [];
      for (const node of rodic.children ?? []) {
        if (node.type === 'text') {
          if (node.value.includes('[DOPLNIT:')) {
            const zbytek = node.value.replace(RE, '').replace(/[ \t]{2,}/g, ' ');
            upravy.push(() => ctx.replaceNode(node, { type: 'text', value: zbytek }));
            if (maText(zbytek)) obsah = true;
          } else if (maText(node.value)) obsah = true;
          continue;
        }
        if (!jeElement(node)) continue;
        // Obrázky a podobné prázdné elementy jsou obsah samy o sobě.
        if (!node.children?.length) {
          obsah = true;
          zachovane.push(node);
          continue;
        }
        const meloPlaceholder = ctx.textContent(node).includes('[DOPLNIT:');
        const upravyUvnitr = [];
        const maObsah = vycisti(node, upravyUvnitr);
        if (!maObsah && meloPlaceholder && BLOKY.has(node.tagName)) {
          upravy.push(() => ctx.removeNode(node));
          continue;
        }
        upravy.push(...upravyUvnitr);
        if (maObsah) obsah = true;
        zachovane.push(node);
      }
      // Nadpis, za kterým do dalšího nadpisu stejné nebo vyšší úrovně nic nezůstalo, skryjeme.
      zachovane.forEach((node, i) => {
        const uroven = NADPIS.exec(node.tagName)?.[1];
        if (!uroven) return;
        const dalsi = zachovane[i + 1];
        const dalsiUroven = dalsi && NADPIS.exec(dalsi.tagName)?.[1];
        if (!dalsi || (dalsiUroven && dalsiUroven <= uroven)) upravy.push(() => ctx.removeNode(node));
      });
      return obsah;
    }
    const upravy = [];
    vycisti(root, upravy);
    upravy.forEach((u) => u());
  },
};

export function doplnitPlugin({ zobrazit }) {
  return zobrazit ? zvyraznit : skryt;
}
