import { useMemo, useState } from 'react';
import { SearchX, Search, X } from 'lucide-react';
import catalog from './data/tools.json';
import type { Catalog } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TopButton } from './components/TopButton';
import { ToolRow } from './components/ToolCard';
import { Badge, EmptyState, SectionTitle } from './components/Ui';
import { norm } from './lib/util';

const data = catalog as Catalog;
const statusOf = Object.fromEntries(data.statuses.map((s) => [s.id, s]));

export default function App() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string | null>(null);
  const [st, setSt] = useState<string | null>(null);

  const hits = useMemo(() => {
    const k = norm(q);
    return data.tools.filter(
      (t) =>
        (!cat || t.category === cat) &&
        (!st || t.status === st) &&
        (!k || norm(`${t.name} ${t.desc} ${t.badge?.label ?? ''}`).includes(k)),
    );
  }, [q, cat, st]);

  const groups = data.categories
    .map((c) => ({ ...c, tools: hits.filter((t) => t.category === c.id) }))
    .filter((g) => g.tools.length > 0);

  const chip = (on: boolean) =>
    `px-3 py-1.5 rounded-full border text-sm font-bold transition-colors ${
      on
        ? 'bg-slate-900 text-white border-slate-900'
        : 'bg-white border-slate-300 text-slate-600 hover:border-blue-600 hover:text-blue-700'
    }`;

  const reset = () => { setQ(''); setCat(null); setSt(null); };

  return (
    <div
      className="min-h-screen overflow-x-clip bg-white text-slate-800 font-sans antialiased
                 flex flex-col selection:bg-blue-600 selection:text-white"
    >
      <a className="krds-skip" href="#container">본문 바로가기</a>
      <Header updated={data.updated} count={data.tools.length} />

      <main id="container" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <section
          className="relative left-1/2 w-screen -translate-x-1/2 -mt-6 bg-blue-50 border-b border-blue-100"
          aria-labelledby="hero-title"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 sm:py-12 space-y-5">
            <div className="space-y-2">
              <h1 id="hero-title" className="text-3xl sm:text-[2.5rem] font-bold text-slate-900 leading-tight">
                업무에 바로 쓰는 <span className="text-blue-700">웹도구</span>
              </h1>
              <p className="text-base text-slate-600">
                PoC(시제품)부터 실제 운영 중인 서비스까지 모두 담았습니다.
                도구마다 지금 어느 단계인지 함께 표시합니다.
              </p>
            </div>

            <label className="relative block max-w-2xl">
              <span className="sr-only">도구 찾기</span>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="도구 이름이나 하는 일로 찾기 (예: 보도자료, 교데통)"
                className="w-full h-13 pl-12 pr-12 rounded-lg bg-white border border-slate-300 text-base
                           placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center
                             text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  aria-label="검색어 지우기"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </label>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="분류">
                <span className="w-9 text-xs font-bold text-slate-500">분류</span>
                <button type="button" className={chip(cat === null)} aria-pressed={cat === null} onClick={() => setCat(null)}>
                  전체
                </button>
                {data.categories.map((c) => (
                  <button key={c.id} type="button" className={chip(cat === c.id)} aria-pressed={cat === c.id}
                    onClick={() => setCat(cat === c.id ? null : c.id)}>
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="운영 단계">
                <span className="w-9 text-xs font-bold text-slate-500">단계</span>
                <button type="button" className={chip(st === null)} aria-pressed={st === null} onClick={() => setSt(null)}>
                  전체
                </button>
                {data.statuses.map((s) => {
                  const n = data.tools.filter((t) => t.status === s.id).length;
                  return (
                    <button key={s.id} type="button" className={chip(st === s.id)} aria-pressed={st === s.id}
                      onClick={() => setSt(st === s.id ? null : s.id)} disabled={n === 0}>
                      {s.label} <span className="tabular-nums opacity-70">{n}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 space-y-10">
          {/* 단계 뜻풀이 */}
          <dl className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
            {data.statuses.map((s) => (
              <div key={s.id} className="flex items-center gap-1.5">
                <dt><Badge tone={s.tone}>{s.label}</Badge></dt>
                <dd>{s.desc}</dd>
              </div>
            ))}
          </dl>

          {groups.length === 0 ? (
            <EmptyState
              icon={<SearchX className="w-6 h-6" aria-hidden="true" />}
              title="맞는 도구가 없습니다"
              desc="다른 말로 찾거나 거르개를 '전체'로 바꿔 보세요."
            >
              <button type="button" onClick={reset}
                className="px-3 py-2 rounded-md border border-slate-300 text-sm font-bold text-slate-700
                           hover:border-blue-600 hover:text-blue-700 transition-colors">
                전체 보기
              </button>
            </EmptyState>
          ) : (
            groups.map((g) => (
              <section key={g.id} aria-labelledby={`sec-${g.id}`} className="space-y-3">
                <SectionTitle id={`sec-${g.id}`} count={g.tools.length} desc={g.desc}>
                  {g.label}
                </SectionTitle>
                <ul className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-200 overflow-hidden">
                  {g.tools.map((t) => (
                    <ToolRow key={t.id} tool={t} status={statusOf[t.status]} />
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>
      </main>

      <Footer />
      <TopButton />
    </div>
  );
}
