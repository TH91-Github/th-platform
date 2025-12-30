import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Input, type InputRefType } from '@/components/element/form/input/Input';
import styles from './SearchModule.module.scss';
import { IconSearch } from '@/assets/icon';
import { cn } from '@/utils/common';
//🔹 검색 모듈 

 interface KeywordBaseType {
  id: string;
  keyword: string;
}
// ✅ 검색 : InputText(input) + PreviewText(미리보기)
interface EssentialSearchType {
  // 필수 타입
  id: string;
  keyword: string[];
}

interface SearchModulePropsType<T extends EssentialSearchType> {
  data?: T[]; // 검색 목록 - EssentialType 필수 속성
  id?: string;
  isBtn?: boolean; // 버튼 유무 버튼 false 시  icon on
  placeholder?: string;
  onPreview?: boolean; // 일치하는 검색어 미리보기
  onComfirm?: (matchData: T[]) => void;
}
export const SearchModule = <T extends EssentialSearchType>({
  data = [],
  id,
  isBtn = true,
  placeholder = "",
  onPreview = true,
  onComfirm,
}: SearchModulePropsType<T>) => {
  const SearchModuleRef = useRef<HTMLDivElement | null>(null);
  const isMouseDownInside = useRef(false);
  const [resultVal, setResultVal] = useState("");
  const [isPreview, setIsPreview] = useState(onPreview ?? false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<InputRefType>(null);

  const inputFocus = () => {
    setIsPreview((prev) => !prev);
  };
  const inputChange = useCallback((val: string) => {
    console.log(val)
    setResultVal(val);
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
    if (resultVal.length < 2) return []; // 2글자 이상부터
    const loweredVal = resultVal.toLowerCase();
    const matches: KeywordBaseType[] = [];
    data.forEach((item) => {
      item.keyword.forEach((keyVal) => {
        if (keyVal.toLowerCase().includes(loweredVal)) {
          matches.push({
            id: item.id,
            keyword: keyVal,
          });
        }
      });
    });
    return matches;
  }, [data, resultVal]);
  // const onKeyword = (keyVal: string) => {
  //   // 자동완성 클릭
  //   setResultVal(keyVal);
  //   setIsPreview(false);
  //   if (!inputRef.current) return;
  //   inputRef.current.changeVal(keyVal);
  // };
  const handleEnter = () => {
    handleClick();
  };
  const handleClick = () => {
    let keyword = resultVal.trim();
    if (keyword.length < 2) {
      setErrorMessage("검색어를 2자 이상 입력해주세요.");
      return;
    }
    // 자동완성 목록이 있는 경우 첫 번째 키워드로 대체
    if (filteredData.length > 0) {
      keyword = filteredData[0].keyword;
      setResultVal(keyword);
      inputRef.current?.changeVal(keyword);
    }
    setIsPreview(false);
    // 반환값 keyword 또는 id 값
    const matchData = matchKey(keyword);
    onComfirm?.(matchData);
  };
  // 검색어와 일치하는 값들(객체) 반환 []
  const matchKey = (key: string) => {
    const foundItems = data.filter((item) => item.keyword.includes(key));
    return foundItems;
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
        id={`${id}-search`}
        className={styles.inputItem}
        placeholder={placeholder}
        focusEvent={inputFocus}
        keyEnter={handleEnter}
        changeEvent={inputChange}
      />
      {errorMessage && (
        <p className={styles.error}>
          <span>{errorMessage}</span>
        </p>
      )}
      {isPreview && (
        // <PreviewText
        //   data={filteredData}
        //   matcheVal={resultVal}
        //   onKeyword={onKeyword}
        // />
        <div>
          프리
        </div>
      )}
      {isBtn && (
        <button className={styles.btn} onClick={handleClick}>
          <span className={styles.icon}>
            <i><IconSearch /></i>
          </span>
        </button>
      )}

    </div>
  )
}