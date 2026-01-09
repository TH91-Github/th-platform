
import { ComponentsGatePage } from "@/pages/guide/components/ComponentsGatePage";
import { ComponentsGuidePage } from "@/pages/guide/components/ComponentsGuidePage";
import { DetailViewPage } from "@/pages/guide/components/DetailViewPage";
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
    id: 'design',
    path: 'design',
    element: <DesignGuidePage />,
    handle: {
      title: 'design',
    },
    children: [
      {
        id: 'icon',
        path: 'icon',
        element: <IconGuidePage />,
        handle: {
          title: 'icon',
        },
      },
      {
        id: 'colors',
        path: 'colors',
        element: <ColorsGuidePage />,
        handle: {
          title: 'colors',
        },
      },
      {
        id: 'fonts',
        path: 'fonts',
        element: <FontsGuidePage />,
        handle: {
          title: 'fonts',
        },
      },
      {
        id: 'breakpoints',
        path: 'breakpoints',
        element: <BreakpointsGuidePage />,
        handle: {
          title: 'breakpoints',
        },
      },
    ],
  },
  {
    id: 'components',
    path: 'components',
    element: <ComponentsGuidePage />,
    handle: {
      title: 'components',
    },
    children: [
      {
        id: 'element',
        path: 'element',
        element: <ComponentsGatePage />,
        handle: {
          title: 'Element',
        },
        children: [
          {
            id: 'elementView',
            path: ':id',
            element: <DetailViewPage />,
            handle: {
              title: ({ id }: {id:string}) => `Element - ${id}`,
            },
          },
        ],
      },
      {
        id: 'module',
        path: 'module',
        element: <ComponentsGatePage />,
        handle: {
          title: 'module',
        },
        children: [
          {
            id: 'moduleView',
            path: ':id',
            element: <DetailViewPage />,
            handle: {
              title: ({ id }: {id:string}) => `Module - ${id}`,
            },
          },
        ],
      },
      {
        id: 'layout',
        path: 'layout',
        element: <ComponentsGatePage />,
        handle: {
          title: 'layout',
        },
        children: [
          {
            id: 'layoutView',
            path: ':id',
            element: <DetailViewPage />,
            handle: {
              title: ({ id }: {id:string}) => `Layout - ${id}`,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'hooks',
    path: 'hooks',
    element: <HooksGuidePage />,
    handle: {
      title: 'hooks',
    },
  },
  {
    id: 'utils',
    path: 'utils',
    element: <UtilsGuidePage />,
    handle: {
      title: 'utils',
    },
  },
];
