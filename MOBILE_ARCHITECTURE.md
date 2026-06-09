# Mobile Architecture

## Overview
The **OpusOneMobile** app is a cross‑platform Expo + React‑Native solution that mirrors the web dashboards for on‑the‑go operators. It follows a **repository‑pattern** for data access, a **type‑safe navigation stack**, and a **design‑system** built with Tailwind‑style tokens.

## Technology Stack
- **Expo SDK** (check `app.json` for exact version)
- **React Native** (v0.71)
- **TypeScript**
- **React Navigation** (Stack + Tab navigators)
- **Reanimated / Gesture Handler** for smooth interactions
- **Victory Native** (or similar) for charts – see `src/components/shared/TimelineChart.tsx`
- **State Management** – React Context (`AuthProvider`, `ThemeProvider`) + local component state
- **Design System** – custom token files (`colors.ts`, `typography.ts`, `spacing.ts`, `radius.ts`)

## Folder Structure
```
src/
├─ assets/                 # images, icons
├─ components/
│   ├─ shared/            # KPIBlock, OEEGauge, StatusDonut, StatusPill, MoreInfoButton, TimelineChart, AlertCard
│   └─ layout/            # AppHeader, SafeAreaWrapper
├─ design-system/          # colors.ts, typography.ts, spacing.ts, radius.ts
├─ data/
│   ├─ mock/              # mock JSON files used during development
│   └─ repositories/      # PlantRepository.ts, DepartmentRepository.ts, SectionRepository.ts, LineRepository.ts, MachineRepository.ts
├─ navigation/
│   ├─ RootNavigator.tsx  # top‑level navigation container
│   └─ DashboardStack.tsx # stack for drill‑down dashboards
├─ screens/
│   ├─ Dashboard/
│   │   ├─ MDDashboardScreen.tsx
│   │   ├─ PlantHeadDashboardScreen.tsx
│   │   ├─ DepartmentHeadDashboardScreen.tsx
│   │   ├─ SectionHeadDashboardScreen.tsx
│   │   ├─ LineHeadDashboardScreen.tsx
│   │   └─ MachineDetailScreen.tsx
│   └─ Auth/
│       └─ LoginScreen.tsx
├─ context/                # AuthContext, ThemeContext, DataContext
├─ utils/                  # helpers (date formatting, maths)
└─ App.tsx                 # root component, providers, navigation container
```

## Navigation Architecture
- **RootNavigator** – wraps the app in `NavigationContainer` and decides between Auth flow and Main flow.
- **DashboardStack** – a Stack Navigator that implements the hierarchical drill‑down:
  `MDDashboard → PlantHeadDashboard → DepartmentHeadDashboard → SectionHeadDashboard → LineHeadDashboard → MachineDetail`.
- Parameters (`plantId`, `deptId`, …) are passed via `route.params` and used by the respective screens to request data from the corresponding repository.

## Screen Inventory
| Screen | Responsibility |
|--------|-----------------|
| **MDDashboardScreen** | Top‑level OEE summary for the Manufacturing Director; shows high‑level KPIs and navigation cards to plants. |
| **PlantHeadDashboardScreen** | Plant‑level aggregates; displays KPI blocks, line status donut, and navigation to departments. |
| **DepartmentHeadDashboardScreen** | Department‑level view; shows section cards and OEE gauge. |
| **SectionHeadDashboardScreen** | Section‑level view; lists lines and quick status pills. |
| **LineHeadDashboardScreen** | Line‑level view; displays machine cards and trend charts. |
| **MachineDetailScreen** | Detailed view for a single machine – real‑time OEE, historical timeline, alerts. |
| **LoginScreen** | Authentication entry point (mocked for now). |

## Shared Component Library
- **AppHeader** – consistent top bar with title, back button, and optional actions.
- **KPIBlock** – card showing a single KPI value with icon and optional trend arrow.
- **OEEGauge** – circular gauge visualising OEE percentage.
- **StatusDonut** – donut chart summarising machine status distribution.
- **StatusPill** – colored badge indicating a status (Running, Stopped, Maintenance).
- **MoreInfoButton** – small “i” button that expands a modal with extra details.
- **TimelineChart** – line chart (Victory) showing metric over time.
- **AlertCard** – card listing active alerts with severity colour.

All shared components consume the **design‑system tokens** for colors, spacing, typography, and border‑radius, ensuring visual consistency.

## Repository Pattern
Each entity (Plant, Department, Section, Line, Machine) has a corresponding TypeScript repository class exposing:
```ts
class PlantRepository {
  async getAll(): Promise<Plant[]>;
  async getById(id: string): Promise<Plant | null>;
}
```
Repositories abstract the data source; during development they read from `src/data/mock/*.json`. In production they will call the REST API defined in `src/services/api.ts`.

## Theme & SafeArea Implementation
- **ThemeProvider** reads `colors.ts`, `typography.ts`, etc., and supplies a context with light/dark palettes.
- **SafeAreaWrapper** (used in every screen) ensures content respects the device notch / status‑bar using `react-native-safe-area-context`.

## Data Flow
1. **App** mounts `DataContext` which loads mock data via repositories.
2. Screens subscribe to `DataContext` and request scoped data via the repository matching the current route params.
3. UI components receive plain data objects and render using the design‑system tokens.
4. Future real‑time updates will be pushed through a WebSocket service and merged into the context state.

---

*This document reflects a thorough analysis of the mobile codebase and provides an up‑to‑date architectural reference.*
