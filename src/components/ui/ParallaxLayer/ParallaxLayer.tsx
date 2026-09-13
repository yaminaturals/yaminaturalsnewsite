import React, { useEffect, useRef } from 'react';
import './ParallaxLayer.css';

export interface ParallaxLayerProps {
  children?: React.ReactNode;
  offset?: number; // Maximum translation in pixels (default: 24)
  speed?: number; // Movement multiplier (default: 0.15)
  direction?: 'up' | 'down';
  className?: string;
  style?: React.CSSProperties;
  ariaHidden?: boolean;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  offset = 24,
  speed = 0.15,
  direction = 'up',
  className = '',
  style,
  ariaHidden = true,
}) => {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if prefers-reduced-motion is active
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    // Check if CSS view-timeline is natively supported
    const supportsScrollTimeline =
      typeof CSS !== 'undefined' &&
      CSS.supports &&
      CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

    if (supportsScrollTimeline) {
      // Native CSS will handle it via .parallax-layer-scroll
      return;
    }

    const element = layerRef.current;
    if (!element) return;

    let rafId: number | null = null;
    const isMobile = window.innerWidth < 768;
    const effectiveOffset = isMobile ? offset * 0.4 : offset;
    const dirMultiplier = direction === 'up' ? -1 : 1;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Element is within or near viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
          const centeredProgress = progress - 0.5; // -0.5 to 0.5
          const translateY = centeredProgress * effectiveOffset * speed * dirMultiplier * 10;
          element.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
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
