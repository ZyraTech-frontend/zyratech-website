# 🎯 SEO Canonical Fixes - Quick Reference Guide

## Problem
Google Search Console: `"Duplicate without user-selected canonical"` for zyratechhub.com

## Root Causes
1. No static canonical tag on homepage (before JavaScript loads)
2. No HTTP → HTTPS redirect
3. No WWW → Non-WWW redirect
4. No canonical HTTP header in response
5. Trailing slash inconsistency

---

## ✅ Solutions Applied

### **Solution #1: HTML Head - Static Canonical Tag**

**File:** `index.html`

Add this line to the `<head>` section (around line 13):

```html
<link rel="canonical" href="https://zyratechhub.com/" />
```

**Complete Example:**
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="/zyrateclogopng.webp" />
  <link rel="preload" as="image" href="/images/hero1.webp" fetchpriority="high" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Zyra Tech Hub - Empowering Ghana's Future Through Technology</title>
  <meta name="description" content="..." />
  <link rel="canonical" href="https://zyratechhub.com/" />  ← ADD THIS LINE
  ...
</head>
```

---

### **Solution #2: Nginx Configuration - Complete Config**

**File:** `nginx.conf`

Replace entire file with:

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name ~^(?:www\.)?zyratechhub\.com$ _;
    return 301 https://$host$request_uri;
}

# Main HTTPS Server
server {
    listen 443 ssl http2;
    server_name zyratechhub.com www.zyratechhub.com;

    # SSL configuration (when using certificates)
    # ssl_certificate /etc/letsencrypt/live/zyratechhub.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/zyratechhub.com/privkey.pem;
    # ssl_protocols TLSv1.2 TLSv1.3;
    # ssl_ciphers HIGH:!aNULL:!MD5;

    root /usr/share/nginx/html;
    index index.html;

    # CRITICAL: Redirect www to non-www
    if ($host = "www.zyratechhub.com") {
        return 301 https://zyratechhub.com$request_uri;
    }

    # CRITICAL: Add Canonical Header
    add_header Link '<https://zyratechhub.com$request_uri>; rel="canonical"' always;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # React SPA handling
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Disable favicon logging
    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }
}
```

---

### **Solution #3: Apache .htaccess - Alternative Deployment**

**File:** `public/.htaccess`

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # HTTP to HTTPS
    RewriteCond %{HTTPS} off
    RewriteCond %{HTTP_HOST} !^localhost [NC]
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

    # WWW to Non-WWW
    RewriteCond %{HTTP_HOST} ^www\.zyratechhub\.com$ [NC]
    RewriteRule ^(.*)$ https://zyratechhub.com/$1 [L,R=301]

    # Trailing slash removal
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} !/(sitemap\.xml|robots\.txt) [NC]
    RewriteCond %{REQUEST_URI} /(.+)/$ [NC]
    RewriteRule ^(.+)/$ /$1 [L,R=301]

    # React SPA fallback
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ index.html [QSA,L]
</IfModule>

# Canonical Header
<IfModule mod_headers.c>
    Header always add Link "<https://zyratechhub.com%{REQUEST_URI}e>; rel=\"canonical\"" env=1
</IfModule>
```

---

## 🧪 Testing Commands

### **Test 1: Verify Canonical Tag on Homepage**
```bash
curl -s https://zyratechhub.com/ | grep -i "rel.*canonical"
```
**Expected:** Should show the canonical link tag

### **Test 2: Verify HTTP Redirect**
```bash
curl -i http://zyratechhub.com/ 2>&1 | head -20
```
**Expected:** `HTTP/1.1 301` and `Location: https://zyratechhub.com/`

### **Test 3: Verify WWW Redirect**
```bash
curl -i https://www.zyratechhub.com/ 2>&1 | head -20
```
**Expected:** `HTTP/1.1 301` and `Location: https://zyratechhub.com/`

### **Test 4: Verify Canonical Header**
```bash
curl -i https://zyratechhub.com/ 2>&1 | grep -i "link:"
```
**Expected:** `Link: <https://zyratechhub.com/>; rel="canonical"`

### **Test 5: Check Subpage Canonical**
```bash
curl -s https://zyratechhub.com/about | grep -i "rel.*canonical"
```
**Expected:** `<link rel="canonical" href="https://zyratechhub.com/about" />`

---

## 🚀 Deployment Steps

1. **Update index.html** with static canonical tag
2. **Deploy nginx.conf** to production container
3. **Reload Nginx:**
   ```bash
   docker exec <container-id> nginx -s reload
   ```
4. **Run tests** (see Testing Commands above)
5. **Submit sitemap** to Google Search Console (again)
6. **Request recrawl:**
   - Go to Search Console → Coverage
   - Select duplicate URLs → "Request Indexing"
7. **Monitor:** Check back in 7-14 days

---

## 🎯 What Each Fix Does

| Fix | What It Does | Why It Matters |
|-----|-------------|----------------|
| **Static Canonical** | Tells Google homepage's canonical BEFORE JS | Non-JS crawlers see canonical immediately |
| **HTTP Redirect** | Forces all HTTP → HTTPS | Only HTTPS version gets indexed |
| **WWW Redirect** | Forces www → non-www | Only one version get indexed |
| **Canonical Header** | Adds canonical to HTTP response | Crawlers that don't execute JS see it |
| **useSEO Hook** | Dynamically sets canonicals on subpages | Each page tells Google its own canonical |

---

## 📊 Expected Results

**Before:**
- Google finds: zyratechhub.com, www.zyratechhub.com, http versions
- Google marks them as duplicates
- Search Console shows "Duplicate without user-selected canonical"

**After:**
- Google finds: zyratechhub.com (primary)
- All other versions (www, http) redirect to primary
- Google indexes only: https://zyratechhub.com (non-www)
- Search Console shows: ✅ 0 duplicate errors

---

## ❓ FAQ

**Q: Why do we need BOTH static and dynamic canonicals?**
A: 
- Static canonical in index.html: For crawlers that don't execute JavaScript
- Dynamic canonical from useSEO: For pages loaded by React Router
- Both ensure every version of the URL has a canonical tag

**Q: Will this affect my current rankings?**
A: No, 301 redirects pass 100% of link equity. Rankings should stay the same.

**Q: How long until Google fixes the duplicates?**
A: 7-14 days typically. Google needs to recrawl and reprocess.

**Q: The sitemap.xml is already using https://zyratechhub.com/ - why are there duplicates?**
A: The sitemap lists the correct URLs, but if your server was serving BOTH the www and non-www versions without 301s, Google indexed both as separate pages.

---

## 🔗 Resources

- [Google Search Console - Canonicalization](https://support.google.com/webmasters/answer/139066)
- [RFC 6596 - Canonical Header](https://tools.ietf.org/html/rfc6596)
- [Nginx Redirect Configuration](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html)
- [Apache mod_rewrite Guide](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)

---

**Status:** ✅ All fixes applied  
**Last Updated:** March 30, 2026
