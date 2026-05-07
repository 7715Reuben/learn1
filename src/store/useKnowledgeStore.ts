import { create } from 'zustand';
import { Connection, Edge, Node, addEdge } from 'reactflow';
import { ConnectionData, NodeData, seedEdges, seedNodes } from '../data/seed';

const STORAGE_KEY = 'knowledge-islands-v2';
interface State {
  nodes: Node<NodeData>[]; edges: Edge<ConnectionData>[]; selectedNodeId?: string; selectedEdgeId?: string;
  tick:()=>void; reinforceNode:(id:string)=>void; upgradeNode:(id:string)=>void;
  updateNodeDescription:(id:string,d:string)=>void; updateEdgeNotes:(id:string,n:string)=>void;
  setNodes:(nodes:Node<NodeData>[])=>void; setEdges:(edges:Edge<ConnectionData>[])=>void;
  onConnect:(c:Connection)=>void; selectNode:(id?:string)=>void; selectEdge:(id?:string)=>void;
}
const levels: NodeData['level'][] = ['Starter','Growing','Confident'];
const hydrate = (): { nodes: Node<NodeData>[]; edges: Edge<ConnectionData>[] } => { try { const s = localStorage.getItem(STORAGE_KEY); if (!s) return {nodes:seedNodes,edges:seedEdges}; return JSON.parse(s) as { nodes: Node<NodeData>[]; edges: Edge<ConnectionData>[] };} catch { return {nodes:seedNodes,edges:seedEdges}; }};
const initial = hydrate();

export const useKnowledgeStore = create<State>((set) => ({
  nodes: initial.nodes.map((n)=>({ ...n, type:'island'})),
  edges: initial.edges.map((e)=>({ ...e, type:'world'})),
  tick: ()=> set((s)=>({
    nodes: s.nodes.map((n)=>({ ...n, data:{ ...n.data, reinforcement: Math.max(0, n.data.reinforcement-0.05)}})),
    edges: s.edges.map((e)=>({ ...e, data:{ ...e.data!, strength: Math.max(0.1, e.data!.strength-0.04)}}))
  })),
  reinforceNode: (id)=> set((s)=>({
    nodes: s.nodes.map((n)=> n.id===id ? ({...n,data:{...n.data,reinforcement:Math.min(1,n.data.reinforcement+0.18),lastReview:new Date().toISOString()}}):n),
    edges: s.edges.map((e)=> e.source===id||e.target===id?({...e,data:{...e.data!,strength:Math.min(1,e.data!.strength+0.1)}}):e)
  })),
  upgradeNode: (id)=> set((s)=>({nodes:s.nodes.map((n)=>{ if(n.id!==id)return n; const i=levels.indexOf(n.data.level); return {...n,data:{...n.data,level:levels[Math.min(levels.length-1,i+1)],reinforcement:Math.max(n.data.reinforcement,0.75)}}; })})),
  updateNodeDescription: (id,d)=>set((s)=>({nodes:s.nodes.map((n)=>n.id===id?({...n,data:{...n.data,description:d}}):n)})),
  updateEdgeNotes: (id,n)=>set((s)=>({edges:s.edges.map((e)=>e.id===id?({...e,data:{...e.data!,notes:n}}):e)})),
  setNodes: (nodes)=>set({nodes}), setEdges:(edges)=>set({edges}),
  onConnect: (c)=>set((s)=>({edges:addEdge({...c,id:`${c.source}-${c.target}-${Date.now()}`,type:'world',data:{strength:0.5,type:'Path',notes:'New route'}},s.edges)})),
  selectNode:(id)=>set({selectedNodeId:id,selectedEdgeId:undefined}), selectEdge:(id)=>set({selectedEdgeId:id,selectedNodeId:undefined})
}));

useKnowledgeStore.subscribe((s)=>localStorage.setItem(STORAGE_KEY,JSON.stringify({nodes:s.nodes,edges:s.edges})));
export const useSelectedNode = ()=> { const {nodes,selectedNodeId}=useKnowledgeStore(); return nodes.find((n)=>n.id===selectedNodeId); };
export const useSelectedEdge = ()=> { const {edges,selectedEdgeId}=useKnowledgeStore(); return edges.find((e)=>e.id===selectedEdgeId); };
