import { SearchModule } from "@/components/modules/search/SearchModule";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import styles from './GuideSearch.module.scss';
import type { EssentialSearchType, SearchResultType } from "@/types/common";

interface GuideSearchPropsType<T extends EssentialSearchType> {
  title: string,
  data: T[], // 검색할 데이터
  onResult: ( resultData:SearchResultType ) => void, // 검색 결과 {text: 값, 일치하는 데이터}
}
export const GuideSearch = <T extends EssentialSearchType>({ title, data, onResult }:GuideSearchPropsType<T>) => {

  return (
    <div className={styles.searchWrap}>
      <TitlePoint 
        titleTag={'h4'}
        title={title}
        $fontSize={18}
        pointType="underline"
        className={styles.title}
      />
      <div className={styles.search}>
        <SearchModule 
          data={data} 
          onConfirm={onResult}
        />
      </div>
    </div>
  )
}