import { GuideSearch } from '@/components/pages/guide/GuideSearch';
import type { SearchResultType } from '@/types/common';
import type { GuideDataType } from '@/types/guide';
import { useState } from 'react';
import styles from './SearchLists.module.scss';

interface SearchListsPropsType{ 
  data: GuideDataType[],
  searchTitle?: string,
  onClick?: (e:string) => void,
}
export const SearchLists = ({data, searchTitle, onClick}:SearchListsPropsType) => {
  const [matchedIds, setMatchedIds] = useState<string[] | null>(null);
  
  const handleItemClick = (id:string) => {
    onClick?.(id);
  }

  const onResult= (result:SearchResultType) => {
    setMatchedIds(result.matchIds);
  }
  const visibleList = matchedIds
    ? data.filter(item => matchedIds.includes(item.id))
    : data;
    
  return(
    <div className={styles.searchLists}>
      {/* 검색 모듈  */}
      <GuideSearch 
        title={`${searchTitle ?? '검색'} 키워드를 검색하세요 🔎`}
        data={data}
        onResult={onResult}
      />
      <div className={styles.listsWrap}>
        {visibleList.length > 0 ? (
          <ul>
            {visibleList.map(item => (
              <li key={item.id}>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={() => handleItemClick(item.id)}
                >
                  <span className={styles.category}>{item.category}</span>
                  <span className={styles.tit}>{item.title}</span>
                  <span className={styles.desc}>{item.desc}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p>일치하는 컴포넌트가 없어요.. 🥹</p>
          </div>
        )}
      </div>
    </div>
  )
}