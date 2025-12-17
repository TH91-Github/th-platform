import { ComponentsGuidePage } from "@/pages/guide/components/ComponentsGuidePage";
import { ElementCmPage } from "@/pages/guide/components/ElementCmPage";
import { LayoutCmPage } from "@/pages/guide/components/LayoutCmPage";
import { ModulesCmPage } from "@/pages/guide/components/ModulesCmPage";
import { BreakpointsGuidePage } from "@/pages/guide/design/BreakpointsGuidePage";
import { ColorsGuidePage } from "@/pages/guide/design/ColorsGuidePage";
import { DesignGuidePage } from "@/pages/guide/design/DesignGuidePage";
import { FontsGuidePage } from "@/pages/guide/design/FontsGuidePage";
import { IconGuidePage } from "@/pages/guide/design/IconGuidePage";
import { HooksGuidePage } from "@/pages/guide/hooks/HooksGuidePage";
import { UtilsGuidePage } from "@/pages/guide/utils/UtilsGuidePage";

// 🔹 guide page 리스트 
export const GUIDE_LIST = [
  {
    id: "design",
    path: "design",
    title: "디자인",
    element: <DesignGuidePage />,
    children: [
      {
        id: "icon",
        path: "icon",
        title: "아이콘",
        element: <IconGuidePage />
      },
      {
        id: "colors",
        path: "colors",
        title: "색상",
        element: <ColorsGuidePage />
      },
      {
        id: "fonts",
        path: "fonts",
        title: "글자",
        element: <FontsGuidePage />
      },
      {
        id: "breakpoints",
        path: "breakpoints",
        title: "브레이크 포인트",
        element: <BreakpointsGuidePage />
      },
    ],
  },
  {
    id: "components",
    path: "components",
    title: '컴포넌트',
    element: <ComponentsGuidePage />,
    children: [
      {
        id: "element",
        path: "element",
        title: "기능",
        element: <ElementCmPage />,
      },
      {
        id: "modules",
        path: "modules",
        title: "모듈",
        element: <ModulesCmPage />,
      },
      {
        id: "layout",
        path: "layout",
        title: "레이아웃",
        element: <LayoutCmPage />,
      },
    ]
  },
  {
    id: "hooks",
    path: "hooks",
    title: "커스텀 훅",
    element: <HooksGuidePage />,
  },
  {
    id: "utils",
    path: "utils",
    title: "유틸 함수",
    element: <UtilsGuidePage />,
  },
]