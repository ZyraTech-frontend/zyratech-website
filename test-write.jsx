/**
 * Admin Login Page - Complete Authentication Flow
 * 
 * This login page follows the Super Admin's user management logic:
 * 1. Super Admin creates admin → gives temp password
 * 2. Admin logs in with temp password
 * 3. If mustChangePassword → Force Change Password screen
 * 4. After password change → Check KYC status
 * 5. If KYC not submitted → KYC Submission screen
 * 6. If KYC pending → info screen (can proceed)
 * 7. If KYC rejected → re-submit screen
 * 8. Only fully verif