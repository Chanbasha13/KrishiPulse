import React from 'react';
import Header from './components/Header';
import Card from './components/Card';
import StatusBadge from './components/StatusBadge';
import { APP_METADATA } from './utils/constants';

export function App() {
  return (
    <div className="kp-shell">
      <Header />

      <main className="kp-main kp-container">
        {/* Foundation Hero */}
        <section className="kp-hero">
          <div className="kp-hero-badge">
            <StatusBadge variant="forest">System Architecture & Design Foundation</StatusBadge>
          </div>
          <h1 className="kp-hero-title">
            Climate-Resilient Farming Intelligence
          </h1>
          <p className="kp-hero-desc">
            KrishiPulse is built to empower farmers with transparent weather assessments,
            explainable crop-stress risk metrics, and practical agro-climatic advisories.
            Established on a deterministic, decoupled foundation.
          </p>
        </section>

        {/* Architectural Boundaries & Module Status */}
        <section className="kp-section">
          <div className="kp-section-header">
            <h2 className="kp-section-title">System Architecture Status</h2>
            <p className="kp-section-subtitle">
              Module boundaries established in Phase 1 to support incremental, decoupled implementation.
            </p>
          </div>

          <div className="kp-grid-2">
            <Card
              title="Design System & UI Foundations"
              badge={<StatusBadge variant="forest">Implemented</StatusBadge>}
              variant="default"
            >
              <p>
                Tokens for forest green branding, sage secondary surfaces, warm off-white canvas,
                and amber warning states. Mobile-first responsive grid, accessible focus management,
                and reusable UI containers.
              </p>
            </Card>

            <Card
              title="Weather Service Layer (Planned)"
              badge={<StatusBadge variant="sage">Planned - Boundary Defined</StatusBadge>}
              variant="default"
            >
              <p>
                Dedicated retrieval layer for Open-Meteo API. Strict separation between observed,
                forecast, cached, and simulated environmental data. No direct network coupling inside UI components.
              </p>
            </Card>

            <Card
              title="Agricultural Engine (Planned)"
              badge={<StatusBadge variant="sage">Planned - Engine Isolated</StatusBadge>}
              variant="default"
            >
              <p>
                Deterministic, independently testable calculation core for crop heat stress, water deficits,
                and pest favorability. Shared identically between dashboard evaluations and what-if simulation models.
              </p>
            </Card>

            <Card
              title="Farm Profile & Storage (Planned)"
              badge={<StatusBadge variant="sage">Planned - Local-First</StatusBadge>}
              variant="default"
            >
              <p>
                Configurable profile managing location coordinates, crop type, growth stage, soil texture,
                and irrigation infrastructure using browser-based local persistence with zero cloud lock-in.
              </p>
            </Card>
          </div>
        </section>

        {/* Visual Token Hierarchy Showcase */}
        <section className="kp-section">
          <div className="kp-section-header">
            <h2 className="kp-section-title">Visual Foundation & Design Tokens</h2>
            <p className="kp-section-subtitle">
              Standardized color tokens and semantic states tailored for climate-tech accessibility.
            </p>
          </div>

          <div className="kp-grid-3">
            <Card variant="default" title="Primary: Forest Green">
              <p>
                Represents vitality, agricultural resilience, and environmental balance.
                Used for primary branding, active navigation, and key typography.
              </p>
              <div className="kp-token-list">
                <div className="kp-swatch">
                  <span className="kp-swatch-chip" style={{ backgroundColor: 'var(--kp-color-primary-700)' }}></span>
                  <span>#1B4D3E (Brand)</span>
                </div>
                <div className="kp-swatch">
                  <span className="kp-swatch-chip" style={{ backgroundColor: 'var(--kp-color-primary-900)' }}></span>
                  <span>#0D2820 (Headings)</span>
                </div>
              </div>
            </Card>

            <Card variant="sage" title="Secondary: Sage Green">
              <p>
                Evokes natural foliage and calm surfaces. Used for secondary cards,
                soft indicators, and contextual background accents.
              </p>
              <div className="kp-token-list">
                <div className="kp-swatch">
                  <span className="kp-swatch-chip" style={{ backgroundColor: 'var(--kp-color-sage-700)' }}></span>
                  <span>#57734B (Accent)</span>
                </div>
                <div className="kp-swatch">
                  <span className="kp-swatch-chip" style={{ backgroundColor: 'var(--kp-color-sage-100)' }}></span>
                  <span>#E5EFE0 (Surface)</span>
                </div>
              </div>
            </Card>

            <Card variant="amber" title="Attention: Amber">
              <p>
                High-visibility warning tone for impending heat spikes, moisture deficit alerts,
                and agricultural advisory flags.
              </p>
              <div className="kp-token-list">
                <div className="kp-swatch">
                  <span className="kp-swatch-chip" style={{ backgroundColor: 'var(--kp-color-amber-600)' }}></span>
                  <span>#D97706 (Warning)</span>
                </div>
                <div className="kp-swatch">
                  <span className="kp-swatch-chip" style={{ backgroundColor: 'var(--kp-color-amber-100)' }}></span>
                  <span>#FEF3C7 (Alert Tint)</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Architectural Principles */}
        <section className="kp-section">
          <Card variant="bordered-accent" title="Core Engineering Principles">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kp-space-3)' }}>
              <div>
                <strong>Deterministic Decision Engine:</strong> Agricultural risk calculations remain pure mathematical functions, isolated from UI lifecycle and networking.
              </div>
              <div>
                <strong>Honest Data Provenance:</strong> No fabricated metrics or synthetic data disguised as live API responses. Clearly distinguishing observed, forecast, and simulated values.
              </div>
              <div>
                <strong>Extensible & Accessible:</strong> Built with semantic HTML, standard CSS custom properties, and full keyboard navigation support.
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Application Footer */}
      <footer className="kp-footer">
        <div className="kp-container kp-footer-inner">
          <div>
            <strong>{APP_METADATA.name}</strong> — {APP_METADATA.tagline}
          </div>
          <div>
            <span>Version {APP_METADATA.version} &bull; {APP_METADATA.phase}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
