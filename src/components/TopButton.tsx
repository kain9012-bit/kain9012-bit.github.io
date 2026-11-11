import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const TopButton: React.FC = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 400);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  if (!show) return null;
  return (
    <button type="button" className="totop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="맨 위로">
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
};
