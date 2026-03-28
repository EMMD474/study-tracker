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
