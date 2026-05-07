# Knowledge Islands (MVP)

Aplicación visual para mapear conocimiento como islas conectadas. Construida con **React + TypeScript + Vite + Tailwind + Zustand + React Flow**.

## Funcionalidades del MVP

- **Islas (nodos) interactivas** con nivel, dominio, descripción, refuerzo y fecha de revisión.
- **Conexiones (edges) interactivas** con tipo, fortaleza y notas.
- **Edición en caliente**:
  - Seleccionar nodo/conexión para ver su detalle.
  - Editar descripción de nodo.
  - Editar notas de conexión.
- **Lógica de aprendizaje**:
  - **Decaimiento** manual (simulación) para nodos y conexiones.
  - **Refuerzo** de nodos (sube refuerzo y fortalece conexiones relacionadas).
  - **Upgrade** de nivel del nodo (Básico → Intermedio → Avanzado → Experto).
- **Persistencia local** con `localStorage`.
- **Dashboard + Sidebar** con métricas del estado de la red.
- **Datos semilla en español** para iniciar rápidamente.

## Ejecutar

```bash
npm install
npm run dev
```

Abre: `http://localhost:5173`

## Preview de producción

```bash
npm run build
npm run preview
```

Abre: `http://localhost:4173`

## Solución rápida si "localhost refused to connect"

1. Asegúrate de que **el comando siga corriendo** en una terminal (si se cierra, el puerto muere).
2. Revisa que estés usando el puerto correcto:
   - `dev` → `5173`
   - `preview` → `4173`
3. Vuelve a levantar preview:

```bash
npm run build
npm run preview
```

4. Si tienes Docker/WSL/remoto, usar `--host 0.0.0.0` (ya configurado en scripts) permite exponer el servidor correctamente.

## Decisiones de producto

1. Decaimiento manual desde dashboard.
2. Escala 0-1 para refuerzo/fortaleza.
3. Refuerzo relacional (nodo + conexiones vecinas).
4. Panel único de detalle para nodo/conexión.
5. Persistencia automática por suscripción de Zustand.
