import { readFile } from 'node:fs/promises';
import { evaluateReadiness } from './launch-readiness.mjs';

const packetUrl = new URL('../../docs/owner-approval-packet.md', import.meta.url);

let packet;
try {
  packet = await readFile(packetUrl, 'utf8');
} catch (error) {
  console.error(`AP Music & Audio launch readiness: cannot read ${packetUrl.pathname}`);
  console.error(error.message);
  process.exitCode = 1;
}

if (!packet) {
  process.exitCode = 1;
} else {
  const { checks, ready } = evaluateReadiness({ packet });

  console.log('AP Music & Audio launch readiness');
  for (const check of checks) {
    console.log(`${check.ready ? '[ready]' : '[blocked]'} ${check.label} — ${check.ready ? 'approved' : check.detail}`);
  }

  if (ready) {
    console.log('READY — the approved handoff can be browser-verified before any external action.');
  } else {
    console.log('NOT READY — complete docs/owner-approval-packet.md and keep external sends approval-gated.');
    process.exitCode = 1;
  }
}
