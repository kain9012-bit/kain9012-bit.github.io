export type Tone = 'blue' | 'slate' | 'amber' | 'green' | 'red';

export interface Category {
  id: string;
  label: string;
  desc: string;
}

export interface Tool {
  id: string;
  category: string;
  icon: string;
  name: string;
  desc: string;
  url: string;
  badge?: { label: string; tone: Tone };
}

export interface Catalog {
  updated: string;
  categories: Category[];
  tools: Tool[];
}
