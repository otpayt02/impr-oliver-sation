import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { evaluateReadiness } from '../scripts/launch-readiness.mjs';

const root = new URL('..', import.meta.url);

test('the focused First Listen offer is present in the visible site source', async () => {
  const source = await readFile(new URL('./src/App.jsx', root), 'utf8');
  assert.match(source, /First Listen/);
  assert.match(source, /\$95/);
  assert.match(source, /draft launch price/);
});

test('the print-ready business card exists and names both AP partners', async () => {
  const card = new URL('./card.html', root);
  await access(card);
  const source = await readFile(card, 'utf8');
  assert.match(source, /Payton/);
  assert.match(source, /Alex/);
  assert.match(source, /@page/);
});

test('the audio input creates a local-only proof preview without an upload path', async () => {
  const source = await readFile(new URL('./src/App.jsx', root), 'utf8');
  assert.match(source, /URL\.createObjectURL/);
  assert.match(source, /nothing uploads from this preview/);
  assert.match(source, /Confirm original or owner-permitted rights before public release/);
  assert.doesNotMatch(source, /fetch\([^)]*audio/);
});

test('a ready booking brief can be copied locally without a send path', async () => {
  const source = await readFile(new URL('./src/App.jsx', root), 'utf8');
  assert.match(source, /Copy local brief/);
  assert.match(source, /navigator\.clipboard\?\.writeText/);
  assert.match(source, /Copied locally\. Paste it only into an approved destination/);
  assert.match(source, /Clipboard unavailable; the brief remains local and unsent/);
  assert.doesNotMatch(source, /fetch\(/);
});

test('the broad AP Music & Audio services are packaged into four clear pillars', async () => {
  const source = await readFile(new URL('./src/App.jsx', root), 'utf8');
  assert.match(source, /Performance & events/);
  assert.match(source, /Lessons & ear training/);
  assert.match(source, /Engineering & production/);
  assert.match(source, /Transcription & music tools/);
  assert.match(source, /First Listen remains the smallest paid starting point/);
});

test('the public-facing SEO metadata describes the service pillars without inventing a domain', async () => {
  const source = await readFile(new URL('./index.html', root), 'utf8');
  assert.match(source, /application\/ld\+json/);
  assert.match(source, /hasOfferCatalog/);
  assert.match(source, /Performance &amp; events|Performance & events/);
  assert.match(source, /Lessons &amp; ear training|Lessons & ear training/);
  assert.match(source, /Engineering &amp; production|Engineering & production/);
  assert.match(source, /Transcription &amp; music tools|Transcription & music tools/);
  assert.doesNotMatch(source, /apmusicaudio\.com/);
});

test('the launch gate names the owner decisions required before monetization', async () => {
  const source = await readFile(new URL('./src/App.jsx', root), 'utf8');
  assert.match(source, /Owner checkpoint/);
  assert.match(source, /Four approvals to turn sound into a sale/);
  assert.match(source, /Proof rights/);
  assert.match(source, /First Listen terms/);
  assert.match(source, /Booking or support destination/);
  assert.match(source, /First evidence/);
  assert.match(source, /local checklist, not a launch action/);
});

test('the YouTube draft slate organizes repeatable proof lanes without publishing', async () => {
  const source = await readFile(new URL('./src/App.jsx', root), 'utf8');
  assert.match(source, /YouTube \/ draft slate/);
  assert.match(source, /Morning Prelude/);
  assert.match(source, /Ten-Second Challenge/);
  assert.match(source, /Studio Walkthrough/);
  assert.match(source, /does not create a channel, schedule a live, or publish a clip/);
  assert.match(source, /Every lane can lead to a First Listen brief/);
});

test('the local and online lead map routes into existing offers without outreach controls', async () => {
  const source = await readFile(new URL('./src/App.jsx', root), 'utf8');
  assert.match(source, /function LeadMap/);
  assert.match(source, /Varanese, The Brown Hotel, and The Seelbach/);
  assert.match(source, /copy-only \/ approval gate/);
  assert.match(source, /Morning Prelude, Ten-Second Challenge, and Studio Walkthrough/);
  assert.match(source, /Draft only: this map creates no account, message, booking, or payment/);
  assert.doesNotMatch(source, /LeadMap[\s\S]*fetch\(/);
});

test('the owner approval packet keeps launch decisions explicit and local-only', async () => {
  const packet = await readFile(new URL('../docs/owner-approval-packet.md', root), 'utf8');
  assert.match(packet, /Owner Approval Packet/);
  assert.match(packet, /Proof rights/);
  assert.match(packet, /First Listen terms/);
  assert.match(packet, /One destination/);
  assert.match(packet, /First evidence/);
  assert.match(packet, /No message is sent from this project/);
  assert.doesNotMatch(packet, /sk_live_|access_token|password/i);
});

test('launch readiness fails closed until explicit approvals and one destination exist', async () => {
  const packageJson = JSON.parse(await readFile(new URL('./package.json', root), 'utf8'));
  assert.equal(packageJson.scripts['check:launch'], 'node scripts/check-launch-readiness.mjs');
  const packet = await readFile(new URL('../docs/owner-approval-packet.md', root), 'utf8');
  const result = evaluateReadiness({ packet, env: {} });
  assert.equal(result.ready, false);
  assert.deepEqual(result.checks.map((check) => check.ready), [false, false, false]);
});

test('launch readiness recognizes a synthetic approved packet without touching real destinations', async () => {
  const packet = await readFile(new URL('../docs/owner-approval-packet.md', root), 'utf8');
  const approvedPacket = packet
    .replaceAll('Rights decision: `pending`', 'Rights decision: `approved`')
    .replaceAll('First Listen terms decision: `pending`', 'First Listen terms decision: `approved`')
    .replaceAll('Destination decision: `pending`', 'Destination decision: `approved`')
    .replaceAll('`original / owner-permitted / do not use`', '`original`')
    .replaceAll('`approve / revise to __________`', '`approve`')
    .replaceAll('`approve / revise __________`', '`approve`');

  const result = evaluateReadiness({
    packet: approvedPacket,
    env: { VITE_BOOKING_URL: 'https://booking.example.test/ap-music', VITE_DONATION_URL: '' },
  });

  assert.equal(result.ready, true);
  assert.deepEqual(result.checks.map((check) => check.ready), [true, true, true]);
});

test('the First Listen draft scope is a clear, reviewable standalone artifact', async () => {
  const scope = await readFile(new URL('./first-listen.html', root), 'utf8');
  assert.match(scope, /DRAFT TERMS — OWNER REVIEW REQUIRED/);
  assert.match(scope, /\$95/);
  assert.match(scope, /one focused revision/i);
  assert.match(scope, /No payment, booking, or message is sent from this page/i);
});

test('the staged portfolio proof set stays local and rights-gated', async () => {
  const source = await readFile(new URL('./src/App.jsx', root), 'utf8');
  assert.match(source, /Local proof portfolio/);
  assert.match(source, /rights review pending/);
  assert.match(source, /improv-mastered-trimmed\.mp3/);
  assert.match(source, /piano-performance\.webm/);
  for (const file of ['improv-mastered-trimmed.mp3', 'notation-output-01.png', 'notation-output-02.png', 'piano-performance.webm']) {
    await access(new URL(`./public/proof/${file}`, root));
  }
});

test('booking and donation destinations stay empty until owner approval', async () => {
  const config = await readFile(new URL('./src/destination-config.js', root), 'utf8');
  const source = await readFile(new URL('./src/App.jsx', root), 'utf8');
  assert.match(config, /VITE_BOOKING_URL/);
  assert.match(config, /VITE_DONATION_URL/);
  assert.match(config, /return ''/);
  assert.match(config, /\['http:', 'https:'\]/);
  assert.match(source, /Pending owner-approved destination/);
  assert.match(source, /Support a new piece/);
  assert.match(source, /intentionally disconnected/);
});
