import { useMemo } from 'react';
import { useKnowledgeStore } from '../store/useKnowledgeStore';

const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

export default function Dashboard() {
  const { nodes, edges, tick } = useKnowledgeStore();
  const stats = useMemo(() => ({
    reinforcement: avg(nodes.map((n) => n.data.reinforcement)),
    connection: avg(edges.map((e) => e.data?.strength ?? 0)),
    fragile: nodes.filter((n) => n.data.reinforcement < 0.45).length
  }), [nodes, edges]);

  return <div className="panel-card"><h2>World Snapshot</h2><div className="metric-grid">
    <Metric label="Islands" value={`${nodes.length}`} />
    <Metric label="Routes" value={`${edges.length}`} />
    <Metric label="Memory" value={`${Math.round(stats.reinforcement*100)}%`} />
    <Metric label="Links" value={`${Math.round(stats.connection*100)}%`} />
    <Metric label="At Risk" value={`${stats.fragile}`} />
  </div><button className="world-btn" onClick={tick}>Advance a Day (Decay)</button></div>;
}

function Metric({ label, value }: {label:string; value:string}) { return <div className="metric-pill"><span>{label}</span><strong>{value}</strong></div>; }
