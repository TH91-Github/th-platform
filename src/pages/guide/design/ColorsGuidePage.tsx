import { ColorChip } from '@/components/pages/guide/color/ColorChip';
import { TitlePoint } from '@/components/ui/text/TitlePoint';
import { colorsData, themeColorData } from '@/data/guide/colorsData';
import styles from './ColorsGuidePage.module.scss';
export const ColorsGuidePage = () => {

  return( 
    <div className={styles.color}>
      {/* 라이트/다크 테마 */}
      <div className={styles.colorItem}>
        <TitlePoint
          title="Theme Color"
          pointType="underline"
          $fontSize={20}
        />
        <div className={styles.themeColor}>
          {
            themeColorData.map((themeItem, themeIdx) => (
              <div className={styles[themeItem.id]} key={themeItem.id + themeIdx}>
                <p className={styles.themeTit}>{themeItem.title} Theme</p>
                {themeItem.data.map((modeItem,lightIdx) =>
                  <div className={styles.themeItem} key={modeItem.id + lightIdx}>
                    <p className={styles.tit}>{modeItem.title}</p>
                    <p className={styles.desc}>{modeItem.desc}</p>
                    <div className={styles.chipLists}>
                      {modeItem.lists.map((chipItem, chipIdx) => ( 
                        <ColorChip
                          data={chipItem}
                          chipType={modeItem.id ==='shadow' ? 'shadow': 'color'}
                          key={chipItem.code + chipIdx}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          }
        </div>
      </div>
      {/* 일반 테마 */}
      { colorsData.map((colorItem, colorIdx) => (
        <div className={styles.colorItem} key={colorItem.id + colorIdx}>
          <TitlePoint
            title={colorItem.title}
            pointType="underline"
            $fontSize={20}
          />
          <div className={styles.chipLists}>
            {colorItem.lists.map((chipItem) => ( 
              <ColorChip
                data={chipItem}
                afterimage={colorItem.id === 'system'}
                chipType={colorItem.id ==='shadow' ? 'shadow': 'color'}
                key={chipItem.code}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
