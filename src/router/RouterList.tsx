
// 🔹 Pages

import { GuidePage } from "@/pages/guide/GuidePage";
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


