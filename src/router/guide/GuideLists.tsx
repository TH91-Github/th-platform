
import { ComponentsGuidePage } from "@/pages/guide/components/ComponentsGuidePage";
import { ElementCmPage } from "@/pages/guide/components/ElementCmPage";
import { ElementViewPage } from "@/pages/guide/components/ElementViewPage";
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
// ⭐ guideLists.ts 똑같이 추가 사용 데이터를 다룸.
export const GUIDE_LIST = [
  {
    id: "design",
    path: "design",
    element: <DesignGuidePage />,
    children: [
      {
        id: "icon",
        path: "icon",
        element: <IconGuidePage />
      },
      {
        id: "colors",
        path: "colors",
        element: <ColorsGuidePage />
      },
      {
        id: "fonts",
        path: "fonts",
        element: <FontsGuidePage />
      },
      {
        id: "breakpoints",
        path: "breakpoints",
        element: <BreakpointsGuidePage />
      },
    ],
  },
  {
    id: "components",
    path: "components",
    element: <ComponentsGuidePage />,
    children: [
      {
        id: "element",
        path: "element",
        element: <ElementCmPage />,
        children:[
          {
            id:'elementView',
            path:':id',
            element: <ElementViewPage />,
          },
        ]
      },
      {
        id: "modules",
        path: "modules",
        element: <ModulesCmPage />,
      },
      {
        id: "layout",
        path: "layout",
        element: <LayoutCmPage />,
      },
    ]
  },
  {
    id: "hooks",
    path: "hooks",
    element: <HooksGuidePage />,
  },
  {
    id: "utils",
    path: "utils",
    element: <UtilsGuidePage />,
  },
]