
let mockSettings = {
  // Branding
  siteName: 'ZyraTech Hub',
  siteDescription: 'Empowering Youth Through Technology',
  tagline: 'Empowering Ghana\'s Future Through Technology and Innovation',
  primaryColor: '#004fa2',
  secondaryColor: '#ff6b35',
  logoLight: null,
  logoDark: null,
  favicon: null,

  // Contact Information
  contactEmail: 'info@zyratechhub.com',
  contactPhone: '+233 50 958 2497',
  contactWhatsApp: '233509582497',
  contactAddress: 'Koforidua, Eastern Region, Ghana',

  // HR Contact
  hrName: 'Magdalene',
  hrEmail: 'magdalene@zyratech.com',
  hrTitle: 'HR Coordinator',

  // Social Media Links
  socialLinkedIn: 'https://www.linkedin.com/company/zyra-tech-hub',
  socialTwitter: 'https://x.com/zyratechhub',
  socialInstagram: 'https://www.instagram.com/zyratechhub',
  socialFacebook: 'https://www.facebook.com/zyratechhub',
  socialYouTube: '',

  // Payment Settings
  paystackPublicKey: '',
  paystackSecretKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  currency: 'GHS',

  // Email/SMTP Settings
  smtpHost: '',
  smtpPort: '587',
  smtpUser: '',
  smtpPassword: '',
  fromEmail: 'noreply@zyratechhub.com',
  fromName: 'ZyraTech Hub',
  supportEmail: 'support@zyratechhub.com',

  // SEO Settings
  seoTitle: 'ZyraTech Hub | Empowering Youth Through Technology',
  seoDescription: 'Ghana\'s premier technology education and innovation center providing digital skills training, internships, IT services, and community development programs.',
  seoKeywords: 'tech training Ghana, digital skills, software development, Koforidua, tech hub',
  siteUrl: 'https://zyratechhub.com',

  // Analytics Settings
  googleAnalyticsId: '',
  metaPixelId: '',
  enableVisitorTracking: true,

  // General Settings
  maintenanceMode: false,
  allowRegistration: true,
  timezone: 'Africa/Accra',

  // Business Hours
  businessHoursWeekday: '8:00 AM - 5:00 PM',
  businessHoursWeekend: 'Closed',

  // Copyright
  copyrightYear: new Date().getFullYear(),
  copyrightText: '© {year} Zyra Tech Hub. All rights reserved.'
};

const settingsService = {
  getSettings: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...mockSettings });
      }, 300);
    });
  },

  updateSetting: async (key, value) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockSettings[key] = value;
        resolve({ key, value });
      }, 200);
    });
  },

  updateSettingsBulk: async (settings) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockSettings = { ...mockSettings, ...settings };
        resolve({ ...mockSettings });
      }, 500);
    });
  }
};

export default settingsService;
