with open("src/pages/admin/dashboards/RegularAdminDashboard.jsx", "r") as f:
    content = f.read()

# Find the position after the Welcome Header div closes and before Summary Statistics
marker = "            </div>\n\n            {/* Summary Statistics Row */}"
revenue_section = """            </div>

            {/* Error Alert */}
            {error && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-amber-800">{error}</p>
                </div>
            )}

            {/* REVENUE SECTION - NOW WITH REAL API DATA */}
            {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Revenue Card (4 cols) */}
                    <div className="md:col-span-4">
                        <FinancialCard
                            totalRevenue={stats.totalRevenue || 0}
                            weeklyRevenue={weeklyRevenue}
                            weeklyGrowth={weeklyGrowth}
                        />
                    </div>

                    {/* Revenue Chart (5 cols) */}
                    <div className="md:col-span-5">
                        <ChartCard
                            title="Revenue Trend"
                            subtitle="Last 6 months"
                            data={revenueChart}
                            color="#10b981"
                        />
                    </div>

                    {/* Revenue Breakdown (3 cols) */}
                    <div className="md:col-span-3">
                        <RevenueBreakdownCard breakdown={revenueBreakdown} />
                    </div>
                </div>
            )}

            {/* Summary Statistics Row */}"""

content = content.replace(marker, revenue_section)

with open("src/pages/admin/dashboards/RegularAdminDashboard.jsx", "w") as f:
    f.write(content)

print("Added revenue section and error alert")