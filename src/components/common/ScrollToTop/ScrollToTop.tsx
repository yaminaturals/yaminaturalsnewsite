import React, { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * ScrollToTop ensures:
 * 1. Navigating to any new page immediately resets scroll to top (0, 0).
 * 2. If a user reloads or refreshes the page, it automatically redirects them
 *    to the Hero section of the Homepage ('/').
 */
export const ScrollToTop: React.FC = () => {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Detect if page was reloaded or refreshed
    const navEntries = window.performance?.getEntriesByType?.('navigation');
    const perfNav = navEntries && navEntries.length > 0 ? (navEntries[0] as PerformanceNavigationTiming) : null;
    const isReload = perfNav
      ? perfNav.type === 'reload'
      : Boolean((window.performance as unknown as { navigation?: { type?: number } })?.navigation?.type === 1);

    if (isReload) {
      // On reload/refresh, automatically redirect to the Homepage Hero section
      if (window.location.pathname !== '/' && !window.location.pathname.startsWith('/admin')) {
        navigate('/', { replace: true });
      }
      // Guarantee scroll reset to hero top
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }
  }, [navigate]);

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
