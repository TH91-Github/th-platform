import { TitlePoint } from "@/components/ui/text/TitlePoint";
import styles from './GuideSearch.module.scss';
import { Input } from "@/components/element/form/input/Input";
import { SearchModule } from "@/components/modules/SearchModule";

interface GuideSearchPropsType {
  title: string,
}
export const GuideSearch = ({ title }:GuideSearchPropsType) => {
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
        <SearchModule />
      </div>
    </div>
  )
}