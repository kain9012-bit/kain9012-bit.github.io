import React from 'react';
import type { Status, Tool } from '../types';
import { ToolRow } from './ToolCard';
import { WebtoonTab, WEBTOONS } from './WebtoonTab';

export type ContentSub = 'webtoon' | 'games';
export const CONTENT_SUBS: { id: ContentSub; label: string; desc: string }[] = [
  { id: 'webtoon', label: 'AI웹툰', desc: 'AI와 함께 만든 업무 웹툰을 모았습니다. 회차를 누르면 새 창에서 바로 읽을 수 있습니다.' },
  { id: 'games', label: 'AI게임', desc: '업무를 게임처럼 미리 겪어 보고 익히도록 AI와 함께 만든 게임을 모았습니다.' },
];

/** AI 콘텐츠 — 하위 메뉴(AI웹툰 · AI게임)마다 따로 보이는 화면 */
export const ContentTab: React.FC<{
  sub: ContentSub; setSub: (s: ContentSub) => void; games: Tool[]; statusOf: Record<string, Status>;
}> = ({ sub, setSub, games, statusOf }) => (
  <>
    {/* 왼쪽 메뉴가 숨는 좁은 화면에서만 보이는 하위 메뉴 */}
    <div className="subtabs lg:hidden" role="tablist" aria-label="AI 콘텐츠 하위 메뉴">
      {CONTENT_SUBS.map((s) => (
        <button key={s.id} type="button" role="tab" aria-selected={sub === s.id} className={sub === s.id ? 'on' : ''}
          onClick={() => setSub(s.id)}>
          {s.label} <span className="tabular-nums">{s.id === 'webtoon' ? WEBTOONS.length : games.length}</span>
        </button>
      ))}
    </div>

    {sub === 'webtoon' ? (
      <WebtoonTab />
    ) : (
      <>
        <section className="hero" aria-label="AI게임 현황">
          <p className="big nr-title">AI와 함께 만든 업무 게임 <em>{games.length}개</em></p>
          <p className="note">놀이처럼 해 보며 업무 흐름을 익히는 게임. 누르면 새 창에서 바로 시작합니다.</p>
        </section>
        <ul className="grid gap-3 mt-8">
          {games.map((t) => <ToolRow key={t.id} tool={t} status={statusOf[t.status]} />)}
        </ul>
      </>
    )}
  </>
);
