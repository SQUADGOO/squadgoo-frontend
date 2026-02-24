import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';

const UserManagement = ({ section }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data from HTML
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', type: 'Jobseeker', status: 'Verified', joined: '2026-01-15', kyc: 'Approved', lastActive: '2 min ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@company.com', type: 'Recruiter', status: 'Verified', joined: '2026-01-14', kyc: 'Approved', lastActive: '1 hour ago' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', type: 'Jobseeker', status: 'Pending', joined: '2026-01-13', kyc: 'Pending', lastActive: '3 hours ago' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@company.com', type: 'Recruiter', status: 'Suspended', joined: '2026-01-10', kyc: 'Rejected', lastActive: '2 days ago' },
    { id: 5, name: 'David Brown', email: 'david@example.com', type: 'Jobseeker', status: 'Action Required', joined: '2026-01-09', kyc: 'Action Required', lastActive: '5 hours ago' }
  ];

  const suspendedUsers = users.filter(u => u.status === 'Suspended');

  const columns = [
    {
      header: 'User',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold mr-3">
            {row.name.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      )
    },
    { header: 'Type', accessor: 'type' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status.toLowerCase().replace(/ /g, '-')} />
    },
    {
      header: 'KYC',
      accessor: 'kyc',
      render: (row) => <StatusBadge status={row.kyc.toLowerCase().replace(/ /g, '-')} />
    },
    { header: 'Last Active', accessor: 'lastActive' },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button onClick={() => setSelectedUser(row)} className="text-indigo-600 hover:text-indigo-900" title="View">
            <i className="fas fa-eye"></i>
          </button>
          <button className="text-blue-600 hover:text-blue-900" title="Edit">
            <i className="fas fa-edit"></i>
          </button>
          <button className="text-green-600 hover:text-green-900" title="Impersonate">
            <i className="fas fa-user-secret"></i>
          </button>
          <button className="text-red-600 hover:text-red-900" title="Suspend">
            <i className="fas fa-ban"></i>
          </button>
        </div>
      )
    }
  ];

  // Add User Form Component
  const AddUserForm = () => (
    <form onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); }} className="space-y-6">
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
        <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
      </div>
    </form>
  );

  // Suspended Users View
  if (section === 'suspended-users') {
    return (
      <div className="space-y-6 fade-in">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
          <i className="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
          <div>
            <h4 className="font-semibold text-yellow-800">Suspended Users</h4>
            <p className="text-sm text-yellow-700">These users cannot access the platform. Review and reactivate if necessary.</p>
          </div>
        </div>
        <Table columns={columns.filter(c => c.header !== 'Actions').concat([{
          header: 'Actions',
          render: () => <button className="text-green-600 hover:text-green-900 font-medium text-sm">Reactivate</button>
        }])} data={suspendedUsers} />
      </div>
    );
  }

  // Add User View
  if (section === 'add-user') {
    return (
      <div className="max-w-2xl mx-auto fade-in">
        <Card className="p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Add New User</h3>
          <AddUserForm />
        </Card>
      </div>
    );
  }

  // All Users View (default)
  return (
    <div className="space-y-6 fade-in">
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search users..." 
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Types</option>
              <option>Jobseeker</option>
              <option>Recruiter</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Status</option>
              <option>Verified</option>
              <option>Pending</option>
              <option>Suspended</option>
            </select>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} icon="fa-plus">Add User</Button>
        </div>
      </Card>

      <Table columns={columns} data={users} />

      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <p className="text-sm text-gray-600">Showing 1-5 of 2,847 users</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm opacity-50" disabled>Previous</button>
          <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
        </div>
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New User">
        <AddUserForm />
      </Modal>
    </div>
  );
};

export default UserManagement;
