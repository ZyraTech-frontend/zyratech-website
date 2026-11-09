with open("src/pages/admin/dashboards/RegularAdminDashboard.jsx", "r") as f:
    content = f.read()

# Update the Recent Activity rendering
old_activity = """                    <div className="divide-y divide-gray-50 max-h-[350px] overflow-y-auto">
                        {recentActivity.map((activity, i) => (
                            <div key={i} className="p-3 hover:bg-gray-50 transition">
                                <div className="flex items-start gap-2.5">
                                    <div className={`w-6 h-6 ${activity.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                        <activity.icon className={activity.color} size={12} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{activity.message}</p>
                                        <p className="text-[10px] text-gray-500 truncate">{activity.detail}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>"""

new_activity = """                    <div className="divide-y divide-gray-50 max-h-[350px] overflow-y-auto">
                        {recentActivityData.length > 0 ? (
                            recentActivityData.map((activity, i) => {
                                const typeIconMap = {
                                    payment: CreditCard,
                                    inquiry: Mail,
                                    enrollment: GraduationCap,
                                    user: UserPlus
                                };
                                const typeColorMap = {
                                    payment: { bg: 'bg-green-50', text: 'text-green-600' },
                                    inquiry: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
                                    enrollment: { bg: 'bg-blue-50', text: 'text-blue-600' },
                                    user: { bg: 'bg-purple-50', text: 'text-purple-600' }
                                };
                                const Icon = typeIconMap[activity.type] || Mail;
                                const colors = typeColorMap[activity.type] || { bg: 'bg-gray-50', text: 'text-gray-600' };
                                return (
                                    <div key={i} className="p-3 hover:bg-gray-50 transition">
                                        <div className="flex items-start gap-2.5">
                                            <div className={`w-6 h-6 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                                <Icon className={colors.text} size={12} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                                                <p className="text-[10px] text-gray-500 truncate">{activity.description || activity.user}</p>
                                            </div>
                                            <span className="text-[10px] text-gray-400 whitespace-nowrap">{activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'Just now'}</span>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-6 text-center text-gray-500">
                                <p className="text-sm">No recent activity</p>
                            </div>
                        )}
                    </div>"""

content = content.replace(old_activity, new_activity)

with open("src/pages/admin/dashboards/RegularAdminDashboard.jsx", "w") as f:
    f.write(content)

print("Updated Recent Activity rendering")