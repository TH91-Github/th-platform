
import { MoreBtn } from '@/components/element/button/MoreBtn';
import { GnbMenu } from './gnbMenu/GnbMenu';
import styles from './HeaderLayout.module.scss';
import { Logo } from './logo/Logo';
import { ToolMenu } from './toolMenu/ToolMenu';

export const HeaderLayout = () => {
  
  return (
    <div className={styles.header}>
      <div className={`cont-inner ${styles['header-inner']}`}>
        <Logo />
        <GnbMenu />
        <ToolMenu />
        <MoreBtn />
      </div>
    </div>
  )
}