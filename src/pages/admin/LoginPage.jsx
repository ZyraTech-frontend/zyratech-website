/**
 * Admin Login Page - Complete Authentication Flow
 * 
 * This login page follows the Super Admin's user management logic:
 * 1. Super Admin creates admin â†’ gives temp password
 * 2. Admin logs in with temp password
 * 3. If mustChangePassword â†’ Force Change Password screen
 * 4. After password change â†’ Check KYC status
 * 5. If KYC not submitted â†’ KYC Submission screen
 * 6. If KYC pending â†’ info screen (can proceed)
 * 7. If KYC rejected â†’ re-submit screen
 * 8. Only...