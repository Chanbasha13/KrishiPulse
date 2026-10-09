import React from 'react';

/**
 * Card Component
 * Surface container for displaying content with semantic variations.
 * 
 * @param {'default' | 'sage' | 'amber' | 'bordered-accent'} variant
 * @param {string | React.ReactNode} title
 * @param {React.ReactNode} badge
 * @param {React.ReactNode} children
 */
export function Card({
  variant = 'default',
  title,
  badge,
  children,
  className = '',
  ...props
}) {
  const variantClass = variant !== 'default' ? `kp-card--${variant}` : '';

  return (
    <article className={`kp-card ${variantClass} ${className}`} {...props}>
      {(title || badge) && (
        <header className="kp-card-header">
          {title && <h3 className="kp-card-title">{title}</h3>}
          {badge && <div>{badge}</div>}
        </header>
      )}
      <div className="kp-card-body">{children}</div>
    </article>
  );
}

export default Card;
