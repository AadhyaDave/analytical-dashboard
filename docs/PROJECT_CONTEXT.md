# Opus One Platform: Project Context

## Project Overview

**Purpose**: 
The Opus One platform is a comprehensive OEE (Overall Equipment Effectiveness) Intelligence and Manufacturing Analytics solution. It provides hierarchical visibility into manufacturing operations, from top-level enterprise metrics down to individual machine status.

**Problem Solved**:
Manufacturing floors often lack real-time visibility and hierarchical reporting. Opus One bridges this gap by aggregating machine-level telemetry into actionable dashboards tailored to specific management roles, eliminating data silos and enabling rapid responses to operational bottlenecks.

**Business Objectives**:
- Improve overall plant efficiency (OEE) and operational throughput.
- Reduce unplanned machine downtime through real-time and predictive alerts.
- Standardize performance tracking across plants, departments, sections, and lines.
- Enable data-driven decision-making at every level of the organization.

**Manufacturing Hierarchy**:
The entire platform is modeled around a strict operational drill-down path:
`MD → Plant → Department → Section → Line → Machine`

---

## Current Project Status

- **Web Application Status**: Established. Built as a responsive web dashboard primarily targeting desktop form factors (frozen layouts). Includes role-based dashboards (MD, Plant Head, Dept Head, Section Head, Line Head, Machine Detail) and an executive prototype view.
- **Mobile Application Status**: Active development. Building out the hierarchical dashboard stack with mobile-first UI patterns (canonical cards) and safe area architecture. 
- **Backend Status**: Unimplemented. Currently simulated using frontend data repositories and static `mockData` objects.
- **Authentication Status**: Mocked. Web utilizes a local storage gate (`InternalAccessPage`) and mock login. Mobile assumes `isAuthenticated = true` to bypass the auth stack during Phase A.
- **Real-Time Status**: Simulated. No actual WebSocket or polling connections exist; real-time updates are mocked via simulated asynchronous fetches.

---

## Technology Stack

### Web Application Stack
- **Framework**: React 19 + Vite
- **Styling**: TailwindCSS v4
- **Routing**: React Router DOM v7
- **Charts**: Recharts
- **Animation**: Framer Motion
- **Tooling**: ESLint, Puppeteer, JSPDF (for reporting)

### Mobile Application Stack
- **Framework**: React Native (v0.81.5) + Expo (v56)
- **Navigation**: React Navigation Native Stack v7
- **Styling**: Custom Design System (Vanilla JS styling tokens)
- **Charts**: React Native Gifted Charts
- **State Management**: Zustand
- **Icons**: Lucide React Native

---

## Manufacturing Hierarchy

The application strictly follows this organizational drill-down pattern for routing, data structuring, and access control:
1. **Managing Director (MD)**: Enterprise-wide aggregate views across all plants.
2. **Plant Head**: Single plant metrics, comparing departments.
3. **Department Head**: Single department metrics, comparing sections.
4. **Section Head**: Single section metrics, monitoring lines.
5. **Line Head**: Tactical line monitoring, managing individual machines.
6. **Machine**: Granular telemetry, downtime, and operational status of a specific asset.

---

## Navigation Hierarchy

### Web Application Routes
- `/demo/md-executive` (Prototype Route)
- `/demo/md-single-plant` (Prototype Route)
- `/` (Internal Access / Login Gate)
- Dynamic Dashboards (mapped by role via `DASHBOARD_MAP`):
  - `MDDashboard`
  - `PlantHeadDashboard`
  - `DepartmentHeadDashboard`
  - `SectionHeadDashboard`
  - `LineHeadDashboard`
  - `MachineDetailView`

### Mobile Application Routes (`RootNavigator`)
- **DashboardStack** (Main Application)
  - `MDDashboardScreen`
  - `PlantHeadDashboardScreen` (Legacy alias: `PlantHead`)
  - `DepartmentHeadDashboardScreen` (Legacy alias: `DepartmentHead`)
  - `SectionHeadDashboardScreen` (Legacy alias: `SectionHead`)
  - `LineHeadDashboardScreen` (Legacy alias: `LineHead`)
  - `MachineDetailDashboardScreen` (Legacy alias: `MachineDetail`)
  - `ComponentShowcaseScreen` (Internal dev tool)
- **AuthStack** (Currently bypassed)

---

## Design System (Mobile)

The Mobile stack implements a strict, token-based design system tailored for dark-mode industrial applications.

- **Colors**: Based around a deep blue/black theme (`bgApp: #050b18`, `bgCard: #0f172a`). Uses semantic status colors: `statusRunning: #16a34a` (Green), `statusIdle: #d97706` (Amber), `statusBreakdown: #dc2626` (Red).
- **Typography**: Sizes ranging from `xs (10)` to `3xl (32)`. Font weights explicitly mapped (`regular: 400` through `extrabold: 800`).
- **Spacing**: Linear scale from `xs (4)` to `6xl (64)`.
- **Radius**: Soft, modern corners from `sm (6)` to `full (9999)`.
- **Shared UI Principles**: Deep dark mode, subtle inset borders (`borderLight: rgba(255, 255, 255, 0.05)`), and semantic color coding for operational states.

---

## Architecture Principles

All AI agents and future developers MUST adhere to the following established rules:

1. **Repository Pattern Mandatory**: Components must never fetch or manipulate raw data directly. All data requests must go through specific Domain Repositories (e.g., `PlantRepository.ts`).
2. **Shared Components First**: Never duplicate UI. If a card or gauge is used in more than one screen, it must be extracted to `src/components/shared/`.
3. **No Direct Mock Data Imports**: Screens and UI components are absolutely forbidden from directly importing `mockData.ts` or `mockData.js`. The Data Layer (Repositories) must mediate this.
4. **SafeArea Architecture**: Mobile screens must utilize `react-native-safe-area-context` to prevent UI overlap with device notches and home indicators.
5. **Mobile Canonical Card Pattern**: Mobile data is presented via standardized, elevated card components with consistent padding and background tokens.
6. **Desktop Layouts Frozen**: The Web application layout is considered frozen. Do not introduce breaking structural changes to the web desktop views.
7. **Mobile-first Enhancements Only**: All new UI paradigms and interactive features should be developed and tested with a mobile-first mindset in the React Native codebase.

---

## Data Layer

**mockData Structure**:
A massive central mock database (`mockData.js` / `mockData.ts`) containing static JSON objects representing users, KPIs, machine statuses, downtimes, and operational timelines.

**Repositories**:
Act as the simulated API layer. Files like `PlantRepository.ts`, `DepartmentRepository.ts`, and `MachineRepository.ts` expose static async methods (using `setTimeout` to mimic network latency) that return specific slices of `mockData`.

**Data Flow**:
`Screen Component` → calls `Repository Method` → `Repository` waits (simulated latency) → returns data from `mockData` → `Screen Component` updates State → Renders `Shared UI Components`.

---

## Shared Component Inventory (Mobile)

- `AlertCard.tsx`: Standardized display for critical, warning, and info notifications.
- `AppHeader.tsx`: Unified top navigation bar.
- `DrilldownBreadcrumb.tsx`: Hierarchical navigation path indicator (e.g., Plant > Dept > Section).
- `KPIBlock.tsx`: Standardized card for displaying key performance metrics (value, trend, label).
- `MachineCard.tsx`: The canonical card for rendering individual machine status, OEE, and current operator.
- `MoreInfoButton.tsx`: Consistent interactive element for drill-down actions.
- `OEEGauge.tsx`: Circular visualization component for OEE percentages.
- `StatusDonut.tsx`: Donut chart for visualizing aggregated machine states (Running, Idle, Breakdown).
- `StatusPill.tsx`: Small badge component for semantic status labeling.
- `TimelineChart.tsx`: Visual timeline for tracking machine uptime, downtime, and operational segments.

---

## Future Roadmap

- **Backend**: Replacing the frontend Repository pattern with actual REST/GraphQL API clients to a Node.js/Python backend.
- **Authentication**: Implementing a real Identity Provider (e.g., OAuth, JWT) and enforcing the AuthStack/LoginPage.
- **Real-Time Data**: Integrating WebSockets or Server-Sent Events (SSE) to push live telemetry data to the `MachineCard` and `TimelineChart` components without polling.
- **Deployment**: CI/CD pipelines for Web (Vercel/Netlify) and Mobile (EAS Build / App Stores).

---

## Developer Rules

**DO:**
- **DO** use the Design System tokens (`colors.ts`, `spacing.ts`) instead of hardcoded hex values or integers.
- **DO** route all data fetching through the respective `Repository`.
- **DO** use functional components with React Hooks.
- **DO** rely on `Shared Components` before building custom UI elements for a screen.

**DO NOT:**
- **DO NOT** import `mockData` directly into any `.tsx` or `.jsx` view file.
- **DO NOT** bypass the Manufacturing Hierarchy (e.g., do not link a Plant Dashboard directly to a Machine without context).
- **DO NOT** alter the core Web application layout structure without explicit architectural approval.
- **DO NOT** write platform-specific code (e.g., iOS only) unless absolutely necessary and properly abstracted.
