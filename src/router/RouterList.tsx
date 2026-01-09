
// 🔹 Pages

import { AboutPage } from "@/pages/about/AboutPage";
import { ContactPage } from "@/pages/contact/ContactPage";
import { DivisionPage } from "@/pages/division/DivisionPage";
import { GuidePage } from "@/pages/guide/GuidePage";
import { PortfolioPage } from "@/pages/portfolio/PortfolioPage";
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
  {
    id: 'about',
    path: '/about',
    element: <AboutPage />,
    handle: {
      title: 'About',
    },
  },
  {
    id: 'portfolio',
    path: '/portfolio',
    element: <PortfolioPage />,
    handle: {
      title: 'Portfolio',
    },
  },
  {
    id: 'division',
    path: '/division',
    element: <DivisionPage />,
    handle: {
      title: 'Division',
    },
  },
  {
    id: 'contact',
    path: '/contact',
    element: <ContactPage />,
    handle: {
      title: 'Contact',
    },
  },
];
