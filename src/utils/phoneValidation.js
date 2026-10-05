/**
 * Phone Number Validation Utilities
 * Ensures consistent phone validation across the application
 */

/**
 * Validate phone number format and length
 * @param {string} phone - Phone number to validate
 * @returns {object} { isValid: boolean, error: string|null }
 */
export const validatePhoneNumber = (phone) => {
  if (!phone || phone.trim() === '') {
    return { isValid: true, error: null }; // Optional field
  }

  const trimmed = phone.trim();

  // Check if only contains valid characters: digits, spaces, hyphens, +, ()
  const phoneRegex = /^[\d\s\-+()]{1,20}$/;
  if (!phoneRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'Phone can only contain digits, spaces, hyphens, +, and parentheses'
    };
  }

  // Extract only digits
  const digitsOnly = trimmed.replace(/\D/g, '');

  // Phone numbers should have 7-15 digits (international standard)
  if (digitsOnly.length < 7) {
    return {
      isValid: false,
      error: 'Phone number must have at least 7 digits'
    };
  }

  if (digitsOnly.length > 15) {
    return {
      isValid: false,
      error: 'Phone number must not exceed 15 digits'
    };
  }

  return { isValid: true, error: null };
};

/**
 * Get phone input HTML attributes for validation
 * @returns {object} Pattern, maxLength, title attributes
 */
export const getPhoneInputAttributes = () => ({
  pattern: '[\\d\\s\\-+()]{0,20}',
  maxLength: '20',
  title: 'Phone can only contain digits, spaces, hyphens, +, and parentheses'
});

/**
 * Format phone number for display (basic formatting)
 * @param {string} phone - Raw phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Format as +XXX XXX XXX XXXX for display
  if (digitsOnly.length > 0) {
    const padded = digitsOnly.padStart(10, '');
    return `+${digitsOnly.slice(0, -10)}${padded.slice(0, 3)} ${padded.slice(3, 6)} ${padded.slice(6)}`.trim();
  }
  return phone;
};

export default {
  validatePhoneNumber,
  getPhoneInputAttributes,
  formatPhoneNumber
};
