import { Pagination } from '@/components/element/pagination/Pagination';
import { GuideSearch } from '@/components/pages/guide/GuideSearch';
import type { SearchResultType } from '@/types/common';
import type { GuideDataType } from '@/types/guide';
import { useState } from 'react';
import styles from './SearchLists.module.scss';

interface SearchListsPropsType{ 
  data: GuideDataType[],
  searchTitle?: string,
  onClick?: (e:string) => void,
  pageSize?: number,
}
export const SearchLists = ({data, searchTitle, onClick, pageSize = 0}:SearchListsPropsType) => {
  const [matchedIds, setMatchedIds] = useState<string[] | null>(null);
  const [page, setPage] = useState(1);
  
  const handleItemClick = (id:string) => {
    onClick?.(id);
  }

  const onResult= (result:SearchResultType) => {
    setMatchedIds(result.matchIds);
    setPage(1);
  }
  const visibleList = matchedIds
    ? data.filter(item => matchedIds.includes(item.id))
    : data;
  const usePagination = pageSize > 0;
  const totalPageCount = usePagination ? Math.ceil(visibleList.length / pageSize) : 1;
  const safePage = usePagination
    ? Math.min(page, Math.max(totalPageCount, 1))
    : 1;
  const start = (safePage - 1) * pageSize;
  const pagedList = usePagination
    ? visibleList.slice(start, start + pageSize)
    : visibleList;
    
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
          <>
          <ul>
            {pagedList.map(item => (
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
          {usePagination && (
            <Pagination
              page={safePage}
              totalPages={visibleList.length}
              viewCount={pageSize}
              pageBtnCount={5}
              center={true}
              onChange={setPage}
            />
          )}
          </>
        ) : (
          <div className={styles.empty}>
            <p>일치하는 컴포넌트가 없어요.. 🥹</p>
          </div>
        )}
      </div>
    </div>
  )
}
