import { colors } from "assets/style/variables";
import styled from "styled-components"
import { cn } from "utils/common";
import { createPortal } from "react-dom";
// 🔹 로딩바
interface LoadingAnimationType {
  dimmed?:boolean;
  cubeColor?: string;
  mode?: 'body' | 'local';
}
export const Loading = ({dimmed = false, cubeColor = colors.mSlateBlue, mode = 'local'}:LoadingAnimationType) => {

  const loadingContent = (
    <StyleLoading 
      className={cn('loading-wrap',mode ==='body' && 'is-fixed',dimmed && 'dimmend')}
      $cubeColor={cubeColor}
    >
      <div className="loading">
        <div className="ani-box">
          {
            Array.from({ length: 4 }, (_, idx) => (
              <span className="cube" key={idx}></span>
            ))
          }
        </div>
        <span className="txt">Loading...</span>
      </div>
    </StyleLoading>
  )

  // body 
  if (mode === 'body') {
    return typeof window !== 'undefined' ? createPortal(loadingContent, document.body) : null;
  }
  return loadingContent;
}
type StyleLoadingType = {
  $cubeColor:string
}
const StyleLoading = styled.div<StyleLoadingType>`
position:absolute;
z-index:100;
top:0;
left:0;
width:100%;
height:100%;
&.is-fixed{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
}
&.dimmend{
  background:rgba(255,255,255,0.5);
}
.loading{
  position:absolute;
  top:50%;
  left:50%;
  width:45px;
  height:45px;
  transform: translate(-50%, -50%);
}
.ani-box{
  width:100%;
  height:100%;    
  animation: loading-center-absolute 1s infinite;
}
.cube {
  position:absolute;
  width:15px;
  height:15px;
  border-radius:5px;
  background:${colors.mSlateBlue};
  &:nth-child(1){
    top:0;
    left:0;
    animation: cubeAni1 1s infinite;
  }
  &:nth-child(2){
    top:0;
    right:0;
    animation: cubeAni2 1s infinite;
  }
  &:nth-child(3){
    bottom:0;
    right:0;
    animation: cubeAni3 1s infinite;
  }
  &:nth-child(4){
    bottom:0;
    left:0;
    animation: cubeAni4 1s infinite;
  }
}

@keyframes loading-center-absolute{
  100% {
    transform: rotate(360deg); 
  }
}	
@keyframes cubeAni1{
  50% {
    transform: translate(20px,20px) rotate(180deg);
  }
}
@keyframes cubeAni2{
  50% {
    transform: translate(-20px,20px) rotate(-180deg);
  }
}
@keyframes cubeAni3{
  50% {
    transform: translate(-20px,-20px) rotate(180deg);
  }
}
@keyframes cubeAni4{
  50% {
    transform: translate(20px,-20px) rotate(-180deg);
  }
}
.txt { 
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  font-size:12px;
  color:${props => props.theme.color};
}
`; 