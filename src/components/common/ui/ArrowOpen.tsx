import { cn } from "@/utils/common"
import styled from "@emotion/styled";
import styles from './ArrowOpen.module.scss';

// 🔹 화살표 ▽△ 위 아래 방행 on, off  
interface ArrowOpenPropsType {
  open : boolean,
  $size? : number,
  $color? : string,
}
export const ArrowOpen = ({open, $size}:ArrowOpenPropsType) => {
  return (
    <StyleWrap 
      $size={$size ? $size : 20}
      className={cn(open && 'open')}
    ></StyleWrap>
  )
}

interface StyleWrapPropsType {
  $size: number,
  $color?: string,
}
const StyleWrap = styled.span<StyleWrapPropsType>`
  position:absolute;
  top:50%;
  right:10px;
  width:${({$size}) => $size}px;
  height:${({$size}) => $size}px;
  transform: translateY(-50%);
  &::before, &::after {
    position:absolute;
    top:50%;
    width:50%;
    height:2px;
    background-color:${({$color}) => $color ? $color : `var(--color)`};
    border-radius: 2px;
    transform-origin: center center;
    transition: var(--transition-transform);
    content:'';
  }
  &::before {
    left:calc(5% + 1px);
    transform: rotate(-135deg);
    
  }
  &::after {
    right:calc(5% + 1px);
    transform: rotate(-45deg);
  }
  &.open {
    &::before {
      transform: rotate(-45deg);
    }
    &::after {
      transform: rotate(-135deg);
    }
  }
`;