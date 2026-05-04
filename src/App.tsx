import { Background, Controls, MiniMap, ReactFlow, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import Dashboard from './components/Dashboard';
import DetailPanel from './components/DetailPanel';
import IslandNode from './components/IslandNode';
import WorldEdge from './components/WorldEdge';
import { useKnowledgeStore } from './store/useKnowledgeStore';

const nodeTypes = { island: IslandNode };
const edgeTypes = { world: WorldEdge };

import { useKnowledgeStore } from './store/useKnowledgeStore';

function App() {
  const { nodes, edges, setNodes, setEdges, onConnect, selectNode, selectEdge } = useKnowledgeStore();

  return (
    <div className="world-bg relative grid h-screen grid-cols-[330px_1fr] text-white">
      <aside className="m-4 flex flex-col gap-4 rounded-[28px] bg-white/15 p-5 backdrop-blur-md">
        <h1 className="text-2xl font-extrabold">🌍 Knowledge World</h1>
        <p className="text-sm text-white/85">Explora y fortalece tu ecosistema de conocimiento vivo.</p>
        <Dashboard />
        <DetailPanel />
      </aside>
      <main className="m-4 rounded-[30px] bg-[#20335e66] backdrop-blur-sm">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
    <div className="grid h-screen grid-cols-[320px_1fr] bg-slate-950 text-slate-100">
      <aside className="flex flex-col gap-4 border-r border-slate-800 p-4">
        <h1 className="text-xl font-bold">Knowledge Islands</h1>
        <p className="text-xs text-slate-400">Mapa de conocimiento personal con decaimiento y refuerzo.</p>
        <Dashboard />
        <DetailPanel />
      </aside>
      <main>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={(changes) => setNodes(applyNodeChanges(changes, nodes))}
          onEdgesChange={(changes) => setEdges(applyEdgeChanges(changes, edges))}
          onConnect={onConnect}
          onNodeClick={(_, node) => selectNode(node.id)}
          onEdgeClick={(_, edge) => selectEdge(edge.id)}
          onPaneClick={() => {
            selectNode(undefined);
            selectEdge(undefined);
          }}
          fitView
          defaultEdgeOptions={{ type: 'world' }}
        >
          <MiniMap className="!rounded-3xl !bg-white/80" pannable zoomable />
          <Controls className="!rounded-3xl !border-none !bg-white/75" />
          <Background color="rgba(255,255,255,0.16)" gap={38} size={2} />
        >
          <MiniMap className="!bg-slate-900" pannable zoomable />
          <Controls />
          <Background color="#334155" gap={16} />
        </ReactFlow>
      </main>
    </div>
  );
}

export default App;
