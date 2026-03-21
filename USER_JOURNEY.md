# ZyraTech Hub — User Journey Document
### *Prepared for Backend Team — March 5, 2026*

---

## What Is This Document?

This document walks through every type of person who uses the ZyraTech Hub platform and describes exactly what they experience — from the moment they land on the site to the moment they complete their goal. It is written so that anyone reading it, technical or not, can understand the full picture of what we are building and why.

There are six types of users on this platform:

1. **The Public Visitor** — Someone browsing the website
2. **The Student** — Someone who wants to enrol in a training course and pay for it
3. **The Job Applicant** — Someone who wants to apply for a job at ZyraTech
4. **The Partner** — An organisation or individual who wants to formally partner with ZyraTech
5. **The Admin** — A staff member managing a specific area of the platform
6. **The Super Admin** — The person with complete control over everything

---
---

## USER 1 — The Public Visitor

**Who they are:** Anyone who finds the ZyraTech Hub website — a student researching opportunities, a professional curious about what we do, a parent looking for training programs for their child, or a journalist researching the company. They have no account and are not logged in.

**Their goal:** To learn about ZyraTech Hub and decide whether to take any further action.

---

### Landing on the Homepage

When a visitor lands on the homepage, the first thing they see is a rotating hero banner — a visual introduction to what ZyraTech stands for. Below that, they scroll through the services ZyraTech offers, a section explaining why ZyraTech is the right choice, and live impact numbers showing how many students have been trained, how many partnerships have been formed, and other key milestones. Further down, they see testimonials from real students and partners.

Every single section on this page is powered by live data from the database. Nothing is hardcoded. That means the admin team can update any of it at any time from the admin panel and visitors will immediately see the updated content.

At any point on the site, visitors can subscribe to the ZyraTech newsletter by entering their email address in a subscription box. The platform records which page they signed up from — so the team can understand what content drives the most interest.

---

### Browsing the About Page

The About page tells the full company story. The visitor reads the mission statement, the company history presented as a timeline, major milestones and achievements, and a "Why Ghana" section that explains ZyraTech's local context and significance. Just like the homepage, all of this content is managed live by the admin team.

---

### Browsing the Training Programs

The visitor navigates to the Training section to see what courses are available. They can browse all courses at once or filter by level — Basic, Intermediate, Advanced, Professional, or Internship. Each course card shows the title, duration, price, level, and a short description.

The visitor can click any course to open the full detail page where they read everything: the full course description, the curriculum broken down week by week, who the instructors are, what tools and software are used, what prerequisites are needed before joining, and what they will be able to do by the end.

At this point the visitor is still just reading. Nothing is required of them yet.

---

### Browsing the Blog

The visitor reads articles and news published by the ZyraTech team. They can filter articles by category to find topics they care about. When they open an article, they see the full written content. The platform quietly and automatically records the view to help the content team understand which topics resonate with readers. At the bottom of each article, related posts are shown to encourage continued reading.

---

### Browsing the Jobs Page

The visitor checks whether ZyraTech has any open positions they might be interested in. They can filter jobs by employment type (full-time, part-time, contract, internship, national service), by department (technical, education, operations), or by location. Each job listing links to a full detail page that shows the job responsibilities, required qualifications, perks, salary information, and the application deadline.

---

### Browsing Other Pages

- **Projects** — The visitor sees the projects ZyraTech has completed or is currently working on. Each project has a description, the technologies used, team details, and images. The projects page has its own full-screen layout separate from the rest of the site.

- **Gallery** — Photo albums organised by event or category. Visitors can open any album to browse all the photos inside.

- **FAQ** — Common questions and answers organised by topic (Training, Partnerships, General, etc.). Visitors can mark a question as helpful, which gives the team data on which answers are most useful.

- **Impact** — Live numbers showing ZyraTech's real-world impact alongside written success stories from students and partners.

- **Partnership Page** — Information about ZyraTech's existing partners and what makes the partnership programme valuable. Visitors see logos of current partners and the organisation's impact stats.

- **Our Services** — A detailed breakdown of what ZyraTech offers.

- **Work With Us** — Explains how the hiring process works, how intercultural collaboration is done, and how projects with ZyraTech are set up.

- **Quality Assurance** — Explains ZyraTech's standards, processes, and the tools they use to maintain quality.

- **Collaboration Models** — Explains the different ways organisations and individuals can collaborate with ZyraTech.

---

### Using the Contact Form

If the visitor wants to reach ZyraTech, they fill in the contact form with their name, email, optional phone number, the type of inquiry (partnership, collaboration, general, support, or media press), and their message. When they submit, the message lands directly in the admin team's inbox inside the platform, ready to be read and responded to.

---
---

## USER 2 — The Student (Course Enrolment & Payment)

**Who they are:** Someone who has decided they want to join a ZyraTech training programme. They have seen the course details and are ready to commit.

**Their goal:** To successfully enrol in a course and, where required, pay for it so their spot is confirmed.

---

### Finding the Right Course

The student starts on the Training page and browses the available courses. They might filter by level or category to narrow things down. They open the course detail page and read through everything — what they will learn, who teaches it, what tools they will use, how long it takes, and how much it costs. Once they are sure, they are ready to apply.

---

### Submitting an Application

The student clicks "Apply Now" on the course detail page. They are taken to an application form where they fill in their personal details and any other information the course requires. When they submit the form, their application is created in the system.

- If the course is **paid**, the system marks their spot as pending payment and moves them to the payment step.
- If the course is **free**, the application is processed directly and they see a confirmation page.

---

### Going Through Payment (For Paid Courses)

After submitting their application, the student is taken to a payment summary page showing the course name and the exact amount they need to pay. They click to proceed and are redirected to **Paystack** — Ghana's major payment processing platform — where they complete their payment using a card or mobile money.

Once the student pays on Paystack's end, Paystack automatically and instantly notifies the ZyraTech backend in the background. The backend validates that the payment is legitimate and for the correct amount, then marks the student's enrolment as paid and active. The student is then redirected back to the ZyraTech website where they see a payment confirmation screen.

If the payment fails for any reason, the student is taken to a payment failed page where they can try again.

---

### After Enrolment

The student lands on a success page confirming their enrolment is complete and telling them what happens next. They may also receive a confirmation email. The admin team can see their enrolment record in the system from this point forward.

---
---

## USER 3 — The Job Applicant

**Who they are:** Someone who wants to work at ZyraTech Hub — whether as a full-time employee, part-time staff, contractor, intern, or national service person.

**Their goal:** To find a suitable position and submit a complete application.

---

### Finding a Job

The applicant visits the Jobs page and browses the open listings. They filter by type, department, or location to find roles that fit them. Each listing shows the job title, type, and a short description. They click into a job to read everything: what the role involves, what qualifications are needed, the perks, the salary range if shown, and the application deadline.

---

### Applying for the Job

When ready, the applicant clicks "Apply". This takes them to a clean, focused application page. They fill in:

- Their personal information (name, email, phone number, location)
- Their LinkedIn profile and/or portfolio (optional)
- Their work experience — they can add multiple previous roles
- Their education background
- Their key skills
- When they are available to start
- Their expected salary (optional)
- How they heard about the role
- Their **resume**, uploaded as a PDF or Word document
- A **cover letter**, either typed directly or uploaded as a file

When they hit submit, their application goes straight into the admin team's jobs management system with a status of "New" — meaning it has not yet been reviewed by anyone.

---
---

## USER 4 — The Partnership Applicant

**Who they are:** A company, academic institution, government body, NGO, or technology firm that wants to formally establish a partnership with ZyraTech Hub.

**Their goal:** To officially register their interest and start the partnership process.

---

### Learning About Partnerships

The applicant visits the Partnership page. They read about what ZyraTech looks for in partners, the benefits of partnering, who ZyraTech already works with, and the organisation's impact numbers. This page is designed to build confidence and give potential partners everything they need to make a decision.

---

### Submitting a Partnership Application

When ready, the applicant clicks to apply. They fill in a form with details about their organisation — the company name, logo, website, industry, and details about their primary contact person (name, email, phone, and their role in the organisation). They also describe the kind of partnership they are proposing and select what type of organisation they are.

The submitted application lands in the admin team's partnerships section for review and follow-up.

---
---

## USER 5 — The Admin (Department-Restricted Staff Member)

**Who they are:** A ZyraTech team member who has been given an admin account by the Super Admin. Each admin is assigned to one department — for example, the Blog, the Jobs listings, the Gallery, or Enrollments. They can only see and manage what they are assigned to — they cannot access other departments.

**Their goal:** To keep their department's content accurate, up to date, and well managed.

---

### First Time Logging In — The Onboarding Process

When a new admin account is created by the Super Admin, the new admin receives a welcome email with their email address and a temporary password. Here is exactly what happens when they log in for the first time:

**Step 1 — Login with the temporary password.**
The admin goes to the ZyraTech admin login page at `/admin/login` and enters their email and the temporary password from the welcome email.

**Step 2 — Set a proper password.**
Because this is a temporary password, the platform immediately asks them to set a permanent, secure one before they can do anything else. The password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character, and must be different from the temporary one. Once they save the new password, this step is complete.

**Step 3 — Submit identity verification documents (KYC).**
After setting a password, the platform asks the admin to verify their identity. This is a one-time requirement before they get full access. They must upload two documents:
- A government-issued photo ID (Ghana Card, Passport, Voter ID, or Driver's License)
- A proof of address document (a utility bill, bank statement, or official letter — something that shows their name and address)

Once uploaded, the documents go to the Super Admin for review. The new admin sees a message saying their documents are under review. While waiting, they can still access their assigned dashboard area in a limited way. Once the Super Admin approves their documents, they have full access. If the documents are rejected, the admin is told exactly why and asked to upload again.

---

### Day-to-Day Work — Managing Their Department

Once fully onboarded, the admin logs in and goes straight to their section. Depending on their assignment, here is what they do:

**Blog Admin** — Writes and publishes articles on the ZyraTech blog. They create new posts (title, body content, featured image, category, tags), save them as drafts to finish later, or publish them immediately for public viewing. They can also edit or remove existing posts.

**Training Admin** — Manages everything in the training catalogue. They create new courses with all the details (full description, curriculum, instructors, pricing, prerequisites, and outcomes), publish and unpublish them, and review the list of students enrolled in each course. They can open individual student application records to see the details.

**Jobs Admin** — Manages job listings and works through incoming applications. They create new job postings with all the relevant information, open and close listings as needed, and review every application that comes in. For each application, they move it through a structured review pipeline: New → Reviewing → Shortlisted → Interview → Offered → Hired or Rejected. They can add internal notes to any application and view the applicant's uploaded resume directly from the record.

**Gallery Admin** — Manages the photo gallery. They create albums with a name and category, upload photos into those albums, add captions to images, and organise the order in which photos appear. They can also edit or delete albums and individual images.

**FAQ Admin** — Maintains the FAQ section. They write questions and answers, assign them to a category, and choose whether to publish them immediately or save as a draft. They can also edit and delete existing FAQs.

**Testimonials Admin** — Manages testimonials from students, alumni, partners, and others. They add new testimonials, mark the best ones as "featured" so they appear prominently on the public website, and manage the full list.

**Enrollments Admin** — Manages training enrolment records. They can see who is enrolled in which course, manually create an enrolment when needed for a special case, and update the status of any enrolment (pending, active, completed, or cancelled).

**Payments Admin** — Views all payment transaction records. They can see who paid, how much, which course it was for, and when it happened. They can also view and download invoices. They cannot, however, issue refunds — that is exclusively the Super Admin's authority.

**Messages Admin** — Manages the contact form inbox. Every message submitted through the public contact form lands here. The admin reads messages, marks them as read, stars the important ones so they stand out, replies to senders directly through the platform, archives old messages, and deletes what is no longer needed. They can also take bulk actions — for example, marking 20 messages as read at once.

**Partnerships Admin** — Reviews and manages partnership records. They add new partners, update partner details and status, mark partners as "featured" so they appear prominently on the public partnership page, and remove partnerships that are no longer active.

**Impact Admin** — Manages the live impact metric numbers visible across the site (e.g. "500+ students trained") and the written success stories shown on the Impact page. They update figures as milestones are reached and add, edit, or remove stories.

**Newsletter Admin** — Manages the newsletter subscriber list. They can see how many people have signed up, where they signed up from (which page), and the overall growth trend. They can also compose and send newsletters to all subscribers or a specific segment. Past campaigns are stored for reference.

**Projects Admin** — Manages the projects showcase. They add new projects with descriptions, images, team details, and the technologies used.

---

### Managing Their Own Profile

Regardless of department, every admin can manage their own personal profile from the Profile page. They can update their display name, profile picture, phone number, job title, and short bio. They can also change their own password at any time, choose which notifications they want to receive (email alerts, security alerts, etc.), and view all active login sessions across their devices — and revoke any session on a device they no longer use or do not recognise.

---
---

## USER 6 — The Super Admin

**Who they are:** The person with complete authority over the entire ZyraTech Hub platform. They have access to every department, every setting, and every piece of data on the platform. There is typically only one Super Admin, or a very small trusted number.

**Their goal:** To ensure the platform runs smoothly, manage all staff accounts, control sensitive configurations, and have full visibility into everything happening across the platform.

---

### Everything a Regular Admin Can Do — Plus More

The Super Admin can do everything that any department admin can do. They are not restricted to any single area — they can access and manage the blog, training, jobs, gallery, projects, FAQs, testimonials, messages, enrollments, payments, partnerships, impact, newsletter, and all content pages simultaneously.

On top of that, they have the following exclusive capabilities:

---

### Creating and Managing Admin Accounts

The Super Admin is the only person who can create new admin accounts. When creating one, they set the new admin's name, email, phone number, and most importantly — their assigned department, which determines exactly what they can access. The platform automatically generates a temporary password and sends a welcome email to the new admin.

The Super Admin can also deactivate accounts at any time (for example, when a staff member leaves the organisation). Deactivation revokes all access immediately but does not delete the account or its history — the full audit trail is preserved. Accounts can also be reactivated if needed. The Super Admin can change an admin's assigned department or update their role at any point.

**Reviewing KYC Documents** — When a new admin submits their identity documents as part of onboarding, the Super Admin reviews them. They look at the uploaded government ID and proof of address, and either approve them (giving the admin full dashboard access) or reject them with a written reason explaining exactly what needs to be corrected so the admin can re-upload the right documents.

---

### Managing All Website Content (CMS)

The Super Admin can edit the content of every marketing and informational page on the public website through a dedicated set of content management screens in the admin panel. This means the team can update the website without touching any code. Pages that can be managed include:

- The **homepage hero slider** — adding new slides, editing the text and images, reordering slides, removing old ones
- The **Our Services section** — adding, editing, or removing service cards
- The **Why Choose Us / Benefits section** — managing the reasons listed for choosing ZyraTech
- The **About page** — the hero, mission statement, vision, Why Ghana section, company milestones, and the full company history timeline
- The **Partnership page** — the hero text, the "Why Partner With Us" section, and the success stories shown on that page
- The **Work With Us page** — the process steps for how projects are set up, how intercultural collaboration works, and how hiring is done
- The **Quality Assurance page** — all sections explaining ZyraTech's standards and processes
- The **Collaboration Models page** — the different models described for working with ZyraTech

---

### Processing Refunds

When a student who has paid for a course requests a refund, only the Super Admin can process it. They find the payment transaction in the Payments section, open the record, and initiate the refund. The refund is sent back through Paystack, and the transaction is automatically updated to reflect the refunded status.

---

### Analytics and Revenue

The Super Admin has an extended dashboard view that includes revenue data — total income earned, how it breaks down by course, and growth trends over selected time periods. Regular admins do not see any revenue information.

There is also a dedicated Analytics page where the Super Admin can explore deeper data:
- How student enrolments are trending over time
- Revenue performance across different periods
- Which courses are performing best
- How the admin user base is growing
- Website traffic and visitor data

All of this can be filtered by custom time periods (last 7 days, 30 days, 90 days, a full year, or a completely custom range).

---

### Reports

The Super Admin can create and schedule automated reports. For example, they can set up a monthly enrolment summary report that generates automatically on the first Monday of every month and is delivered as a PDF to a list of email recipients. They can configure what data goes into any report, how often it runs, and in what format it is exported (PDF, Excel, or CSV). They can also run any report on demand instantly and download it.

---

### Site Settings

The Super Admin controls all system-wide settings for the platform, organised into categories:

- **Branding** — The official site name, logo, favicon (the small icon that appears in browser tabs), and brand colours
- **Contact Information** — The official contact email, phone number, WhatsApp number, physical address, and the HR contact person whose details appear to candidates on the site
- **Social Media** — The links to ZyraTech's LinkedIn, Twitter/X, Instagram, Facebook, and YouTube pages
- **Payment Keys** — The Paystack and Stripe API credentials that power the payment system. These are highly sensitive and only accessible to the Super Admin
- **Email / SMTP** — The credentials for the email server that sends all automated emails on behalf of the platform (welcome emails, password reset links, enrolment confirmations, contact form auto-replies, etc.)
- **SEO** — The site's search engine meta title, description, keywords, and official URL
- **Analytics Tracking** — The Google Analytics and Meta Pixel IDs used to track visitor behaviour
- **General** — Timezone, business hours displayed publicly, maintenance mode (which takes the public site offline temporarily while work is being done), and the copyright notice

---

### Activity Logs — The Complete Audit Trail

The Super Admin can view a full chronological log of every significant action taken on the platform. Every login, every content edit, every payment received, every account created or deactivated, every settings change — all of it is recorded with who did it, when, from what device and location.

This is the platform's accountability record. The Super Admin can filter the log by user, type of action, date range, and severity level (info, success, warning, error) to investigate anything that needs attention. Old logs can be cleared when they are no longer needed.

---

### System Health Monitoring

The Super Admin's dashboard includes a live system health panel that gives a real-time snapshot of how the platform is performing:

- **Server load** — how hard the servers are working at any given moment
- **Uptime** — the percentage of time the platform has been available (the target is 99.9%)
- **Storage usage** — how much of the allocated storage is being used
- **API latency** — how quickly the backend is responding to requests
- **Error rate** — what percentage of requests are resulting in errors
- **Active sessions** — how many users are logged in right now across the platform
- **Security alerts** — any flagged suspicious activity

This gives the Super Admin immediate visibility if something is wrong so it can be addressed quickly.

---
---

## How Login and Sessions Work (For All Admin Users)

When any admin logs in, the platform gives them two things invisibly: a short-lived **access key** (valid for 15 minutes) and a longer-lived **refresh key** (valid for 7 days). Every request the admin makes to the platform is authenticated using the access key.

When the access key expires after 15 minutes, the frontend automatically and silently gets a new one in the background using the refresh key — the admin does not need to log in again or do anything. This happens seamlessly.

When the refresh key also expires after 7 days of inactivity, the admin is logged out and taken back to the login page to start a fresh session.

When an admin clicks "Logout", both keys are immediately invalidated on the server, so the session is completely closed and cannot be resumed from any device.

---

*Document prepared from the ZyraTech Hub frontend codebase and Backend API Documentation v2.1*
*Date: March 5, 2026*
