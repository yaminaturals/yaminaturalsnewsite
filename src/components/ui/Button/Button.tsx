import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark' | 'text' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  to?: string; // If provided, renders as React Router Link
  href?: string; // If provided, renders as standard external anchor
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  icon,
  iconRight,
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

  const content = (
    <>
      {isLoading && <span className="btn-spinner" aria-hidden="true" />}
      {icon && !isLoading && <span className="btn-icon btn-icon-left">{icon}</span>}
      <span className="btn-label">{children}</span>
      {iconRight && !isLoading && <span className="btn-icon btn-icon-right">{iconRight}</span>}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...rest}
    >
      {content}
    </button>
  );
};
