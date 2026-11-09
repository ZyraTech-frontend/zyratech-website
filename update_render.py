with open("src/pages/admin/dashboards/RegularAdminDashboard.jsx", "r") as f:
    content = f.read()

# Update the Pending Actions rendering
old_pending = """                    <div className="divide-y divide-gray-50">
                        {pendingItems.map((item, i) => (
                            <div key={i} className="p-3 hover:bg-gray-50 transition-colors flex items-center gap-3">
                                <div className={`w-6 h-6 md:w-8 md:h-8 ${item.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                    <item.icon className={item.color} size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                                    <p className="text-[10px] text-gray-500">{item.source}</p>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.priority === 'high' ? 'bg-red-100 text-red-700' :
                                            item.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                                                'bg-gray-100 text-gray-600'
                                        }`}>
                                        {item.priority}
                                    </span>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>"""

new_pending = """                    <div className="divide-y divide-gray-50">
                        {pendingItems.length > 0 ? (
                            pendingItems.map((item, i) => {
                                const Icon = getCategoryIcon(item.category);
                                const colors = getPriorityColor(item.priority);
                                return (
                                    <div key={i} className="p-3 hover:bg-gray-50 transition-colors flex items-center gap-3">
                                        <div className={`w-6 h-6 md:w-8 md:h-8 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                            <Icon className={colors.text} size={14} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                                            <p className="text-[10px] text-gray-500">{item.category}</p>
                                        </div>
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${colors.bg} ${colors.text}`}>
                                                {item.priority}
                                            </span>
                                            <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-6 text-center text-gray-500">
                                <p className="text-sm">No pending actions</p>
                            </div>
                        )}
                    </div>"""

content = content.replace(old_pending, new_pending)

with open("src/pages/admin/dashboards/RegularAdminDashboard.jsx", "w") as f:
    f.write(content)

print("Updated Pending Actions rendering")