import React, { useEffect, useRef } from 'react';
import './ParallaxLayer.css';

export interface ParallaxLayerProps {
  children?: React.ReactNode;
  offset?: number; // Maximum translation in pixels (default: 20)
  speed?: number; // Movement multiplier (default: 0.12)
  direction?: 'up' | 'down';
  className?: string;
  style?: React.CSSProperties;
  ariaHidden?: boolean;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  offset = 20,
  speed = 0.12,
  direction = 'up',
  className = '',
  style,
  ariaHidden = true,
}) => {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Strict accessibility check: disable on prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    // 2. Progressive enhancement: if native CSS animation-timeline is supported, let CSS handle it
    const supportsScrollTimeline =
      typeof CSS !== 'undefined' &&
      CSS.supports &&
      CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

    if (supportsScrollTimeline) {
      return;
    }

    const element = layerRef.current;
    if (!element) return;

    let rafId: number | null = null;
    let isIntersecting = false;

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    // Scale intensity: desktop = 1x, tablet = 0.5x, mobile = 0.25x (very subtle)
    const effectiveOffset = isMobile
      ? offset * 0.25
      : isTablet
      ? offset * 0.5
      : offset;

    const dirMultiplier = direction === 'up' ? -1 : 1;

    const handleScroll = () => {
      if (!isIntersecting) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Element is within or near viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
          const centeredProgress = progress - 0.5; // -0.5 to 0.5
          const translateY = centeredProgress * effectiveOffset * speed * dirMultiplier * 8;
          element.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
        }
      });
    };

    // 3. Use IntersectionObserver as the performant fallback trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting;
          if (isIntersecting) {
            handleScroll();
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(element);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [offset, speed, direction]);

  const cssVariables = {
    '--parallax-offset': `${offset}px`,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={layerRef}
      className={`parallax-layer parallax-layer-scroll ${className}`.trim()}
      style={cssVariables}
      aria-hidden={ariaHidden}
    >
      {children}
    </div>
  );
};
