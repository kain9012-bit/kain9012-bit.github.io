import React from 'react';
import type { Status, Tool } from '../types';
import { ToolRow } from './ToolCard';
import { SecHead } from './Ui';
import { WebtoonTab, WEBTOONS } from './WebtoonTab';

/** AI 콘텐츠 — AI와 함께 만든 웹툰·게임. 왼쪽 하위 메뉴는 종류(웹툰·게임)로 나눈다 */
export const ContentTab: React.FC<{ games: Tool[]; statusOf: Record<string, Status> }> = ({ games, statusOf }) => (
  <>
    <section className="hero" aria-label="AI 콘텐츠 현황">
      <p className="big nr-title">AI와 함께 만든 웹툰 <em>{WEBTOONS.length}편</em> · 게임 <em>{games.length}개</em></p>
      <p className="note">업무 이야기를 웹툰으로 읽고, 게임으로 미리 겪어 봅니다. 누르면 새 창에서 열립니다.</p>
    </section>

    <section id="sec-webtoon" className="sec" aria-labelledby="h-webtoon">
      <SecHead id="h-webtoon" count={WEBTOONS.length} note="세로 스크롤 웹툰">AI웹툰</SecHead>
      <div className="sec-body"><WebtoonTab /></div>
    </section>

    <section id="sec-games" className="sec" aria-labelledby="h-games">
      <SecHead id="h-games" count={games.length} note="놀이처럼 해 보며 업무 흐름 익히기">AI게임</SecHead>
      <ul className="sec-body grid gap-3">
        {games.map((t) => <ToolRow key={t.id} tool={t} status={statusOf[t.status]} />)}
      </ul>
    </section>
  </>
);
