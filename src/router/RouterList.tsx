
// 🔹 Pages

import { AboutPage } from "@/pages/about/AboutPage";
import { ContactPage } from "@/pages/contact/ContactPage";
import { DivisionPage } from "@/pages/division/DivisionPage";
import { GuidePage } from "@/pages/guide/GuidePage";
import { PortfolioPage } from "@/pages/portfolio/PortfolioPage";
import { GUIDE_LIST } from "./guide/GuideLists";
import { RunPage } from "@/pages/run/RunPage";
import { HubPage } from "@/pages/hub/HubPage";
import { HubMain } from "@/components/pages/hub/HubMain";

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
  {
    id: 'hub',
    path: '/hub',
    element: <HubPage />,
    handle: {
      title: 'Hub',
    },
    children: [
      {
        id: 'hub-main',
        index:true,
        element: <HubMain />,
        handle: {
          title: 'Hub',
        },
      },
    ]
  },
  // {
  //   id: 'run',
  //   path: 'run',
  //   element: <RunPage />,
  //   handle: {
  //     title: 'RunPulse',
  //   }
  // },
];
