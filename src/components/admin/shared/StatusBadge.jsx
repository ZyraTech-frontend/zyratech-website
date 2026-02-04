/**
 * StatusBadge Component
 * Display status with color coding
 */

import React from 'react';
import { getStatusColor } from '../../../utils/formatters';

const StatusBadge = ({ status, label = null }) => {
  const color = getStatusColor(status);
  const colorClasses = {
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    blue: 'bg-blue-100 text-blue-800',
    orange: 'bg-orange-100 text-orange-800',
    gray: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClasses[color]}`}>
      {label || status}
    </span>
  );
};

export default StatusBadge;
