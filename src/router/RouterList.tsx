
// 🔹 Pages
import { AboutPage } from "@/pages/about/AboutPage";
import { ContactPage } from "@/pages/contact/ContactPage";
import { DivisionPage } from "@/pages/division/DivisionPage";
import { GuidePage } from "@/pages/guide/GuidePage";
import { HubMainPage } from "@/pages/hub/HubMainPage";
import { HubPage } from "@/pages/hub/HubPage";
import { RoomCalendarPage } from "@/pages/hub/RoomCalendarPage";
import { RoomCashledgerPage } from "@/pages/hub/RoomCashledgerPage";
import { RoomMemoPage } from "@/pages/hub/RoomMemoPage";
import { RoomRunPage } from "@/pages/hub/RoomRunPage";
import { RoomTravelPage } from "@/pages/hub/RoomTravelPage";
import { MembersPage } from "@/pages/members/MembersPage";
import { MyPage } from "@/pages/members/MyPage";
import { NoticePage } from "@/pages/notice/NoticePage";
import { PortfolioPage } from "@/pages/portfolio/PortfolioPage";
import { RunPage } from "@/pages/run/RunPage";
import { GUIDE_LIST } from "./guide/GuideLists";
import { GuestOnlyRoute, UserProtectedRoute } from "./ProtectedRoute";

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
        element: <HubMainPage />,
        handle: {
          title: 'Hub',
        },
      },
      {
        id: 'hub-travel',
        path: '/hub/travel/:id',
        element: <RoomTravelPage />,
        handle: {
          title: '여행',
        },
      },
      {
        id: 'hub-calendar',
        path: '/hub/calendar/:id',
        element: <RoomCalendarPage />,
        handle: {
          title: '캘린더',
        },
      },
      {
        id: 'hub-memo',
        path: '/hub/memo/:id',
        element: <RoomMemoPage />,
        handle: {
          title: '메모',
        },
      },
      {
        id: 'hub-cashledger',
        path: '/hub/cashledger/:id',
        element: <RoomCashledgerPage />,
        handle: {
          title: '가계부',
        },
      },
      {
        id: 'hub-running',
        path: '/hub/running:id',
        element: <RoomRunPage />,
        handle: {
          title: '러닝',
        },
      },
    ],
    hideNav: false,
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
