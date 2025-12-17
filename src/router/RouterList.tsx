
// 🔹 Pages

import { AboutPage } from "@/pages/about/AboutPage";
import { ContactPage } from "@/pages/contact/ContactPage";
import { DivisionPage } from "@/pages/division/DivisionPage";
import { GuidePage } from "@/pages/guide/GuidePage";
import { PortfolioPage } from "@/pages/portfolio/PortfolioPage";
import { GUIDE_LIST } from "./guide/GuideLists";

export const routerList = [
  { //  개발 전용
    id:'guide',
    path: '/guide',
    title:'Guide',
    view: 'dev', // dev모드
    element: <GuidePage />,
    children: [...GUIDE_LIST],
  },
  {
    id:'about',
    path: '/about',
    title:'About',
    element: <AboutPage />,
    children:[
      // about
      // ceo
      //contact us
    ]
  },
  {
    id:'portfolio',
    path: '/portfolio',
    title:'Portfolio',
    element: <PortfolioPage />,
    children:[
      // 통합 or 부문별 작업 
    ]
  },
  {
    id:'division',
    path: '/division',
    title:'Division',
    element: <DivisionPage />,
    children:[
      // 1 or 하위
    ]
    //Division 상위 / Department 하위
  },
  {
    id:'contact',
    path: '/contact',
    title:'Contact',
    element: <ContactPage />,
    children:[
      // 1 or 하위
    ]
  },
];


