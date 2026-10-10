// Independent check: a different route (status filter) must also reach the token; wrong creds must fail.
import { chromium } from 'playwright';
const base = process.argv[2] || 'http://127.0.0.1:8787';
const b = await chromium.launch(); const p = await b.newPage();
await p.goto(base + '/erp/app.html'); if (!p.url().includes('index.html')) throw new Error('guard failed: ' + p.url());
await p.goto(base + '/erp/'); await p.fill('#user','candidate'); await p.fill('#pass','wrong'); await p.click('#signin');
if (!(await p.textContent('#err')).includes('Invalid')) throw new Error('bad creds accepted');
await p.fill('#pass','findme'); await p.click('#signin'); await p.waitForURL('**/app.html');
await p.goto(base + '/erp/postings.html'); await p.selectOption('#status','open');
const rows = await p.locator('#rows tr').count(); if (rows !== 1) throw new Error('open rows=' + rows);
await p.click('#rows a'); await p.waitForURL('**/posting.html?id=1005');
const before = await p.locator('#token').isVisible(); if (before) throw new Error('token visible before captcha');
await p.check('#notahuman'); await p.waitForSelector('#token', { state: 'visible', timeout: 5000 });
const tok = (await p.textContent('#token')).trim();
await p.goto(base + '/erp/posting.html?id=112'); const archived = await p.textContent('#apply');
await b.close();
console.log('token:', tok, '| archived posting apply text:', archived.trim().slice(0,50));
