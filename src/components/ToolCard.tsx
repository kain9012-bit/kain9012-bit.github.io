import React from 'react';
import {
  BarChart3, BookOpen, Briefcase, Gamepad2, Landmark, Code, ExternalLink, FileSearch, MousePointer, Network, Newspaper,
  Presentation, Scale, School, Search, SpellCheck, Users, Video, Wrench,
} from 'lucide-react';
import type { Status, Tool } from '../types';
import { Badge } from './Ui';

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  'book-open': BookOpen, chart: BarChart3, briefcase: Briefcase, code: Code, 'file-search': FileSearch,
  'mouse-pointer': MousePointer, network: Network, newspaper: Newspaper,
  presentation: Presentation, scale: Scale, school: School, search: Search, 'spell-check': SpellCheck,
  users: Users, video: Video, landmark: Landmark, game: Gamepad2,
};

/** 카드형 한 줄. 아이콘 | 이름 | 설명 | 단계 | 열기 */
export const ToolRow: React.FC<{ tool: Tool; status?: Status }> = ({ tool, status }) => {
  const Icon = ICONS[tool.icon] ?? Wrench;
  return (
    <li className="card min-w-0">
      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="trow">
        <span className="ic"><Icon className="w-[22px] h-[22px]" aria-hidden="true" /></span>

        {/* 넓은 화면: 이름 | 설명 가로 배치. 휴대폰: 위아래로 쌓는다 */}
        <span className="flex-1 min-w-0 md:grid md:grid-cols-[17rem_minmax(0,1fr)] md:gap-x-6 md:items-center">
          <span className="flex items-center gap-2 flex-wrap">
            <span className="nm">{tool.name}</span>
            {tool.badge && <Badge tone={tool.badge.tone}>{tool.badge.label}</Badge>}
          </span>
          <span className="ds block mt-1 md:mt-0">{tool.desc}</span>
        </span>

        {status && <Badge tone={status.tone}>{status.label}</Badge>}
        <span className="go">
          열기 <ExternalLink className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">(새 창)</span>
        </span>
      </a>
    </li>
  );
};
