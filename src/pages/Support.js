import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';

const Support = ({ section }) => {
  const [activeChat, setActiveChat] = useState(1);

  // Live Chat View
  if (section === 'live-chat') {
    const chats = [1, 2, 3, 4, 5];
    
    return (
      <div className="h-[calc(100vh-180px)] bg-white rounded-xl shadow-sm border border-gray-100 flex fade-in">
        {/* Chat List */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Active Chats</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map(i => (
              <div 
                key={i}
                onClick={() => setActiveChat(i)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${i === activeChat ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">U{i}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-gray-900">User {i}</span>
                      <span className="text-xs text-gray-400">2m</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">I need help with my account...</p>
                  </div>
                  {i === 1 && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">U1</div>
              <div>
                <h4 className="font-semibold text-gray-900">User 1</h4>
                <p className="text-xs text-green-600">● Online</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Transfer</Button>
              <Button variant="outline" size="sm">Close</Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="chat-message agent">
              <p className="text-sm">Hello! How can I help you today?</p>
              <span className="text-xs opacity-75 mt-1 block">10:30 AM</span>
            </div>
            <div className="chat-message user">
              <p className="text-sm">Hi, I am having trouble with my KYC verification. It has been pending for 3 days.</p>
              <span className="text-xs opacity-75 mt-1 block">10:32 AM</span>
            </div>
            <div className="chat-message agent">
              <p className="text-sm">I understand your concern. Let me check the status of your verification right away.</p>
              <span className="text-xs opacity-75 mt-1 block">10:33 AM</span>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
              <Button icon="fa-paper-plane"></Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tickets View
  if (section === 'tickets') {
    const tickets = [
      { id: 'TKT-001', subject: 'Cannot withdraw funds', user: 'John Doe', priority: 'High', status: 'Open', created: '2 hours ago' },
      { id: 'TKT-002', subject: 'Profile update issue', user: 'Jane Smith', priority: 'Medium', status: 'In Progress', created: '5 hours ago' },
      { id: 'TKT-003', subject: 'Question about fees', user: 'Mike Johnson', priority: 'Low', status: 'Resolved', created: '1 day ago' }
    ];

    const getPriorityStyle = (p) => {
      const map = { 'High': 'high', 'Medium': 'medium', 'Low': 'low' };
      return map[p] || 'low';
    };

    return (
      <div className="space-y-6 fade-in">
        <Card className="p-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Button>All Tickets</Button>
              <Button variant="ghost">Open</Button>
              <Button variant="ghost">Resolved</Button>
            </div>
            <Button variant="outline" icon="fa-download">Export</Button>
          </div>
        </Card>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tickets.map(ticket => (
                <tr key={ticket.id} className="table-row">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{ticket.id}</div>
                    <div className="text-sm text-gray-500">{ticket.subject}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{ticket.user}</td>
                  <td className="px-6 py-4">
                    <span className={`priority-${getPriorityStyle(ticket.priority)} text-xs px-2 py-1 rounded font-medium`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={ticket.status === 'Open' ? 'open' : ticket.status === 'In Progress' ? 'progress' : 'resolved'} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{ticket.created}</td>
                  <td className="px-6 py-4">
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Callback Requests View
  if (section === 'callback-requests') {
    return (
      <div className="space-y-6 fade-in">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Callback Requests</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-500">+1 (555) 123-4567 • Requested: Today, 2:30 PM</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="success" size="sm">Mark Called</Button>
                <Button variant="outline" size="sm">Reschedule</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // FAQ Management View (default for faq-management)
  return (
    <div className="space-y-6 fade-in">
      <Card className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">FAQ Categories</h3>
          <Button icon="fa-plus">Add FAQ</Button>
        </div>
      </Card>

      <div className="grid gap-4">
        {['Getting Started', 'Account & Security', 'Payments & Billing', 'Jobs & Contracts', 'Disputes'].map((cat, i) => (
          <Card key={cat} hover className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                  <i className="fas fa-folder text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{cat}</h4>
                  <p className="text-sm text-gray-500">{5 + i} articles</p>
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
};

export default Support;
