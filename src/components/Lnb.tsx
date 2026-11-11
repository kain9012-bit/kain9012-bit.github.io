import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

export interface LnbItem { id: string; label: string; count?: number; href?: string }

/** 누리집 왼쪽 메뉴. 항목을 누르면 그 구획으로 내려가고, 지금 보이는 구획을 남색으로 표시한다.
 *  스크롤바·고정(sticky) 없이 항목 전체를 펼쳐 둔다. */
export const Lnb: React.FC<{ title: string; items: LnbItem[] }> = ({ title, items }) => {
  const anchors = items.filter((i) => !i.href);
  const [active, setActive] = useState(anchors[0]?.id);

  useEffect(() => {
    const on = () => {
      let cur = anchors[0]?.id;
      for (const a of anchors) {
        const el = document.getElementById(a.id);
        if (el && el.getBoundingClientRect().top < 220) cur = a.id;
      }
      setActive(cur);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(id);
  };

  return (
    <aside className="lnb" aria-label={`${title} 메뉴`}>
      <h2>{title}</h2>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {i.href ? (
              <a href={i.href} target="_blank" rel="noopener noreferrer">
                {i.label}
                <ExternalLink className="arr w-4 h-4" aria-hidden="true" />
                <span className="sr-only">(새 창)</span>
              </a>
            ) : (
              <button type="button" className={active === i.id ? 'on' : ''} onClick={() => go(i.id)}
                aria-current={active === i.id ? 'true' : undefined}>
                {i.label}
                {i.count !== undefined ? <span className="cnt tabular-nums">{i.count}</span> : <span className="arr">›</span>}
              </button>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};
