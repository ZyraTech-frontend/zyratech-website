/**
 * Newsletter Templates
 * Pre-designed templates for newsletter campaigns
 */

// Template 1: Announcement
export const ANNOUNCEMENT_TEMPLATE = {
    id: 'announcement',
    name: 'Announcement',
    subject: 'Important Update from ZyraTech Hub',
    content: `<table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <tr>
    <td style="background: linear-gradient(135deg, #004fa2 0%, #0066cc 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px;">ZyraTech Hub</h1>
      <p style="color: #e0e0e0; margin: 10px 0 0 0;">Important Announcement</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 40px 20px; background-color: #f9f9f9;">
      <h2 style="color: #004fa2; margin-top: 0;">Exciting News!</h2>
      <p style="color: #333; line-height: 1.6; margin: 15px 0;">
        We're thrilled to share an important update with our community. 
        Your feedback and support continue to drive innovation at ZyraTech Hub.
      </p>
      <p style="color: #333; line-height: 1.6; margin: 15px 0;">
        [Add your announcement details here]
      </p>
      <a href="https://zyratechhub.com" style="display: inline-block; margin-top: 20px; padding: 12px 30px; background-color: #004fa2; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
        Learn More
      </a>
    </td>
  </tr>
  <tr>
    <td style="padding: 20px; background-color: #f0f0f0; text-align: center; font-size: 12px; color: #999;">
      <p style="margin: 0;">© 2026 ZyraTech Hub. All rights reserved.</p>
      <p style="margin: 5px 0 0 0;"><a href="#" style="color: #004fa2; text-decoration: none;">Unsubscribe</a></p>
    </td>
  </tr>
</table>`
};

// Template 2: Course Launch
export const COURSE_LAUNCH_TEMPLATE = {
    id: 'course_launch',
    name: 'Course Launch',
    subject: 'New Course Available: [Course Name]',
    content: `<table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <tr>
    <td style="background: linear-gradient(135deg, #004fa2 0%, #0066cc 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px;">🚀 New Course Available</h1>
    </td>
  </tr>
  <tr>
    <td style="padding: 40px 20px; background-color: #f9f9f9;">
      <h2 style="color: #004fa2; margin-top: 0;">[Course Title]</h2>
      <p style="color: #666; font-size: 14px; margin: 10px 0;">Learn from industry experts</p>
      
      <p style="color: #333; line-height: 1.6; margin: 20px 0;">
        We're excited to announce the launch of our new course! 
        This comprehensive program covers:
      </p>
      
      <ul style="color: #333; line-height: 1.8;">
        <li>Module 1: [Topic]</li>
        <li>Module 2: [Topic]</li>
        <li>Module 3: [Topic]</li>
      </ul>
      
      <p style="color: #333; line-height: 1.6;">
        <strong>Duration:</strong> [X weeks] | <strong>Level:</strong> [Beginner/Intermediate/Advanced]
      </p>
      
      <a href="https://zyratechhub.com/courses" style="display: inline-block; margin-top: 20px; padding: 14px 40px; background-color: #004fa2; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">
        Enroll Now
      </a>
    </td>
  </tr>
  <tr>
    <td style="padding: 20px; background-color: #f0f0f0; text-align: center; font-size: 12px; color: #999;">
      <p style="margin: 0;">© 2026 ZyraTech Hub. All rights reserved.</p>
      <p style="margin: 5px 0 0 0;"><a href="#" style="color: #004fa2; text-decoration: none;">Unsubscribe</a></p>
    </td>
  </tr>
</table>`
};

// Template 3: Event Invitation
export const EVENT_TEMPLATE = {
    id: 'event',
    name: 'Event Invitation',
    subject: 'You\'re Invited: [Event Name] - [Date]',
    content: `<table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <tr>
    <td style="background: linear-gradient(135deg, #004fa2 0%, #0066cc 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px;">📅 You're Invited!</h1>
    </td>
  </tr>
  <tr>
    <td style="padding: 40px 20px; background-color: #f9f9f9;">
      <h2 style="color: #004fa2; margin-top: 0;">[Event Name]</h2>
      
      <div style="background-color: #e3f2fd; padding: 20px; border-left: 4px solid #004fa2; margin: 20px 0;">
        <p style="margin: 8px 0;"><strong>📍 Location:</strong> [Location/Virtual Link]</p>
        <p style="margin: 8px 0;"><strong>📅 Date:</strong> [Date & Time]</p>
        <p style="margin: 8px 0;"><strong>👥 Attendees:</strong> [Expected Count]</p>
      </div>
      
      <p style="color: #333; line-height: 1.6; margin: 20px 0;">
        We're thrilled to invite you to our upcoming event! 
        Join us for an inspiring session featuring industry leaders discussing the latest trends.
      </p>
      
      <a href="https://zyratechhub.com/events" style="display: inline-block; margin-top: 20px; padding: 14px 40px; background-color: #004fa2; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">
        Reserve Your Spot
      </a>
    </td>
  </tr>
  <tr>
    <td style="padding: 20px; background-color: #f0f0f0; text-align: center; font-size: 12px; color: #999;">
      <p style="margin: 0;">© 2026 ZyraTech Hub. All rights reserved.</p>
      <p style="margin: 5px 0 0 0;"><a href="#" style="color: #004fa2; text-decoration: none;">Unsubscribe</a></p>
    </td>
  </tr>
</table>`
};

// Template 4: Newsletter
export const NEWSLETTER_TEMPLATE = {
    id: 'newsletter',
    name: 'Monthly Newsletter',
    subject: 'ZyraTech Hub Monthly Newsletter - [Month]',
    content: `<table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <tr>
    <td style="background: linear-gradient(135deg, #004fa2 0%, #0066cc 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px;">📰 Newsletter</h1>
      <p style="color: #e0e0e0; margin: 10px 0 0 0;">[Month] Edition</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 40px 20px; background-color: #f9f9f9;">
      <h2 style="color: #004fa2; margin-top: 0;">Top Stories This Month</h2>
      
      <div style="border-bottom: 1px solid #ddd; padding: 20px 0;">
        <h3 style="color: #333; margin: 0 0 10px 0;">Story #1: [Headline]</h3>
        <p style="color: #666; line-height: 1.6; margin: 0;">
          Brief description of the story goes here. Add your content and key takeaways.
        </p>
        <a href="#" style="color: #004fa2; text-decoration: none; font-weight: bold;">Read More →</a>
      </div>
      
      <div style="border-bottom: 1px solid #ddd; padding: 20px 0;">
        <h3 style="color: #333; margin: 0 0 10px 0;">Story #2: [Headline]</h3>
        <p style="color: #666; line-height: 1.6; margin: 0;">
          Brief description of the story goes here. Add your content and key takeaways.
        </p>
        <a href="#" style="color: #004fa2; text-decoration: none; font-weight: bold;">Read More →</a>
      </div>
      
      <div style="padding: 20px 0;">
        <h3 style="color: #333; margin: 0 0 10px 0;">Coming Up Next</h3>
        <p style="color: #666; line-height: 1.6; margin: 0;">
          Stay tuned for upcoming courses, events, and features...
        </p>
      </div>
    </td>
  </tr>
  <tr>
    <td style="padding: 20px; background-color: #f0f0f0; text-align: center; font-size: 12px; color: #999;">
      <p style="margin: 0;">© 2026 ZyraTech Hub. All rights reserved.</p>
      <p style="margin: 5px 0 0 0;"><a href="#" style="color: #004fa2; text-decoration: none;">Unsubscribe</a></p>
    </td>
  </tr>
</table>`
};

// Template 5: Promotional
export const PROMOTIONAL_TEMPLATE = {
    id: 'promotional',
    name: 'Promotional Offer',
    subject: '🎉 Special Offer: [Offer]',
    content: `<table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <tr>
    <td style="background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 32px;">🎉 Special Offer!</h1>
      <p style="color: #fff; margin: 10px 0 0 0; font-size: 18px;">Limited Time Only</p>
    </td>
  </tr>
  <tr>
    <td style="padding: 40px 20px; background-color: #f9f9f9;">
      <div style="background-color: #fff3e0; border: 2px solid #ff6b35; padding: 30px; text-align: center; border-radius: 8px; margin: 20px 0;">
        <p style="color: #ff6b35; font-size: 14px; margin: 0;">EXCLUSIVE OFFER</p>
        <h2 style="color: #333; margin: 10px 0; font-size: 28px;">Get 50% OFF</h2>
        <p style="color: #666; margin: 10px 0;">On all courses this month</p>
        <p style="color: #999; font-size: 12px; margin: 15px 0;">Use code: <strong style="font-size: 14px; color: #ff6b35;">ZYRA50</strong></p>
      </div>
      
      <p style="color: #333; line-height: 1.6; margin: 20px 0;">
        This month, we're offering an incredible discount on our entire course library!
        Whether you're looking to upskill or explore new topics, now's the perfect time.
      </p>
      
      <a href="https://zyratechhub.com/courses" style="display: block; text-align: center; margin-top: 30px; padding: 16px 40px; background-color: #ff6b35; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">
        Claim Your Discount Now
      </a>
      
      <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
        Offer expires on [Date]. Terms and conditions apply.
      </p>
    </td>
  </tr>
  <tr>
    <td style="padding: 20px; background-color: #f0f0f0; text-align: center; font-size: 12px; color: #999;">
      <p style="margin: 0;">© 2026 ZyraTech Hub. All rights reserved.</p>
      <p style="margin: 5px 0 0 0;"><a href="#" style="color: #004fa2; text-decoration: none;">Unsubscribe</a></p>
    </td>
  </tr>
</table>`
};

export const ALL_TEMPLATES = [
    ANNOUNCEMENT_TEMPLATE,
    COURSE_LAUNCH_TEMPLATE,
    EVENT_TEMPLATE,
    NEWSLETTER_TEMPLATE,
    PROMOTIONAL_TEMPLATE
];
