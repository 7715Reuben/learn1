import { Handle, NodeProps, Position } from 'reactflow';
import { NodeData } from '../data/seed';

const artByTheme = {
  Greetings: { emoji: '🏝️', color: 'from-emerald-300 via-green-300 to-lime-300' },
  Introductions: { emoji: '🛶', color: 'from-orange-300 via-amber-300 to-yellow-300' },
  Goodbyes: { emoji: '🌙', color: 'from-violet-300 via-indigo-300 to-sky-300' }
};

export default function IslandNode({ data, selected }: NodeProps<NodeData>) {
  const theme = artByTheme[data.theme];
  const size = 120 + Math.round(data.reinforcement * 36);

  return (
    <div className={`cq-node ${selected ? 'cq-node-selected' : ''}`} style={{ width: size, height: size }}>
      <Handle type="target" position={Position.Left} className="cq-handle" />
      <div className={`cq-surface bg-gradient-to-br ${theme.color}`}>
        <span className="cq-emoji">{theme.emoji}</span>
        <p className="cq-title">{data.label}</p>
        <p className="cq-sub">{data.description}</p>
      </div>
      <Handle type="source" position={Position.Right} className="cq-handle" />
      <div className="cq-drop" />
    </div>
  );
}
