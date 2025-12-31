import styled from "@emotion/styled";

// 🔹 Text highlight

interface TextHighlightPropsType {
  text: string; // 전체 텍스트 
  keyword: string; // 일치하는 텍스트
}
export const TextHighlight = ({ text, keyword }: TextHighlightPropsType) => {
  const loweredText = text.toLowerCase();
  const loweredKeyword = keyword.toLowerCase();
  const index = loweredText.indexOf(loweredKeyword);

  if (index === -1 || keyword === '') { // 일치하지 않는 경우
    return <>{text}</>;
  }

  const beforeText = text.slice(0, index); //일치하는 단어전까지 문자열 추출
  const match = text.slice(index, index + keyword.length); // 일치 지점 ~ 검색어 기준까지 
  const afterText = text.slice(index + keyword.length); // 그 외

  return (
    <>
      {beforeText && <span>{beforeText}</span>}
      <StyleTextHighlight>{match}</StyleTextHighlight>
      {afterText && <span>{afterText}</span>}
    </>
  )
}

const StyleTextHighlight = styled.span`
  border-radius:2px;
  background-color: var(--color-point);
  color:var(--color-point-text);
`;

