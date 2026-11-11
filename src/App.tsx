import { useEffect, useMemo, useState } from 'react';
import { Home, Minus, Plus, Printer } from 'lucide-react';
import catalog from './data/tools.json';
import videos from './data/videos.json';
import type { Catalog, Tab } from './types';
import { Header, TABS } from './components/Header';
import { Footer } from './components/Footer';
import { TopButton } from './components/TopButton';
import { ToolRow } from './components/ToolCard';
import { LectureTab, CHAT } from './components/LectureTab';
import { VideoTab, VIDEO_GROUPS } from './components/VideoTab';
import { Lnb, type LnbItem } from './components/Lnb';
import { Badge, Info, SecHead } from './components/Ui';

const data = catalog as Catalog;
const statusOf = Object.fromEntries(data.statuses.map((s) => [s.id, s]));
const groups = data.categories
  .map((c) => ({ ...c, tools: data.tools.filter((t) => t.category === c.id) }))
  .filter((g) => g.tools.length > 0);

const PAGE: Record<Tab, { title: string; desc: string }> = {
  tools: {
    title: '업무를 바꾸는 웹도구',
    desc: 'PoC(시제품)부터 실제 운영 중인 서비스까지 모두 담았습니다. 도구마다 지금 어느 단계인지 함께 표시합니다.',
  },
  lectures: {
    title: 'AI 활용 강의자료',
    desc: '연수에서 쓴 강의안과 실습파일을 모았습니다. 필요한 자료를 바로 열어 보거나 내려받아 쓰세요.',
  },
  videos: {
    title: '업무경감 도구 소개 영상',
    desc: '업무경감 도구와 데이터 도구실을 짧은 영상으로 소개합니다.',
  },
};

// 주소 끝 #lectures · #videos 로 그 탭을 바로 열 수 있게 한다
const fromHash = (): Tab => {
  const h = window.location.hash.slice(1);
  return h === 'lectures' || h === 'videos' ? h : 'tools';
};

/** 탭마다 왼쪽 메뉴에 놓을 항목 */
const lnbItems = (tab: Tab): LnbItem[] => {
  if (tab === 'tools') return groups.map((g) => ({ id: `sec-${g.id}`, label: g.label, count: g.tools.length }));
  if (tab === 'videos') {
    const list = videos as { kind: string }[];
    return VIDEO_GROUPS.map((g) => ({ id: `sec-videos-${g.id}`, label: g.title, count: list.filter(g.match).length }));
  }
  return [
    { id: 'sec-lectures', label: '강의 목록' },
    { id: 'sec-lecture-guide', label: '이용 안내' },
    { id: 'chat', label: '강의 소통방', href: CHAT },
  ];
};

const ZOOMS = [0.9, 1, 1.1, 1.2];

export default function App() {
  const [tab, setTabState] = useState<Tab>(fromHash);
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    const on = () => setTabState(fromHash());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const setTab = (t: Tab) => {
    setTabState(t);
    history.replaceState(null, '', t === 'tools' ? window.location.pathname : `#${t}`);
    window.scrollTo({ top: 0 });
  };
  const page = PAGE[tab];
  const items = useMemo(() => lnbItems(tab), [tab]);
  const tabLabel = TABS.find((t) => t.id === tab)?.label ?? '';
  const step = (d: number) => setZoom((z) => ZOOMS[Math.min(ZOOMS.length - 1, Math.max(0, ZOOMS.indexOf(z) + d))]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-clip" style={{ zoom }}>
      <a className="skip" href="#container">본문 바로가기</a>
      <Header updated={data.updated} count={data.tools.length} tab={tab} setTab={setTab} />

      {/* 위치 띠 */}
      <div className="crumb">
        <div className="inner">
          <ol aria-label="현재 위치">
            <li className="inline-flex items-center gap-1.5"><Home className="w-4 h-4" aria-hidden="true" /> 홈</li>
            <li>{tabLabel}</li>
          </ol>
          <div className="tools">
            <button type="button" className="round" onClick={() => step(1)} aria-label="글자 크게" title="글자 크게">
              <Plus className="w-4 h-4" aria-hidden="true" />
            </button>
            <button type="button" className="round" onClick={() => step(-1)} aria-label="글자 작게" title="글자 작게">
              <Minus className="w-4 h-4" aria-hidden="true" />
            </button>
            <button type="button" className="round" onClick={() => window.print()} aria-label="인쇄" title="인쇄">
              <Printer className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <main id="container" className="flex-1">
        <div className="inner sub">
          <Lnb title={tabLabel} items={items} key={tab} />

          <div className="content">
            <div className="page-head">
              <h1 className="page-title">{page.title}</h1>
              <p className="page-desc">{page.desc}</p>
            </div>

            {tab === 'lectures' ? <LectureTab /> : tab === 'videos' ? <VideoTab /> : (
              <>
                <Info title="단계 표시">
                  <ul className="!list-none !pl-0 flex flex-wrap gap-x-6 gap-y-2 mt-2">
                    {data.statuses.map((s) => (
                      <li key={s.id} className="flex items-center gap-2">
                        <Badge tone={s.tone}>{s.label}</Badge>
                        <span>{s.desc}</span>
                      </li>
                    ))}
                  </ul>
                </Info>

                {groups.map((g) => (
                  <section key={g.id} id={`sec-${g.id}`} className="sec" aria-labelledby={`h-${g.id}`}>
                    <SecHead id={`h-${g.id}`} count={g.tools.length} desc={g.desc}>{g.label}</SecHead>
                    <ul className="grid gap-3">
                      {g.tools.map((t) => <ToolRow key={t.id} tool={t} status={statusOf[t.status]} />)}
                    </ul>
                  </section>
                ))}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <TopButton />
    </div>
  );
}
