import styles from './GuideNav.module.scss';
import { useLocationPath } from '@/hook/common/useLocation';
import { NavLink } from 'react-router-dom';
import { useCallback } from 'react';
import { Accordion } from '@/components/element/accordion/Accordion';
import { cn } from '@/utils/common';
import { GuideIcon } from './GuideIcon';
import { guideLists } from '@/data/guide/guideLists';

export const GuideNav = ({isFold}:{isFold:boolean}) => {
  const { locationIdx } = useLocationPath(guideLists, "id");

  const guidePath = useCallback((itemPath: string, childrenPath: string) => {
    const routesCheck = childrenPath.indexOf("/:id");
    return `${itemPath}${routesCheck === -1 ? `/${childrenPath}` : ""}`;
  }, []);

  const IconTitle = useCallback(({ id, title }: { id: string; title: string }) => (
    <>
      <span className={styles.icon}><GuideIcon id={id} /></span>
      <span className={styles.navTit}>{title}</span>
    </>
  ), []);

  return (
    <Accordion
      data={guideLists}
      initActive={[locationIdx]}
      smoothAni={true}
      className={cn(styles.nav, isFold && styles.fold)}
    >
      {(accItem, accIdx, actives) => ({
        heading: {
          btnTit: accItem.title,
          className:styles.accBtn,
          jsx: accItem.children ? (
            <span className={cn(styles.navBtn, actives.includes(accIdx) && styles.active)}>
              <IconTitle id={accItem.id} title={accItem.title} />
              <span className={styles.navLength}>{accItem.children?.length}</span>
            </span>
          ) : (
            <NavLink
              to={`/guide/${accItem.path}`}
              className={styles.navLink}
              title={`${accItem.title} 보기`}
            >
              <IconTitle id={accItem.id} title={accItem.title} />
            </NavLink>
          ),
        },
        content: accItem.children ? (
          <div className={styles.depth}>
            {
              accItem.children.map((childrenItem, childrenIdx) => (
                // 하위 링크
                <div className={styles.depthItem} key={childrenIdx}>
                  <NavLink
                    to={`/guide/${guidePath(
                      accItem.path,
                      childrenItem.path
                    )}`}
                    className={styles.navLink}
                    title={`${childrenItem.title} 보기`}
                    key={childrenIdx}
                  >
                    <IconTitle id={childrenItem.id} title={childrenItem.title} />
                  </NavLink>
                </div>
              ))
            }
          </div>
        ) : null,
      })}
    </Accordion>
  )
}