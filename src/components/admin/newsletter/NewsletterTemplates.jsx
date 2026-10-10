/**
 * Newsletter Templates
 * Production-tested, professional email templates
 * Based on industry standards (Postmark, Lee Munroe, Cerberus, Mailchimp)
 */

// Template 1: Professional Newsletter (Modern Clean Design)
export const PROFESSIONAL_NEWSLETTER_TEMPLATE = {
    id: 'professional_newsletter',
    name: 'Professional Newsletter',
    subject: 'ZyraTech Hub Newsletter - [Month]',
    content: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZyraTech Newsletter</title>
    <style type="text/css">
        body { margin:0; padding:0; min-width:100%!important; }
        .content { width: 100%; max-width: 600px; }
        table { border-collapse: collapse; width: 100%; }
        img { border: 0; display: block; outline: none; text-decoration: none; -ms-interpolation-mode: nearest-neighbor; }
    </style>
</head>
<body style="margin:0; padding:0; min-width:100%!important;">
    <table cellpadding="0" cellspacing="0" style="background-color: #f9f9f9;">
        <tr>
            <td style="padding: 20px 0;">
                <table cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #004fa2 0%, #0066cc 100%); padding: 40px 20px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-family: Arial, sans-serif;">ZyraTech Hub</h1>
                            <p style="color: #e8f0ff; margin: 8px 0 0 0; font-family: Arial, sans-serif; font-size: 14px;">Monthly Newsletter</p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 20px; font-family: Arial, sans-serif; color: #333333;">
                            <h2 style="color: #004fa2; margin: 0 0 20px 0; font-size: 22px;">Hello [Subscriber Name],</h2>
                            
                            <p style="margin: 0 0 20px 0; line-height: 1.6; color: #555555;">
                                Welcome to this month's ZyraTech Hub newsletter. We're excited to share the latest updates, insights, and opportunities with our community.
                            </p>
                            
                            <!-- Featured Section -->
                            <table cellpadding="0" cellspacing="0" style="margin: 30px 0; border: 1px solid #e0e0e0;">
                                <tr>
                                    <td style="padding: 20px; background-color: #f5f5f5;">
                                        <h3 style="margin: 0 0 10px 0; color: #004fa2; font-size: 18px;">Featured: [Title]</h3>
                                        <p style="margin: 0; line-height: 1.6; color: #666666;">
                                            [Add featured content here. This could be a new course, announcement, or important update.]
                                        </p>
                                        <a href="#" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background-color: #004fa2; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 14px;">Read More</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Articles Section -->
                            <h3 style="color: #004fa2; margin: 30px 0 15px 0; font-size: 18px;">Latest Updates</h3>
                            
                            <table cellpadding="0" cellspacing="0" style="margin: 0 0 20px 0;">
                                <tr>
                                    <td style="border-bottom: 1px solid #e0e0e0; padding: 15px 0;">
                                        <h4 style="margin: 0 0 5px 0; color: #333333; font-size: 16px;">New Course: [Course Title]</h4>
                                        <p style="margin: 0; font-size: 13px; color: #999999;">Posted 3 days ago</p>
                                        <p style="margin: 8px 0 0 0; color: #666666; line-height: 1.5;">
                                            Learn the latest skills from industry experts...
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border-bottom: 1px solid #e0e0e0; padding: 15px 0;">
                                        <h4 style="margin: 0 0 5px 0; color: #333333; font-size: 16px;">Community Spotlight: [Topic]</h4>
                                        <p style="margin: 0; font-size: 13px; color: #999999;">Posted 1 week ago</p>
                                        <p style="margin: 8px 0 0 0; color: #666666; line-height: 1.5;">
                                            Celebrating the achievements of our community members...
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Section -->
                            <table cellpadding="0" cellspacing="0" style="margin: 40px 0; text-align: center;">
                                <tr>
                                    <td>
                                        <a href="https://zyratechhub.com" style="display: inline-block; padding: 15px 40px; background-color: #004fa2; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">Explore More</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f5f5f5; padding: 20px; text-align: center; font-family: Arial, sans-serif; font-size: 12px; color: #999999; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0 0 10px 0;">© 2026 ZyraTech Hub. All rights reserved.</p>
                            <p style="margin: 0;"><a href="#" style="color: #004fa2; text-decoration: none;">Update Preferences</a> | <a href="#" style="color: #004fa2; text-decoration: none;">Unsubscribe</a></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
};

// Template 2: Promotional/Offer (High Impact Design)
export const PROMOTIONAL_OFFER_TEMPLATE = {
    id: 'promotional_offer',
    name: 'Promotional Offer',
    subject: '🎉 Special Offer: [Discount]% OFF - Limited Time!',
    content: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZyraTech Special Offer</title>
</head>
<body style="margin:0; padding:0; min-width:100%!important;">
    <table cellpadding="0" cellspacing="0" style="width:100%; background-color:#f9f9f9;">
        <tr>
            <td style="padding: 20px 0;">
                <table cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto; background-color:#ffffff;">
                    <!-- Hero Banner -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%); padding: 60px 20px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 42px; font-family: Arial, sans-serif;">🎉 SPECIAL OFFER</h1>
                            <p style="color: #ffffff; margin: 10px 0 0 0; font-family: Arial, sans-serif; font-size: 18px;">Limited Time Only!</p>
                        </td>
                    </tr>
                    
                    <!-- Offer Details -->
                    <tr>
                        <td style="padding: 40px 20px; text-align: center; font-family: Arial, sans-serif;">
                            <table cellpadding="0" cellspacing="0" style="max-width: 500px; margin: 0 auto; background-color: #fff8f3; border: 3px solid #ff6b35; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 30px 20px;">
                                        <p style="margin: 0 0 10px 0; font-size: 14px; color: #ff6b35; font-weight: bold;">LIMITED TIME OFFER</p>
                                        <h2 style="margin: 0 0 20px 0; font-size: 48px; color: #ff6b35;">50% OFF</h2>
                                        <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333;">
                                            All Courses &amp; Training Programs
                                        </p>
                                        <p style="margin: 0; font-size: 12px; color: #666666;">
                                            Use code: <strong style="font-size: 16px; color: #ff6b35;">SAVE50</strong>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 30px 0; font-size: 16px; color: #333333; line-height: 1.6;">
                                Don't miss this incredible opportunity! Upskill yourself or explore new topics at unbeatable prices.
                            </p>
                            
                            <a href="https://zyratechhub.com/courses" style="display: inline-block; padding: 18px 50px; background-color: #ff6b35; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 18px; margin: 20px 0;">
                                Claim Your Discount
                            </a>
                            
                            <p style="margin: 30px 0 0 0; font-size: 12px; color: #999999;">
                                Expires [Date]. Terms and conditions apply.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Features -->
                    <tr>
                        <td style="padding: 40px 20px; background-color: #f9f9f9;">
                            <h3 style="text-align: center; margin: 0 0 30px 0; color: #333333; font-family: Arial, sans-serif;">What You'll Get:</h3>
                            <table cellpadding="0" cellspacing="0" style="width: 100%;">
                                <tr>
                                    <td style="padding: 0 20px 20px 0; text-align: center;">
                                        <p style="font-size: 32px; margin: 0 0 10px 0;">📚</p>
                                        <p style="margin: 0; font-size: 14px; color: #666666; font-family: Arial, sans-serif;">Expert-Led Courses</p>
                                    </td>
                                    <td style="padding: 0 20px 20px 20px; text-align: center;">
                                        <p style="font-size: 32px; margin: 0 0 10px 0;">🎯</p>
                                        <p style="margin: 0; font-size: 14px; color: #666666; font-family: Arial, sans-serif;">Lifetime Access</p>
                                    </td>
                                    <td style="padding: 0 0 20px 20px; text-align: center;">
                                        <p style="font-size: 32px; margin: 0 0 10px 0;">🏆</p>
                                        <p style="margin: 0; font-size: 14px; color: #666666; font-family: Arial, sans-serif;">Certificates</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f5f5f5; padding: 20px; text-align: center; font-family: Arial, sans-serif; font-size: 12px; color: #999999; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0 0 10px 0;">© 2026 ZyraTech Hub. All rights reserved.</p>
                            <p style="margin: 0;"><a href="#" style="color: #ff6b35; text-decoration: none;">Unsubscribe</a></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
};

// Template 3: Event/Announcement (Minimal & Professional)
export const EVENT_ANNOUNCEMENT_TEMPLATE = {
    id: 'event_announcement',
    name: 'Event Announcement',
    subject: '📅 Invitation: [Event Name] - [Date]',
    content: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Announcement</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif;">
    <table cellpadding="0" cellspacing="0" style="width:100%; background-color:#f5f5f5;">
        <tr>
            <td style="padding: 20px;">
                <table cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius: 8px; overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #004fa2 0%, #0066cc 100%); padding: 30px 20px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">📅 You're Invited!</h1>
                            <p style="color: #e8f0ff; margin: 8px 0 0 0; font-size: 14px;">Join us for an exciting event</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 20px;">
                            <h2 style="color: #004fa2; margin: 0 0 20px 0; font-size: 22px;">[Event Name]</h2>
                            
                            <!-- Event Details Box -->
                            <table cellpadding="0" cellspacing="0" style="width: 100%; margin: 0 0 30px 0; background-color: #f0f5ff; border-left: 4px solid #004fa2;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="margin: 0 0 12px 0;"><strong style="color: #004fa2;">📍 Location:</strong> [Location/Virtual Link]</p>
                                        <p style="margin: 0 0 12px 0;"><strong style="color: #004fa2;">📅 Date & Time:</strong> [Date & Time]</p>
                                        <p style="margin: 0 0 12px 0;"><strong style="color: #004fa2;">👥 Attendees:</strong> Expected [Number] participants</p>
                                        <p style="margin: 0;"><strong style="color: #004fa2;">🎯 Speaker:</strong> [Speaker Name]</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 0 0 15px 0; line-height: 1.6; color: #555555;">
                                We're thrilled to invite you to our upcoming event! Join industry leaders and community members for an engaging session on [Topic].
                            </p>
                            
                            <p style="margin: 0 0 30px 0; line-height: 1.6; color: #555555;">
                                <strong>What to expect:</strong>
                            </p>
                            <ul style="margin: 0 0 30px 0; padding: 0 0 0 20px;">
                                <li style="margin: 0 0 8px 0; color: #555555;">Insightful presentations from industry experts</li>
                                <li style="margin: 0 0 8px 0; color: #555555;">Interactive Q&A sessions</li>
                                <li style="margin: 0 0 8px 0; color: #555555;">Networking opportunities with fellow professionals</li>
                                <li style="margin: 0; color: #555555;">Exclusive resources and materials</li>
                            </ul>
                            
                            <table cellpadding="0" cellspacing="0" style="width: 100%; margin: 40px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="#" style="display: inline-block; padding: 14px 40px; background-color: #004fa2; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold;">Reserve Your Spot</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999999; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0 0 10px 0;">© 2026 ZyraTech Hub. All rights reserved.</p>
                            <p style="margin: 0;"><a href="#" style="color: #004fa2; text-decoration: none;">Unsubscribe</a> | <a href="#" style="color: #004fa2; text-decoration: none;">View in Browser</a></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
};

// Template 4: Welcome Email (Transactional)
export const WELCOME_EMAIL_TEMPLATE = {
    id: 'welcome_email',
    name: 'Welcome Email',
    subject: 'Welcome to ZyraTech Hub!',
    content: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ZyraTech Hub</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table cellpadding="0" cellspacing="0" style="width:100%;">
        <tr>
            <td style="padding: 20px;">
                <table cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto; background-color:#ffffff;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #004fa2 0%, #0066cc 100%); padding: 40px 20px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome! 🎉</h1>
                            <p style="color: #e8f0ff; margin: 10px 0 0 0; font-size: 14px;">You're now part of the ZyraTech community</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 20px; color: #333333;">
                            <h2 style="margin: 0 0 20px 0; color: #004fa2; font-size: 22px;">Hello [Name]!</h2>
                            
                            <p style="margin: 0 0 20px 0; line-height: 1.6; color: #555555;">
                                Thank you for joining ZyraTech Hub! We're excited to have you on board. Whether you're here to learn new skills, connect with professionals, or explore opportunities, you're in the right place.
                            </p>
                            
                            <h3 style="margin: 30px 0 20px 0; color: #004fa2; font-size: 18px;">Getting Started:</h3>
                            
                            <table cellpadding="0" cellspacing="0" style="width: 100%; margin: 0 0 30px 0;">
                                <tr>
                                    <td style="padding: 15px; background-color: #f9f9f9; margin-bottom: 10px; border-left: 4px solid #004fa2;">
                                        <p style="margin: 0 0 5px 0; font-weight: bold; color: #004fa2;">1. Complete Your Profile</p>
                                        <p style="margin: 0; font-size: 14px; color: #666666;">Add a profile picture and bio to help others learn about you</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px; background-color: #f9f9f9; margin-bottom: 10px; border-left: 4px solid #004fa2;">
                                        <p style="margin: 0 0 5px 0; font-weight: bold; color: #004fa2;">2. Explore Courses</p>
                                        <p style="margin: 0; font-size: 14px; color: #666666;">Browse our library of expert-led courses and start learning</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px; background-color: #f9f9f9; border-left: 4px solid #004fa2;">
                                        <p style="margin: 0 0 5px 0; font-weight: bold; color: #004fa2;">3. Join the Community</p>
                                        <p style="margin: 0; font-size: 14px; color: #666666;">Connect with other learners and professionals in our network</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <table cellpadding="0" cellspacing="0" style="width: 100%; margin: 40px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="https://zyratechhub.com/dashboard" style="display: inline-block; padding: 14px 40px; background-color: #004fa2; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold;">Go to Dashboard</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 30px 0 0 0; line-height: 1.6; color: #666666; font-size: 14px;">
                                Have questions? Our support team is here to help. Feel free to reach out anytime.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999999; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0 0 10px 0;">© 2026 ZyraTech Hub. All rights reserved.</p>
                            <p style="margin: 0;"><a href="#" style="color: #004fa2; text-decoration: none;">Privacy Policy</a> | <a href="#" style="color: #004fa2; text-decoration: none;">Unsubscribe</a></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
};

// Template 5: Course Launch (Announcement)
export const COURSE_LAUNCH_TEMPLATE = {
    id: 'course_launch',
    name: 'Course Launch',
    subject: '🚀 New Course Available: [Course Title]',
    content: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Course Launch</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif;">
    <table cellpadding="0" cellspacing="0" style="width:100%; background-color:#f9f9f9;">
        <tr>
            <td style="padding: 20px;">
                <table cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto; background-color:#ffffff;">
                    <!-- Hero -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #004fa2 0%, #0066cc 100%); padding: 40px 20px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 32px;">🚀 New Course</h1>
                            <p style="color: #e8f0ff; margin: 10px 0 0 0; font-size: 16px;">Now Available!</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 20px;">
                            <h2 style="margin: 0 0 10px 0; color: #004fa2; font-size: 24px;">[Course Title]</h2>
                            <p style="margin: 0 0 20px 0; font-size: 14px; color: #999999;">Learn from industry experts</p>
                            
                            <!-- Course Details -->
                            <table cellpadding="0" cellspacing="0" style="width: 100%; margin: 30px 0; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 15px 0; border-bottom: 1px solid #e0e0e0;">
                                        <p style="margin: 0 0 5px 0; color: #999999; font-size: 12px;">DURATION</p>
                                        <p style="margin: 0; color: #333333; font-size: 16px; font-weight: bold;">[X Weeks] • [Y Hours]</p>
                                    </td>
                                    <td style="padding: 15px 0 15px 20px; border-bottom: 1px solid #e0e0e0; border-left: 1px solid #e0e0e0;">
                                        <p style="margin: 0 0 5px 0; color: #999999; font-size: 12px;">LEVEL</p>
                                        <p style="margin: 0; color: #333333; font-size: 16px; font-weight: bold;">[Beginner/Intermediate/Advanced]</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding: 15px 0;">
                                        <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6;">
                                            [Add course description. Highlight key learning outcomes and benefits.]
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <h3 style="margin: 30px 0 15px 0; color: #004fa2; font-size: 16px;">What You'll Learn:</h3>
                            <ul style="margin: 0 0 30px 0; padding: 0 0 0 20px; color: #666666;">
                                <li style="margin: 0 0 8px 0;">Key concept 1</li>
                                <li style="margin: 0 0 8px 0;">Key concept 2</li>
                                <li style="margin: 0 0 8px 0;">Key concept 3</li>
                                <li style="margin: 0;">Hands-on projects and real-world applications</li>
                            </ul>
                            
                            <table cellpadding="0" cellspacing="0" style="width: 100%; margin: 40px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="https://zyratechhub.com/courses" style="display: inline-block; padding: 14px 40px; background-color: #004fa2; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">Enroll Now</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 20px 0 0 0; font-size: 13px; color: #999999; text-align: center;">
                                Limited spots available. Enroll today to secure your place!
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999999; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0 0 10px 0;">© 2026 ZyraTech Hub. All rights reserved.</p>
                            <p style="margin: 0;"><a href="#" style="color: #004fa2; text-decoration: none;">Unsubscribe</a></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
};

export const ALL_TEMPLATES = [
    PROFESSIONAL_NEWSLETTER_TEMPLATE,
    PROMOTIONAL_OFFER_TEMPLATE,
    EVENT_ANNOUNCEMENT_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE,
    COURSE_LAUNCH_TEMPLATE
];
