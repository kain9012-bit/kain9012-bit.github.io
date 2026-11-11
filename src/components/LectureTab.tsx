import React, { useEffect, useState } from 'react';
import { Download, ExternalLink, FileText, Link2, Presentation } from 'lucide-react';
import type { Lecture } from '../types';
import { Badge, EmptyState, SecHead } from './Ui';

/** 강의 목록은 강의자료실 한 곳에서만 관리한다. 여기서는 그 lectures.js 를 읽어 보여줄 뿐이다. */
export const HUB = 'https://kain9012-bit.github.io/ai-lecture-hub/';
/** 강의 중 질문·자료 공유·투표에 쓰는 실시간 소통방 */
export const CHAT = 'https://jbedu-chat.lovable.app';

declare global {
  interface Window { LECTURES?: Lecture[] }
}

let cache: Promise<Lecture[]> | null = null;

const WEEK = '일월화수목금토';
/** "2026.11.02" → 일자 표기와 완료/예정. 일자 없이 "2026.09"만 있으면 월 단위로 판단한다. */
const when = (raw: string) => {
  const [y, m, d] = raw.split('.').map((v) => parseInt(v, 10));
  const now = new Date();
  const today = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  if (!d) {
    const done = y * 100 + m < Math.floor(today / 100);
    return { label: `${y}. ${m}.`, done };
  }
  const wd = WEEK[new Date(y, m - 1, d).getDay()];
  return { label: `${y}. ${m}. ${d}.(${wd})`, done: y * 10000 + m * 100 + d < today };
};
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

  const done = list?.filter((l) => when(l.date).done).length ?? 0;

  return (
    <>
      {/* 강의 중에 바로 들어가야 하는 곳이라 목록보다 앞에 둔다 */}
      <section className="hero" aria-label="강의 소통방">
        <p className="big nr-title">
          {list ? <>강의 <em>{list.length}개</em>, 예정 <em>{list.length - done}개</em></> : '강의자료'}
        </p>
        <p className="note">강의 중 익명 질문, 자료 공유, 실시간 투표는 강의 소통방에서 합니다.</p>
        <div className="row">
          <a href={CHAT} target="_blank" rel="noopener noreferrer" className="go">
            강의 소통방 들어가기 <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section id="sec-lectures" className="sec" aria-labelledby="h-lectures">
        <SecHead id="h-lectures" count={list?.length}
          note={list ? `완료 ${done} · 예정 ${list.length - done}` : undefined}>
          강의 목록
        </SecHead>

        {fail ? (
          <EmptyState icon={<Presentation className="w-6 h-6" aria-hidden="true" />} title="강의 목록을 불러오지 못했습니다"
            desc="강의 목록에 연결하지 못했습니다. 잠시 뒤 다시 시도해 주세요.">
            <button type="button" className="btn" onClick={() => setRetry((n) => n + 1)}>다시 시도</button>
          </EmptyState>
        ) : !list ? (
          <p role="status" className="py-10 text-[15px] text-[var(--nr-gray)]">강의 목록을 불러오는 중…</p>
        ) : (
          <ul className="sec-body grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((l) => {
              const w = when(l.date);
              return (
                <li key={l.id} className="min-w-0">
                  <article className={`tile ${w.done ? '' : 'next'} flex flex-col h-full p-5 sm:p-6`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[15px] font-bold text-[#33363d] tabular-nums">{w.label}</span>
                      <Badge tone={w.done ? 'slate' : 'navy'}>{w.done ? '완료' : '예정'}</Badge>
                    </div>

                    <h3 className="mt-3 text-[19px] font-extrabold leading-snug text-black">{l.title}</h3>
                    {l.subtitle && <p className="mt-1 text-[15px] font-bold text-[var(--nr-p3)]">{l.subtitle}</p>}
                    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[14px]">
                      {l.audience && (<><dt className="font-bold text-[#33363d]">대상</dt><dd className="text-[var(--nr-sub)]">{l.audience}</dd></>)}
                      {l.duration && (<><dt className="font-bold text-[#33363d]">구성</dt><dd className="text-[var(--nr-sub)]">{l.duration}</dd></>)}
                    </dl>
                    {l.summary && <p className="mt-3 text-[15px] text-[var(--nr-sub)] flex-1">{l.summary}</p>}

                    <p className="mt-5 pt-4 border-t border-[var(--nr-line)] flex flex-wrap gap-2">
                      {l.files.map((f) => {
                        const Icon = FILE_ICON[f.type] ?? Link2;
                        return (
                          <a key={f.href} href={HUB + f.href} target="_blank" rel="noopener noreferrer"
                            {...(f.download ? { download: f.download } : {})}
                            className={`btn ${f.type === 'slides' ? 'p' : ''}`}>
                            <Icon className="w-4 h-4" aria-hidden="true" />
                            {f.type === 'slides' ? '강의안' : f.type === 'pdf' ? 'PDF' : f.type === 'zip' ? '실습파일' : f.label}
                          </a>
                        );
                      })}
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section id="sec-lecture-guide" className="sec" aria-labelledby="h-lecture-guide">
        <SecHead id="h-lecture-guide">이용 안내</SecHead>
        <div className="soft sec-body">
          <ul className="!mt-0">
            <li>강의안은 브라우저에서 바로 열림. ← → 키로 넘기기, F 키로 전체화면</li>
            <li>실습파일의 이름·연락처·학교명은 모두 가상 데이터</li>
            <li>연수·수업에 자유롭게 활용하되, 출처(전북특별자치도교육청 박호용) 표기</li>
          </ul>
        </div>
      </section>
    </>
  );
};
