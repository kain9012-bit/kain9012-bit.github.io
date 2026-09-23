import { useMemo, useState } from 'react';
import { SearchX, Search, X } from 'lucide-react';
import catalog from './data/tools.json';
import type { Catalog } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TopButton } from './components/TopButton';
import { ToolCard } from './components/ToolCard';
import { EmptyState, SectionTitle } from './components/Ui';
import { norm } from './lib/util';

const data = catalog as Catalog;

export default function App() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string | null>(null);

  const hits = useMemo(() => {
    const k = norm(q);
    return data.tools.filter(
      (t) =>
        (!cat || t.category === cat) &&
        (!k || norm(`${t.name} ${t.desc} ${t.badge?.label ?? ''}`).includes(k)),
    );
  }, [q, cat]);

  const groups = data.categories
    .map((c) => ({ ...c, tools: hits.filter((t) => t.category === c.id) }))
    .filter((g) => g.tools.length > 0);

  const chip = (on: boolean) =>
    `px-3 py-1.5 rounded-full border text-sm font-bold transition-colors ${
      on
        ? 'bg-slate-900 text-white border-slate-900'
        : 'bg-white border-slate-300 text-slate-600 hover:border-blue-600 hover:text-blue-700'
    }`;

  return (
    <div
      className="min-h-screen overflow-x-clip bg-white text-slate-800 font-sans antialiased
                 flex flex-col selection:bg-blue-600 selection:text-white"
    >
      <a className="krds-skip" href="#container">본문 바로가기</a>
      <Header updated={data.updated} count={data.tools.length} />

      <main id="container" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 첫 화면 띠 */}
        <section
          className="relative left-1/2 w-screen -translate-x-1/2 -mt-6 bg-blue-50 border-b border-blue-100"
          aria-labelledby="hero-title"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6">
            <div className="space-y-3">
              <h1 id="hero-title" className="text-3xl sm:text-[2.75rem] font-bold text-slate-900 leading-tight">
                업무에 바로 쓰는 <span className="text-blue-700">웹도구</span>
              </h1>
              <p className="text-base text-slate-600">
                동향 모니터링부터 문서 점검, 업무 안내서까지 한곳에서 찾아 여세요.
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
                className="w-full h-14 pl-12 pr-12 rounded-lg bg-white border border-slate-300 text-base
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

            <div className="flex flex-wrap gap-2" role="group" aria-label="분류">
              <button type="button" className={chip(cat === null)} aria-pressed={cat === null} onClick={() => setCat(null)}>
                전체
              </button>
              {data.categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={chip(cat === c.id)}
                  aria-pressed={cat === c.id}
                  onClick={() => setCat(cat === c.id ? null : c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-10 space-y-12">
          {groups.length === 0 ? (
            <EmptyState
              icon={<SearchX className="w-6 h-6" aria-hidden="true" />}
              title="맞는 도구가 없습니다"
              desc="다른 말로 찾거나 분류를 '전체'로 바꿔 보세요."
            >
              <button
                type="button"
                onClick={() => { setQ(''); setCat(null); }}
                className="px-3 py-2 rounded-md border border-slate-300 text-sm font-bold text-slate-700
                           hover:border-blue-600 hover:text-blue-700 transition-colors"
              >
                전체 보기
              </button>
            </EmptyState>
          ) : (
            groups.map((g) => (
              <section key={g.id} aria-labelledby={`sec-${g.id}`} className="space-y-4">
                <SectionTitle id={`sec-${g.id}`} count={g.tools.length} desc={g.desc}>
                  {g.label}
                </SectionTitle>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {g.tools.map((t) => (
                    <li key={t.id} className="min-w-0">
                      <ToolCard tool={t} />
                    </li>
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
