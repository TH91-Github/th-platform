import { colors } from "assets/style/variables";
import styled from "styled-components";

interface TextHighlightPropsType {
  text:string; // 전체 텍스트 
  keyword:string; // 일치하는 텍스트
  $activeColor?: string; // 일치하는 텍스트 표시 색상
}
export const TextHighlight = ({text, keyword, $activeColor}: TextHighlightPropsType) => {
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
      <span>{beforeText}</span>
        <StyleTextHighlight $activeColor={$activeColor ?? colors.yellow}>{match}</StyleTextHighlight>
      <span>{afterText}</span>
    </>
  )
}

interface StyleTextHighlightType {
  $activeColor:string
}

const StyleTextHighlight = styled.span<StyleTextHighlightType>`
padding:1px;
border-radius:5px;
background: ${({$activeColor}) => $activeColor};
`;

