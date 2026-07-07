# ZyraTech Hub Frontend - Complete Backend API Documentation

**Version:** 1.0  
**Last Updated:** 2025  
**Frontend Framework:** React 19 + Vite  
**State Management:** Redux Toolkit  

---

## Table of Contents

1. [API Configuration](#api-configuration)
2. [Authentication System](#authentication-system)
3. [Training Course Application](#training-course-application)
4. [Job Application](#job-application)
5. [Partnership Application](#partnership-application)
6. [Contact Form](#contact-form)
7. [Admin Dashboard APIs](#admin-dashboard-apis)
8. [Public Pages APIs](#public-pages-apis)
9. [Response Format Standards](#response-format-standards)

---

## API Configuration

### Base URL
- **Environment Variable:** `VITE_API_BASE_URL`
- **Production:** Backend API endpoint
- **Frontend URL:** `https://zyratechhub.com/`
- **Development:** Configure in `.env` file

### API Client Setup (`src/services/api.js`)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request interceptor - automatically attaches Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

### Token Storage
- **Location:** `localStorage`
- **Key for Admin Token:** `adminToken`
- **Key for User Data:** `user`
- **Format:** Bearer token in `Authorization` header

---

## Authentication System

### Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "admin@zyratech.com",
  "password": "Admin@123"
}
```

**Expected Response (Success):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "u-1002",
      "name": "Admin User",
      "email": "admin@zyratech.com",
      "role": "admin",
      "department": "Blog Articles",
      "avatar": null,
      "accountStatus": "active",
      "kycStatus": "verified",
      "mustChangePassword": false,
      "lastLogin": "2025-01-15T10:30:00.000Z"
    }
  }
}
```

**Expected Response (Error):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password. Please check your credentials and try again."
  }
}
```

**Frontend Implementation:** `src/store/slices/authSlice.js` - `loginUser` thunk

**Account Status Values:**
- `active` - Normal account
- `pending_password` - New account, needs password change
- `deactivated` - Account disabled

**KYC Status Values:**
- `verified` - KYC approved
- `pending` - KYC submitted, awaiting review
- `not_submitted` - No KYC submitted yet

**User Roles:**
- `super_admin` - Full system access, can manage all administrators and assign permissions
- `admin` - Limited access based on assigned departments/permissions by Super Admin

**Permission System:**
Super Admin assigns specific departments/sections to Admin users. Admins can ONLY access and edit the departments explicitly assigned to them.

**Available Departments/Permissions:**

*Content Management:*
- `hero_slides` - Hero Slides
- `services` - Services
- `benefits` - Why Choose Us
- `about_section` - About Section (homepage)
- `about_page` - About Page (full page)
- `work_with_us` - Work With Us
- `quality_assurance` - Quality Assurance
- `partnership_content` - Partnership Content
- `training_courses` - Training Courses
- `blog_articles` - Blog Articles
- `job_listings` - Job Listings
- `gallery` - Gallery
- `projects` - Projects
- `faq` - FAQ
- `testimonials` - Testimonials

*Business Operations:*
- `payments` - Payments & Transactions
- `enrollments` - Training Enrollments
- `messages` - Messages
- `partnership_requests` - Partnership Requests
- `contact_inquiries` - Contact Inquiries
- `impact_stories` - Impact Stories
- `newsletter` - Newsletter Subscriptions

*System (Super Admin Only):*
- `analytics` - Analytics Dashboard
- `administrators` - User Management
- `settings` - System Settings
- `activity_logs` - Activity Logs
- `reports` - Reports

**Example Admin with Limited Access:**
```json
{
  "id": "u-1002",
  "name": "Content Manager",
  "email": "content@zyratech.com",
  "role": "admin",
  "permissions": ["blog_articles", "gallery", "testimonials"],
  "accountStatus": "active"
}
```

This admin can ONLY access and edit Blog Articles, Gallery, and Testimonials. All other sections are hidden/disabled.

---

### Change Password

**Endpoint:** `POST /api/auth/change-password`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "currentPassword": "TempPass@2025",
  "newPassword": "NewSecure@Pass123"
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "message": "Password changed successfully",
    "user": {
      "id": "u-1003",
      "mustChangePassword": false,
      "accountStatus": "active"
    }
  }
}
```

**Frontend Implementation:** `src/store/slices/authSlice.js` - `changePassword` thunk

---

### Submit KYC

**Endpoint:** `POST /api/auth/submit-kyc`

**Headers:** `Authorization: Bearer {token}`

**Request Body (multipart/form-data):**
```
documents: File (e.g., ID card, proof of address)
documentType: "national_id" | "passport" | "drivers_license"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "message": "KYC documents submitted successfully",
    "user": {
      "kycStatus": "pending"
    }
  }
}
```

**Frontend Implementation:** `src/store/slices/authSlice.js` - `submitKyc` thunk

---

### Logout

**Endpoint:** `POST /api/auth/logout`

**Headers:** `Authorization: Bearer {token}`

**Expected Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Frontend Implementation:** `src/store/slices/authSlice.js` - `logoutUser` thunk

---

## Training Course Application

### Endpoint
`POST /api/training/applications`

### Form Location
`/training/course/:id/apply`

**Component:** `src/components/pages/training/CourseApplicationForm.jsx`

### Request Body (JSON)

**Basic Programs (e.g., Basic level courses):**
```json
{
  "courseId": "4",
  "fullName": "John Doe",
  "emailAddress": "john.doe@example.com",
  "phoneNumber": "+233 24 123 4567",
  "country": "Ghana",
  "currentLocation": "Koforidua",
  "educationLevel": "JHS / SHS",
  "preferredCohort": "January to April",
  "learningMode": "Hybrid",
  "message": "I am interested in learning Python programming..."
}
```

**Advanced Programs (Intermediate, Advanced, Internship, Matured):**
```json
{
  "courseId": "1",
  "fullName": "Jane Smith",
  "emailAddress": "jane.smith@example.com",
  "phoneNumber": "+233 24 765 4321",
  "country": "Ghana",
  "currentLocation": "Accra",
  "educationLevel": "Undergraduate",
  "preferredCohort": "April to July",
  "learningMode": "Online",
  "message": "Looking forward to advancing my data analysis skills",
  "cvFile": File,
  "motivationStatement": "I want to transition into data science because...",
  "linkedinUrl": "https://linkedin.com/in/janesmith",
  "websiteUrl": "https://janesmith.dev"
}
```

### Field Details

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| `courseId` | string | Yes | Must be valid course ID | From URL params |
| `fullName` | string | Yes | Non-empty | |
| `emailAddress` | string (email) | Yes | Valid email format | |
| `phoneNumber` | string | Yes | Non-empty | Format: +233... |
| `country` | string | Yes | Non-empty | |
| `currentLocation` | string | Yes | Non-empty | City/Town |
| `educationLevel` | string (enum) | Yes | One of: "JHS / SHS", "Diploma", "Undergraduate", "Graduate", "Other" | |
| `preferredCohort` | string (enum) | Yes | One of: "January to April", "April to July", "July to October" | |
| `learningMode` | string (enum) | Yes | One of: "Online", "Onsite", "Hybrid" | |
| `message` | string | No | Max 1000 chars | Additional info |
| `cvFile` | File | Yes (for advanced) | PDF/DOC/DOCX, max 5MB | multipart/form-data |
| `motivationStatement` | string | Yes (for advanced) | Non-empty | Why join course |
| `linkedinUrl` | string (url) | No | Valid URL | Optional |
| `websiteUrl` | string (url) | No | Valid URL | Optional portfolio |

### Advanced Programs Determination
Frontend checks `course.category` to determine if extra fields are required:
- `basic` - Basic fields only
- `intermediate`, `advanced`, `internship`, `matured` - Requires CV, motivation statement, optional LinkedIn/website

### Expected Response (Success)
```json
{
  "success": true,
  "data": {
    "applicationId": "app_2025_001234",
    "courseTitle": "Programming for Everybody (Getting Started with Python)",
    "applicantName": "John Doe",
    "status": "pending",
    "submittedAt": "2025-01-15T14:30:00.000Z",
    "message": "Application submitted successfully. We will review and contact you within 3-5 business days."
  }
}
```

### Expected Response (Error)
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please provide all required fields",
    "details": {
      "cvFile": "CV/Resume is required for this program level"
    }
  }
}
```

### After Submission
Frontend navigates to: `/training/application-success` with state:
```javascript
{
  courseId: "4",
  courseTitle: "Programming for Everybody (Getting Started with Python)",
  applicantName: "John Doe"
}
```

---

## Job Application

### Endpoint
`POST /api/jobs/applications`

### Form Location
`/jobs/:id/apply`

**Component:** `src/components/pages/jobs/JobApplicationForm.jsx`

### Multi-Step Form (5 Steps)

#### Step 1: Personal Information
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "confirmEmail": "john.doe@example.com",
  "city": "remote",
  "phoneNumber": "24 123 4567"
}
```

#### Step 2: Profiles & Resume
```json
{
  "linkedin": "https://linkedin.com/in/johndoe",
  "facebook": "https://facebook.com/johndoe",
  "twitter": "https://twitter.com/johndoe",
  "website": "https://johndoe.dev",
  "resume": File,
  "message": "I am excited to apply for this role because..."
}
```

#### Step 3: Preliminary Questions
```json
{
  "title": "Software Engineer",
  "legalAuthorization": "yes",
  "workExperience": "24",
  "residence": "Koforidua",
  "currentSalary": "GHC 5000",
  "howDidYouKnowZyra": "LinkedIn"
}
```

#### Step 4: Final Details
```json
{
  "uploadDocuments": true,
  "additionalAttachments": File,
  "disability": "None",
  "references": "Name: Jane Smith\nJob Title: Manager\nCompany: ABC Ltd\nPhone: +233...\nEmail: jane@abc.com",
  "howDidYouKnowJob": "Company website",
  "backgroundCheck": "yes",
  "criminalCharges": "no",
  "certifyTruth": true,
  "fullName": "John Doe",
  "agreePrivacy": true
}
```

### Complete Request Body (multipart/form-data)

```
firstName: string (required)
lastName: string (required)
email: string (required, email format)
confirmEmail: string (required, must match email)
city: string (required) - Options: "remote", "hybrid", "onsite"
phoneNumber: string (required)
linkedin: string (url, optional)
facebook: string (url, optional)
twitter: string (url, optional)
website: string (url, optional)
resume: File (required, PDF/DOC/DOCX, max 10MB)
message: string (required)
title: string (optional)
legalAuthorization: string (required) - "yes" | "no"
workExperience: number (required) - months of experience
residence: string (required)
currentSalary: string (required)
howDidYouKnowZyra: string (required)
uploadDocuments: boolean
additionalAttachments: File (optional, max 10MB)
disability: string (optional)
references: string (optional)
howDidYouKnowJob: string (optional)
backgroundCheck: string (optional) - "yes" | "no"
criminalCharges: string (optional) - "yes" | "no"
certifyTruth: boolean (required, must be true)
fullName: string (required)
agreePrivacy: boolean (required, must be true)
jobId: string (required) - from URL params
```

### Expected Response
```json
{
  "success": true,
  "data": {
    "applicationId": "job_app_2025_001",
    "jobTitle": "Full Stack Developer",
    "applicantName": "John Doe",
    "email": "john.doe@example.com",
    "status": "pending",
    "submittedAt": "2025-01-15T14:30:00.000Z"
  }
}
```

---

## Partnership Application

### Endpoint
`POST /api/partnerships/applications`

### Form Location
`/partner/apply`

**Component:** `src/pages/public/partnership/apply.jsx`

### Multi-Step Form (4 Steps)

#### Step 1: Organization Info
```json
{
  "organizationName": "Tech Solutions Ltd",
  "organizationType": "corporate",
  "website": "https://techsolutions.com",
  "country": "Ghana"
}
```

#### Step 2: Contact Details
```json
{
  "contactName": "Jane Smith",
  "position": "Partnership Manager",
  "email": "jane@techsolutions.com",
  "phone": "+233 24 765 4321"
}
```

#### Step 3: Partnership Goals
```json
{
  "partnershipType": "Training Partnership",
  "interests": ["Digital Skills Training", "Tech Talent Development"],
  "timeline": "short",
  "message": "We are interested in collaborating on..."
}
```

#### Step 4: Agreement
```json
{
  "agreedToTerms": true
}
```

### Complete Request Body

```json
{
  "organizationName": "Tech Solutions Ltd",
  "organizationType": "corporate",
  "website": "https://techsolutions.com",
  "country": "Ghana",
  "contactName": "Jane Smith",
  "position": "Partnership Manager",
  "email": "jane@techsolutions.com",
  "phone": "+233 24 765 4321",
  "partnershipType": "Training Partnership",
  "interests": ["Digital Skills Training", "Tech Talent Development"],
  "timeline": "short",
  "message": "We are interested in collaborating on digital skills training...",
  "agreedToTerms": true
}
```

### Field Details

| Field | Type | Required | Options/Validation |
|-------|------|----------|-------------------|
| `organizationType` | string (enum) | Yes | "corporate", "ngo", "educational", "government", "startup", "other" |
| `partnershipType` | string | Yes | See `PUBLIC_PARTNERSHIP_TYPES` in `src/data/partnershipsData.js` |
| `interests` | array of strings | Yes | At least 1, see `PARTNERSHIP_INTERESTS` in `src/data/partnershipsData.js` |
| `timeline` | string (enum) | No | "immediate", "short", "medium", "long", "flexible" |
| `agreedToTerms` | boolean | Yes | Must be `true` |

### Expected Response
```json
{
  "success": true,
  "data": {
    "applicationId": "partner_2025_001",
    "organizationName": "Tech Solutions Ltd",
    "status": "pending",
    "submittedAt": "2025-01-15T14:30:00.000Z",
    "message": "Partnership application submitted successfully"
  }
}
```

---

## Contact Form

### Endpoint
`POST /api/contact/inquiries`

### Form Location
`/contact`

**Component:** `src/components/pages/contact/ContactHero.jsx`

### Request Body

```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+233 24 123 4567",
  "inquiryType": "partnership",
  "message": "I would like to know more about your partnership opportunities..."
}
```

### Field Details

| Field | Type | Required | Options |
|-------|------|----------|---------|
| `fullName` | string | Yes | Non-empty |
| `email` | string (email) | Yes | Valid email |
| `phone` | string | No | Phone number |
| `inquiryType` | string (enum) | No | "partnership", "collaboration", "general", "support", "media" |
| `message` | string | Yes | Non-empty |

### Expected Response
```json
{
  "success": true,
  "data": {
    "inquiryId": "inq_2025_001",
    "message": "Thank you for contacting us. We will respond within 24 hours."
  }
}
```

---

## Admin Permissions System

### Create Admin User (Super Admin Only)

**Endpoint:** `POST /api/admin/users`

**Headers:** `Authorization: Bearer {super_admin_token}`

**Request Body:**
```json
{
  "name": "Content Manager",
  "email": "content@zyratech.com",
  "password": "TempPassword@123",
  "role": "admin",
  "department": "Content Team",
  "permissions": ["blog_articles", "gallery", "testimonials"],
  "mustChangePassword": true
}
```

**Field Details:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | Yes | Full name |
| `email` | string (email) | Yes | Must be unique |
| `password` | string | Yes | Temporary password |
| `role` | string (enum) | Yes | Only "admin" allowed (super_admin cannot be created via API) |
| `department` | string | No | Display only (e.g., "Blog Team", "Partnerships") |
| `permissions` | array of strings | Yes | See Available Departments list above |
| `mustChangePassword` | boolean | No | Default: true |

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "u-1005",
    "name": "Content Manager",
    "email": "content@zyratech.com",
    "role": "admin",
    "department": "Content Team",
    "permissions": ["blog_articles", "gallery", "testimonials"],
    "accountStatus": "pending_password",
    "kycStatus": "not_submitted",
    "createdAt": "2025-01-15T14:30:00.000Z"
  },
  "message": "Admin user created successfully. Temporary password sent to email."
}
```

---

### Update Admin Permissions (Super Admin Only)

**Endpoint:** `PUT /api/admin/users/:userId/permissions`

**Headers:** `Authorization: Bearer {super_admin_token}`

**Request Body:**
```json
{
  "permissions": ["blog_articles", "gallery", "testimonials", "faq"]
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "u-1005",
    "permissions": ["blog_articles", "gallery", "testimonials", "faq"],
    "updatedAt": "2025-01-15T15:00:00.000Z"
  },
  "message": "Permissions updated successfully"
}
```

---

### Get Admin User Details

**Endpoint:** `GET /api/admin/users/:userId`

**Headers:** `Authorization: Bearer {token}`

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "u-1005",
    "name": "Content Manager",
    "email": "content@zyratech.com",
    "role": "admin",
    "department": "Content Team",
    "permissions": ["blog_articles", "gallery", "testimonials"],
    "accountStatus": "active",
    "kycStatus": "verified",
    "createdAt": "2025-01-15T14:30:00.000Z",
    "lastLogin": "2025-01-15T16:45:00.000Z"
  }
}
```

---

### List All Admins (Super Admin Only)

**Endpoint:** `GET /api/admin/users`

**Headers:** `Authorization: Bearer {super_admin_token}`

**Query Parameters:**
```
?page=1&limit=10&role=admin&status=active
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "u-1002",
        "name": "Admin User",
        "email": "admin@zyratech.com",
        "role": "admin",
        "department": "Blog Team",
        "permissions": ["blog_articles", "gallery"],
        "accountStatus": "active",
        "kycStatus": "verified",
        "lastLogin": "2025-01-15T10:00:00.000Z"
      },
      {
        "id": "u-1005",
        "name": "Content Manager",
        "email": "content@zyratech.com",
        "role": "admin",
        "department": "Content Team",
        "permissions": ["blog_articles", "gallery", "testimonials"],
        "accountStatus": "active",
        "kycStatus": "pending",
        "lastLogin": "2025-01-15T16:45:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "totalPages": 1
    }
  }
}
```

---

### Deactivate Admin (Super Admin Only)

**Endpoint:** `PUT /api/admin/users/:userId/deactivate`

**Headers:** `Authorization: Bearer {super_admin_token}`

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "u-1005",
    "accountStatus": "deactivated"
  },
  "message": "Admin account deactivated successfully"
}
```

---

### Reactivate Admin (Super Admin Only)

**Endpoint:** `PUT /api/admin/users/:userId/activate`

**Headers:** `Authorization: Bearer {super_admin_token}`

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "u-1005",
    "accountStatus": "active"
  },
  "message": "Admin account activated successfully"
}
```

---

### Permission Validation Middleware

The backend MUST implement middleware to check permissions before allowing access to protected resources.

**Example:**
```javascript
// Pseudo-code for permission check
function checkPermission(requiredPermission) {
  return (req, res, next) => {
    const user = req.user; // From JWT token
    
    // Super admin has access to everything
    if (user.role === 'super_admin') {
      return next();
    }
    
    // Check if admin has the required permission
    if (user.role === 'admin' && user.permissions.includes(requiredPermission)) {
      return next();
    }
    
    // No permission
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: 'You do not have permission to access this resource'
      }
    });
  };
}

// Usage
app.get('/api/admin/blog', checkPermission('blog_articles'), getBlogArticles);
app.post('/api/admin/blog', checkPermission('blog_articles'), createBlogArticle);
```

---

## Admin Dashboard APIs

### Fetch Training Courses

**Endpoint:** `GET /api/admin/training-courses`

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
```
?page=1&limit=10&category=basic&search=python
```

**Frontend Implementation:** `src/store/slices/coursesSlice.js` - `fetchCourses` thunk

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": 1,
        "title": "Python Programming & Data Analysis",
        "category": "intermediate",
        "duration": "8 weeks",
        "level": "Intermediate",
        "price": "GHS 2,800",
        "instructor": "Data Science Team",
        "format": "Online + Onsite",
        "status": "active",
        "enrollments": 45,
        "createdAt": "2025-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 15,
      "totalPages": 2
    }
  }
}
```

---

### Create Course

**Endpoint:** `POST /api/admin/training-courses`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "title": "New Course Title",
  "category": "basic",
  "duration": "6 weeks",
  "level": "Beginner",
  "price": "GHS 1,500",
  "description": "Course description",
  "topics": ["Topic 1", "Topic 2"]
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 16,
    "title": "New Course Title",
    "category": "basic",
    "createdAt": "2025-01-15T14:30:00.000Z"
  }
}
```

---

### Update Course

**Endpoint:** `PUT /api/admin/training-courses/:id`

**Headers:** `Authorization: Bearer {token}`

**Request Body:** (Partial update supported)
```json
{
  "title": "Updated Course Title",
  "price": "GHS 1,800"
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 16,
    "title": "Updated Course Title",
    "price": "GHS 1,800",
    "updatedAt": "2025-01-15T14:35:00.000Z"
  }
}
```

---

### Delete Course

**Endpoint:** `DELETE /api/admin/training-courses/:id`

**Headers:** `Authorization: Bearer {token}`

**Expected Response:**
```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

---

### Fetch Transactions

**Endpoint:** `GET /api/admin/transactions`

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
```
?page=1&limit=10&status=completed&startDate=2025-01-01&endDate=2025-01-31
```

**Frontend Implementation:** `src/store/slices/paymentsSlice.js` - `fetchTransactions` thunk

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "txn_001",
        "amount": 2800,
        "currency": "GHS",
        "status": "completed",
        "paymentMethod": "mobile_money",
        "studentName": "John Doe",
        "courseTitle": "Python Programming",
        "transactionDate": "2025-01-10T10:30:00.000Z",
        "reference": "REF123456"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    },
    "stats": {
      "totalRevenue": 280000,
      "totalTransactions": 100,
      "successRate": 98.5,
      "refundRate": 1.5
    }
  }
}
```

---

### Refund Payment

**Endpoint:** `POST /api/admin/transactions/:id/refund`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "reason": "Student requested refund before course start",
  "amount": 2800,
  "refundMethod": "mobile_money"
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "txn_001",
    "status": "refunded",
    "refundedAmount": 2800,
    "refundedAt": "2025-01-15T14:30:00.000Z"
  }
}
```

---

### Refund Payment

**Endpoint:** `POST /api/admin/transactions/:id/refund`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "reason": "Student requested refund before course start",
  "amount": 2800,
  "refundMethod": "mobile_money"
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "txn_001",
    "status": "refunded",
    "refundedAmount": 2800,
    "refundedAt": "2025-01-15T14:30:00.000Z"
  }
}
```

---

### Content Management APIs

These endpoints correspond to the sidebar content sections. Each requires appropriate permissions.

**Hero Slides** - Permission: `hero_slides`
- `GET /api/admin/content/hero-slides` - Get all
- `POST /api/admin/content/hero-slides` - Create
- `PUT /api/admin/content/hero-slides/:id` - Update
- `DELETE /api/admin/content/hero-slides/:id` - Delete

**Services** - Permission: `services`
- `GET /api/admin/content/services` - Get all
- `POST /api/admin/content/services` - Create
- `PUT /api/admin/content/services/:id` - Update
- `DELETE /api/admin/content/services/:id` - Delete

**Benefits (Why Choose Us)** - Permission: `benefits`
- `GET /api/admin/content/benefits` - Get all
- `POST /api/admin/content/benefits` - Create
- `PUT /api/admin/content/benefits/:id` - Update
- `DELETE /api/admin/content/benefits/:id` - Delete

**About Section** - Permission: `about_section`
- `GET /api/admin/content/about-section` - Get content
- `PUT /api/admin/content/about-section` - Update

**About Page** - Permission: `about_page`
- `GET /api/admin/content/about-page` - Get content
- `PUT /api/admin/content/about-page` - Update

**Work With Us** - Permission: `work_with_us`
- `GET /api/admin/content/work-with-us` - Get content
- `PUT /api/admin/content/work-with-us` - Update

**Quality Assurance** - Permission: `quality_assurance`
- `GET /api/admin/content/quality-assurance` - Get content
- `PUT /api/admin/content/quality-assurance` - Update

**Partnership Content** - Permission: `partnership_content`
- `GET /api/admin/content/partnership` - Get content
- `PUT /api/admin/content/partnership` - Update

**Gallery** - Permission: `gallery`
- `GET /api/admin/gallery` - Get all albums/media
- `POST /api/admin/gallery/albums` - Create album
- `POST /api/admin/gallery/media` - Upload media
- `DELETE /api/admin/gallery/media/:id` - Delete media

**Projects** - Permission: `projects`
- `GET /api/admin/projects` - Get all
- `POST /api/admin/projects` - Create
- `PUT /api/admin/projects/:id` - Update
- `DELETE /api/admin/projects/:id` - Delete

**FAQ** - Permission: `faq`
- `GET /api/admin/faq` - Get all
- `POST /api/admin/faq` - Create
- `PUT /api/admin/faq/:id` - Update
- `DELETE /api/admin/faq/:id` - Delete

**Testimonials** - Permission: `testimonials`
- `GET /api/admin/testimonials` - Get all
- `POST /api/admin/testimonials` - Create
- `PUT /api/admin/testimonials/:id` - Update
- `DELETE /api/admin/testimonials/:id` - Delete

---

### Business Operations APIs

**Enrollments** - Permission: `enrollments`
- `GET /api/admin/enrollments` - Get all (with filters: page, limit, status, courseId)
- `GET /api/admin/enrollments/:id` - Get single
- `PUT /api/admin/enrollments/:id/status` - Update status (approved/rejected/pending)

**Messages** - Permission: `messages`
- `GET /api/admin/messages` - Get all
- `PUT /api/admin/messages/:id/read` - Mark as read
- `DELETE /api/admin/messages/:id` - Delete

**Partnership Requests** - Permission: `partnership_requests`
- `GET /api/admin/partnerships` - Get all
- `GET /api/admin/partnerships/:id` - Get single
- `PUT /api/admin/partnerships/:id/status` - Update status

**Contact Inquiries** - Permission: `contact_inquiries`
- `GET /api/admin/contact-inquiries` - Get all
- `GET /api/admin/contact-inquiries/:id` - Get single
- `PUT /api/admin/contact-inquiries/:id/status` - Update status

**Impact Stories** - Permission: `impact_stories`
- `GET /api/admin/impact-stories` - Get all
- `POST /api/admin/impact-stories` - Create
- `PUT /api/admin/impact-stories/:id` - Update
- `DELETE /api/admin/impact-stories/:id` - Delete

**Newsletter** - Permission: `newsletter`
- `GET /api/admin/newsletter/subscribers` - Get all subscribers
- `GET /api/admin/newsletter/export` - Export to CSV
- `POST /api/admin/newsletter/send` - Send newsletter campaign

---

## Public Pages APIs

### Newsletter Subscription

**Endpoint:** `POST /api/newsletter/subscribe`

**Component:** `src/components/pages/home/NewsletterHero.jsx`

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

---

## Response Format Standards

### IMPORTANT: Dynamic Configuration System

**⚠️ CRITICAL NOTE: NO HARDCODED VALUES IN FRONTEND**

The frontend does NOT hardcode ANY configuration values, API keys, or integration settings. ALL configurations are managed dynamically through the Super Admin Settings Dashboard.

**Examples of Dynamic Configurations:**
- Payment Gateway API Keys (Paystack, Flutterwave, etc.)
- Email Service API Keys (SendGrid, Mailgun, etc.)
- SMS Gateway API Keys
- Social Media Links
- Contact Information (email, phone, address)
- Analytics IDs (Google Analytics, Facebook Pixel, etc.)
- Third-party Service URLs
- Feature Flags
- System-wide settings

**How It Works:**
1. Super Admin logs into dashboard
2. Goes to Settings page (`/admin/settings`)
3. Enters/updates API keys, configurations, and settings
4. Backend stores these securely in database
5. Frontend fetches configurations via API when needed
6. Frontend uses these dynamic values instead of hardcoded ones

---

### Get System Settings

**Endpoint:** `GET /api/admin/settings`

**Headers:** `Authorization: Bearer {token}`

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "payment": {
      "paystack": {
        "publicKey": "pk_live_xxxxxxxxxxxxx",
        "secretKey": "sk_live_xxxxxxxxxxxxx",
        "enabled": true
      },
      "flutterwave": {
        "publicKey": "FLWPUBK-xxxxxxxxxxxxx",
        "secretKey": "FLWSECK-xxxxxxxxxxxxx",
        "enabled": false
      },
      "mobileMoney": {
        "enabled": true,
        "provider": "mtn"
      }
    },
    "email": {
      "provider": "sendgrid",
      "sendgrid": {
        "apiKey": "SG.xxxxxxxxxxxxx",
        "fromEmail": "noreply@zyratechhub.com",
        "fromName": "Zyra Tech Hub"
      },
      "mailgun": {
        "apiKey": "",
        "domain": "",
        "enabled": false
      }
    },
    "sms": {
      "provider": "twilio",
      "twilio": {
        "accountSid": "ACxxxxxxxxxxxxx",
        "authToken": "xxxxxxxxxxxxx",
        "phoneNumber": "+1234567890",
        "enabled": true
      }
    },
    "analytics": {
      "googleAnalytics": {
        "measurementId": "G-XXXXXXXXXX",
        "enabled": true
      },
      "facebookPixel": {
        "pixelId": "123456789012345",
        "enabled": false
      }
    },
    "contact": {
      "email": "info@zyratechhub.com",
      "phone": "+233 55 955 4261",
      "address": "Koforidua, Eastern Region, Ghana",
      "whatsapp": "+233559554261"
    },
    "social": {
      "facebook": "https://www.facebook.com/zyratechhub",
      "twitter": "https://x.com/zyratechhub",
      "linkedin": "https://www.linkedin.com/company/zyratechhub",
      "instagram": "https://www.instagram.com/zyratechhub",
      "youtube": ""
    },
    "features": {
      "maintenanceMode": false,
      "allowRegistrations": true,
      "allowPayments": true,
      "allowApplications": true
    },
    "metadata": {
      "siteName": "Zyra Tech Hub",
      "siteDescription": "Empowering Ghana's Future Through Technology",
      "siteUrl": "https://zyratechhub.com",
      "defaultCurrency": "GHS",
      "timezone": "Africa/Accra",
      "language": "en"
    }
  }
}
```

---

### Update System Settings (Super Admin Only)

**Endpoint:** `PUT /api/admin/settings`

**Headers:** `Authorization: Bearer {super_admin_token}`

**Request Body:** (Partial update supported)
```json
{
  "payment": {
    "paystack": {
      "publicKey": "pk_live_new_key_xxxxx",
      "secretKey": "sk_live_new_key_xxxxx",
      "enabled": true
    }
  },
  "email": {
    "provider": "sendgrid",
    "sendgrid": {
      "apiKey": "SG.new_api_key_xxxxx",
      "fromEmail": "support@zyratechhub.com",
      "fromName": "Zyra Tech Hub Support"
    }
  },
  "contact": {
    "email": "info@zyratechhub.com",
    "phone": "+233 55 955 4261"
  }
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "updatedFields": ["payment.paystack", "email.sendgrid", "contact"],
    "updatedAt": "2025-01-15T14:30:00.000Z"
  },
  "message": "Settings updated successfully"
}
```

---

### Get Public Settings (No Authentication)

**Endpoint:** `GET /api/settings/public`

**Description:** Returns non-sensitive settings for frontend use (e.g., contact info, social links, site metadata)

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "contact": {
      "email": "info@zyratechhub.com",
      "phone": "+233 55 955 4261",
      "address": "Koforidua, Eastern Region, Ghana",
      "whatsapp": "+233559554261"
    },
    "social": {
      "facebook": "https://www.facebook.com/zyratechhub",
      "twitter": "https://x.com/zyratechhub",
      "linkedin": "https://www.linkedin.com/company/zyratechhub",
      "instagram": "https://www.instagram.com/zyratechhub"
    },
    "metadata": {
      "siteName": "Zyra Tech Hub",
      "siteDescription": "Empowering Ghana's Future Through Technology",
      "siteUrl": "https://zyratechhub.com",
      "defaultCurrency": "GHS"
    },
    "features": {
      "maintenanceMode": false,
      "allowApplications": true
    },
    "payment": {
      "paystackPublicKey": "pk_live_xxxxxxxxxxxxx",
      "paystackEnabled": true,
      "flutterwaveEnabled": false,
      "mobileMoneyEnabled": true
    }
  }
}
```

**⚠️ SECURITY NOTE:** Only return PUBLIC keys and non-sensitive data. Secret keys MUST remain server-side only.

---

### Settings Categories in Admin Dashboard

The Super Admin Settings page should have these sections:

**1. Payment Gateway Settings**
- Paystack Configuration (Public Key, Secret Key, Webhook URL)
- Flutterwave Configuration (Public Key, Secret Key, Encryption Key)
- Mobile Money Configuration (Provider, Merchant Code)
- Enable/Disable toggles for each gateway

**2. Email Service Settings**
- Provider selection (SendGrid, Mailgun, SMTP)
- API Keys / SMTP credentials
- From Email and From Name
- Test email button

**3. SMS Gateway Settings**
- Provider selection (Twilio, Africa's Talking, etc.)
- API credentials
- Sender ID
- Test SMS button

**4. Analytics & Tracking**
- Google Analytics (Measurement ID)
- Facebook Pixel ID
- Other tracking scripts
- Enable/Disable toggles

**5. Contact Information**
- Business email
- Phone number
- WhatsApp number
- Physical address
- Map coordinates

**6. Social Media Links**
- Facebook URL
- Twitter/X URL
- LinkedIn URL
- Instagram URL
- YouTube URL

**7. Site Metadata**
- Site Name
- Site Description
- Site URL
- Default Currency
- Timezone
- Language

**8. Feature Flags**
- Maintenance Mode toggle
- Allow New Registrations toggle
- Allow Payments toggle
- Allow Applications toggle

**9. Security Settings**
- JWT Secret Key
- Token Expiry Duration
- Session Timeout
- Two-Factor Authentication toggle

**10. Business Rules**
- Enrollment Capacity Limits
- Payment Terms
- Refund Policy Settings
- Application Review Time (SLA)

---

### Frontend Implementation

**How Frontend Uses Dynamic Settings:**

```javascript
// Example: Frontend fetches settings on app load
import { useEffect, useState } from 'react';
import api from './services/api';

function App() {
  const [settings, setSettings] = useState(null);
  
  useEffect(() => {
    // Fetch public settings
    api.get('/settings/public')
      .then(response => {
        setSettings(response.data.data);
        // Use settings throughout the app
      });
  }, []);
  
  // Now use settings.contact.email instead of hardcoded email
  // Use settings.payment.paystackPublicKey for payments
  // Use settings.social.facebook for social links
}
```

**Payment Integration Example:**
```javascript
// Frontend gets Paystack public key from settings, NOT hardcoded
const initiatePayment = async (amount) => {
  const settings = await getPublicSettings();
  
  if (!settings.payment.paystackEnabled) {
    throw new Error('Payment system is currently disabled');
  }
  
  // Use dynamic public key
  const paystack = new PaystackPop();
  paystack.newTransaction({
    key: settings.payment.paystackPublicKey, // From backend settings
    amount: amount * 100,
    email: userEmail,
    // ...
  });
};
```

---

## Response Format Standards

### Success Response Structure
```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Optional success message"
}
```

### Error Response Structure
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      // Optional field-specific errors
      "field1": "Error message for field1"
    }
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Request validation failed
- `UNAUTHORIZED` - Not authenticated
- `FORBIDDEN` - Not authorized for this action
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Duplicate entry or conflict
- `INTERNAL_ERROR` - Server error
- `INVALID_CREDENTIALS` - Login failed
- `TOKEN_EXPIRED` - JWT token expired

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

---

## File Upload Specifications

### Accepted File Types
- **CV/Resume:** `.pdf`, `.doc`, `.docx` (max 5-10MB)
- **Documents:** `.pdf`, `.jpg`, `.jpeg`, `.png`, `.doc`, `.docx`
- **Images:** `.jpg`, `.jpeg`, `.png`, `.webp`

### Upload Handling
- Use `multipart/form-data` for file uploads
- Store files securely with unique identifiers
- Validate file size and type server-side
- Return file URL or path in response

---

## CORS Configuration

Frontend expects these CORS headers from backend:
```
Access-Control-Allow-Origin: https://zyratechhub.com (or specific origin)
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

---

## Rate Limiting Considerations

Frontend does not implement rate limiting. Backend should implement:
- Authentication endpoints: 5 requests per minute per IP
- Form submissions: 10 requests per hour per IP
- General API: 100 requests per minute per user

---

## Data Sources (Currently Static)

These data are currently stored in frontend files and should eventually be migrated to database:

1. **Training Courses:** `src/data/trainingCourses.js` - 16 courses with full details
2. **Blog Articles:** `src/data/articlesData.js` - Blog posts and articles
3. **Job Listings:** `src/data/jobsData.js` - Career opportunities
4. **Collaboration Models:** `src/data/collaborationModelsData.js` - Partnership models
5. **Partnership Types:** `src/data/partnershipsData.js` - Partnership categories and interests
6. **Gallery Albums:** `src/data/galleryAlbums.js` - Photo and video galleries
7. **Projects Data:** `src/data/projectsData.js` - Completed projects and case studies

When backend is ready, frontend will replace local imports with API calls.

### Future API Endpoints for Static Data:

**Blog/Articles:**
- `GET /api/blog/articles` - List all articles
- `GET /api/blog/articles/:id` - Get single article
- `POST /api/admin/blog/articles` - Create article (Admin)
- `PUT /api/admin/blog/articles/:id` - Update article (Admin)
- `DELETE /api/admin/blog/articles/:id` - Delete article (Admin)

**Jobs:**
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/:id` - Get single job
- `POST /api/admin/jobs` - Create job listing (Admin)
- `PUT /api/admin/jobs/:id` - Update job (Admin)
- `DELETE /api/admin/jobs/:id` - Delete job (Admin)

**Gallery:**
- `GET /api/gallery/albums` - List all albums
- `GET /api/gallery/albums/:id` - Get album with media
- `POST /api/admin/gallery/albums` - Create album (Admin)
- `POST /api/admin/gallery/media` - Upload media (Admin)
- `DELETE /api/admin/gallery/media/:id` - Delete media (Admin)

**Projects:**
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/admin/projects` - Create project (Admin)
- `PUT /api/admin/projects/:id` - Update project (Admin)
- `DELETE /api/admin/projects/:id` - Delete project (Admin)

**FAQs:**
- `GET /api/faq` - List all FAQs
- `POST /api/admin/faq` - Create FAQ (Admin)
- `PUT /api/admin/faq/:id` - Update FAQ (Admin)
- `DELETE /api/admin/faq/:id` - Delete FAQ (Admin)

**Testimonials:**
- `GET /api/testimonials` - List all testimonials
- `POST /api/admin/testimonials` - Create testimonial (Admin)
- `PUT /api/admin/testimonials/:id` - Update testimonial (Admin)
- `DELETE /api/admin/testimonials/:id` - Delete testimonial (Admin)

---

## Testing Endpoints

For development, create these test accounts:

**Super Admin:**
```
Email: superadmin@zyratech.com
Password: Super@123
Role: super_admin
Permissions: ALL
```

**Admin (Full Access Example):**
```
Email: admin@zyratech.com
Password: Admin@123
Role: admin
Permissions: ["blog_articles", "gallery", "training_courses", "payments"]
```

**Admin (Limited Access Example):**
```
Email: contentmanager@zyratech.com
Password: Content@123
Role: admin
Permissions: ["blog_articles", "testimonials"]
```

---

## Deployment Notes

- Frontend URL: `https://zyratechhub.com/`
- Frontend deployed on: Render (Docker container)
- Backend API base URL configured via: `VITE_API_BASE_URL` environment variable
- No hardcoded API URLs in codebase
- All API calls use the configured base URL from environment

---

## Contact for Questions

If you need clarification on any endpoint or data structure:
1. Check the component code for exact field names
2. Review Redux slice for API call implementation
3. Test with mock data first before integrating

**Good luck building the backend! 🚀**
