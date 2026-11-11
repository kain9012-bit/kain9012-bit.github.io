import React from 'react';
import type { Tab } from '../types';
import { korDate } from '../lib/util';

export const TABS: { id: Tab; label: string }[] = [
  { id: 'tools', label: '업무 도구' },
  { id: 'lectures', label: '강의자료' },
  { id: 'videos', label: '소개 영상' },
];

export const Header: React.FC<{ updated: string; count: number; tab: Tab; setTab: (t: Tab) => void }> = ({
  updated, count, tab, setTab,
}) => (
  <header className="hd">
    <div className="inner hd-top">
      <a href="./" className="brand" onClick={(e) => { e.preventDefault(); setTab('tools'); }}>
        <b>업무 개선 프로젝트</b>
        <small>전북특별자치도교육청 · 직접 만들어 운영하는 비공식 업무지원 도구</small>
      </a>
      <div className="hd-util">
        <span className="pill note">비공식 업무지원 도구</span>
        <span className="pill tabular-nums">도구 {count}개 · {korDate(updated)} 기준</span>
      </div>
    </div>

    <nav className="gnb" aria-label="주 메뉴">
      <div className="inner">
      <ul role="tablist">
        {TABS.map(({ id, label }) => (
          <li key={id} role="presentation">
            <button type="button" role="tab" aria-selected={tab === id}
              className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>
              {label}
            </button>
          </li>
        ))}
      </ul>
      </div>
    </nav>
  </header>
);
