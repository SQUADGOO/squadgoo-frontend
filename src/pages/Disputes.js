import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';

const Disputes = ({ section }) => {
  const [selectedDispute, setSelectedDispute] = useState(null);

  const disputes = [
    { id: 'DISP-001', parties: 'John Doe vs TechCorp', type: 'Payment', status: 'Open', created: '2026-01-15', priority: 'High', amount: '$2,500' },
    { id: 'DISP-002', parties: 'Jane Smith vs Freelancer', type: 'Quality', status: 'In Progress', created: '2026-01-14', priority: 'Medium', amount: '$800' },
    { id: 'DISP-003', parties: 'Mike Johnson vs Startup', type: 'Scope', status: 'Resolved', created: '2026-01-10', priority: 'Low', amount: '$1,200' },
    { id: 'DISP-004', parties: 'Sarah Williams vs Agency', type: 'Payment', status: 'Escalated', created: '2026-01-13', priority: 'High', amount: '$5,000' }
  ];

  const getFilteredData = () => {
    switch(section) {
      case 'open-disputes': return disputes.filter(d => d.status === 'Open' || d.status === 'In Progress');
      case 'resolved-disputes': return disputes.filter(d => d.status === 'Resolved');
      default: return disputes;
    }
  };

  const getPriorityStyle = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      'Open': 'open',
      'In Progress': 'progress',
      'Resolved': 'resolved',
      'Escalated': 'escalated'
    };
    return map[status] || 'pending';
  };

  return (
    <div className="space-y-6 fade-in">
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {['all-disputes', 'open-disputes', 'resolved-disputes'].map(tab => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg text-sm ${
                  section === tab ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab === 'all-disputes' ? 'All' : tab === 'open-disputes' ? 'Open' : 'Resolved'}
              </button>
            ))}
          </div>
          <Button variant="outline" icon="fa-download">Export</Button>
        </div>
      </Card>

      <div className="grid gap-4">
        {getFilteredData().map(dispute => (
          <Card key={dispute.id} hover className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${getPriorityStyle(dispute.priority).split(' ')[0]} rounded-lg flex items-center justify-center ${getPriorityStyle(dispute.priority).split(' ')[1]}`}>
                  <i className="fas fa-gavel text-xl"></i>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{dispute.id}</h3>
                    <StatusBadge status={getStatusBadge(dispute.status)} />
                    <span className={`text-xs px-2 py-1 rounded font-medium ${getPriorityStyle(dispute.priority)}`}>
                      {dispute.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{dispute.parties}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span><i className="fas fa-tag mr-1"></i>{dispute.type}</span>
                    <span><i className="fas fa-dollar-sign mr-1"></i>{dispute.amount}</span>
                    <span><i className="fas fa-calendar mr-1"></i>{dispute.created}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedDispute(dispute)}>View Details</Button>
                {dispute.status !== 'Resolved' && <Button variant="success" size="sm">Resolve</Button>}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal 
        isOpen={!!selectedDispute} 
        onClose={() => setSelectedDispute(null)} 
        title={selectedDispute?.id}
        size="lg"
      >
        {selectedDispute && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Parties</h4>
              <p className="text-sm text-gray-600">{selectedDispute.parties}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Issue Description</h4>
              <p className="text-sm text-gray-600">Payment dispute regarding completed milestone. Jobseeker claims work was completed but payment not released.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Evidence</h4>
              <div className="flex gap-2">
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                  <i className="fas fa-image"></i>
                </div>
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                  <i className="fas fa-file-pdf"></i>
                </div>
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <Button variant="success" className="w-full">Resolve in Favor of Jobseeker</Button>
              <Button variant="danger" className="w-full">Resolve in Favor of Recruiter</Button>
              <Button variant="outline" className="w-full">Request More Information</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Disputes;
