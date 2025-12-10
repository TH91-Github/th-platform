import { createBrowserRouter } from 'react-router-dom';
import { routerList } from './RouterList';
import App from '../App';
import { ErrorPage } from '../pages/error/ErrorPage';
import { MainPage } from '@/pages/main/MainPage';
 
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          // Main
          index: true,
          id: "Main",
          element: <MainPage />
        },
        ...routerList
      ],
    },
    {
      path: "/*",
      element: <ErrorPage />
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
