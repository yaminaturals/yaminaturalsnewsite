import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  to?: string; // If provided, renders as React Router Link
  href?: string; // If provided, renders as standard external anchor
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  icon,
  children,
  className = '',
  to,
  href,
  disabled,
  ...rest
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full-width' : '',
    isLoading ? 'btn-loading' : '',
    className
  ].filter(Boolean).join(' ');

  if (to && !disabled) {
    return (
      <Link to={to} className={classes}>
        {icon && <span className="btn-icon">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {icon && <span className="btn-icon">{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <span className="btn-spinner" aria-hidden="true" />}
      {icon && !isLoading && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
