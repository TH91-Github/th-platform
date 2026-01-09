import { ellipsis } from "@/assets/style/emotion/styles";
import type { ColorListsDataType } from "@/data/guide/colorsData";
import { useCopyToast } from "@/hook/common/useCopyToast";
import { cn } from "@/utils/common";
import styled from "@emotion/styled";

// 🔹 컬러칩
interface ColorChipPropsType {
  data: ColorListsDataType,
  afterimage?:boolean,
  chipType?:string,
}
export const ColorChip = ({data, afterimage, chipType='color'}:ColorChipPropsType) => {
  const { copy } = useCopyToast();

  const handleColorClick = async (e:string) => {
    copy(e,{type:'success'});
  }
  
  return (
    <StyleColorItem
      $bg={chipType !== 'shadow' ? data.code : 'transparent'}
      $shadow={chipType !== 'shadow' ? undefined : data.code}
      className={cn(chipType ==='option' && 'option')}
    >
      <button 
        type="button"
        className={cn('chip-btn', afterimage && 'afterimage')}
        onClick={() => handleColorClick(data.root ? data.root : data.scss)}
      >
        {afterimage && <span className="afterimage-item"></span>}
        {data.isText && <span className="is-text">TEST Title</span>}
      </button>
      <div className="chip-info">
        <p className="chip-tit">{data.title}</p>
        <span className="chip-text">HEX {data.code}</span>
        { data.rgb && <span className="chip-text">RGB ({data.rgb})</span>}
        <span className="chip-text">scss {data.scss}</span>
        {data.emotion && <span className="chip-text">emotion {data.emotion}</span> }
        {data.root && <span className="chip-text">:root {data.root}</span>}
      </div>
      {
        chipType ==='option' && <p className='ref-desc'>투명도 확인용 👆</p>
      }
    </StyleColorItem>
  )
}

interface StyleColorItemType {
  $bg:string,
  $shadow?:string,
}
const StyleColorItem = styled.div<StyleColorItemType>`
  display:flex;
  flex-direction: column;
  gap:10px;
  &.option {
    position:relative;
    &::before{
      position:absolute;
      top:10px;
      right:0px;
      width:10px;
      height:10px;
      border-radius:50%;
      background: var(--color-point);
      animation: aniOptionCircle 3s linear infinite;
      content:'';
    }
    @keyframes aniOptionCircle { 
      0%, 100% { 
        transform: translateX(0);
      }
      50% { 
        transform: translateX(10px);
      }
    }
    .chip-btn{
      position:relative;
      z-index:2;
    }

  }
  .chip-btn{
    display:block;
    width:100%;
    height:50px;
    border-radius:5px;
    border: 1px solid transparent;
    background-color: ${({$bg}) => $bg};
    transition: var(--transition-border);
    ${({$shadow}) => $shadow && `
      box-shadow: ${$shadow};
    `}
    &.afterimage{
      position:relative;
      background-color:transparent;
      &::before, &::after{
        position:absolute;
        top:0;
        left:0;
        width:60%;
        height:100%;
        border-radius:5px;
        background-color: ${({$bg}) => $bg};
        content:''
      }
      &::after{ 
        left:10%;
        opacity:0.8;
      }
      .afterimage-item {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color:transparent;
        &::before, &::after{
          position:absolute;
          top:0;
          left:20%;
          width:60%;
          height:100%;
          border-radius:5px;
          background-color: ${({$bg}) => $bg};
          opacity:0.6;
          content:''
        }
        &::after{ 
          left:30%;
          opacity:0.4;
        }
      }
    }
    &:hover, &:focus{
      border-color: var(--color-point);
    }
  }
  .chip-info{
    display:flex;
    flex-direction: column;
  }
  .chip-tit{
    font-weight:600;
    color: var(--color-title);
    transition: var(--transition-color);
  }
  .chip-text{
    font-size: 12px;
    ${ellipsis(1,1.3)}
    color: var(--color-sub-text);
    transition: var(--transition-color);
  }
  .ref-desc{
    position:absolute;
    z-index:2;
    top:25px;
    left:50%;
    font-size:12px;
    white-space: nowrap;
  }
  .is-text{
    ${({$shadow}) => $shadow && `
      text-shadow: ${$shadow};
    `}
  }
`;