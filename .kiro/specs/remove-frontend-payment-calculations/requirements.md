# Requirements Document

## Introduction

This document specifies the requirements for refactoring payment initialization logic to move all financial calculations from the frontend to the backend. The frontend will now send only the base amount (full project cost or course fee) to the backend, which will handle calculating deposit amounts, processing fees, and payment totals. This improves security, consistency, and enables flexible deposit policies (60% for projects vs. 30% for training).

## Requirements

### 1. Project Payment Simplification

#### Acceptance Criteria

**Requirement 1.1: Remove Frontend Deposit Calculation**
- The frontend ProjectPaymentPage no longer contains a `calculateDepositAmount()` function
- The frontend no longer extracts numbers from budget range strings
- The frontend no longer calculates deposit percentage (30%)
- Validates: Removes calculation logic as specified in design

**Requirement 1.2: Remove Frontend Processing Fee Calculation**
- The frontend no longer calculates processing fees (1.5% + GHS 0.50)
- No inline calculations in handleSubmit() for fee computation
- No fee calculations in the sidebar payment summary
- Validates: Removes calculation logic as specified in design

**Requirement 1.3: Simplified Payment Data for Projects**
- Frontend sends payment data object with these fields only:
  - `projectRequestId`: string (project request ID)
  - `amount`: number (full project budget)
  - `currency`: 'GHS' (string literal)
  - `paymentPhase`: 'deposit' (string literal)
  - `studentName`: string (applicant name)
  - `studentEmail`: string (applicant email)
  - `callbackUrl`: string (post-payment URL)
  - `projectTitle`: string (optional, project name)
  - `projectType`: string (optional, project category)
- Deprecated fields are NOT sent:
  - `depositAmount` ✗ (removed)
  - `depositPercentage` ✗ (removed)
  - `processingFee` ✗ (removed)
  - `totalAmount` ✗ (removed)
  - `balanceDue` ✗ (removed)
  - `totalProjectBudget` ✗ (removed)
- Validates: Implements simplified data structure per design

### 2. Training Payment Simplification

**Requirement 2.1: Remove Frontend Processing Fee from Training**
- The frontend TrainingPaymentPage no longer calculates processing fees
- No inline calculations in handleSubmit() for course payment fees
- No fee calculations in the sidebar payment summary
- Validates: Removes calculation logic as specified in design

**Requirement 2.2: Simplified Payment Data for Training**
- Frontend sends payment data object with these fields only:
  - `courseId`: string (course ID)
  - `amount`: number (course fee)
  - `currency`: 'GHS' (string literal)
  - `studentName`: string (applicant name)
  - `studentEmail`: string (applicant email)
  - `callbackUrl`: string (post-payment URL)
  - `applicationId`: string (optional, training application ID)
- Deprecated fields are NOT sent:
  - `processingFee` ✗ (removed)
  - `totalAmount` ✗ (removed)
- Validates: Implements simplified data structure per design

### 3. User Experience & Messaging

**Requirement 3.1: Updated Project Payment Summary**
- Payment summary displays:
  - Project budget amount
  - Project title and type
  - Budget range information
  - A message indicating: "Backend calculates deposit and processing fees"
- NO longer displays:
  - "30% Deposit" calculation ✗ (moved to backend)
  - "Processing Fee" breakdown ✗ (moved to backend)
  - Total amount before payment ✗ (calculated by backend)
- Validates: Updates UI per design

**Requirement 3.2: Updated Training Payment Summary**
- Payment summary displays:
  - Course fee
  - Course title and level
  - Course duration and certificate information
  - A message indicating: "Backend calculates processing fees"
- NO longer displays:
  - "Processing Fee" line item ✗ (moved to backend)
  - Total amount before payment ✗ (calculated by backend)
  - Calculation: "Course Fee + Processing Fee" ✗ (removed)
- Validates: Updates UI per design

### 4. Form Validation

**Requirement 4.1: Maintain Form Validation**
- Form validation continues to check:
  - Full name is not empty
  - Email is not empty and valid
  - Phone number is not empty and valid
- Phone validation uses existing `validatePhoneNumber()` utility
- All validation errors displayed inline to user
- Validates: Preserves validation behavior per design

**Requirement 4.2: Prevent Submission with Invalid Data**
- Form submission prevented if validation fails
- No API call made if form is invalid
- Error messages displayed for each invalid field
- Validates: Maintains form integrity per design

### 5. Payment Flow & Redirection

**Requirement 5.1: Project Payment Initialization**
- When user submits valid form:
  1. Set `isProcessing = true`
  2. Call `paymentService.initializePayment(paymentData)` with simplified payload
  3. Receive response containing `authorizationUrl`
  4. Store `payment_reference` in sessionStorage
  5. Store `payment_project_id` in sessionStorage
  6. Redirect window to Paystack URL
- If error occurs:
  - Display error alert with message from backend or generic message
  - Set `isProcessing = false`
  - Do NOT redirect
  - Maintain form for retry
- Validates: Implements payment flow per design

**Requirement 5.2: Training Payment Initialization**
- When user submits valid form:
  1. Set `isProcessing = true`
  2. Call `paymentService.initializePayment(paymentData)` with simplified payload
  3. Receive response containing `authorizationUrl`
  4. Store `payment_reference` in sessionStorage
  5. Store `payment_course_id` in sessionStorage
  6. Redirect window to Paystack URL
- If error occurs:
  - Display error alert with message from backend or generic message
  - Set `isProcessing = false`
  - Do NOT redirect
  - Maintain form for retry
- Validates: Implements payment flow per design

### 6. Backend Integration

**Requirement 6.1: Backend Handles Project Calculations**
- Backend receives base amount (full project budget) from frontend
- Backend calculates:
  - 60% deposit amount for projects
  - Processing fee (1.5% + GHS 0.50) on deposit amount
  - Total amount to charge to Paystack
  - Balance remaining after deposit
- Backend stores calculated values in transaction record
- Backend sends `authorizationUrl` to frontend for redirect
- Validates: Backend performs all calculations per design

**Requirement 6.2: Backend Handles Training Calculations**
- Backend receives base amount (course fee) from frontend
- Backend calculates:
  - Processing fee (1.5% + GHS 0.50)
  - Total amount to charge to Paystack
- Backend stores calculated values in transaction record
- Backend sends `authorizationUrl` to frontend for redirect
- Validates: Backend performs all calculations per design

### 7. Security & Data Integrity

**Requirement 7.1: No Frontend Financial Manipulation**
- Removed frontend calculations eliminate client-side modification risk
- Backend validates all amounts received from frontend
- Backend enforces business rules for payment amounts
- Processing fees cannot be bypassed by modifying client code
- Deposit percentages cannot be changed on frontend
- Validates: Improves security per design

**Requirement 7.2: Maintain Payment Security**
- SSL/TLS encryption for all API calls (unchanged)
- Paystack integration remains secure (unchanged)
- Phone number validation still performed frontend before API call (unchanged)
- PCI-DSS compliance maintained (unchanged)
- Validates: Maintains security posture per design

## Edge Cases

### Edge Case 1: Missing Project Budget Information
- **Condition**: User navigates to payment page without project budget
- **Expected**: Page displays error and prompts user to restart request
- **Implementation**: Check for `budgetRange` before rendering; show alert if missing

### Edge Case 2: Invalid Currency Conversion
- **Condition**: Budget range contains non-numeric values or corrupted data
- **Expected**: Form prevents submission with appropriate error message
- **Implementation**: Backend validation catches malformed amounts

### Edge Case 3: Network Timeout During Payment Init
- **Condition**: API request to /payments/initialize times out
- **Expected**: Error message displayed; form remains for retry
- **Implementation**: Error handler in catch block; isProcessing reset to false

### Edge Case 4: Paystack URL Not Returned
- **Condition**: Backend returns success but authorizationUrl is missing
- **Expected**: Error message "No payment URL received"; form remains for retry
- **Implementation**: Check for authorizationUrl existence before redirecting

### Edge Case 5: Multiple Form Submissions
- **Condition**: User clicks "Proceed to Payment" multiple times
- **Expected**: Only first submission processed; button disabled during processing
- **Implementation**: `disabled={isProcessing}` on submit button; setIsProcessing(true) before API call

## Test Cases

### Test Case 1.1: Project Payment with Valid Data
- **Input**: Form filled with valid name, email, phone; projectRequestId and budget range present
- **Expected**: Form submits; payment data sent with base amount only; sessionStorage updated; redirect to Paystack
- **Validates**: Requirement 1.3, 5.1

### Test Case 1.2: Project Payment Missing Name
- **Input**: Form submitted with empty name field
- **Expected**: Validation error displayed; no API call; form remains
- **Validates**: Requirement 4.1, 4.2

### Test Case 1.3: Project Payment Invalid Phone
- **Input**: Form submitted with incorrectly formatted phone number
- **Expected**: Phone validation error displayed; no API call; form remains
- **Validates**: Requirement 4.1, 4.2

### Test Case 1.4: Project Payment Backend Error
- **Input**: Form submitted with valid data; backend returns error
- **Expected**: Error alert shown; isProcessing reset; form remains for retry
- **Validates**: Requirement 5.1

### Test Case 2.1: Training Payment with Valid Data
- **Input**: Form filled with valid name, email, phone; courseId present
- **Expected**: Form submits; payment data sent with course fee only; sessionStorage updated; redirect to Paystack
- **Validates**: Requirement 2.2, 5.2

### Test Case 2.2: Training Payment Missing Email
- **Input**: Form submitted with empty email field
- **Expected**: Validation error displayed; no API call; form remains
- **Validates**: Requirement 4.1, 4.2

### Test Case 2.3: Training Payment Processing
- **Input**: Form submitted with valid data
- **Expected**: Loading indicator shown; button disabled; processing completes
- **Validates**: Requirement 5.2

### Test Case 3.1: Project Payment Summary Display
- **Input**: Project payment page loaded with valid data
- **Expected**: Summary displays project title, budget range; NO calculation breakdowns shown
- **Validates**: Requirement 3.1

### Test Case 3.2: Training Payment Summary Display
- **Input**: Training payment page loaded with valid course data
- **Expected**: Summary displays course fee; NO processing fee calculation shown
- **Validates**: Requirement 3.2

### Test Case 4.1: Form Validation All Fields Required
- **Input**: Form submitted with each field empty individually
- **Expected**: Validation error for each empty field; no API call for any
- **Validates**: Requirement 4.1

### Test Case 5.1: SessionStorage Updated on Success
- **Input**: Project payment successful
- **Expected**: sessionStorage contains "payment_reference" and "payment_project_id"
- **Validates**: Requirement 5.1

### Test Case 5.2: SessionStorage Updated for Training
- **Input**: Training payment successful
- **Expected**: sessionStorage contains "payment_reference" and "payment_course_id"
- **Validates**: Requirement 5.2

## Acceptance Criteria Mapping

| Requirement | Test Cases | Implementation Status |
|-------------|-----------|----------------------|
| 1.1 | TC 3.1 | Pending |
| 1.2 | TC 3.1 | Pending |
| 1.3 | TC 1.1, TC 5.1 | Pending |
| 2.1 | TC 3.2 | Pending |
| 2.2 | TC 2.1, TC 5.2 | Pending |
| 3.1 | TC 3.1 | Pending |
| 3.2 | TC 3.2 | Pending |
| 4.1 | TC 1.2, TC 1.3, TC 2.2, TC 4.1 | Pending |
| 4.2 | TC 1.2, TC 1.3, TC 2.2, TC 4.1 | Pending |
| 5.1 | TC 1.1, TC 1.4, TC 5.1 | Pending |
| 5.2 | TC 2.1, TC 2.3, TC 5.2 | Pending |
| 6.1 | TC 1.1, TC 1.4 | Backend |
| 6.2 | TC 2.1, TC 2.3 | Backend |
| 7.1 | TC 1.1, TC 1.3, TC 2.1 | Code Review |
| 7.2 | All TCs | Security Review |

## Glossary

| Term | Definition |
|------|-----------|
| **Base Amount** | The full project cost or course fee, before any fees or deposits are calculated |
| **Deposit** | A percentage of the total project cost paid upfront (60% for projects, 30% for training) |
| **Processing Fee** | Payment gateway fee calculated as 1.5% of the amount plus GHS 0.50 |
| **Frontend** | Client-side code (React components) running in the user's browser |
| **Backend** | Server-side code handling business logic, calculations, and data persistence |
| **Paystack** | Third-party payment gateway used for payment processing |
| **SessionStorage** | Browser-based storage for session-specific data (cleared when browser closes) |
| **Authorization URL** | Paystack-provided URL where users complete payment |
| **Payment Phase** | The stage of project payment (deposit, milestone, balance, final) |

## Definition of Done

- [ ] All calculation functions removed from ProjectPaymentPage.jsx
- [ ] All calculation functions removed from TrainingPaymentPage.jsx
- [ ] Payment data objects simplified to include only base amount
- [ ] UI payment summary updated to remove calculation breakdowns
- [ ] Form validation maintained and tested
- [ ] All test cases pass (unit and integration)
- [ ] Backend endpoint supports new payment data structure
- [ ] Backend performs all financial calculations correctly
- [ ] Payment redirection flow working end-to-end
- [ ] SessionStorage properly managed for payment verification
- [ ] Error handling tested and working
- [ ] Code reviewed for security implications
- [ ] User documentation updated with new payment flow
- [ ] No console errors or warnings
