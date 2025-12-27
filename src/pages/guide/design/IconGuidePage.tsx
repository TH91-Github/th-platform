import { iconData } from '@/assets/icon/iconData';
import { IconMatch } from '@/components/ui/icon/IconMatch';
import { TitlePoint } from '@/components/ui/text/TitlePoint';
import { copyClipboard } from '@/utils/common';
import styles from './IconGuidePage.module.scss';

export const IconGuidePage = () => {
  const handleIconClick = async (e:string) => {
    const copySuccess = await copyClipboard(e);
  }
  return( 
    <div>
      <TitlePoint
        title="React-icons 라이브러리"
        pointType="underline"
        $fontSize={20}
      />
      <ul className={styles.iconLists}>
        {iconData.map((iconItem,iconIdx) => (
          <li key={iconItem.id + iconIdx}>
            <button
              type="button"
              title={`${iconItem.title} 복사하기`}
              className={styles.iconBtn}
              onClick={() => handleIconClick(iconItem.label)}
            >
              <span className={styles.icon}><IconMatch id={iconItem.id} /></span>
              <span className={styles.tit}>{iconItem.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}