import { IconBP, IconCode, IconColor, IconComponents, IconDesign, IconFont, IconHook, IconIcon, IconLayout, IconModule, IconPart } from "@/assets/icon";
import { useMemo } from "react";

export const GuideIcon = ({id}:{id:string}) => {
  const iconTit:{[key:string] : React.ReactNode} = useMemo(() =>{ 
      return {
        design:<IconDesign />,
        components:<IconComponents />,
        icon: <IconIcon />,
        colors: <IconColor />,
        fonts: <IconFont />,
        breakpoints: <IconBP />,
        element: <IconPart />, // 컴포넌트
        module: <IconModule />,
        layout: <IconLayout />,
        hooks: <IconHook />,
        utils: <IconCode />,
      };
    },[]);
  return(
    <>{iconTit[id]}</>
  )
}