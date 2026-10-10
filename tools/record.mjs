// Records "Dash" driving the ERP portal. Usage: node record.mjs <baseUrl> <outDir>
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
const base = process.argv[2] || 'http://localhost:8787';
const out = process.argv[3] || '/tmp/rec/out';
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  recordVideo: { dir: out, size: { width: 1280, height: 800 } },
});
const page = await ctx.newPage();

// HUD + cursor, persisted across navigations.
await ctx.addInitScript(() => {
  const dash = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" shape-rendering="crispEdges" width="28" height="28"><rect x="9" y="0" width="1" height="1" fill="hsl(222 48% 20%)"/><rect x="10" y="0" width="1" height="1" fill="hsl(222 48% 20%)"/><rect x="9" y="1" width="1" height="1" fill="hsl(222 48% 20%)"/><rect x="10" y="1" width="1" height="1" fill="hsl(222 48% 20%)"/><rect x="5" y="2" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="6" y="2" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="9" y="2" width="1" height="1" fill="hsl(222 48% 20%)"/><rect x="10" y="2" width="1" height="1" fill="hsl(222 48% 20%)"/><rect x="5" y="3" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="6" y="3" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="9" y="3" width="1" height="1" fill="hsl(222 48% 20%)"/><rect x="10" y="3" width="1" height="1" fill="hsl(222 48% 20%)"/><rect x="1" y="4" width="1" height="1" fill="hsl(213 45% 55%)"/><rect x="2" y="4" width="1" height="1" fill="hsl(213 45% 55%)"/><rect x="5" y="4" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="6" y="4" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="9" y="4" width="1" height="1" fill="hsl(222 48% 20%)"/><rect x="10" y="4" width="1" height="1" fill="hsl(222 48% 20%)"/><rect x="1" y="5" width="1" height="1" fill="hsl(213 45% 55%)"/><rect x="2" y="5" width="1" height="1" fill="hsl(213 45% 55%)"/><rect x="5" y="5" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="6" y="5" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="9" y="5" width="1" height="1" fill="hsl(222 48% 20%)"/><rect x="10" y="5" width="1" height="1" fill="hsl(222 48% 20%)"/><rect x="1" y="6" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="2" y="6" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="3" y="6" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="4" y="6" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="5" y="6" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="6" y="6" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="7" y="6" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="8" y="6" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="9" y="6" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="10" y="6" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="1" y="7" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="3" y="7" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="4" y="7" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="5" y="7" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="6" y="7" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="7" y="7" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="9" y="7" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="10" y="7" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="1" y="8" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="2" y="8" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="3" y="8" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="4" y="8" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="5" y="8" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="6" y="8" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="7" y="8" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="8" y="8" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="9" y="8" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="10" y="8" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="1" y="9" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="2" y="9" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="3" y="9" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="4" y="9" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="5" y="9" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="6" y="9" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="7" y="9" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="8" y="9" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="9" y="9" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="10" y="9" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="2" y="10" width="1" height="1" fill="hsl(213 45% 55%)"/><rect x="3" y="10" width="1" height="1" fill="hsl(213 45% 55%)"/><rect x="8" y="10" width="1" height="1" fill="hsl(213 45% 55%)"/><rect x="9" y="10" width="1" height="1" fill="hsl(213 45% 55%)"/><rect x="2" y="11" width="1" height="1" fill="hsl(213 45% 55%)"/><rect x="3" y="11" width="1" height="1" fill="hsl(213 45% 55%)"/><rect x="8" y="11" width="1" height="1" fill="hsl(213 45% 55%)"/><rect x="9" y="11" width="1" height="1" fill="hsl(213 45% 55%)"/><rect x="2" y="7" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="2" y="7" width="1" height="1" fill="hsl(0 0% 100%)"/><rect x="8" y="7" width="1" height="1" fill="hsl(218 50% 36%)"/><rect x="8" y="7" width="1" height="1" fill="hsl(0 0% 100%)"/></svg>`;
  function mount() {
    if (document.getElementById('__hud')) return;
    const css = document.createElement('style');
    css.textContent = `
      #__hud{position:fixed;left:18px;bottom:18px;width:400px;background:hsl(222 40% 8%);color:hsl(216 22% 90%);border-radius:12px;padding:14px 16px 12px;font:13px/1.55 ui-monospace,Menlo,Consolas,monospace;box-shadow:0 20px 50px -20px rgba(10,20,40,.6);z-index:2147483646;pointer-events:none}
      #__hud .h{display:flex;align-items:center;gap:10px;font-weight:600;color:#fff;margin-bottom:8px;letter-spacing:.02em}
      #__hud .h small{font-weight:400;color:hsl(216 12% 62%);margin-left:auto}
      #__hud .l{color:hsl(216 12% 72%);white-space:pre-wrap;animation:__in .25s ease-out}
      #__hud .l b{color:hsl(158 62% 62%);font-weight:600}
      @keyframes __in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
      #__cur{position:fixed;left:0;top:0;width:22px;height:22px;z-index:2147483647;pointer-events:none;transition:transform .45s cubic-bezier(.2,.8,.2,1);transform:translate(640px,400px);filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))}
      #__cur.dn svg{transform:scale(.85)}`;
    document.documentElement.appendChild(css);
    const hud = document.createElement('div'); hud.id = '__hud';
    hud.innerHTML = `<div class="h">${dash}<span>Dash · browser agent</span><small>live</small></div><div id="__lines"></div>`;
    document.documentElement.appendChild(hud);
    const cur = document.createElement('div'); cur.id = '__cur';
    cur.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 3l14 9-6 1.5L16 21l-3 1-3-7.5L5 19z" fill="#fff" stroke="#111" stroke-width="1.5" stroke-linejoin="round"/></svg>`;
    document.documentElement.appendChild(cur);
    try { const p = JSON.parse(sessionStorage.getItem('__hudlines') || '[]'); for (const t of p) addLine(t, false); } catch {}
    try { const c = JSON.parse(sessionStorage.getItem('__curpos') || 'null'); if (c) cur.style.transform = `translate(${c[0]}px,${c[1]}px)`; } catch {}
  }
  function addLine(html, persist = true) {
    const box = document.getElementById('__lines');
    const d = document.createElement('div'); d.className = 'l'; d.innerHTML = '▸ ' + html; box.appendChild(d);
    while (box.children.length > 6) box.removeChild(box.firstChild);
    if (persist) { const p = JSON.parse(sessionStorage.getItem('__hudlines') || '[]'); p.push(html); sessionStorage.setItem('__hudlines', JSON.stringify(p.slice(-6))); }
  }
  window.__say = (t) => { mount(); addLine(t); };
  window.__move = (x, y) => { mount(); document.getElementById('__cur').style.transform = `translate(${x}px,${y}px)`; sessionStorage.setItem('__curpos', JSON.stringify([x, y])); };
  window.__press = (down) => { document.getElementById('__cur').classList.toggle('dn', !!down); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
});

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const say = async (t, pause = 900) => { await page.evaluate(t => window.__say(t), t); await sleep(pause); };
async function click(sel, pre = 350) {
  const el = page.locator(sel).first();
  await el.scrollIntoViewIfNeeded();
  const b = await el.boundingBox();
  const x = b.x + b.width / 2, y = b.y + b.height / 2;
  await page.evaluate(([x, y]) => window.__move(x - 2, y - 2), [x, y]);
  await sleep(500 + pre);
  await page.evaluate(() => window.__press(true)); await sleep(90);
  await page.mouse.click(x, y);
  await page.evaluate(() => window.__press(false)).catch(() => {});
}
async function type(sel, text) {
  await click(sel, 100);
  await page.keyboard.type(text, { delay: 70 });
}

const t0 = Date.now();
await page.goto(base + '/erp/');
await sleep(600);
await say('Goal: find the one open posting, bring back the apply token.', 1100);
await say('Login form. Using the creds from the poster.', 600);
await type('#user', 'candidate');
await type('#pass', 'findme');
await click('#signin');
await page.waitForURL('**/app.html'); await sleep(500);
await say('Dashboard says <b>1 open position</b>. HR → Job Postings.', 900);
await click('text=Job Postings');
await page.waitForURL('**/postings.html'); await sleep(500);
await say('10 of 23 shown. Nothing open on this page. Loading more.', 1000);
await click('#more');
await sleep(500);
await say('There it is: <b>#1005 · AI/ML + Data Engineer</b>, status open.', 900);
await click('a[href="posting.html?id=1005"]');
await page.waitForURL('**/posting.html?id=1005'); await sleep(600);
await say('Reading the JD. Scrolling to Apply.', 500);
await page.locator('#cap').scrollIntoViewIfNeeded(); await sleep(700);
await say('Reverse CAPTCHA. Finally, one built for me.', 900);
await page.addStyleTag({ content: '#token{filter:blur(7px)}' });
await click('#notahuman');
await sleep(1700);
const secs = Math.round((Date.now() - t0) / 1000);
await say(`<b>Token acquired.</b> Not showing you. Go get your own. ${secs}s.`, 2600);
await page.screenshot({ path: path.join(out, 'last-frame.png') });
await ctx.close();
await browser.close();
const v = fs.readdirSync(out).find(f => f.endsWith('.webm'));
fs.renameSync(path.join(out, v), path.join(out, 'dash-run.webm'));
console.log('ok', secs + 's', path.join(out, 'dash-run.webm'));
