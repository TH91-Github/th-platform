// 📍 문자 관련 공통 함수

// 🔹 띄어쓰기 기준 앞글자 대문자 or 소문자 / upperFirst 대,소 타입
export function capitalizeWords( text: string, upperFirst: boolean = true) {
  return text.replace(/-/g, ' ').split(' ').map(word => {
    if (!word) return word;
    const first = upperFirst
      ? word[0].toUpperCase()
      : word[0].toLowerCase();
    return first + word.slice(1);
  }).join(' ');
}

// 🔹 value 일부 비공개 
export function partialUndisclosed(
  eVal: string, // 전체 val 
  cutNum: number = 3, // 비공개 시작점
  cutType: string = '@', // 비공개 기준 앞쪽
  closedText: string = "*" // 비공개 text 타입
) {
  const [localPart, domain] = eVal.split(cutType);
  let resultVal: string;

  if (localPart.length < 1) return eVal

  if (localPart.length <= cutNum) {
    // 짧은 경우 마지막 1자리만 ***
    resultVal = localPart.slice(0, -1) + closedText;
  } else {
    // 긴 경우 앞 cutNum자리 표시
    resultVal = `${localPart.slice(0, cutNum)}${closedText.repeat(localPart.length - cutNum)}`;
  }

  return domain === undefined ? resultVal : `${resultVal}${cutType}${domain}`;
} 

// 🔹 코드 작성 들여쓰기 삭제
export function stripIndent(code: string) {
  const lines = code.replace(/^\n/, '').split('\n');
  // 공통 들여쓰는 부분 체크
  const indent = Math.min(
    ...lines
      .filter(line => line.trim().length > 0)
      .map(line => line.match(/^\s*/)?.[0].length ?? 0)
  );

  // 공통 들여쓰기 제거
  return lines.map(line => line.slice(indent)).join('\n');
}
