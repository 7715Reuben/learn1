import { Edge, Node } from 'reactflow';

export type Nivel = 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';

export interface NodoData {
  label: string;
  descripcion: string;
  nivel: Nivel;
  dominio: string;
  refuerzo: number;
  ultimaRevision: string;
}

export interface ConexionData {
  fortaleza: number;
  tipo: 'Prerequisito' | 'Complementaria' | 'Aplicación';
  notas: string;
}

const hoy = new Date().toISOString();

export const seedNodes: Node<NodoData>[] = [
  {
    id: 'js',
    position: { x: 0, y: 80 },
    data: {
      label: 'JavaScript',
      descripcion: 'Base del lenguaje para web moderna.',
      nivel: 'Intermedio',
      dominio: 'Frontend',
      refuerzo: 0.7,
      ultimaRevision: hoy
    }
  },
  {
    id: 'ts',
    position: { x: 250, y: 20 },
    data: {
      label: 'TypeScript',
      descripcion: 'Tipado estático y tooling para escalar proyectos.',
      nivel: 'Intermedio',
      dominio: 'Frontend',
      refuerzo: 0.6,
      ultimaRevision: hoy
    }
  },
  {
    id: 'react',
    position: { x: 520, y: 80 },
    data: {
      label: 'React',
      descripcion: 'Construcción declarativa de interfaces.',
      nivel: 'Avanzado',
      dominio: 'Frontend',
      refuerzo: 0.55,
      ultimaRevision: hoy
    }
  },
  {
    id: 'estado',
    position: { x: 520, y: 250 },
    data: {
      label: 'Gestión de Estado',
      descripcion: 'Patrones para sincronizar datos de UI.',
      nivel: 'Intermedio',
      dominio: 'Arquitectura',
      refuerzo: 0.5,
      ultimaRevision: hoy
    }
  }
];

export const seedEdges: Edge<ConexionData>[] = [
  {
    id: 'js-ts',
    source: 'js',
    target: 'ts',
    data: { fortaleza: 0.8, tipo: 'Complementaria', notas: 'TS extiende JS.' }
  },
  {
    id: 'ts-react',
    source: 'ts',
    target: 'react',
    data: { fortaleza: 0.7, tipo: 'Aplicación', notas: 'React + TS para robustez.' }
  },
  {
    id: 'react-estado',
    source: 'react',
    target: 'estado',
    data: { fortaleza: 0.65, tipo: 'Prerequisito', notas: 'Comprender hooks y ciclo.' }
  }
];
