// import { routesrList } from '@/router/RouterList';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';


// // 🔹 document title 
// const INDEXTITLE = process.env.REACT_APP_TITLE ?? '🖥️';
// const pathFindTitle = (pathNameArr:string[]) => {
//   const pathName = pathNameArr[pathNameArr.length - 1];
//   const routerPath = routerList.map(routerItem => {
//     if (routerItem.path && pathNameArr.includes(routerItem.path)) {
//       if (!routerItem.title && routerItem.children) {
//         const childrenList = routerItem.children.map(item => item.path || 'index');
//         if (childrenList.includes(pathName)) {
//           return routerItem.children[childrenList.indexOf(pathName)];
//         }
//         return routerItem.children[0];
//       }
//       return routerItem;
//     }
//     return null;
//   }).filter(Boolean)[0];

//   return routerPath?.title ?? null;
// };

// export const usePageTitle = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const pathNameArr = location.pathname.slice(1).split("/");
//     const title = pathFindTitle(pathNameArr);

//     if (title) {
//       document.title = `${INDEXTITLE}_${title}`;
//     } else {
//       document.title = `${INDEXTITLE} - 😁`;
//     }
//   }, [location.pathname]);
// }
