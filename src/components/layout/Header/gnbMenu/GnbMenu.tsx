import { routerList } from '@/router/RouterList';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './GnbMenu.module.scss';
import { useEffect, useRef, useState } from 'react';

const DEV_MODE = import.meta.env.DEV;

export const GnbMenu = () => {
  const location = useLocation();
  const navRefs = useRef<HTMLAnchorElement[]>([]);
  const [barStyle, setBarStyle] = useState({ left: 0, width: 0 });

  const navLists = routerList.filter(
    (item) => item.view !== 'dev' || DEV_MODE
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
      setBarStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeIndex, location]);

  return (
    <div className={styles.gnb}>
      <ul className={styles.lists}>
        {navLists.map((navItem, idx) => (
          <li key={idx} className={styles['nav-item']}>
            <NavLink
              to={navItem.path}
              className={styles['nav-link']}
              ref={(el) => setNavRef(el, idx)}
            >
              <span className={styles['nav-tit']}>{navItem.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <span
        className={styles['active-bar']}
        style={{
          transform: `translateX(${barStyle.left}px)`
        }}
      ></span>
    </div>
  );
};
