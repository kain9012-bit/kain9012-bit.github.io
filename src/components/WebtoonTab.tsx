import React from 'react';
import { BookOpenText } from 'lucide-react';
import webtoons from '../data/webtoons.json';
import { SecHead } from './Ui';

interface Webtoon {
  id: string; series: string; title: string; date: string; cuts: number;
  genre: string; desc: string; credit: string; href: string; thumb: string;
}
const list = webtoons as Webtoon[];

/** AI로 만든 웹툰. 화마다 그림이 모두 든 HTML 한 파일로 올려 두고 새 창으로 연다 */
export const WebtoonTab: React.FC = () => (
  <>
    <section className="hero" aria-label="AI 웹툰 소개">
      <p className="big nr-title">AI로 만든 업무 웹툰 <em>「18:00」</em></p>
      <p className="note">콘티·각색은 사람과 Claude가, 그림은 이미지 생성 AI가 맡은 현실 직장물입니다. 휴대폰 폭에 맞춰 만들었습니다.</p>
    </section>

    <section id="sec-webtoon-list" className="sec" aria-labelledby="h-webtoon-list">
      <SecHead id="h-webtoon-list" count={list.length} note="누르면 새 창에서 세로 스크롤로 읽기">18:00</SecHead>
      <ul className="sec-body grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((w) => (
          <li key={w.id} className="min-w-0">
            <a href={w.href} target="_blank" rel="noopener noreferrer" className="tile group flex flex-col h-full overflow-hidden">
              <span className="block aspect-[16/11] bg-[#0f1424] overflow-hidden">
                <img src={w.thumb} alt={`${w.series} ${w.title} 표지`} loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform" />
              </span>
              <span className="flex flex-col flex-1 p-5">
                <span className="flex items-center justify-between gap-2 text-[14px] text-[var(--nr-sub)] tabular-nums">
                  <span>{w.date} · {w.cuts}컷</span>
                  <span className="pill blue">{w.genre.split(' · ')[0]}</span>
                </span>
                <span className="mt-2 text-[19px] font-bold text-black group-hover:text-[var(--nr-p3)]">{w.series} {w.title}</span>
                <span className="mt-1.5 text-[15px] text-[var(--nr-sub)] flex-1">{w.desc}</span>
                <span className="mt-3 text-[13px] text-[var(--nr-gray)]">{w.credit}</span>
                <span className="mt-4 pt-4 border-t border-[var(--nr-line)]">
                  <span className="btn p"><BookOpenText className="w-4 h-4" aria-hidden="true" /> 웹툰 보기</span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>

    <section id="sec-webtoon-guide" className="sec" aria-labelledby="h-webtoon-guide">
      <SecHead id="h-webtoon-guide">안내</SecHead>
      <div className="soft sec-body">
        <ul className="!mt-0">
          <li>그림이 모두 든 파일이라 처음 열 때 시간이 조금 걸림(약 20MB)</li>
          <li>등장인물·기관·지명은 실제와 비슷하게 지은 가상 설정</li>
        </ul>
      </div>
    </section>
  </>
);
