# OPUS ONE MOBILE — STITCH GOD PROMPT v2.0
## Feature-Complete Edition — Not a Dashboard Viewer. A Full Intelligence Platform.

---

> HOW TO USE
>
> Step 1: Run BATCH A (Screens 1–5) — paste MASTER DESIGN BRIEF + screens 1–5
> Step 2: Run BATCH B (Screens 6–9) — paste MASTER DESIGN BRIEF + screens 6–9
> The MASTER DESIGN BRIEF must be included in every single Stitch session.
> Never skip the DATA PARITY and INVESTIGATION MODE sections.

---

# ═══════════════════════════════════════════════════
# MASTER DESIGN BRIEF
# Paste this at the top of EVERY Stitch prompt session
# ═══════════════════════════════════════════════════

```
PRODUCT: Opus One Mobile
PURPOSE: The full native iOS/Android intelligence companion to the Opus One 
Operational Intelligence Platform web application. Not a viewer. Not a 
simplified version. A complete peer product with the same data depth, the same 
analytical features, and the same intelligence — reorganized for mobile.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRIME DIRECTIVE — READ THIS FIRST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Every screen in this mobile app is the FULL equivalent of its web counterpart.
No feature from the web is removed. No data is hidden.
The mobile layout is reorganized for a single-column touch interface,
but the analytical depth is identical.

The web product has these CORE INTELLIGENCE FEATURES. They MUST appear
on mobile exactly as described:

1. INVESTIGATION MODE — When a user drills into any entity (plant, dept, 
   section, line) that is underperforming, the screen enters Investigation Mode.
   Header shows "Investigating: [Entity Name]" with a live amber/red badge.
   An "OPERATIONAL ATTENTION AREAS" panel surfaces the specific cause.

2. OEE TREND INTELLIGENCE — A 5-metric trend chart showing OEE, Availability,
   Performance, Quality, and Subtotal as separate colored lines over a shift.
   This appears on every drill-down dashboard screen.

3. SHIFT INTELLIGENCE — Comparison of Shift A, Shift B, Shift C with:
   OEE achieved per shift, colored progress bars, delta vs previous shift.

4. MACHINE LEADERBOARD — Ranked list of machines by OEE performance.
   Shows rank number, machine name, OEE%, and delta vs target.
   Appears at Plant level and below.

5. IMPROVEMENT TARGETS — Categorized operational loss breakdown:
   Mechanical Breakdown, Setup & Changeover, Minor Stops, Slow Running.
   Each with impact percentage and colored severity indicator.

6. TOP PERFORMERS SECTION — Ranked list of top-performing lines/sections/
   machines. Appears on every dashboard from Plant level downward.

7. OPERATIONAL LOSS CONTRIBUTORS — Visual breakdown of loss categories
   as horizontal percentage bars. Critical for every section/line view.

8. ACTIVE ALERTS PANEL — Full list of current alerts with:
   severity color, description, affected asset, time elapsed, and inline actions.
   This is never just a count. Always show the actual alerts.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXACT COLOR TOKENS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Background (app root):     #060c18   — very dark navy, near-black
Background (cards):        #0d1526   — dark navy card surface
Background (header):       #080f1e   — deep header surface
Background (inputs):       #111d35   — raised interactive surface
Background (deepest):      #050a14   — modals, overlays, sidesheets

Border (default):          rgba(255, 255, 255, 0.06)
Border (emphasis):         rgba(255, 255, 255, 0.12)
Border (active/teal):      rgba(0, 200, 210, 0.35)
Border (warning):          rgba(217, 119, 6, 0.3)
Border (critical):         rgba(220, 38, 38, 0.3)

Primary accent (teal):     #00c8d2   — brand highlight, active states
Primary accent dim:        rgba(0, 200, 210, 0.15)
Secondary accent (cyan):   #06b6d4   — secondary highlights

Brand logo:                #e53935   — red, used ONLY for logo mark
Logo background:           #1a0808   — dark red tint, logo only

Text (primary):            #f0f4ff   — near-white, main text
Text (secondary):          #8b9dc3   — muted blue-gray, labels
Text (tertiary):           #4a5e8a   — dim, hints, disabled
Text (KPI value):          #ffffff   — pure white, large KPI numbers only
Text (investigation):      #00c8d2   — teal, "Investigating:" header text

Status Running:            #16a34a   fill: rgba(22, 163, 74, 0.12)
Status Idle/Warning:       #d97706   fill: rgba(217, 119, 6, 0.12)
Status Breakdown:          #dc2626   fill: rgba(220, 38, 38, 0.12)
Status Planned Stop:       #7c3aed   fill: rgba(124, 58, 237, 0.12)

OEE Gauge — Availability:  #00c8d2   (teal, outer ring)
OEE Gauge — Performance:   #4ade80   (bright green, middle ring)
OEE Gauge — Quality:       #f59e0b   (amber, inner ring)
OEE Gauge — Track:         rgba(255, 255, 255, 0.06)

Chart — OEE line:          #00c8d2   (teal)
Chart — Availability:      #4ade80   (green)
Chart — Performance:       #a78bfa   (soft purple)
Chart — Quality:           #f59e0b   (amber)
Chart — Subtotal:          #64748b   (slate gray)
Chart — Target line:       rgba(255, 255, 255, 0.3) dashed
Chart — Grid:              rgba(255, 255, 255, 0.04)
Chart — Axis labels:       #4a5e8a

Delta positive:            #16a34a   (green, with ▲)
Delta negative:            #dc2626   (red, with ▼)
Delta neutral:             #8b9dc3   (muted, with →)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TYPOGRAPHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Font: System UI (SF Pro on iOS, Roboto on Android)
Hero KPI:          52–60px, weight 300 (light), color #ffffff
Large KPI:         32–40px, weight 400, color #ffffff
Medium KPI:        22–28px, weight 500, color #ffffff
Section header:    11px, weight 600, UPPERCASE, letter-spacing 0.1em, 
                   color #8b9dc3 — EXACTLY this, never different
Card title:        15px, weight 500, color #f0f4ff
Card subtitle:     12px, weight 400, color #8b9dc3
Table/rank label:  12px, weight 400, color #8b9dc3
Rank number:       12px, weight 600, color #4a5e8a
Body:              14px, weight 400, color #8b9dc3
Tag/badge:         10px, weight 600, uppercase
Delta text:        12px, weight 600, color = delta direction
Investigation tag: 13px, weight 600, color #00c8d2, 
                   "Investigating: [Name]" with live amber dot

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FULL COMPONENT LIBRARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPONENT 1: OEE CIRCULAR GAUGE
  Three concentric arcs on a dark gray track #rgba(255,255,255,0.06):
  — Outer arc: Availability (teal #00c8d2), stroke 7px, rounded caps
  — Middle arc: Performance (green #4ade80), stroke 7px, rounded caps
  — Inner arc: Quality (amber #f59e0b), stroke 7px, rounded caps
  Center: composite OEE % in large white bold. Below: "OEE" muted label.
  Sizes: Large 140px, Medium 80px, Small 56px

COMPONENT 2: KPI BLOCK
  Background #0d1526, border-radius 12px, border 0.5px rgba(255,255,255,0.06)
  Label: 11px uppercase muted. Value: large white. Delta: colored arrow + %.
  Optional: micro sparkline at bottom edge.

COMPONENT 3: INVESTIGATION BANNER
  Triggered when a screen is in "drill-down investigation" state.
  Background rgba(0,200,210,0.06), border-left 3px #00c8d2, border-radius 10px
  Left: pulsing amber dot. Text: "Investigating: [Entity Name]" in 13px teal.
  Sub-label: "OPERATIONAL ATTENTION AREAS" in 10px uppercase muted.
  This is a CRITICAL component. Must appear on every drill-down screen.

COMPONENT 4: OPERATIONAL ATTENTION AREA PANEL
  Shows WHY a specific entity is underperforming.
  Background #0d1526, border-left 3px amber, border-radius 12px
  Header: "OPERATIONAL ATTENTION AREAS" uppercase small.
  Content: 2–3 specific issue items, each with:
  — Colored severity dot
  — Issue description in 13px white
  — Asset/location in 11px muted
  — Time duration or impact value
  This MUST have concrete operational text, not generic placeholders.

COMPONENT 5: OEE TREND INTELLIGENCE CHART
  Full-width, height 180px, background #0d1526, border-radius 12px
  Title: "OEE TREND INTELLIGENCE (SHIFT)" in section header style
  5 colored lines: OEE (teal), Availability (green), Performance (purple), 
  Quality (amber), Subtotal (slate)
  Legend below chart: 5 colored dots with labels
  X-axis: shift time labels (08:00, 10:00, 12:00, 14:00, 16:00)
  Y-axis: 60–100% range, muted grid lines
  Target reference line: dashed white at target OEE %

COMPONENT 6: SHIFT INTELLIGENCE PANEL
  Background #0d1526, border-radius 12px
  Header: "SHIFT INTELLIGENCE" uppercase small
  Three rows — Shift A, Shift B, Shift C:
  Each row: shift label | progress bar (colored fill) | OEE % | delta badge
  Shift A bar: teal/green fill (highest)
  Shift B bar: slightly shorter
  Shift C bar: shorter still (or amber if significantly below)
  Delta badges: green ▲+7.8% or red ▼-4.9% in small colored badges

COMPONENT 7: MACHINE LEADERBOARD
  Background #0d1526, border-radius 12px
  Header: "MACHINE LEADERBOARD" + "VIEW ALL" teal link right
  Ranked list — 5 machines:
  Each row: rank # (muted) | machine name (white) | OEE bar (teal fill) | 
            OEE % (white bold) | delta (colored)
  #1 row has subtle teal left accent or gold color on rank number
  Dividers: 0.5px rgba(255,255,255,0.04) between rows

COMPONENT 8: IMPROVEMENT TARGETS PANEL
  Background #0d1526, border-radius 12px
  Header: "IMPROVEMENT TARGETS" + count badge (e.g., "4" in amber)
  List of loss categories:
  — Mechanical Breakdown: red dot, impact %, example "+4.2% OEE potential"
  — Setup & Changeover: amber dot, impact %
  — Minor Stops: amber dot, impact %
  — Slow Running: muted dot, impact %
  Each item: icon | category name | impact badge | detail arrow

COMPONENT 9: TOP PERFORMERS SECTION
  Header: "TOP PERFORMING [LINES / SECTIONS / MACHINES]" uppercase small
  Compact ranked list, each row:
  Rank # | name | OEE % bold | shift comparison small muted
  Max 5 rows. "See All" teal link at bottom right.

COMPONENT 10: OPERATIONAL LOSS CONTRIBUTORS
  Header: "OPERATIONAL LOSS CONTRIBUTORS"
  3–5 horizontal percentage bars, each:
  Label (12px muted) | teal/amber/red fill bar | percentage value right-aligned
  Bars are proportional to each other.
  Categories: Setup & Changeover 62% | Minor Stops 22% | Slow Running 16%

COMPONENT 11: ACTIVE ALERTS LIST
  Header: "ACTIVE ALERTS" + count badge (red if > 0)
  Each alert item:
  — 4px left accent bar (red/amber/teal by severity)
  — Severity dot + alert title (13px white)
  — Description: asset name, location, duration (11px muted)
  — Time ago right-aligned (11px muted)
  — OEE impact badge (red "-X.X% OEE" if breakdown)
  Never show just the count. Always show the actual alert items.

COMPONENT 12: MACHINE CARD (standard)
  Full-width, background #0d1526, border-radius 12px
  4px left status bar (color = machine status)
  Row 1: machine name (bold white) + status pill + right: OEE % large white
  Row 2: operator name (muted) + operating time
  Row 3: 3 mini KPIs inline: Avail | Perf | Quality
  Row 4 (if issue): issue description in amber/red small text

COMPONENT 13: STATUS PILL
  Small rounded badge: colored dot + status text
  Running: #16a34a fill, "Running" white text
  Idle: #d97706 fill, "Idle" white text
  Breakdown: #dc2626 fill, "Breakdown" white text
  Planned: #7c3aed fill, "Planned Stop" white text
  Font: 10px, weight 600, uppercase

COMPONENT 14: SECTION HEADER ROW
  11px, weight 600, UPPERCASE, letter-spacing 0.1em, color #8b9dc3
  Optional right-side: teal "See All" link or count badge
  Consistent throughout the entire app.

COMPONENT 15: APP HEADER
  Background #080f1e
  Left: Back chevron + breadcrumb context path (teal, 12px)
  Center: Current screen title (16px white weight 500)
  Right: notification bell (red badge with count) + user initials avatar circle
  Below: context-sensitive status — "ONLINE & STABLE  ·  Live data" in 11px teal
  If investigation mode: shows "Investigating: [Name]" pulsing amber dot

COMPONENT 16: BOTTOM NAVIGATION BAR
  Background #080f1e, border-top 0.5px rgba(255,255,255,0.05)
  4 tabs: Situation Room (alert-triangle icon), Floor (factory-2 icon),
  Watchlist (star icon), Profile (user-circle icon)
  Active: teal icon + teal label + small teal underline dot
  Inactive: #4a5e8a icon, no label

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LAYOUT RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

— Dark mode only. Background #060c18 always.
— Single column, vertically scrollable. No horizontal scroll except inside 
  charts. All content stacks top to bottom.
— Card padding: 16px inside, 12px between cards, 16px horizontal screen margin.
— All cards: border-radius 12px, border 0.5px rgba(255,255,255,0.06).
— No white backgrounds. No light surfaces. No elevated shadows.
— Use border + slightly lighter bg for card depth, not box-shadow.
— Section headers always appear before their content sections.
— Content is DENSE. Each screen should show the same data volume as the web.
— Safe area: respect device notch and home indicator.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABSOLUTELY DO NOT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✗ No light backgrounds or white cards anywhere
✗ No Material Design defaults (blue primary, gray surface, FAB)
✗ No hamburger menus — mobile uses bottom navigation bar
✗ No placeholder lorem ipsum — use realistic manufacturing data
✗ No rounded OEE % — always one decimal place (e.g., 88.6% not 89%)
✗ No hiding intelligence features — every web feature must appear on mobile
✗ No empty "Investigation Mode" — it must show real operational text
✗ Do not skip the OEE Trend Intelligence chart on any dashboard screen
✗ Do not skip Shift Intelligence on any dashboard screen
✗ Do not skip Machine Leaderboard on Plant level and below
✗ Do not skip Improvement Targets or Loss Contributors on drill-down screens
✗ Do not show a simple OEE number without the 3-ring gauge component
✗ Do not make this look like a consumer app — industrial software aesthetic
```

---

# ═══════════════════════════════════════════════════
# BATCH A — SCREENS 1–5
# ═══════════════════════════════════════════════════

## SCREEN 1 — Login

```
[PASTE MASTER DESIGN BRIEF ABOVE]

SCREEN: Login / Entry
PLATFORM: Mobile iOS + Android — portrait

LAYOUT top to bottom:
— Top 35% of screen — branding block:
  Center: Red "C" circular logo (44px, red #e53935, bg #1a0808, radius 12px)
  Below: "opus one" text 24px weight-300 white
  Below: "Operational Intelligence Platform" 12px muted #8b9dc3
  Below: "Operational Drill-Down Intelligence" 11px teal #00c8d2
  Below: thin separator line rgba(255,255,255,0.06)

— Login form block:
  Label "SIGN IN" — 11px uppercase teal, letter-spacing 0.1em
  Email field: bg #111d35, border 0.5px rgba(255,255,255,0.08), 
    radius 10px, placeholder "Email address", height 52px, 16px padding
  Password field: same, placeholder "Password", eye icon right
  Spacer 8px
  "Access Dashboard →" button: full-width, bg #00c8d2, text #060c18 weight 600, 
    height 52px, radius 10px
  Below: "Forgot password?" 12px muted centered

— Role quick-select row:
  3 pills: "MD" · "Plant Head" · "Line Head"
  Each: bg #111d35, border rgba(255,255,255,0.08), radius 20px, 12px muted text
  Label above: "QUICK ACCESS" 10px uppercase muted

— Footer:
  "v2.1.0 · Enterprise Edition" 11px #4a5e8a centered
  "ONLINE & STABLE" green dot + text 11px teal

FEEL: Premium industrial. Serious. Confident. No decorations.
```

---

## SCREEN 2 — Situation Room (Mobile-Native Entry Point)

```
[PASTE MASTER DESIGN BRIEF ABOVE]

SCREEN: Situation Room — Primary home screen
PLATFORM: Mobile iOS + Android — portrait

This replaces the MD Dashboard as the home screen.
It surfaces situations and decisions rather than requiring navigation.
All 8 core intelligence features (Investigation Mode, Shift Intel, etc.) are
accessible by tapping through. This screen is the gateway, not the destination.

LAYOUT top to bottom:

APP HEADER:
  Left: red logo "C" (24px) + "opus one" 14px weight-300
  Right: notification bell red badge "3" + avatar circle "RK" teal bg

— ENTERPRISE OEE PULSE CARD (bg #0d1526, radius 16px, border teal 0.5px):
  Top label: "ENTERPRISE OEE  ·  LIVE" 11px uppercase teal with pulsing green dot
  Main row: 
    Left column: "82.4" in 56px weight-300 white + "%" 26px muted
                 Below: "▲ +3.3%  vs yesterday" 12px green
                 Below: "Shift B  ·  5h 14m remaining" 11px muted
    Right column: OEE gauge (large 110px) showing 
      Availability 91.2% (teal), Performance 90.8% (green), Quality 97.1% (amber)
  Plant status mini-row: 4 colored dots + plant names + OEE values:
    green "Plant A 88.6%" · amber "Plant B 76.2%" · green "Plant C 88.4%" 
    · green "Plant D 91.1%"
  Footer: "ONLINE & STABLE  ·  Last sync 8s ago" 10px teal dim

— SECTION HEADER: "ACTIVE SITUATIONS  ·  3  RANKED BY IMPACT"

— SITUATION CARD 1 (red accent bar 4px left):
  Top: red dot + "Machine 7 down — Banco Products Line 3" + red badge "-3.2% OEE"
  Sub: "Breakdown · 47 min · No technician assigned · Escalating"
  Actions row: ghost "Timeline" · ghost "History" · filled teal "Assign →"

— SITUATION CARD 2 (amber accent bar 4px left):
  "REHAU Extrusion B — sustained underperformance" + amber badge "-1.8% OEE"
  "2h 12m below shift target · Shift Head notified · Under monitoring"
  Actions: ghost "Details" · filled amber "Escalate →"

— SITUATION CARD 3 (teal accent bar, info):
  "Dabur Packaging — recovering from idle state" + teal badge "+0.8% OEE"
  "Recovery in progress · On track for shift target · No action needed"
  Actions: ghost "View trend →"

— SECTION HEADER: "DECISIONS NEEDED  ·  2"

— DECISION ROW 1: lightning icon (teal) · "Approve planned downtime — Line 4" 
  · "Suresh M. · 23 min ago" muted · right chevron ›

— DECISION ROW 2: sync icon · "Shift handover incomplete — 3 lines" 
  · "Shift A → B · 08:00 handover pending" muted · right chevron ›

— SECTION HEADER: "SHIFT INTELLIGENCE  ·  TODAY"
— Compact shift rows (3): Shift A 92% ▲+7.8% | Shift B 87% → | Shift C 76% ▼-4.9%
  Each as: label | teal/green bar | % value | delta badge

— BOTTOM NAVIGATION BAR (Situation Room tab active, teal)
```

---

## SCREEN 3 — Managing Director Full Dashboard

```
[PASTE MASTER DESIGN BRIEF ABOVE]

SCREEN: Managing Director Dashboard — Full intelligence view
PLATFORM: Mobile iOS + Android — portrait
Navigation: "Floor" tab → top level

THIS SCREEN IS THE FULL MD VIEW. Every intelligence feature must appear.
Do not simplify. Show the same data as the web MD dashboard, scrollable.

APP HEADER:
  No back arrow (top level). Title "Managing Director" teal.
  Sub: breadcrumb shows "Enterprise Overview"
  Right: notification bell + avatar "RK"
  Status: "ONLINE & STABLE  ·  Live" green dot 11px teal

— ENTERPRISE KPI CARD (bg #0d1526, full-width):
  4-block 2×2 grid:
    OEE 82.4% (teal color) | AVAILABILITY 91.2%
    PERFORMANCE 90.8%       | QUALITY 97.1%
  Below: "TOTAL OPERATING  1,401 machines"
  Status row: Running 1,287 (green) · Idle 89 (amber) · Breakdown 25 (red)
  Machine distribution mini horizontal bar: proportional colored segments

— SECTION HEADER: "PLANTS  ·  4  OPERATIONAL"

PLANT CARD — Plant A (full-width, bg #0d1526):
  Header row: "Plant A" bold white + green pill "Operational" + "88.6%" teal 28px right
  OEE row: gauge (medium 80px) left + right column:
    AVAILABILITY 91.4% · PERFORMANCE 97.8% · QUALITY 99.2%
  Status row: "48 machines  ·  Running 44  ·  Idle 3  ·  Down 1" colored dots
  Bottom: "Investigate →" teal link right-aligned
  Bottom border 0.5px rgba(255,255,255,0.04)

PLANT CARD — Plant B (amber border rgba(217,119,6,0.2) — ATTENTION REQUIRED):
  Header: "Plant B" + AMBER pill "Attention Required" + "76.2%" AMBER 28px
  Same structure. Down: 5 in RED text. 
  Amber 3px left accent on this card.

PLANT CARD — Plant C: green "88.4%"
PLANT CARD — Plant D: teal "91.1%" green pill "Exceeding Target"

— SECTION HEADER: "OEE TREND INTELLIGENCE (SHIFT)"

OEE TREND INTELLIGENCE CHART (height 200px, bg #0d1526, radius 12px):
  5 lines: OEE (teal), Avail (green), Perf (purple), Quality (amber), Sbtl (slate)
  X-axis: shift time 08:00 → 16:00
  Y-axis: 60–100%, grid lines rgba(255,255,255,0.04)
  Target dashed white reference line at 85%
  Legend row below: 5 colored dots with labels in 11px muted

— SECTION HEADER: "SHIFT INTELLIGENCE"

SHIFT INTELLIGENCE PANEL (bg #0d1526):
  3 rows:
  Shift A: teal bar ~92% fill | "92%" bold white | ▲ green "+7.8%"
  Shift B: teal bar ~87% fill | "87%" bold white | → muted "-0.4%"
  Shift C: amber bar ~76% fill | "76%" amber     | ▼ red "-4.9%"

— SECTION HEADER: "MACHINE LEADERBOARD  ·  TOP 5"

MACHINE LEADERBOARD (bg #0d1526):
  Rank | Machine Name         | OEE bar (teal fill) | OEE%  | Delta
  1.   CNC Lathe Z1           | ████████████         | 93.1% | ▲+8.1%
  2.   CNC Machining Centre 01| ████████████         | 81.2% | ▲+1.3%
  3.   CNC Machining Centre 02| ███████████          | 90.3% | ▼-0.8%
  4.   Packaging Line A       | ███████████          | 84.6% | ▲+2.1%
  5.   Vertical Milling Ctr 01| ██████████           | 84.6% | ▼-7.3%
  "View all machines →" teal link bottom right

— SECTION HEADER: "ACTIVE ALERTS  ·  3"

ACTIVE ALERTS LIST (full items, not just count):
  Alert 1: RED bar | "Spindle overheating — Mechanical Breakdown" | 
    "Machine 7  ·  Banco Products Line 3  ·  47 min" | "-3.2% OEE" red badge
  Alert 2: AMBER bar | "Operator on scheduled break" |
    "Line 4 · 18 min" | no OEE badge
  Alert 3: AMBER bar | "Performance degradation testing required" |
    "CNC Section · 1h 20m"

— SECTION HEADER: "IMPROVEMENT TARGETS  ·  4"

IMPROVEMENT TARGETS PANEL (bg #0d1526):
  Mechanical Breakdown:  RED dot   | "+4.2% OEE potential"  | ▼ high impact
  Setup & Changeover:    AMBER dot | "+1.8% OEE potential"  | ▼ medium
  Minor Stops:           AMBER dot | "+0.9% OEE potential"  | → low
  Slow Running:          MUTED dot | "+0.4% OEE potential"  | → low

— BOTTOM NAVIGATION BAR (Floor tab active)
```

---

## SCREEN 4 — Plant Head / Investigation Mode

```
[PASTE MASTER DESIGN BRIEF ABOVE]

SCREEN: Plant Head Dashboard — Investigation Mode active
PLATFORM: Mobile iOS + Android — portrait
This is the MOST IMPORTANT screen for feature parity.
The web version shows "Plant A Investigation Workspace" with full intelligence.
Mobile must match it exactly, scrollable.

APP HEADER:
  Back arrow + breadcrumb "Managing Director ›"
  Title "Plant A" white 16px
  Sub-breadcrumb: "ONLINE & STABLE · Plant Investigation Active" teal
  Right: notification bell + avatar

INVESTIGATION BANNER (CRITICAL COMPONENT — must appear prominently):
  Background rgba(0,200,210,0.08), border-left 3px #00c8d2, radius 10px, 
  padding 12px 16px
  Left: pulsing amber dot
  Text: "Investigating: Plant A" 13px teal weight 600
  Sub: "OPERATIONAL ATTENTION AREAS" 10px uppercase muted #8b9dc3

OPERATIONAL ATTENTION AREAS PANEL (bg #0d1526, amber border-left 3px):
  "OPERATIONAL ATTENTION AREAS" section header amber
  Item 1: AMBER dot | "Packaging dept OEE at 38.0% — 52% below target" |
    "Performance degradation identified. Root cause: material shortage." 11px muted
  Item 2: RED dot | "Machine 7 breakdown — Line 3 affected" |
    "47 minutes downtime. Technician not assigned." 11px muted
  Item 3: AMBER dot | "Quality rate decline in Assembly" |
    "94.1% vs 98.5% target. Inspection backlog building." 11px muted

PLANT SUMMARY CARD (bg #0d1526):
  Center: OEE gauge (large 130px) showing 81% — 
    Avail 91.2% (teal), Perf 97.8% (green), Quality 38.0% (amber — VERY LOW)
  Below gauge: "PLANT A  ·  PUNE FACILITY" teal label
  4 KPI blocks 2×2:
    OEE 81% (large, amber since below target) | AVAILABILITY 91.2%
    PERFORMANCE 97.8%                         | QUALITY 38.0% (RED — critical)
  Quality 38.0% should have red text + red background fill on its KPI block
  Status row: "48 machines · Running 44 · Idle 3 · Breakdown 1"

SECTION HEADER: "DEPARTMENTS  ·  5"
Department cards (each full-width, same structure):

MACHINING: OEE gauge 80px | "91.2%" teal | green pill "On Target"
  Avail 94.6% · Perf 96.3% · Qual 99.8%
  "Investigate →" teal link

ASSEMBLY: "90.8%" white | green pill "On Target"  
  Avail 92.1% · Perf 97.4% · Qual 94.1%

CNC SECTION: "97.8%" teal | teal pill "Exceeding Target"
  Avail 98.2% · Perf 99.1% · Qual 99.9%

PACKAGING: RED LEFT ACCENT BAR (3px red) + RED BORDER rgba(220,38,38,0.2)
  "38.0%" RED large text | RED pill "Critical — Below Target"
  Avail 85.3% · Perf 44.6% (RED) · Qual 99.8%
  "NEEDS IMMEDIATE ATTENTION" in red 11px below KPIs
  "Investigate →" red teal link

FINISHING: "84.5%" white | amber pill "Monitor"

SECTION HEADER: "OEE TREND INTELLIGENCE (SHIFT)"
OEE TREND CHART — same as MD level but scoped to Plant A departments.
5 colored lines, shift timeline, target line.

SECTION HEADER: "SHIFT INTELLIGENCE"
3 shifts with bars + deltas (same structure as MD screen).

SECTION HEADER: "TOP PERFORMING SECTIONS"
Ranked list — 3 items:
  1. CNC Section    97.8%  ▲+12.3% vs target
  2. Machining      91.2%  ▲+6.2%
  3. Assembly       90.8%  ▲+5.8%
"Packaging Section excluded (investigation mode)" muted italic below

SECTION HEADER: "OPERATIONAL LOSS CONTRIBUTORS"
Horizontal bars:
  Setup & Changeover  62% — teal bar
  Minor Stops         22% — amber bar
  Slow Running        16% — muted bar

SECTION HEADER: "PERFORMANCE MANAGEMENT OPPORTUNITIES"
4 rows:
  HIGH: "Resolve Packaging Performance Issue" — "+9.8% plant OEE potential"
  MED:  "Reduce Machine 7 breakdown frequency" — "+3.2% potential"
  MED:  "Optimize CNC Section changeover time" — "+1.4% potential"
  LOW:  "Review Assembly quality checks" — "+0.6% potential"

BOTTOM NAVIGATION BAR
```

---

## SCREEN 5 — Machine Detail — Full Intelligence

```
[PASTE MASTER DESIGN BRIEF ABOVE]

SCREEN: Machine Detail — Complete telemetry for one machine
PLATFORM: Mobile iOS + Android — portrait
This is the DEEPEST drill-down. Must show EVERYTHING the web shows.

APP HEADER:
  Back arrow + breadcrumb "CNC Section  ›  Line 01  ›"
  Title: "CNC Lathe 21" white 16px
  Right: QR-scan icon (white outline) + notification bell + avatar
  Status: "ONLINE & STABLE  ·  Live data  ·  Updated 4s ago" teal 11px

MACHINE STATUS BANNER:
  Background rgba(22,163,74,0.10), border-left 4px #16a34a, radius 10px
  Left: pulsing green dot + "RUNNING" 13px green weight 600
  Center: "Operator: Arjun Sharma  ·  Shift B  ·  Operating 4h 23m"
  Right: "91.2%" 28px white bold

OEE BREAKDOWN CARD (bg #0d1526):
  Header: "OEE BREAKDOWN  ·  CURRENT SHIFT" section label
  Center: OEE gauge (large 140px)
    Outer Availability 94.6% teal · Middle Performance 96.3% green · 
    Inner Quality 99.8% amber
    Center: "91.2%" white bold + "OEE" muted below
  3 columns below gauge:
    AVAIL    94.6%  (teal value)
    PERF     96.3%  (white)
    QUALITY  99.8%  (white)
  Each column: colored dot above value + muted uppercase label below

KPI GRID (2×2 blocks):
  PARTS PRODUCED  1,401  delta: "▲ 96.6% of 1,450 target" muted
  CYCLE TIME      42s    delta: "▼ -2s vs standard" green
  DOWNTIME        0:00   sub: "No downtime this shift" green small
  TOTAL UPTIME    4h 23m sub: "Since last shift start"

SECTION HEADER: "SHIFT TIMELINE  ·  TODAY"
GANTT TIMELINE (full-width, 72px tall, bg #0d1526 radius 12px):
  24-hour bar: hour markers 00, 04, 08, 12, 16, 20, 24 below
  Segments: green (running 85%), amber (idle 8%), red (breakdown 0%), 
    purple (planned 4%), gray (off-shift 3%)
  Current time marker: thin white dashed vertical line
  Legend: colored dots + labels below
  Tooltip hint: "Tap segments for details" 10px muted

SECTION HEADER: "OEE TREND INTELLIGENCE  ·  LAST 24H"
OEE TREND CHART (height 180px):
  5 lines: OEE teal, Availability green, Performance purple, Quality amber, 
  Subtotal slate. Target dashed white line at 88%.
  Full legend row with colored dots.

SECTION HEADER: "SHIFT PERFORMANCE"
  Current shift progress bar (teal fill 68%) + "Shift B  ·  68% complete"
  Below: 3 shift comparison rows (A/B/C) with OEE bars + deltas

SECTION HEADER: "MACHINE HISTORY  ·  LAST 5 EVENTS"
  Compact event list:
  Each row: colored dot (status) | event type | duration | date
  — GREEN: Running  4h 23m  Today
  — AMBER: Idle (material)  18m  Yesterday 14:30
  — GREEN: Running  7h 11m  Yesterday
  — RED:   Breakdown (spindle)  1h 4m  2 days ago
  — GREEN: Running  6h 52m  2 days ago

SECTION HEADER: "ACTIVE ALERTS  ·  0" (or show if any)
  If 0: teal checkmark + "No active alerts for this machine" muted

SECTION HEADER: "IMPROVEMENT TARGETS"
  If any: show panel component
  If none: "Machine performing above all targets" green small text

BOTTOM NAVIGATION BAR
```

---

# ═══════════════════════════════════════════════════
# BATCH B — SCREENS 6–9
# ═══════════════════════════════════════════════════

## SCREEN 6 — Section Head / Investigation Mode

```
[PASTE MASTER DESIGN BRIEF ABOVE]

SCREEN: Section Head Dashboard — Investigation Mode
PLATFORM: Mobile iOS + Android — portrait
Web equivalent: "Investigating: CNC Section" with full intelligence panel.

APP HEADER:
  Back arrow + "Machining Dept ›" breadcrumb teal
  Title: "CNC Section" white
  Sub: "ONLINE & STABLE · Section Investigation Active" teal

INVESTIGATION BANNER:
  "Investigating: CNC Section" teal, pulsing amber dot
  "OPERATIONAL ATTENTION AREAS" 10px muted uppercase

OPERATIONAL ATTENTION AREAS PANEL (amber border-left 3px):
  "CNC Section · 91.2% OEE · On target" but showing specific watch items:
  AMBER dot: "VMC Section trending downward — 2h" / "Performance drop 4.3%"
  AMBER dot: "Lathe Section changeover time elevated" / "Setup time +18min vs std"
  INFO dot:  "Press Section performing above target" / "No intervention needed"

SECTION SUMMARY CARD:
  OEE gauge (large 130px): Avail 92.1%, Perf 97.8%, Quality 99.8%, OEE 91.2%
  4 KPI blocks: OEE 91.2% | AVAIL 92.1% | PERF 97.8% | QUAL 99.8%
  Status: "14.5% downtime this shift" in amber small

SECTION HEADER: "LINES  ·  4" (for Section Head it's Lines)
Line cards — each with OEE gauge, KPIs, status:
  VMC Section:    OEE gauge medium | "91.2%" teal | green pill
  Lathe Section:  "90.8%" white    | amber pill "Monitor — Changeover elevated"
  Press Section:  "97.8%" teal     | teal pill "Exceeding Target"  
  CNC Section:    "91.2%" white    | green pill

SECTION HEADER: "SECTION OEE TREND"
OEE TREND CHART — 5 lines, shift timeline. Same chart component.

SECTION HEADER: "SHIFT PERFORMANCE"
3 shift rows (A/B/C) with progress bars and deltas.

SECTION HEADER: "TOP PERFORMING LINES"
Ranked list: 1. Press Section 97.8% ▲ · 2. VMC Section 91.2% · 3. CNC Section 91.2%

SECTION HEADER: "OPERATIONAL LOSS CONTRIBUTORS"
Horizontal bars (3): Setup & Changeover 62% | Minor Stops 22% | Slow Running 16%

SECTION HEADER: "OPERATIONAL LOSS CONTRACTORS" (same as web)
  Shows top 2 contractor performance lines with OEE impact

BOTTOM NAVIGATION BAR
```

---

## SCREEN 7 — Line Head Dashboard

```
[PASTE MASTER DESIGN BRIEF ABOVE]

SCREEN: Line Head Dashboard — All machines on one line
PLATFORM: Mobile iOS + Android — portrait
Web equivalent: "Investigating: Line 01 (Heavy)" full view.

APP HEADER:
  Back arrow + "CNC Section ›" breadcrumb
  Title: "Line 01 — Heavy" white
  Sub: "Line Investigation Active" teal (if underperforming) or 
       "ONLINE & STABLE" if on target
  Right: notification bell badge "2" + avatar

INVESTIGATION BANNER (amber — since line has issues):
  "Investigating: Line 01 (Heavy)" teal/amber
  "OPERATIONAL ATTENTION AREAS" muted

OPERATIONAL ATTENTION AREAS PANEL:
  RED dot: "CNC Lathe ID — Machine data reporting 0.0%" / "Data/sensor issue likely"
  AMBER dot: "Lathe ID running at 84.6%" / "Below 88% target. Running light load."
  INFO dot: "CNC Lathe 01 exceeding target" / "No action required"

LINE SUMMARY CARD:
  OEE gauge (large) showing 94.6%
  Row: "LINE 01 — HEAVY  ·  94.6%" teal large
  Delta: "▲ +2.1% vs yesterday"
  3 KPIs: AVAIL 96.3% | PERF 97.2% | QUALITY 99.8%
  Parts: "1,401 produced  ·  Target: 1,450 (96.6%)" muted
  Status: "Running 3 · Idle 1 · Down 0" colored dots

SECTION HEADER: "MACHINES  ·  4"

MACHINE CARD 1 — CNC Lathe 01 (Running):
  Green 4px left bar | green pill "Running" | 
  OEE small gauge + "91.2%" white bold right
  "Operator: Arjun Sharma  ·  Operating 4h 23m"
  "Parts today: 412  ·  Cycle: 42s" muted

MACHINE CARD 2 — VMC Machine 01 (Running):
  Green bar | "Running" | "88.4%" white
  "Operator: Priya Sharma  ·  Operating 3h 47m"

MACHINE CARD 3 — CNC Lathe ID (Data Issue):
  RED 4px left bar | RED pill "Data Issue" |  "0.0%" RED bold right
  "No data received  ·  Possible sensor failure" amber 12px
  Action: "Investigate →" red teal link

MACHINE CARD 4 — Lathe ID (Idle):
  AMBER 4px left bar | AMBER pill "Idle · 18 min" | "84.6%" amber bold
  "Idle reason: Awaiting material" amber 12px
  "Operator: Kumar S." muted

SECTION HEADER: "LINE OUTPUT TREND  ·  CURRENT SHIFT"
Line chart (height 160px): parts output over shift hours.
Actual line (teal) vs target line (dashed white).

SECTION HEADER: "SHIFT PERFORMANCE"
3 shift bars (A/B/C) with % and deltas.

SECTION HEADER: "TOP PERFORMING MACHINES"
Ranked: 1. CNC Lathe 01  91.2% ▲ · 2. VMC 01  88.4% · 3. Lathe ID  84.6% ▼

SECTION HEADER: "OPERATIONAL LOSS CONTRIBUTORS"
Setup 62% | Minor Stops 22% | Slow Running 16%

BOTTOM NAVIGATION BAR
```

---

## SCREEN 8 — Alert Detail & Shift Handover

```
[PASTE MASTER DESIGN BRIEF ABOVE]

SCREEN 8A: Alert / Situation Full Detail
PLATFORM: Mobile iOS + Android — portrait

APP HEADER:
  Back arrow + "Situation Room ›"
  Title: "Breakdown  ·  Machine 7" white
  Right: notification bell + avatar

STATUS BANNER (red bg rgba(220,38,38,0.12), red border-left 4px):
  Pulsing RED dot + "BREAKDOWN  ·  47 MINUTES  ·  HIGH IMPACT"
  Sub: "Machine 7  ·  Banco Products  ·  Line 3  ·  CNC Section"

IMPACT SUMMARY CARD (bg #0d1526):
  "SHIFT OEE IMPACT" section header red
  Large red text: "−3.2%" + "% points lost this shift"
  Bar: Actual vs Target (actual bar red, target dashed)
  "Projected impact if unresolved +30 min: −5.1%" in amber small

INCIDENT TIMELINE (vertical, bg #0d1526):
  "INCIDENT TIMELINE" header
  14:23 — RED dot — "Machine entered breakdown state"
  14:25 — GRAY dot — "Auto-alert generated · Escalated to Section Head"
  14:31 — AMBER dot — "Section Head acknowledged alert"
  14:45 — GRAY dot — "Technician not yet assigned — 14 min delay"
  NOW   — PULSING RED dot — "Awaiting resolution"

MACHINE CONTEXT (bg #0d1526):
  "MACHINE CONTEXT" header
  Machine: CNC Lathe 21 | Line: Line 3 | Section: CNC
  Last maintenance: 8 days ago | Next scheduled: 12 days
  "LAST 5 BREAKDOWNS": compact table — date | cause | duration | resolved by

ACTIONS CARD (teal border 0.5px, bg #0d1526):
  "TAKE ACTION" teal section header
  "Assign Technician" — filled teal button full-width 52px
  "Log Downtime Reason" — ghost button full-width
  "Escalate to Plant Head" — ghost red button full-width
  "Attach failure photo" — camera icon + text ghost button

--- SCREEN 8B: Shift Handover ---

SCREEN: Shift Handover workflow — mobile exclusive feature

APP HEADER: "Shift Handover" | "Shift A  →  Shift B" amber subtext

PROGRESS STEPS (3 pills top): "1 Review" (active teal) → "2 Notes" → "3 Sign Off"

SHIFT SUMMARY CARD (bg #0d1526):
  "SHIFT A PERFORMANCE SUMMARY" header
  OEE gauge (medium 80px) + "87.3%  ·  Shift A"
  Parts: 1,247 / 1,450 target (86.0%)
  Shift: 08:00 — 16:00

OPEN ITEMS SECTION (amber header, amber border-left 3px):
  "OPEN ITEMS TO HAND OVER  ·  3"
  RED dot: "Machine 7 — Breakdown, technician assigned, ETA 30min"
  AMBER dot: "Line 4 — Planned downtime starts 16:30, approved"
  AMBER dot: "CNC Lathe 02 — Slow running, root cause not determined"

NOTES INPUT:
  "HANDOVER NOTES" header
  Text area bg #111d35, border, radius 10px, 5 lines tall
  Placeholder: "Add operational notes for incoming shift head..."
  Below: "Attach photo" ghost button + file icon

SIGN-OFF BLOCK:
  "Outgoing: Suresh M." — green checkmark (completed)
  "Incoming: Priya K." — gray checkbox (pending)

SUBMIT: "Complete Handover →" teal full-width 52px

BOTTOM NAVIGATION BAR
```

---

## SCREEN 9 — Watchlist + Department Comparative View

```
[PASTE MASTER DESIGN BRIEF ABOVE]

SCREEN 9A: Watchlist
PLATFORM: Mobile iOS + Android — portrait

APP HEADER: "Watchlist" | Edit right teal link

SECTION HEADER: "WATCHED MACHINES  ·  4"
Machine cards (standard component) for pinned machines:
  CNC Lathe 21 — Running · 91.2% — teal filled star right icon
  VMC Machine 03 — Idle · 72.4% amber — amber filled star
  Packaging Line A — Running · 90.3% — teal star
  CNC Machining Centre 01 — Running · 81.2% — teal star

Each card shows: status bar + status pill + OEE gauge (small) + 3 KPIs

SECTION HEADER: "WATCHED LINES  ·  1"
Line card: "Line 01 — Heavy" | OEE 94.6% | 4 machines status dots

SECTION HEADER: "WATCHLIST ACTIVITY  ·  LAST 24H"
Event list: colored dot | machine | what changed | time ago

ADD BUTTON: ghost "Browse machines to add →" teal dashed border

--- SCREEN 9B: Department Comparative View ---
(Accessible from Plant Head → "Compare all depts" button)

APP HEADER: back + "Plant A ›" | "Department Comparison" title

COMPARISON GRID (2 cards per row, consistent structure):
  MACHINING card:   OEE gauge (medium) | "91.2%" teal | green pill
  ASSEMBLY card:    OEE gauge (medium) | "90.8%" white | green pill
  CNC SECTION card: OEE gauge (medium) | "97.8%" teal | teal pill "Exceeding"
  PACKAGING card:   OEE gauge (medium) | "38.0%" RED  | red pill "Critical"
    — This card: red border, red bg fill, amber alert text below
  FINISHING card:   OEE gauge (medium) | "84.5%" white | amber pill

SECTION HEADER: "OEE COMPARISON  ·  ALL DEPARTMENTS"
Horizontal bar chart: each dept as a row with proportional teal/red bar + value

SECTION HEADER: "SHIFT INTELLIGENCE  ·  PLANT WIDE"
Shift A/B/C rows with bars and deltas for the whole plant.

BOTTOM NAVIGATION BAR
```

---

# ═══════════════════════════════════════════════════
# ANTIGRAVITY HANDOFF PROMPT
# Use after Stitch export
# ═══════════════════════════════════════════════════

```
Take the Stitch Flutter export and implement the following architecture:

ARCHITECTURE: Clean Architecture — strict separation of Presentation, Domain, 
and Data layers. No screen widget imports data directly.

REPOSITORIES: Create these classes with async methods simulating API latency:
  PlantRepository   — getAll(), getById(id), getInvestigationData(id)
  DepartmentRepository — getByPlantId(plantId), getInvestigationData(id)
  SectionRepository — getByDeptId(deptId), getShiftIntelligence(id)
  LineRepository    — getBySectionId(sectionId), getMachineLeaderboard(id)
  MachineRepository — getById(id), getTimeline(id), getOEETrend(id)
  AlertRepository   — getActive(), getByMachineId(id), acknowledge(id)
  ShiftRepository   — getCurrent(), handover(data)

STATE MANAGEMENT: Riverpod. One provider per repository. Screens use 
ConsumerWidget and ref.watch(). No setState on complex data.

NAVIGATION: GoRouter. Named routes matching the hierarchy:
  / → SituationRoom (home)
  /floor → MDDashboard
  /floor/plant/:plantId → PlantHeadDashboard
  /floor/plant/:plantId/dept/:deptId → DepartmentHeadDashboard
  /floor/:plantId/:deptId/section/:sectionId → SectionHeadDashboard
  /floor/:sectionId/line/:lineId → LineHeadDashboard
  /machine/:machineId → MachineDetailDashboard
  /alerts/:alertId → AlertDetail
  /handover → ShiftHandover
  /watchlist → Watchlist

DESIGN TOKENS: Create tokens.dart with ALL color values from the Master Brief.
Never hardcode hex values in any widget file.

INVESTIGATION MODE: Every drill-down screen must check if the entity OEE is 
below target. If below target → show InvestigationBanner widget and 
OperationalAttentionPanel widget at the top of the screen.

SCREEN COMPONENTS TO CREATE AS REUSABLE WIDGETS:
  OEEGauge(diameter, availability, performance, quality)
  KPIBlock(label, value, delta, deltaPositive)
  InvestigationBanner(entityName, entityType)
  OperationalAttentionPanel(items: List<AttentionItem>)
  OEETrendChart(data: ShiftTrendData)
  ShiftIntelligencePanel(shifts: List<ShiftData>)
  MachineLeaderboard(machines: List<MachineRankData>)
  ImprovementTargetsPanel(targets: List<ImprovementTarget>)
  OperationalLossContributors(losses: List<LossData>)
  ActiveAlertsList(alerts: List<AlertItem>)
  MachineCard(machine: MachineData)
  GanttTimeline(events: List<TimelineEvent>)
  StatusPill(status: MachineStatus)
  SituationCard(situation: SituationData)

SAFE AREA: Every screen wraps content in SafeArea. 
Use react-native-safe-area-context equivalent in Flutter.
```

---

*Opus One Mobile — Stitch God Prompt v2.0*
*Feature-Complete Edition — Full intelligence parity with web platform*
*9 screens | 16 components | Full Investigation Mode | All data features*
