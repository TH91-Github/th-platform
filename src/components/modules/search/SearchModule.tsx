import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Input, type InputRefType } from '@/components/element/form/input/Input';
import styles from './SearchModule.module.scss';
import { IconSearch } from '@/assets/icon';
import { cn } from '@/utils/common';
import { PreviewText } from './PreviewText';
import type { EssentialSearchType, SearchResultType } from '@/types/common';

//🔹 검색 모듈 
interface SearchModulePropsType<T extends EssentialSearchType> {
  data?: T[]; // 검색 목록 - EssentialType 필수 속성
  isBtn?: boolean; // 버튼 유무 버튼 false 시  icon on
  placeholder?: string;
  onPreview?: boolean; // 일치하는 검색어 미리보기
  onConfirm?: (result: SearchResultType) => void;
}
export const SearchModule = <T extends EssentialSearchType>({
  data = [],
  isBtn = true,
  placeholder = "",
  onPreview = true,
  onConfirm,
}: SearchModulePropsType<T>) => {
  const SearchModuleRef = useRef<HTMLDivElement | null>(null);
  const isMouseDownInside = useRef(false);
  const inputRef = useRef<InputRefType>(null);
  const [searchVal, setSearchVal] = useState("");
  const [isPreview, setIsPreview] = useState(onPreview ?? false);
  const [errorMessage, setErrorMessage] = useState("");

  const inputFocus = () => {
    setIsPreview((prev) => !prev);
  };
  
  const inputChange = useCallback((val: string) => {
    setSearchVal(val);
    if (val.length >= 2) {
      setIsPreview(true);
    }
  }, []);
  
  const handleMouseDown = (e: PointerEvent) => {
    // 다른 영역 클릭 시
    if (SearchModuleRef.current?.contains(e.target as Node)) {
      isMouseDownInside.current = true;
    } else {
      isMouseDownInside.current = false;
      setIsPreview(false);
    }
  };
  
  const filteredData = useMemo(() => {
    if (searchVal.length < 2) return []; // 2글자 이상부터
    // keywrod 하나로
    const mergedKeywords = data.flatMap(item => item.keyword);
    // 중복 제거
    const uniqueKeywords = Array.from(new Set(mergedKeywords));
    return uniqueKeywords.filter(text =>
      text.toLowerCase().includes(searchVal.toLowerCase())
    );
  }, [data, searchVal]);

  const onKeyword = (val: string) => {
    const matchIds = data.filter(item =>
      item.keyword.some(k =>
        k.toLowerCase().includes(val.toLowerCase())
      )
    ).map(item => item.id);

    const resultData = {
      text: val,
      matchIds
    }
    onConfirm?.(resultData);

    // matchIds 찾는 값이 있다면 input value 수정
    setSearchVal(val);
    setIsPreview(false);
  };

  const handleEnter = () => {
    handleClick();
  };

  const handleClick = () => {
    const value = searchVal.trim();
    if (value && value.length < 2) {
      setErrorMessage("검색어를 2자 이상 입력해주세요.");
      return;
    }
    onKeyword(value);
  };

  useEffect(() => {
    // 컴포넌트 벗어나서 클릭 시 자동완성 닫기
    if (isPreview) {
      document.addEventListener("pointerdown", handleMouseDown);
    } else {
      document.removeEventListener("pointerdown", handleMouseDown);
    }
    return () => {
      document.removeEventListener("pointerdown", handleMouseDown);
    };
  }, [isPreview]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 1500); // 3초 후 메시지 제거
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 클리어
    }
  }, [errorMessage]);

  return (
    <div 
      ref={SearchModuleRef}
      className={cn(styles.module, isBtn && styles.searchBtn)}
    >
      {!isBtn && ( // 버튼이 없는 경우 앞에 아이콘
        <span className={cn(styles.icon, styles.ui)}>
          <i><IconSearch /></i>
        </span>
      )}
      <Input
        ref={inputRef}
        id={`search`}
        className={styles.inputItem}
        placeholder={placeholder}
        focusEvent={inputFocus}
        keyEnter={handleEnter}
        changeEvent={inputChange}
      />
      {isPreview && (
        <PreviewText
          data={filteredData}
          matchVal={searchVal}
          selectKeyword={onKeyword}
        />
      )}
      {isBtn && (
        <button className={styles.btn} onClick={handleClick}>
          <span className={styles.icon}>
            <i><IconSearch /></i>
          </span>
        </button>
      )}
      {errorMessage && (
        <p className={styles.error}>
          <span>{errorMessage}</span>
        </p>
      )}
    </div>
  )
}