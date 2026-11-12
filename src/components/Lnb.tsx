import React from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import type { Tab } from '../types';
import { TABS_AFTER, TABS_BEFORE, TOOL_ROOM } from './Header';

export interface LnbSub { id: string; label: string; count?: number }

/** 왼쪽 메뉴 — 파란 제목 카드 + 흰 메뉴 카드(활성은 남색).
 *  하위 메뉴가 있는 메뉴(AI 콘텐츠)만 활성일 때 아래에 하위 메뉴를 펼친다. 하위 메뉴를 누르면 그 화면만 보인다. */
export const Lnb: React.FC<{
  tab: Tab; setTab: (t: Tab) => void; subs: LnbSub[]; sub?: string; setSub: (id: string) => void;
}> = ({ tab, setTab, subs, sub, setSub }) => {
  const item = (t: { id: Tab; label: string }) => {
    const on = tab === t.id;
    return (
      <li key={t.id}>
        <button type="button" className={`lnb-item ${on ? 'on' : ''}`} aria-current={on && !subs.length ? 'page' : undefined}
          onClick={() => setTab(t.id)}>
          {t.label}
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
        {on && subs.length > 0 && (
          <ul className="lnb-sub">
            {subs.map((s) => (
              <li key={s.id}>
                <button type="button" className={sub === s.id ? 'on' : ''} aria-current={sub === s.id ? 'page' : undefined}
                  onClick={() => setSub(s.id)}>
                  <span aria-hidden="true">•</span>
                  <span className="l">{s.label}</span>
                  {s.count !== undefined && <span className="n tabular-nums">{s.count}</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside className="lnb" aria-label="메뉴">
      <h2>
        <span className="t nr-title">업무 개선 프로젝트</span>
        <span className="s">직접 만든 업무지원 도구</span>
      </h2>
      <ul>
        {TABS_BEFORE.map(item)}
        <li>
          <a href={TOOL_ROOM} target="_blank" rel="noopener noreferrer" className="lnb-item">
            데이터 도구실
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">(새 창)</span>
          </a>
        </li>
        {TABS_AFTER.map(item)}
      </ul>
    </aside>
  );
};
