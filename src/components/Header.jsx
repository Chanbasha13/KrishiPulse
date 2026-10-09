import React from 'react';
import StatusBadge from './StatusBadge';

/**
 * Header Component
 * Top application navigation and brand banner.
 */
export function Header() {
  return (
    <header className="kp-header">
      <div className="kp-container kp-header-inner">
        <div className="kp-brand">
          <div className="kp-brand-logo" aria-hidden="true">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Plant seedling with pulse rhythm */}
              <path d="M12 22v-9" />
              <path d="M7 13c-2.5-3-1-7 5-8 0 4 2 6 5 6" />
              <path d="M12 13c1.5-2 4-2.5 5.5-1" />
              <path d="M4 19h16" />
            </svg>
          </div>
          <div>
            <div className="kp-brand-title">KrishiPulse</div>
            <div className="kp-brand-subtitle">Climate-Resilient Farming Intelligence</div>
          </div>
        </div>

        <div>
          <StatusBadge variant="forest">Phase 1 Foundation</StatusBadge>
        </div>
      </div>
    </header>
  );
}

export default Header;
