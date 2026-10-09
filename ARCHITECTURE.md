# KrishiPulse — System Architecture & Design Foundation

This document defines the architectural boundaries, system design principles, and planned component relationships for **KrishiPulse — Climate-Resilient Farming Intelligence**.

---

## 1. System Vision & Purpose

KrishiPulse is an agro-climatic intelligence platform designed to assist smallholder and commercial farmers in assessing weather conditions, evaluating crop-specific climate stress (heat, water deficit, pest favorability), and making timely, transparent farming decisions.

The architecture is deliberately structured around:
- **Decoupled data sources**: External weather retrieval is strictly separated from agricultural domain logic.
- **Deterministic calculations**: Agronomic risk models are pure, testable functions independent of UI lifecycles.
- **Explainable recommendations**: Transparent inputs and formulae rather than opaque scores.
- **Local-first resilience**: Resilient against intermittent mobile connectivity in rural areas.

---

## 2. Implemented vs. Planned Architecture

To maintain complete engineering honesty and traceability across development phases:

### Implemented (Phase 1)
- **Application Shell & Layout**: Responsive container, navigation header, and modular page structure (`src/App.jsx`, `src/components/Header.jsx`).
- **Design System & CSS Variables**: Climate-tech token system based on Forest Green primary, Sage Green secondary, Warm Off-White base, and Amber warning accents (`src/styles/tokens.css`, `src/styles/global.css`, `src/styles/components.css`).
- **Atomic UI Components**: Reusable `Card` and `StatusBadge` primitives (`src/components/Card.jsx`, `src/components/StatusBadge.jsx`).
- **Build & Development Pipeline**: Vite + React 18 configuration with strict ESM modules (`vite.config.js`, `package.json`).
- **Core Metadata & Constants**: Project branding, versioning, and phase descriptors (`src/utils/constants.js`).

### Planned (Future Phases)
- **Weather Service Layer (`src/services/weatherService.js`)**: Adapter for Open-Meteo REST endpoints (temperature, precipitation, humidity, solar radiation, soil moisture).
- **Agricultural Calculation Engine (`src/engine/`)**: Deterministic functions computing crop heat stress indices, water requirements, and disease favorability models.
- **Farm Profile Management (`src/state/` or React Context)**: Local persistence (`localStorage`) for crop type, growth stage, soil texture, coordinates, and irrigation type.
- **Interactive Climate Simulator**: Sandbox for what-if scenarios (e.g., +2°C heat wave, 5-day rain delay) evaluating risk using the exact same calculation engine.
- **Advisory Guidance Generator**: Plain-language actionable recommendations in English and Telugu (`src/locales/`).

---

## 3. Directory Structure

```text
krishipulse/
├── index.html                   # HTML entry point with typography preconnects
├── package.json                 # Project dependencies and lifecycle scripts
├── package-lock.json            # Deterministic lockfile
├── vite.config.js               # Vite build configuration with React plugin
├── ARCHITECTURE.md              # Architectural blueprint and data flow specifications
├── README.md                    # Project overview, setup, and run instructions
└── src/
    ├── main.jsx                 # Application bootstrapping and React.StrictMode mount
    ├── App.jsx                  # Application composition and foundational view
    ├── components/              # Reusable presentational components
    │   ├── Header.jsx           # Brand header with status indicators
    │   ├── Card.jsx             # Card container with semantic variants
    │   └── StatusBadge.jsx      # Semantic status badges
    ├── styles/                  # Styling tokens and CSS cascade
    │   ├── tokens.css           # Design tokens (colors, typography, spacing, shadows)
    │   ├── global.css           # Modern reset, base typography, accessible focus states
    │   └── components.css       # Component styling classes
    └── utils/                   # Shared helpers and constants
        └── constants.js         # System metadata, branding, and phase keys
```

---

## 4. Architectural Boundaries & Data Separation

A central tenet of KrishiPulse is strict separation of concerns across four key layers:

```
┌────────────────────────────────────────────────────────┐
│                   Presentation Layer                   │
│        (React Components: Header, Dashboard, Cards)     │
└──────────────────────────┬─────────────────────────────┘
                           │ Props / Hooks
                           ▼
┌────────────────────────────────────────────────────────┐
│               Domain Calculation Engine                │
│       (Deterministic, Pure Agronomic Calculations)      │
│          - Heat Stress Index   - Irrigation Deficit    │
│          - Pest Favorability   - What-If Simulation     │
└───────────────▲────────────────────────▲───────────────┘
                │                        │
       Weather Inputs              Farm Profile
                │                        │
┌───────────────┴────────┐      ┌────────┴───────────────┐
│ Weather Service Layer  │      │  Farm Profile Storage  │
│ (Open-Meteo Gateway)   │      │ (Local-First Storage)  │
│ - Rate limiting        │      │ - Location Coordinates │
│ - Response parsing     │      │ - Crop & Growth Stage  │
│ - Schema validation    │      │ - Soil Type & Water    │
└────────────────────────┘      └────────────────────────┘
```

### 1. Presentation Layer (`src/components/`)
- Renders the UI and captures user input.
- Contains **no agricultural formulas** or direct `fetch()` network requests.
- Accepts formatted outputs from the engine or state hooks.

### 2. Agricultural Calculation Engine (`src/engine/` - Planned)
- **Decoupled & Pure**: Pure JavaScript functions that take climate inputs (temp, RH, rain) and farm inputs (crop, stage, soil) and output risks and recommendations.
- **Shared by Dashboard and Simulator**: The What-If Simulator passes hypothetical weather variables to the exact same engine functions used by the live dashboard, guaranteeing consistency.
- **Unit-Testable**: Can be tested without mounting DOM components or mocking network requests.

### 3. Weather Service Layer (`src/services/` - Planned)
- Encapsulates all external communication with the Open-Meteo API.
- Implements defensive normalization: transforms external JSON schemas into internal domain types.
- Manages caching, backoff, and error reporting.

### 4. Farm Profile State (`src/context/` or local hooks - Planned)
- Stores user-configured farm parameters.
- Backed by browser `localStorage` for offline persistence without requiring authentication or backend databases.

---

## 5. Trustworthy Weather Integration Blueprint (Open-Meteo)

The planned weather integration will interface with the Open-Meteo API:
- **Provider**: Open-Meteo (open-meteo.com)
- **Licensing & Attribution**: Attribution to Open-Meteo is required under CC BY 4.0.
- **Constraints**: Public endpoint allows up to 10,000 daily API calls without an API key; calls must be cached locally to minimize traffic and support offline viewing.

### Data Classification & Provenance Model

To prevent farmer confusion, all environmental data within KrishiPulse must be classified into five distinct categories:

1. **Observed Data**:
   - Historical or current ground-station / reanalysis readings up to the present hour.
   - Distinctly labeled with observation timestamp and recording source.
2. **Forecast Data**:
   - Numerical weather predictions for future hours/days.
   - Labeled with model run time, forecast horizon, and confidence band.
3. **User-Entered Data**:
   - Data input directly by the farmer (e.g., manual rainfall gauge readings, soil moisture observations).
   - Marked as self-reported.
4. **Cached Data**:
   - Previously fetched weather records stored locally in browser storage when offline.
   - Displayed with a clear "Data from [timestamp] — Offline" warning badge.
5. **Simulated Data**:
   - Hypothetical weather parameters generated in the What-If sandbox (e.g., "+3°C temperature shift").
   - Displayed with amber alert badges stating "Simulation Sandbox — Not Current Forecast".

### Resilient Failure Handling Plan
When the weather service layer is implemented:
- **Loading States**: Explicit loading skeletons with timeout fallbacks.
- **Network Failures**: Graceful fallback to cached forecast with clear freshness timestamp.
- **Invalid Responses**: Schema validation at the gateway boundary to catch unexpected nulls or out-of-range readings.
- **Coordinate Edge Cases**: Coordinate clamping and validation for boundary latitudes/longitudes.
- **Offline Mode**: Full offline usability using cached farm profile and last-known weather snapshot.

---

## 6. Visual Design Tokens & Accessibility

The design system is implemented in `src/styles/tokens.css` with semantic color choices:

| Token Category | Token Variable | Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Primary Brand** | `--kp-color-primary-700` | `#1B4D3E` | Deep forest green representing healthy agriculture |
| **Primary Dark** | `--kp-color-primary-900` | `#0D2820` | High-contrast heading text (WCAG AAA compliant) |
| **Secondary Accent** | `--kp-color-sage-700` | `#57734B` | Balanced sage for accents and nature indicators |
| **Surface Accent** | `--kp-color-sage-100` | `#E5EFE0` | Soft sage surface backgrounds |
| **Alert / Warning** | `--kp-color-amber-600` | `#D97706` | High-visibility amber for crop stress & climate risks |
| **Warning Tint** | `--kp-color-amber-100` | `#FEF3C7` | Background highlight for active warnings |
| **Base Background** | `--kp-color-bg-base` | `#FBF9F5` | Warm off-white canvas minimizing eye strain outdoors |
| **Card Surface** | `--kp-color-surface` | `#FFFFFF` | Clean, crisp card surfaces |

### Accessibility Standards
- **Contrast**: All text tokens meet WCAG 2.1 AA/AAA contrast ratios against their respective surfaces.
- **Keyboard Navigation**: High-contrast, non-destructive `:focus-visible` ring (`--kp-focus-ring`) is active on all interactive elements.
- **Responsive Fluidity**: Standard 8pt spacing grid with CSS grid breakpoints ensuring mobile readability for field usage.

---

## 7. Architectural Constraints & Trade-Offs

1. **Client-Side Single Page Application (SPA)**:
   - *Advantage*: Zero server cost, easy hosting on static CDNs, immediate offline capability via service workers or local storage.
   - *Trade-off*: Initial asset bundle must be kept compact. No server-side secret storage (must use public endpoints like Open-Meteo that do not require secret API keys).
2. **Deterministic JS Engine vs. Complex Backend Models**:
   - *Advantage*: Instantaneous simulation feedback with zero network latency; runs entirely in low-connectivity rural settings.
   - *Trade-off*: Models must rely on published agronomic formulas (e.g., Growing Degree Days, FAO Penman-Monteith approximations) rather than resource-heavy server-side neural networks.
