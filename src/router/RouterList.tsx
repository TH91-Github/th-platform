
// 🔹 Pages

import { AboutPage } from "@/pages/about/AboutPage";
import { ContactPage } from "@/pages/contact/ContactPage";
import { DivisionPage } from "@/pages/division/DivisionPage";
import { GuidePage } from "@/pages/guide/GuidePage";
import { PortfolioPage } from "@/pages/portfolio/PortfolioPage";
import { GUIDE_LIST } from "./guide/GuideLists";
import { HubPage } from "@/pages/hub/HubPage";
import { HubMain } from "@/components/pages/hub/HubMain";
import { MyPage } from "@/pages/members/MyPage";
import { MembersPage } from "@/pages/members/MembersPage";
import { RunPage } from "@/pages/run/RunPage";
import { UserProtectedRoute } from "./ProtectedRoute";

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
    ],
    hideNav: true,
  },
  {
    id: 'about',
    path: '/about',
    element: <AboutPage />,
    handle: {
      title: 'About',
    },
    hideNav: true,
  },
  {
    id: 'portfolio',
    path: '/portfolio',
    element: <PortfolioPage />,
    handle: {
      title: 'Portfolio',
    },
    hideNav: true,
  },
  {
    id: 'division',
    path: '/division',
    element: <DivisionPage />,
    handle: {
      title: 'Division',
    },
    hideNav: true,
  },
  {
    id: 'contact',
    path: '/contact',
    element: <ContactPage />,
    handle: {
      title: 'Contact',
    },
    hideNav: true,
  },
  {
    id: 'run',
    path: 'run',
    element: <RunPage />,
    handle: {
      title: 'RunPulse',
    },
    hideNav: true,
  },
  { // user 로그인 시 접근 제한
    element: <UserProtectedRoute />,
    children: [
      {
        id: 'members',
        path: '/members',
        element: <MembersPage />,
        handle: {
          title: 'Members',
        },
        hideNav: true,  
      },
      {
        id: 'mypage',
        path: 'mypage',
        element: <MyPage />,
        handle: {
          title: 'MyPage',
        },
      }
    ],
    hideNav: true,
  }
];
