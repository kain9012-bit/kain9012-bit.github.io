import React from 'react';
import {
  BookOpen, Briefcase, Code, ExternalLink, FileSearch, MousePointer, Network, Newspaper,
  Presentation, Scale, Search, SpellCheck, Users, Video, Wrench,
} from 'lucide-react';
import type { Tool } from '../types';
import { Badge } from './Ui';
import { shortUrl } from '../lib/util';

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  'book-open': BookOpen,
  briefcase: Briefcase,
  code: Code,
  'file-search': FileSearch,
  'mouse-pointer': MousePointer,
  network: Network,
  newspaper: Newspaper,
  presentation: Presentation,
  scale: Scale,
  search: Search,
  'spell-check': SpellCheck,
  users: Users,
  video: Video,
};

export const ToolCard: React.FC<{ tool: Tool }> = ({ tool }) => {
  const Icon = ICONS[tool.icon] ?? Wrench;
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full min-w-0 bg-white rounded-lg border border-slate-200 p-5
                 hover:border-blue-600 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0
                         group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </span>
        {tool.badge && <Badge tone={tool.badge.tone}>{tool.badge.label}</Badge>}
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
        {tool.name}
      </h3>
      <p className="mt-1.5 text-sm text-slate-600 leading-relaxed flex-1">{tool.desc}</p>

      <p className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs text-slate-500">
        <span className="truncate min-w-0">{shortUrl(tool.url)}</span>
        <span className="inline-flex items-center gap-1 font-bold text-slate-700 group-hover:text-blue-700 shrink-0">
          열기
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="sr-only">(새 창)</span>
        </span>
      </p>
    </a>
  );
};
