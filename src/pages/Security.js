import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import { getAvatarUrl } from '../utils/helpers';

const ToggleSwitch = ({ defaultChecked = false }) => {
  const [isActive, setIsActive] = React.useState(defaultChecked);
  return (
    <div 
      className={`toggle-switch ${isActive ? 'active' : ''}`}
      onClick={() => setIsActive(!isActive)}
    ></div>
  );
};

const Security = ({ section }) => {
  const activities = [
    { action: 'Admin login', user: 'Super Admin', ip: '192.168.1.1', time: '2 minutes ago', type: 'login', status: 'success' },
    { action: 'KYC approved', user: 'Compliance Officer', ip: '192.168.1.45', time: '15 minutes ago', type: 'kyc', status: 'success' },
    { action: 'Withdrawal approved', user: 'Finance Manager', ip: '192.168.1.32', time: '1 hour ago', type: 'payment', status: 'success' },
    { action: 'User suspended', user: 'Super Admin', ip: '192.168.1.1', time: '2 hours ago', type: 'user', status: 'warning' },
    { action: 'Settings updated', user: 'Super Admin', ip: '192.168.1.1', time: '3 hours ago', type: 'settings', status: 'info' },
    { action: 'Failed login attempt', user: 'Unknown', ip: '203.0.113.45', time: '5 hours ago', type: 'login', status: 'error' }
  ];

  const getActivityIcon = (type) => {
    const map = {
      'login': 'fa-sign-in-alt',
      'kyc': 'fa-id-card',
      'payment': 'fa-money-bill-wave',
      'user': 'fa-user',
      'settings': 'fa-cog'
    };
    return map[type] || 'fa-circle';
  };

  const getStatusStyle = (status) => {
    const map = {
      'success': { bg: 'bg-green-100', text: 'text-green-600', badge: 'bg-green-100 text-green-800' },
      'error': { bg: 'bg-red-100', text: 'text-red-600', badge: 'bg-red-100 text-red-800' },
      'warning': { bg: 'bg-yellow-100', text: 'text-yellow-600', badge: 'bg-yellow-100 text-yellow-800' },
      'info': { bg: 'bg-blue-100', text: 'text-blue-600', badge: 'bg-blue-100 text-blue-800' }
    };
    return map[status] || map.info;
  };

  // Login Sessions View
  if (section === 'login-sessions') {
    return (
      <div className="space-y-6 fade-in">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Active Sessions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <i className="fas fa-desktop"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Current Session</p>
                  <p className="text-sm text-gray-500">Chrome on Windows • IP: 192.168.1.1</p>
                </div>
              </div>
              <span className="text-xs text-green-600 font-medium">Active Now</span>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900">iPhone 13</p>
                  <p className="text-sm text-gray-500">Safari on iOS • IP: 192.168.1.45 • Last active: 2 hours ago</p>
                </div>
              </div>
              <button className="text-red-600 hover:text-red-900 text-sm">Revoke</button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Require 2FA for all admin logins</p>
              </div>
              <ToggleSwitch defaultChecked={true} />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">IP Whitelist</h4>
                <p className="text-sm text-gray-500">Restrict admin access to specific IPs</p>
              </div>
              <ToggleSwitch />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // 2FA Management View
  if (section === '2fa-management') {
    return (
      <div className="space-y-6 fade-in">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-800 mb-4">2FA Status Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <p className="text-3xl font-bold text-green-600">24</p>
              <p className="text-sm text-gray-600">Enabled</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <p className="text-3xl font-bold text-yellow-600">3</p>
              <p className="text-sm text-gray-600">Pending Setup</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg text-center">
              <p className="text-3xl font-bold text-red-600">1</p>
              <p className="text-sm text-gray-600">Disabled</p>
            </div>
          </div>
        </Card>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Staff Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">2FA Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Verified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="table-row">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img src={getAvatarUrl('Super Admin')} className="w-8 h-8 rounded-full mr-3" alt="" />
                    <span className="text-sm font-medium text-gray-900">Super Admin</span>
                  </div>
                </td>
                <td className="px-6 py-4"><StatusBadge status="approved" customLabel="Enabled" /></td>
                <td className="px-6 py-4 text-sm text-gray-500">2 minutes ago</td>
                <td className="px-6 py-4"><button className="text-red-600 hover:text-red-900 text-sm">Reset 2FA</button></td>
              </tr>
              <tr className="table-row">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img src={getAvatarUrl('Alice Johnson')} className="w-8 h-8 rounded-full mr-3" alt="" />
                    <span className="text-sm font-medium text-gray-900">Alice Johnson</span>
                  </div>
                </td>
                <td className="px-6 py-4"><StatusBadge status="pending" customLabel="Pending" /></td>
                <td className="px-6 py-4 text-sm text-gray-500">Never</td>
                <td className="px-6 py-4"><button className="text-indigo-600 hover:text-indigo-900 text-sm">Send Reminder</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Activity Log View (default)
  return (
    <div className="space-y-6 fade-in">
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Actions</option>
            <option>Login</option>
            <option>User Actions</option>
            <option>KYC</option>
            <option>Payments</option>
          </select>
        </div>
      </Card>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-200">
        {activities.map((act, idx) => {
          const style = getStatusStyle(act.status);
          return (
            <div key={idx} className="p-4 flex items-center gap-4">
              <div className={`w-10 h-10 ${style.bg} rounded-full flex items-center justify-center ${style.text}`}>
                <i className={`fas ${getActivityIcon(act.type)}`}></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{act.action}</p>
                <p className="text-xs text-gray-500">{act.user} • IP: {act.ip} • {act.time}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${style.badge}`}>{act.status}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Security;
