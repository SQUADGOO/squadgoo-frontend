import React from 'react';
import Card from '../common/Card';

const StatCard = ({ title, value, change, changeType = 'positive', icon, iconBg, iconColor }) => (
  <Card hover className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
        {change && (
          <p className={`text-xs mt-1 ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
            <i className={`fas fa-arrow-${changeType === 'positive' ? 'up' : 'down'} mr-1`}></i>
            {change}
          </p>
        )}
      </div>
      <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center ${iconColor}`}>
        <i className={`fas ${icon} text-xl`}></i>
      </div>
    </div>
  </Card>
);

export default StatCard;
