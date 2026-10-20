import React, { useState } from 'react';
import { Download, ExternalLink, Play } from 'lucide-react';
import videos from '../data/videos.json';
import { Badge, SectionTitle } from './Ui';

interface Video { id: string; title: string; kind: string; desc: string; link?: string; linkLabel?: string }
const list = videos as Video[];

/** 썸네일을 누르면 그 자리에서 유튜브 재생기로 바뀐다. 처음부터 재생기를 띄우지 않아 페이지가 가볍다. */
export const VideoTab: React.FC = () => {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section aria-labelledby="sec-videos" className="space-y-3">
      <SectionTitle id="sec-videos" count={list.length} desc="누르면 이 화면에서 재생">소개 영상</SectionTitle>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((v) => (
          <li key={v.id} className="min-w-0">
            <article className="flex flex-col h-full bg-white rounded-lg border border-slate-200 hover:border-blue-600 transition-colors overflow-hidden">
              <div className="relative aspect-video bg-slate-900">
                {playing === v.id ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
                    title={`${v.title} 소개 영상`}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <button type="button" onClick={() => setPlaying(v.id)} className="group absolute inset-0 w-full h-full"
                    aria-label={`${v.title} 영상 재생`}>
                    <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy"
                      className="w-full h-full object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors">
                      <span className="w-14 h-14 rounded-full bg-white/95 text-blue-700 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <Play className="w-6 h-6 ml-0.5" fill="currentColor" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                )}
              </div>
              <div className="flex flex-col flex-1 p-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{v.title}</h3>
                  <Badge tone={v.kind === '홍보영상' ? 'blue' : 'slate'}>{v.kind}</Badge>
                </div>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed flex-1">{v.desc}</p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  {v.link ? (
                    <a href={v.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold">
                      {v.linkLabel?.includes('바로가기')
                        ? <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        : <Download className="w-3.5 h-3.5" aria-hidden="true" />}
                      {v.linkLabel ?? '프로그램 받기'}
                    </a>
                  ) : (
                    <span className="text-xs font-bold text-slate-400">게시 준비 중</span>
                  )}
                  <a href={`https://youtu.be/${v.id}`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-blue-700">
                    유튜브 <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};
