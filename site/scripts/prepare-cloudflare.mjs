import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const destination = resolve(root, 'dist/cloudflare');
const prior = await readdir(destination).catch(error => { if (error.code === 'ENOENT') return []; throw error; });
if (prior.some(name => !['index.html', 'assets', 'favicon.svg', '_headers'].includes(name))) throw new Error('Unexpected files in generated Cloudflare directory; inspect before rebuilding.');
const generatedAssets = resolve(destination, 'assets');
if (generatedAssets !== resolve(root, 'dist', 'cloudflare', 'assets')) throw new Error('Invalid generated asset path');
await rm(generatedAssets, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
// Publish only the current entry and its hashed assets. Private review media
// and legacy draft pages are intentionally outside this public package.
await cp(resolve(root, 'dist/client/index.html'), resolve(destination, 'index.html'));
await cp(resolve(root, 'dist/client/assets'), resolve(destination, 'assets'), { recursive: true });
await cp(resolve(root, 'public/favicon.svg'), resolve(destination, 'favicon.svg'));
const unexpected = (await readdir(destination)).filter(name => !['index.html', 'assets', 'favicon.svg', '_headers'].includes(name));
if (unexpected.length) throw new Error(`Unexpected public files: ${unexpected.join(', ')}`);
await writeFile(resolve(destination, '_headers'), '/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n');
console.log('Cloudflare public package ready at dist/cloudflare. Practice payments only; no private proof media.');
