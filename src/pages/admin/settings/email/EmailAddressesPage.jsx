import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../../store/slices/uiSlice';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import LoadingSpinner from '../../../../components/admin/shared/LoadingSpinner';
import { useAuth } from '../../../../hooks/useAuth';
import { Mail, Edit2, Shield, Save, X, CheckCircle, XCircle, Power } from 'lucide-react';
import { getAllEmailAddresses, updateEmailAddress, toggleEmailAddress } from '../../../../services/emailService';

const EmailAddressesPage = () => {
  const dispatch = useDispatch();
  const { userPermissions, userRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [emailAddresses, setEmailAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  const canManageSettings = userRole === 'super_admin' || (userPermissions?.includes('settings') ?? false);

  useEffect(() => {
    loadEmailAddresses();
  }, []);

  const loadEmailAddresses = async () => {
    try {
      const data = await getAllEmailAddresses();
      setEmailAddresses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('[EmailAddressesPage]', error);
      setEmailAddresses([]);
      dispatch(addNotification({
        type: 'error',
        message: 'Backend endpoint not available or failed'
      }));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <AdminLayout><LoadingSpinner /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">Email Addresses</h1>
        <p className="text-gray-600 mb-6">Manage company email addresses</p>
        
        {emailAddresses.length === 0 ? (
          <div className="bg-amber-50 border border-amber-200 p-8 rounded-lg text-center">
            <Mail className="mx-auto h-12 w-12 text-amber-600 mb-3" />
            <p className="text-amber-800">No email addresses available. The backend endpoint may not be implemented yet.</p>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Type</th>
                  <th className="px-6 py-3 text-left font-semibold">Email</th>
                  <th className="px-6 py-3 text-left font-semibold">Display Name</th>
                </tr>
              </thead>
              <tbody>
                {emailAddresses.map((addr) => (
                  <tr key={addr.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">{addr.type}</td>
                    <td className="px-6 py-3">{addr.email}</td>
                    <td className="px-6 py-3">{addr.displayName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default EmailAddressesPage;
