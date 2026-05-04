import { Background, Controls, MiniMap, ReactFlow, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import Dashboard from './components/Dashboard';
import DetailPanel from './components/DetailPanel';
import { useKnowledgeStore } from './store/useKnowledgeStore';

function App() {
  const { nodes, edges, setNodes, setEdges, onConnect, selectNode, selectEdge } = useKnowledgeStore();

  return (
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
