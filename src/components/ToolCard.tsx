import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { Status, Tool } from '../types';
import { Badge } from './Ui';
import { shortUrl } from '../lib/util';

/** 목록 한 줄. 넓은 화면에서는 이름·설명 | 상태 | 주소 세 칸, 휴대폰에서는 위아래로 쌓인다. */
export const ToolRow: React.FC<{ tool: Tool; status?: Status }> = ({ tool, status }) => (
  <li>
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid gap-x-6 gap-y-1.5 px-4 sm:px-5 py-3.5 min-w-0
                 sm:grid-cols-[minmax(0,1fr)_6.5rem_15rem] sm:items-center
                 hover:bg-slate-50 transition-colors"
    >
      <span className="min-w-0">
        <span className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-900 group-hover:text-blue-700 group-hover:underline underline-offset-4">
            {tool.name}
          </span>
          {tool.badge && <Badge tone={tool.badge.tone}>{tool.badge.label}</Badge>}
        </span>
        <span className="block mt-0.5 text-sm text-slate-600">{tool.desc}</span>
      </span>

      <span className="flex sm:justify-center">
        {status && <Badge tone={status.tone}>{status.label}</Badge>}
      </span>

      <span className="flex items-center gap-1.5 min-w-0 text-xs text-slate-500 group-hover:text-blue-700">
        <span className="truncate">{shortUrl(tool.url)}</span>
        <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span className="sr-only">(새 창)</span>
      </span>
    </a>
  </li>
);
