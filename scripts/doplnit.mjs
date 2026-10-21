#!/usr/bin/env node
/**
 * Vypíše všechny placeholdery [DOPLNIT: …] a položky označené „K OVĚŘENÍ“ ve zdrojích webu.
 * Použití: npm run doplnit
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const KOREN = fileURLToPath(new URL('..', import.meta.url));
const SLOZKA = join(KOREN, 'src');
const PRIPONY = ['.md', '.ts', '.astro', '.mjs'];

function soubory(dir) {
  return readdirSync(dir).flatMap((jmeno) => {
    const cesta = join(dir, jmeno);
    if (statSync(cesta).isDirectory()) return jmeno.startsWith('_') ? [] : soubory(cesta);
    return PRIPONY.some((p) => jmeno.endsWith(p)) ? [cesta] : [];
  });
}

const doplnit = [];
const overit = [];
for (const soubor of soubory(SLOZKA)) {
  // Vynecháme kód, který s placeholdery pracuje (regexy, komentáře s ukázkou).
  if (/lib\/(text\.ts|doplnit-plugin\.mjs)$/.test(soubor)) continue;
  readFileSync(soubor, 'utf8')
    .split('\n')
    .forEach((radek, i) => {
      const misto = `${relative(KOREN, soubor)}:${i + 1}`;
      for (const m of radek.matchAll(/\[DOPLNIT:[^\]]*\]/g)) if (m[0] !== '[DOPLNIT: …]') doplnit.push(`${misto}  ${m[0]}`);
      if (/K OVĚŘENÍ/.test(radek)) overit.push(`${misto}  ${radek.trim()}`);
    });
}

console.log(`\n[DOPLNIT] – chybějící obsah (${doplnit.length}):\n`);
console.log(doplnit.join('\n') || '  nic');
console.log(`\nK OVĚŘENÍ (${overit.length}):\n`);
console.log(overit.join('\n') || '  nic');
console.log('');
