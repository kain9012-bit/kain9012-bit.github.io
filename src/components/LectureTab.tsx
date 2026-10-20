import React, { useEffect, useState } from 'react';
import { Download, FileText, Link2, Presentation } from 'lucide-react';
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
      <SectionTitle id="sec-lectures" count={list?.length}
        desc={list ? `자료 ${list.reduce((n, l) => n + l.files.length, 0)}개 · 최근 업데이트 ${list[0]?.date ?? ''}` : undefined}>
        AI 활용 강의자료
      </SectionTitle>

      {fail ? (
        <EmptyState icon={<Presentation className="w-6 h-6" aria-hidden="true" />} title="강의 목록을 불러오지 못했습니다"
          desc="강의 목록에 연결하지 못했습니다. 잠시 뒤 다시 시도해 주세요.">
          <button type="button" onClick={() => setRetry((n) => n + 1)}
            className="px-3 py-2 rounded-md border border-slate-300 text-sm font-bold text-slate-700 hover:border-blue-600 hover:text-blue-700">
            다시 시도
          </button>
        </EmptyState>
      ) : !list ? (
        <p role="status" className="py-10 text-sm text-slate-500">강의 목록을 불러오는 중…</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((l) => (
            <li key={l.id} className="min-w-0">
              <article className="flex flex-col h-full bg-white rounded-lg border border-slate-200 hover:border-blue-600 transition-colors p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Presentation className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-bold text-slate-500 tabular-nums">{l.date}</span>
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-900">{l.title}</h3>
                {l.subtitle && <p className="mt-0.5 text-sm text-blue-700 font-bold">{l.subtitle}</p>}
                <p className="mt-1 text-xs text-slate-500">{[l.audience, l.duration].filter(Boolean).join(' · ')}</p>
                {l.summary && <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">{l.summary}</p>}

                {l.tags && l.tags.length > 0 && (
                  <p className="mt-3 flex flex-wrap gap-1.5">
                    {l.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-slate-100 text-xs text-slate-600">{t}</span>
                    ))}
                  </p>
                )}

                <p className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
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
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}

      <div role="note" className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-1 text-sm text-slate-600">
        <p className="font-bold text-slate-900">이용 안내</p>
        <p>강의안은 브라우저에서 바로 열립니다. ← → 키로 넘기고, F 키로 전체화면입니다.</p>
        <p>실습파일의 이름·연락처·학교명은 모두 가상 데이터입니다.</p>
        <p>연수·수업에 자유롭게 활용하되, 출처(전북특별자치도교육청 박호용)를 밝혀 주세요.</p>
      </div>
    </section>
  );
};
