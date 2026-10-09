# PubFlow Customer Dashboard
## Complete Technical Specification & Architecture Document

**System:** PubFlow – Pub Management & Ordering System  
**Module:** Customer Dashboard (Customer-Facing)  
**Document Type:** Technical Architecture & Functional Specification  
**Prepared for:** Development & AI-Generated Diagrams  

---

## TABLE OF CONTENTS

1. System Overview
2. Technology Stack
3. Architecture Layers
4. User Types & Authentication
5. Core Features & Workflows
6. Data Models & Database Schema
7. API Architecture
8. QR Code & Session Management
9. Real-Time Order Tracking
10. Payment Integration
11. UI/UX Component Structure
12. Complete User Journeys
13. Business Rules & Validations
14. Error Handling Strategy
15. Deployment & Environments
16. Security Considerations
17. Performance Optimization
18. Monitoring & Analytics

---

## PART 1: SYSTEM OVERVIEW

### 1.1 What is PubFlow?

PubFlow is a **table-based ordering system** for pubs/restaurants where:

- **Customers** scan a QR code on their table
- **System** identifies the pub, branch, and table
- **Customers** browse menu, order, and pay via mobile
- **Staff** receives orders in real-time and updates order status
- **Customers** track orders and can place additional orders in same session

### 1.2 Primary Goal

Make ordering at a pub **fast, convenient, and mobile-first** without customers needing to wait for staff.

### 1.3 Core Principle

```
Scan QR → Browse Menu → Select Products → Add to Cart → 
Checkout → Pay → Place Order → Track → Receive → 
Order Again (same session)
```

---

## PART 2: TECHNOLOGY STACK

### Frontend (Customer Dashboard)

- **Framework:** React 18+ / Vue 3 (or similar SPA)
- **State Management:** Redux / Vuex / Context API
- **Styling:** Tailwind CSS / Material UI / Custom CSS
- **UI Library:** React Native / Flutter (for native mobile, optional)
- **API Client:** Axios / Fetch API
- **Real-Time:** WebSocket / Socket.io / Server-Sent Events (SSE)
- **QR Scanner:** react-qr-reader / qr-scanner
- **Payment Integration:** SDKs from payment providers (MTN, Telecel, etc.)

### Backend (Separate Service)

- **Runtime:** Node.js / Python / Java
- **Framework:** Express / FastAPI / Spring Boot
- **Database:** PostgreSQL / MySQL
- **Cache:** Redis (for sessions, cart data, order status)
- **Real-Time:** WebSocket server / Socket.io
- **Authentication:** JWT tokens
- **Payment Gateway:** Integration layer (Stripe, Paystack, Flutterwave, etc.)

### Infrastructure

- **Hosting:** AWS / GCP / Azure / On-premise
- **CDN:** CloudFlare / AWS CloudFront
- **Monitoring:** CloudWatch / Datadog / New Relic
- **Logging:** ELK Stack / Datadog / Splunk
- **Message Queue:** Redis / RabbitMQ (for order notifications)

---

## PART 3: ARCHITECTURE LAYERS

### 3.1 Layered Architecture

```
┌─────────────────────────────────────────────────────┐
│  CUSTOMER DEVICE (Mobile/Web Browser)               │
│  ┌───────────────────────────────────────────────┐  │
│  │ React SPA (Customer Dashboard)                │  │
│  │ ├── QR Scanner Component                      │  │
│  │ ├── Home / Menu / Cart / Orders / Account    │  │
│  │ ├── Redux State Management                    │  │
│  │ ├── WebSocket Client (Real-time updates)     │  │
│  │ └── Payment Integration UI                    │  │
│  └───────────────────────────────────────────────┘  │
│                      ↕ HTTPS / WSS                  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  CDN (CloudFlare / CloudFront)                      │
│  ├── Static assets (HTML, CSS, JS)                 │
│  └── Image cache (product images)                  │
│                      ↕ HTTPS                       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  API GATEWAY & LOAD BALANCER                        │
│  ├── Request routing                               │
│  ├── Rate limiting                                 │
│  ├── SSL/TLS termination                          │
│  └── API versioning (v1, v2)                      │
│                      ↕ HTTP/2                      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  BACKEND APPLICATION LAYER                          │
│  ├── Customer Controller                           │
│  ├── Order Service                                 │
│  ├── Payment Service                               │
│  ├── Product Service                               │
│  ├── Session Service                               │
│  ├── Notification Service                          │
│  └── Authentication Middleware                     │
│                      ↕                              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  DATA LAYER                                         │
│  ├── PostgreSQL Database                           │
│  ├── Redis Cache (sessions, cart, orders)         │
│  └── Message Queue (order events)                  │
│                                                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  EXTERNAL SERVICES                                  │
│  ├── Payment Gateway (Stripe, Paystack)           │
│  ├── SMS Service (Twilio / AWS SNS)               │
│  ├── Email Service (SendGrid)                      │
│  └── Analytics (Mixpanel / Segment)               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 3.2 Frontend Architecture

```
Customer Dashboard SPA
│
├── Views/Pages
│   ├── QRLanding
│   ├── HomeScreen
│   ├── MenuBrowser
│   ├── ProductDetails
│   ├── ShoppingCart
│   ├── Checkout
│   ├── PaymentMethod
│   ├── OrderConfirmation
│   ├── OrderTracking
│   ├── Orders
│   ├── Account/Profile
│   ├── OrderHistory
│   ├── Receipt
│   ├── CallStaff
│   ├── Notifications
│   ├── Feedback
│   └── Login/Registration
│
├── Components
│   ├── ProductCard
│   ├── CategoryFilter
│   ├── SearchBar
│   ├── CartIcon
│   ├── OrderCard
│   ├── NotificationToast
│   ├── Modal/Dialog
│   ├── Button/Input
│   ├── StatusIndicator
│   ├── PriceDisplay
│   └── ProgressTracker
│
├── State Management (Redux)
│   ├── authSlice (user, token, guest ID)
│   ├── sessionSlice (pub, branch, table, session ID)
│   ├── cartSlice (items, total, modifications)
│   ├── orderSlice (active orders, history)
│   ├── productSlice (menu, categories, search results)
│   ├── paymentSlice (selected method, status)
│   ├── uiSlice (notifications, loading, modals)
│   └── notificationSlice (order updates)
│
├── Services (API Layer)
│   ├── authService (login, register, guest)
│   ├── sessionService (QR validation, session creation)
│   ├── productService (menu, categories, search)
│   ├── cartService (add/remove items)
│   ├── orderService (create, track, history)
│   ├── paymentService (process payment)
│   ├── staffService (call waiter, requests)
│   ├── feedbackService (submit feedback)
│   └── api (axios interceptors, token refresh)
│
├── Utilities
│   ├── qrDecoder (parse QR code token)
│   ├── priceCalculator (subtotal, tax, service charge)
│   ├── orderValidator (validate order before submit)
│   ├── dateFormatter (format timestamps)
│   └── errorHandler (error messages)
│
└── Hooks
    ├── useAuth (authentication)
    ├── useSession (session management)
    ├── useCart (cart operations)
    ├── useOrder (order operations)
    ├── useWebSocket (real-time updates)
    └── useNotifications (toast notifications)
```

---

## PART 4: USER TYPES & AUTHENTICATION

### 4.1 Guest Customer Flow

```
Customer scans QR
    ↓
QR contains: pub_id + branch_id + table_id + secure_token
    ↓
Backend validates token & table
    ↓
System creates guest session
    ├── Guest ID (unique identifier)
    ├── Session ID
    ├── Pub/Branch/Table info
    ├── Session start time
    └── No user account needed
    
Customer can:
├── Browse menu
├── Search
├── Add to cart
├── Place orders
├── Pay
├── Track orders
└── BUT: No order history, no loyalty, no profile
```

### 4.2 Registered Customer Flow

```
Customer scans QR (or logs in)
    ↓
System checks for existing session
    ↓
If logged in:
├── Retrieve customer account
├── Load customer preferences
├── Show order history link
├── Show rewards/loyalty
├── Personalize experience
└── Attach to same table session

If not logged in:
├── Show login/register option
├── Customer can skip (continue as guest)
└── Or sign up quickly
    ├── Email/Phone only (minimal friction)
    ├── Password
    └── Get customer profile
```

### 4.3 Authentication Method

**JWT Tokens:**

```
Login/Register
    ↓
Backend validates credentials
    ↓
Backend generates:
├── accessToken (15-60 min lifetime)
├── refreshToken (7-30 days lifetime)
└── customer info
    
Frontend stores:
├── accessToken in memory/sessionStorage
├── refreshToken in secure httpOnly cookie
└── customer profile in Redux
    
Each API request:
├── Attach: Authorization: Bearer <accessToken>
└── If 401 received:
    ├── Use refreshToken to get new accessToken
    ├── Retry original request
    └── If refresh fails → redirect to login

Logout:
├── Clear tokens
├── Clear Redux state
└── Clear session (on backend)
```

---

## PART 5: CORE FEATURES & WORKFLOWS

### 5.1 QR Code & Session Initialization

```
┌─ QR Code Structure ─────────────────────────────┐
│                                                 │
│ https://pubflow.app/table/[SECURE_TOKEN]      │
│                                                 │
│ OR embedded data in QR:                         │
│ {                                               │
│   "pub_id": "pub_123",                         │
│   "branch_id": "branch_456",                   │
│   "table_id": "table_12",                      │
│   "token": "sec_abc123xyz",                    │
│   "expires_at": "2026-10-08T23:59:59Z"        │
│ }                                               │
└─────────────────────────────────────────────────┘

Flow:
1. Customer scans QR code
2. Frontend extracts token data
3. Frontend makes API call: POST /api/sessions/validate
   ├── Send: token, pub_id, branch_id, table_id
   └── Receive: session_id, pub_info, table_info
4. Backend validates:
   ├── Token signature valid?
   ├── Token not expired?
   ├── Table exists & is available?
   ├── Pub & branch active?
   └── Table not already occupied by another session?
5. Backend creates session record
6. Frontend stores session in Redux
7. Frontend redirects to Home Dashboard
8. Pub staff can now see: "Table 12 – Customer connected"
```

### 5.2 Menu Browsing & Product Discovery

```
Home Dashboard Load
    ↓
Frontend calls: GET /api/products/menu
├── Params: session_id, pub_id, branch_id
├── Backend retrieves:
│   ├── All active products for pub
│   ├── Current prices
│   ├── Availability status
│   ├── Product categories
│   └── Special offers
└── Response: Menu data structure

Frontend displays:
├── Product categories (horizontal scroll)
├── Featured section
├── Popular section
├── Special offers section
└── Search bar

Customer actions:
├── Tap category → show products in category
├── Tap product → open details modal
├── Search → real-time results
└── Tap add → add to cart
```

### 5.3 Shopping Cart Management

```
Redux cartSlice structure:
{
  "items": [
    {
      "id": "cart_item_1",
      "product_id": "prod_123",
      "product_name": "Guinness",
      "quantity": 2,
      "unit_price": 25.00,
      "variant": { "size": "500ml" },
      "add_ons": [],
      "special_instructions": "",
      "subtotal": 50.00
    }
  ],
  "totals": {
    "subtotal": 95.00,
    "service_charge": 0.00,
    "tax": 0.00,
    "discount": 0.00,
    "total": 95.00
  }
}

Customer can:
├── Increase quantity
├── Decrease quantity
├── Remove item
├── Edit item
├── Continue shopping
└── View cart total
```

### 5.4 Payment Integration

```
Payment Methods:

MOBILE MONEY:
├── Select provider (MTN, Telecel, AT)
├── Enter phone number
├── Backend initiates payment via SDK
├── Customer confirms on phone
├── Backend receives callback
└── Order proceeds if successful

CARD PAYMENT:
├── Display secure card form
├── Frontend creates payment token
├── Send token to backend (NOT card data)
├── Backend charges via gateway
└── Order proceeds if successful

CASH PAYMENT:
├── Customer selects "Pay with Cash"
├── Order created with payment_status: "pending"
├── Staff notified to collect cash
├── Staff marks payment as received
└── Payment status updates on customer screen
```

### 5.5 Real-Time Order Tracking

```
WebSocket Connection established
    ↓
Customer subscribes to: order:updates:PF-1048
    ↓
Staff updates order status (e.g., "Confirmed")
    ↓
Backend emits WebSocket event to customer
    ↓
Frontend receives & updates:
├── Redux state
├── Component re-renders
├── Visual progress bar updated
└── Notification shown

Customer sees progress:
✓ Order Received
✓ Confirmed
● Preparing
○ Ready
○ Served
```

---

## PART 6: DATA MODELS & DATABASE SCHEMA

### Core Database Tables

```
PUB
├── pub_id (PK)
├── name
├── logo_url
├── currency
├── status
└── created_at

BRANCH
├── branch_id (PK)
├── pub_id (FK)
├── name
├── location
└── status

TABLE
├── table_id (PK)
├── branch_id (FK)
├── table_number
├── qr_code_token
├── status
└── current_session_id

PRODUCT
├── product_id (PK)
├── pub_id (FK)
├── category_id (FK)
├── name
├── description
├── image_url
├── base_price
├── is_available
├── variants (JSON)
├── add_ons (JSON)
└── updated_at

CUSTOMER
├── customer_id (PK)
├── pub_id (FK)
├── phone_number
├── email
├── name
├── password_hash
├── loyalty_points
└── created_at

SESSION
├── session_id (PK)
├── pub_id (FK)
├── branch_id (FK)
├── table_id (FK)
├── customer_id (FK, nullable)
├── guest_id (nullable)
├── status (active/closed/expired)
└── expires_at

ORDER
├── order_id (PK)
├── order_number (unique: PF-XXXX)
├── session_id (FK)
├── pub_id (FK)
├── table_id (FK)
├── items (JSON)
├── subtotal
├── service_charge
├── tax
├── total
├── order_status
├── payment_status
├── payment_method
├── created_at
└── completed_at

PAYMENT
├── payment_id (PK)
├── order_id (FK)
├── amount
├── currency
├── payment_method
├── payment_status (pending/success/failed)
├── provider_reference
├── created_at
└── processed_at

NOTIFICATION
├── notification_id (PK)
├── session_id (FK)
├── order_id (FK, nullable)
├── type (order_confirmed, order_ready, etc)
├── title
├── message
├── is_read
└── created_at

FEEDBACK
├── feedback_id (PK)
├── order_id (FK)
├── rating (1-5)
├── comment
└── created_at
```

---

## PART 7: API ARCHITECTURE

### RESTful Endpoints

```
AUTHENTICATION
├── POST /api/auth/register
├── POST /api/auth/login
├── POST /api/auth/logout
├── POST /api/auth/refresh-token
└── POST /api/auth/guest

SESSION MANAGEMENT
├── POST /api/sessions/validate (QR validation)
├── GET /api/sessions/{session_id}
└── POST /api/sessions/{session_id}/close

PRODUCTS & MENU
├── GET /api/products/menu
├── GET /api/products/search
├── GET /api/products/categories
├── GET /api/products/{product_id}
├── GET /api/products/featured
└── GET /api/products/specials

ORDERS
├── POST /api/orders (create order)
├── GET /api/orders/{session_id}
├── GET /api/orders/{order_id}
├── GET /api/orders/{order_id}/receipt
└── GET /api/customer/orders (order history)

PAYMENTS
├── POST /api/payments/mobile-money
├── POST /api/payments/card
└── GET /api/payments/{payment_id}/status

CUSTOMER PROFILE
├── GET /api/customer/profile
├── PUT /api/customer/profile
├── GET /api/customer/history
├── GET /api/customer/receipts
└── GET /api/customer/loyalty

NOTIFICATIONS
├── GET /api/notifications
├── PUT /api/notifications/{id}/read
└── DELETE /api/notifications/{id}

STAFF REQUESTS
├── POST /api/staff/request
└── GET /api/staff/requests/{session_id}

FEEDBACK
└── POST /api/feedback
```

### WebSocket Events

```
Client subscribes to:
├── order:updates:{order_id}
├── session:updates:{session_id}
├── table:status:{table_id}
└── notifications:{session_id}

Server emits:
├── order_status_update
├── payment_status_update
├── notification
└── staff_attended
```

---

## PART 8: COMPLETE USER JOURNEY

### Happy Path: Scan → Order → Pay → Track → Receive

```
1. Arrival
   └── Customer scans QR code
       └── App opens, identifies Table 12
           └── "Welcome to The Lounge"

2. Browse Menu
   └── Customer sees categories, special offers
       └── Taps "Beer" category
           └── Shows available beers

3. Select Product
   └── Taps "Guinness – GHS 25.00"
       └── Selects quantity: 2
           └── "Add to Cart – GHS 50.00"
               └── Cart now shows (2) items

4. More Shopping
   └── Browses food
       └── Taps "Chicken Wings – GHS 45.00"
           └── Selects: Spicy sauce, no onions
               └── "Add to Cart – GHS 45.00"
                   └── Cart now shows (3) items – GHS 95.00

5. Checkout
   └── Reviews cart
       └── Taps "Proceed to Checkout"
           └── Sees final total: GHS 95.00
               └── Confirms table 12

6. Payment Method
   └── Selects: Mobile Money
       └── Enters phone: +233XXXXXXXXX
           └── Selects provider: MTN
               └── "Proceed to Payment"

7. Payment Processing
   └── "Processing payment..."
       └── Customer confirms on phone
           └── "Payment Successful ✓"

8. Order Confirmation
   └── "Order Confirmed ✓"
       └── Order #PF-1048
           └── Table 12
               └── Total: GHS 95.00
                   └── "Your order sent to pub"

9. Order Tracking
   └── Customer taps "Track Order"
       └── Sees progress:
           ├── ✓ Order Received
           ├── ✓ Confirmed
           ├── ● Preparing
           ├── ○ Ready
           └── ○ Served
               └── Estimated: ~5 minutes

10. Order Ready
    └── Kitchen marks: "Ready"
        └── Customer notification: "Order Ready! 🎉"
            └── Progress updated

11. Order Served
    └── Waiter delivers
        └── Waiter marks: "Served"
            └── Customer sees: Order Complete ✓

12. Feedback & More Orders
    └── "How was your experience?" 
        └── Customer rates: 5 stars
            └── OR taps "Order More"
                └── Back to menu
                    └── Places order #PF-1062
                        └── Both orders in session

13. Session Complete
    └── Customer leaves
        └── Views receipt
            └── Session Total: GHS 145.00
                └── "Thank you for dining!"
```

---

## PART 9: BUSINESS RULES

### Essential Rules

```
TABLE MANAGEMENT
├── Each table has unique QR code
├── QR codes expire/rotate annually
├── Table can't be double-booked
└── Table status: available/occupied/maintenance

SESSION MANAGEMENT
├── Session starts with QR scan
├── One session per table at a time
├── Session TTL: 6-24 hours (configurable)
├── Session auto-expires on inactivity
└── Multiple orders per session allowed

PRODUCT MANAGEMENT
├── Products belong to specific pub
├── Prices must match pub/branch
├── Unavailable products cannot be ordered
├── Availability checked at order placement
└── Variants & add-ons tied to products

ORDER RULES
├── Unique order number (PF-XXXX)
├── Multiple orders allowed per session
├── Cannot edit order after placement
└── Order history kept for registered customers

PAYMENT RULES
├── Payment must be verified by backend
├── Payment must happen before "preparing"
├── Cannot process same payment twice
├── Payment amount must match order total
├── Payment status separate from order status
└── Payment confirmation from provider (not device)

PRICING RULES
├── Prices always set by backend
├── Customer cannot modify prices
├── Total recalculated before order submission
└── Final amount confirmed at checkout
```

---

## PART 10: SECURITY CONSIDERATIONS

```
AUTHENTICATION
├── JWT tokens (access + refresh)
├── HTTP-only cookies for refresh token
├── Secure password hashing (bcrypt/argon2)
├── Rate limiting on login attempts
└── Session timeout & automatic logout

AUTHORIZATION
├── Role-based access control
├── Customer: can only access own orders
├── Guest: limited to current session
└── No cross-table access

DATA SECURITY
├── HTTPS/TLS for all communication
├── Encrypt sensitive fields in database
├── No PII in logs
├── No card data stored anywhere
└── Database backups encrypted

QR CODE SECURITY
├── Token signed with HMAC-SHA256
├── Token includes timestamp
├── Token expires (regenerate yearly)
├── Prevent replay attacks
└── Validate signature server-side

PAYMENT SECURITY
├── PCI DSS compliance
├── No card data stored in database
├── Use payment gateway tokens only
├── Verify payment on backend
└── HTTPS for all payment data
```

---

## SUMMARY

**PubFlow Customer Dashboard is:**
- ✅ Mobile-first ordering system
- ✅ Table-based via QR codes
- ✅ Real-time order tracking
- ✅ Multiple payment methods
- ✅ Guest & registered customers
- ✅ Session-based cart management
- ✅ Digital receipts & feedback
- ✅ Staff assistance requests
- ✅ WebSocket real-time updates
- ✅ Production-ready security

**This document provides everything for:**
1. UI/UX design
2. Database schema
3. API development
4. Frontend implementation
5. Architecture diagrams
6. Deployment planning
7. Security implementation
8. Performance optimization
