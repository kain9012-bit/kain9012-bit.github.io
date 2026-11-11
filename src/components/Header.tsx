import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Tab } from '../types';
import { korDate } from '../lib/util';

export const TABS: { id: Tab; label: string }[] = [
  { id: 'tools', label: '업무 도구' },
  { id: 'lectures', label: '강의자료' },
  { id: 'videos', label: '소개 영상' },
];

/** 바깥 연결 — 데이터 도구실 게시글 */
export const TOOL_ROOM = 'https://www.jbe.go.kr/board/view.jbe?boardId=BBS_0000683&menuCd=DOM_000000106011002002&dataSid=1165417';

/** 머리말 — 위 작은 줄(기준일·바로가기) + 이름 줄. 넓은 화면의 메뉴는 왼쪽 메뉴가 맡는다 */
export const Header: React.FC<{ tab: Tab; setTab: (t: Tab) => void; count: number; updated: string }> = ({
  tab, setTab, count, updated,
}) => (
  <header className="hd">
    <div className="box">
      <div className="hd-util">
        <span className="tabular-nums">도구 {count}개 · {korDate(updated)} 기준</span>
        <span className="sep" aria-hidden="true">|</span>
        <span>직접 만들어 운영하는 비공식 업무지원 도구</span>
        <span className="sep" aria-hidden="true">|</span>
        <a href={TOOL_ROOM} target="_blank" rel="noopener noreferrer">
          데이터 도구실 <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" /><span className="sr-only">(새 창)</span>
        </a>
      </div>
      <div className="hd-main">
        <a href="./" className="brand" onClick={(e) => { e.preventDefault(); setTab('tools'); }}>
          <span className="mark" aria-hidden="true">
            <i style={{ background: '#3480cc' }} /><i style={{ background: '#32bdb8' }} />
            <i style={{ background: '#fecd20' }} /><i style={{ background: '#3a457f' }} />
          </span>
          <span>
            <strong className="nr-title">업무 개선 프로젝트</strong>
            <small>전북특별자치도교육청 · 비공식 업무지원 도구</small>
          </span>
        </a>
      </div>
    </div>

    {/* 좁은 화면에서만 보이는 주 메뉴 */}
    <nav className="mnav" aria-label="주메뉴">
      <div className="box">
        <ul className="no-scrollbar">
          {TABS.map((t) => (
            <li key={t.id}>
              <button type="button" className={tab === t.id ? 'on' : ''} aria-current={tab === t.id ? 'page' : undefined}
                onClick={() => setTab(t.id)}>{t.label}</button>
            </li>
          ))}
          <li>
            <a href={TOOL_ROOM} target="_blank" rel="noopener noreferrer">
              데이터 도구실 <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);
