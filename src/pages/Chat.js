import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Chat = ({ section }) => {
  // Tasks View
  if (section === 'tasks') {
    const tasks = [
      { title: 'Review pending KYC applications', assignee: 'Compliance Team', due: 'Today', priority: 'High', status: 'In Progress' },
      { title: 'Update FAQ content', assignee: 'Content Manager', due: 'Tomorrow', priority: 'Medium', status: 'Pending' },
      { title: 'Weekly financial report', assignee: 'Finance Manager', due: 'Jan 25', priority: 'High', status: 'In Progress' },
      { title: 'Train new support agents', assignee: 'Support Lead', due: 'Jan 30', priority: 'Low', status: 'Pending' }
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
              <Button>All Tasks</Button>
              <Button variant="ghost">My Tasks</Button>
              <Button variant="ghost">Completed</Button>
            </div>
            <Button icon="fa-plus">New Task</Button>
          </div>
        </Card>

        <div className="grid gap-4">
          {tasks.map((task, idx) => (
            <Card key={idx} hover className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{task.title}</h4>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      <span><i className="fas fa-user mr-1"></i>{task.assignee}</span>
                      <span><i className="fas fa-calendar mr-1"></i>{task.due}</span>
                      <span className={`priority-${getPriorityStyle(task.priority)} text-xs px-2 py-0.5 rounded`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <StatusBadge status={task.status === 'In Progress' ? 'progress' : 'pending'} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Groups View
  if (section === 'groups') {
    return (
      <div className="space-y-6 fade-in">
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Group Chats</h3>
            <Button icon="fa-plus">Create Group</Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['Support Team', 'Compliance Team', 'Management', 'All Staff'].map((group, i) => (
            <Card key={group} hover className="p-6 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                  <i className="fas fa-users text-xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{group}</h4>
                  <p className="text-sm text-gray-500">{3 + i} members • Last message 2h ago</p>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Team Chat View (default)
  return (
    <div className="h-[calc(100vh-180px)] bg-white rounded-xl shadow-sm border border-gray-100 flex fade-in">
      {/* Members List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Team Members</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {['Super Admin', 'Alice Johnson', 'Bob Smith', 'Carol Davis'].map((name, i) => (
            <div key={name} className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${i === 0 ? 'bg-indigo-50' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`} className="w-10 h-10 rounded-full" alt="" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">{name}</p>
                  <p className="text-xs text-gray-500">{i === 0 ? 'Online' : 'Last seen 2h ago'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://ui-avatars.com/api/?name=Alice+Johnson&background=random" className="w-10 h-10 rounded-full" alt="" />
            <div>
              <h4 className="font-semibold text-gray-900">Alice Johnson</h4>
              <p className="text-xs text-green-600">● Online</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="chat-message agent">
            <p className="text-sm">Hey, can you help me with a KYC case?</p>
            <span className="text-xs opacity-75 mt-1 block">10:30 AM</span>
          </div>
          <div className="chat-message user">
            <p className="text-sm">Sure, what is the issue?</p>
            <span className="text-xs opacity-75 mt-1 block">10:32 AM</span>
          </div>
          <div className="chat-message agent">
            <p className="text-sm">The user submitted blurry documents for the third time.</p>
            <span className="text-xs opacity-75 mt-1 block">10:33 AM</span>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input type="text" placeholder="Type your message..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
            <Button icon="fa-paper-plane"></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import StatusBadge for tasks
import StatusBadge from '../components/common/StatusBadge';

export default Chat;
