# Complete Backend Integration Guide - All Content Sections

**Frontend: ZyraTech Admin Panel**  
**Feature: Complete Content Management System**  
**Status:** Frontend Complete - Backend Integration Ready  
**Date:** October 2026  
**Total Sections:** 8 content types

---

## 📋 Complete Form Fields by Section

This document details **every field** being sent to the backend for all content management sections. Use this to ensure your database has all required columns.

---

## 1️⃣ HERO SLIDES (Section: "hero")

**Endpoint:** `/api/admin/content/items` (POST/PUT)  
**GET:** `/api/admin/content/items/section/hero`

### Fields Sent:

| Field | Type | Required | Example |
|---|---|---|---|
| `section` | String | ✅ Auto-added | `"hero"` |
| `title` | String | ✅ Yes | `"Transform Your Future"` |
| `description` | String | ✅ Yes | `"Join our industry-leading programs"` |
| `pillar` | String | ❌ No | `"Web Development"` |
| `backgroundImage` | String (URL) | ✅ Yes | `"https://s3.../hero1.jpg"` |
| `cta1Text` | String | ❌ No | `"Get Started"` |
| `cta1Link` | String (URL) | ❌ No | `"https://zyratechhub.com/services"` |
| `cta2Text` | String | ❌ No | `"Learn More"` |
| `cta2Link` | String (URL) | ❌ No | `"https://zyratechhub.com/about"` |
| `isVisible` | Boolean | ✅ Yes | `true` |

**Example POST body:**
```json
{
  "section": "hero",
  "title": "Transform Your Future",
  "description": "Join our industry-leading programs...",
  "pillar": "Web Development",
  "backgroundImage": "https://s3.amazonaws.com/...",
  "cta1Text": "Get Started",
  "cta1Link": "https://zyratechhub.com/services",
  "cta2Text": "Learn More",
  "cta2Link": "https://zyratechhub.com/about",
  "isVisible": true
}
```

---

## 2️⃣ SERVICES (Section: "services")

**Endpoint:** `/api/admin/content/items` (POST/PUT)  
**GET:** `/api/admin/content/items/section/services`

### Fields Sent:

| Field | Type | Required | Example |
|---|---|---|---|
| `section` | String | ✅ Auto-added | `"services"` |
| `title` | String | ✅ Yes | `"Web Development"` |
| `description` | String | ✅ Yes | `"Build scalable web applications"` |
| `icon` | String | ✅ Yes | `"Code2"` (lucide icon name) |
| `highlights` | Array of Strings | ❌ No | `["Responsive Design", "SEO Optimized"]` |

**Available icons (18 total):**
`Code2`, `Zap`, `ShieldCheck`, `Cog`, `TrendingUp`, `DollarSign`, `Layers`, `BadgeCheck`, `Globe`, `Lock`, `Target`, `Rocket`, `Users`, `Briefcase`, `Search`, `Database`, `Award`, `MessageSquare`

**Example POST body:**
```json
{
  "section": "services",
  "title": "Web Development",
  "description": "Build scalable web applications",
  "icon": "Code2",
  "highlights": [
    "Responsive Design",
    "SEO Optimized",
    "Mobile First"
  ]
}
```

---

## 3️⃣ BENEFITS (Section: "benefits")

**Endpoint:** `/api/admin/content/items` (POST/PUT)  
**GET:** `/api/admin/content/items/section/benefits`

### Fields Sent:

| Field | Type | Required | Example |
|---|---|---|---|
| `section` | String | ✅ Auto-added | `"benefits"` |
| `title` | String | ✅ Yes | `"Industry Expertise"` |
| `description` | String | ✅ Yes | `"Learn from experienced professionals"` |
| `icon` | String | ✅ Yes | `"ShieldCheck"` (lucide icon name) |

**Example POST body:**
```json
{
  "section": "benefits",
  "title": "Industry Expertise",
  "description": "Learn from experienced professionals",
  "icon": "ShieldCheck"
}
```

---

## 4️⃣ MILESTONES (Section: "milestones")

**Endpoint:** `/api/admin/content/items` (POST/PUT)  
**GET:** `/api/admin/content/items/section/milestones`

### Fields Sent:

| Field | Type | Required | Example |
|---|---|---|---|
| `section` | String | ✅ Auto-added | `"milestones"` |
| `title` | String | ✅ Yes | `"Founded"` |
| `description` | String | ✅ Yes | `"ZyraTech Hub was established"` |
| `icon` | String | ✅ Yes | `"CheckCircle"` (lucide icon name) |

**Example POST body:**
```json
{
  "section": "milestones",
  "title": "Founded",
  "description": "ZyraTech Hub was established",
  "icon": "CheckCircle"
}
```

---

## 5️⃣ TIMELINE (Section: "timeline")

**Endpoint:** `/api/admin/content/items` (POST/PUT)  
**GET:** `/api/admin/content/items/section/timeline`

### Fields Sent:

| Field | Type | Required | Example |
|---|---|---|---|
| `section` | String | ✅ Auto-added | `"timeline"` |
| `year` | String | ✅ Yes | `"2020"` |
| `title` | String | ✅ Yes | `"Company Founded"` |
| `desc` | String | ✅ Yes | `"Started with a vision"` |
| `icon` | String | ✅ Yes | `"Flag"` (lucide icon name) |

**Example POST body:**
```json
{
  "section": "timeline",
  "year": "2020",
  "title": "Company Founded",
  "desc": "Started with a vision to transform tech education",
  "icon": "Flag"
}
```

---

## 6️⃣ PARTNERSHIPS (Section: "partnerships")

**Endpoint:** `/api/admin/content/items` (POST/PUT)  
**GET:** `/api/admin/content/items/section/partnerships`

### Fields Sent:

| Field | Type | Required | Example |
|---|---|---|---|
| `section` | String | ✅ Auto-added | `"partnerships"` |
| `title` | String | ✅ Yes | `"Tech Partner A"` |
| `description` | String | ✅ Yes | `"Leading technology partner"` |
| `image` | String (URL) | ❌ No | `"https://s3.../partner.jpg"` |
| `link` | String (URL) | ❌ No | `"https://techpartner.com"` |

**Example POST body:**
```json
{
  "section": "partnerships",
  "title": "Tech Partner A",
  "description": "Leading technology partner",
  "image": "https://s3.amazonaws.com/.../partner.jpg",
  "link": "https://techpartner.com"
}
```

---

## 7️⃣ ABOUT PAGE (Section: "about-quote")

**Endpoint:** `/api/admin/content/items/section/about-quote` (GET/PUT - single item)

### Fields Sent:

| Field | Type | Required | Example |
|---|---|---|---|
| `quote` | String | ❌ No | `"We empower the next generation"` |
| `authorName` | String | ❌ No | `"John Doe"` |
| `authorTitle` | String | ❌ No | `"CEO"` |
| `authorImage` | String (URL) | ❌ No | `"https://s3.../ceo.jpg"` |
| `stat1Value` | String | ❌ No | `"500+"` |
| `stat1Label` | String | ❌ No | `"Students"` |
| `stat2Value` | String | ❌ No | `"95%"` |
| `stat2Label` | String | ❌ No | `"Success Rate"` |
| `stat3Value` | String | ❌ No | `"50+"` |
| `stat3Label` | String | ❌ No | `"Partners"` |

**Example PUT body:**
```json
{
  "quote": "We empower the next generation of tech leaders",
  "authorName": "John Doe",
  "authorTitle": "Founder & CEO",
  "authorImage": "https://s3.amazonaws.com/.../ceo.jpg",
  "stat1Value": "500+",
  "stat1Label": "Students Trained",
  "stat2Value": "95%",
  "stat2Label": "Job Placement Rate",
  "stat3Value": "50+",
  "stat3Label": "Corporate Partners"
}
```

---

## 8️⃣ QUALITY ASSURANCE PAGE (Complex Nested Structure)

**Endpoint:** `/api/admin/content/items/section/qa` (GET/PUT - single item)

### Structure:

```json
{
  "hero": {
    "title": "String",
    "description": "String",
    "image": "String (URL)"
  },
  "intro": {
    "howItWorks": {
      "title": "String",
      "description": "String"
    },
    "standards": {
      "title": "String",
      "description": "String",
      "items": [
        {
          "text": "String",
          "result": "String"
        }
      ]
    }
  },
  "tools": [
    {
      "id": "String (optional)",
      "name": "String",
      "logo": "String (URL)",
      "color": "String (Tailwind color class)"
    }
  ],
  "faq": [
    {
      "question": "String",
      "answer": "String"
    }
  ]
}
```

**Example PUT body:**
```json
{
  "hero": {
    "title": "Quality Assurance",
    "description": "Our commitment to excellence",
    "image": "https://s3.../qa-hero.jpg"
  },
  "intro": {
    "howItWorks": {
      "title": "How We Work",
      "description": "Our methodology..."
    },
    "standards": {
      "title": "Quality Standards",
      "description": "We maintain highest standards",
      "items": [
        {
          "text": "ISO 9001 Certified",
          "result": "✓ Achieved 2022"
        }
      ]
    }
  },
  "tools": [
    {
      "name": "Git",
      "logo": "https://s3.../git-logo.png",
      "color": "text-orange-500"
    }
  ],
  "faq": [
    {
      "question": "What is your process?",
      "answer": "We follow Agile methodology..."
    }
  ]
}
```

---

## 🔧 CRITICAL REQUIREMENTS

### Image Upload Endpoint (REQUIRED FOR ALL SECTIONS)

Backend MUST implement:
```
POST /api/admin/upload
Content-Type: multipart/form-data

file: <image file>
```

**Response:**
```json
{
  "success": true,
  "imageUrl": "https://s3.amazonaws.com/zyratech-assets/uuid-12345.jpg",
  "fileName": "uuid-12345.jpg"
}
```

### Why This Matters:
- Hero Slides need `backgroundImage` URL
- Partnerships need `image` URL  
- About Page needs `authorImage` URL
- QA Page needs Hero `image` URL
- Admins upload files from their machine → backend must convert to persistent URLs

---

## 📊 Database Schema Requirements

### Table: `content_items`

```sql
CREATE TABLE content_items (
  id VARCHAR(100) PRIMARY KEY,
  section VARCHAR(50) NOT NULL,
  
  -- Common fields (all sections)
  title VARCHAR(255),
  description TEXT,
  icon VARCHAR(50),
  
  -- Hero slides specific
  backgroundImage VARCHAR(500),
  pillar VARCHAR(255),
  cta1Text VARCHAR(255),
  cta1Link VARCHAR(500),
  cta2Text VARCHAR(255),
  cta2Link VARCHAR(500),
  isVisible BOOLEAN DEFAULT true,
  
  -- Services specific
  highlights JSON,
  
  -- Timeline specific
  year VARCHAR(4),
  desc TEXT,
  
  -- Partnerships specific
  image VARCHAR(500),
  link VARCHAR(500),
  
  -- About quotes
  quote TEXT,
  authorName VARCHAR(255),
  authorTitle VARCHAR(255),
  authorImage VARCHAR(500),
  
  -- Statistics
  stat1Value VARCHAR(50),
  stat1Label VARCHAR(100),
  stat2Value VARCHAR(50),
  stat2Label VARCHAR(100),
  stat3Value VARCHAR(50),
  stat3Label VARCHAR(100),
  
  -- QA nested data
  intro JSON,
  tools JSON,
  faq JSON,
  
  -- Metadata
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX (section),
  INDEX (createdAt)
);
```

---

## 🔐 API Endpoints Summary

All admin endpoints require Bearer token authentication.

### Admin Endpoints (Require Auth):
```
GET    /api/admin/content/items/section/{section}      - List all items in section
GET    /api/admin/content/items/{id}                   - Get single item
POST   /api/admin/content/items                        - Create item
PUT    /api/admin/content/items/{id}                   - Update item
DELETE /api/admin/content/items/{id}                   - Delete item
POST   /api/admin/upload                               - Upload image file
```

### Public Endpoints (No Auth):
```
GET    /api/content/items/{section}                    - Get public items (only visible=true)
```

---

## 📝 Sections Reference

| Section | Endpoint Path | Max Items | Description |
|---|---|---|---|
| Hero Slides | `/api/admin/content/items/section/hero` | Multiple | Homepage hero carousel |
| Services | `/api/admin/content/items/section/services` | Multiple | Service offerings |
| Benefits | `/api/admin/content/items/section/benefits` | Multiple | Why choose us |
| Milestones | `/api/admin/content/items/section/milestones` | Multiple | Company achievements |
| Timeline | `/api/admin/content/items/section/timeline` | Multiple | Company history |
| Partnerships | `/api/admin/content/items/section/partnerships` | Multiple | Partner companies |
| About Quote | `/api/admin/content/items/section/about-quote` | 1 (Single) | Mission statement + stats |
| QA Page | `/api/admin/content/items/section/qa` | 1 (Single) | Quality assurance page |

---

## ✅ Implementation Checklist for Backend

- [ ] Create `content_items` table with all fields
- [ ] Implement `GET /api/admin/content/items/section/{section}`
- [ ] Implement `GET /api/admin/content/items/{id}`
- [ ] Implement `POST /api/admin/content/items` with validation
- [ ] Implement `PUT /api/admin/content/items/{id}` with validation
- [ ] Implement `DELETE /api/admin/content/items/{id}`
- [ ] Implement `POST /api/admin/upload` (multipart file upload to S3)
- [ ] Implement `GET /api/content/items/{section}` (public, filter by isVisible)
- [ ] Add Bearer token authentication to all admin endpoints
- [ ] Add input validation for all fields
- [ ] Test all endpoints with provided example payloads

---

## 🚀 Testing with Postman

Once implemented, test each section:

1. **Hero Slides:**
   - POST create with backgroundImage URL
   - GET list should return the slide
   - PUT update some fields
   - DELETE should remove it

2. **Services:**
   - POST with highlights array
   - GET should return with highlights

3. **About Quote:**
   - PUT with stats
   - GET should return single item (not array)

4. **QA Page:**
   - PUT with nested JSON structure
   - GET should return complex structure

---

## 📞 Next Steps

1. Backend team creates database tables and endpoints
2. Backend team implements `/api/admin/upload` for image storage
3. Frontend already configured - no changes needed
4. Test with Postman (use provided example payloads)
5. Frontend admin pages will start working immediately
