/**
 * Application Constants
 * Single source of truth for roles, permissions, statuses, etc.
 */

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer'
};

export const ROLE_LABELS = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  editor: 'Editor',
  viewer: 'Viewer'
};

export const PERMISSIONS = {
  // Dashboard
  VIEW_DASHBOARD: ['super_admin', 'admin', 'editor', 'viewer'],

  // Training Courses
  VIEW_COURSES: ['super_admin', 'admin', 'editor', 'viewer'],
  CREATE_COURSE: ['super_admin', 'admin', 'editor'],
  EDIT_COURSE: ['super_admin', 'admin', 'editor'],
  DELETE_COURSE: ['super_admin', 'admin'],
  PUBLISH_COURSE: ['super_admin', 'admin'],
  VIEW_ENROLLMENTS: ['super_admin', 'admin'],

  // Blog
  VIEW_BLOG: ['super_admin', 'admin', 'editor', 'viewer'],
  CREATE_BLOG: ['super_admin', 'admin', 'editor'],
  EDIT_BLOG: ['super_admin', 'admin', 'editor'],
  DELETE_BLOG: ['super_admin', 'admin'],
  PUBLISH_BLOG: ['super_admin', 'admin'],

  // Jobs
  VIEW_JOBS: ['super_admin', 'admin', 'editor', 'viewer'],
  CREATE_JOB: ['super_admin', 'admin'],
  EDIT_JOB: ['super_admin', 'admin'],
  DELETE_JOB: ['super_admin', 'admin'],
  VIEW_APPLICATIONS: ['super_admin', 'admin'],

  // Gallery
  VIEW_GALLERY: ['super_admin', 'admin', 'editor', 'viewer'],
  UPLOAD_MEDIA: ['super_admin', 'admin', 'editor'],
  DELETE_MEDIA: ['super_admin', 'admin'],

  // Payments
  VIEW_PAYMENTS: ['super_admin', 'admin'],
  VIEW_INVOICES: ['super_admin', 'admin'],
  REFUND_PAYMENT: ['super_admin'],
  VIEW_REVENUE: ['super_admin'],

  // Users
  VIEW_USERS: ['super_admin'],
  MANAGE_USERS: ['super_admin'],
  CREATE_USER: ['super_admin'],
  EDIT_USER: ['super_admin'],
  DELETE_USER: ['super_admin'],
  ASSIGN_ROLES: ['super_admin'],
  VIEW_ACTIVITY_LOGS: ['super_admin'],

  // Settings
  VIEW_SETTINGS: ['super_admin', 'admin'],
  EDIT_SETTINGS: ['super_admin'],
  EDIT_PAYMENT_KEYS: ['super_admin'],

  // Submissions
  VIEW_SUBMISSIONS: ['super_admin', 'admin'],
  RESPOND_SUBMISSIONS: ['super_admin', 'admin'],

  // Analytics
  VIEW_ANALYTICS: ['super_admin', 'admin']
};

export const USER_STATUSES = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  INACTIVE: 'inactive'
};

export const USER_STATUS_LABELS = {
  active: 'Active',
  suspended: 'Suspended',
  inactive: 'Inactive'
};

export const TRANSACTION_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  CANCELLED: 'cancelled'
};

export const TRANSACTION_STATUS_LABELS = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  refunded: 'Refunded',
  cancelled: 'Cancelled'
};

export const PAYMENT_METHODS = {
  CARD: 'card',
  MOBILE_MONEY: 'mobile_money',
  BANK_TRANSFER: 'bank_transfer'
};

export const PAYMENT_GATEWAYS = {
  PAYSTACK: 'paystack',
  STRIPE: 'stripe',
  FLUTTERWAVE: 'flutterwave'
};

export const COURSE_STATUSES = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
};

export const COURSE_STATUS_LABELS = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived'
};

export const COURSE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
};

export const COURSE_LEVEL_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
};

export const ENROLLMENT_STATUSES = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  DROPPED: 'dropped',
  EXPIRED: 'expired'
};

export const ARTICLE_STATUSES = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
};

export const JOB_STATUSES = {
  OPEN: 'open',
  CLOSED: 'closed',
  FILLED: 'filled',
  DRAFT: 'draft'
};

export const JOB_TYPES = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  CONTRACT: 'contract',
  INTERNSHIP: 'internship'
};

export const SUBMISSION_STATUSES = {
  NEW: 'new',
  READ: 'read',
  RESPONDED: 'responded',
  ARCHIVED: 'archived'
};

export const SUBMISSION_PRIORITIES = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent'
};

export const SUBMISSION_TYPES = {
  GENERAL: 'general',
  PARTNERSHIP: 'partnership',
  SUPPORT: 'support',
  HR: 'hr'
};

export const SETTINGS_CATEGORIES = {
  BRANDING: 'branding',
  GENERAL: 'general',
  PAYMENT: 'payment',
  EMAIL: 'email',
  SEO: 'seo',
  FEATURES: 'features'
};

export const AVAILABLE_ICONS = [
  'BookOpen',
  'Code',
  'Users',
  'Zap',
  'Target',
  'Award',
  'Briefcase',
  'Heart',
  'Star',
  'TrendingUp',
  'Rocket',
  'Database',
  'Settings',
  'Lock',
  'Eye',
  'Edit',
  'Trash2',
  'Plus',
  'Search',
  'Filter',
  'Download',
  'Upload',
  'Mail',
  'Phone',
  'MapPin',
  'Calendar',
  'Clock',
  'CheckCircle',
  'AlertCircle',
  'XCircle'
];
