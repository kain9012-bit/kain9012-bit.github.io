import React from 'react';

export const Footer: React.FC = () => (
  <footer className="bg-slate-900 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid gap-6 sm:grid-cols-2 text-sm">
      <div className="space-y-1">
        <p className="font-bold text-white">업무 웹도구 모음</p>
        <p className="text-slate-400">
          전북특별자치도교육청 업무에 쓰려고 만든 웹도구를 한곳에 모은 비공식 목록입니다.
        </p>
      </div>
      <div className="space-y-1 sm:text-right">
        <p className="font-bold text-white">안내</p>
        <p className="text-slate-400">
          도구마다 자료 출처와 한계가 각 화면에 적혀 있습니다. 고칠 곳이나 새 도구 제안은 제작자에게 알려 주세요.
        </p>
      </div>
    </div>
  </footer>
);
