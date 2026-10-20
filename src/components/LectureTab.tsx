import React, { useEffect, useState } from 'react';
import { Download, ExternalLink, FileText, Link2, Presentation } from 'lucide-react';
import type { Lecture } from '../types';
import { EmptyState, SectionTitle } from './Ui';

/** 강의 목록은 강의자료실 한 곳에서만 관리한다. 여기서는 그 lectures.js 를 읽어 보여줄 뿐이다. */
export const HUB = 'https://kain9012-bit.github.io/ai-lecture-hub/';

declare global {
  interface Window { LECTURES?: Lecture[] }
}

let cache: Promise<Lecture[]> | null = null;
const loadLectures = () => {
  if (window.LECTURES) return Promise.resolve(window.LECTURES);
  if (cache) return cache;
  cache = new Promise<Lecture[]>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `${HUB}lectures.js?t=${Date.now()}`;
    s.onload = () => (window.LECTURES ? resolve(window.LECTURES) : reject(new Error('empty')));
    s.onerror = () => reject(new Error('load'));
    document.head.appendChild(s);
  });
  cache.catch(() => { cache = null; });
  return cache;
};

const FILE_ICON = { slides: Presentation, pdf: FileText, zip: Download, link: Link2 } as const;

export const LectureTab: React.FC = () => {
  const [list, setList] = useState<Lecture[] | null>(null);
  const [fail, setFail] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    setFail(false);
    loadLectures().then(setList).catch(() => setFail(true));
  }, [retry]);

  return (
    <section aria-labelledby="sec-lectures" className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <SectionTitle id="sec-lectures" count={list?.length} desc="강의안·PDF·실습파일 · 출처 표기 후 자유롭게 활용">
          AI 활용 강의자료
        </SectionTitle>
        <a href={HUB} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-blue-700">
          강의자료실 열기 <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>

      {fail ? (
        <EmptyState icon={<Presentation className="w-6 h-6" aria-hidden="true" />} title="강의 목록을 불러오지 못했습니다"
          desc="강의자료실에 연결하지 못했습니다. 잠시 뒤 다시 시도하거나 강의자료실을 직접 여세요.">
          <button type="button" onClick={() => setRetry((n) => n + 1)}
            className="px-3 py-2 rounded-md border border-slate-300 text-sm font-bold text-slate-700 hover:border-blue-600 hover:text-blue-700">
            다시 시도
          </button>
        </EmptyState>
      ) : !list ? (
        <p role="status" className="py-10 text-sm text-slate-500">강의 목록을 불러오는 중…</p>
      ) : (
        <ul className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-200 overflow-hidden">
          {list.map((l) => (
            <li key={l.id} className="flex items-center gap-4 px-4 sm:px-5 py-3 min-w-0">
              <span className="hidden sm:flex w-10 h-10 rounded-lg bg-blue-50 text-blue-700 items-center justify-center shrink-0">
                <Presentation className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="flex-1 min-w-0 sm:grid sm:grid-cols-[17rem_minmax(0,1fr)] sm:gap-x-6 sm:items-center">
                <span className="block min-w-0">
                  <span className="block text-base font-bold text-slate-900">{l.title}</span>
                  <span className="block mt-0.5 text-xs text-slate-500 tabular-nums">
                    {[l.date, l.audience, l.duration].filter(Boolean).join(' · ')}
                  </span>
                </span>
                <span className="block mt-1 sm:mt-0 text-sm text-slate-600">{l.summary ?? l.subtitle}</span>
              </span>
              <span className="flex flex-col sm:flex-row gap-1.5 shrink-0">
                {l.files.map((f) => {
                  const Icon = FILE_ICON[f.type] ?? Link2;
                  return (
                    <a key={f.href} href={HUB + f.href} target="_blank" rel="noopener noreferrer"
                      {...(f.download ? { download: f.download } : {})}
                      className={`inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-colors ${
                        f.type === 'slides'
                          ? 'bg-slate-900 hover:bg-slate-800 text-white'
                          : 'border border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-700'
                      }`}>
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      {f.type === 'slides' ? '강의안' : f.type === 'pdf' ? 'PDF' : f.type === 'zip' ? '실습파일' : f.label}
                    </a>
                  );
                })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
