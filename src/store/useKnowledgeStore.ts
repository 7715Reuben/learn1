import { create } from 'zustand';
import { Connection, Edge, Node, addEdge } from 'reactflow';
import { ConexionData, NodoData, seedEdges, seedNodes } from '../data/seed';

const STORAGE_KEY = 'knowledge-islands-v1';

interface State {
  nodes: Node<NodoData>[];
  edges: Edge<ConexionData>[];
  selectedNodeId?: string;
  selectedEdgeId?: string;
  tick: () => void;
  reinforceNode: (nodeId: string) => void;
  upgradeNode: (nodeId: string) => void;
  updateNodeDescription: (nodeId: string, descripcion: string) => void;
  updateEdgeNotes: (edgeId: string, notas: string) => void;
  setNodes: (nodes: Node<NodoData>[]) => void;
  setEdges: (edges: Edge<ConexionData>[]) => void;
  onConnect: (connection: Connection) => void;
  selectNode: (nodeId?: string) => void;
  selectEdge: (edgeId?: string) => void;
}

const niveles: NodoData['nivel'][] = ['Básico', 'Intermedio', 'Avanzado', 'Experto'];

const hydrate = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return { nodes: seedNodes, edges: seedEdges };
  }

  try {
    return JSON.parse(saved) as Pick<State, 'nodes' | 'edges'>;
  } catch {
    return { nodes: seedNodes, edges: seedEdges };
  }
};

export const useKnowledgeStore = create<State>((set) => ({
  ...hydrate(),
  tick: () =>
    set((state) => ({
      nodes: state.nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          refuerzo: Math.max(0, node.data.refuerzo - 0.04)
        }
      })),
      edges: state.edges.map((edge) => ({
        ...edge,
        data: {
          ...edge.data!,
          fortaleza: Math.max(0.1, edge.data!.fortaleza - 0.03)
        }
      }))
    })),
  reinforceNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                refuerzo: Math.min(1, node.data.refuerzo + 0.2),
                ultimaRevision: new Date().toISOString()
              }
            }
          : node
      ),
      edges: state.edges.map((edge) =>
        edge.source === nodeId || edge.target === nodeId
          ? { ...edge, data: { ...edge.data!, fortaleza: Math.min(1, edge.data!.fortaleza + 0.08) } }
          : edge
      )
    })),
  upgradeNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id !== nodeId) return node;
        const current = niveles.indexOf(node.data.nivel);
        const next = Math.min(niveles.length - 1, current + 1);
        return {
          ...node,
          data: {
            ...node.data,
            nivel: niveles[next],
            refuerzo: Math.max(node.data.refuerzo, 0.75)
          }
        };
      })
    })),
  updateNodeDescription: (nodeId, descripcion) =>
    set((state) => ({
      nodes: state.nodes.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, descripcion } } : n))
    })),
  updateEdgeNotes: (edgeId, notas) =>
    set((state) => ({
      edges: state.edges.map((e) => (e.id === edgeId ? { ...e, data: { ...e.data!, notas } } : e))
    })),
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge(
        {
          ...connection,
          id: `${connection.source}-${connection.target}-${Date.now()}`,
          data: { fortaleza: 0.5, tipo: 'Complementaria', notas: 'Nueva conexión.' }
        },
        state.edges
      )
    })),
  selectNode: (selectedNodeId) => set({ selectedNodeId, selectedEdgeId: undefined }),
  selectEdge: (selectedEdgeId) => set({ selectedEdgeId, selectedNodeId: undefined })
}));

useKnowledgeStore.subscribe((state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes: state.nodes, edges: state.edges }));
});

export const useSelectedNode = () => {
  const { nodes, selectedNodeId } = useKnowledgeStore();
  return nodes.find((n) => n.id === selectedNodeId);
};

export const useSelectedEdge = () => {
  const { edges, selectedEdgeId } = useKnowledgeStore();
  return edges.find((e) => e.id === selectedEdgeId);
};
