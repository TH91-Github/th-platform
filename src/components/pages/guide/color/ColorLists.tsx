import { TitlePoint } from '@/components/ui/text/TitlePoint';
import type { ColorDataType } from '@/data/guide/colorsData';
import { ColorChip } from './ColorChip';
import styles from './ColorLists.module.scss';

// 🔹 컬러칩 리스트
interface ColorListsPropsType{
  data: ColorDataType,
  depth?: 1 | 2 // 타이틀 텍스트와 포인트가 바뀜
} 
export const ColorLists = ({data, depth}:ColorListsPropsType) => {
  return (
    <div className={styles.colorLists}>
      <div className={styles.heading}>
        <TitlePoint
          title={data.title}
          pointType={depth === 1 ? 'underline' : "bar"}
          $fontSize={depth === 1 ? 20 : 18}
        />
        <p className={styles.desc}>{data.desc}</p>
      </div>
      
      <div className={styles.chipLists}>
        {data.lists.map((chipItem) => ( 
          <ColorChip
            data={chipItem}
            chipType={data.id ==='shadow' ? 'shadow': 'color'}
            key={chipItem.code}
          />
        ))}
      </div>
    </div>
  )
}