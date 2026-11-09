with open("src/pages/admin/dashboards/RegularAdminDashboard.jsx", "r") as f:
    content = f.read()

# Remove the hardcoded recentActivity mock data
marker1 = """    // Recent Activity Feed
    const recentActivity = [
        { type: 'inquiry', message: 'New contact form submission', detail: 'Training program inquiry', time: '5 mins ago', icon: Mail, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { type: 'enrollment', message: 'Enrollment application received', detail: 'Web Development Bootcamp', time: '18 mins ago', icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-50' },
        { type: 'testimonial', message: 'New testimonial submitted', detail: 'Awaiting approval', time: '45 mins ago', icon: MessageCircle, color: 'text-amber-500', bg: 'bg-amber-50' },
        { type: 'partnership', message: 'Partnership request received', detail: 'InnovateTech Ltd', time: '1 hour ago', icon: Handshake, color: 'text-teal-500', bg: 'bg-teal-50' },
        { type: 'blog', message: 'Blog post draft saved', detail: '"AI in Education: 2025 Trends"', time: '2 hours ago', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-50' },
        { type: 'job', message: 'Job listing updated', detail: 'Senior Developer position', time: '3 hours ago', icon: Briefcase, color: 'text-orange-500', bg: 'bg-orange-50' },
        { type: 'gallery', message: 'New images uploaded', detail: '4 images added to gallery', time: '4 hours ago', icon: Image, color: 'text-pink-500', bg: 'bg-pink-50' },
        { type: 'newsletter', message: 'Newsletter draft created', detail: 'Monthly update - February', time: '5 hours ago', icon: Mail, color: 'text-cyan-500', bg: 'bg-cyan-50' }
    ];"""

replacement1 = """    // Extract real activity data from dashboard
    const recentActivityData = dashboardData?.recentActivity || [];"""

content = content.replace(marker1, replacement1)

# Remove the hardcoded pendingItems mock data
marker2 = """    // Pending items that need attention
    const pendingItems = [
        { title: 'New Job Application: Senior Developer', source: 'Applications', time: '10 mins ago', priority: 'high', icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-50' },
        { title: 'Course Inquiry: Data Science Program', source: 'Contact Form', time: '25 mins ago', priority: 'medium', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Testimonial Awaiting Approval', source: 'Testimonials', time: '1 hour ago', priority: 'low', icon: MessageCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
        { title: 'Blog Post Draft: Review Required', source: 'Content', time: '2 hours ago', priority: 'medium', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
        { title: 'Partnership Application: TechStart Ghana', source: 'Partnerships', time: '3 hours ago', priority: 'medium', icon: Handshake, color: 'text-teal-600', bg: 'bg-teal-50' },
        { title: 'Gallery images need alt text', source: 'Gallery', time: 'Yesterday', priority: 'low', icon: Image, color: 'text-pink-600', bg: 'bg-pink-50' },
    ];"""

replacement2 = """    // Extract real pending actions from dashboard
    const pendingItems = dashboardData?.pendingActions || [];
    
    // Map icon for pending actions based on category
    const getCategoryIcon = (category) => {
        const iconMap = {
            'KYC': Users,
            'Payments': CreditCard,
            'Applications': Briefcase,
            'Projects': FolderKanban,
            'Contact Form': Mail,
            'Training': GraduationCap,
            'Partnerships': Handshake,
            'Newsletter': Mail
        };
        return iconMap[category] || Inbox;
    };
    
    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'high': return { bg: 'bg-red-50', text: 'text-red-600' };
            case 'medium': return { bg: 'bg-amber-50', text: 'text-amber-600' };
            case 'low': return { bg: 'bg-gray-50', text: 'text-gray-600' };
            default: return { bg: 'bg-gray-50', text: 'text-gray-600' };
        }
    };"""

content = content.replace(marker2, replacement2)

with open("src/pages/admin/dashboards/RegularAdminDashboard.jsx", "w") as f:
    f.write(content)

print("Replaced mock data with real API data references")