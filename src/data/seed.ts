import { Edge, Node } from 'reactflow';

export type Level = 'Starter' | 'Growing' | 'Confident';

export interface NodeData {
  label: string;
  description: string;
  level: Level;
  theme: 'Greetings' | 'Introductions' | 'Goodbyes';
  reinforcement: number;
  lastReview: string;
}

export interface ConnectionData {
  strength: number;
  type: 'Bridge' | 'Path' | 'Tunnel';
  notes: string;
}

const now = new Date().toISOString();

export const seedNodes: Node<NodeData>[] = [
  { id: 'hola', position: { x: 60, y: 90 }, data: { label: 'Hola', description: 'Hello', level: 'Starter', theme: 'Greetings', reinforcement: 0.82, lastReview: now } },
  { id: 'buenos-dias', position: { x: 300, y: 30 }, data: { label: 'Buenos días', description: 'Good morning', level: 'Growing', theme: 'Greetings', reinforcement: 0.71, lastReview: now } },
  { id: 'me-llamo', position: { x: 560, y: 80 }, data: { label: 'Me llamo…', description: 'My name is…', level: 'Starter', theme: 'Introductions', reinforcement: 0.67, lastReview: now } },
  { id: 'mucho-gusto', position: { x: 780, y: 200 }, data: { label: 'Mucho gusto', description: 'Nice to meet you', level: 'Growing', theme: 'Introductions', reinforcement: 0.64, lastReview: now } },
  { id: 'adios', position: { x: 500, y: 290 }, data: { label: 'Adiós', description: 'Goodbye', level: 'Starter', theme: 'Goodbyes', reinforcement: 0.58, lastReview: now } }
];

export const seedEdges: Edge<ConnectionData>[] = [
  { id: 'hola-dias', source: 'hola', target: 'buenos-dias', type: 'world', data: { strength: 0.82, type: 'Bridge', notes: 'Common greeting group.' } },
  { id: 'dias-llamo', source: 'buenos-dias', target: 'me-llamo', type: 'world', data: { strength: 0.72, type: 'Path', notes: 'Start chat then introduce yourself.' } },
  { id: 'llamo-gusto', source: 'me-llamo', target: 'mucho-gusto', type: 'world', data: { strength: 0.8, type: 'Bridge', notes: 'Natural conversation flow.' } },
  { id: 'gusto-adios', source: 'mucho-gusto', target: 'adios', type: 'world', data: { strength: 0.61, type: 'Tunnel', notes: 'Closing phrase.' } }
];
