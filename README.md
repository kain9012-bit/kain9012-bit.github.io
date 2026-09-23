# 업무 웹도구 모음

전북특별자치도교육청 업무용으로 만든 웹도구를 한곳에 모은 목록 페이지.

- 공개 주소: https://kain9012-bit.github.io/
- 스택: Vite + React 19 + TypeScript + Tailwind CSS v4 (KRDS 토큰, 다른 도구와 같은 `src/index.css`)

## 도구 추가·수정

`src/data/tools.json` 한 파일만 고친다.

- `categories` — 분류(동향·모니터링 / 점검·작성 / 안내·교육)
- `tools` — 도구 한 줄에 하나. `category`는 분류 `id`와 일치
- `icon` — `src/components/ToolCard.tsx` 의 `ICONS` 목록 이름. 없으면 공구 아이콘
- `badge` — 선택. `{ "label": "내부 참고", "tone": "amber" }` (tone: blue·slate·amber·green·red)
- `updated` — 목록 기준일. 고칠 때마다 날짜 갱신

`main` 에 올리면 GitHub Actions 가 빌드해 1~2분 뒤 반영.

## 처음 배포

1. GitHub에서 `kain9012-bit.github.io` 이름으로 공개 저장소 생성
2. 이 폴더에서 `git init` → 커밋 → `git remote add origin https://github.com/kain9012-bit/kain9012-bit.github.io.git` → `git push -u origin main`
3. 저장소 Settings → Pages → Source 를 **GitHub Actions** 로 지정

## 로컬 확인

```
npm install
npm run dev
```
