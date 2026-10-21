/**
 * Serverless funkce kontaktního formuláře (Vercel).
 * Kanály: e-mail přes Resend a/nebo webhook – zapínají se env proměnnými (viz .env.example).
 * Ochrana proti spamu: honeypot, minimální doba vyplnění, volitelně Cloudflare Turnstile.
 */
import type { APIRoute } from 'astro';
import {
  CONTACT_FROM,
  CONTACT_TO,
  CONTACT_WEBHOOK_SECRET,
  CONTACT_WEBHOOK_URL,
  RESEND_API_KEY,
  TURNSTILE_SECRET_KEY,
} from 'astro:env/server';
import { validuj, type Poptavka } from '../../lib/formular';
import { escapeHtml } from '../../lib/text';
import { firma } from '../../config/firma';

export const prerender = false;

const MIN_DOBA_MS = 3000;

function chceJson(request: Request) {
  return (request.headers.get('accept') ?? '').includes('application/json');
}

function odpoved(request: Request, ok: boolean, status: number, extra: Record<string, unknown> = {}) {
  if (chceJson(request)) return Response.json({ ok, ...extra }, { status });
  // Bez JavaScriptu: přesměrování na děkovnou stránku, nebo jednoduchá chybová stránka.
  if (ok) return new Response(null, { status: 303, headers: { Location: '/kontakt/odeslano' } });
  const html = `<!doctype html><html lang="cs"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Chyba odeslání | Feel Style</title><body style="font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem;line-height:1.6"><h1>Zprávu se nepodařilo odeslat</h1><p>${
    extra.chyby ? 'Některá pole nejsou vyplněna správně: ' + escapeHtml(Object.values(extra.chyby as object).join(' ')) : 'Zkuste to prosím znovu, nebo nám napište e-mail.'
  }</p><p><a href="/kontakt">← Zpět na kontakt</a></p></body></html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

async function overTurnstile(token: string, ip: string | null): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;
  const body = new FormData();
  body.append('secret', TURNSTILE_SECRET_KEY);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const data = (await r.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function posliEmail(p: Poptavka, zdroj: string) {
  const prijemci = (CONTACT_TO ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  const radky: [string, string][] = [
    ['Jméno', p.jmeno],
    ['E-mail', p.email],
    ['Telefon', p.telefon || '—'],
    ['Typ projektu', p.typ || '—'],
  ];
  const html = `<h2>Nová poptávka z webu</h2><table cellpadding="6">${radky
    .map(([k, v]) => `<tr><th align="left">${k}</th><td>${escapeHtml(v)}</td></tr>`)
    .join('')}</table><h3>Zpráva</h3><p style="white-space:pre-wrap">${escapeHtml(p.zprava)}</p><p style="color:#616161;font-size:12px">Odesláno z ${escapeHtml(zdroj)}. Odesílatel souhlasil se zpracováním osobních údajů.</p>`;
  const text = `${radky.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nZpráva:\n${p.zprava}\n\nOdesláno z ${zdroj}.`;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: prijemci,
      reply_to: p.email,
      subject: `Poptávka z webu – ${p.jmeno}${p.typ ? ` (${p.typ})` : ''}`,
      html,
      text,
    }),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
}

async function posliWebhook(p: Poptavka, zdroj: string) {
  const r = await fetch(CONTACT_WEBHOOK_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(CONTACT_WEBHOOK_SECRET && { 'X-Webhook-Secret': CONTACT_WEBHOOK_SECRET }),
    },
    body: JSON.stringify({
      typZpravy: 'poptavka',
      firma: firma.nazev,
      ...p,
      souhlasSeZpracovanim: true,
      odeslano: new Date().toISOString(),
      zdroj,
    }),
  });
  if (!r.ok) throw new Error(`Webhook ${r.status}`);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return odpoved(request, false, 400);
  }

  // 1) Honeypot – skryté pole vyplní jen robot. Tváříme se, že je vše v pořádku.
  if (String(data.get('web') ?? '').trim() !== '') return odpoved(request, true, 200);

  // 2) Příliš rychlé odeslání (časové razítko doplňuje JS při načtení stránky).
  const start = Number(data.get('t'));
  if (start && Date.now() - start < MIN_DOBA_MS) return odpoved(request, true, 200);

  // 3) Validace
  const { poptavka, chyby } = validuj(data);
  if (Object.keys(chyby).length) return odpoved(request, false, 422, { chyby });

  // 4) Cloudflare Turnstile (pokud je nastaven)
  let ip: string | null = null;
  try {
    ip = clientAddress;
  } catch {}
  if (!(await overTurnstile(String(data.get('cf-turnstile-response') ?? ''), ip))) {
    return odpoved(request, false, 403, { chyba: 'overeni' });
  }

  // 5) Odeslání do nastavených kanálů
  const emailZapnuty = Boolean(RESEND_API_KEY && CONTACT_TO && CONTACT_FROM);
  const webhookZapnuty = Boolean(CONTACT_WEBHOOK_URL);
  if (!emailZapnuty && !webhookZapnuty) {
    console.error('[kontakt] Není nastaven žádný kanál (RESEND_* ani CONTACT_WEBHOOK_URL).');
    return odpoved(request, false, 500);
  }

  const zdroj = request.headers.get('referer') ?? new URL(request.url).origin;
  const ulohy: Promise<void>[] = [];
  if (emailZapnuty) ulohy.push(posliEmail(poptavka, zdroj));
  if (webhookZapnuty) ulohy.push(posliWebhook(poptavka, zdroj));
  const vysledky = await Promise.allSettled(ulohy);
  vysledky
    .filter((v): v is PromiseRejectedResult => v.status === 'rejected')
    .forEach((v) => console.error('[kontakt]', v.reason));

  // Stačí, když projde alespoň jeden kanál.
  const ok = vysledky.some((v) => v.status === 'fulfilled');
  return odpoved(request, ok, ok ? 200 : 502);
};

export const ALL: APIRoute = () => new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
