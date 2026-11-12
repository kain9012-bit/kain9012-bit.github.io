import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Status, Tool } from '../types';
import { WebtoonTab } from './WebtoonTab';

export type ContentSub = 'webtoon' | 'games';
export const CONTENT_SUBS: { id: ContentSub; label: string; desc: string }[] = [
  { id: 'webtoon', label: 'AI웹툰', desc: 'AI와 함께 만든 업무 웹툰을 모았습니다. 작품을 누르면 회차 목록이 나옵니다.' },
  { id: 'games', label: 'AI게임', desc: '업무를 게임처럼 미리 겪어 보고 익히도록 AI와 함께 만든 게임을 모았습니다.' },
];

/** AI 콘텐츠 — 하위 메뉴(AI웹툰 · AI게임)마다 따로 보이는 화면. 둘 다 표지 카드 목록 */
export const ContentTab: React.FC<{
  sub: ContentSub; setSub: (s: ContentSub) => void; series?: string; openSeries: (id: string | null) => void;
  games: Tool[]; statusOf: Record<string, Status>; counts: Record<ContentSub, number>;
}> = ({ sub, setSub, series, openSeries, games, statusOf, counts }) => (
  <>
    {/* 왼쪽 메뉴가 숨는 좁은 화면에서만 보이는 하위 메뉴 */}
    <div className="subtabs" role="tablist" aria-label="AI 콘텐츠 하위 메뉴">
      {CONTENT_SUBS.map((s) => (
        <button key={s.id} type="button" role="tab" aria-selected={sub === s.id} className={sub === s.id ? 'on' : ''}
          onClick={() => setSub(s.id)}>
          {s.label} <span className="tabular-nums">{counts[s.id]}</span>
        </button>
      ))}
    </div>

    {sub === 'webtoon' ? (
      <WebtoonTab series={series} open={openSeries} />
    ) : (
      <div>
        <div className="cards-bar"><b>전체 게임</b> <span>총 {games.length}개</span></div>
        <ul className="cards">
          {games.map((g) => {
            const st = statusOf[g.status];
            return (
              <li key={g.id}>
                <a href={g.url} target="_blank" rel="noopener noreferrer" className="card">
                  <span className="cv">{g.cover && <img src={g.cover} alt="" loading="lazy" />}</span>
                  <span className="nm">{g.name}</span>
                  <span className="by clamp2">{g.desc}</span>
                  <span className="mt">
                    {st && <i className={`pill ${st.tone}`}>{st.label}</i>}
                    <span className="go">시작 <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" /></span>
                  </span>
                  <span className="sr-only">(새 창)</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    )}
  </>
);
