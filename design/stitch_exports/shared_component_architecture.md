# Opus One Mobile: Shared Component System (Flutter Architecture)

This document defines the reusable widget architecture for the Opus One Mobile platform. Every component is designed for high data density, operational clarity, and strict adherence to the manufacturing hierarchy.

---

## 1. Core Visualization Components

### OEE Circular Gauge
*   **Purpose**: The primary visual health indicator for any entity (Enterprise, Plant, Dept, etc.).
*   **Inputs**: `availability` (%), `performance` (%), `quality` (%), `oee` (%), `size` (Small, Medium, Large).
*   **States**: 
    *   *Default*: Teal/Green/Amber concentric rings.
    *   *Critical*: Inner ring pulses red if Quality < target.
*   **Investigation Mode**: The gauge background gains a subtle amber glow.
*   **Chronicle Mode**: Rings desaturate to indicate historical snapshot; center text shows "SNAP".

### KPI Block
*   **Purpose**: Standardized container for secondary metrics.
*   **Inputs**: `label`, `value`, `delta` (value + direction), `unit`.
*   **Variants**: `Primary` (large), `Secondary` (compact).
*   **States**: `Positive` (green delta), `Negative` (red delta), `Neutral`.
*   **Chronicle Mode**: Delta indicators are replaced with a timestamp reference.

### Trend Intelligence Chart
*   **Purpose**: Multi-line visualization of shift-long performance.
*   **Inputs**: `timeseriesData` (OEE, Avail, Perf, Qual, Subtotal), `targetLine` (%).
*   **Mobile Behavior**: Horizontal scrub to view specific time-node data.
*   **Investigation Mode**: Highlights the specific period where degradation began.

---

## 2. Card & Content Components

### Situation Card
*   **Purpose**: Flagship component for the Situation Room.
*   **Inputs**: `title`, `description`, `impactScore`, `status`, `actions` (List<Action>).
*   **States**: `Triggered`, `Acknowledged`, `Escalated`.
*   **Mobile Behavior**: Swipe left for "Quick Assign," swipe right for "Acknowledge."

### Machine / Asset Card
*   **Purpose**: Canonical representation of a physical asset.
*   **Inputs**: `id`, `status` (Running, Idle, Down), `operator`, `oee`.
*   **Variants**: `ListCard` (compact), `DetailCard` (expanded).
*   **Investigation Mode**: Automatically expands to show the "Active Fault" sub-panel.

### Operational Attention Areas (OAA)
*   **Purpose**: Surfacing root causes during investigation.
*   **Inputs**: `issueList` (Severity, Description, Location, Duration).
*   **Mobile Behavior**: Vertical accordion; tapping an item deep-links to the Machine Detail.
*   **Investigation Mode**: Always pinned to the top of the scroll view.

---

## 3. Structural & Navigation Components

### Drilldown Breadcrumb
*   **Purpose**: Maintaining hierarchical context.
*   **Inputs**: `path` (List<Entity>).
*   **Mobile Behavior**: Horizontal scrollable list. Tapping any parent returns to that level.

### Shift Intelligence Panel
*   **Purpose**: Comparing current performance across shifts.
*   **Inputs**: `shiftData` (A, B, C), `progress` (%).
*   **Investigation Mode**: Highlights the shift where the current "Situation" originated.

### Chronicle Control (Global Widget)
*   **Purpose**: Controlling temporal state.
*   **Inputs**: `activeTimestamp`.
*   **States**: `NOW` (Live), `CHRONICLE` (Historical).
*   **Mobile Behavior**: Floating slider at the bottom of the screen.

---

## 4. Operational Logic Components

### Alert Card
*   **Purpose**: Managed alert state container.
*   **Inputs**: `severity` (Critical, Warning, Info), `timestamp`, `description`.
*   **Variants**: `Dismissable`, `Actionable`.

### Status Summary Strip
*   **Purpose**: Instant count of asset health.
*   **Inputs**: `runningCount`, `idleCount`, `downCount`.
*   **Mobile Behavior**: Fixed at the bottom of the header; tapping a segment filters the list below.

### Improvement Targets
*   **Purpose**: Identifying potential OEE gains.
*   **Inputs**: `category`, `impactPotential`, `priority`.
*   **Variants**: `LossBreakdown` (bars), `ActionList` (rows).