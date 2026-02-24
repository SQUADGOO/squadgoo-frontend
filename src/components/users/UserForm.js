import React from 'react';
import Button from '../common/Button';

const UserForm = ({ onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
          <option>Jobseeker</option>
          <option>Recruiter</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="send-welcome" className="w-4 h-4 text-indigo-600 rounded" defaultChecked />
        <label htmlFor="send-welcome" className="text-sm text-gray-700">Send welcome email with login credentials</label>
      </div>
      <div className="flex gap-4 pt-4">
        <Button type="submit" className="flex-1">Create User</Button>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

export default UserForm;
