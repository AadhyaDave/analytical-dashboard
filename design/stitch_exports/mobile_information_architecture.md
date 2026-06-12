# Opus One Mobile: Information Architecture & UX Strategy (Flutter Edition)

## 1. Operational Hierarchy (The "Core Chain")
The app is built on a rigid drill-down architecture to ensure operational context is never lost.
`Situation Room (Entry) → Enterprise → Plant → Department → Section → Line → Machine`

## 2. Navigation Map
### Primary Navigation (Bottom Bar)
*   **Situation Room**: AI-driven pulse, active situations, and critical decisions.
*   **Floor**: The hierarchical tree (Enterprise down to Machine).
*   **Watchlist**: Pinned assets (Lines/Machines) across different plants.
*   **Alerts**: Centralized notification and resolution center.
*   **Profile**: Settings, Role switching (for dev/demo), and preferences.

### Drill-Down Behavior
*   **Verticality**: All dashboards are single-column, scrollable lists of canonical cards.
*   **Breadcrumbs**: Every sub-dashboard (Plant and below) features a sticky `DrilldownBreadcrumb` at the top of the content area (below the header).
*   **Back Navigation**: Standard OS back behavior returns to the immediate parent in the hierarchy.

## 3. Investigation Mode (UX Pattern)
When an entity's OEE falls below the set threshold:
1.  **Header Transform**: The header title gains a pulsing "Investigating" indicator.
2.  **Top-Level Banner**: An `InvestigationBanner` appears at the top of the scroll view.
3.  **Root Cause Cards**: "Operational Attention Areas" are elevated to the top of the card stack to show *why* the entity is underperforming (e.g., "Line 3 Spindle Failure").

## 4. User Flows
### Flow A: The Critical Response
`Notification Received` → `Alert Detail` → `Situation Room` → `Drill-down to Machine` → `Assign Technician` → `Resolution`.

### Flow B: The Performance Audit
`Floor` → `Enterprise Overview` → `Identify Worst Plant` → `Drill to Section` → `Review OEE Trend Intelligence` → `Identify Improvement Target`.

### Flow C: QR Entry
`Global FAB / Header Icon` → `Camera Scan` → `Deep Link to Machine Dashboard` (Bypassing hierarchy navigation but maintaining breadcrumb path back to Line).

## 5. Chronicle Mode (Temporal Logic)
*   **NOW Mode**: Real-time push data via WebSockets/SignalR.
*   **Chronicle Mode**: A global state toggle that changes the data source to historical snapshots.
*   **UI Signature**: When Chronicle is active, a persistent amber "History Active" bar appears at the bottom of the screen, and the OEE Gauges switch to a "Snapshotted" visual style.

## 6. Shared Component Inventory (Flutter-Ready)
*   **OEE Circular Gauge**: Custom painter for concentric arcs (Availability, Performance, Quality).
*   **KPI Block**: Standardized metric container with trend indicators.
*   **Situation Card**: High-density card for the Situation Room with immediate "Take Action" buttons.
*   **Trend Chart**: Sparkline or multi-line chart using a Flutter-native charting library (e.g., `fl_chart`).
*   **Status Summary Strip**: Horizontal bar showing the count of Running/Idle/Breakdown assets.