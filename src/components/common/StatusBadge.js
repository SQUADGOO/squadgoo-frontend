import React from 'react';
import { STATUS_BADGES } from '../../utils/constants';

const StatusBadge = ({ status, customLabel = null }) => {
  const config = STATUS_BADGES[status.toLowerCase()] || {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    label: status
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {customLabel || config.label}
    </span>
  );
};

export default StatusBadge;
