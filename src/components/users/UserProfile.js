import React from 'react';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import { getAvatarUrl } from '../../utils/helpers';

const UserProfile = ({ user }) => {
  if (!user) return null;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <img src={getAvatarUrl(user.name)} alt={user.name} className="w-20 h-20 rounded-full" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
            <p className="text-gray-500">{user.email}</p>
            <div className="flex gap-2 mt-2">
              <StatusBadge status={user.status.toLowerCase().replace(/ /g, '-')} />
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">{user.type}</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Account Info</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Joined</span>
              <span className="text-sm text-gray-900">{user.joined}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Last Active</span>
              <span className="text-sm text-gray-900">{user.lastActive}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">KYC Status</span>
              <StatusBadge status={user.kyc.toLowerCase().replace(/ /g, '-')} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Activity</h4>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Recent activity will appear here...</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
