
// 🔹 Pages

import { AboutPage } from "@/pages/about/AboutPage";
import { ContactPage } from "@/pages/contact/ContactPage";
import { DivisionPage } from "@/pages/division/DivisionPage";
import { GuidePage } from "@/pages/guide/GuidePage";
import { PortfolioPage } from "@/pages/portfolio/PortfolioPage";
import { GUIDE_LIST } from "./guide/GuideLists";

export const routerList = [
  { 
    id:'guide',
    path: '/guide',
    title:'Guide',
    // view: 'dev', // dev모드
    element: <GuidePage />,
    children: [...GUIDE_LIST],
  },
];


