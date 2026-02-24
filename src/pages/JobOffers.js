import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';

const JobOffers = ({ section }) => {
  const jobs = [
    { id: 'JOB-001', title: 'Senior React Developer', company: 'TechCorp', location: 'Remote', type: 'Full-time', salary: '$120k-$150k', status: 'Active', applicants: 24, posted: '2 days ago' },
    { id: 'JOB-002', title: 'UX Designer', company: 'DesignStudio', location: 'New York, NY', type: 'Contract', salary: '$80-$100/hr', status: 'Active', applicants: 18, posted: '3 days ago' },
    { id: 'JOB-003', title: 'Product Manager', company: 'StartupXYZ', location: 'San Francisco, CA', type: 'Full-time', salary: '$140k-$180k', status: 'Pending Approval', applicants: 0, posted: '1 day ago' },
    { id: 'JOB-004', title: 'Marketing Specialist', company: 'GrowthCo', location: 'Remote', type: 'Part-time', salary: '$60k-$80k', status: 'Expired', applicants: 45, posted: '30 days ago' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'approved';
      case 'Pending Approval': return 'pending';
      case 'Expired': return 'rejected';
      default: return 'pending';
    }
  };

  // Marketplace Listings View
  if (section === 'marketplace-listings') {
    return (
      <div className="space-y-6 fade-in">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <i className="fas fa-info-circle text-blue-600 mt-1"></i>
            <div>
              <h4 className="font-semibold text-blue-800">Phase 2 Feature</h4>
              <p className="text-sm text-blue-700">Marketplace listings will be available in Phase 2. Currently showing preview of interface.</p>
            </div>
          </div>
        </div>
        
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search marketplace..." 
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <Button icon="fa-plus">Add Listing</Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <Card key={i} hover className="overflow-hidden p-0">
              <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                <i className="fas fa-image text-4xl"></i>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-1">Service Package {i}</h4>
                <p className="text-sm text-gray-500 mb-3">Professional service offering</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-indigo-600">${i * 100}</span>
                  <span className="text-xs text-gray-500">12 sales</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Expired/Flagged View
  if (section === 'expired-flagged') {
    return (
      <div className="space-y-6 fade-in">
        <Card className="p-4">
          <div className="flex gap-4 border-b border-gray-200">
            <button className="px-4 py-2 text-indigo-600 border-b-2 border-indigo-600 font-medium">Expired Jobs</button>
            <button className="px-4 py-2 text-gray-500 hover:text-gray-700">Flagged Content</button>
            <button className="px-4 py-2 text-gray-500 hover:text-gray-700">Under Review</button>
          </div>
        </Card>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="table-row">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">Marketing Specialist Position</div>
                  <div className="text-sm text-gray-500">Posted by GrowthCo</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">Job Offer</td>
                <td className="px-6 py-4"><StatusBadge status="rejected" customLabel="Expired" /></td>
                <td className="px-6 py-4">
                  <button className="text-indigo-600 hover:text-indigo-900 text-sm mr-3">Renew</button>
                  <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Job Offers View (default)
  return (
    <div className="space-y-6 fade-in">
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Expired</option>
            </select>
          </div>
          <Button icon="fa-plus">Post Job</Button>
        </div>
      </Card>

      <div className="grid gap-4">
        {jobs.map(job => (
          <Card key={job.id} hover className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{job.title}</h3>
                  <StatusBadge status={getStatusColor(job.status)} customLabel={job.status} />
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  <i className="fas fa-building mr-2"></i>{job.company}
                  <span className="mx-2">•</span>
                  <i className="fas fa-map-marker-alt mr-2"></i>{job.location}
                </p>
                <div className="flex gap-4 text-sm text-gray-500 mb-3">
                  <span><i className="fas fa-clock mr-1"></i>{job.type}</span>
                  <span><i className="fas fa-dollar-sign mr-1"></i>{job.salary}</span>
                  <span><i className="fas fa-users mr-1"></i>{job.applicants} applicants</span>
                  <span><i className="fas fa-calendar mr-1"></i>Posted {job.posted}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                {job.status === 'Pending Approval' && <Button variant="success" size="sm">Approve</Button>}
                <Button variant="danger" size="sm">Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobOffers;
