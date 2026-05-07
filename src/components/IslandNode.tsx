import { Handle, NodeProps, Position } from 'reactflow';
import { NodoData } from '../data/seed';

const domainPalette: Record<string, string> = {
  Frontend: 'from-fuchsia-400 via-pink-400 to-rose-500',
  Arquitectura: 'from-sky-400 via-cyan-300 to-emerald-400',
  Backend: 'from-violet-500 via-indigo-400 to-sky-400'
};

export default function IslandNode({ data, selected }: NodeProps<NodoData>) {
  const size = 110 + Math.round(data.refuerzo * 50);
  const gradient = domainPalette[data.dominio] ?? 'from-amber-300 via-orange-300 to-rose-400';

  return (
    <div className={`island-node ${selected ? 'island-selected' : ''}`} style={{ width: size, height: size }}>
      <Handle type="target" position={Position.Left} className="island-handle" />
      <div className={`island-surface bg-gradient-to-br ${gradient}`}>
        <div className="island-cloud" />
        <p className="island-title">{data.label}</p>
        <p className="island-level">{data.nivel}</p>
      </div>
      <Handle type="source" position={Position.Right} className="island-handle" />
      <div className="island-shadow" />
    </div>
  );
}
