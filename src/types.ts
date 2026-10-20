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
  icon: string;
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

export type Tab = 'tools' | 'lectures' | 'videos';

/** 강의자료실(ai-lecture-hub)의 lectures.js 항목 */
export interface Lecture {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  audience?: string;
  duration?: string;
  tags?: string[];
  summary?: string;
  files: { type: 'slides' | 'pdf' | 'zip' | 'link'; label: string; href: string; download?: string }[];
}
