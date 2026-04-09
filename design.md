# Study Tracker - Project Design & Plan

## Overview
Study Tracker is a comprehensive web application designed to help users plan, organize, and track their daily study habits. The platform allows users to create structured study plans based on their personal goals, course workload, and priorities, while additionally providing notifications and resource management.

## Core Features & Roadmap

### Phase 1: Authentication & Core Setup
- **User Authentication**: Account creation, login, and secure session management.
- **Database Schema**: Setup for users, courses, study sessions, and daily logs.

### Phase 2: Study Plan Generation
- **Course Management**: Users can add multiple courses/subjects they are studying.
- **Time Allocation**: Define how much time needs to be allocated to each subject per day/week.
- **Priority System**: 
  - Assign priorities (e.g., High, Medium, Low) to courses.
  - The scheduling algorithm will ensure higher priority courses appear more frequently or receive more prime study slots in the generated plan.

### Phase 3: Daily Session Logging & Tracking
- **Daily Dashboard**: View the study schedule for the current day.
- **Session Logging**: Users can log sessions as "completed", effectively marking a course as done for that day.
- **Progress Tracking**: Store completed logs in the database to track streaks, overall progress, and study habits over time.

### Phase 4: Email Notifications & Alerts (Future Integration)
- **Daily Agendas**: Send an email early in the day detailing what needs to be covered.
- **Smart Reminders**:
  - Automatically check the status of daily tasks.
  - If a scheduled study session is not marked as completed by 22:00 (10:00 PM), automatically trigger an email reminder (giving the user 2 hours before midnight).
- **Grace Period / Expiration**:
  - If a task is not completed by midnight (24 hours), it is permanently marked as "not done" for that day.

### Phase 5: Resource Management (Future Integration)
- **Course Material Uploads**: Allow users to upload files (e.g., PDFs, documents) or link resources associated with a specific course.
- **Centralized Access**: Users can view and access their course material directly from their dashboard while studying for that particular course.

## Architecture Guidelines
- **Frontend**: Next.js (React) - App Router
- **Backend**: Next.js Server Actions / API Routes
- **Database**: To be decided (PostgreSQL/MongoDB preferable)
- **Styling**: Tailwind CSS / Custom CSS as required
- **Authentication**: To be decided (NextAuth.js, Supabase, or Firebase)
- **Email Service**: Resend or SendGrid (for phase 4)

## Data Models (Draft)

### User
- `id`
- `email`
- `passwordHash` / `providerId`
- `createdAt`

### Course
- `id`
- `userId`
- `name`
- `priority` (integer or enum)
- `allocatedTime` (minutes/hours)

### StudyTask (Daily Log)
- `id`
- `courseId`
- `date`
- `status` (pending, completed, missed)
- `completedAt`

### Material
- `id`
- `courseId`
- `fileUrl`
- `fileName`
- `uploadedAt`

---

## Dashboard — UI design (look & layout)

This section turns **Phase 3** (“Daily Dashboard”, session logging, progress) into a concrete screen layout. It matches the **Median Stratum** look: dark background (`#0a0a0a`), card surfaces (`#0f0f0f`), gold primary (`#c8a96e`), muted text (`#7a7060`), thin gold-tinted borders.

### Page structure (top → bottom)

1. **Page header (not the global nav)**  
   - **Title**: “Today” or “Dashboard” with the **full calendar date** (e.g. “Thursday, April 9, 2026”) as a subtitle in muted color.  
   - **Optional one-liner**: planned minutes vs. completed minutes for today (pulls from `StudyTask` + `Course.allocatedTime` when wired up).

2. **Summary row (3 compact stat cards)**  
   Small equal-width cards in one row on desktop; stacked on mobile.  
   - **Tasks today**: count of `StudyTask` rows for **today’s date** (all statuses).  
   - **Completed**: count with `status === COMPLETED`.  
   - **Still open**: `PENDING` (and optionally surface `MISSED` from past days in copy or a separate line).  
   Use numbers in gold or white; labels in muted foreground.

3. **Primary block: “Today’s study plan”**  
   Main card spanning full content width. This is the core of the dashboard.  
   - **List** of today’s `StudyTask` items (each row/card shows):  
     - **Course name** (`Course.name`)  
     - **Priority** badge: `HIGH` / `MEDIUM` / `LOW` (visual weight: HIGH slightly brighter border or label)  
     - **Planned time**: `Course.allocatedTime` formatted as “45 min”  
     - **Status**: `PENDING` | `COMPLETED` | `MISSED` with distinct treatment (e.g. completed = subtle green check / accent; missed = dimmed + label)  
     - **Primary action**: for `PENDING` → “Mark complete” (sets completed + `completedAt`); for `COMPLETED` → optional “Undo” or read-only state  
   - **Empty state**: if no tasks for today — short message + CTA button “Go to Courses” (or “Generate plan” when that flow exists).

4. **Secondary column or second row: “This week” (progress)**  
   Card with lightweight charts or lists (implement when data exists):  
   - Tasks completed per day (last 7 days), or  
   - Simple **streak** (“3 days in a row with all tasks done”) from historical `StudyTask`.  
   Keeps the dashboard from being only a single list.

5. **Footer strip: quick actions**  
   Horizontal group of text buttons or ghost buttons:  
   - **Manage courses** → `/courses`  
   - **Timetable** → `/timetable`  
   - Later: **Materials** (Phase 5) — “Recent files” teaser: 2–3 `Material.fileName` links grouped by course.

### Visual & UX notes

- **Density**: Prefer clear rows with padding over cramming; align with existing `TopNav` (sticky bar already sets the tone).  
- **Focus**: The eye should land on **today’s task list** first; stats above are supporting.  
- **Responsive**: Summary row stacks to one column on small screens; task list stays one column with full-width tap targets on mobile.  
- **Accessibility**: Status must not rely on color alone (icon or text for Completed / Missed / Pending).

### Data mapping (for implementation)

| UI area        | Source |
|----------------|--------|
| Today’s tasks  | `StudyTask` where `date` is start-of-day “today” for the user, join `Course` |
| Planned time   | `Course.allocatedTime` per task’s course |
| Priority chip  | `Course.priority` |
| Complete action| Update `StudyTask.status`, `completedAt` |
| Week progress  | Aggregate `StudyTask` over date range for `userId` (via courses) |

### Out of scope on v1 dashboard (but reserved)

- Email reminders (Phase 4) — no UI block; maybe a single “Notification settings” link later.  
- Full materials browser — teaser row only until Phase 5 is built.
