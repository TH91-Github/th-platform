
// 🔹 Pages

import { HubMain } from "@/components/pages/hub/HubMain";
import { GuidePage } from "@/pages/guide/GuidePage";
import { HubPage } from "@/pages/hub/HubPage";
import { GUIDE_LIST } from "./guide/GuideLists";
export const routerList = [
  {
    id: 'guide',
    path: '/guide',
    element: <GuidePage />,
    handle: {
      title: 'Guide',
    },
    children: [...GUIDE_LIST],
  },
  // {
  //   id: 'hub',
  //   path: '/hub',
  //   element: <HubPage />,
  //   handle: {
  //     title: 'Hub',
  //   },
  //   children: [
  //     {
  //       id: 'hub-main',
  //       index:true,
  //       element: <HubMain />,
  //       handle: {
  //         title: 'Hub',
  //       },
  //     },
  //   ]
  // },
  // {
  //   id: 'run',
  //   path: 'run',
  //   element: <RunPage />,
  //   handle: {
  //     title: 'RunPulse',
  //   }
  // },
];
