import React from 'react';
import type { Tone } from '../types';

/** 단계·종류 배지 */
export const Badge: React.FC<{ tone?: Tone | 'navy'; children: React.ReactNode }> = ({ tone = 'slate', children }) => (
  <span className={`badge ${tone}`}>{children}</span>
);

/** 구획 제목: 제목 · 개수 · 짧은 설명 */
export const SecHead: React.FC<{ children: React.ReactNode; count?: number; desc?: string; id?: string }> = ({
  children, count, desc, id,
}) => (
  <div className="sec-head">
    <h2 id={id}>{children}</h2>
    {count !== undefined && <span className="cnt tabular-nums">{count}개</span>}
    {desc && <span className="d">{desc}</span>}
  </div>
);

/** 누리집 안내 상자: 왼쪽 원형 '!' + 굵은 제목 + 설명 */
export const Info: React.FC<{ title: string; children?: React.ReactNode; action?: React.ReactNode }> = ({
  title, children, action,
}) => (
  <div className="info" role="note">
    <span className="ico" aria-hidden="true">!</span>
    <div className="flex-1 min-w-0">
      <b>{title}</b>
      {children}
    </div>
    {action && <div className="shrink-0 self-center">{action}</div>}
  </div>
);

export const EmptyState: React.FC<{ icon: React.ReactNode; title: string; desc?: string; children?: React.ReactNode }> = ({
  icon, title, desc, children,
}) => (
  <div className="card !transform-none p-12 text-center space-y-3">
    <div className="w-12 h-12 rounded-full bg-[var(--bg-l)] text-[var(--blue-d)] flex items-center justify-center mx-auto">{icon}</div>
    <h3 className="text-lg font-extrabold text-[var(--ink)]">{title}</h3>
    {desc && <p className="text-[15px] text-[var(--sub)] max-w-md mx-auto">{desc}</p>}
    {children}
  </div>
);
