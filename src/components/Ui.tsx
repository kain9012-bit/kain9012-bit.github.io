import React from 'react';
import type { Tone } from '../types';

/** 상태·개수 알약 */
export const Badge: React.FC<{ tone?: Tone | 'navy'; children: React.ReactNode }> = ({ tone = 'slate', children }) => (
  <span className={`pill ${tone}`}>{children}</span>
);

/** 구획 제목: 제목 + 개수, 오른쪽 짧은 설명 */
export const SecHead: React.FC<{ children: React.ReactNode; count?: number; note?: string; id?: string }> = ({
  children, count, note, id,
}) => (
  <div className="sec-head">
    <h2 id={id} className="nr-title">
      {children}
      {count !== undefined && <span className="cnt tabular-nums">{count}개</span>}
    </h2>
    {note && <span className="note">{note}</span>}
  </div>
);

export const EmptyState: React.FC<{ icon: React.ReactNode; title: string; desc?: string; children?: React.ReactNode }> = ({
  icon, title, desc, children,
}) => (
  <div className="tile p-12 text-center space-y-3">
    <div className="w-12 h-12 rounded-full bg-[var(--nr-bg)] text-[var(--nr-p3)] flex items-center justify-center mx-auto">{icon}</div>
    <h3 className="text-lg font-bold">{title}</h3>
    {desc && <p className="text-[15px] text-[var(--nr-sub)] max-w-md mx-auto">{desc}</p>}
    {children}
  </div>
);
