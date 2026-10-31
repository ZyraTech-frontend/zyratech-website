/**
 * SystemHealthCard Component
 * Displays system status and health metrics
 */

import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Activity } from 'lucide-react';

const SystemHealthCard = ({ health = {} }) => {
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'healthy':
      case 'operational':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'degraded':
      case 'warning':
        return <AlertTriangle className="text-amber-600" size={16} />;
      case 'down':
      case 'error':
        return <XCircle className="text-red-600" size={16} />;
      default:
        return <Activity className="text-gray-400" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'healthy':
      case 'operational':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'degraded':
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'down':
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const services = [
    { name: 'API Server', status: health.apiStatus || 'healthy', uptime: '99.9%' },
    { name: 'Database', status: health.dbStatus || 'healthy', uptime: '99.8%' },
    { name: 'Payment Gateway', status: health.paymentStatus || 'healthy', uptime: '99.5%' },
    { name: 'Email Service', status: health.emailStatus || 'healthy', uptime: '99.7%' }
  ];

  const overallStatus = services.every(s => s.status === 'healthy') ? 'healthy' : 
                       services.some(s => s.status === 'down') ? 'degraded' : 'warning';

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-gray-700">System Health</h3>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(overallStatus)}`}>
          {getStatusIcon(overallStatus)}
          <span className="uppercase">{overallStatus}</span>
        </div>
      </div>

      <div className="space-y-2">
        {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-2">
              {getStatusIcon(service.status)}
              <div>
                <p className="text-xs font-medium text-gray-900">{service.name}</p>
                <p className="text-[9px] text-gray-500">Uptime: {service.uptime}</p>
              </div>
            </div>
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${getStatusColor(service.status)}`}>
              {service.status}
            </span>
          </div>
        ))}
      </div>

      {/* Error Summary */}
      {(health.errorCount || 0) > 0 && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-[10px] text-red-700 font-semibold">
            {health.errorCount} errors in last 24h
          </p>
        </div>
      )}
    </div>
  );
};

export default SystemHealthCard;
