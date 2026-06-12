# API Contracts Draft

This document defines the expected JSON payloads for the Opus One Mobile V2 backend APIs. These contracts assume that the backend handles sorting (worst-first) and data aggregation to keep the mobile client thin.

## 1. Enterprise Hierarchy (MD Dashboard)

### `GET /api/v1/enterprise/metrics`
Returns global health and KPI metrics for the enterprise heartbeat.
```json
{
  "enterpriseOEE": 76.9,
  "trend": 1.4,
  "kpis": {
    "availability": 88.2,
    "performance": 75.1,
    "quality": 98.9
  }
}
```

### `GET /api/v1/enterprise/plants?sort=oee_asc&limit=5`
Returns worst-performing plants for the Impact Ranked Cards.
```json
{
  "plants": [
    {
      "id": "uuid-plant-1",
      "name": "Plant C — Chennai",
      "oee": 72.1,
      "target": 80.0,
      "status": "critical"
    }
  ]
}
```

## 2. Plant Hierarchy

### `GET /api/v1/plants/{plantId}/metrics`
Returns the shift progression and aggregate department statuses.
```json
{
  "shiftTimeElapsedPercent": 50.0,
  "plantOEE": 78.4,
  "statusAggregate": {
    "running": 24,
    "idle": 5,
    "breakdown": 2
  }
}
```

### `GET /api/v1/plants/{plantId}/departments?sort=oee_asc`
Returns worst-performing departments.
```json
{
  "departments": [
    {
      "id": "uuid-dept-1",
      "name": "Machining",
      "oee": 71.0,
      "target": 80.0,
      "status": "critical"
    }
  ]
}
```

## 3. Department Hierarchy

### `GET /api/v1/departments/{deptId}/metrics`
```json
{
  "departmentOEE": 74.2,
  "kpis": {
    "availability": 85.0,
    "performance": 70.0,
    "quality": 95.0
  },
  "statusAggregate": {
    "running": 10,
    "idle": 2,
    "breakdown": 1
  }
}
```

### `GET /api/v1/departments/{deptId}/sections?sort=oee_asc`
```json
{
  "sections": [
    {
      "id": "uuid-sec-1",
      "name": "CNC Milling",
      "oee": 68.5,
      "target": 80.0,
      "status": "critical"
    }
  ]
}
```

## 4. Section Hierarchy

### `GET /api/v1/sections/{sectionId}/metrics`
```json
{
  "sectionOEE": 82.1,
  "kpis": {
    "targetOutput": 1200,
    "downtimeHrs": 4.5,
    "shiftProgressPercent": 60.0
  },
  "statusAggregate": {
    "running": 4,
    "idle": 1,
    "breakdown": 0
  }
}
```

### `GET /api/v1/sections/{sectionId}/lines?sort=oee_asc`
```json
{
  "lines": [
    {
      "id": "uuid-line-1",
      "name": "Line 3",
      "oee": 80.5,
      "target": 85.0,
      "status": "degraded"
    }
  ]
}
```

## 5. Line Hierarchy

### `GET /api/v1/lines/{lineId}/metrics`
Note: The Line dashboard focuses heavily on physical output rather than just OEE percentages.
```json
{
  "production": {
    "totalProduced": 1240,
    "targetToday": 1500,
    "goodCount": 1198,
    "rejectCount": 42
  },
  "statusAggregate": {
    "running": 8,
    "idle": 0,
    "breakdown": 1
  }
}
```

### `GET /api/v1/lines/{lineId}/machines?sort=oee_asc`
```json
{
  "machines": [
    {
      "id": "uuid-mach-1",
      "name": "CNC-104",
      "oee": 45.2,
      "target": 80.0,
      "status": "critical"
    }
  ]
}
```

## 6. Machine Detail

### `GET /api/v1/machines/{machineId}`
```json
{
  "id": "CNC-104",
  "status": "breakdown",
  "statusDurationStr": "1h 45m",
  "operatorName": "John Doe",
  "isQRScanEntry": true,
  "kpis": {
    "oee": 45.2,
    "availability": 50.0,
    "performance": 90.0
  },
  "activeFault": {
    "id": "fault-991",
    "reason": "Motor Fault Detected",
    "isAcknowledged": false
  }
}
```

### `GET /api/v1/machines/{machineId}/timeline`
Returns the historical status block events for the Timeline Chart.
```json
{
  "events": [
    {
      "status": "running",
      "startTime": "2026-06-09T08:00:00Z",
      "endTime": "2026-06-09T10:15:00Z"
    },
    {
      "status": "breakdown",
      "startTime": "2026-06-09T10:15:00Z",
      "endTime": null
    }
  ]
}
```

## WebSocket / Live-Update Requirements
For `NOW` mode, the client will require a persistent connection (e.g., SignalR, WebSockets, or Server-Sent Events).
Instead of pushing full JSON payloads, the WebSocket should push lightweight, targeted event diffs:

**Event: `MACHINE_STATUS_CHANGED`**
```json
{
  "machineId": "uuid-mach-1",
  "newStatus": "running",
  "timestamp": "2026-06-09T11:45:00Z"
}
```
**Client Action:** The repository intercepts this event and locally increments the `statusAggregate.running` count while decrementing the previous state count, instantly updating the `StatusSummaryStrip` without requiring a full HTTP refresh.
