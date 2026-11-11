import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronRight, Home, Link2 } from 'lucide-react';
import catalog from './data/tools.json';
import videos from './data/videos.json';
import type { Catalog, Tab } from './types';
import { Header, TABS } from './components/Header';
import { Footer } from './components/Footer';
import { TopButton } from './components/TopButton';
import { ToolRow } from './components/ToolCard';
import { LectureTab } from './components/LectureTab';
import { VideoTab, VIDEO_GROUPS } from './components/VideoTab';
import { WebtoonTab } from './components/WebtoonTab';
import { Lnb, type LnbSub } from './components/Lnb';
import { SecHead } from './components/Ui';

const data = catalog as Catalog;
const statusOf = Object.fromEntries(data.statuses.map((s) => [s.id, s]));
const groups = data.categories
  .map((c) => ({ ...c, tools: data.tools.filter((t) => t.category === c.id) }))
  .filter((g) => g.tools.length > 0);

const PAGE: Record<Tab, { title: string; desc: string }> = {
  tools: { title: '업무 도구', desc: 'PoC(시제품)부터 실제 운영 중인 서비스까지 모두 담았습니다. 도구마다 지금 어느 단계인지 함께 표시합니다.' },
  lectures: { title: '강의자료', desc: '연수에서 쓴 강의안과 실습파일을 모았습니다. 필요한 자료를 바로 열어 보거나 내려받아 쓰세요.' },
  videos: { title: '소개 영상', desc: '업무경감 도구와 데이터 도구실을 짧은 영상으로 소개합니다.' },
  webtoon: { title: 'AI웹툰', desc: 'AI와 함께 만든 업무 웹툰을 모았습니다. 누르면 새 창에서 바로 읽을 수 있습니다.' },
};

// 주소 끝 #lectures · #videos 로 그 탭을 바로 열 수 있게 한다
const fromHash = (): Tab => {
  const h = window.location.hash.slice(1);
  return h === 'lectures' || h === 'videos' || h === 'webtoon' ? h : 'tools';
};

/** 왼쪽 메뉴 활성 항목 아래에 펼칠 하위 목록 */
const subsOf = (tab: Tab): LnbSub[] => {
  if (tab === 'tools') return groups.map((g) => ({ id: `sec-${g.id}`, label: g.label, count: g.tools.length }));
  if (tab === 'videos') {
    const list = videos as { kind: string }[];
    return VIDEO_GROUPS.map((g) => ({ id: `sec-videos-${g.id}`, label: g.title, count: list.filter(g.match).length }));
  }
  if (tab === 'webtoon') return [
    { id: 'sec-webtoon-info', label: '작품 정보' },
    { id: 'sec-webtoon-list', label: '회차 목록' },
    { id: 'sec-webtoon-guide', label: '안내' },
  ];
  return [
    { id: 'sec-lectures', label: '강의 목록' },
    { id: 'sec-lecture-guide', label: '이용 안내' },
  ];
};

const CopyUrl: React.FC = () => {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    } catch { /* 복사 권한이 없으면 조용히 넘어감 */ }
  };
  return (
    <button type="button" className="copy" onClick={copy}>
      {done ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Link2 className="w-3.5 h-3.5" aria-hidden="true" />}
      {done ? '복사됨' : '주소 복사'}
    </button>
  );
};

export default function App() {
  const [tab, setTabState] = useState<Tab>(fromHash);
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
  const subs = useMemo(() => subsOf(tab), [tab]);
  const label = TABS.find((t) => t.id === tab)?.label ?? '';
  const by = (id: string) => data.tools.filter((t) => t.status === id).length;

  return (
    <div className="min-h-screen flex flex-col">
      <a className="skip" href="#container">본문 바로가기</a>
      <Header tab={tab} setTab={setTab} count={data.tools.length} updated={data.updated} />

      <div className="sub-wrap">
        <div className="sub-band" aria-hidden="true" />
        <div className="box sub">
          <Lnb tab={tab} setTab={setTab} subs={subs} key={tab} />

          <main id="container" tabIndex={-1}>
            <div className="crumb">
              <Home className="w-4 h-4" aria-label="처음" />
              <ChevronRight className="w-3.5 h-3.5 text-[var(--nr-gray)]" aria-hidden="true" />
              <span>업무 개선 프로젝트</span>
              <ChevronRight className="w-3.5 h-3.5 text-[var(--nr-gray)]" aria-hidden="true" />
              <span className="cur">{label}</span>
              <CopyUrl />
            </div>

            <div className="body">
              <div className="page-title">
                <h1 className="nr-title">{page.title}</h1>
                <p>{page.desc}</p>
              </div>

              {tab === 'lectures' ? <LectureTab /> : tab === 'videos' ? <VideoTab /> : tab === 'webtoon' ? <WebtoonTab /> : (
                <>
                  <section className="hero" aria-label="업무 도구 현황">
                    <p className="big nr-title">직접 만든 업무 도구 <em>{data.tools.length}개</em>, 바로 열어 쓰세요</p>
                    <p className="note">동향·모니터링 · 점검·작성 · 업무 안내 세 갈래로 나눠 담았습니다.</p>
                    <div className="row">
                      {data.statuses.map((s) => (
                        <span key={s.id} className="chip" title={s.desc}>{s.label} <b className="tabular-nums">{by(s.id)}</b></span>
                      ))}
                    </div>
                  </section>

                  {groups.map((g) => (
                    <section key={g.id} id={`sec-${g.id}`} className="sec" aria-labelledby={`h-${g.id}`}>
                      <SecHead id={`h-${g.id}`} count={g.tools.length} note={g.desc}>{g.label}</SecHead>
                      <ul className="sec-body grid gap-3">
                        {g.tools.map((t) => <ToolRow key={t.id} tool={t} status={statusOf[t.status]} />)}
                      </ul>
                    </section>
                  ))}

                  <div className="soft mt-10">
                    <b>단계 표시</b>
                    <ul>
                      {data.statuses.map((s) => <li key={s.id}>{s.label}: {s.desc}</li>)}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>

      <Footer />
      <TopButton />
    </div>
  );
}
