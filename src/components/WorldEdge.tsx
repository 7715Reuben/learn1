import { EdgeLabelRenderer, EdgeProps, getBezierPath } from 'reactflow';
import { ConnectionData } from '../data/seed';

export default function WorldEdge({ sourceX, sourceY, targetX, targetY, data }: EdgeProps<ConnectionData>) {
  const [path, labelX, labelY] = getBezierPath({ sourceX, sourceY, targetX, targetY, curvature: 0.48 });
  const type = data?.type ?? 'Path';
  const strength = data?.strength ?? 0.5;
  const health = strength > 0.75 ? 'route-strong' : strength < 0.42 ? 'route-weak' : 'route-steady';
  const routeClass = type === 'Bridge' ? 'route-bridge' : type === 'Tunnel' ? 'route-tunnel' : 'route-boat';

  return (
    <>
      <path d={path} fill="none" className={`route-shadow ${routeClass}`} />
      <path d={path} fill="none" className={`route-base ${routeClass} ${health}`} />
      {type === 'Bridge' && <path d={path} fill="none" className={`bridge-planks ${health}`} />}
      {type === 'Path' && <path d={path} fill="none" className={`wake-trail ${health}`} />}
      {type === 'Tunnel' && <path d={path} fill="none" className={`tunnel-glow ${health}`} />}
      <EdgeLabelRenderer>
        <div className="route-layer" style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}>
          {type === 'Path' && <span className={`tiny-boat ${health}`} />}
          {type === 'Bridge' && (
            <span className={`bridge-posts ${health}`}>
              <i />
              <i />
              <i />
            </span>
          )}
          {type === 'Tunnel' && (
            <span className={`tunnel-dust ${health}`}>
              <i />
              <i />
              <i />
            </span>
          )}
          <div className={`route-sign ${routeClass} ${health}`}>{type}</div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
