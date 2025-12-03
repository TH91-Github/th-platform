import { colors } from "assets/style/variables";
import { IconCheck } from "assets/svg/icons";
import { useToastList } from "hooks/useToast";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { cn } from "utils/common";

// 🔹 Toast 
export const Toasts = () => {
  const toasts = useToastList();

  return createPortal(
    <StyleWrap className="toast-container">
      {toasts.map(({ id, visible, message, type }) => (
        <div 
          key={id} 
          className={cn('toast', type, visible ? 'show' : 'hide')}
        >
          <span className="mgessage">
            <span className="icon"><IconCheck /></span>
            <span className="txt">{message}</span>
          </span>
        </div>
      ))}
    </StyleWrap>,
    document.body
  );
}

const StyleWrap = styled.div`
display:flex;
flex-direction: column;
gap:10px;
align-items:center;
position: fixed;
z-index: 9999;
bottom:0;
left: 50%;
padding-bottom:10px;
transform: translateX(-50%);
.toast {
  overflow:hidden;
  position:relative;
  border-radius: 5px;
  border-left:none;
  background:#fff;
  transition: transform 0.3s ease, opacity 0.3s ease;
  animation: toastAniUp .3s ease;
  &::before {
    position:absolute;
    top:0;
    left:0;
    width:5px;
    height:100%;
    border:1px solid ${colors.mSlateBlue};
    background:${colors.mSlateBlue};
    content:'';
  }
  .mgessage {
    display:flex;
    align-items:center;
    gap:5px;
    padding: 8px 16px;
    border:1px solid ${colors.lineColor};
    border-left:none;
    .icon {
      display:inline-block;
      width:16px;
      height:16px;
      color: ${colors.mSlateBlue};
    }
    .txt {
      font-size:14px;
    }
  }
    
  &.success{
    &::before {
      border-color: ${colors.green};
      background:${colors.green};
    }
    .icon { 
      color: ${colors.green};
    }
  }
  &.error{
    &::before {
      border-color: ${colors.red};
      background:${colors.red};
    }
    .icon { 
      color: ${colors.red};
    }
  }
  &.show {
    opacity: 1;
    animation: toastAniUp .3s ease;
  }
  &.hide {
    opacity: 0;
    transform: translateY(100%);
  }
}

@keyframes toastAniUp { 
  from{
    transform: translateY(100%);
  }
  to{
    transform: translateY(0);
  }
}
`;