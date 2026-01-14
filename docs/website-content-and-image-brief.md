# Zyra Tech Hub — Website Content + Documentation + Image Brief (Nano Banana)

## 0) What this document is
This file is the **single source of truth** for:
- **Sitemap / route map** (from `src/App.jsx`)
- **Website copy** (headlines, section text, CTAs)
- **Future features roadmap** (features planned but not fully implemented)
- **Image generation plan** (what images you need + detailed prompts for Nano Banana)

> Status: **v1 draft**. Core routes + key pages are covered. As we continue, we’ll expand copy for all service subpages (education/manufacturing/software/open-labs), donation flows, and project detail pages.

---

## 1) Quick Brand Summary
### Brand name
Use consistently: **Zyra Tech Hub** (or confirm if you want **ZyraTech** everywhere).

### Brand positioning
A dual-impact organization:
- **Talent Development**: education, internships, professional training
- **Delivery**: software, IT networking, manufacturing support, open labs

### Tone
- Professional, clear, confident
- Outcomes-focused (skills, delivery, results)

### Primary CTAs (standard wording)
- **Apply Now**
- **Explore Programs**
- **Request a Quote**
- **Book a Session**
- **Contact Us**

---

## 2) Sitemap / Routes (from `src/App.jsx`)
### Main
- `/` Home
- `/about` About
- `/projects` Projects
- `/contact` Contact
- `/blog` Blog
- `/gallery` Gallery
- `/newsletter` News & Insights
- `/newsletter/article/:id` Article detail
- `/impact` Impact
- `/faq` FAQ
- `/donate` Donate

### Services
- `/services/education` + enrollment/payment pages
- `/services/manufacturing` + booking/quotes/subscriptions pages
- `/services/software` + subpages
- `/services/open-labs/*` (facilities/projects/book-session) + contact

### Training
- `/training` Training landing
- `/training/programs` Programs hub
- `/training/programs/basic`
- `/training/programs/intermediate`
- `/training/programs/advanced`
- `/training/programs/matured`
- `/training/programs/internship`
- `/training/course/:courseId` Course detail

### Admin
- `/admin/login`
- `/admin/dashboard`

---

## 3) Global Copy Blocks (use anywhere)
### Universal short tagline options
- **Build Skills. Deliver Solutions. Create Impact.**
- **Practical training and real-world technology delivery.**
- **From learning to launch — we help talent grow and systems succeed.**

### Universal trust lines
- "Hands-on learning with mentorship and real projects."
- "Professional delivery for schools, SMEs, and communities."
- "Built in Ghana. Ready for the world."

---

# 4) Page-by-page Content

## 4.1 Home (`/`)
Page sections are assembled in `src/pages/public/home/index.jsx`.

### (A) Hero Slider (5 slides)
**Slide 1 — Education & Internship**
- Title: **EDUCATION & INTERNSHIP**
- Body: Practical training in coding, robotics, AI, and IT systems. Bridge the gap between classroom learning and real work through our 3–6 month internship pipeline.
- CTA 1: Apply for Internship
- CTA 2: Read Success Stories

**Slide 2 — Impact Stories**
- Title: **TRANSFORMING LIVES THROUGH TECH**
- Body: Real stories from learners building apps, installing school networks, and delivering solutions for SMEs.
- CTA 1: Explore Stories
- CTA 2: Join Our Program

**Slide 3 — Innovation & Community**
- Title: **INNOVATION & COMMUNITY**
- Body: A passionate team driven by innovation and education—empowering Ghana’s next generation of tech talent.
- CTA 1: Meet Our Team
- CTA 2: Partner With Us

**Slide 4 — IT & Networking Solutions**
- Title: **IT & NETWORKING SOLUTIONS**
- Body: LAN/WAN installation, Wi‑Fi setup, server deployment, and secure digital infrastructure.
- CTA 1: Learn More
- CTA 2: Get Started

**Slide 5 — Web & Software Solutions**
- Title: **WEB & SOFTWARE SOLUTIONS**
- Body: Websites, management systems, and cloud tools for schools and businesses—delivered professionally.
- CTA 1: Our Services
- CTA 2: Request a Quote

### (B) Impact Stats
- Heading: **Our Impact**
- Body: We measure success through transformation—skills gained, systems delivered, and communities supported.

### (C) Home About
- Heading: **About Zyra Tech Hub**
- Body:
  Founded in Koforidua, Ghana, Zyra Tech Hub bridges the gap between classroom learning and industry-ready skills. We train learners through practical programs and internships while supporting schools and businesses with reliable digital services—from software to IT infrastructure.

### (D) Core Services
- Heading: **Our Core Services**
- Cards:
  - Education & Internship
  - IT & Networking
  - Web & Software
  - Consulting & Support

---

## 4.2 About (`/about`)
Page sections are assembled in `src/pages/public/about/index.jsx`.

### About Hero
- Headline: **Building Skills. Delivering Solutions.**
- Subtext: Zyra Tech Hub trains emerging talent and delivers digital solutions that strengthen schools, businesses, and communities.

### Our Story
- Headline: **Our Story**
- Body: We started with one mission: make tech skills practical and accessible. Today, we train learners and deliver solutions that solve real problems.

### Mission & Vision
- Mission: Equip learners with practical tech skills while delivering digital solutions that create measurable impact.
- Vision: A Ghana where talent and technology power opportunity, innovation, and sustainable growth.

### Core Values
- Integrity
- Excellence
- Impact
- Collaboration
- Innovation

### Partner CTA
- Headline: **Partner with Zyra Tech Hub**
- Body: Sponsor training, support labs, or collaborate on digital transformation projects.

---

## 4.3 Training (`/training`)
Page sections are assembled in `src/pages/public/training/index.jsx`.

### Training Hero
- Headline: **Professional Training for Modern Tech Skills**
- Subtext: Elevate your capabilities with industry-relevant programs in DevOps, Cloud, Web Development, and more.
- CTA 1: Explore Programs
- CTA 2: Get Quote

### Training Contact
- Heading: **Get in Touch**
- Subtext: Have questions about our training programs? Our team is ready to help you find the perfect solution.

---

## 4.4 Training Programs Hub (`/training/programs`)
- Hero headline: **Transform Your Career with Professional Tech Training in Ghana**
- Section headline: **Explore Our Programmes In Ghana**
- CTA: **Discover Your Path**
- Contact block: “Do you have any questions?”

---

## 4.5 Course Detail (`/training/course/:courseId`) — AmaliTech-inspired
Structure matches AWS re/Start style:
- Hero with deadline + CTAs
- 4 “pillars” grid
- Program overview outcomes
- Delivery model
- Application process
- Parallax “Do you have any questions?” CTA
- Contact split section

Reusable copy blocks:
- Application Process heading: **The Application Process**
- Deadline line: **Application Deadline: [DATE]**
- Parallax heading: **Do you have any questions?**

---

## 4.6 Newsletter (`/newsletter`)
The `insights` array is currently empty.

Recommended starter articles (add to the array):
1) How Internship Projects Build Job-Ready Developers
2) The Real Cost of Poor Network Infrastructure in Schools
3) From Idea to MVP: Building Systems That Organizations Actually Use
4) Why Hands-On Training Beats Theory Alone
5) Community Impact Through Tech: What We’ve Learned
6) Preparing for a Career in Cloud & DevOps (Beginner Guide)

---

# 5) Future Features Roadmap (Planned)
## Content & Growth
- CMS for News/Insights (replace hardcoded arrays)
- SEO + social sharing images (OG per page)
- Case studies as structured content (problem → solution → results)

## Training
- Real backend form submissions (enrollment + contact)
- Program comparison tool
- Cohort calendars + seat availability
- Automated confirmation emails

## Donations
- Receipts by email
- Monthly transparency + impact reporting

## Open Labs
- Booking calendar availability
- Paid booking (optional)
- Equipment inventory + booking rules

## Admin
- Manage submissions (contact/enrollments/partners/bookings)
- Roles: admin/editor

---

# 6) Image Generation Plan (Nano Banana)

## 6.1 Global Image Style Guide
Use consistent visuals across the site:
- Style: modern Ghana tech hub, realistic documentary/corporate
- Lighting: bright natural or clean studio lighting
- Mood: professional, optimistic, practical
- Wardrobe: smart casual
- Subtle brand presence: deep blue (#004fa2) and warm accent (#FFD700) in props/UI/signage

### Preferred formats
- Hero images: **16:9** (e.g. 1920×1080)
- Section images: **4:3** (e.g. 1600×1200)
- Cards/thumbnails: **1:1** (e.g. 1200×1200)

## 6.2 Required Images by Page

### Home
1) `home-hero-education.jpg` (16:9)
- Description: training classroom, mentor guiding learners on laptops, projector/whiteboard visible.

2) `home-hero-impact.jpg` (16:9)
- Description: students presenting a project, screen shows a web app, audience engaged.

3) `home-hero-team.jpg` (16:9)
- Description: professional team portrait in an innovation hub office.

4) `home-hero-networking.jpg` (16:9)
- Description: technician installing Wi‑Fi access point, clean school corridor.

5) `home-hero-software.jpg` (16:9)
- Description: laptop with dashboard UI, team discussion in background.

### About
6) `about-story.jpg` (16:9)
- Description: founder/instructor speaking to learners, modern classroom.

7) `about-team-headshot-[name].jpg` (1:1)
- Description: professional headshots for each team member, neutral background.

### Training
8) `training-hero.jpg` (16:9)
- Description: premium instructor-led workshop, laptops, projector, attentive learners.

9) `training-success.jpg` (16:9)
- Description: graduates holding certificates, group photo, happy but professional.

### Course Detail
10) `course-hero-[course].jpg` (16:9)
- Description: relevant training scene (web dev / devops), strong cinematic lighting.

11) `course-parallax.jpg` (16:9)
- Description: abstract/atmospheric training environment to sit behind parallax CTA.

12) `course-contact-lead.jpg` (4:3)
- Description: HR/recruitment lead portrait, office background.

13) `code-dark-bg.jpg` (16:9)
- Description: dark-themed code background with subtle glow, suitable for hero overlays with text.

### Projects
13) `projects-hero.jpg` (16:9)
- Description: product mockups on laptop/phone, clean premium product photography.

14) `project-thumb-[name].jpg` (1:1)
- Description: consistent dashboard mockups for each project.

### Open Labs
15) `openlabs-hero.jpg` (16:9)
- Description: modern lab/workshop, electronics bench, robotics kits, laptops.

16) `openlabs-equipment-[name].jpg` (4:3)
- Description: close-up of equipment on a clean bench.

### Manufacturing
17) `manufacturing-hero.jpg` (16:9)
- Description: organized workshop, technicians with safety gear, machines in background.

18) `manufacturing-service-[name].jpg` (4:3)
- Description: technician maintaining machinery, measuring components.

---

# 7) Next expansion items
To complete the documentation 100%, we will add copy + images for:
- Education enrollment/payment pages
- Manufacturing booking/quotes/subscription pages
- Software subpages (custom/iot/household/contact)
- Open Labs subpages (facilities/projects/book-session)
- Donation flows + Partnership pages

---

## 8) Needed from you (to finalize real copy)
1) Official contact info (emails, phone numbers, address)
2) Confirm brand name spelling everywhere
3) List the top 6–10 flagship programs to prioritize
