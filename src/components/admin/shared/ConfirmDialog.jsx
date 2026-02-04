/**
 * ConfirmDialog Component
 * Confirmation modal for delete/destructive actions
 */

import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { closeConfirmDialog } from '../../../store/slices/uiSlice';

const ConfirmDialog = () => {
  const dispatch = useDispatch();
  const { isConfirmDialogOpen, confirmDialog } = useSelector((state) => state.ui);

  if (!isConfirmDialogOpen) return null;

  const handleConfirm = () => {
    if (confirmDialog.onConfirm) {
      confirmDialog.onConfirm();
    }
    dispatch(closeConfirmDialog());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <AlertCircle
              size={24}
              className={confirmDialog.isDangerous ? 'text-red-600' : 'text-blue-600'}
            />
            <h2 className="text-lg font-bold text-gray-900">{confirmDialog.title}</h2>
          </div>
          <button
            onClick={() => dispatch(closeConfirmDialog())}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600">{confirmDialog.message}</p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={() => dispatch(closeConfirmDialog())}
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 px-4 py-2 text-white rounded font-medium ${
              confirmDialog.isDangerous
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {confirmDialog.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
