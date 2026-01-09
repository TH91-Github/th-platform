import type { PopupDataType } from '@/types/guide';
import styles from './GuideModalDetail.module.scss';
import { TitlePoint } from '@/components/ui/text/TitlePoint';
import { stripIndent } from '@/utils/textUtils';
import { CodeHljs } from '@/components/element/highlight/CodeHljs';
import { OutLink } from '@/components/ui/text/OutLink';

interface GuideModalDetailPropsType {
  data: PopupDataType,
}
export const GuideModalDetail = ({data}: GuideModalDetailPropsType) => {
  const {infoData, link } = data;
  return (
    <div className={styles.info}>
      <TitlePoint 
        title={infoData.tit}
        className={styles.tit}
      />
      <ul className="bullet-lists">
        {infoData.desc.map((descItem, descIdx) =>(
        <li className={styles.desc} key={descIdx}>
          {descItem}
        </li>
      ))}
      {link && <OutLink href={link} title="코드 참고 Link" /> }
      </ul>
      <div className={styles.codeWrap}>
        <CodeHljs
          code={stripIndent(infoData.code)}
          language={'tsx'}
          className={styles.code}
        />
      </div>
    </div>
  )
}