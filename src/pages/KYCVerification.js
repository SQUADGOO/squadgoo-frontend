import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import Table from '../components/common/Table';
import Modal from '../components/common/Modal';

const KYCVerification = ({ section }) => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  const kycData = [
    { id: 'KYC-001', user: 'John Doe', email: 'john@example.com', type: 'Individual', submitted: '2026-01-15', status: 'Pending', iteration: 1 },
    { id: 'KYC-002', user: 'TechCorp Ltd', email: 'info@techcorp.com', type: 'Business', submitted: '2026-01-14', status: 'Review', iteration: 2 },
    { id: 'KYC-003', user: 'Jane Smith', email: 'jane@example.com', type: 'Individual', submitted: '2026-01-13', status: 'Action Required', iteration: 1 },
    { id: 'KYC-004', user: 'DesignStudio', email: 'hello@designstudio.com', type: 'Business', submitted: '2026-01-12', status: 'Approved', iteration: 1 },
    { id: 'KYC-005', user: 'Mike Johnson', email: 'mike@example.com', type: 'Individual', submitted: '2026-01-11', status: 'Rejected', iteration: 3 }
  ];

  const getFilteredData = () => {
    switch(section) {
      case 'kyc-approved': return kycData.filter(d => d.status === 'Approved');
      case 'kyc-rejected': return kycData.filter(d => d.status === 'Rejected');
      case 'kyc-pending':
      default: return kycData.filter(d => ['Pending', 'Review', 'Action Required'].includes(d.status));
    }
  };

  const columns = [
    {
      header: 'Application',
      accessor: 'id',
      render: (row) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{row.id}</div>
          <div className="text-sm text-gray-500">{row.user}</div>
        </div>
      )
    },
    { header: 'Type', accessor: 'type' },
    { header: 'Submitted', accessor: 'submitted' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status.toLowerCase().replace(/ /g, '-')} />
    },
    {
      header: 'Round',
      render: (row) => (
        <span className="inline-flex items-center px-2 py-1 bg-indigo-600 text-white rounded-full text-xs font-semibold">
          {row.iteration}
        </span>
      )
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setSelectedReview(row)}>Review</Button>
        </div>
      )
    }
  ];

  const ReviewModal = ({ data, onClose }) => {
    if (!data) return null;
    
    return (
      <Modal isOpen={!!data} onClose={onClose} size="xl" title={`KYC Review - ${data.id}`}>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-2 py-1 bg-indigo-600 text-white rounded-full text-xs font-semibold">
              Round {data.iteration}
            </span>
            <StatusBadge status={data.status.toLowerCase().replace(/ /g, '-')} />
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Review Timeline</h4>
            <div className="space-y-0">
              {Array.from({ length: data.iteration }, (_, i) => (
                <div key={i} className="timeline-item relative pl-7 pb-6 border-l-2 border-gray-200 last:border-0 last:pb-0">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-indigo-600 rounded-full border-2 border-white shadow-sm"></div>
                  <p className="text-sm text-gray-600">Submission {i + 1}</p>
                  <p className="text-xs text-gray-400">{i === data.iteration - 1 ? '2 days ago' : `${(data.iteration - i) * 2} days ago`}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Submitted Documents</h4>
            <div className="flex flex-wrap gap-2">
              {['ID Proof', 'Address Proof', 'Bank Statement'].map((doc, idx) => (
                <span 
                  key={idx}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border ${
                    idx < 2 
                      ? 'bg-green-100 border-green-300 text-green-800' 
                      : 'bg-yellow-100 border-yellow-300 text-yellow-800'
                  }`}
                >
                  <i className={`fas ${idx < 2 ? 'fa-check' : 'fa-exclamation'}`}></i>
                  {doc}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button variant="success" className="flex-1" onClick={onClose}>Approve</Button>
            <Button variant="danger" className="flex-1" onClick={onClose}>Reject</Button>
            <Button variant="outline" className="flex-1" onClick={onClose}>Request More Info</Button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className="space-y-6 fade-in">
      <Card className="p-4">
        <div className="flex gap-2">
          {['kyc-pending', 'kyc-approved', 'kyc-rejected'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                section === tab 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab === 'kyc-pending' ? 'Pending' : tab === 'kyc-approved' ? 'Approved' : 'Rejected'}
            </button>
          ))}
        </div>
      </Card>

      <Table columns={columns} data={getFilteredData()} />

      <ReviewModal data={selectedReview} onClose={() => setSelectedReview(null)} />
    </div>
  );
};

export default KYCVerification;
