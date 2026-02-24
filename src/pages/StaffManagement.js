import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import StatusBadge from '../components/common/StatusBadge';
import { getAvatarUrl, generatePassword } from '../utils/helpers';

const StaffManagement = ({ section }) => {
  const [tempPassword, setTempPassword] = useState(generatePassword());

  const staff = [
    { id: 1, name: 'Super Admin', email: 'admin@squadgoo.com', role: 'Super Admin', department: 'Management', status: 'Active', lastActive: 'Now' },
    { id: 2, name: 'Alice Johnson', email: 'support1@squadgoo.com', role: 'Support Agent', department: 'Customer Service', status: 'On Shift', lastActive: '5 min ago' },
    { id: 3, name: 'Bob Smith', email: 'compliance@squadgoo.com', role: 'Compliance Officer', department: 'Legal', status: 'Off Shift', lastActive: '2 hours ago' },
    { id: 4, name: 'Carol Davis', email: 'finance@squadgoo.com', role: 'Finance Manager', department: 'Finance', status: 'Active', lastActive: '1 hour ago' },
    { id: 5, name: 'David Lee', email: 'content@squadgoo.com', role: 'Content Manager', department: 'Marketing', status: 'On Leave', lastActive: '2 days ago' }
  ];

  const getRoleStyle = (role) => {
    const map = {
      'Super Admin': 'bg-indigo-200 text-indigo-800',
      'Support Agent': 'bg-green-200 text-green-800',
      'Compliance Officer': 'bg-yellow-200 text-yellow-800',
      'Finance Manager': 'bg-red-200 text-red-800'
    };
    return map[role] || 'bg-gray-200 text-gray-800';
  };

  const getStatusBadge = (status) => {
    const map = {
      'On Shift': 'approved',
      'Active': 'verified',
      'On Leave': 'pending',
      'Off Shift': 'action'
    };
    return map[status] || 'pending';
  };

  const columns = [
    {
      header: 'Staff Member',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center">
          <img src={getAvatarUrl(row.name)} alt={row.name} className="w-10 h-10 rounded-full mr-3" />
          <div>
            <div className="text-sm font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Role',
      accessor: 'role',
      render: (row) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase ${getRoleStyle(row.role)}`}>
          {row.role}
        </span>
      )
    },
    { header: 'Department', accessor: 'department' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={getStatusBadge(row.status)} customLabel={row.status} />
    },
    { header: 'Last Active', accessor: 'lastActive' },
    {
      header: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <button className="text-blue-600 hover:text-blue-900"><i className="fas fa-edit"></i></button>
          <button className="text-purple-600 hover:text-purple-900"><i className="fas fa-key"></i></button>
          <button className="text-red-600 hover:text-red-900"><i className="fas fa-trash"></i></button>
        </div>
      )
    }
  ];

  // Add Staff View
  if (section === 'add-staff') {
    return (
      <div className="max-w-2xl mx-auto fade-in">
        <Card className="p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Add New Staff Member</h3>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
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
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
                  <option>Customer Service</option>
                  <option>Compliance</option>
                  <option>Finance</option>
                  <option>Technical</option>
                  <option>Management</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
                  <option>Support Agent</option>
                  <option>Compliance Officer</option>
                  <option>Finance Manager</option>
                  <option>Super Admin</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Temporary Password</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" 
                  value={tempPassword}
                />
                <button 
                  type="button" 
                  onClick={() => setTempPassword(generatePassword())}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Generate
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Staff will be forced to reset on first login</p>
            </div>
            <div className="border-t border-gray-200 pt-6 space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
                <span className="text-sm text-gray-700">Send welcome email with login details</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
                <span className="text-sm text-gray-700">Require 2FA setup on first login</span>
              </label>
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">Create Staff Account</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  // Timesheets View
  if (section === 'timesheets') {
    return (
      <div className="space-y-6 fade-in">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Attendance Tracking</h3>
              <p className="text-sm text-gray-500 mt-1">Manage your work hours and shifts</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
              </div>
              <button className="clock-in-btn text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
                <i className="fas fa-clock mr-2"></i>Clock In
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">This Week's Timesheet</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
              <Button size="sm">Export</Button>
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clock In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clock Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="table-row">
                <td className="px-6 py-4 text-sm text-gray-900">2026-01-20</td>
                <td className="px-6 py-4 text-sm text-gray-900">09:00 AM</td>
                <td className="px-6 py-4 text-sm text-gray-900">05:30 PM</td>
                <td className="px-6 py-4 text-sm text-gray-900">8h 30m</td>
                <td className="px-6 py-4"><StatusBadge status="approved" customLabel="Completed" /></td>
                <td className="px-6 py-4"><button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button></td>
              </tr>
              <tr className="table-row">
                <td className="px-6 py-4 text-sm text-gray-900">2026-01-19</td>
                <td className="px-6 py-4 text-sm text-gray-900">08:45 AM</td>
                <td className="px-6 py-4 text-sm text-gray-900">05:15 PM</td>
                <td className="px-6 py-4 text-sm text-gray-900">8h 30m</td>
                <td className="px-6 py-4"><StatusBadge status="approved" customLabel="Completed" /></td>
                <td className="px-6 py-4"><button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button></td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    );
  }

  // Roles & Permissions View
  if (section === 'roles-permissions') {
    return (
      <div className="space-y-6 fade-in">
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Role Management</h3>
            <Button icon="fa-plus">Create Role</Button>
          </div>
        </Card>

        <div className="grid gap-4">
          {['Super Admin', 'Support Agent', 'Compliance Officer', 'Finance Manager', 'Content Manager'].map(role => (
            <Card key={role} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                    <i className="fas fa-user-shield text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{role}</h4>
                    <p className="text-sm text-gray-500">5 permissions assigned</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  {role !== 'Super Admin' && <Button variant="danger" size="sm">Delete</Button>}
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <h5 className="text-sm font-medium text-gray-700 mb-3">Permissions</h5>
                <div className="flex flex-wrap gap-2">
                  {['View Users', 'Edit Users', 'View Reports', 'Manage Settings'].map(p => (
                    <span key={p} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">{p}</span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // All Staff View (default)
  return (
    <div className="space-y-6 fade-in">
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search staff..." 
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <Button icon="fa-plus">Add Staff</Button>
        </div>
      </Card>

      <Table columns={columns} data={staff} />
    </div>
  );
};

export default StaffManagement;
