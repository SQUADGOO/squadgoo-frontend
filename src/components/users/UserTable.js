import React from 'react';
import Table from '../common/Table';
import StatusBadge from '../common/StatusBadge';

const UserTable = ({ users, onView, onEdit, onImpersonate, onSuspend }) => {
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
          <button onClick={() => onView(row)} className="text-indigo-600 hover:text-indigo-900" title="View">
            <i className="fas fa-eye"></i>
          </button>
          <button onClick={() => onEdit(row)} className="text-blue-600 hover:text-blue-900" title="Edit">
            <i className="fas fa-edit"></i>
          </button>
          <button onClick={() => onImpersonate(row)} className="text-green-600 hover:text-green-900" title="Impersonate">
            <i className="fas fa-user-secret"></i>
          </button>
          <button onClick={() => onSuspend(row)} className="text-red-600 hover:text-red-900" title="Suspend">
            <i className="fas fa-ban"></i>
          </button>
        </div>
      )
    }
  ];

  return <Table columns={columns} data={users} />;
};

export default UserTable;
