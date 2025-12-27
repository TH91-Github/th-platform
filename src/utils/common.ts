import React from 'react';
import DOMPurify, { type Config } from 'dompurify';

// 🔹 모바일 사이즈 체크
export function isMobileSizeChk():boolean{ 
  const mediaQuery = `(max-width: 768px)`; 
  return window.matchMedia(mediaQuery).matches;
}

// 🔹 className 조건 처리
export const cn = (...classNames: (string | false | undefined)[]) => {
  const classSet = new Set(
    classNames.flatMap((className) =>
      typeof className === 'string' ? className.split(' ') : []
    )
  );
  return [...classSet].join(' ');
};

// 🔹 복사, 카피 async/await 
export async function copyClipboard (copyText: string):Promise<boolean> { 
  try {
    await navigator.clipboard.writeText(copyText);
    return true;
  } catch (err) {
    return false;
  }
}
// 🔹 HTML 특수문자 이스케이프와 안전하게 sanitize - code 작성 시 사용
export function escapeSanitizedHtml(str: string) {
  const escapeCOde = str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const sanitizedCode = DOMPurify.sanitize(escapeCOde);
  return sanitizedCode
};
// 🔹 안전하게 문자열 HTML 구조 처리 / Hook (memo) 필요 시 -> useSanitizeHtml 사용 
export function sanitizeHtml(dataHTML: string, options?: Config) {
  const html = dataHTML.replace(/className=/g, 'class=');
  return DOMPurify.sanitize(html, {
    ...options,
    ALLOWED_TAGS: ['a', 'span', 'div', 'p', 'br', 'strong', 'em', ...(options?.ALLOWED_TAGS || [])],
    ALLOWED_ATTR: [
      'id', 
      'class',
      'href',
      'target',
      'rel',
      ...(options?.ALLOWED_ATTR || [])
    ],
    // 추가 보안 설정
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.-]+(?:[^a-z+.:]|$))/i,
    SANITIZE_DOM: true,
    SAFE_FOR_TEMPLATES: true,
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onmouseenter', 'onmouseleave'],
    ALLOW_DATA_ATTR: false,
  });
}

// 랜덤 값 (최대 값, 이름지정_랜덤 값)
export const randomNum = (_max:number, name?:string) :string => { 
  let newId = Math.floor(Math.random() * Number(_max + 1))
  let timeDate = new Date().getTime().toString(); // 시간 값으로 변경 
  return `${name ===undefined ? 'random': name}-${newId}-${timeDate}`;
} 

// (비교리스트, 지정id값) 리스트 내 id 비교 중복 값 없는 id 지정
export function randomIdChk (listId:any[], name:string) { 
  const idName = name ?? "random"
  let uniqueId = '';
  for(let idNum = 0 ; idNum < 1; idNum++){
    let createId = { id : randomNum(9999, idName)}
    listId.findIndex((idItem) => idItem.id === createId.id) >= 0 && idNum--;
    uniqueId = createId.id;
  }
  return uniqueId;
}

// 숫자 천 단위 콤마 ex) 1,000
export const numberComma = (num: number): string => {
  return num.toLocaleString();
};

// 텍스트 개별 span 분리
export function splitTextToSpans(
  text: string,
  options:{spacing?: boolean; className?: string; } = {}
): React.ReactNode[] {
  const { spacing = true, className } = options;

  if (!text) return [];

  const characters = Array.from(text).filter((char) => {
    if (spacing) return true;
    return char.trim() !== '';
  });

  return characters.map((char, index) =>
    React.createElement(
      'span',
      { key: `${char}-${index}`, className },
      char
    )
  );
}

// breadcrumb 
export const breadcrumbLists = (pathname:string, capitalize: boolean = true) => {
  return pathname
    .split('/')
    .filter(Boolean)
    .map(item => 
      capitalize 
        ? item[0].toUpperCase() + item.slice(1)
        : item
    )
}