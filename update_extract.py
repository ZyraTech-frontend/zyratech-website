with open("src/pages/admin/dashboards/RegularAdminDashboard.jsx", "r") as f:
    content = f.read()

marker = """    // Extract data from dashboard
    const stats = dashboardData?.stats || {};
    const revenueChart = dashboardData?.revenueChart || [];
    const revenueBreakdown = dashboardData?.revenueBreakdown || {};
    const weeklyRevenue = stats.totalRevenue ? (Number(stats.totalRevenue) * 0.08).toFixed(0) : 0;
    const weeklyGrowth = 12.5;

    // Extract real activity data from dashboard
    const recentActivityData = dashboardData?.recentActivity || [];"""

replacement = """    // Extract data from dashboard
    const stats = dashboardData?.stats || {};
    const revenueChart = dashboardData?.revenueChart || [];
    const revenueBreakdown = dashboardData?.revenueBreakdown || {};
    const weeklyRevenue = stats.totalRevenue ? (Number(stats.totalRevenue) * 0.08).toFixed(0) : 0;
    const weeklyGrowth = 12.5;

    // Extract real activity and pending data from dashboard
    const recentActivityData = dashboardData?.recentActivity || [];
    const pendingItems = dashboardData?.pendingActions || [];"""

content = content.replace(marker, replacement)

# Also need to remove the duplicate pendingItems assignment that we already added
old_dup = """    // Extract real pending actions from dashboard
    const pendingItems = dashboardData?.pendingActions || [];
    
    // Map icon for pending actions based on category"""

new_dup = """    // Map icon for pending actions based on category"""

content = content.replace(old_dup, new_dup)

with open("src/pages/admin/dashboards/RegularAdminDashboard.jsx", "w") as f:
    f.write(content)

print("Updated data extraction to include pending actions from dashboard")