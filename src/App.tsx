import { Background, Controls, MiniMap, ReactFlow, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import Dashboard from './components/Dashboard';
import DetailPanel from './components/DetailPanel';
import IslandNode from './components/IslandNode';
import WorldEdge from './components/WorldEdge';
import { useKnowledgeStore } from './store/useKnowledgeStore';

const nodeTypes = { island: IslandNode };
const edgeTypes = { world: WorldEdge };

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
        </ReactFlow>
      </main>
    </div>
  );
}

export default App;
