import { colors, media } from 'assets/style/variables';
import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { copyClipboard, escapeSanitizedHtml } from 'utils/common';

interface HljsPropsType {
  language?: string;
  code: string;
  isLineNumber?: boolean;
  badgeLang?:boolean;
  isCopied?:boolean;
}
export const Hljs = ({
  language = 'javascript',
  code = 'Test',
  isLineNumber = true,
  badgeLang = true,
  isCopied = true
}: HljsPropsType) => {
  const codeRef = useRef<HTMLElement>(null!);
  const [copied, setCopied] = useState(false);

  // line number
  const lineNumbers = useMemo(() => (
    code.split('\n').map((_, idx) => idx + 1)
  ),[code]);

  // copied
  const handleCopyClick = async () => {
    const copySuccess = await copyClipboard(code);
    if (!copySuccess) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // HTML 태그 이스케이프 + XSS 방지 DOMPurify.sanitize
  const sanitizedCode = useMemo(() => escapeSanitizedHtml(code), [code]);
  const languageClass = useMemo(() => `language-${language}`, [language]);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.innerHTML = sanitizedCode;
      codeRef.current.dataset.highlighted = ''; // highlight.js 초기화
      hljs.highlightElement(codeRef.current);
    }
  }, [sanitizedCode, language]);

  return (
    <StyleWrap className="hljs-wrap">
      { isLineNumber && (
        <div className="hljs-numbers">
          {lineNumbers.map(num => (
            <span key={num} className="number">{num}</span>
          ))}
        </div>
      )}
      <pre className="hljs-pre">
        <code ref={codeRef} className={languageClass} />
      </pre>
      <div className="hljs-toolbar">
        { badgeLang && (
          <span className="badge-language">
            {language}
          </span>
        )}
        { isCopied && (
          <button 
            type="button" 
            className="copy-button"
            onClick={handleCopyClick}>
              <span>{copied ? '복사 완료' : '복사'}</span>
          </button> 
        ) }
      </div>
    </StyleWrap>
  );
};

const StyleWrap = styled.div`
display: flex;
overflow: hidden;
position:relative;
border-radius:5px;
padding:20px 0px;
background:${colors.nightSky};
.hljs-numbers {
  display: flex;
  flex-direction: column;
  position:relative;
  padding:10px;
  user-select: none;
  background: ${colors.nightSky};
  color: #7e7c92;
  &::after{
    position:absolute;
    top:0;
    right:0;
    width:1px;
    height:100%;
    background: linear-gradient(
      to bottom,
      rgba(126, 124, 146, 0) 0%,
      rgba(126, 124, 146, 1) 25%,
      rgba(126, 124, 146, 1) 75%,
      rgba(126, 124, 146, 0) 100%
    );
    content:'';
  }
  .number{
    font-size:14px;
    line-height:22px;
  }
}
.hljs-pre {
  flex: 1;
  overflow-x:auto;
  margin:0;
  padding:0 10px;
}
.hljs-pre .hljs{ 
  padding:10px;
  line-height:22px;
}
.hljs-toolbar{
  display:flex;
  gap:5px;
  position:absolute;
  top:5px;
  right:5px;
  .badge-language, .copy-button {
    height:20px;
    padding:0 8px;
    border-radius:5px;
    background:${colors.mSlateBlue};
    font-size:14px;
    font-weight:400;
    line-height:20px;
    color:#fff;
  }
}
${media.mo}{
  
}
`;