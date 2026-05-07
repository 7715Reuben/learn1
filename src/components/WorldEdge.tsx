import { EdgeLabelRenderer, EdgeProps, getBezierPath } from 'reactflow';
import { ConexionData } from '../data/seed';

export default function WorldEdge({ sourceX, sourceY, targetX, targetY, data }: EdgeProps<ConexionData>) {
  const [path, labelX, labelY] = getBezierPath({ sourceX, sourceY, targetX, targetY, curvature: 0.35 });
  const strength = data?.fortaleza ?? 0.5;
  const weak = strength < 0.35;
  const strong = strength > 0.75;
  const variant = data?.tipo ?? 'Complementaria';

  const classes =
    variant === 'Prerequisito'
      ? 'edge-burrow'
      : variant === 'Aplicación'
      ? 'edge-boat'
      : 'edge-bridge';

  return (
    <>
      <path d={path} fill="none" className={`world-edge ${classes} ${weak ? 'edge-weak' : ''} ${strong ? 'edge-strong' : ''}`} />
      <EdgeLabelRenderer>
        <div className="edge-label" style={{ transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)` }}>
          {variant}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
