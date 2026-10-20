import React from 'react';
import type { Tab } from '../types';
import { LayoutGrid } from 'lucide-react';
import { korDate } from '../lib/util';

export const TABS: { id: Tab; label: string }[] = [
  { id: 'tools', label: '업무 도구' },
  { id: 'lectures', label: '강의자료' },
  { id: 'videos', label: '소개 영상' },
];

export const Header: React.FC<{ updated: string; count: number; tab: Tab; setTab: (t: Tab) => void }> = ({
  updated, count, tab, setTab,
}) => (
  <header className="bg-white sticky top-0 z-30 border-b border-slate-200">
    {/* 안내 띠 — 공식 서비스가 아니라는 것을 먼저 밝힌다 */}
    <div className="bg-slate-50 text-slate-600 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs">
        <span>
          직접 만들어 운영하는 <strong className="font-bold text-slate-900">비공식</strong> 도구입니다 ·
          각 도구의 자료는 원 출처로 확인하세요
        </span>
        <span className="shrink-0 tabular-nums">
          도구 {count}개 · {korDate(updated)} 기준
        </span>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-x-6">
      <a href="./" className="inline-flex items-center gap-2.5 py-3.5 group shrink-0">
        <span className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 group-hover:bg-blue-700 transition-colors">
          <LayoutGrid className="w-5 h-5" aria-hidden="true" />
        </span>
        <span className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-slate-900 whitespace-nowrap">업무 개선 프로젝트</span>
          <span className="hidden sm:inline text-xs font-medium text-slate-400 whitespace-nowrap">
            전북특별자치도교육청
          </span>
        </span>
      </a>

      <nav aria-label="주 메뉴" className="-mb-px w-full sm:w-auto">
        <ul className="flex overflow-x-auto overflow-y-hidden no-scrollbar" role="tablist">
          {TABS.map(({ id, label }) => {
            const on = tab === id;
            return (
              <li key={id} role="presentation" className="shrink-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setTab(id)}
                  className={`px-3.5 sm:px-4 py-4 text-base font-bold whitespace-nowrap border-b-[3px] transition-colors ${
                    on ? 'text-blue-700 border-blue-600' : 'text-slate-600 border-transparent hover:text-slate-900'
                  }`}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  </header>
);
