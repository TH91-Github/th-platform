
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
import { GuestOnlyRoute, UserProtectedRoute } from "./ProtectedRoute";
import { NoticePage } from "@/pages/notice/NoticePage";

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
    id: 'notice',
    path: '/notice',
    element: <NoticePage />,
    handle: {
      title: 'Notice',
    },
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
  { // 게스트(비로그인)에서만 접근 가능
    element: <GuestOnlyRoute />,
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
    ],
    hideNav: true,
  },
  { // user 로그인 시 이용 가능
    element: <UserProtectedRoute />,
    children: [
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
