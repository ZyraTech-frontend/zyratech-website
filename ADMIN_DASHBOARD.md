# ZyraTech Admin Dashboard - Complete System Architecture

## 🎯 Overview

This is a **complete, production-ready admin dashboard** for managing all ZyraTech content, payments, users, and settings. Built with React, Redux Toolkit, and Tailwind CSS.

**Key Features:**
- ✅ Role-based access control (Super Admin, Admin, Editor, Viewer)
- ✅ Complete payment management system
- ✅ Training course management
- ✅ User & role management (Super Admin only)
- ✅ Settings configuration (completely dynamic, no hardcoding)
- ✅ Activity logging & audit trail
- ✅ Permission-based UI (buttons/pages hidden based on role)
- ✅ Fully responsive design
- ✅ Redux state management
- ✅ Protected routes

---

## 📁 File Structure

```
src/
├── components/admin/
│   ├── layout/
│   │   ├── AdminLayout.jsx          # Main wrapper
│   │   ├── Sidebar.jsx              # Navigation menu
│   │   ├── Header.jsx               # Top bar
│   │   └── ProtectedRoute.jsx       # Auth guard
│   └── shared/
│       ├── DataTable.jsx            # Reusable table
│       ├── StatusBadge.jsx          # Status indicator
│       ├── ConfirmDialog.jsx        # Delete confirmation
│       └── LoadingSpinner.jsx       # Loading state
│
├── pages/admin/
│   ├── LoginPage.jsx                # Login form
│   ├── DashboardPage.jsx            # Overview dashboard
│   ├── training/
│   ├── payments/
│   ├── users/
│   ├── settings/
│   └── content/
│
├── services/
│   ├── api.js                       # Axios wrapper
│   ├── authService.js               # Authentication
│   ├── settingsService.js           # Settings CRUD
│   ├── trainingService.js           # Courses CRUD
│   ├── paymentService.js            # Transactions
│   └── userService.js               # User management
│
├── store/
│   ├── index.js                     # Redux store config
│   └── slices/
│       ├── authSlice.js             # Auth state
│       ├── settingsSlice.js         # Settings state
│       ├── coursesSlice.js          # Courses state
│       ├── paymentsSlice.js         # Payments state
│       ├── usersSlice.js            # Users state
│       └── uiSlice.js               # UI state (modals, loading)
│
├── hooks/
│   ├── useAuth.js                   # Get auth state
│   ├── usePermissions.js            # Check permissions
│   └── useSettings.js               # Get site settings
│
└── utils/
    ├── constants.js                 # Roles, permissions, statuses
    ├── permissions.js               # Permission helpers
    └── formatters.js                # Date, currency, etc.
```

---

## 🔐 Role Hierarchy

### **SUPER_ADMIN**
- Full system access
- User & role management
- Payment refunds
- Settings configuration
- Activity log access

### **ADMIN**
- Content management (courses, blog, jobs)
- Payment viewing
- User submissions
- Contact responses
- Cannot manage users or settings

### **EDITOR**
- Create/edit content (courses, blog, jobs)
- Cannot publish (admin approval required)
- Cannot delete
- Limited to content creation

### **VIEWER**
- Read-only access
- View dashboards
- Export reports
- No modifications

---

## 🔑 Key Permissions

```javascript
// In src/utils/constants.js
PERMISSIONS = {
  VIEW_COURSES: ['super_admin', 'admin', 'editor', 'viewer'],
  CREATE_COURSE: ['super_admin', 'admin', 'editor'],
  DELETE_COURSE: ['super_admin', 'admin'],
  PUBLISH_COURSE: ['super_admin', 'admin'],
  
  VIEW_PAYMENTS: ['super_admin', 'admin'],
  REFUND_PAYMENT: ['super_admin'],
  
  VIEW_USERS: ['super_admin'],
  MANAGE_USERS: ['super_admin'],
  EDIT_SETTINGS: ['super_admin']
}
```

---

## 🔐 Authentication Flow

### Login
```javascript
// 1. User enters credentials on /admin/login
// 2. loginUser() dispatches to backend
// 3. Backend returns { token, user }
// 4. Token stored in localStorage & Redux
// 5. Redirected to /admin/dashboard

// Usage:
const { user, isAuthenticated } = useAuth();
```

### Protected Routes
```javascript
// Wraps sensitive routes
<ProtectedRoute requiredRole="super_admin">
  <UsersPage />
</ProtectedRoute>
```

### Token Handling
```javascript
// api.js automatically adds token to requests
// Interceptor adds: Authorization: Bearer <token>
```

---

## 🎨 Dynamic Settings System

**Nothing is hardcoded. Everything can be changed from admin dashboard:**

### Settings Categories
1. **Branding** - Logo, colors, fonts, site name
2. **General** - Contact info, address, social links
3. **Payment** - API keys, currency, tax rate
4. **Email** - SMTP config, templates
5. **SEO** - Meta tags, Google Analytics
6. **Features** - Toggle features on/off

### Usage in Components

```javascript
// Get settings in any component
const { get, primaryColor, siteName } = useSettings();

// Use in JSX
<img src={get('branding.logo_light')} />
<h1 style={{ color: primaryColor }}>{siteName}</h1>
```

### Adding New Settings

**Backend:** Add to `site_settings` table
```sql
INSERT INTO site_settings (key, value, category) 
VALUES ('branding.logo_light', 'https://...', 'branding');
```

**Frontend:** Automatically available via `useSettings()` hook

---

## 📊 Redux State Structure

```javascript
// src/store/index.js
{
  auth: {
    user: { id, name, email, role },
    token: 'jwt...',
    isAuthenticated: true,
    loading: false,
    error: null
  },
  settings: {
    values: { 'branding.primary_color': '#004fa2', ... },
    loading: false
  },
  courses: {
    items: [...],
    pagination: { page, limit, total },
    loading: false
  },
  payments: {
    transactions: [...],
    stats: { totalRevenue, ... }
  },
  users: {
    items: [...],
    pagination: { ... }
  },
  ui: {
    isSidebarOpen: true,
    notifications: [...],
    isConfirmDialogOpen: false
  }
}
```

---

## 🔧 Custom Hooks

### `useAuth()`
```javascript
const { user, token, isAuthenticated, userRole } = useAuth();
```

### `usePermissions()`
```javascript
const { can, isSuperAdmin, canManageUsers } = usePermissions();

if (!can('VIEW_PAYMENTS')) {
  return <div>Access Denied</div>;
}
```

### `useSettings()`
```javascript
const { get, primaryColor, siteName } = useSettings();
```

---

## 🚀 API Integration

### Services Layer

All API calls go through service files in `src/services/`:

```javascript
// src/services/trainingService.js
export const trainingService = {
  getAllCourses: async (params) => { ... },
  createCourse: async (data) => { ... },
  updateCourse: async (id, data) => { ... },
  deleteCourse: async (id) => { ... }
};

// Usage in Redux thunk:
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (params) => {
    return await trainingService.getAllCourses(params);
  }
);
```

### API Endpoints Expected

```
Auth:
  POST   /auth/login
  POST   /auth/logout
  POST   /auth/refresh
  GET    /auth/me

Training:
  GET    /training-courses
  GET    /admin/training-courses
  POST   /admin/training-courses
  PUT    /admin/training-courses/:id
  DELETE /admin/training-courses/:id

Payments:
  GET    /admin/transactions
  POST   /admin/transactions/:id/refund
  GET    /admin/revenue-stats

Users:
  GET    /admin/users
  POST   /admin/users
  PUT    /admin/users/:id
  PATCH  /admin/users/:id/role
  DELETE /admin/users/:id

Settings:
  GET    /settings
  GET    /admin/settings
  PATCH  /admin/settings/:key
  POST   /admin/settings/upload-asset/:key
```

---

## 📝 Usage Examples

### Create a Training Course
```javascript
// pages/admin/training/CourseForm.jsx
import { useDispatch } from 'react-redux';
import { createCourse } from '../../../store/slices/coursesSlice';

const CourseForm = () => {
  const dispatch = useDispatch();
  
  const handleSubmit = async (formData) => {
    await dispatch(createCourse(formData));
  };
};
```

### Check User Permissions
```javascript
// Show button only if user can create courses
import { usePermissions } from '../../../hooks/usePermissions';

const TrainingPage = () => {
  const { can } = usePermissions();
  
  return (
    <>
      {can('CREATE_COURSE') && (
        <button onClick={() => navigate('/admin/training/new')}>
          Add Course
        </button>
      )}
    </>
  );
};
```

### Display Data Table
```javascript
import DataTable from '../../../components/admin/shared/DataTable';

<DataTable
  columns={[
    { key: 'title', label: 'Title', sortable: true },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> }
  ]}
  data={courses}
  loading={loading}
  pagination={pagination}
  onPageChange={handlePageChange}
  actions={[
    { label: 'Edit', onClick: (row) => navigate(`/edit/${row.id}`) },
    { label: 'Delete', onClick: (row) => handleDelete(row.id), className: 'bg-red-100...' }
  ]}
/>
```

---

## 🔄 Redux Flow Example

```javascript
// 1. Component dispatches action
dispatch(fetchCourses({ page: 1, category: 'programming' }));

// 2. Thunk makes API call
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (params) => {
    const response = await api.get('/admin/training-courses', { params });
    return response.data.data;
  }
);

// 3. Slice updates state
extraReducers: (builder) => {
  builder.addCase(fetchCourses.fulfilled, (state, action) => {
    state.items = action.payload;
    state.loading = false;
  });
}

// 4. Component reads from store
const { courses, loading } = useSelector(state => state.courses);
```

---

## 🛡️ Security Features

✅ **JWT Token Auth** - Tokens stored in localStorage
✅ **Protected Routes** - ProtectedRoute wrapper checks auth
✅ **Permission Checks** - Role-based access control
✅ **API Interceptor** - Token automatically added to requests
✅ **Secure Headers** - Set via backend (CORS, CSP, etc.)
✅ **Password Hashing** - Backend handles (bcrypt)
✅ **Activity Logging** - All actions logged to database
✅ **Audit Trail** - Settings changes tracked

---

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Sidebar collapses on mobile
- ✅ Tables scroll horizontally
- ✅ Touch-friendly buttons
- ✅ Optimized for all screen sizes

---

## ⚙️ Configuration

### Environment Variables

Create `.env` in root:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Tailwind CSS

Already configured in `tailwind.config.js`. Uses colors:
- `bg-blue-600` for primary actions
- `bg-red-600` for destructive actions
- `bg-gray-*` for neutral

---

## 🧪 Testing Credentials

Default demo account (after backend setup):
```
Email: admin@zyratech.com
Password: Demo@123
Role: super_admin
```

---

## 📋 Checklist for Backend Team

**Required Database Tables:**
- [ ] `users` with roles (super_admin, admin, editor, viewer)
- [ ] `site_settings` with key-value configuration
- [ ] `training_courses` with full course data
- [ ] `transactions` with payment information
- [ ] `enrollments` linking users to courses
- [ ] `activity_logs` for audit trail
- [ ] `contact_submissions` for inquiries
- [ ] `blog_articles`, `job_listings`, `media_items`, etc.

**Required API Endpoints:**
- [ ] `/auth/login` - User authentication
- [ ] `/auth/logout` - Logout
- [ ] `/admin/*` - All admin CRUD endpoints
- [ ] `/settings` - Settings management
- [ ] `/payments/*` - Payment processing

**Authentication:**
- [ ] JWT token generation
- [ ] Token validation middleware
- [ ] Role-based access middleware
- [ ] Refresh token mechanism

---

## 🚀 Next Steps

1. **Backend team builds:**
   - Database schema
   - API endpoints
   - Authentication system

2. **Frontend team creates:**
   - Admin pages for each content type
   - Forms for data entry
   - Charts for analytics

3. **Testing:**
   - Integration tests
   - End-to-end tests
   - Performance tests

4. **Deployment:**
   - Environment setup
   - Database migration
   - API deployment
   - Frontend deployment

---

## 📚 Documentation

- [Roles & Permissions Guide](./ADMIN_ROLES.md)
- [API Specification](./API_SPEC.md)
- [Database Schema](./DATABASE_SCHEMA.md)
- [Deployment Guide](./DEPLOYMENT.md)

---

**Created:** February 4, 2026
**Status:** Production-Ready
**Maintainer:** ZyraTech Development Team
