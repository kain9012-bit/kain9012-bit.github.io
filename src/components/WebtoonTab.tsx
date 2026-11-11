import React, { useState } from 'react';
import { BookOpenText, Check, Share2 } from 'lucide-react';
import webtoons from '../data/webtoons.json';

interface Episode { no: number; title: string; date: string; cuts: number; href: string; thumb: string }
interface Series {
  id: string; title: string; story: string; art: string; info: string; cover: string;
  synopsis: string[]; tags: string[]; episodes: Episode[];
}
const list = webtoons as Series[];

/** "2026.11.11" → "26.11.11" */
const short = (d: string) => d.slice(2);

/** 작품 하나 — 웹툰 플랫폼 작품 홈처럼 표지 + 정보 + 첫 화 보기 + 회차 목록 */
const SeriesView: React.FC<{ s: Series }> = ({ s }) => {
  const [latest, setLatest] = useState(true);
  const [copied, setCopied] = useState(false);
  const eps = [...s.episodes].sort((a, b) => (latest ? b.no - a.no : a.no - b.no));
  const first = s.episodes.reduce((a, b) => (a.no < b.no ? a : b));
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* 복사 권한이 없으면 넘어감 */ }
  };

  return (
    <article className="wt">
      <section id="sec-webtoon-info" className="wt-head" aria-label={`${s.title} 작품 정보`}>
        <img src={s.cover} alt={`${s.title} 표지`} className="wt-cover" />
        <div className="min-w-0">
          <h2 className="wt-title">{s.title}</h2>
          <p className="wt-credit">
            <b>{s.story}</b> · 글 / <b>{s.art}</b> · 그림
            <span className="sep" aria-hidden="true">|</span>
            <span className="muted">{s.info}</span>
          </p>
          <p className="wt-syn">
            {s.synopsis.map((l, i) => (l ? <span key={i} className="block">{l}</span> : <span key={i} className="block h-3" />))}
          </p>
          <ul className="wt-tags">
            {s.tags.map((t) => <li key={t}>#{t}</li>)}
          </ul>
        </div>
      </section>

      <div className="wt-actions">
        <a href={first.href} target="_blank" rel="noopener noreferrer" className="wt-first">
          <BookOpenText className="w-5 h-5" aria-hidden="true" /> 첫 화 보기
        </a>
        <button type="button" className="wt-share" onClick={share}>
          {copied ? <Check className="w-5 h-5" aria-hidden="true" /> : <Share2 className="w-5 h-5" aria-hidden="true" />}
          {copied ? '주소 복사됨' : '공유하기'}
        </button>
      </div>

      <section id="sec-webtoon-list" aria-label="회차 목록">
        <div className="wt-bar">
          <span>총 <b className="tabular-nums">{s.episodes.length}</b>화</span>
          <span className="wt-sort">
            <button type="button" className={latest ? 'on' : ''} onClick={() => setLatest(true)}>최신화부터</button>
            <span aria-hidden="true">|</span>
            <button type="button" className={latest ? '' : 'on'} onClick={() => setLatest(false)}>1화부터</button>
          </span>
        </div>
        <ul className="wt-eps">
          {eps.map((e) => (
            <li key={e.no}>
              <a href={e.href} target="_blank" rel="noopener noreferrer">
                <img src={e.thumb} alt="" loading="lazy" />
                <span className="min-w-0">
                  <span className="t">{e.no}화 「{e.title}」</span>
                  <span className="m tabular-nums">{short(e.date)} · {e.cuts}컷</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="sec-webtoon-guide" className="soft mt-8">
        <b>안내</b>
        <ul>
          <li>회차마다 그림이 모두 든 파일이라 처음 열 때 시간이 조금 걸림(약 20MB), 휴대폰 폭 기준 제작</li>
          <li>콘티·각색은 사람과 Claude, 그림은 이미지 생성 AI가 맡은 작품</li>
          <li>등장인물·기관·지명은 실제와 비슷하게 지은 가상 설정</li>
        </ul>
      </section>
    </article>
  );
};

export const WebtoonTab: React.FC = () => (
  <div className="mt-8">
    {list.map((s) => <SeriesView key={s.id} s={s} />)}
  </div>
);
