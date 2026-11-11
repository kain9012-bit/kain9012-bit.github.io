import React, { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import videos from '../data/videos.json';
import { Badge, SecHead } from './Ui';

interface Video { id: string; title: string; kind: string; desc: string; link?: string; linkLabel?: string }
const list = videos as Video[];

export const VIDEO_GROUPS = [
  { id: 'promo', title: '홍보 영상', desc: '데이터 도구실을 소개하는 영상', match: (v: { kind: string }) => v.kind === '홍보영상' },
  { id: 'tools', title: '도구 소개 영상', desc: '누르면 이 화면에서 재생', match: (v: { kind: string }) => v.kind !== '홍보영상' },
];

/** 썸네일을 누르면 그 자리에서 유튜브 재생기로 바뀐다. 처음부터 재생기를 띄우지 않아 페이지가 가볍다. */
export const VideoTab: React.FC = () => {
  const [playing, setPlaying] = useState<string | null>(null);

  const card = (v: Video) => (
    <li key={v.id} className="min-w-0">
      <article className="tile flex flex-col h-full overflow-hidden">
        <div className="relative aspect-video bg-[#1d2550]">
          {playing === v.id ? (
            <iframe className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
              title={`${v.title} 소개 영상`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
          ) : (
            <button type="button" onClick={() => setPlaying(v.id)} className="group absolute inset-0 w-full h-full cursor-pointer"
              aria-label={`${v.title} 영상 재생`}>
              <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" className="w-full h-full object-cover" />
              <span className="absolute inset-0 flex items-center justify-center bg-[#223759]/15 group-hover:bg-[#223759]/35 transition-colors">
                <span className="w-14 h-14 rounded-full bg-white/95 text-[var(--nr-p3)] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Play className="w-6 h-6 ml-0.5" fill="currentColor" aria-hidden="true" />
                </span>
              </span>
            </button>
          )}
        </div>
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-[18px] font-extrabold text-black">{v.title}</h3>
            <Badge tone={v.kind === '홍보영상' ? 'blue' : 'slate'}>{v.kind}</Badge>
          </div>
          <p className="mt-1.5 text-[15px] text-[var(--nr-sub)] flex-1">{v.desc}</p>
          <div className="mt-4 pt-4 border-t border-[var(--nr-line)] flex items-center justify-between gap-2">
            {v.link ? (
              <a href={v.link} target="_blank" rel="noopener noreferrer" className="btn p">
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                {v.linkLabel ?? '게시글 바로가기'}
              </a>
            ) : (
              <span className="text-[14px] font-bold text-[var(--nr-gray)]">게시 준비 중</span>
            )}
            <a href={`https://youtu.be/${v.id}`} target="_blank" rel="noopener noreferrer" className="btn">
              유튜브 <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    </li>
  );

  return (
    <>
      {VIDEO_GROUPS.map((g, i) => {
        const items = list.filter(g.match);
        return (
          <section key={g.id} id={`sec-videos-${g.id}`} className={i ? 'sec' : 'sec !mt-8'} aria-labelledby={`h-videos-${g.id}`}>
            <SecHead id={`h-videos-${g.id}`} count={items.length} note={g.desc}>{g.title}</SecHead>
            <ul className="sec-body grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map(card)}</ul>
          </section>
        );
      })}
    </>
  );
};
