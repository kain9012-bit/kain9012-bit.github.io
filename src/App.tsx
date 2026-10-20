import { useEffect, useState } from 'react';
import catalog from './data/tools.json';
import type { Catalog, Tab } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TopButton } from './components/TopButton';
import { ToolRow } from './components/ToolCard';
import { LectureTab } from './components/LectureTab';
import { Badge, SectionTitle } from './components/Ui';

const data = catalog as Catalog;
const statusOf = Object.fromEntries(data.statuses.map((s) => [s.id, s]));

const HERO: Record<Tab, { pre: string; key: string; desc: string }> = {
  tools: {
    pre: '업무를 바꾸는', key: '웹도구',
    desc: 'PoC(시제품)부터 실제 운영 중인 서비스까지 모두 담았습니다. 도구마다 지금 어느 단계인지 함께 표시합니다.',
  },
  lectures: {
    pre: 'AI 활용', key: '강의자료',
    desc: '연수에서 쓴 강의안·PDF·실습파일입니다. 실습파일 속 이름·연락처는 모두 가상 데이터입니다.',
  },
};

// 주소 끝 #lectures 로 강의자료 탭을 바로 열 수 있게 한다
const fromHash = (): Tab => (window.location.hash === '#lectures' ? 'lectures' : 'tools');

export default function App() {
  const [tab, setTabState] = useState<Tab>(fromHash);
  useEffect(() => {
    const on = () => setTabState(fromHash());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const setTab = (t: Tab) => {
    setTabState(t);
    history.replaceState(null, '', t === 'tools' ? window.location.pathname : '#lectures');
    window.scrollTo({ top: 0 });
  };
  const hero = HERO[tab];
  const groups = data.categories
    .map((c) => ({ ...c, tools: data.tools.filter((t) => t.category === c.id) }))
    .filter((g) => g.tools.length > 0);

  return (
    <div
      className="min-h-screen overflow-x-clip bg-white text-slate-800 font-sans antialiased
                 flex flex-col selection:bg-blue-600 selection:text-white"
    >
      <a className="krds-skip" href="#container">본문 바로가기</a>
      <Header updated={data.updated} count={data.tools.length} tab={tab} setTab={setTab} />

      <main id="container" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <section
          className="relative left-1/2 w-screen -translate-x-1/2 -mt-6 bg-blue-50 border-b border-blue-100"
          aria-labelledby="hero-title"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 sm:py-12 space-y-2">
            <h1 id="hero-title" className="text-3xl sm:text-[2.5rem] font-bold text-slate-900 leading-tight">
              {hero.pre} <span className="text-blue-700">{hero.key}</span>
            </h1>
            <p className="text-base text-slate-600">{hero.desc}</p>
          </div>
        </section>

        <div className="mt-8 space-y-10">
          {tab === 'lectures' ? <LectureTab /> : (
            <>
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
            </>
          )}
        </div>
      </main>

      <Footer />
      <TopButton />
    </div>
  );
}
