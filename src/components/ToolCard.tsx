import React from 'react';
import {
  BookOpen, Briefcase, Code, ExternalLink, FileSearch, MousePointer, Network, Newspaper,
  Presentation, Scale, Search, SpellCheck, Users, Video, Wrench,
} from 'lucide-react';
import type { Status, Tool } from '../types';
import { Badge } from './Ui';
import { shortUrl } from '../lib/util';

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  'book-open': BookOpen, briefcase: Briefcase, code: Code, 'file-search': FileSearch,
  'mouse-pointer': MousePointer, network: Network, newspaper: Newspaper,
  presentation: Presentation, scale: Scale, search: Search, 'spell-check': SpellCheck,
  users: Users, video: Video,
};

/** 카드 안의 한 줄. 아이콘 | 이름·단계·설명·주소 | 열기 */
export const ToolRow: React.FC<{ tool: Tool; status?: Status }> = ({ tool, status }) => {
  const Icon = ICONS[tool.icon] ?? Wrench;
  return (
    <li className="min-w-0">
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 px-4 sm:px-5 py-4 min-w-0 hover:bg-slate-50 transition-colors"
      >
        <span className="hidden sm:flex w-10 h-10 rounded-lg bg-blue-50 text-blue-700 items-center justify-center shrink-0
                         group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </span>

        <span className="flex-1 min-w-0">
          <span className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
              {tool.name}
            </span>
            {status && <Badge tone={status.tone}>{status.label}</Badge>}
            {tool.badge && <Badge tone={tool.badge.tone}>{tool.badge.label}</Badge>}
          </span>
          <span className="block mt-0.5 text-sm text-slate-600">{tool.desc}</span>
          <span className="block mt-1 text-xs text-slate-400 truncate">{shortUrl(tool.url)}</span>
        </span>

        <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-700 group-hover:text-blue-700 shrink-0">
          <span className="hidden sm:inline">열기</span>
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">(새 창)</span>
        </span>
      </a>
    </li>
  );
};
