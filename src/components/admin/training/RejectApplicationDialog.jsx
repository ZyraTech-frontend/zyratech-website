/**
 * Reject Application Dialog with Refund Option
 * Shows different UI based on whether student has paid
 */

import React, { useState } from 'react';
import { X, AlertTriangle, DollarSign } from 'lucide-react';

const RejectApplicationDialog = ({ isOpen, onClose, onConfirm, paymentInfo, applicantName }) => {
    const [reviewNotes, setReviewNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const hasPaid = paymentInfo?.hasPaid || false;
    const payment = paymentInfo?.payment;

    const handleSubmit = async (shouldRefund) => {
        if (!reviewNotes.trim()) {
            return;
        }

        setIsSubmitting(true);
        try {
            await onConfirm(shouldRefund, reviewNotes.trim());
            setReviewNotes('');
            onClose();
        } catch (error) {
            console.error('Rejection failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900">
                        {hasPaid ? '⚠️ Student Has Already Paid' : 'Confirm Rejection'}
                    </h3>
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Warning for paid students */}
                    {hasPaid && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-amber-800">
                                    <p className="font-semibold mb-2">This student has already paid for this course.</p>
                                    <p className="mb-2">You can either:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li><strong>Reject & Refund:</strong> Automatically refund their payment</li>
                                        <li><strong>Reject Only:</strong> Keep payment (manual refund later if needed)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Payment Details */}
                    {payment && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <DollarSign size={20} className="text-blue-600 flex-shrink-0" />
                                <div className="text-sm">
                                    <p className="font-semibold text-blue-900 mb-2">Payment Details:</p>
                                    <ul className="space-y-1 text-blue-800">
                                        <li><strong>Amount:</strong> {payment.currency} {payment.amount}</li>
                                        <li><strong>Reference:</strong> {payment.reference}</li>
                                        <li><strong>Paid On:</strong> {new Date(payment.paidAt).toLocaleDateString()}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Applicant Name */}
                    <p className="text-sm text-gray-600">
                        Are you sure you want to reject <strong>{applicantName}</strong>'s application?
                    </p>

                    {/* Reason Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Reason for Rejection <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={reviewNotes}
                            onChange={(e) => setReviewNotes(e.target.value)}
                            placeholder="Explain why the application is being rejected..."
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none"
                            disabled={isSubmitting}
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            This will be included in the rejection notification
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-6 border-t border-gray-200 flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    {hasPaid ? (
                        <>
                            <button
                                onClick={() => handleSubmit(false)}
                                disabled={isSubmitting || !reviewNotes.trim()}
                                className="flex-1 px-4 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Processing...' : 'Reject Only'}
                            </button>
                            <button
                                onClick={() => handleSubmit(true)}
                                disabled={isSubmitting || !reviewNotes.trim()}
                                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Processing...' : 'Reject & Refund'}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => handleSubmit(false)}
                            disabled={isSubmitting || !reviewNotes.trim()}
                            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Processing...' : 'Confirm Rejection'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RejectApplicationDialog;
