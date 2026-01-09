import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn, copyClipboard, escapeSanitizedHtml } from "@/utils/common";
import { Btn } from "@/components/element/button/Btn";
import styles from './CodeHljs.module.scss';

interface CodeHljsPropsType {
  language?: string,
  code: string,
  isLineNumber?: boolean,
  badgeLang?:boolean,
  isCopied?:boolean,
  className?: string,
}
export const CodeHljs = ({
  language = 'javascript',
  code = 'Test',
  isLineNumber = true,
  badgeLang = true,
  isCopied = true,
  className
}: CodeHljsPropsType) => {
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
    <div className={cn(styles.hljsWrap,'hljs-wrap', className)}>
      { isLineNumber && (
        <div className={styles.hljsNumbers}>
          {lineNumbers.map(num => (
            <span key={num} className={styles.number}>{num}</span>
          ))}
        </div>
      )}
      <pre className={styles.hljsPre}>
        <code ref={codeRef} className={languageClass} data-name="hljs" />
      </pre>
      <div className={styles.hljsToolbar}>
        { badgeLang && (
          <span className={styles.badgeLanguage}>
            {language}
          </span>
        )}
        { isCopied && (
          <Btn 
            className={styles.copyButton}
            onClick={handleCopyClick}>
              <span>{copied ? '복사 완료' : '복사'}</span>
          </Btn> 
        ) }
      </div>
    </div>
  );
};