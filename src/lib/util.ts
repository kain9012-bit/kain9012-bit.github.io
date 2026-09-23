/** 2026-09-23 → 2026. 9. 23. */
export const korDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${y}. ${m}. ${d}.`;
};

/** 주소에서 https:// 와 끝의 / 를 떼어 보여준다 */
export const shortUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

/** 띄어쓰기·대소문자를 무시하고 찾는다 */
export const norm = (s: string) => s.toLowerCase().replace(/\s+/g, '');
