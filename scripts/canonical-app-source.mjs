export const canonicalAppSource = `import { ReactFlow, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import AtlasControls from './components/AtlasControls';
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
    <div className="world-bg relative grid h-screen grid-cols-[360px_1fr] overflow-hidden text-[#14324d]">
      <div className="ocean-layer ocean-deep" />
      <div className="ocean-layer ocean-shimmer" />
      <div className="fog-layer fog-left" />
      <div className="fog-layer fog-right" />
      <div className="cloud cloud-one" />
      <div className="cloud cloud-two" />
      <div className="bird-flock">⌁ ⌁ ⌁</div>
      <div className="distant-island distant-one" />
      <div className="distant-island distant-two" />

      <aside className="atlas-sidebar relative z-10 m-4 flex flex-col gap-3 p-5">
        <div className="atlas-heading">
          <span className="atlas-seal">✦</span>
          <div>
            <h1>Knowledge Isles</h1>
            <p>Day-1 Spanish memory atlas</p>
          </div>
        </div>
        <Dashboard />
        <DetailPanel />
      </aside>

      <main className="map-window relative z-10 m-4 overflow-hidden p-2">
        <div className="map-vignette" />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={{ type: 'world' }}
          panOnScroll
          selectionOnDrag={false}
          zoomOnScroll
          zoomOnPinch
          onNodesChange={(changes) => setNodes(applyNodeChanges(changes, nodes))}
          onEdgesChange={(changes) => setEdges(applyEdgeChanges(changes, edges))}
          onConnect={onConnect}
          onNodeClick={(_, n) => selectNode(n.id)}
          onEdgeClick={(_, e) => selectEdge(e.id)}
          onPaneClick={() => {
            selectNode(undefined);
            selectEdge(undefined);
          }}
          fitView
          fitViewOptions={{ padding: 0.28, duration: 850 }}
          minZoom={0.42}
          maxZoom={1.65}
        >
          <AtlasControls />
        </ReactFlow>
      </main>
    </div>
  );
}
`;
