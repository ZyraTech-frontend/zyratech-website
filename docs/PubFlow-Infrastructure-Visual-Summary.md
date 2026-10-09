# PubFlow - Infrastructure Visual Summary

## 🎯 Complete System Architecture (Simplified)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    PUBFLOW INFRASTRUCTURE                                     │
│                              Table-Based Pub Ordering System                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────┘


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  1️⃣  DEVELOPMENT & SOURCE CONTROL                                                           ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

     👨‍💻 Developer
         │
         ├──► 💻 IDE (Local Dev)
         │      • Node.js 20+ / Python 3.10+ / Java 17+
         │      • React 18 / Vue 3 (Frontend)
         │      • Express / FastAPI / Spring Boot (Backend)
         │      • npm run dev / python -m flask run
         │
         ├──► 🐳 Docker Compose (Multi-container)
         │      • Container 1: Frontend (React, port 3000)
         │      • Container 2: Backend API (port 5000/8080)
         │      • Container 3: PostgreSQL (port 5432)
         │      • Container 4: Redis (port 6379)
         │      • Container 5: WebSocket Server (port 8081)
         │
         └──► 📦 GitHub Repository
                • Version control
                • Branch: main / develop
                • Triggers CI/CD
                • Stores: Frontend + Backend code


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  2️⃣  CI/CD PIPELINE (GitHub Actions) - Total: ~15 minutes                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

   Push to main
        │
        ▼
   ┌─────────────────────────────────────────────────────────────┐
   │  ⚡ TRIGGER: Webhook from GitHub                            │
   └───────────────────────────┬─────────────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
   ┌──────────┐          ┌──────────┐          ┌──────────────┐
   │FRONTEND  │          │ BACKEND  │          │  DATABASE    │
   │  BUILD   │          │  BUILD   │          │  MIGRATION   │
   │          │          │  &       │          │              │
   │• Vite    │          │ TYPECHECK│          │ • Auto-apply │
   │• ESLint  │          │          │          │   migrations │
   │• Test    │          │ • Unit   │          │ • Seed data  │
   │          │          │   tests  │          │              │
   └────┬─────┘          └────┬─────┘          └──────┬───────┘
        │                     │                       │
        │ ✓ Compiled          │ ✓ All tests pass      │ ✓ Applied
        │                     │                       │
        └─────────────────────┼───────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │ DOCKER BUILD │ │   SECURITY   │ │ PERFORMANCE  │
        │              │ │   SCAN       │ │   TEST       │
        │ Frontend     │ │              │ │              │
        │ Image        │ │ • Vuln scan  │ │ • Load test  │
        │              │ │ • OWASP deps │ │ • E2E tests  │
        │ Backend      │ │              │ │              │
        │ Image        │ │              │ │              │
        │              │ │              │ │              │
        └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
               │                │                │
               └────────────────┼────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │  CONTAINER REGISTRY   │
                    │  (Azure ACR / ECR)    │
                    │                       │
                    │ • pubflow-frontend    │
                    │   :latest, :SHA tag   │
                    │                       │
                    │ • pubflow-backend     │
                    │   :latest, :SHA tag   │
                    │                       │
                    │ • pubflow-ws-server   │
                    │   :latest, :SHA tag   │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │  KUBERNETES CLUSTER   │
                    │  or Docker Swarm      │
                    │                       │
                    │ • Rolling deployment  │
                    │ • Auto-scaling        │
                    │ • Service discovery   │
                    │ • Health probes       │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │  NOTIFICATIONS        │
                    │                       │
                    │ 💬 Slack              │
                    │ 📧 Email              │
                    │ 🎮 Discord            │
                    │ 📱 SMS (optional)     │
                    └───────────────────────┘


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  3️⃣  PRODUCTION ENVIRONMENT (Multi-Layer Architecture)                                      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

   ┌──────────────────────────────────────────────────────────────────────────┐
   │  🌐 CDN & LOAD BALANCER (CloudFlare / AWS CloudFront + ALB)              │
   │  ┌────────────────────────────────────────────────────────────────────┐  │
   │  │ • Global edge locations                                             │  │
   │  │ • DDoS protection                                                   │  │
   │  │ • SSL/TLS termination                                              │  │
   │  │ • Route to:                                                         │  │
   │  │   - api.pubflow.com → Backend API                                   │  │
   │  │   - app.pubflow.com → Frontend SPA                                  │  │
   │  │   - ws.pubflow.com → WebSocket Server                              │  │
   │  └────────────────────────┬───────────────────────────────────────────┘  │
   │                           │                                              │
   │                           │                                              │
   │  ┌────────────────────────▼───────────────────────────────────────────┐  │
   │  │  ☁️  KUBERNETES CLUSTER (Production)                                │  │
   │  │  ┌──────────────────────────────────────────────────────────────┐  │  │
   │  │  │  🐳 Frontend Pod (Replica Set: 3 instances)                  │  │  │
   │  │  │  ┌────────────────────────────────────────────────────────┐  │  │  │
   │  │  │  │  React 18 SPA                                           │  │  │  │
   │  │  │  │  • Vite build output (static assets)                    │  │  │  │
   │  │  │  │  • Nginx reverse proxy                                  │  │  │  │
   │  │  │  │  • Port 3000                                            │  │  │  │
   │  │  │  │  • HPA: 1-10 replicas (CPU/memory-based)               │  │  │  │
   │  │  │  │                                                          │  │  │  │
   │  │  │  │  Features:                                              │  │  │  │
   │  │  │  │  ├─ QR code scanner (react-qr-reader)                  │  │  │  │
   │  │  │  │  ├─ Real-time order status (WebSocket)                │  │  │  │
   │  │  │  │  ├─ Shopping cart (Redux)                              │  │  │  │
   │  │  │  │  ├─ Payment UI integration                             │  │  │  │
   │  │  │  │  ├─ Mobile-first responsive design                     │  │  │  │
   │  │  │  │  └─ Offline support (Service Workers)                 │  │  │  │
   │  │  │  └────────────────────────────────────────────────────────┘  │  │  │
   │  │  └──────────────────────────────────────────────────────────────┘  │  │
   │  │                                                                      │  │
   │  │  ┌──────────────────────────────────────────────────────────────┐  │  │
   │  │  │  🐳 Backend API Pod (Replica Set: 5 instances)               │  │  │
   │  │  │  ┌────────────────────────────────────────────────────────┐  │  │  │
   │  │  │  │  Express.js / FastAPI / Spring Boot                    │  │  │  │
   │  │  │  │  • Port 5000 / 8080                                    │  │  │  │
   │  │  │  │  • HPA: 2-20 replicas (load-based)                    │  │  │  │
   │  │  │  │                                                          │  │  │  │
   │  │  │  │  25+ Modules/Endpoints:                               │  │  │  │
   │  │  │  │  ├─ Authentication & JWT                              │  │  │  │
   │  │  │  │  ├─ Pub & Branch Management                           │  │  │  │
   │  │  │  │  ├─ Menu & Product Management                         │  │  │  │
   │  │  │  │  ├─ QR Code Generation & Validation                   │  │  │  │
   │  │  │  │  ├─ Session Management (Table sessions)               │  │  │  │
   │  │  │  │  ├─ Shopping Cart (Redis-backed)                      │  │  │  │
   │  │  │  │  ├─ Order Processing & Status Updates                 │  │  │  │
   │  │  │  │  ├─ Payment Processing (Multiple providers)            │  │  │  │
   │  │  │  │  ├─ Real-time Notifications (WebSocket)               │  │  │  │
   │  │  │  │  ├─ Order History & Analytics                         │  │  │  │
   │  │  │  │  ├─ Staff Management                                  │  │  │  │
   │  │  │  │  └─ Admin Dashboard APIs                              │  │  │  │
   │  │  │  │                                                          │  │  │  │
   │  │  │  │  Security:                                             │  │  │  │
   │  │  │  │  ├─ JWT + Refresh tokens                              │  │  │  │
   │  │  │  │  ├─ CORS (whitelist: app.pubflow.com)                 │  │  │  │
   │  │  │  │  ├─ Rate limiting (1000 req/min per IP)               │  │  │  │
   │  │  │  │  ├─ Input validation & sanitization                   │  │  │  │
   │  │  │  │  ├─ Helmet.js security headers                        │  │  │  │
   │  │  │  │  └─ SSL/TLS encryption                                │  │  │  │
   │  │  │  └────────────────────────────────────────────────────────┘  │  │  │
   │  │  └──────────────────────────────────────────────────────────────┘  │  │
   │  │                                                                      │  │
   │  │  ┌──────────────────────────────────────────────────────────────┐  │  │
   │  │  │  🐳 WebSocket Server Pod (Replica Set: 2 instances)          │  │  │
   │  │  │  ┌────────────────────────────────────────────────────────┐  │  │  │
   │  │  │  │  Socket.io / ws (Node.js)                             │  │  │  │
   │  │  │  │  • Port 8081                                          │  │  │  │
   │  │  │  │  • Redis adapter (for pod-to-pod communication)       │  │  │  │
   │  │  │  │                                                          │  │  │  │
   │  │  │  │  Handles:                                              │  │  │  │
   │  │  │  │  ├─ Order status updates (real-time)                  │  │  │  │
   │  │  │  │  ├─ Order notifications to customers                  │  │  │  │
   │  │  │  │  ├─ Kitchen display system feed                       │  │  │  │
   │  │  │  │  ├─ Order ready alerts                                │  │  │  │
   │  │  │  │  └─ Live order tracking                               │  │  │  │
   │  │  │  └────────────────────────────────────────────────────────┘  │  │  │
   │  │  └──────────────────────────────────────────────────────────────┘  │  │
   │  │                                                                      │  │
   │  │  ┌──────────────────────────────────────────────────────────────┐  │  │
   │  │  │  🔌 Services & Storage (StatefulSets)                         │  │  │
   │  │  │                                                               │  │  │
   │  │  │  PostgreSQL (1 master, 2 replicas):                         │  │  │
   │  │  │  ├─ Port 5432                                              │  │  │
   │  │  │  ├─ Persistent Volume: 100GB+                              │  │  │
   │  │  │  ├─ Daily automated backups                                │  │  │
   │  │  │  ├─ Point-in-time recovery (PITR)                          │  │  │
   │  │  │  └─ Connection pooling (max 200 connections)               │  │  │
   │  │  │                                                               │  │  │
   │  │  │  Redis Cluster (3 nodes, 3 replicas):                      │  │  │
   │  │  │  ├─ Port 6379                                              │  │  │
   │  │  │  ├─ Persistent storage (AOF)                               │  │  │
   │  │  │  ├─ 50GB memory allocated                                  │  │  │
   │  │  │  ├─ Auto-failover enabled                                  │  │  │
   │  │  │  └─ Used for:                                              │  │  │
   │  │  │     • Session cache                                        │  │  │
   │  │  │     • Shopping carts                                       │  │  │
   │  │  │     • Rate limiting counters                               │  │  │
   │  │  │     • WebSocket adapter (pub/sub)                          │  │  │
   │  │  │     • Order status temporary cache                         │  │  │
   │  │  └──────────────────────────────────────────────────────────────┘  │  │
   │  │                                                                      │  │
   │  │  Kubernetes Features:                                               │  │
   │  │  ├─ Service mesh (Istio, optional)                                 │  │
   │  │  ├─ Ingress controller (manage routes)                             │  │
   │  │  ├─ ConfigMaps (environment variables)                             │  │
   │  │  ├─ Secrets (API keys, passwords - encrypted)                      │  │
   │  │  ├─ Network policies (pod-to-pod communication)                    │  │
   │  │  ├─ Resource quotas (CPU/memory limits)                            │  │
   │  │  ├─ Persistent volume claims (databases)                           │  │
   │  │  ├─ Horizontal Pod Autoscaler (HPA)                               │  │
   │  │  ├─ Health probes (liveness, readiness)                           │  │
   │  │  ├─ Rolling updates (no downtime deployments)                     │  │
   │  │  └─ Monitoring via Prometheus + Grafana                            │  │
   │  └──────────────────────────────────────────────────────────────────┘  │
   │                                                                        │
   │  ┌──────────────────────────────────────────────────────────────────┐  │
   │  │  🔌 EXTERNAL INTEGRATIONS (Outside cluster)                       │  │
   │  │                                                                   │  │
   │  │  Payment Gateways:                                               │  │
   │  │  ├─ MTN Mobile Money API                                         │  │
   │  │  │  • Webhook: /api/webhooks/mtn                                │  │
   │  │  │  • Callback: payment_completed, payment_failed              │  │
   │  │  │                                                               │  │
   │  │  ├─ Telecel / Vodafone Mobile Money API                          │  │
   │  │  │  • Webhook: /api/webhooks/telecel                            │  │
   │  │  │  • Callback: payment_completed, payment_failed              │  │
   │  │  │                                                               │  │
   │  │  ├─ Card Payment (Paystack / Stripe / Square)                    │  │
   │  │  │  • Webhook: /api/webhooks/card-payment                       │  │
   │  │  │  • Callback: charge.complete, charge.failed                 │  │
   │  │  │                                                               │  │
   │  │  └─ Cash Payment (Manual confirmation)                           │  │
   │  │     • API: POST /api/orders/:id/payment/cash                    │  │
   │  │     • Requires staff confirmation                               │  │
   │  │                                                                   │  │
   │  │  Email Service:                                                  │  │
   │  │  ├─ SendGrid / AWS SES                                           │  │
   │  │  ├─ Order confirmation emails                                    │  │
   │  │  ├─ Payment receipts                                             │  │
   │  │  └─ Password reset / notifications                              │  │
   │  │                                                                   │  │
   │  │  SMS Service (optional):                                         │  │
   │  │  ├─ Twilio / AWS SNS                                             │  │
   │  │  ├─ Order ready alerts                                           │  │
   │  │  └─ OTP for authentication                                       │  │
   │  │                                                                   │  │
   │  │  Cloud Storage:                                                  │  │
   │  │  ├─ AWS S3 / Google Cloud Storage                                │  │
   │  │  ├─ Menu images                                                  │  │
   │  │  ├─ Product photos                                               │  │
   │  │  ├─ Receipts (PDF)                                               │  │
   │  │  └─ Reports & exports                                            │  │
   │  │                                                                   │  │
   │  │  Analytics:                                                       │  │
   │  │  ├─ Mixpanel / Amplitude                                         │  │
   │  │  ├─ User behavior tracking                                       │  │
   │  │  ├─ Order analytics                                              │  │
   │  │  └─ Revenue insights                                             │  │
   │  │                                                                   │  │
   │  │  Logging & Monitoring:                                           │  │
   │  │  ├─ ELK Stack / Datadog                                          │  │
   │  │  ├─ Application logs                                             │  │
   │  │  ├─ Error tracking (Sentry)                                      │  │
   │  │  ├─ APM (Application Performance Monitoring)                     │  │
   │  │  └─ Uptime monitoring (StatusPage.io)                            │  │
   │  │                                                                   │  │
   │  │  Notifications:                                                  │  │
   │  │  ├─ Slack (admin alerts)                                         │  │
   │  │  ├─ Discord (staff notifications)                                │  │
   │  │  ├─ Firebase Cloud Messaging (push notifications)                │  │
   │  │  └─ In-app notifications                                         │  │
   │  └──────────────────────────────────────────────────────────────────┘  │
   │                                                                        │
   └────────────────────────────────────────────────────────────────────────┘


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  4️⃣  CUSTOMER USER JOURNEY (Core Workflow)                                                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

   ┌─────────────────────────────────────────────────────────────────────┐
   │  STEP 1: ARRIVAL AT PUB (Scan QR Code)                              │
   └─────────────────────────────────────────────────────────────────────┘

   Customer arrives at table → Sees QR code sticker → Opens phone camera
        │
        ▼
   Can scan directly or opens pubflow.com/qr
        │
        ▼
   Frontend: GET /api/qr/validate?code=ABC123DEF456
        │
        ▼
   Backend validates QR → Returns:
        {
          "pub_id": "pub_001",
          "branch_id": "branch_gh_001",
          "table_id": "table_5",
          "table_name": "Table 5",
          "session_id": "sess_xyz789",
          "session_created_at": "2024-10-08T14:30:00Z"
        }
        │
        ▼
   Frontend creates session cookie + localStorage
        │
        ▼
   ✅ Customer logged in without account (anonymous session)


   ┌─────────────────────────────────────────────────────────────────────┐
   │  STEP 2: BROWSE MENU                                                │
   └─────────────────────────────────────────────────────────────────────┘

   Frontend: GET /api/menus/:pub_id/categories
        │
        ▼
   Backend returns:
        [
          { "id": "cat_1", "name": "Drinks", "icon": "🍺" },
          { "id": "cat_2", "name": "Appetizers", "icon": "🍟" },
          { "id": "cat_3", "name": "Mains", "icon": "🍗" },
          { "id": "cat_4", "name": "Desserts", "icon": "🍰" }
        ]
        │
        ▼
   Customer clicks category → Frontend: GET /api/menus/:pub_id/products?category=cat_1
        │
        ▼
   Backend returns 50+ products with:
        - name, description, price, image
        - dietary info (vegan, gluten-free, spicy)
        - availability status (in_stock / out_of_stock)
        │
        ▼
   ✅ Customer browses products on mobile-optimized UI


   ┌─────────────────────────────────────────────────────────────────────┐
   │  STEP 3: ADD TO CART & CHECKOUT                                     │
   └─────────────────────────────────────────────────────────────────────┘

   Customer selects product → Clicks "Add to Cart"
        │
        ▼
   Frontend: POST /api/cart/add
        {
          "session_id": "sess_xyz789",
          "product_id": "prod_001",
          "quantity": 2,
          "special_instructions": "Extra ice"
        }
        │
        ▼
   Backend:
        1. Validates product exists & availability
        2. Checks cart not exceeding size limits
        3. Stores in Redis (session_id:cart)
        4. Returns updated cart
        │
        ▼
   Frontend updates Redux state → Shows cart badge (2 items)
        │
        ▼
   Customer clicks "Proceed to Checkout" → See cart items, total price
        │
        ▼
   Customer can modify quantities or remove items


   ┌─────────────────────────────────────────────────────────────────────┐
   │  STEP 4: PLACE ORDER                                                │
   └─────────────────────────────────────────────────────────────────────┘

   Customer confirms order → Frontend: POST /api/orders/create
        {
          "session_id": "sess_xyz789",
          "cart_items": [...],
          "special_instructions": "Please hurry",
          "payment_method": "mobile_money"  // or "card" / "cash"
        }
        │
        ▼
   Backend:
        1. Creates order record (status: pending_payment)
        2. Reserves inventory
        3. Emits WebSocket event: "order_created" → Kitchen display
        4. Sends order to backend: "ORDER_RECEIVED"
        5. Returns: order_id, total_price, order_reference
        │
        ▼
   Frontend displays: "Order confirmed! Order ID: ORD-2024-001"
        │
        ▼
   ✅ Order created, awaiting payment


   ┌─────────────────────────────────────────────────────────────────────┐
   │  STEP 5: PAYMENT PROCESSING                                         │
   └─────────────────────────────────────────────────────────────────────┘

   Option A: MOBILE MONEY (MTN / Telecel)
   ───────────────────────────────────────

   Customer enters phone number → Frontend: POST /api/payments/mobile-money/initiate
        {
          "order_id": "ORD-2024-001",
          "phone_number": "+233551234567",
          "amount": 125.50,
          "provider": "mtn"
        }
        │
        ▼
   Backend initiates MTN payment → Returns payment_reference
        │
        ▼
   Frontend shows: "Dial *170# on your phone OR wait for prompt"
        │
        ▼
   Customer completes payment on phone
        │
        ▼
   MTN → Webhook: POST /api/webhooks/mtn/payment
        {
          "status": "completed",
          "reference": "MTN-ABC123",
          "amount": 125.50,
          "order_id": "ORD-2024-001"
        }
        │
        ▼
   Backend:
        1. Verifies webhook signature
        2. Creates payment record (status: completed)
        3. Updates order status: pending_payment → confirmed
        4. Emits WebSocket: "payment_confirmed" → Kitchen
        5. Sends receipt email
        │
        ▼
   Frontend receives WebSocket event → Shows "Payment confirmed! ✅"
        │
        ▼
   ✅ Payment complete


   Option B: CARD PAYMENT (Paystack / Stripe)
   ──────────────────────────────────────────

   Customer clicks "Pay with Card" → Frontend redirects to payment page
        │
        ▼
   Backend: POST /api/payments/card/create-intent
        {
          "order_id": "ORD-2024-001",
          "amount": 125.50,
          "currency": "GHS"
        }
        │
        ▼
   Paystack returns: client_secret + payment_url
        │
        ▼
   Frontend: Uses Paystack SDK or redirects to payment_url
        │
        ▼
   Customer enters card details on Paystack (PCI-compliant hosted page)
        │
        ▼
   Paystack → Webhook: POST /api/webhooks/paystack/payment
        │
        ▼
   Backend processes → Updates order → Emits WebSocket
        │
        ▼
   ✅ Payment complete


   Option C: CASH PAYMENT
   ─────────────────────

   Customer clicks "Pay Later / At Counter"
        │
        ▼
   Frontend: POST /api/orders/:id/payment/cash
        {
          "order_id": "ORD-2024-001",
          "payment_method": "cash"
        }
        │
        ▼
   Backend:
        1. Updates order: status: confirmed, payment_status: pending_cash
        2. Prints receipt with QR code
        3. Emits WebSocket: "order_confirmed_cash" → Staff
        │
        ▼
   Staff sees order + note "Customer paying at counter"
        │
        ▼
   Kitchen starts preparing order
        │
        ▼
   Customer confirms payment at counter when receiving order
        │
        ▼
   Staff: POST /api/orders/:id/payment/confirm-cash → order payment_status: completed
        │
        ▼
   ✅ Payment complete


   ┌─────────────────────────────────────────────────────────────────────┐
   │  STEP 6: REAL-TIME ORDER TRACKING                                   │
   └─────────────────────────────────────────────────────────────────────┘

   After payment, customer can watch order status live:
        │
        ▼
   Frontend subscribes to WebSocket: ws://ws.pubflow.com/orders/:order_id
        │
        ▼
   Kitchen staff receives order → Updates status: "preparing"
        │
        ▼
   WebSocket broadcast to customer: "Your order is being prepared 👨‍🍳"
        │
        ▼
   Customer sees live status update on phone (no page refresh needed!)
        │
        ▼
   Order ready → Staff updates: "ready"
        │
        ▼
   WebSocket broadcast: "Your order is ready! Come to counter 📍"
        │
        ▼
   Push notification (if opted in) + in-app alert + sound
        │
        ▼
   Customer collects order from counter
        │
        ▼
   ✅ Order fulfilled


   ┌─────────────────────────────────────────────────────────────────────┐
   │  STEP 7: ORDER AGAIN (Same Session)                                 │
   └─────────────────────────────────────────────────────────────────────┘

   Customer finishes order, wants more
        │
        ▼
   Clicks "Browse Menu" again (same session remains active)
        │
        ▼
   Session validation: GET /api/sessions/validate?session_id=sess_xyz789
        │
        ▼
   Backend checks:
        ✓ Session still active (not expired)
        ✓ Table still occupied
        ✓ Customer can place new order
        │
        ▼
   Customer repeats steps 2-6 (Browse → Add → Checkout → Pay → Track)
        │
        ▼
   ✅ Multiple orders possible in one sitting


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  5️⃣  DATA FLOW ARCHITECTURE (Backend Services)                                              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

   REQUEST → BACKEND API → PROCESSING → DATABASE → RESPONSE

   ┌─────────────────────────────────────────────────────────────────────────┐
   │  INCOMING REQUEST (From Frontend)                                        │
   └─────────────────────────────────────────────────────────────────────────┘

   POST /api/orders/create
        ├─ Headers: Authorization: Bearer JWT_TOKEN
        ├─ Body: { cart_items: [...], special_instructions: "..." }
        └─ Origin: app.pubflow.com


   ┌─────────────────────────────────────────────────────────────────────────┐
   │  MIDDLEWARE LAYER                                                        │
   └─────────────────────────────────────────────────────────────────────────┘

   1. CORS Check: Verify origin is app.pubflow.com ✓
   2. JWT Verification: Extract session_id from token ✓
   3. Request Logging: Log all requests (middleware)
   4. Rate Limiting: Check if IP has exceeded 1000 req/min ✓
   5. Input Validation: Validate request body schema ✓
   6. Session Lookup: Fetch session from Redis ✓


   ┌─────────────────────────────────────────────────────────────────────────┐
   │  BUSINESS LOGIC LAYER                                                    │
   └─────────────────────────────────────────────────────────────────────────┘

   1. ORDER SERVICE:
      • Validate cart items exist
      • Calculate total price
      • Apply discounts (if any)
      • Reserve inventory
      • Create order in PostgreSQL

   2. INVENTORY SERVICE:
      • Check stock levels
      • Reserve items
      • Mark as reserved (temporary)

   3. NOTIFICATION SERVICE:
      • Emit WebSocket: "order_created"
      • Send to: Kitchen display system
      • Queue: Email confirmation

   4. AUDIT SERVICE:
      • Log all changes
      • Track: who, what, when, where
      • Store in database


   ┌─────────────────────────────────────────────────────────────────────────┐
   │  DATA PERSISTENCE                                                        │
   └─────────────────────────────────────────────────────────────────────────┘

   PostgreSQL Tables:
   ├─ orders (id, pub_id, table_id, customer_id, total_price, status, created_at)
   ├─ order_items (order_id, product_id, quantity, price, special_instructions)
   ├─ products (id, name, description, price, category_id, image_url)
   ├─ sessions (id, pub_id, table_id, customer_phone, created_at, expires_at)
   ├─ payments (id, order_id, method, status, reference, amount, created_at)
   └─ audit_logs (id, user_id, action, table_name, changes, created_at)

   Redis Cache:
   ├─ cart:{session_id} → { items: [...], total: 125.50 }
   ├─ session:{session_id} → { pub_id, table_id, customer_id }
   └─ rate_limit:{ip_address} → 342 (requests this minute)


   ┌─────────────────────────────────────────────────────────────────────────┐
   │  RESPONSE DELIVERY                                                       │
   └─────────────────────────────────────────────────────────────────────────┘

   Backend returns:
        {
          "success": true,
          "data": {
            "order_id": "ORD-2024-001",
            "order_reference": "PF-20241008-001",
            "total_price": 125.50,
            "status": "pending_payment",
            "items": [...],
            "created_at": "2024-10-08T14:35:00Z"
          },
          "timestamp": "2024-10-08T14:35:01Z"
        }

   Frontend receives → Updates UI → Shows order confirmation


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  6️⃣  STAFF DASHBOARD (Kitchen & Orders)                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

   Staff member logs in to staff portal (separate from customer app)
        │
        ▼
   Dashboard shows:
   ┌─────────────────────────────────────────────────────────────┐
   │  🔔 NEW ORDERS (Kitchen Display System)                      │
   │                                                               │
   │  ORD-2024-001: Table 5                                       │
   │  ├─ 2x Grilled Chicken                                       │
   │  ├─ 1x Fried Rice                                            │
   │  ├─ Special: Extra sauce                                     │
   │  └─ Status: 🔴 NOT STARTED                                   │
   │                                                               │
   │  ORD-2024-002: Table 3                                       │
   │  ├─ 3x Burger                                                │
   │  ├─ 2x Fries                                                 │
   │  └─ Status: 🟡 IN PROGRESS (5 min)                           │
   │                                                               │
   │  ORD-2024-003: Table 7                                       │
   │  ├─ 1x Salad                                                 │
   │  ├─ 1x Water                                                 │
   │  └─ Status: 🟢 READY (waiting for pickup)                    │
   └─────────────────────────────────────────────────────────────┘

   Staff clicks "Start Cooking" on ORD-2024-001:
        │
        ▼
   Backend: PATCH /api/orders/ORD-2024-001/status
        { "status": "preparing" }
        │
        ▼
   Backend:
        1. Updates order status: pending_payment → preparing
        2. Logs timestamp (when started)
        3. Emits WebSocket: "order_status_updated" → Customer
        │
        ▼
   Customer's phone: Notification "Your order is being prepared 👨‍🍳"
        │
        ▼
   Staff finishes cooking → Clicks "Mark as Ready":
        │
        ▼
   Backend: PATCH /api/orders/ORD-2024-001/status
        { "status": "ready" }
        │
        ▼
   Backend:
        1. Updates status: preparing → ready
        2. Emits WebSocket → Customer
        3. Sends push notification
        4. Alerts staff: "Table 5 - Order ready for pickup!"
        │
        ▼
   Customer receives notification → Goes to counter
        │
        ▼
   Customer collects order → Confirms pickup
        │
        ▼
   Backend: PATCH /api/orders/ORD-2024-001/status
        { "status": "completed" }
        │
        ▼
   ✅ Order lifecycle complete


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  7️⃣  TECHNOLOGY STACK DETAIL                                                                ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

   FRONTEND (React SPA):
   ├─ React 18 + Vite 5
   ├─ Redux (cart, session state)
   ├─ React Query (data fetching)
   ├─ Tailwind CSS + Material-UI
   ├─ Socket.io-client (real-time)
   ├─ react-qr-reader (QR scanner)
   ├─ Axios (HTTP client)
   ├─ Formik + Yup (forms)
   ├─ React Router v6 (navigation)
   └─ Workbox (offline support)

   BACKEND (Node.js / Express):
   ├─ Express.js 5
   ├─ TypeScript
   ├─ Prisma ORM (PostgreSQL)
   ├─ Socket.io (real-time)
   ├─ Redis Client
   ├─ JWT + Passport.js (auth)
   ├─ Multer (file uploads)
   ├─ Helmet.js (security)
   ├─ Morgan (logging)
   ├─ Dotenv (config)
   └─ Jest (testing)

   DATABASES:
   ├─ PostgreSQL 15+
   │  ├─ 10+ tables
   │  ├─ Indexes on: order_id, session_id, created_at
   │  ├─ Foreign keys + constraints
   │  └─ Automated daily backups
   │
   └─ Redis 7+
      ├─ 6-month TTL on keys
      ├─ Cluster mode (3 nodes)
      ├─ Persistence: AOF + RDB
      └─ Memory limit: 50GB

   INFRASTRUCTURE:
   ├─ Kubernetes (orchestration)
   ├─ Docker (containerization)
   ├─ GitHub Actions (CI/CD)
   ├─ CloudFlare (CDN)
   ├─ AWS S3 / GCS (storage)
   └─ PostgreSQL managed service


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  8️⃣  SECURITY & COMPLIANCE                                                                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

   AUTHENTICATION:
   ├─ Session-based (table session + JWT)
   ├─ No user account needed (anonymous customer)
   ├─ QR validation = authentication
   ├─ JWT refresh tokens (24-hour expiry)
   └─ Staff login: Email + password + 2FA (TOTP)

   DATA SECURITY:
   ├─ SSL/TLS encryption (all traffic)
   ├─ HTTPS only (no HTTP)
   ├─ Database encryption at rest (PostgreSQL)
   ├─ Redis encryption (optional for sensitive data)
   ├─ Payment data: PCI-DSS compliant (outsourced to Paystack)
   └─ No sensitive data in logs or error responses

   API SECURITY:
   ├─ CORS: Only app.pubflow.com can call API
   ├─ Rate limiting: 1000 req/min per IP
   ├─ Request validation: All inputs sanitized
   ├─ SQL injection: Prevented by ORM (Prisma)
   ├─ XSS protection: Content-Security-Policy headers
   ├─ CSRF: Token-based protection
   └─ Helmet.js: Security headers

   COMPLIANCE:
   ├─ GDPR: Data retention policies (6 months max)
   ├─ PCI-DSS: No card data stored locally
   ├─ Privacy: Terms of Service + Privacy Policy
   ├─ Audit logging: All transactions logged
   └─ Right to deletion: Customer data can be purged


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  9️⃣  MONITORING & PERFORMANCE                                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

   PERFORMANCE TARGETS:
   ├─ Frontend load: < 2 seconds (Lighthouse)
   ├─ API response: < 200ms (p95)
   ├─ WebSocket latency: < 100ms
   ├─ Database query: < 50ms (p95)
   ├─ Uptime: 99.9% (30 seconds/month downtime)
   └─ Payment processing: < 10 seconds

   MONITORING STACK:
   ├─ Prometheus (metrics collection)
   ├─ Grafana (visualization)
   ├─ Sentry (error tracking)
   ├─ DataDog (APM)
   ├─ AlertManager (notifications)
   └─ Custom dashboards

   ALERTS (Trigger automation):
   ├─ API response time > 1 second
   ├─ Database connection pool exhausted
   ├─ Redis memory > 80%
   ├─ Error rate > 1% (5-minute window)
   ├─ Pod crash loops detected
   ├─ Disk usage > 90%
   └─ SSL certificate expiring soon

   LOG LEVELS:
   ├─ ERROR: Critical issues (email alert)
   ├─ WARN: Degraded performance (logged)
   ├─ INFO: Request logs, state changes (stored)
   └─ DEBUG: Detailed traces (dev only)


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  🔟  DEPLOYMENT & SCALING                                                                    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

   DEPLOYMENT PROCESS:
   ┌─────────────────────────────────────────────────────────┐
   │  1. Developer pushes to main branch                      │
   │  2. GitHub Actions: Build + Test (5 min)                │
   │  3. Build Docker images (frontend + backend)            │
   │  4. Push to Container Registry (Azure ACR)              │
   │  5. Deploy to Kubernetes (rolling update)               │
   │     • Old pods: drain connections                       │
   │     • New pods: start up                                │
   │     • Health checks: verify readiness                   │
   │     • Traffic: gradually shifted to new pods            │
   │  6. Smoke tests (automated)                             │
   │  7. Notification to Slack (success/failure)             │
   └─────────────────────────────────────────────────────────┘

   SCALING STRATEGY:
   ├─ Horizontal: Add more pods (Kubernetes HPA)
   │  • Trigger: CPU > 70% or requests/sec > 1000
   │  • Scale to: Max 20 API pods, 10 frontend pods
   │  • Cooldown: 5 minutes (prevent thrashing)
   │
   ├─ Vertical: Increase pod resources
   │  • CPU: 500m → 2000m
   │  • Memory: 512Mi → 2Gi
   │
   └─ Database: Read replicas
      • PostgreSQL streaming replication
      • Redis cluster (horizontal scaling)
      • Connection pooling (pgBouncer)

   BLUE-GREEN DEPLOYMENT (for major releases):
   ├─ Deploy new version to "Green" environment
   ├─ Run full test suite on Green
   ├─ Switch traffic (Blue → Green)
   ├─ Keep Blue running for 30 minutes (instant rollback)
   └─ Shutdown Blue (if no issues)

   ROLLBACK PROCEDURE:
   ├─ Time to rollback: < 5 minutes
   ├─ Method: kubectl rollout undo deployment/pubflow-api
   ├─ Data: No data loss (read-only rollback)
   └─ Notification: Team alerted automatically


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  1️⃣1️⃣  QUICK REFERENCE & ENDPOINTS                                                          ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

   PRODUCTION URLS:
   ├─ Customer App:        https://app.pubflow.com
   ├─ API Backend:         https://api.pubflow.com
   ├─ WebSocket Server:    wss://ws.pubflow.com
   ├─ Staff Portal:        https://staff.pubflow.com
   ├─ Admin Dashboard:     https://admin.pubflow.com
   └─ Health Check:        https://api.pubflow.com/health

   CORE API ENDPOINTS (25+):

   QR & SESSION:
   ├─ GET  /api/qr/validate?code=ABC123
   └─ POST /api/sessions/validate

   MENU:
   ├─ GET /api/menus/:pub_id/categories
   └─ GET /api/menus/:pub_id/products

   CART:
   ├─ POST   /api/cart/add
   ├─ DELETE /api/cart/remove/:item_id
   ├─ PATCH  /api/cart/update/:item_id
   └─ GET    /api/cart

   ORDERS:
   ├─ POST   /api/orders/create
   ├─ GET    /api/orders/:order_id
   ├─ GET    /api/orders?session_id=...
   ├─ PATCH  /api/orders/:order_id/status
   └─ DELETE /api/orders/:order_id/cancel

   PAYMENTS:
   ├─ POST /api/payments/mobile-money/initiate
   ├─ POST /api/payments/card/create-intent
   ├─ POST /api/payments/cash/confirm
   ├─ GET  /api/payments/:order_id
   └─ POST /api/webhooks/mtn/payment
   └─ POST /api/webhooks/paystack/payment

   NOTIFICATIONS:
   ├─ GET  /api/notifications
   └─ PATCH /api/notifications/:id/read

   STAFF:
   ├─ GET    /api/staff/orders (Kitchen Display)
   ├─ PATCH  /api/staff/orders/:order_id/status
   └─ POST   /api/staff/orders/:order_id/print-receipt

   ADMIN:
   ├─ POST   /api/admin/pubs/create
   ├─ GET    /api/admin/analytics
   ├─ PATCH  /api/admin/menu/:product_id
   └─ GET    /api/admin/reports/daily-sales

   DEBUGGING:
   ├─ GET /health
   ├─ GET /metrics (Prometheus)
   └─ GET /status


┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  COST ESTIMATION (Monthly)                                                                   ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

   INFRASTRUCTURE:
   ├─ Kubernetes cluster (AWS EKS):       ~$240/month (6 t3.medium nodes)
   ├─ PostgreSQL (AWS RDS):               ~$150/month (db.t3.medium, 100GB storage)
   ├─ Redis cluster:                      ~$80/month (3 nodes)
   ├─ Container Registry (Azure ACR):     ~$30/month
   ├─ CDN & LoadBalancer:                 ~$50/month
   └─ Backup & disaster recovery:         ~$40/month

   EXTERNAL SERVICES:
   ├─ Payment gateway (Paystack 1.95%):   % of revenue
   ├─ Email service (SendGrid):           ~$20/month (50k/month limit)
   ├─ SMS service (Twilio, optional):     ~$30/month (pay-per-use)
   ├─ Analytics (Mixpanel):               ~$25/month
   ├─ Error tracking (Sentry):            ~$15/month
   ├─ Monitoring (DataDog):               ~$70/month
   └─ CDN & SSL:                          Included in CloudFlare Pro ~$20/month

   TOTAL ESTIMATE (excluding revenue %):  ~$770/month
   BREAKDOWN:
   ├─ Infrastructure:    ~$590/month (77%)
   ├─ External services: ~$180/month (23%)
   └─ Paystack fees:     % of revenue (typically 1.5-2.5%)


═══════════════════════════════════════════════════════════════════════════════════════════════
                        🎯 PUBFLOW - PRODUCTION READY ✅
                          Complete Infrastructure Mapped
                            Last Updated: October 8, 2026
═══════════════════════════════════════════════════════════════════════════════════════════════
```
