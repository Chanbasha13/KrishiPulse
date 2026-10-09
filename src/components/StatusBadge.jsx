import React from 'react';

/**
 * StatusBadge Component
 * Displays a color-coded status indicator matching the KrishiPulse palette.
 * 
 * @param {'forest' | 'sage' | 'amber' | 'neutral'} variant
 * @param {React.ReactNode} children
 */
export function StatusBadge({ variant = 'neutral', children, className = '' }) {
  const variantClass = `kp-badge--${variant}`;
  return (
    <span className={`kp-badge ${variantClass} ${className}`}>
      {children}
    </span>
  );
}

export default StatusBadge;
