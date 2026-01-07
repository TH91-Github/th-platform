import { routerList } from '@/router/RouterList';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './GnbMenu.module.scss';
import { useEffect, useRef, useState } from 'react';

// const DEV_MODE = import.meta.env.DEV;

export const GnbMenu = () => {
  const location = useLocation();
  const navRefs = useRef<HTMLAnchorElement[]>([]);
  const [barStyle, setBarStyle] = useState({ left: 0, width: 0, top: 0 });

  const navLists = routerList.filter(
    // (item) => item.view !== 'dev' || DEV_MODE
    // 전체 노출, 조건 필요한 경우 사용
    (item) => item
  );

  const activeIndex = navLists.findIndex(
    (item) => item.path === location.pathname
  );

  // 활성 nav link 지정
  const setNavRef = (el: HTMLAnchorElement | null, index: number) => {
    if (el) navRefs.current[index] = el;
  };

  useEffect(() => {
    const activeEl = navRefs.current[activeIndex];
    if (activeEl) {
      const { offsetLeft, offsetWidth } = activeEl;
      setBarStyle({ left: offsetLeft, width: offsetWidth, top:0 });
    }else{
      setBarStyle({ ...barStyle, top:100 });
    }
  }, [activeIndex, location]);

  return (
    <div className={styles.gnb}>
      <ul className={styles.lists}>
        {navLists.map((navItem, idx) => (
          <li key={idx} className={styles.navItem}>
            <NavLink
              to={navItem.path}
              className={styles.navLink}
              ref={(el) => setNavRef(el, idx)}
            >
              <span className={styles.navTit}>{navItem.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <span
        className={styles.activeBar}
        style={{
          transform: `translate(${barStyle.left}px, ${barStyle.top}px)`
        }}
      ></span>
    </div>
  );
};
