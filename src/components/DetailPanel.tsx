import { useSelectedEdge, useSelectedNode, useKnowledgeStore } from '../store/useKnowledgeStore';

export default function DetailPanel() {
  const node = useSelectedNode();
  const edge = useSelectedEdge();
  const { reinforceNode, upgradeNode, updateNodeDescription, updateEdgeNotes } = useKnowledgeStore();

  if (!node && !edge) {
    return <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4 text-sm text-slate-400">Selecciona un nodo o conexión.</div>;
  }

  if (node) {
    return (
      <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-900/80 p-4">
        <h3 className="text-sm font-semibold text-white">Detalle de Isla</h3>
        <p className="text-xs text-slate-400">{node.data.label} · {node.data.dominio}</p>
        <textarea
          className="h-24 w-full rounded-md border border-slate-700 bg-slate-950 p-2 text-xs text-slate-200"
          value={node.data.descripcion}
          onChange={(e) => updateNodeDescription(node.id, e.target.value)}
        />
        <p className="text-xs text-slate-300">Nivel: <span className="font-semibold">{node.data.nivel}</span></p>
        <p className="text-xs text-slate-300">Refuerzo: {Math.round(node.data.refuerzo * 100)}%</p>
        <div className="flex gap-2">
          <button onClick={() => reinforceNode(node.id)} className="rounded bg-emerald-500 px-2 py-1 text-xs font-semibold text-slate-950">Reforzar</button>
          <button onClick={() => upgradeNode(node.id)} className="rounded bg-sky-500 px-2 py-1 text-xs font-semibold text-slate-950">Subir nivel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-900/80 p-4">
      <h3 className="text-sm font-semibold text-white">Detalle de Conexión</h3>
      <p className="text-xs text-slate-300">Tipo: {edge!.data?.tipo}</p>
      <p className="text-xs text-slate-300">Fortaleza: {Math.round((edge!.data?.fortaleza ?? 0) * 100)}%</p>
      <textarea
        className="h-24 w-full rounded-md border border-slate-700 bg-slate-950 p-2 text-xs text-slate-200"
        value={edge!.data?.notas ?? ''}
        onChange={(e) => updateEdgeNotes(edge!.id, e.target.value)}
      />
    </div>
  );
}
