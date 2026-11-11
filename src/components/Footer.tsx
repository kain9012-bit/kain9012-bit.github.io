import React from 'react';

export const Footer: React.FC = () => (
  <footer className="ft">
    <div className="inner">
      <div>
        <b>업무 개선 프로젝트</b>
        <p>전북특별자치도교육청 업무를 바꾸려고 직접 만든 웹도구를 PoC부터 운영 중인 서비스까지 모았습니다.</p>
        <p>비공식 업무지원 도구 · 전북특별자치도교육청 누리집이 아닙니다.</p>
      </div>
      <div className="md:text-right">
        <b>안내</b>
        <p>도구마다 자료 출처와 한계가 각 화면에 적혀 있습니다.</p>
        <p>고칠 곳이나 새 도구 제안은 제작자(정책기획과 박호용)에게 알려 주세요.</p>
      </div>
    </div>
  </footer>
);
