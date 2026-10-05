/**
 * Phone Number Validation Utilities
 * Ensures consistent phone validation across the application
 */

// Country phone codes and details
export const COUNTRY_CODES = [
  { code: 'GH', name: 'Ghana', dial: '+233', flag: '🇬🇭', placeholder: '05XXXXXXXX' },
  { code: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬', placeholder: '0XXXXXXXXXXX' },
  { code: 'KE', name: 'Kenya', dial: '+254', flag: '🇰🇪', placeholder: '07XXXXXXXX' },
  { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦', placeholder: '06XXXXXXXX' },
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸', placeholder: '2015550000' },
  { code: 'UK', name: 'United Kingdom', dial: '+44', flag: '🇬🇧', placeholder: '20XXXXXXXX' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦', placeholder: '2015550000' },
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳', placeholder: '8000000000' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺', placeholder: '2XXXXXXXX' },
  { code: 'OTHER', name: 'Other', dial: '+', flag: '🌍', placeholder: 'XXXXXXXXX' }
];

/**
 * Validate phone number format and length
 * @param {string} phone - Phone number to validate (without country code)
 * @returns {object} { isValid: boolean, error: string|null }
 */
export const validatePhoneNumber = (phone) => {
  if (!phone || phone.trim() === '') {
    return { isValid: false, error: 'Phone number is required' };
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
  // This includes numbers starting with 0 (like Ghana: 0537128949 = 10 digits ✓)
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
 * Format complete phone number with country code
 * @param {string} countryCode - Country code (e.g., 'GH')
 * @param {string} phone - Phone number
 * @returns {string} Complete phone with country code (e.g., '+233 537 128 949')
 */
export const formatCompletePhoneNumber = (countryCode, phone) => {
  if (!countryCode || !phone) return '';
  
  const country = COUNTRY_CODES.find(c => c.code === countryCode);
  if (!country) return phone;
  
  const digitsOnly = phone.replace(/\D/g, '');
  return `${country.dial} ${digitsOnly}`;
};

export default {
  COUNTRY_CODES,
  validatePhoneNumber,
  getPhoneInputAttributes,
  formatCompletePhoneNumber
};
