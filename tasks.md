# Study Tracker - Actionable Tasks

This document breaks down the project design into actionable development steps, starting from foundational setup to advanced feature integrations.

## Section 1: Core Functionality & Setup

### 1. Project Initialization & Architecture
- [x] Initialize Next.js app with App Router.
- [x] Configure Tailwind CSS and define the general theme/design system (fonts, colors, basic components).
- [ ] Set up the database (e.g., PostgreSQL via Prisma or Drizzle ORM).
- [ ] Implement authentication (e.g., NextAuth.js or Supabase Auth) with registration and login pages.

### 2. Course Management & Planning
- [ ] Create API routes/server actions to Create, Read, Update, and Delete (CRUD) courses.
- [ ] Build the UI for users to add subjects, including fields for name, allocated time, and priority.
- [ ] Implement the scheduling algorithm to generate daily study plans based on the user's allocated time and course priorities.
- [ ] Build the UI to display the generated study plan to the user.

### 3. Daily Logging & Dashboard
- [ ] Build the main user dashboard to display today's scheduled tasks.
- [ ] Implement the feature to mark a study session as "completed".
- [ ] Create API routes to store completed logs in the database.
- [ ] Develop a view for users to see past progress and streaks over the week/month.

---

## Section 2: Advanced Features & Integrations

### 4. Background Jobs & Email Notifications
- [ ] Set up an email service provider (e.g., Resend, SendGrid).
- [ ] Implement a cron job or background worker to send out the "Daily Agenda" emails early in the morning.
- [ ] Implement a scheduled check at **22:00 (10:00 PM)** to verify pending study sessions and send a 2-hour warning email for incomplete tasks.
- [ ] Implement a midnight script (24 hours mark) to automatically update any unresolved study tasks as "not done" or "missed".

### 5. Course Material & Resource Management
- [ ] Set up file storage (e.g., AWS S3, Vercel Blob, Supabase Storage) for handling file uploads.
- [ ] Build the UI for users to upload PDFs, documents, or paste helpful links associated with specific courses.
- [ ] Update the study dashboard so that when a user interacts with a course, they can readily access the uploaded materials.
- [ ] Secure the file access to ensure users can only view their own uploaded materials.
