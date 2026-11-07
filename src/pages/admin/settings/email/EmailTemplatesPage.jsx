import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../../store/slices/uiSlice';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import LoadingSpinner from '../../../../components/admin/shared/LoadingSpinner';
import { useAuth } from '../../../../hooks/useAuth';
import { Mail, Plus, Edit2, Trash2, Shield, Eye } from 'lucide-react';
import { getAllEmailTemplates } from '../../../../services/emailService';

const EmailTemplatesPage = () => {
  const dispatch = useDispatch();
  const { userPermissions, userRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);

  const canManageSettings = userRole === 'super_admin' || (userPermissions?.includes('settings') ?? false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const data = await getAllEmailTemplates();
      setTemplates(Array.isArray(data) ? data : []);
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to load email templates'
      }));
    } finally {
      setLoading(false);
    }
  };

  if (!canManageSettings && userRole !== 'super_admin') {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-red-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Permission Required</h2>
            <p className="text-gray-600 mt-2">You don't have permission to access this page.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (loading) {
    return (
      <AdminLayout>
        <LoadingSpinner text="Loading email templates..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-3 md:space-y-6 max-w-7xl mx-auto pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#004fa2]/5 to-[#0066cc]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-3 sm:gap-4 relative z-10 min-w-0">
            <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center shadow-md shrink-0">
              <Mail className="text-white" size={20} />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight truncate">Email Templates</h1>
              <p className="text-[11px] sm:text-sm text-gray-500 font-medium truncate mt-0.5">Create and manage email templates with variables</p>
            </div>
          </div>
          {canManageSettings && (
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all font-bold text-sm shrink-0">
              <Plus size={18} />
              Create Template
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {templates.length === 0 ? (
            <div className="p-12 text-center">
              <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">No templates found</h3>
              <p className="text-sm text-gray-600">Create your first email template to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {templates.map((template) => (
                <div key={template.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-gray-900 mb-1">{template.name}</h4>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{template.subject}</p>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-600 hover:text-[#004fa2] rounded-lg transition-colors">
                      <Eye size={16} />
                    </button>
                    {canManageSettings && (
                      <>
                        <button className="p-2 text-gray-600 hover:text-[#004fa2] rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </button>
                        {!template.isSystem && (
                          <button className="p-2 text-gray-600 hover:text-red-600 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default EmailTemplatesPage;
