import { readFileSync, writeFileSync } from 'node:fs';

const appPath = new URL('../src/App.tsx', import.meta.url);
const source = readFileSync(appPath, 'utf8');
const canonicalImport = "import { useKnowledgeStore } from './store/useKnowledgeStore';";
const storeImportPattern = /^\s*import\s*\{\s*useKnowledgeStore\s*\}\s*from\s*['"]\.\/store\/useKnowledgeStore['"];?\s*$/;

const lines = source.split('\n');
const withoutStoreImports = lines.filter((line) => !storeImportPattern.test(line));
const lastImportIndex = withoutStoreImports.findLastIndex((line) => line.startsWith('import '));

if (lastImportIndex === -1) {
  throw new Error('Could not find import block in src/App.tsx');
}

withoutStoreImports.splice(lastImportIndex + 1, 0, canonicalImport);
const nextSource = withoutStoreImports.join('\n').replace(/\n{3,}/g, '\n\n');

if (nextSource === source) {
  console.log('src/App.tsx already has a clean useKnowledgeStore import.');
} else {
  writeFileSync(appPath, nextSource);
  console.log('Fixed duplicate/misplaced useKnowledgeStore imports in src/App.tsx.');
}
