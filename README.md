# KrishiPulse — Climate-Resilient Farming Intelligence

KrishiPulse is a climate-resilient farming intelligence web application designed to help farmers understand local weather dynamics, assess crop-specific climate risks (such as heat stress, water deficits, and pest favorability), and make timely, informed agricultural decisions through explainable calculations and practical advisories.

---

## Technology Stack

The project uses a lightweight, maintainable client-side stack:

- **UI Framework**: [React 18](https://react.dev/)
- **Bundler & Build Tool**: [Vite](https://vite.dev/)
- **Language**: JavaScript (ES Modules)
- **Styling**: Standard CSS with custom design tokens (`tokens.css`, `global.css`, `components.css`)
- **Package Manager**: npm

---

## Prerequisites

- **Node.js**: Version 18.0.0 or later (tested on Node v24.20.0)
- **npm**: Version 9.0.0 or later (tested on npm 11.19.0)

---

## Installation & Setup

1. **Clone or open the repository**:
   ```bash
   cd /path/to/krishipulse
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

---

## Available Scripts

### Development Server
Starts the local Vite development server with hot module replacement:
```bash
npm run dev
```
By default, the server runs at `http://localhost:5173`.

### Production Build
Compiles and bundles the application for production deployment into the `dist/` directory:
```bash
npm run build
```

### Preview Production Build
Locally previews the generated production build:
```bash
npm run preview
```

---

## Current Implementation Status (Phase 1)

| Area | Status | Description |
| :--- | :--- | :--- |
| **Project Foundation** | Completed | React 18 + Vite setup with ESM configuration |
| **Design System Tokens** | Completed | CSS variables for Forest Green, Sage, Amber, and Off-White palette |
| **Foundational UI Components** | Completed | Reusable `Card`, `Header`, and `StatusBadge` components |
| **Architecture Specification** | Completed | `ARCHITECTURE.md` establishing decoupled boundaries |
| **Weather Integration** | Architecture Defined | Planned for upcoming phase (Open-Meteo gateway) |
| **Agricultural Engine** | Architecture Defined | Planned for upcoming phase (deterministic calculation engine) |
| **Farm Profile Storage** | Architecture Defined | Planned for upcoming phase (local-first browser persistence) |

---

## Architecture

For complete architectural details, data provenance models, and component boundaries, refer to [ARCHITECTURE.md](ARCHITECTURE.md).

---

## Known Limitations

- **Phase 1 Boundary**: This foundation phase establishes the architecture, design tokens, and base layout. Live weather fetching, calculation engines, and interactive dashboards are intentionally not connected in this phase.
- **Network Decoupling**: No external API calls are made in this phase. Open-Meteo integration is planned for Phase 2.
