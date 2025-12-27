import { guideLists, type GuideChildrenType } from '@/data/guide/guideLists';
import { useLocationPath } from '@/hook/common/useLocation';
import { capitalizeWords } from '@/utils/textUtils';
import styles from './GuideContHeader.module.scss';
import { OutLink } from '@/components/ui/text/OutLink';
import { cn } from '@/utils/common';
import { TitlePoint } from '@/components/ui/text/TitlePoint';

export const GuideContHeader = () => {
  const { locationItem, currentPath } = useLocationPath(guideLists, 'id');
  // children이 없으면 locationItem을 data로 사용
  let data: GuideChildrenType | undefined;

  if (!locationItem) {
    return null;
  }
  
  if (!locationItem.children) {
    data = locationItem as GuideChildrenType;
  } else {
    data = locationItem.children.find(item => item.id === currentPath);
  }
  console.log(data)

  if (!data) return null;

  return (
    <div className={styles.header}>
      <TitlePoint 
        titleTag={'h3'}
        title={capitalizeWords(data.id)}
        $fontSize={32}
        className={styles.title}
      />
      <ul className={cn(styles.descLists, 'bullet-lists')}>
         {data?.desc?.map((descItem, descIdx) => (
            <li className={styles.desc} key={descIdx}>
              <span>{descItem}</span>
            </li>
          ))
        }
      </ul>
     
      {
        (data.linkLists && data.linkLists.length > 0) && ( 
          <ul className={cn(styles.linkLists, 'bullet-lists')}>
            { data.linkLists?.map((linkItem,linkIdx) => (
              <li key={linkIdx}>
                <OutLink
                  href={linkItem.link}
                  title={linkItem.title}
                />
              </li>
            ))}
          </ul>
        )
      }
    </div>
  )
}