---
name: Industrial Intelligence
colors:
  surface: '#001330'
  surface-dim: '#001330'
  surface-bright: '#27395a'
  surface-container-lowest: '#000d26'
  surface-container-low: '#061b3a'
  surface-container: '#0b1f3e'
  surface-container-high: '#172a49'
  surface-container-highest: '#223555'
  on-surface: '#d7e2ff'
  on-surface-variant: '#bbc9ca'
  inverse-surface: '#d7e2ff'
  inverse-on-surface: '#1e3050'
  outline: '#859394'
  outline-variant: '#3c494a'
  surface-tint: '#36dae4'
  primary: '#46e4ee'
  on-primary: '#00373a'
  primary-container: '#00c8d2'
  on-primary-container: '#004f53'
  inverse-primary: '#00696f'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#ffc49b'
  on-tertiary: '#4f2500'
  tertiary-container: '#ff9d4f'
  on-tertiary-container: '#703700'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ff6ff'
  primary-fixed-dim: '#36dae4'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f53'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#001330'
  on-background: '#d7e2ff'
  surface-variant: '#223555'
  bg-app: '#060c18'
  bg-card: '#0d1526'
  bg-header: '#080f1e'
  bg-input: '#111d35'
  bg-overlay: '#050a14'
  status-running: '#16a34a'
  status-idle: '#d97706'
  status-breakdown: '#dc2626'
  status-planned: '#7c3aed'
  data-performance: '#4ade80'
  data-quality: '#f59e0b'
  text-primary: '#f0f4ff'
  text-secondary: '#8b9dc3'
  text-tertiary: '#4a5e8a'
  border-default: rgba(255, 255, 255, 0.06)
  border-emphasis: rgba(255, 255, 255, 0.12)
typography:
  hero-kpi:
    fontFamily: Roboto
    fontSize: 56px
    fontWeight: '300'
    lineHeight: 64px
    letterSpacing: -0.02em
  large-kpi:
    fontFamily: Roboto
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
  medium-kpi:
    fontFamily: Roboto
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  section-header:
    fontFamily: Roboto
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  card-title:
    fontFamily: Roboto
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 20px
  card-subtitle:
    fontFamily: Roboto
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  body:
    fontFamily: Roboto
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  delta-text:
    fontFamily: Roboto
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  tag-label:
    fontFamily: Roboto
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  gutter: 12px
  margin-horizontal: 16px
  component-height: 52px
---

## Brand & Style

The design system embodies a **Deep Dark Industrial** aesthetic, moving away from consumer-oriented softness toward a high-density, professional utility. It is designed for operational environments where data clarity and systemic hierarchy are paramount.

### Design Narrative
- **Personality:** Technical, authoritative, and precise.
- **Target Audience:** Manufacturing leadership (Managing Directors to Line Heads) requiring immediate, actionable operational telemetry.
- **Visual Style:** **Minimalism meets Industrial Brutalism.** The UI utilizes a "Layered Surface" philosophy rather than traditional shadows. Depth is achieved through strategic color contrast and microscopic borders (0.5px). 
- **Emotional Response:** Reliability under pressure, clarity amidst complexity, and a sense of "live" operational control.

## Colors

The palette is strictly dark-mode, optimized for OLED efficiency and reduced eye strain in low-light factory environments.

- **Primary Accent (Teal):** Reserved for "Active Intelligence," primary CTAs, and the "Investigation Mode" state.
- **Surface Strategy:** Backgrounds follow a hierarchical stack. `bg-app` is the base, `bg-card` is the primary interactive layer, and `bg-overlay` is used for deep focus (modals).
- **Semantic Logic:** Status colors (Running, Idle, Breakdown) are never used for branding; they are strictly functional indicators of machine health.
- **Transparency:** Use `rgba` overlays for status badges (e.g., 12% opacity fill of the status color) to maintain a cohesive dark-navy bleed across the UI.

## Typography

The system utilizes native system fonts (SF Pro on iOS, Roboto on Android) to maximize performance and legibility.

- **Data Density:** Typography is balanced between massive numerical displays (Hero KPIs) and high-density metadata (Tags/Labels).
- **Hero KPIs:** Use a Light (300) weight for very large numbers to prevent them from feeling visually "heavy" or overwhelming the screen.
- **Section Headers:** Must always be uppercase with 0.1em tracking to differentiate structural labels from content.
- **Delta Indicators:** Upward (▲) and downward (▼) indicators should be paired with `delta-text` and semantic colors for immediate trend recognition.

## Layout & Spacing

This design system employs a **Fixed Content Grid** within a vertical scroll container, optimized for single-column mobile delivery.

- **Rhythm:** A 4px/8px base unit maintains a rigid industrial grid.
- **Horizontal Margins:** All content is inset 16px from the screen edge.
- **Card Spacing:** Vertical gaps between cards are fixed at 12px (`gutter`) to maintain a tight, information-rich density.
- **Interactive Targets:** Buttons and input fields are standardized at 52px height to ensure high accessibility for floor workers who may be wearing gloves or in motion.

## Elevation & Depth

Depth is conveyed through **Tonal Layering** and **Micro-Borders**, rejecting the use of drop shadows.

- **Surface Hierarchy:** 
  1. Base: `#060c18` (App Root)
  2. Level 1: `#0d1526` (Cards/Pills)
  3. Level 2: `#111d35` (Inputs/Active Items)
- **Borders:** All cards and interactive containers must use a 0.5px border of `rgba(255, 255, 255, 0.06)`. This creates a "precision-milled" look.
- **Visual Distinction:** Depth is signaled by the transition from darker to slightly lighter navies, simulating an illuminated industrial instrument panel.

## Shapes

The shape language is "Modern Geometric," utilizing soft but distinct corners that suggest professional precision.

- **Main Cards:** 12px (`rounded-lg`) for all primary data containers.
- **Interactive Elements:** 10px for buttons and inputs.
- **Status Pills:** 20px (Pill-shaped) for operational badges.
- **Indicators:** Circles are reserved exclusively for status dots and user avatars.

## Components

### Canonical Elevation Card
The primary container for all metrics. 
- **Background:** `#0d1526`
- **Border:** 0.5px `rgba(255, 255, 255, 0.06)`
- **Corner Radius:** 12px
- **Padding:** 16px internal.

### OEE 3-Ring Gauge
A proprietary visualization displaying Availability, Performance, and Quality.
- **Outer Ring:** Availability (Status color-coded).
- **Middle Ring:** Performance (`#4ade80`).
- **Inner Ring:** Quality (`#f59e0b`).
- **Center:** Total OEE % in `medium-kpi` style.

### Investigation Mode Banner
Triggered when KPIs fall below thresholds.
- **Styling:** Top-fixed or card-integrated banner with a teal glow (`rgba(0, 200, 210, 0.35)` border) and pulsing teal indicator.
- **Text:** "INVESTIGATING" in `tag-label` style.

### Status Pill
Semantic badges for operational state.
- **Style:** 20px radius, background at 12% opacity of the semantic color, text at 100% opacity of the same color.
- **Icon:** Include a small 6px solid circle (dot) before the text label.

### KPI Block
Standardized metric display.
- **Layout:** Vertical stack. Label (`section-header`), Value (`large-kpi`), and Trend Indicator (`delta-text`).
- **Trend Coloration:** Green for positive growth (Running), Red for negative (Breakdown), except when "Lower is Better" (e.g., Downtime).

### Machine Card
Aggregated view for individual assets.
- **Feature:** Must include a 4px solid vertical "Status Bar" on the extreme left edge, color-coded to the machine's current operational state.