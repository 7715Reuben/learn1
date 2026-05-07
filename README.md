# Knowledge Islands (MVP)

A playful React learning-world prototype for **Day-1 Spanish**. The Spanish content is the curriculum; the app UI is in English.

The current curriculum is intentionally basic:

- Greetings: `Hola`, `Buenos días`
- Introductions: `Me llamo…`, `Mucho gusto`
- Goodbyes: `Adiós`

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- Zustand
- React Flow
- Framer Motion
- Node 20+

## Run in GitHub Codespaces

This repo includes a Codespaces/dev-container config that uses **Node 20** and forwards the Vite ports automatically.

If you just opened the Codespace after this file changed, choose **Rebuild Container** when Codespaces prompts you. If it does not prompt you, open the Command Palette and run:

```text
Codespaces: Rebuild Container
```

Then run:

```bash
npm install
npm run dev
```

Open the forwarded app:

1. In Codespaces, open the **Ports** tab.
2. Find port **5173**.
3. Click **Open in Browser**.

The dev script is already configured for Codespaces with `--host 0.0.0.0`.

## Important: use `npm`, not `nvm`

`nvm` manages Node versions. `npm` runs this app.

Do **not** run this:

```bash
nvm run dev
```

That command asks Node to run a file named `dev`, which causes this error:

```text
Error: Cannot find module '/workspaces/learn1/dev'
```

Use this instead:

```bash
npm run dev
```

If you typo `npm run ev`, this repo now includes a forgiving alias, but the correct command is still:

```bash
npm run dev
```

## Fix Node 16 / `crypto.getRandomValues` errors

If you see warnings like this:

```text
Unsupported engine ... current: { node: 'v16.20.2' }
```

or a Vite build error like this:

```text
TypeError: crypto$2.getRandomValues is not a function
```

your Codespace is running an old Node version. Fix it with either option:

### Option A: Rebuild the Codespace container (recommended)

Use the included dev container:

```text
Codespaces: Rebuild Container
```

Then verify:

```bash
node -v
npm run dev
```

You should see Node `v20...`.

### Option B: Use nvm to switch Node manually

```bash
nvm install 20
nvm use 20
node -v
npm install
npm run dev
```


## Fix duplicate import / merge artifact errors

If Vite shows this error:

```text
Identifier 'useKnowledgeStore' has already been declared
```

and points at `src/App.tsx` with an `import` around line 12, your local file has a bad merge artifact: the `useKnowledgeStore` import was inserted twice, once at the top and once below `const edgeTypes`.

The clean file should have **all imports at the top** and exactly one line like this:

```ts
import { useKnowledgeStore } from './store/useKnowledgeStore';
```

This repo now runs the repair automatically before `npm run dev`, `npm run build`, and `npm run preview`. In most cases you can just run:

```bash
npm run dev
```

If you want to run the repair explicitly:

```bash
npm run fix:app
npm run check
npm run dev
```

If that still fails, reset just that file:

```bash
git restore src/App.tsx
npm run check
npm run dev
```

If your Git version does not support `git restore`, use:

```bash
git checkout -- src/App.tsx
npm run check
npm run dev
```

After `npm run dev`, open **Ports → 5173 → Open in Browser**.

## Production-style preview

```bash
npm run build
npm run preview
```

Then open port **4173** from the Codespaces **Ports** tab.

## Useful commands

```bash
npm install      # install dependencies
npm run dev      # auto-repair App.tsx imports, then start the live dev server on port 5173
npm start        # alias for npm run dev
npm run ev       # typo-friendly alias for npm run dev
npm run build    # auto-repair App.tsx imports, then type-check and build production assets
npm run check    # alias for npm run build
npm run fix:app  # repair duplicate App.tsx import merge artifacts
npm run preview  # preview the production build on port 4173
```

## Product notes

- The app uses localStorage persistence, so your map can survive refreshes in the same browser.
- Learning mechanics include decay, reinforcement, upgrades, and route creation.
- The canvas still uses React Flow for interaction logic, but custom nodes and edges provide the playful island-world presentation.
- The visual direction is a magical atlas with animated ocean layers, fog, miniature island habitats, and physical route metaphors.
