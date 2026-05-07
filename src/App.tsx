import { Background, Controls, MiniMap, ReactFlow, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import Dashboard from './components/Dashboard';
import DetailPanel from './components/DetailPanel';
import IslandNode from './components/IslandNode';
import WorldEdge from './components/WorldEdge';
import { useKnowledgeStore } from './store/useKnowledgeStore';

const nodeTypes = { island: IslandNode };
const edgeTypes = { world: WorldEdge };

export default function App() {
  const { nodes, edges, setNodes, setEdges, onConnect, selectNode, selectEdge } = useKnowledgeStore();
  return (
    <div className="world-bg relative grid h-screen grid-cols-[340px_1fr] text-[#14324d]">
      <aside className="m-4 flex flex-col gap-3 rounded-[30px] bg-[#f8f6edcc] p-4">
        <h1 className="text-3xl font-extrabold">Knowledge Isles</h1>
        <p className="text-sm">Day-1 Spanish world: greetings, intros, and goodbyes.</p>
        <Dashboard />
        <DetailPanel />
      </aside>
      <main className="m-4 rounded-[34px] bg-[#d7efffcc] p-2">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={{ type: 'world' }}
          onNodesChange={(changes) => setNodes(applyNodeChanges(changes, nodes))}
          onEdgesChange={(changes) => setEdges(applyEdgeChanges(changes, edges))}
          onConnect={onConnect}
          onNodeClick={(_, n) => selectNode(n.id)}
          onEdgeClick={(_, e) => selectEdge(e.id)}
          onPaneClick={() => { selectNode(undefined); selectEdge(undefined); }}
          fitView
        >
          <MiniMap className="!rounded-[22px] !bg-[#fff8]" pannable zoomable />
          <Controls className="!rounded-[22px] !bg-[#fff8] !border-none" />
          <Background color="rgba(40,99,140,0.16)" gap={42} size={2} />
        </ReactFlow>
      </main>
    </div>
  );
}
