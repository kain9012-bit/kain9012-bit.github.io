import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import guides from '../data/guides.json';
import { SecHead } from './Ui';

interface Guide {
  id: string; date: string; title: string; subtitle?: string; summary: string;
  points?: string[]; sections?: number; href: string; thumb?: string;
}
const list = guides as Guide[];
const ym = (d: string) => { const [y, m] = d.split('.'); return `${y}. ${parseInt(m, 10)}.`; };

/** 강의안이 아닌, 교직원이 혼자 보고 따라 하는 AI 활용 안내자료 */
export const GuideTab: React.FC = () => (
  <>
    <section className="hero" aria-label="AI 활용 안내 현황">
      <p className="big nr-title">AI 활용 안내자료 <em>{list.length}편</em></p>
      <p className="note">연수 없이도 혼자 읽고 따라 할 수 있게 만든 자료. 새 자료가 나오면 이곳에 추가합니다.</p>
    </section>

    <section id="sec-guides" className="sec" aria-labelledby="h-guides">
      <SecHead id="h-guides" count={list.length}>안내자료 목록</SecHead>
      <ul className="sec-body grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((g) => (
          <li key={g.id} className="min-w-0">
            <article className="tile flex flex-col h-full overflow-hidden">
              {g.thumb && (
                <a href={g.href} target="_blank" rel="noopener noreferrer" className="block aspect-video bg-[#1d2550] overflow-hidden"
                  aria-label={`${g.title} 열기(새 창)`}>
                  <img src={g.thumb} alt="" loading="lazy" className="w-full h-full object-cover hover:scale-[1.02] transition-transform" />
                </a>
              )}
              <div className="flex flex-col flex-1 p-5">
                <p className="text-[14px] font-bold text-[#33363d] tabular-nums">
                  {ym(g.date)}{g.sections ? ` · ${g.sections}개 장` : ''}
                </p>
                <h3 className="mt-2 text-[19px] font-extrabold leading-snug text-black">{g.title}</h3>
                {g.subtitle && <p className="mt-1 text-[15px] font-bold text-[var(--nr-p3)]">{g.subtitle}</p>}
                <p className="mt-2 text-[15px] text-[var(--nr-sub)] flex-1">{g.summary}</p>
                {g.points && g.points.length > 0 && (
                  <p className="mt-3 text-[14px] text-[var(--nr-gray)]">다루는 것: {g.points.join(' · ')}</p>
                )}
                <p className="mt-4 pt-4 border-t border-[var(--nr-line)]">
                  <a href={g.href} target="_blank" rel="noopener noreferrer" className="btn p">
                    <BookOpen className="w-4 h-4" aria-hidden="true" /> 안내자료 열기
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>

    <section id="sec-guide-help" className="sec" aria-labelledby="h-guide-help">
      <SecHead id="h-guide-help">이용 안내</SecHead>
      <div className="soft sec-body">
        <ul className="!mt-0">
          <li>안내자료는 새 창에서 열림. 왼쪽 목차로 원하는 장 바로 이동</li>
          <li>업무에 자유롭게 활용하되, 출처(전북특별자치도교육청 박호용) 표기</li>
        </ul>
      </div>
    </section>
  </>
);
