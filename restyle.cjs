const fs = require('fs');
const file = 'c:/Users/Mihael Afedi/Desktop/ZyraTech-website/src/pages/admin/settings/SettingsPage.jsx';

let content = fs.readFileSync(file, 'utf8');

// 1. Inputs
content = content.replace(/className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"/g, 'className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-[13px] sm:text-sm text-gray-900 bg-gray-50 hover:bg-white focus:bg-white shadow-sm transition-all"');

content = content.replace(/className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 font-mono text-sm"/g, 'className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-[13px] sm:text-sm font-mono text-gray-900 bg-gray-50 hover:bg-white focus:bg-white shadow-sm transition-all"');

content = content.replace(/className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"/g, 'className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-[13px] sm:text-sm text-gray-900 bg-gray-50 hover:bg-white focus:bg-white shadow-sm transition-all"');

content = content.replace(/className="h-10 w-20 border border-gray-300 rounded cursor-pointer"/g, 'className="h-12 w-20 rounded-xl border border-gray-200 cursor-pointer shadow-sm p-0 overflow-hidden"');

// 2. Labels
content = content.replace(/className="block text-sm font-medium text-gray-700 mb-2"/g, 'className="block text-[11px] sm:text-xs font-bold text-gray-800 uppercase tracking-wider mb-2"');

content = content.replace(/className="text-lg font-semibold text-gray-900 mb-4/g, 'className="text-[12px] sm:text-sm font-bold text-[#004fa2] uppercase tracking-wider mb-5');

// 3. Save Buttons
content = content.replace(/className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"/g, 'className="flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:shadow-lg transition-all font-bold text-[13px] sm:text-sm disabled:opacity-50 mt-6 shadow-sm"');

// 4. Upload Blocks
content = content.replace(/className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"/g, 'className="border-2 border-dashed border-gray-200 hover:border-[#004fa2]/50 bg-gray-50 hover:bg-[#004fa2]/5 transition-all rounded-xl p-4 sm:p-6 text-center cursor-pointer group"');

content = content.replace(/className="mx-auto h-8 w-8 text-gray-400 mb-2"/g, 'className="mx-auto h-8 w-8 text-gray-400 group-hover:text-[#004fa2] mb-2 transition-colors"');

content = content.replace(/className="text-sm text-gray-600">Upload/g, 'className="text-[11px] sm:text-xs font-semibold text-gray-600 group-hover:text-[#004fa2] transition-colors">Upload');

fs.writeFileSync(file, content);
console.log("Done");
