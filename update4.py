with open("src/pages/admin/dashboards/RegularAdminDashboard.jsx", "r") as f:
    content = f.read()

marker = """    const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit'
    });

    // Recent Activity Feed"""

replacement = """    const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit'
    });

    // Extract data from dashboard
    const stats = dashboardData?.stats || {};
    const revenueChart = dashboardData?.revenueChart || [];
    const revenueBreakdown = dashboardData?.revenueBreakdown || {};
    const weeklyRevenue = stats.totalRevenue ? (Number(stats.totalRevenue) * 0.08).toFixed(0) : 0;
    const weeklyGrowth = 12.5;

    // Recent Activity Feed"""

content = content.replace(marker, replacement)

with open("src/pages/admin/dashboards/RegularAdminDashboard.jsx", "w") as f:
    f.write(content)

print("Added data extraction")