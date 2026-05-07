import { readFileSync, writeFileSync } from 'node:fs';
import { canonicalAppSource } from './canonical-app-source.mjs';

const appPath = new URL('../src/App.tsx', import.meta.url);
const source = readFileSync(appPath, 'utf8');

if (source === canonicalAppSource) {
  console.log('src/App.tsx already matches the canonical app shell.');
} else {
  writeFileSync(appPath, canonicalAppSource);
  console.log('Restored src/App.tsx to the canonical app shell.');
}
