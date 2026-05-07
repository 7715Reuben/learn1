import { useReactFlow } from 'reactflow';

export default function AtlasControls() {
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  return (
    <div className="atlas-controls" aria-label="Map controls">
      <button type="button" onClick={() => zoomIn({ duration: 350 })} aria-label="Zoom in">
        +
      </button>
      <button type="button" onClick={() => zoomOut({ duration: 350 })} aria-label="Zoom out">
        −
      </button>
      <button type="button" onClick={() => fitView({ duration: 650, padding: 0.25 })} aria-label="Center map">
        ◉
      </button>
    </div>
  );
}
