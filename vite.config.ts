import { readFileSync, writeFileSync } from 'node:fs';
import { normalize, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { canonicalAppSource } from './scripts/canonical-app-source.mjs';

function canonicalAppShellPlugin(): Plugin {
  const appPath = resolve(process.cwd(), 'src/App.tsx');
  const normalizedAppPath = normalize(appPath);

  const restoreAppShell = () => {
    const source = readFileSync(appPath, 'utf8');

    if (source !== canonicalAppSource) {
      writeFileSync(appPath, canonicalAppSource);
      console.log('[knowledge-islands] Restored src/App.tsx before Vite parsed it.');
    }
  };

  return {
    name: 'knowledge-islands-canonical-app-shell',
    enforce: 'pre',
    buildStart() {
      restoreAppShell();
    },
    configureServer(server) {
      restoreAppShell();

      server.watcher.on('change', (changedPath) => {
        if (normalize(changedPath) === normalizedAppPath) {
          restoreAppShell();
        }
      });
    },
    transform(_code, id) {
      if (normalize(id.split('?')[0]) === normalizedAppPath) {
        restoreAppShell();
        return {
          code: canonicalAppSource,
          map: null
        };
      }

      return null;
    }
  };
}

export default defineConfig({
  plugins: [canonicalAppShellPlugin(), react()]
});
