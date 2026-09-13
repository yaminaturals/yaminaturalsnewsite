import React from 'react';
import './Badge.css';

export interface BadgeProps {
  variant?: 'primary' | 'accent' | 'neutral' | 'success' | 'warning' | 'outline';
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  icon,
  className = '',
  children
}) => {
  return (
    <span className={`site-badge badge-${variant} ${className}`.trim()}>
      {icon && <span className="badge-icon">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
