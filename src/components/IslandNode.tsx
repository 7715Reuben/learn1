import { motion } from 'framer-motion';
import { CSSProperties } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { NodeData } from '../data/seed';

const artByTheme = {
  Greetings: {
    className: 'habitat-greetings',
    title: 'Tropical greeting isle'
  },
  Introductions: {
    className: 'habitat-introductions',
    title: 'Harbor of introductions'
  },
  Goodbyes: {
    className: 'habitat-goodbyes',
    title: 'Moonlit farewell cove'
  }
};

export default function IslandNode({ data, selected }: NodeProps<NodeData>) {
  const theme = artByTheme[data.theme];
  const size = 132 + Math.round(data.reinforcement * 44);
  const memoryState = data.reinforcement > 0.75 ? 'memory-strong' : data.reinforcement < 0.45 ? 'memory-fading' : 'memory-growing';

  return (
    <motion.div
      className={`cq-node ${theme.className} ${memoryState} ${selected ? 'cq-node-selected' : ''}`}
      style={{ width: size, height: size, '--memory': data.reinforcement } as CSSProperties}
      animate={{ y: selected ? [-3, -9, -3] : [0, -5, 0], rotate: selected ? [-1.5, 1.5, -1.5] : [-0.5, 0.5, -0.5] }}
      transition={{ duration: selected ? 2.4 : 4.8, repeat: Infinity, ease: 'easeInOut' }}
      title={theme.title}
    >
      <Handle type="target" position={Position.Left} className="cq-handle cq-handle-west" />
      <div className="island-aura" />
      <div className="shoreline" />
      <div className="cq-surface">
        <span className="terrain-grain" />
        <span className="terrain-hill hill-one" />
        <span className="terrain-hill hill-two" />
        <span className="terrain-path" />
        <span className="tiny-prop prop-primary" />
        <span className="tiny-prop prop-secondary" />
        <span className="memory-crystal" />
        <div className="nameplate">
          <p className="cq-title">{data.label}</p>
          <p className="cq-sub">{data.description}</p>
        </div>
      </div>
      <div className="memory-fog" />
      <Handle type="source" position={Position.Right} className="cq-handle cq-handle-east" />
      <div className="cq-drop" />
    </motion.div>
  );
}
