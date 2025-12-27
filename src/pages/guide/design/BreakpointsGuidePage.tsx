import { TitlePoint } from '@/components/ui/text/TitlePoint';
import { breakpointData } from '@/data/guide/breakpointData';
import { useToggle } from '@/hook/common/useToggle';
import { cn, copyClipboard } from '@/utils/common';
import styles from './BreakpointsGuidePage.module.scss';

export const BreakpointsGuidePage = () => {
  const [styleType, setStyleType] = useToggle(true);

  const handleClickCopy = async (e: string) => {
    const copySuccess = await copyClipboard(e);

  };

  return (
    <div className={styles.bp}>
      <div className={styles.btns}>
        <button
          type="button"
          className={styles.btn}
          onClick={() => setStyleType()}
        >
          <span>{styleType ? 'SCSS' : 'Emotion'} 기준</span>
        </button>
      </div>
      {breakpointData.map((item, idx) => (
        <div className={styles.item} key={idx}>
          <TitlePoint
            titleTag="h4"
            title={item.title}
            pointType="underline"
          />
          <ul className={styles.breakpointLists}>
            {item.lists.map((dataItem, dataIdx) => (
              <li key={dataIdx}>
                <div className={styles.breakpointItem}>
                  <div className={styles.breakpointView}>
                    {item.id === 'bp' ? (
                      <span className={cn(styles.arrowText, styles.size)}>
                        <span>{dataItem.code}</span>
                      </span>
                    ) : (
                      <>
                        {(dataItem.media && dataItem.media.min) && (
                          <span className={cn(styles.arrowText, styles.min)}>
                            <span>{dataItem.media.min}</span>
                          </span>
                        )}
                        {(dataItem.media && dataItem.media.max) && (
                          <span className={cn(styles.arrowText, styles.max)}>
                            <span>{dataItem.media.max}</span>
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className={styles.breakpointInfo}>
                    <button className={styles.btnToken} onClick={() => handleClickCopy(`${dataItem.title[styleType ? 0 : 1]}`)}>
                      <span className={styles.tit}>{dataItem.title[styleType ? 0 : 1]}</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

