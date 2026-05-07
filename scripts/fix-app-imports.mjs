import { readFileSync, writeFileSync } from 'node:fs';

const appPath = new URL('../src/App.tsx', import.meta.url);
const source = readFileSync(appPath, 'utf8');
const importLine = "import { useKnowledgeStore } from './store/useKnowledgeStore';";

const lines = source.split('\n');
const withoutStoreImports = lines.filter((line) => line.trim() !== importLine);
const lastImportIndex = withoutStoreImports.findLastIndex((line) => line.startsWith('import '));

if (lastImportIndex === -1) {
  throw new Error('Could not find import block in src/App.tsx');
}

withoutStoreImports.splice(lastImportIndex + 1, 0, importLine);
const nextSource = withoutStoreImports.join('\n');

if (nextSource === source) {
  console.log('src/App.tsx already has a clean useKnowledgeStore import.');
} else {
  writeFileSync(appPath, nextSource);
  console.log('Fixed duplicate/misplaced useKnowledgeStore imports in src/App.tsx.');
}
