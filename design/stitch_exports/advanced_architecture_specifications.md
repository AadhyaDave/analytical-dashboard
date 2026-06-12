# Opus One Mobile: Advanced Architecture Specifications (Phase 2)

## 1. Enterprise Dashboard Information Architecture
The Enterprise view (MD level) acts as the global heartbeat. 
- **Primary KPI**: Enterprise OEE (Weighted average of all plants).
- **Secondary KPIs**: Availability, Performance, Quality (Enterprise aggregates).
- **Impact Ranking**: A "Worst-First" list of Plants. The top of the screen focuses on what is broken, not what is working.
- **Drill-down path**: Tapping a Plant card enters the Plant Head view.

## 2. Role-Based Access Architecture (RBAC)
Visibility and entry points are governed by the user's organizational node.
- **MD / Global Admin**: Full visibility. Entry: Situation Room -> Enterprise.
- **Plant Head**: Restricted to their specific Plant node. Entry: Plant Dashboard. No upward navigation to Enterprise.
- **Line Supervisor**: Restricted to their specific Line. Entry: Line Dashboard.
- **Machine Operator**: Machine-level telemetry and Alert reporting only.

## 3. Alert Center Architecture
Alerts are not just notifications; they are "Situations" requiring state management.
- **Severity Tiers**:
    - **CRITICAL (Red)**: Machine Breakdown / Quality Crash. Immediate OEE impact.
    - **WARNING (Amber)**: Sustained Underperformance / Idle state.
    - **INFO (Blue)**: Planned Maintenance / Shift Handover.
- **Lifecycle**: `Triggered` -> `Acknowledged` -> `In-Progress (Technician Assigned)` -> `Resolved` -> `Logged`.
- **Aggregation**: Alerts are rolled up the hierarchy. A machine breakdown appears on the Line, Section, Dept, Plant, and Enterprise views.

## 4. Situation Room V3: Detailed Content Hierarchy
The entry point for all users, tailored to surface "Actionable Intelligence."
1. **The Pulse**: Real-time OEE Gauge + Trend (Now vs. Start of Shift).
2. **Impact Ranked Situations**: The 3 most critical alerts globally that the user has permission to see.
3. **Decision Queue**: Pending approvals (Downtime requests, shift sign-offs).
4. **Shift Intelligence**: Progress bars for A, B, and C shifts with deltas.

## 5. Mobile Information Density Rules
- **No Scrolling for Hero KPIs**: The primary OEE gauge must be visible on the first fold.
- **Canonical Card Pattern**: Every entity (Plant, Machine, Alert) uses a standardized 12px padded card with a semantic status bar on the left.
- **Data Density**: Use condensed fonts for labels. Never use 3 lines for what can be said in 1.

## 6. Card Priority Framework
Inside any dashboard, cards are sorted by **Impact Score**:
`Impact = (Delta from Target OEE) * (Volume/Weight of the Entity)`
This ensures a small machine on a critical line appears higher than a larger machine on a non-critical line.

## 7. Operational States & Specifications
- **Empty States**: Never show a blank screen. If no alerts exist, show "All systems performing above target" with a green checkmark.
- **Error States**: Differentiate between "No Data" (Sensor issue) and "Zero Value" (Machine Off).
- **Offline Mode**: App stores the last 50 telemetry pings locally. UI shows a "Historical Cache" banner. Write actions are queued.
- **Chronicle Mode UX**:
    - **Global Toggle**: Switching to "Chronicle" changes the theme accent to Amber.
    - **Temporal Slider**: A scrubber at the bottom of the screen allows users to "rewind" the factory state to a specific timestamp.
    - **Static Data**: Live pings are ignored; all gauges show the snapshot from the selected time.

## 8. Screen-by-Screen Content Hierarchy (Drill-Down)
- **Plant Level**: Dept Comparison + Machine Leaderboard + Shift Intel.
- **Line Level**: Machine Status Grid + Output vs. Target Sparkline.
- **Machine Level**: 24h Gantt Timeline + Active Fault Log + Cycle Time Analysis.