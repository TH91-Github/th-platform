import { useEffect } from 'react';
import { useMatches, type Params } from 'react-router-dom';

const INDEXTITLE = import.meta.env.VITE_APP_TITLE ?? '🖥️';
export interface RouteHandle {
  title?: string | ((params: Params) => string);
}

export const usePageTitle = () => {
  const matches = useMatches();

  const title = [...matches]
    .reverse()
    .map(match => {
      const handle = match.handle as RouteHandle | undefined;
      if (!handle?.title) return null;

      if (typeof handle.title === 'function') {
        return handle.title(match.params);
      }

      return handle.title;
    })
    .find(Boolean);

  useEffect(() => {
    document.title = title
      ? `${title}`
      : `${INDEXTITLE}`;
  }, [title]);
};