
import { cn } from '@/utils/common';
import styles from './HeaderLayout.module.scss';
import { useToggle } from '@/hook/common/useToggle';
import { LogoIcon } from '@/components/ui/icon/LogoIcon';
import { GnbMenu } from './gnbMenu/GnbMenu';
import { ToolMenu } from './toolMenu/ToolMenu';

export const HeaderLayout = () => {
  const [isFull, useIsFull] = useToggle(true);

  return (
    <div className={styles.header}>
      <div className={styles.header}>
        <div className={cn(isFull ? styles.full : 'cont-inner', styles.inner)}>
          <LogoIcon />
          <GnbMenu />
          <ToolMenu />
        </div>
      </div>
    </div>
  )
}