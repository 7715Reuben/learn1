import { EdgeLabelRenderer, EdgeProps, getBezierPath } from 'reactflow';
import { ConnectionData } from '../data/seed';

export default function WorldEdge({ sourceX, sourceY, targetX, targetY, data }: EdgeProps<ConnectionData>) {
  const [path, labelX, labelY] = getBezierPath({ sourceX, sourceY, targetX, targetY, curvature: 0.42 });
  const type = data?.type ?? 'Path';
  const strength = data?.strength ?? 0.5;

  const styleClass = type === 'Bridge' ? 'cq-edge-bridge' : type === 'Tunnel' ? 'cq-edge-tunnel' : 'cq-edge-path';

  return (
    <>
      <path d={path} fill="none" className={`cq-edge ${styleClass} ${strength > 0.75 ? 'cq-edge-strong' : ''} ${strength < 0.4 ? 'cq-edge-weak' : ''}`} />
      <EdgeLabelRenderer>
        <div className="cq-edge-tag" style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}>{type}</div>
      </EdgeLabelRenderer>
    </>
  );
}
