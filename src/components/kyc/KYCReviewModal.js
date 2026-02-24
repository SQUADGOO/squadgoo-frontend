import React from 'react';
import Modal from '../common/Modal';
import StatusBadge from '../common/StatusBadge';

const KYCReviewModal = ({ isOpen, onClose, data }) => {
  if (!data) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-gray-800">KYC Review Details</h3>
          <span className="inline-flex items-center px-2 py-1 bg-indigo-600 text-white rounded-full text-xs font-semibold">
            Round {data.iteration || 1}
          </span>
          <StatusBadge status={data.status} />
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Timeline */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800">Review Timeline</h4>
          <div className="space-y-0">
            {[1, 2, 3].map((item, idx) => (
              <div key={idx} className="timeline-item relative pl-7 pb-6 border-l-2 border-gray-200 last:border-0 last:pb-0">
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-indigo-600 rounded-full border-2 border-white shadow-sm"></div>
                <p className="text-sm text-gray-600">Submission {idx + 1}</p>
                <p className="text-xs text-gray-400">2 days ago</p>
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
          <button className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
            Approve
          </button>
          <button className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
            Reject
          </button>
          <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
            Request More Info
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default KYCReviewModal;
