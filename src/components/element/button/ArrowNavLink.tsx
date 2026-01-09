import { NavLink } from 'react-router-dom';
import styles from './ArrowNavLink.module.scss';
import { cn } from '@/utils/common';
import { IconArrowRight } from '@/assets/icon';

// 🔹 내부 Navlink 링크 
interface ArrowNavLinkPropsType {
  title: string, // 버튼 타이틀
  altTitle?: string, // title 따로 지정
  link: string, // 이동 경로
  action?: boolean, // hover, focus 시 액션 보여지는지
  className?: string,
}
export const ArrowNavLink = ({
  title, altTitle,
  link, action, className
}: ArrowNavLinkPropsType) => {
  return (
    <span className={cn(styles.arrowLink, action && styles.action, className)}>
      <NavLink 
        to={link} 
        title={altTitle ?? title} 
        className={styles.btnLink}
      >
        <span className={styles.tit}>{title}</span>
        {
          Array.from({ length: 3 }, (_, idx) => (
            <span className={styles.arrow} key={idx}>
              <IconArrowRight />
            </span>
          ))
        }
      </NavLink>
    </span>
  )
}