import { cn } from "@/utils/common";
import styles from './Btn.module.scss';

interface BtnPropsType extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  bType?: 'base' | 'primary' | 'point' | 'line' | 'gray' | 'red'
  reverse?:boolean, // 배경색과 border 색상 반전용
  skeleton?: boolean,
  ellipsis?: boolean,
  size?:'inline' | 'full' | 'small',
  freeHeight?: boolean,
  className?:string,
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

export const Btn = ({ 
  bType = 'base',
  reverse,
  ellipsis = false,
  skeleton = false,
  size = 'inline',
  freeHeight,
  className,
  children, 
  onClick, 
  ...rest
}: BtnPropsType) => {
  const {type, title, disabled} = rest;

  return (
    <button
      type={type ?? 'button'}
      title={title ?? 'click'}
      className={cn(
        styles.btn, 
        className,
        freeHeight && styles.freeMinH,
        styles[!reverse ? bType : `${bType}-border`],
        styles[size],
        ellipsis && styles.ellipsis,
        skeleton && styles.skeleton,
        disabled && styles.disabled,
      )}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};