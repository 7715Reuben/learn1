import { useKnowledgeStore, useSelectedEdge, useSelectedNode } from '../store/useKnowledgeStore';

export default function DetailPanel() {
  const node = useSelectedNode();
  const edge = useSelectedEdge();
  const { reinforceNode, upgradeNode, updateNodeDescription, updateEdgeNotes } = useKnowledgeStore();

  if (!node && !edge) return <div className="panel-card">Click an island or route to inspect it.</div>;

  if (node) return <div className="panel-card"><h3>{node.data.label}</h3><p>{node.data.theme} • {node.data.level}</p>
    <textarea value={node.data.description} onChange={(e)=>updateNodeDescription(node.id,e.target.value)} />
    <p>Reinforcement: {Math.round(node.data.reinforcement*100)}%</p>
    <div className="btn-row"><button className="world-btn" onClick={()=>reinforceNode(node.id)}>Reinforce</button><button className="world-btn ghost" onClick={()=>upgradeNode(node.id)}>Upgrade</button></div>
  </div>;

  return <div className="panel-card"><h3>Route</h3><p>{edge!.data?.type} • Strength {Math.round((edge!.data?.strength ?? 0)*100)}%</p>
    <textarea value={edge!.data?.notes ?? ''} onChange={(e)=>updateEdgeNotes(edge!.id,e.target.value)} />
  </div>;
}
