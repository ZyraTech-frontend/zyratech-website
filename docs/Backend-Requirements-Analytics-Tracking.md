# Backend Requirements: Analytics & Tracking Features
**ZyraTech Website - Admin Panel Enhancement**  
**Date:** January 2024  
**Status:** Frontend Complete - Backend Integration Required

---

## 📋 Table of Contents
1. [Overview](#overview)
2. [Settings API Enhancements](#settings-api-enhancements)
3. [Analytics Tracking APIs](#analytics-tracking-apis)
4. [Database Schema Requirements](#database-schema-requirements)
5. [Email Integration Requirements](#email-integration-requirements)
6. [Technical Implementation Notes](#technical-implementation-notes)

---

## 🎯 Overview

We've completed comprehensive frontend UIs for internal analytics tracking, user journey monitoring, and abandoned form recovery. This document outlines all backend API endpoints and database structures needed to support these features.

### Frontend Pages Completed
✅ **Settings Page** - Enhanced with 4 new tabs:
- Contact Information (HR + Training Team)
- Social Media Management (8 platforms with icons)
- Analytics & SEO Settings (External tracking IDs + Internal analytics config)
- Navigation & Footer (awaiting backend)

✅ **Tracking Pages** - 3 new pages in admin panel:
- `/admin/tracking/website-analytics` - Internal traffic dashboard
- `/admin/tracking/user-journeys` - Individual user path tracking
- `/admin/tracking/abandoned-forms` - Course registration recovery

---

## 🔧 Settings API Enhancements

### Existing Endpoint
```
GET/PUT /api/settings
```

### NEW Fields Required (Add to existing settings response)

#### 1. Contact Information
```json
{
  // Existing HR contact
  "hrName": "string",
  "hrEmail": "string",
  "hrTitle": "string",
  
  // NEW: Additional HR field
  "hrPhone": "string",
  
  // NEW: Training Team Contact
  "trainingTeamName": "string",
  "trainingTeamEmail": "string",
  "trainingTeamPhone": "string",
  
  // Primary Contact (existing)
  "primaryEmail": "string",
  "primaryPhone": "string",
  "whatsappNumber": "string",
  "address": "string",
  "businessHours": "string"
}
```

#### 2. Social Media Links
```json
{
  // Existing platforms
  "socialLinkedIn": "string (URL)",
  "socialTwitter": "string (URL)",
  "socialInstagram": "string (URL)",
  "socialFacebook": "string (URL)",
  "socialYouTube": "string (URL)",
  
  // NEW: Additional platforms
  "socialTikTok": "string (URL)",
  "socialGitHub": "string (URL)",
  "socialWhatsApp": "string (URL)"
}
```

#### 3. Analytics & SEO Settings
```json
{
  // External Analytics Tracking IDs
  "googleAnalyticsId": "string (GA4 measurement ID)",
  "googleTagManagerId": "string (GTM container ID)",
  "metaPixelId": "string (Facebook/Meta Pixel ID)",
  "hotjarSiteId": "string (Hotjar site ID)",
  
  // Internal Analytics Configuration
  "enableInternalAnalytics": "boolean (default: false)",
  "trackUserJourneys": "boolean (default: false)",
  "saveAbandonedForms": "boolean (default: false)",
  
  // Abandoned Form Email Recovery
  "abandonedFormEmailEnabled": "boolean (default: false)",
  "abandonedFormEmailDelay": "number (minutes, default: 60)",
  "abandonedFormMaxAttempts": "number (default: 3)",
  "abandonedFormEmailSubject": "string",
  "abandonedFormEmailTemplate": "string (HTML with variables)",
  
  // SEO Settings
  "seoTitle": "string",
  "seoDescription": "string",
  "seoKeywords": "string",
  "seoOgImage": "string (URL)"
}
```

**Email Template Variables Supported:**
- `{userName}` - User's full name
- `{formType}` - Type of form abandoned
- `{completionLink}` - URL to resume registration
- `{courseName}` - Name of course (if applicable)

---

## 📊 Analytics Tracking APIs

### 1. Website Analytics Endpoint

Track all website traffic and engagement metrics.

#### POST `/api/analytics/track-pageview`
Records a page view with user session data.

**Request Body:**
```json
{
  "sessionId": "string (UUID)",
  "userId": "string (if authenticated) | null",
  "userEmail": "string | null",
  "url": "string",
  "title": "string",
  "referrer": "string | null",
  "device": "Desktop | Mobile | Tablet",
  "browser": "string",
  "os": "string",
  "location": {
    "country": "string",
    "city": "string",
    "coordinates": {
      "lat": "number",
      "lng": "number"
    }
  },
  "timestamp": "ISO 8601 datetime"
}
```

**Response:**
```json
{
  "success": true,
  "pageviewId": "string (UUID)"
}
```

#### GET `/api/analytics/website-stats`
Get aggregated website analytics data.

**Query Parameters:**
- `dateRange`: `today` | `7days` | `30days` | `90days`
- `startDate`: ISO date (for custom range)
- `endDate`: ISO date (for custom range)

**Response:**
```json
{
  "stats": {
    "totalVisitors": "number",
    "visitorsChange": "number (percentage)",
    "pageViews": "number",
    "pageViewsChange": "number (percentage)",
    "avgSessionDuration": "string (formatted time)",
    "sessionChange": "number (percentage)",
    "bounceRate": "number (percentage)",
    "bounceChange": "number (percentage)",
    "uniqueUsers": "number",
    "usersChange": "number (percentage)",
    "conversions": "number",
    "conversionsChange": "number (percentage)"
  },
  "topPages": [
    {
      "path": "string",
      "title": "string",
      "views": "number",
      "uniqueVisitors": "number",
      "avgTime": "string",
      "bounceRate": "number"
    }
  ],
  "trafficSources": [
    {
      "source": "Direct | Organic Search | Social Media | Referral | Email",
      "visitors": "number",
      "percentage": "number",
      "change": "number"
    }
  ],
  "deviceBreakdown": [
    {
      "device": "Desktop | Mobile | Tablet",
      "visitors": "number",
      "percentage": "number",
      "avgSession": "string"
    }
  ],
  "locationData": [
    {
      "country": "string",
      "flag": "string (emoji)",
      "visitors": "number",
      "percentage": "number"
    }
  ],
  "engagementMetrics": {
    "avgPagesPerSession": "number",
    "newVsReturning": "string (65% / 35%)",
    "conversionRate": "number (percentage)",
    "exitRate": "number (percentage)"
  }
}
```

---

### 2. User Journey Tracking Endpoints

Track complete user paths through the website.

#### POST `/api/analytics/track-journey-action`
Records an action in a user's journey.

**Request Body:**
```json
{
  "sessionId": "string (UUID)",
  "userId": "string | null",
  "userEmail": "string | null",
  "actionType": "pageview | click | scroll | form_start | form_submit | conversion",
  "url": "string",
  "pageTitle": "string",
  "elementId": "string | null",
  "elementText": "string | null",
  "device": "string",
  "browser": "string",
  "location": "string",
  "timestamp": "ISO 8601 datetime"
}
```

**Response:**
```json
{
  "success": true,
  "actionId": "string (UUID)"
}
```

#### GET `/api/analytics/user-journeys`
Get list of user journeys with filtering.

**Query Parameters:**
- `status`: `all` | `converted` | `abandoned` | `active`
- `dateRange`: `today` | `7days` | `30days` | `custom`
- `startDate`: ISO date
- `endDate`: ISO date
- `page`: number (pagination)
- `limit`: number (default: 20)

**Response:**
```json
{
  "stats": {
    "total": "number",
    "converted": "number",
    "abandoned": "number",
    "active": "number",
    "avgDuration": "string",
    "conversionRate": "number"
  },
  "journeys": [
    {
      "id": "string (UUID)",
      "userId": "string | null",
      "userEmail": "string | null",
      "status": "converted | abandoned | active",
      "startTime": "ISO 8601 datetime",
      "endTime": "ISO 8601 datetime | null",
      "duration": "string",
      "device": "string",
      "browser": "string",
      "location": "string",
      "totalPages": "number",
      "actions": "number",
      "conversionType": "string | null",
      "pages": [
        {
          "url": "string",
          "title": "string",
          "time": "string",
          "duration": "string"
        }
      ]
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "totalPages": "number"
  }
}
```

#### GET `/api/analytics/user-journeys/:journeyId`
Get detailed information for a specific journey.

**Response:**
```json
{
  "id": "string",
  "userId": "string | null",
  "userName": "string | null",
  "userEmail": "string | null",
  "status": "string",
  "startTime": "ISO 8601 datetime",
  "endTime": "ISO 8601 datetime | null",
  "duration": "string",
  "device": "string",
  "browser": "string",
  "location": "string",
  "totalPages": "number",
  "totalActions": "number",
  "conversionType": "string | null",
  "conversionValue": "number | null",
  "pages": [
    {
      "url": "string",
      "title": "string",
      "entryTime": "ISO 8601 datetime",
      "exitTime": "ISO 8601 datetime",
      "duration": "string",
      "scrollDepth": "number (percentage)",
      "actions": [
        {
          "type": "string",
          "elementId": "string | null",
          "elementText": "string | null",
          "timestamp": "ISO 8601 datetime"
        }
      ]
    }
  ]
}
```

---

### 3. Abandoned Forms Tracking Endpoints

Track incomplete form submissions and enable recovery.

#### POST `/api/analytics/track-form-abandonment`
Records when a user abandons a form.

**Request Body:**
```json
{
  "sessionId": "string (UUID)",
  "userId": "string | null",
  "formType": "Course Registration | Contact Form | Partnership Request",
  "formData": {
    "firstName": "string | null",
    "lastName": "string | null",
    "email": "string | null",
    "phone": "string | null",
    "course": "string | null",
    "schedule": "string | null"
    // ... any other captured fields
  },
  "lastStep": "string",
  "totalSteps": "number",
  "completedSteps": "number",
  "completionPercentage": "number",
  "device": "string",
  "browser": "string",
  "location": "string",
  "abandonedAt": "ISO 8601 datetime"
}
```

**Response:**
```json
{
  "success": true,
  "formId": "string (UUID)"
}
```

#### GET `/api/analytics/abandoned-forms`
Get list of abandoned forms with filtering.

**Query Parameters:**
- `status`: `all` | `pending` | `contacted` | `recovered` | `expired`
- `dateRange`: `today` | `7days` | `30days` | `custom`
- `startDate`: ISO date
- `endDate`: ISO date
- `formType`: filter by form type
- `page`: number
- `limit`: number (default: 20)

**Response:**
```json
{
  "stats": {
    "total": "number",
    "pending": "number",
    "contacted": "number",
    "recovered": "number",
    "expired": "number",
    "recoveryRate": "number (percentage)",
    "avgCompletionRate": "number (percentage)"
  },
  "forms": [
    {
      "id": "string (UUID)",
      "userId": "string | null",
      "userName": "string",
      "userEmail": "string",
      "formType": "string",
      "courseName": "string | null",
      "abandonedAt": "ISO 8601 datetime",
      "completionPercentage": "number",
      "lastStep": "string",
      "totalSteps": "number",
      "completedSteps": "number",
      "device": "string",
      "browser": "string",
      "location": "string",
      "status": "pending | contacted | recovered | expired",
      "emailsSent": "number",
      "lastEmailSent": "ISO 8601 datetime | null",
      "formData": {
        // Captured form fields
      }
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "totalPages": "number"
  }
}
```

#### POST `/api/analytics/abandoned-forms/:formId/send-recovery-email`
Manually send a recovery email for an abandoned form.

**Request Body:**
```json
{
  "useTemplate": "boolean (use template from settings)",
  "customSubject": "string | null (override template subject)",
  "customMessage": "string | null (override template body)"
}
```

**Response:**
```json
{
  "success": true,
  "emailSent": true,
  "sentAt": "ISO 8601 datetime",
  "totalEmailsSent": "number"
}
```

#### PUT `/api/analytics/abandoned-forms/:formId/status`
Update the status of an abandoned form (e.g., mark as recovered).

**Request Body:**
```json
{
  "status": "pending | contacted | recovered | expired"
}
```

**Response:**
```json
{
  "success": true,
  "form": {
    "id": "string",
    "status": "string",
    "updatedAt": "ISO 8601 datetime"
  }
}
```

---

## 🗄️ Database Schema Requirements

### 1. Settings Table Enhancement
```sql
-- Add new columns to existing settings table
ALTER TABLE settings ADD COLUMN hr_phone VARCHAR(50);
ALTER TABLE settings ADD COLUMN training_team_name VARCHAR(255);
ALTER TABLE settings ADD COLUMN training_team_email VARCHAR(255);
ALTER TABLE settings ADD COLUMN training_team_phone VARCHAR(50);

ALTER TABLE settings ADD COLUMN social_tiktok VARCHAR(500);
ALTER TABLE settings ADD COLUMN social_github VARCHAR(500);
ALTER TABLE settings ADD COLUMN social_whatsapp VARCHAR(500);

ALTER TABLE settings ADD COLUMN google_tag_manager_id VARCHAR(100);
ALTER TABLE settings ADD COLUMN hotjar_site_id VARCHAR(100);
ALTER TABLE settings ADD COLUMN enable_internal_analytics BOOLEAN DEFAULT FALSE;
ALTER TABLE settings ADD COLUMN track_user_journeys BOOLEAN DEFAULT FALSE;
ALTER TABLE settings ADD COLUMN save_abandoned_forms BOOLEAN DEFAULT FALSE;

ALTER TABLE settings ADD COLUMN abandoned_form_email_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE settings ADD COLUMN abandoned_form_email_delay INT DEFAULT 60;
ALTER TABLE settings ADD COLUMN abandoned_form_max_attempts INT DEFAULT 3;
ALTER TABLE settings ADD COLUMN abandoned_form_email_subject VARCHAR(500);
ALTER TABLE settings ADD COLUMN abandoned_form_email_template TEXT;
```

### 2. New Tables Required

#### page_views
```sql
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  user_email VARCHAR(255),
  url VARCHAR(2048) NOT NULL,
  title VARCHAR(500),
  referrer VARCHAR(2048),
  device VARCHAR(50),
  browser VARCHAR(100),
  os VARCHAR(100),
  country VARCHAR(100),
  city VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_session (session_id),
  INDEX idx_user (user_id),
  INDEX idx_url (url),
  INDEX idx_created (created_at)
);
```

#### user_journeys
```sql
CREATE TABLE user_journeys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  user_email VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active', -- active, converted, abandoned
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  duration_seconds INT,
  device VARCHAR(50),
  browser VARCHAR(100),
  country VARCHAR(100),
  city VARCHAR(100),
  total_pages INT DEFAULT 0,
  total_actions INT DEFAULT 0,
  conversion_type VARCHAR(100),
  conversion_value DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_session (session_id),
  INDEX idx_user (user_id),
  INDEX idx_status (status),
  INDEX idx_created (created_at)
);
```

#### journey_actions
```sql
CREATE TABLE journey_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id UUID NOT NULL REFERENCES user_journeys(id) ON DELETE CASCADE,
  action_type VARCHAR(50) NOT NULL, -- pageview, click, scroll, form_start, form_submit, conversion
  url VARCHAR(2048) NOT NULL,
  page_title VARCHAR(500),
  element_id VARCHAR(255),
  element_text VARCHAR(500),
  scroll_depth INT,
  timestamp TIMESTAMP NOT NULL,
  INDEX idx_journey (journey_id),
  INDEX idx_type (action_type),
  INDEX idx_timestamp (timestamp)
);
```

#### abandoned_forms
```sql
CREATE TABLE abandoned_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  journey_id UUID REFERENCES user_journeys(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  user_name VARCHAR(255),
  user_email VARCHAR(255) NOT NULL,
  form_type VARCHAR(100) NOT NULL,
  course_name VARCHAR(255),
  form_data JSONB NOT NULL,
  last_step VARCHAR(255),
  total_steps INT,
  completed_steps INT,
  completion_percentage INT,
  device VARCHAR(50),
  browser VARCHAR(100),
  country VARCHAR(100),
  city VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending', -- pending, contacted, recovered, expired
  emails_sent INT DEFAULT 0,
  last_email_sent_at TIMESTAMP,
  abandoned_at TIMESTAMP NOT NULL,
  recovered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_session (session_id),
  INDEX idx_user (user_id),
  INDEX idx_email (user_email),
  INDEX idx_status (status),
  INDEX idx_abandoned (abandoned_at)
);
```

---

## 📧 Email Integration Requirements

### Abandoned Form Recovery Email System

**Trigger Conditions:**
1. When `saveAbandonedForms` is enabled in settings
2. When `abandonedFormEmailEnabled` is enabled in settings
3. Form completion percentage ≥ 25% (configurable)
4. User has valid email address

**Email Schedule:**
- **First Email:** After `abandonedFormEmailDelay` minutes (default: 60 minutes)
- **Second Email:** 24 hours after first email (if not recovered)
- **Third Email:** 48 hours after second email (if not recovered)
- **Max Attempts:** Configured in `abandonedFormMaxAttempts` (default: 3)

**Email Template Processing:**
Replace variables in `abandonedFormEmailTemplate`:
- `{userName}` → User's full name from form data
- `{formType}` → Type of form (e.g., "Course Registration")
- `{completionLink}` → Deep link to resume form with pre-filled data
- `{courseName}` → Name of course (if applicable)

**Example Email Template:**
```html
<h2>Hi {userName},</h2>
<p>We noticed you started but didn't complete your {formType} for <strong>{courseName}</strong>.</p>
<p>Would you like to pick up where you left off?</p>
<a href="{completionLink}" style="background:#004fa2;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;">
  Complete Your Registration
</a>
<p>If you have questions, our team is here to help!</p>
```

**Cron Job Requirements:**
```
# Check for abandoned forms every 15 minutes
*/15 * * * * /path/to/check-abandoned-forms.sh

# Mark expired forms (no activity for 7 days)
0 2 * * * /path/to/expire-abandoned-forms.sh
```

---

## ⚙️ Technical Implementation Notes

### 1. Performance Considerations
- **Indexing:** All timestamp and foreign key columns must be indexed
- **Partitioning:** Consider partitioning `page_views` and `journey_actions` by month
- **Data Retention:** Archive data older than 12 months to separate storage
- **Batch Processing:** Process analytics updates in batches to reduce database load

### 2. Privacy & GDPR Compliance
- **User Consent:** Track analytics only if user accepted cookies
- **IP Anonymization:** Store location (country/city) but not raw IP addresses
- **Data Deletion:** Provide endpoints to delete user journey data on request
- **Session Expiry:** Auto-expire sessions after 30 minutes of inactivity

### 3. API Rate Limiting
```
POST /api/analytics/* endpoints:
- Rate Limit: 100 requests per minute per session
- Burst: Allow up to 200 requests in 10 seconds
```

### 4. Real-time Updates
For "Active Now" stats on Website Analytics dashboard:
- Use Redis/Memcached to track active sessions
- Session expires after 5 minutes of no activity
- Update counter every 30 seconds

### 5. Error Handling
All analytics endpoints should:
- Return 200 OK even if tracking fails (don't break user experience)
- Log errors for debugging but don't expose to client
- Use fire-and-forget pattern for tracking requests

### 6. Testing Requirements
- **Unit Tests:** All API endpoints and email template rendering
- **Integration Tests:** End-to-end journey tracking flow
- **Load Tests:** Simulate 1000 concurrent users tracking pageviews
- **Email Tests:** Verify template variables and delivery

---

## 📦 Frontend Integration Points

### JavaScript Tracking Code
Frontend will send tracking requests from:
1. **Public Pages:** `src/components/common/AnalyticsTracker.jsx` (to be created)
2. **Form Pages:** `src/components/common/FormAbandonmentTracker.jsx` (to be created)

### Settings Integration
Frontend already reads settings from:
```
GET /api/settings
```

Contact info displayed on:
- `src/components/pages/contact/ContactHero.jsx` ✅ (already integrated)

### Admin Dashboard Integration
Three new admin pages (already built) will consume these endpoints:
- `src/pages/admin/tracking/WebsiteAnalyticsPage.jsx`
- `src/pages/admin/tracking/UserJourneysPage.jsx`
- `src/pages/admin/tracking/AbandonedFormsPage.jsx`

---

## 🚀 Implementation Priority

### Phase 1: Core Settings (High Priority)
- [ ] Add new fields to settings API
- [ ] Add database columns for settings
- [ ] Test settings CRUD operations

### Phase 2: Basic Analytics (Medium Priority)
- [ ] Create page_views table and tracking endpoint
- [ ] Create website analytics aggregation endpoint
- [ ] Test data collection and reporting

### Phase 3: User Journeys (Medium Priority)
- [ ] Create user_journeys and journey_actions tables
- [ ] Implement journey tracking endpoints
- [ ] Test journey recording and retrieval

### Phase 4: Abandoned Forms (High Priority - Revenue Impact)
- [ ] Create abandoned_forms table
- [ ] Implement form abandonment tracking
- [ ] Build email recovery system with cron jobs
- [ ] Test email template rendering and delivery

### Phase 5: Optimization (Low Priority)
- [ ] Add database indexes and partitioning
- [ ] Implement caching layer for real-time stats
- [ ] Set up data archival process

---

## 📞 Questions or Clarifications?

Contact Frontend Team:
- For UI/UX questions about the tracking pages
- For clarification on data display requirements
- For testing the admin panel once APIs are ready

---

**Document Version:** 1.0  
**Last Updated:** January 2024  
**Status:** Ready for Backend Implementation
