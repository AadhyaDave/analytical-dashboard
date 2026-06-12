# Backend Integration Readiness

This document outlines the current data architecture of Opus One Mobile V2 and identifies the necessary steps to transition from mock repositories to live backend services.

## 1. Current Data Architecture & Repository Structure

The mobile application utilizes a strict **Repository Pattern** located in `src/data/repositories/`.

- **Abstraction:** UI components (screens) never fetch data directly. They depend entirely on static methods like `PlantRepository.getGlobalMetrics()`.
- **Decoupling:** The UI is completely agnostic to whether data comes from a local mock, a REST API, or a local SQLite cache.
- **Current Mock Implementation:** The repositories currently import hardcoded arrays from `src/mock/mockData.ts` and return them via `Promise` with `setTimeout` to simulate network latency.

## 2. Identified Risks & Tight Coupling

Transitioning to a real backend will require addressing the following assumptions built into the current mock implementation:

### A. Index-Based Navigation Routing
**Current State:** The app frequently passes sequential indices as route parameters (e.g., `plantId: 'plant-0'`, `sectionId: 'section-2'`). The repositories then parse these strings to index into local mock arrays.
**Risk:** Real backends rely on UUIDs or primary keys.
**Fix Required:** Update navigation parameters to pass actual DB `id` strings. Repositories must query the backend using these IDs rather than array indices.

### B. Client-Side Sorting & Aggregation
**Current State:** The "Worst-First" impact ranking is achieved by fetching all children (e.g., all machines in a line) and running `[...machines].sort((a,b) => a.oee - b.oee)` on the client.
**Risk:** If a plant has hundreds of sections or thousands of machines, fetching all of them and sorting client-side will cause massive performance bottlenecks and memory crashes.
**Fix Required:** Sorting and pagination must be offloaded to the API (e.g., `?sort=oee_asc&limit=10`). The backend must also return pre-calculated aggregated counts for the `StatusSummaryStrip` (Running/Idle/Breakdown totals).

### C. Hardcoded Severity Thresholds
**Current State:** The UI hardcodes OEE severity thresholds (`>=85` Green, `>=75` Amber, `<75` Red) directly inside the screen components.
**Risk:** If the enterprise decides to change the target thresholds, the mobile app requires a hard update via the App Store.
**Fix Required:** Thresholds or raw status strings (`running`, `degraded`, `critical`) should be calculated and provided by the backend payload.

## 3. Authentication & Authorization Review

To support enterprise deployment, the backend must enforce strict Role-Based Access Control (RBAC). The mobile app will consume a JWT token that dictates the root of the user's hierarchy.

### Required Role-Based Visibility
- **MD / Executive Access:** 
  - **Visibility:** Global.
  - **Entry Point:** `MDDashboardScreen`.
  - **Permissions:** Can drill down into any plant, department, or machine globally.
- **Plant Head Access:**
  - **Visibility:** Restricted to `plantId`.
  - **Entry Point:** `PlantHeadDashboardScreen` (MD Dashboard is inaccessible).
- **Department Head Access:**
  - **Visibility:** Restricted to specific `deptId` arrays.
  - **Entry Point:** `DepartmentHeadDashboardScreen`. Upward navigation to the Plant level must be hidden or disabled.
- **Line Supervisor / Operator Access:**
  - **Visibility:** Restricted to specific `lineId`s or `machineId`s.
  - **Entry Point:** `LineHeadDashboardScreen`.

## 4. Chronicle Architecture Proposal

### Current State
Chronicle mode is currently a cosmetic UI toggle managed by local `useState` in each screen component.

### Proposed Architecture

**1. Global State Context**
Move the Chronicle state to a global context (e.g., `ChronicleProvider`).
```typescript
interface ChronicleState {
  mode: 'now' | 'chronicle';
  timestamp: string | null; // e.g., '2026-06-09T14:00:00Z'
}
```

**2. Repository Interception**
Repositories will read this global context before making HTTP requests:
- **If `mode === 'now'`:**
  - Repositories establish or listen to a WebSocket connection (SignalR / Socket.io) for live, push-based OEE and status updates.
  - REST calls do not include timestamp parameters.
- **If `mode === 'chronicle'`:**
  - WebSockets are immediately disconnected/paused to prevent live data from overwriting the historical view.
  - All REST calls append a `?timestamp={ChronicleState.timestamp}` query parameter.
  - The backend returns a static snapshot of the database exactly as it existed at that minute.
