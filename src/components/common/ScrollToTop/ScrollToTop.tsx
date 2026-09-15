import React, { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop ensures that navigating to any new page/route
 * immediately resets the scroll position to the very top (0, 0)
 * instead of keeping the previous page's scroll offset.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    if (!hash) {
      // Force instantaneous jump to top on route change
      window.scrollTo(0, 0);
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    } else {
      // If there's an anchor hash (e.g. #faq), scroll to that specific element
      const elementId = hash.replace('#', '');
      const targetElement = document.getElementById(elementId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, search, hash]);

  return null;
};
