export type Tone = 'blue' | 'slate' | 'amber' | 'green' | 'red';

export interface Status {
  id: string;
  label: string;
  tone: Tone;
  desc: string;
}

export interface Category {
  id: string;
  label: string;
  desc: string;
}

export interface Tool {
  id: string;
  category: string;
  status: string;
  name: string;
  desc: string;
  url: string;
  badge?: { label: string; tone: Tone };
}

export interface Catalog {
  updated: string;
  statuses: Status[];
  categories: Category[];
  tools: Tool[];
}
