import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { korDate } from '../lib/util';

export const Header: React.FC<{ updated: string; count: number }> = ({ updated, count }) => (
  <header className="bg-white sticky top-0 z-30 border-b border-slate-200">
    {/* 안내 띠 — 공식 서비스가 아니라는 것을 먼저 밝힌다 */}
    <div className="bg-slate-50 text-slate-600 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs">
        <span>
          개인이 만들어 운영하는 <strong className="font-bold text-slate-900">비공식</strong> 도구 모음입니다 ·
          각 도구의 자료는 원 출처로 확인하세요
        </span>
        <span className="shrink-0 tabular-nums">
          도구 {count}개 · {korDate(updated)} 기준
        </span>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <a href="./" className="inline-flex items-center gap-2.5 py-3.5 group">
        <span className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 group-hover:bg-blue-700 transition-colors">
          <LayoutGrid className="w-5 h-5" aria-hidden="true" />
        </span>
        <span className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-slate-900 whitespace-nowrap">업무 웹도구 모음</span>
          <span className="hidden sm:inline text-xs font-medium text-slate-400 whitespace-nowrap">
            전북특별자치도교육청
          </span>
        </span>
      </a>
    </div>
  </header>
);
