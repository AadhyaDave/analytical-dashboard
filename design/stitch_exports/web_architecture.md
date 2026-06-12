# Web Architecture

## Overview
The **Analytical Dashboard** is a modern web application built with **React**, **Vite**, and **Tailwind CSS**. It provides hierarchical OEE (Overall Equipment Effectiveness) dashboards for different manufacturing roles (MD, Plant, Department, Section, Line, Machine). The app follows a component‑driven architecture, uses React Context for global state, and implements a clean separation between UI, business logic, and data layers.

## Technology Stack
- **Framework**: React 18 (via Vite)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (custom design‑system tokens)
- **Charts**: Recharts
- **State Management**: React Context + custom hooks
- **Routing**: React Router v6
- **Data**: Mock data (src/data/mockData.js) – real API integration planned via services layer
- **Testing**: Jest + React Testing Library (project scaffold includes them)

## Folder Structure
```
src/
├─ assets/                # static images, icons
├─ components/            # reusable UI components
│   ├─ charts/            # chart wrappers (BarChart, LineChart …)
│   ├─ layout/            # layout primitives (Header, Footer, Sidebar)
│   └─ shared/            # shared widgets (KPIBlock, StatusPill, ...)
├─ context/               # React Context providers (AuthContext, ThemeContext)
├─ data/                  # mockData.js & future API service modules
├─ pages/                 # page components mapped to routes
│   ├─ MDDashboard.jsx
│   ├─ PlantDashboard.jsx
│   ├─ DepartmentDashboard.jsx
│   ├─ SectionDashboard.jsx
│   ├─ LineDashboard.jsx
│   └─ MachineDetail.jsx
├─ routes/                # route definitions (react‑router configuration)
├─ utils/                 # helper utilities (formatting, calculations)
└─ App.jsx                # root component, Theme & Auth providers
```

## Dashboard Hierarchy (Drill‑Down)
- **MDDashboard** – top‑level overview for Manufacturing Director
- **PlantDashboard** – plant‑level summary
- **DepartmentDashboard** – department‑level view
- **SectionDashboard** – section‑level view
- **LineDashboard** – line‑level view
- **MachineDetail** – detailed KPIs & charts for a single machine

Each dashboard imports shared components (e.g., `KPIBlock`, `StatusDonut`, `TimelineChart`) and receives data via the **DataContext**.

## Component Architecture
- **Reusable Components** – atomic UI pieces (`Button`, `Card`, `Badge`) built with Tailwind utility classes and design‑system tokens.
- **Layout Components** – `AppHeader`, `Sidebar`, `ContentWrapper` that enforce consistent spacing, typography, and responsive breakpoints.
- **Chart Components** – thin wrappers around Recharts that accept a unified data shape (labels, values) and apply the theme colors.
- **Higher‑Order Components / Hooks** – custom hooks like `useDashboardData` abstract data fetching and transformation.

## State Management
- **AuthContext** – holds authentication state (currently mocked).
- **ThemeContext** – toggles dark/light mode and provides design‑system token values.
- **DataContext** – supplies the mock data tree (MD → Plant → … → Machine) to all dashboards.
- Global state is kept shallow; complex derived state lives in component‑level `useState`/`useMemo`.

## Responsive Design Strategy
- **Breakpoints**: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).
- **Desktop** – three‑column layout with sidebar navigation.
- **Tablet** – collapsible sidebar, cards stack vertically.
- **Mobile** – full‑width cards, bottom navigation, swipeable tabs for drill‑down.
- All components follow the **canonical card pattern** defined in `src/design-system/card.ts`.

## Drill‑Down Architecture
Navigation is handled by React Router. Each dashboard pushes a new route segment (`/plant/:plantId`, `/department/:deptId`, …). The route params are used by the corresponding page to fetch the appropriate slice of the data tree from `DataContext`. This keeps URL state in sync with the UI hierarchy.

## Navigation Flow (Example)
`/` → `MDDashboard` → click Plant → `/plant/42` → `PlantDashboard` → click Department → `/plant/42/department/7` → `DepartmentDashboard` …
