import { useMemo } from 'react';
import { useKnowledgeStore } from '../store/useKnowledgeStore';

const avg = (values: number[]) => (values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0);

export default function Dashboard() {
  const { nodes, edges, tick } = useKnowledgeStore();

  const stats = useMemo(() => {
    const refuerzoMedio = avg(nodes.map((n) => n.data.refuerzo));
    const fortalezaMedia = avg(edges.map((e) => e.data?.fortaleza ?? 0));
    const riesgo = nodes.filter((n) => n.data.refuerzo < 0.35).length;
    return { refuerzoMedio, fortalezaMedia, riesgo };
  }, [nodes, edges]);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4">
      <h2 className="text-sm font-semibold text-slate-200">Dashboard</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-300">
        <Metric label="Islas" value={nodes.length.toString()} />
        <Metric label="Conexiones" value={edges.length.toString()} />
        <Metric label="Refuerzo" value={`${Math.round(stats.refuerzoMedio * 100)}%`} />
        <Metric label="Fortaleza" value={`${Math.round(stats.fortalezaMedia * 100)}%`} />
        <Metric label="En riesgo" value={stats.riesgo.toString()} />
      </div>
      <button
        onClick={tick}
        className="mt-4 w-full rounded-md bg-amber-500 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400"
      >
        Simular decaimiento
      </button>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-800 p-2">
      <p className="text-slate-400">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
