# OPUS_ONE_MASTER_PRODUCT_SPEC.md

Version: 1.0
Status: Approved
Platform: Flutter (Android + iOS)
Product: Opus One Mobile
Source of Truth: Existing Opus One Web Platform

---

# 1. PRODUCT OVERVIEW

## Vision

Opus One Mobile is a manufacturing operational intelligence platform designed to provide real-time visibility, decision support, incident management, and historical operational analysis across the entire manufacturing hierarchy.

The application is not a replacement for the existing web platform.

The mobile application serves as an operational companion focused on:

* Monitoring
* Investigation
* Incident Response
* Shift Operations
* Maintenance Coordination
* Executive Decision Support

---

# 2. BUSINESS OBJECTIVES

The platform aims to:

* Improve OEE visibility
* Reduce downtime
* Accelerate incident response
* Improve shift accountability
* Enable mobile-first operations
* Support maintenance execution
* Provide historical operational intelligence
* Support executive decision-making

---

# 3. MANUFACTURING HIERARCHY

The hierarchy is mandatory and cannot be bypassed except through QR access.

Enterprise
→ Plant
→ Department
→ Section
→ Line
→ Machine

Every screen must preserve operational context through breadcrumbs and hierarchy-aware navigation.

---

# 4. USER ROLES & RBAC

## MD / Global Admin

Access:

* Enterprise
* Plant
* Department
* Section
* Line
* Machine

Entry:

Situation Room → Enterprise

---

## Plant Head

Access:

* Assigned Plant
* All child nodes

Entry:

Situation Room → Plant

---

## Department Head

Access:

* Assigned Department
* Child nodes

Entry:

Department Dashboard

---

## Line Supervisor

Access:

* Assigned Line
* Machines

Entry:

Line Dashboard

---

## Machine Operator

Access:

* Machine Dashboard
* Alerts
* Shift Notes

Entry:

Machine Dashboard

---

# 5. PRIMARY NAVIGATION

Bottom Navigation:

1. Situation Room
2. Floor
3. Watchlist
4. Alerts
5. Profile

---

# 6. CORE PRODUCT MODULES

## Situation Room

Primary Entry Screen

Purpose:

Operational command center.

Features:

* Enterprise Pulse
* Active Situations
* Impact Rankings
* Decision Queue
* Shift Intelligence
* Quick Actions

---

## Enterprise Dashboard

Purpose:

Executive operational visibility.

Features:

* Enterprise OEE
* Plant Ranking
* Enterprise Trends
* Alert Overview
* Shift Intelligence

---

## Plant Dashboard

Purpose:

Plant-level operational intelligence.

Features:

* OEE
* Department Comparison
* Shift Intelligence
* Operational Attention Areas
* Active Alerts

---

## Department Dashboard

Purpose:

Department performance monitoring.

Features:

* Department OEE
* Section Comparison
* Trends
* Active Issues

---

## Section Dashboard

Purpose:

Section-level monitoring.

Features:

* Line Comparison
* OEE Trends
* Operational Losses

---

## Line Dashboard

Purpose:

Line performance management.

Features:

* Machine Status
* Output Tracking
* Downtime Tracking

---

## Machine Dashboard

Purpose:

Deep operational visibility.

Features:

* OEE
* Timeline
* Faults
* Alerts
* Production Metrics

---

# 7. INVESTIGATION MODE

Purpose:

Rapid root-cause identification.

Trigger:

OEE below threshold.

Behavior:

* Investigation Banner
* Elevated Operational Attention Areas
* Highlighted root causes
* Priority alert surfacing

Investigation Mode exists on:

* Enterprise
* Plant
* Department
* Section
* Line
* Machine

---

# 8. ALERT OPERATIONS SUITE

## Alert Center

Features:

* Critical Alerts
* Warning Alerts
* Info Alerts
* Search
* Filters

---

## Alert Lifecycle

Triggered
→ Acknowledged
→ Assigned
→ In Progress
→ Resolved
→ Logged

---

## Alert Detail

Displays:

* Root Cause
* Impact
* Timeline
* Assignments
* Evidence

---

# 9. MACHINE INTELLIGENCE SUITE

## Machine Detail

Displays:

* OEE
* Availability
* Performance
* Quality
* Current Status

---

## Machine Timeline

24-hour operational timeline.

States:

* Running
* Idle
* Breakdown
* Maintenance

---

## Fault History

Historical fault analysis.

---

## Maintenance History

Historical maintenance records.

---

## OEE Trend Analysis

24h
7d
30d

Trend analysis and recommendations.

---

# 10. SHIFT OPERATIONS SUITE

## Shift Summary

Displays:

* Shift OEE
* Output
* Downtime
* Quality

---

## Shift Handover

Workflow:

Review
→ Notes
→ Sign-Off

---

## Shift Notes

Categories:

* Production
* Quality
* Maintenance
* Safety

Supports:

* Text
* Voice
* Photos

---

## Shift Sign-Off

Formal shift accountability process.

---

## Shift Intelligence

Cross-shift performance analysis.

---

# 11. SEARCH & DISCOVERY SUITE

## Global Search

Search:

* Plants
* Departments
* Sections
* Lines
* Machines
* Alerts

---

## Search Results

Filters:

* Assets
* Alerts
* Locations

---

## QR Scanner

Purpose:

Instant asset access.

---

## QR Result

Displays:

* Asset
* Status
* OEE
* Alerts

---

# 12. WATCHLIST SUITE

## Watchlist

User-pinned assets.

Supports:

* Plants
* Departments
* Lines
* Machines

---

## Watchlist Activity

Tracks:

* Status changes
* Alerts
* OEE shifts
* Maintenance events

---

# 13. CHRONICLE INTELLIGENCE SUITE

## Purpose

Historical operational replay system.

Chronicle enables users to investigate historical factory states.

---

## Chronicle Features

### Chronicle Entry

Historical access point.

### Time Travel Selector

Historical timestamp selection.

### Historical Dashboard

Historical Situation Room.

### Then vs Now

Comparative operational analysis.

### Historical Alert Replay

Incident replay system.

### Historical Machine Timeline

Machine state reconstruction.

### Root Cause Investigation

Historical incident analysis.

### Chronicle Session Library

Saved investigations.

---

# 14. DAILY PLANT BRIEFING

Purpose:

Executive operational summary.

Features:

* Yesterday OEE
* Production Summary
* Downtime Summary
* Operational Risks
* Recommendations

Actions:

* Share
* Export
* Save

---

# 15. MAINTENANCE WORK ORDERS

## Work Order States

Created
→ Assigned
→ Accepted
→ In Progress
→ Completed
→ Closed

---

## Work Order Features

* Assignment
* Escalation
* Resolution Tracking
* OEE Impact Tracking

---

# 16. DIGITAL WAR ROOM

Purpose:

Manage critical incidents.

Features:

* Incident Timeline
* Participant Management
* Action Tracking
* Escalation Management
* Decision Tracking

---

# 17. PHOTO EVIDENCE SYSTEM

Supports:

* Machine Faults
* Quality Issues
* Safety Issues
* Maintenance Evidence

Metadata:

* Timestamp
* Plant
* Department
* Section
* Line
* Machine

---

# 18. DESIGN SYSTEM

Theme:

Industrial Dark Theme

Primary Accent:

Teal

Chronicle Accent:

Amber

---

## Core Components

* OEEGauge
* KPIBlock
* InvestigationBanner
* StatusSummaryStrip
* SituationCard
* AlertCard
* MachineCard
* TrendChart
* GanttTimeline
* BreadcrumbBar

---

# 19. FLUTTER ARCHITECTURE

Framework:

Flutter

Platforms:

Android
iOS

---

## State Management

Riverpod

---

## Navigation

GoRouter

---

## Networking

Dio

---

## Local Storage

Hive

---

## Serialization

Freezed
Json Serializable

---

# 20. PROJECT STRUCTURE

lib/

app/
core/
features/
shared/

Feature Structure:

data/
domain/
presentation/

---

# 21. API ARCHITECTURE

Pattern:

Repository Pattern

UI must never directly consume APIs.

UI
→ Provider
→ Repository
→ Data Source
→ API

---

# 22. REAL-TIME OPERATIONS

Supports:

* WebSockets
* SignalR
* Push Notifications

Use Cases:

* Live OEE
* Alerts
* Incident Updates
* Shift Updates

---

# 23. OFFLINE STRATEGY

Supports:

* Cached telemetry
* Cached hierarchy
* Queued actions

Offline Banner:

Historical Cache Active

---

# 24. DEVELOPMENT ROADMAP

Phase 1
Foundation

Phase 2
Design System

Phase 3
Shared Components

Phase 4
Navigation

Phase 5
Repository Layer

Phase 6
Mock Data

Phase 7
Core Screens

Phase 8
Advanced Operations

Phase 9
Backend Integration

Phase 10
Production Release

---

# 25. SUCCESS CRITERIA

The application is considered successful when users can:

* Monitor operations
* Investigate performance losses
* Respond to incidents
* Manage maintenance
* Execute shift handovers
* Analyze historical events
* Make operational decisions

from a mobile device without requiring access to the desktop platform.
