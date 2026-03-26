import styles from './GuideNav.module.scss';
import { useLocationPath } from '@/hook/common/useLocation';
import { NavLink, useLocation } from 'react-router-dom';
import { startTransition, useCallback, useEffect, useMemo, useState } from 'react';
import { Accordion } from '@/components/element/accordion/Accordion';
import { cn } from '@/utils/common';
import { GuideIcon } from './GuideIcon';
import { guideLists } from '@/data/guide/guideLists';
import { useIsMobile } from '@/store/zustand/common/commonStore';

export const GuideNav = ({isFold}:{isFold:boolean}) => {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const { locationIdx } = useLocationPath(guideLists, "id");
  const routeActiveIndexes = useMemo(
    () => (locationIdx >= 0 ? [locationIdx] : []),
    [locationIdx]
  );
  const [activeIndexes, setActiveIndexes] = useState<number[]>(routeActiveIndexes);

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

  useEffect(() => {
    startTransition(() => {
      setActiveIndexes(routeActiveIndexes);
    });
  }, [routeActiveIndexes]);

  const renderGuideItem = useCallback((accItem: typeof guideLists[number], index: number, activeIndexes: number[]) => {
    const isExpanded = activeIndexes.includes(index);
    const sectionPath = `/guide/${accItem.path}`;
    const isCurrent = pathname === sectionPath || pathname.startsWith(`${sectionPath}/`);

    return {
      heading: {
        title: accItem.title,
        className: styles.accBtn,
        jsx: accItem.children ? (
          <span
            className={cn(
              styles.navBtn,
              isExpanded && styles.expanded,
              isCurrent && styles.current,
            )}
          >
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
          {accItem.children.map((childrenItem, childrenIdx) => (
            <div className={styles.depthItem} key={childrenIdx}>
              <NavLink
                to={`/guide/${guidePath(accItem.path, childrenItem.path)}`}
                className={styles.navLink}
                title={`${childrenItem.title} 보기`}
              >
                <IconTitle id={childrenItem.id} title={childrenItem.title} />
              </NavLink>
            </div>
          ))}
        </div>
      ) : null,
    };
  }, [IconTitle, guidePath, pathname]);

  return (
    <Accordion
      data={guideLists}
      activeIndexes={activeIndexes}
      onActiveChange={setActiveIndexes}
      smoothAni={!isMobile}
      className={cn(styles.nav, isFold && styles.fold)}
      accOpt={{
        titFull: true,
        openIcon: isFold ? 'none' : 'arrow',
      }}
      itemKey={(item) => item.id}
      renderItem={(accItem, { index, activeIndexes }) => renderGuideItem(accItem, index, activeIndexes)}
    />
  )
}
