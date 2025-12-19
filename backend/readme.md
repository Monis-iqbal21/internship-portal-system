# Internship Portal System – Backend Documentation

## 1. Overview

This backend powers an Internship Management Platform where:

### Students can:
- Sign up and log in
- Apply for internships
- Receive tasks after approval
- Submit task work
- Complete internships and get certification status

### Admins can:
- Approve or reject applications
- Assign tasks automatically
- Monitor student submissions
- Track internship completion
- Manage internship history

### The backend is built using:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Role-Based Access Control

## 2. Core Design Philosophy

### Separation of Responsibilities

| Layer | Responsibility |
|-------|---|
| Authentication | Identity verification |
| Authorization | Role-based access |
| Business Logic | Internship lifecycle |
| Data Persistence | MongoDB schemas |
| Frontend | UI + user experience |

- Authentication logic is intentionally kept minimal
- Internship logic is handled after login, inside dashboards and APIs.

## 3. User Roles

There are two system roles:

### 3.1 Student
- Default role on signup
- Can apply for internships
- Can submit tasks
- Can complete internships

### 3.2 Admin
- Reviews applications
- Approves/rejects students
- Assigns tasks automatically
- Views submissions
- Tracks completion status

## 4. Authentication Flow

### 4.1 Signup (Register)

**Endpoint**
```
POST /api/auth/register
```

**What happens**

User submits:
- name
- email
- password

Backend:
- Validates input
- Hashes password
- Creates user with:
    - role = student
    - applicationStatus = not-applied
    - activeInternship = false
- JWT token is generated
- Token + user data returned

### 4.2 Login

**Endpoint**
```
POST /api/auth/login
```

**What happens**

- User submits email + password
- Backend verifies credentials
- JWT token is issued
- Frontend stores token
- Redirect is done based on role only

| Role | Redirect |
|------|----------|
| Admin | /admin/dashboard |
| Student | /student/dashboard |

No internship logic is evaluated at login time.

## 5. Authorization & Middleware

### 5.1 JWT Protection Middleware (protect)
- Extracts token from Authorization header
- Verifies token
- Attaches req.user
- Used on all protected routes.

### 5.2 Role-Based Middleware
- **adminOnly**: Ensures user role === admin
- **studentOnly**: Ensures user role === student

This keeps routes secure and predictable.

## 6. Data Models (Schemas)

### 6.1 Domain Schema

Represents an internship domain (e.g., Web Development).

```
Domain {
        name
        durationInMonths
        defaultTasks[]
}
```

**Purpose**
- Central source of internship configuration
- Defines:
    - Duration
    - Tasks to auto-assign

### 6.2 User Schema

Central entity of the system.

**Key fields:**
- **Authentication:**
    - name
    - email
    - password
    - role
- **Application state:**
    - applicationStatus
    - internshipApproved
- **Internship tracking:**
    - activeInternship
    - internshipStartDate
    - internshipEndDate
    - domain
- **Tasks:**
    - assignedTasks[]
- **Internship history:**
    - pastInternships[]

**Important Design Decision**
- pastInternships stores domain name directly
- This prevents historical data loss if a domain is deleted later.

### 6.3 Task Schema

Represents tasks assigned to students.

```
Task {
        title
        description
        assignedTo
        domain
        status
}
```

Tasks are:
- Created automatically
- Assigned on approval
- Tracked individually

### 6.4 TaskSubmission Schema

Tracks student submissions.

```
TaskSubmission {
        student
        task
        submissionLink
        status
}
```

**Important Rule**
- One student can submit one submission per task
- Enforced using compound index

### 6.5 Project Schema (Final Project)

Used for final internship submission.

```
Project {
        projectName
        repoLink
        deployLink
        submittedBy
}
```

## 7. Internship Application Flow

### Step 1: Student Applies
- Student selects domain
- Application status becomes pending

### Step 2: Admin Reviews Application

**Endpoint**
```
PUT /api/admin/applications/:userId/approve
```

**What happens**

Backend verifies:
- applicationStatus === pending
- activeInternship === false

Domain is fetched

Internship dates calculated

User state updated:
- applicationStatus → approved
- activeInternship → true
- internshipApproved → true

Tasks are auto-created from domain defaults

pastInternships entry is added with:
- domainName
- startDate
- status = pending

## 8. Task Assignment Logic

- Tasks come from Domain.defaultTasks
- Created dynamically on approval
- Assigned to:
    - specific user
    - specific domain
- Stored in:
    - Task collection
    - user.assignedTasks[]

## 9. Task Submission Flow

- Student submits task link
- Entry is created in TaskSubmission
- Status becomes submitted
- Admin can view:
    - all submissions
    - filter by student email or name

## 10. Admin Submission Monitoring

Admins can:
- View all submissions
- Filter by:
    - student email
    - student name
- Review task progress per student

This enables:
- Fair evaluation
- Performance tracking

## 11. Internship Completion Automation (Step 6)

### Objective

Automatically determine when an internship has ended and whether the student has successfully completed it, without requiring manual admin intervention.

This logic ensures:
- Accuracy
- Scalability
- Consistency across all students

## 12. Internship Completion Criteria

An internship is considered completed when all of the following conditions are met:

- Current date ≥ internshipEndDate
- Student has:
    - Submitted all assigned tasks
    - (Optional extension) Submitted final project
- Student is currently:
    - activeInternship === true

## 13. Completion Status Outcomes

After evaluation, an internship can result in:

| Outcome | Reason |
|---------|--------|
| Passed | All required tasks completed |
| Failed | Internship time expired but tasks incomplete |

This outcome is stored in pastInternships[].

## 14. Automated Completion Strategy

### Why Automation?

Manual checks:
- Do not scale
- Are error-prone
- Create admin overhead

### Solution Used

A scheduled background process (Cron Job or server scheduler) that:
- Runs daily (or hourly)
- Checks all active internships
- Finalizes internships automatically

## 15. Automated Internship Completion Flow

### Step-by-Step Execution

- Scheduler runs
- Fetch users where:
    - activeInternship === true
    - internshipEndDate <= today
- For each user:
    - Count assigned tasks
    - Count submitted tasks
    - Compare results
    - Determine completion result
    - Update user record
    - Archive internship into history

## 16. Data Transitions on Completion

### Before Completion
- activeInternship = true
- internshipApproved = true
- pastInternships[].status = pending

### After Completion
- activeInternship = false
- internshipApproved = false
- applicationStatus = not-applied

## 17. Updating pastInternships

Each completed internship entry contains:

| Field | Description |
|-------|-------------|
| domainName | Stored as string (safe from deletion) |
| certificationStatus | passed / failed |
| startDate | Internship start |
| endDate | Internship end |

Domain reference is intentionally avoided to preserve historical data.

## 18. Certification Status Logic

### User-Level Certification

User-level certificationStatus reflects latest internship only.

| Condition | Status |
|-----------|--------|
| Passed internship | certified |
| Failed internship | failed |

## 19. Task Cleanup Strategy

After internship completion:
- Tasks are not deleted
- Task history remains intact

Allows:
- Audit
- Reporting
- Analytics

## 20. Handling Multiple Internships (Future-Proofing)

The system supports:
- Multiple internships over time
- Same or different domains
- Independent evaluation

Each internship:
- Has its own lifecycle
- Has its own historical record

## 21. Admin Dashboard – Post Completion

Admins can:
- View:
    - Completed internships
    - Failed internships
- Filter by:
    - Domain
    - Student
    - Status

No manual updates required.

## 22. Error Handling Strategy

### Standard Error Pattern

All controllers:
- Catch errors centrally
- Return:
    - HTTP status code
    - Human-readable message
    - Developer message (if needed)

### Common Errors Covered

| Error | Handling |
|-------|----------|
| Duplicate submissions | Mongo index |
| Invalid role access | Middleware |
| Expired internship | Auto-finalization |
| Missing domain | Graceful fallback |

## 23. Security Considerations

### Authentication
- JWT-based
- Token expiry enforced

### Authorization
- Role-based access control
- Route-level protection

### Data Integrity
- Compound indexes
- Referential safety
- Immutable historical records

## 24. API Design Philosophy

### RESTful Structure

| Area | Prefix |
|------|--------|
| Auth | /api/auth |
| Student | /api/student |
| Admin | /api/admin |

Clear separation prevents logic mixing.

## 25. Frontend Integration Expectations

### Frontend responsibilities:
- Token storage
- Role-based redirection
- Conditional UI rendering

### Backend responsibilities:
- Business logic
- Validation
- State transitions

## 26. Why Role-Based Redirection Is Correct

You chose the correct approach:
- Login → redirect by role only
- Internship logic handled after login
- Prevents complex conditional routing

This ensures:
- Clean frontend logic
- Predictable backend state

## 27. System Lifecycle Summary

### Student Lifecycle
- Signup
- Login
- Apply for internship
- Get approved
- Receive tasks
- Submit tasks
- Internship auto-completes
- Certification issued

### Admin Lifecycle
- Login
- Review applications
- Approve students
- Monitor progress
- Review submissions
- See completed internships

## 28. Final Architecture Outcome

This backend is:
- Scalable
- Maintainable
- Automation-driven
- Historically safe
- Role-aware
