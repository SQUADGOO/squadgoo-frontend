import React from 'react';
import Card from '../common/Card';

const activities = [
  { icon: 'fa-user-check', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', text: 'New user verified:', highlight: 'Mike Johnson', time: '2 minutes ago' },
  { icon: 'fa-money-bill-wave', iconBg: 'bg-green-100', iconColor: 'text-green-600', text: 'Withdrawal approved:', highlight: '$500.00', time: '15 minutes ago' },
  { icon: 'fa-briefcase', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', text: 'New job posted:', highlight: 'Senior React Developer', time: '2 hours ago' }
];

const RecentActivity = () => (
  <Card className="p-6">
    <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
    <div className="space-y-4">
      {activities.map((activity, idx) => (
        <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
          <div className={`w-8 h-8 ${activity.iconBg} rounded-full flex items-center justify-center ${activity.iconColor} text-xs`}>
            <i className={`fas ${activity.icon}`}></i>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-800">
              {activity.text} <span className="font-semibold">{activity.highlight}</span>
            </p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

export default RecentActivity;
