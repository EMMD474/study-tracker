# Median Stratum — Dashboard Layout Specification

## Overview

The dashboard is the primary post-login interface of **Median Stratum**, designed as a high-focus academic command center. It emphasizes clarity, progress visibility, and structured task execution.

The layout follows a **12-column responsive grid system** with clear hierarchy and separation of concerns.

---

## Design Philosophy

* **Focus-first UX**: minimize distractions, emphasize today’s actions
* **Progress visibility**: streaks, stats, and completion metrics are always visible
* **Premium aesthetic**: dark UI with subtle gold accents
* **Modular structure**: all sections are independent, reusable components

---

## Grid Layout Structure

### Desktop Layout (lg and above)

```
--------------------------------------------------
| Welcome / Stats Summary (12 cols)              |
--------------------------------------------------
| Today’s Plan (8 cols) | Quick Actions (4 cols) |
--------------------------------------------------
| Progress Analytics (8 cols) | Streak (4 cols)  |
--------------------------------------------------
| Upcoming Tasks / Sessions (12 cols)            |
--------------------------------------------------
```

### Mobile Layout

```
--------------------------------------------------
| Welcome Section                                |
--------------------------------------------------
| Stats Summary                                 |
--------------------------------------------------
| Today’s Plan                                  |
--------------------------------------------------
| Quick Actions                                 |
--------------------------------------------------
| Progress Analytics                            |
--------------------------------------------------
| Streak                                        |
--------------------------------------------------
| Upcoming Tasks                                |
--------------------------------------------------
```

---

## Section Breakdown

### 1. Welcome + Stats Summary (Hero Section)

**Purpose:** Immediate orientation + motivation

**Includes:**

* Greeting (time-based)
* User name
* Date
* Key metrics:

  * Study Time Today
  * Tasks Completed
  * Current Streak
  * Upcoming Sessions

**Design notes:**

* Full width card
* Subtle gold accents
* Soft elevation (shadow + border)

---

### 2. Today’s Plan (Primary Focus Area)

**Purpose:** Core daily execution tracking

**Includes:**

* Timeline of study sessions
* Each session contains:

  * Course name
  * Time range
  * Duration
  * Status (Pending / Active / Completed)
* Highlight current session

**UX behavior:**

* One-click “Start Session”
* Progress indicator per session

---

### 3. Quick Actions Panel

**Purpose:** Fast access to key actions

**Includes:**

* Add Study Session
* Add Course
* Open Timetable
* Future: Focus Mode

**Design notes:**

* Icon-based buttons
* Minimal text
* Hover glow effects (gold accent)

---

### 4. Progress Analytics

**Purpose:** Performance visualization

**Includes:**

* Weekly study hours chart
* Subject distribution (pie/donut chart)
* Completion rate indicator

**Constraint:**

* Max 2–3 charts to avoid clutter

---

### 5. Streak Component

**Purpose:** Behavioral reinforcement (consistency tracking)

**Includes:**

* Current streak (primary number)
* Longest streak
* 7-day activity heatmap

**UX behavior:**

* Highlight current day
* Visual reward feedback for consistency

---

### 6. Upcoming Tasks / Sessions

**Purpose:** Forward visibility

**Includes:**

* Upcoming study sessions
* Deadlines
* Exams (future expansion)

**Design notes:**

* Simple list format
* Muted styling (secondary importance)

---

## Visual System

### Color Palette

* Background: `#0D0D0D`
* Cards: `#121212`
* Primary Gold: `#D4AF37`
* Accent Gold: `#FFD700`
* Text Primary: `#EAEAEA`
* Text Muted: `#888888`

---

### Component Styling Rules

* Border radius: `rounded-2xl`
* Shadows: soft, minimal
* Borders: low-opacity gold accents
* Animations: subtle (200–300ms transitions)

---

## Component Architecture Suggestion

```
Dashboard/
  ├── WelcomeBanner
  ├── StatsGrid
  ├── TodayPlan
  ├── QuickActions
  ├── ProgressAnalytics
  ├── StreakCard
  └── UpcomingTasks
```

---

## Key UX Principles

1. **Hierarchy first** → Today’s Plan is always dominant
2. **Visibility of progress** → streaks + stats always present
3. **Minimal cognitive load** → avoid dense dashboards
4. **Reward feedback loops** → streaks and completion states reinforce usage

---

## Future Enhancements

* Focus Mode (fullscreen study session)
* AI study scheduling assistant
* Adaptive timetable optimization
* Notification system for study reminders

---

## Summary

The Median Stratum dashboard is designed as a **structured academic command center**, balancing productivity tracking with motivational reinforcement while maintaining a premium, minimal interfac
