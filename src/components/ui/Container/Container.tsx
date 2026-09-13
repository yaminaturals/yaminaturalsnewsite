import React from 'react';
import './Container.css';

export interface ContainerProps {
  size?: 'default' | 'narrow' | 'wide' | 'fluid';
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  size = 'default',
  as: Component = 'div',
  className = '',
  style,
  children
}) => {
  return (
    <Component
      className={`site-container site-container-${size} ${className}`.trim()}
      style={style}
    >
      {children}
    </Component>
  );
};
