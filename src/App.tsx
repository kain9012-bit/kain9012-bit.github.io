import catalog from './data/tools.json';
import type { Catalog } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TopButton } from './components/TopButton';
import { ToolRow } from './components/ToolCard';
import { Badge, SectionTitle } from './components/Ui';

const data = catalog as Catalog;
const statusOf = Object.fromEntries(data.statuses.map((s) => [s.id, s]));

export default function App() {
  const groups = data.categories
    .map((c) => ({ ...c, tools: data.tools.filter((t) => t.category === c.id) }))
    .filter((g) => g.tools.length > 0);

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 sm:py-12 space-y-2">
            <h1 id="hero-title" className="text-3xl sm:text-[2.5rem] font-bold text-slate-900 leading-tight">
              업무에 바로 쓰는 <span className="text-blue-700">웹도구</span>
            </h1>
            <p className="text-base text-slate-600">
              PoC(시제품)부터 실제 운영 중인 서비스까지 모두 담았습니다.
              도구마다 지금 어느 단계인지 함께 표시합니다.
            </p>
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

          {groups.map((g) => (
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
          ))}
        </div>
      </main>

      <Footer />
      <TopButton />
    </div>
  );
}
