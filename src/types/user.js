/**
 * User Type Definitions
 * Defines all user-related types for the application
 * Based on official department structure from backend team
 */

/**
 * @typedef {('Media' | 'Software' | 'Training' | 'CAO')} Department
 * Official departments for user assignment
 */

/**
 * @typedef {('super_admin' | 'admin' | 'editor' | 'viewer')} UserRole
 * Available user roles in the system
 */

/**
 * @typedef {('active' | 'deactivated' | 'pending_password')} AccountStatus
 * Account status for admin users
 */

/**
 * @typedef {('not_submitted' | 'pending' | 'verified' | 'rejected')} KYCStatus
 * KYC verification status for users
 */

/**
 * @typedef {Object} User
 * @property {string} id - Unique user identifier
 * @property {string} email - User email address
 * @property {string} firstName - User first name
 * @property {string} lastName - User last name
 * @property {string} [name] - Full name
 * @property {UserRole} role - User role in system
 * @property {Department} [department] - Department assignment (optional, null if not assigned)
 * @property {string[]} permissions - Array of permission strings
 * @property {string} [phone] - Phone number
 * @property {string} [avatar] - Avatar URL
 * @property {AccountStatus} [accountStatus] - Account status for admins
 * @property {KYCStatus} [kycStatus] - KYC verification status
 * @property {boolean} [mustChangePassword] - Force password change on next login
 * @property {string} [joinedDate] - Date when user joined
 * @property {string} [lastLogin] - Date of last login
 * @property {string} [location] - User location
 * @property {string} [bio] - User biography
 */

/**
 * @typedef {Object} CreateUserRequest
 * @property {string} email - User email address
 * @property {string} firstName - First name
 * @property {string} lastName - Last name
 * @property {string} password - Initial password
 * @property {UserRole} role - User role
 * @property {Department} [department] - Department assignment (optional)
 * @property {string[]} permissions - Array of permission strings
 * @property {boolean} [mustChangePassword] - Force password change on first login
 * @property {string} [phone] - Phone number
 */

/**
 * @typedef {Object} UpdateUserRequest
 * @property {string} [firstName] - Update first name
 * @property {string} [lastName] - Update last name
 * @property {string} [email] - Update email
 * @property {Department} [department] - Update department (super_admin only)
 * @property {string[]} [permissions] - Update permissions
 * @property {string} [phone] - Update phone number
 * @property {AccountStatus} [accountStatus] - Update account status (super_admin only)
 */

/**
 * @typedef {Object} DepartmentConfig
 * @property {Department} value - Department identifier
 * @property {string} label - Display label
 * @property {string} description - Department description
 * @property {string[]} defaultPermissions - Default permissions for this department
 * @property {string} color - Tailwind color class for UI display
 */

// Permission types by department
/**
 * DEPARTMENT_PERMISSIONS_MAP
 * Maps each department to its default permissions
 * @type {Object<Department, string[]>}
 */

export {};
