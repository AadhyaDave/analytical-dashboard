# OPUS_ONE_FLUTTER_ARCHITECTURE_V1.md

Version: 1.0

Status: Approved

Platform: Flutter (Android + iOS)

Architecture Style: Feature-First Clean Architecture

State Management: Riverpod

Navigation: GoRouter

Networking: Dio

Storage: Hive

Source of Truth: OPUS_ONE_MASTER_PRODUCT_SPEC.md

---

# 1. ARCHITECTURE PRINCIPLES

## Guiding Principles

The mobile application is:

* A companion to the existing Opus One web platform
* Mobile-first
* Operationally focused
* Offline-aware
* Real-time capable
* Scalable across multiple manufacturing plants

The application must remain:

* Modular
* Testable
* Maintainable
* Extensible

---

# 2. HIGH LEVEL ARCHITECTURE

UI Layer
↓
Riverpod Providers
↓
Use Cases
↓
Repositories
↓
Data Sources
↓
API / Local Cache

Rules:

* UI never calls APIs directly
* UI never depends on Dio
* UI only consumes providers
* Business logic belongs in domain layer
* Repository layer controls data access

---

# 3. PROJECT STRUCTURE

lib/

app/
core/
features/
shared/
main.dart

---

# 4. APP LAYER

lib/app/

app.dart

router/

theme/

config/

environment/

Responsibilities:

* Application startup
* Routing
* Theme initialization
* Global configuration

---

# 5. CORE LAYER

lib/core/

constants/

errors/

network/

storage/

services/

utils/

extensions/

widgets/

Responsibilities:

* Global utilities
* Network handling
* Storage handling
* Shared services

---

# 6. SHARED LAYER

lib/shared/

models/

repositories/

services/

widgets/

design_system/

Shared across all features.

---

# 7. FEATURE STRUCTURE

Each feature follows the same structure.

Example:

features/plant/

data/
domain/
presentation/

---

# 8. DATA LAYER

data/

datasources/

dto/

mappers/

repository_impl/

Responsibilities:

* API communication
* Local storage
* DTO conversion

Never expose DTOs to UI.

---

# 9. DOMAIN LAYER

domain/

entities/

repositories/

usecases/

Responsibilities:

* Business rules
* Core models
* Use cases

Pure Dart.

No Flutter imports.

---

# 10. PRESENTATION LAYER

presentation/

screens/

widgets/

providers/

controllers/

Responsibilities:

* Screens
* UI state
* User interaction

---

# 11. RIVERPOD ARCHITECTURE

Global Providers:

authProvider

themeProvider

chronicleProvider

navigationProvider

websocketProvider

notificationProvider

---

Feature Providers:

situationRoomProvider

enterpriseProvider

plantProvider

departmentProvider

sectionProvider

lineProvider

machineProvider

alertsProvider

watchlistProvider

workOrdersProvider

warRoomProvider

---

Provider Types

AsyncNotifierProvider

NotifierProvider

FutureProvider

StreamProvider

Use AsyncNotifierProvider as default.

---

# 12. GOROUTER ARCHITECTURE

Root Routes

/

/situation-room

/floor

/watchlist

/alerts

/profile

---

Hierarchy Routes

/enterprise

/plant/:plantId

/department/:departmentId

/section/:sectionId

/line/:lineId

/machine/:machineId

---

Operations Routes

/alerts

/alerts/:alertId

/work-orders

/work-orders/:workOrderId

/war-room

/war-room/:incidentId

---

Shift Routes

/shifts

/shifts/summary

/shifts/handover

/shifts/signoff

---

Chronicle Routes

/chronicle

/chronicle/timeline

/chronicle/compare

/chronicle/replay

---

Discovery Routes

/search

/search/results

/scan

/watchlist

---

# 13. REPOSITORY PATTERN

Example

abstract class PlantRepository {

Future<PlantMetrics> getMetrics();

Future<List<Department>> getDepartments();

}

Implementation

PlantRepositoryImpl

uses

PlantRemoteDataSource

PlantLocalDataSource

---

Repositories Required

AuthRepository

SituationRoomRepository

EnterpriseRepository

PlantRepository

DepartmentRepository

SectionRepository

LineRepository

MachineRepository

AlertRepository

ShiftRepository

WatchlistRepository

ChronicleRepository

WorkOrderRepository

WarRoomRepository

SearchRepository

---

# 14. NETWORKING

Package

dio

Responsibilities

Authentication

Interceptors

Retry logic

Logging

Error mapping

Base Structure

ApiClient

AuthInterceptor

ErrorInterceptor

NetworkResponse

---

# 15. LOCAL STORAGE

Package

Hive

Used For

User preferences

Cached hierarchy

Chronicle snapshots

Offline telemetry

Cached alerts

Session data

---

# 16. REAL-TIME ARCHITECTURE

Supports

WebSockets

SignalR

Provider

websocketProvider

Used For

Live OEE

Machine status

Alerts

Incident updates

Shift updates

---

# 17. DESIGN SYSTEM STRUCTURE

shared/design_system/

colors.dart

typography.dart

spacing.dart

radius.dart

elevation.dart

icons.dart

animations.dart

theme.dart

No hardcoded values allowed.

---

# 18. SHARED WIDGET LIBRARY

Critical Widgets

OEEGauge

KPIBlock

StatusSummaryStrip

InvestigationBanner

SituationCard

AlertCard

PlantCard

DepartmentCard

SectionCard

LineCard

MachineCard

TrendChart

GanttTimeline

BreadcrumbBar

ShiftProgressCard

ChronicleBanner

WorkOrderCard

WarRoomCard

EvidenceCard

All widgets must be reusable.

---

# 19. INVESTIGATION MODE

Global feature.

Trigger

OEE below threshold.

Behavior

Show InvestigationBanner

Prioritize Operational Attention Areas

Highlight active causes

Inject into:

Enterprise

Plant

Department

Section

Line

Machine

---

# 20. CHRONICLE MODE

Global state.

Managed through:

chronicleProvider

State

NOW

CHRONICLE

Responsibilities

Historical snapshots

Replay mode

Then vs Now

Historical timeline

Historical alerts

---

# 21. OFFLINE STRATEGY

Offline First Read

Online First Write

Cache

Hierarchy

Telemetry

Alerts

Work Orders

Behavior

Queue writes

Sync later

Show Offline Banner

---

# 22. ERROR HANDLING

Global Error Types

NetworkError

AuthError

ServerError

ValidationError

UnknownError

Use Failure objects.

Never expose raw exceptions.

---

# 23. MOCK DATA STRATEGY

Phase 1

Mock repositories.

No backend required.

Example

PlantRepositoryMock

MachineRepositoryMock

AlertRepositoryMock

All screens use mock data first.

---

# 24. TESTING STRATEGY

Unit Tests

Repositories

Use Cases

Providers

Widget Tests

Shared widgets

Screen Tests

Critical workflows

---

# 25. IMPLEMENTATION ROADMAP

Phase 1

Project Setup

Flutter

Riverpod

GoRouter

Dio

Hive

Build Runner

---

Phase 2

Design System

Colors

Typography

Spacing

Theme

---

Phase 3

Shared Widgets

OEEGauge

Cards

Charts

Banners

---

Phase 4

Navigation

Bottom Navigation

Routing

Breadcrumbs

---

Phase 5

Mock Repository Layer

---

Phase 6

Situation Room

Enterprise

Plant

Department

Section

Line

Machine

---

Phase 7

Alert Operations

---

Phase 8

Machine Intelligence

---

Phase 9

Shift Operations

---

Phase 10

Search & Watchlist

---

Phase 11

Chronicle

---

Phase 12

Work Orders

War Room

Evidence

Daily Briefing

---

Phase 13

Backend Integration

---

Phase 14

Testing

---

Phase 15

Production Release

---

# 26. DEFINITION OF DONE

The Flutter architecture is considered complete when:

* All screens use Riverpod
* All data flows through repositories
* No UI directly accesses APIs
* Design system is fully adopted
* Shared widgets are reusable
* Chronicle mode works globally
* Investigation mode works globally
* Offline support exists
* Real-time updates work
* Backend contracts integrate successfully

END OF DOCUMENT
