import { bgColor, colors } from "assets/style/variables";
import styled from "styled-components";
import { KeywordBaseType } from "types/common";
import { TextHighlight } from "./TextHighlight";

// 🔹 검색 자동 완성 목록
interface PreviewTextPropsType {
  data: KeywordBaseType[];
  matcheVal:string;
  onKeyword: (keyVal:string) => void
}
export const PreviewText = ({data, matcheVal, onKeyword}: PreviewTextPropsType) => {
  const handleKeywordClick = (keyVal:string) => {
    onKeyword && onKeyword(keyVal); // id와 자동완성 text
  }
  if(matcheVal.length < 2) return null
  return (
    <StyleWrap className="preview-text">
      { data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li className="preview-item" key={index}>
              <button 
                type="button"
                className="ellipsis"
                onClick={() => handleKeywordClick(item.keyword)}
              >
                <TextHighlight 
                  text={item.keyword} 
                  keyword={matcheVal} 
                />
              </button>
            </li>
          ))}
        </ul>
      ):(
        <div className="empyt-wrap">
          <p>일치하는 검색 값이 없습니다.</p>
        </div>
      )}
    </StyleWrap>
  )
}

const StyleWrap = styled.div`
overflow: hidden;
overflow-y:auto;
position:absolute;
z-index:5;
top:calc(100% + 3px);
left:50%;
width:100%;
max-height: 300px;
border-radius:5px;
background-color: #fff;
border: 1px solid ${colors.lineColor};
transform: translateX(-50%);
.preview-item {
  button {
    padding: 10px;
    font-size:14px;
    transition: background-color var(--transition);
    text-align: left;
    &:hover, &:focus { 
      background:${bgColor.sideWite};
    }
  }
}
.empyt-wrap{
  padding: 10px;
  font-size:14px;
}
`;