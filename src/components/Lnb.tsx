import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import type { Tab } from '../types';
import { TABS_AFTER, TABS_BEFORE, TOOL_ROOM } from './Header';

export interface LnbSub { id: string; label: string; count?: number }

/** 왼쪽 메뉴 — 파란 제목 카드 + 흰 메뉴 카드(활성은 남색) + 활성 메뉴 아래 연한 바탕 하위 목록.
 *  하위 목록은 지금 화면의 구획으로 내려가고, 보고 있는 구획을 굵게 표시한다. 스크롤바·고정 없음. */
export const Lnb: React.FC<{ tab: Tab; setTab: (t: Tab) => void; subs: LnbSub[] }> = ({ tab, setTab, subs }) => {
  const [active, setActive] = useState(subs[0]?.id);

  useEffect(() => {
    const on = () => {
      let cur = subs[0]?.id;
      for (const s of subs) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < 160) cur = s.id;
      }
      setActive(cur);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [subs]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(id);
  };

  return (
    <aside className="lnb" aria-label="메뉴">
      <h2>
        <span className="t nr-title">업무 개선 프로젝트</span>
        <span className="s">직접 만든 업무지원 도구</span>
      </h2>
      <ul>
        {TABS_BEFORE.map((t) => {
          const on = tab === t.id;
          return (
            <li key={t.id}>
              <button type="button" className={`lnb-item ${on ? 'on' : ''}`} aria-current={on ? 'page' : undefined}
                onClick={() => setTab(t.id)}>
                {t.label}
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
              {on && subs.length > 0 && (
                <ul className="lnb-sub">
                  {subs.map((s) => (
                    <li key={s.id}>
                      <button type="button" className={active === s.id ? 'on' : ''} onClick={() => go(s.id)}>
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
        })}
        <li>
          <a href={TOOL_ROOM} target="_blank" rel="noopener noreferrer" className="lnb-item">
            데이터 도구실
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">(새 창)</span>
          </a>
        </li>
        {TABS_AFTER.map((t) => {
          const on = tab === t.id;
          return (
            <li key={t.id}>
              <button type="button" className={`lnb-item ${on ? 'on' : ''}`} aria-current={on ? 'page' : undefined}
                onClick={() => setTab(t.id)}>
                {t.label}
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
              {on && subs.length > 0 && (
                <ul className="lnb-sub">
                  {subs.map((s) => (
                    <li key={s.id}>
                      <button type="button" className={active === s.id ? 'on' : ''} onClick={() => go(s.id)}>
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
        })}
      </ul>
    </aside>
  );
};
