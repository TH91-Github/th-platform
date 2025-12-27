import { IconOutLink } from "@/assets/icon";
import { cn } from "@/utils/common";
import styles from './OutLink.module.scss';


interface OutLinkPropsType {
  href: string;
  alt?: string;
  target?: string;
  title: string;
  className?: string;
};

export const OutLink = ({
  href, 
  alt, 
  target = '_blank',
  title, 
  className
}: OutLinkPropsType) => {
  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      title={`${alt || title} 새 창`}
      className={cn(styles.link, className)}
    >
      <span>{title}</span>
      <span className={styles.icon}><IconOutLink /></span>
    </a>
  )
};