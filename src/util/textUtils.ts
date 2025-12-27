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
  // 숨기려는 value가 시작점 보다 작을 때
  else if (localPart.length <= cutNum) {
    // 로컬 파트가 3자 이하인 경우 그대로 반환
    resultVal = `${localPart.slice(0, (cutNum - 1))}${closedText.repeat(localPart.length - (cutNum - 1))}`;
  } else {
    resultVal = `${localPart.slice(0, 3)}${closedText.repeat(localPart.length - 3)}`;
  }
  return domain === undefined ? resultVal : `${resultVal}${cutType}${domain}`;
} 