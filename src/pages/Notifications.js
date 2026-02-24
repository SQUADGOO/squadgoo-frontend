import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';

const Notifications = ({ section, onNavigate }) => {
  // Templates View
  if (section === 'templates') {
    return (
      <div className="space-y-6 fade-in">
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Notification Templates</h3>
            <Button icon="fa-plus">Create Template</Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['Welcome Email', 'KYC Approved', 'Payment Received', 'Job Application', 'Password Reset', 'Account Suspended'].map(template => (
            <Card key={template} hover className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{template}</h4>
                    <p className="text-sm text-gray-500">Last edited: 2 days ago</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                  <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Send Notification View
  if (section === 'send-notification') {
    return (
      <div className="max-w-3xl mx-auto fade-in">
        <Card className="p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Send Notification</h3>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
                <option>All Users</option>
                <option>All Jobseekers</option>
                <option>All Recruiters</option>
                <option>Verified Users Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Channels</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
                  <span className="text-sm text-gray-700">In-App</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
                  <span className="text-sm text-gray-700">Email</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
                  <span className="text-sm text-gray-700">SMS</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea rows="6" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="schedule" defaultChecked className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-gray-700">Send Immediately</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="schedule" className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-gray-700">Schedule for Later</span>
                </label>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1" icon="fa-paper-plane">Send Notification</Button>
              <Button variant="outline">Save as Draft</Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  // All Notifications View (default)
  return (
    <div className="space-y-6 fade-in">
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <Button>All</Button>
            <Button variant="ghost">Sent</Button>
            <Button variant="ghost">Scheduled</Button>
            <Button variant="ghost">Drafts</Button>
          </div>
          <Button icon="fa-plus" onClick={() => onNavigate('send-notification')}>New Notification</Button>
        </div>
      </Card>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notification</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipients</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="table-row">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">Platform Maintenance Notice</div>
                <div className="text-sm text-gray-500">Scheduled maintenance on Jan 25...</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">All Users (2,847)</td>
              <td className="px-6 py-4"><StatusBadge status="approved" customLabel="Sent" /></td>
              <td className="px-6 py-4 text-sm text-gray-500">Jan 20, 2026</td>
              <td className="px-6 py-4"><button className="text-indigo-600 hover:text-indigo-900 text-sm">View</button></td>
            </tr>
            <tr className="table-row">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">New Feature Announcement</div>
                <div className="text-sm text-gray-500">Introducing video interviews...</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">All Users</td>
              <td className="px-6 py-4"><StatusBadge status="pending" customLabel="Scheduled" /></td>
              <td className="px-6 py-4 text-sm text-gray-500">Jan 22, 2026</td>
              <td className="px-6 py-4"><button className="text-indigo-600 hover:text-indigo-900 text-sm">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;
