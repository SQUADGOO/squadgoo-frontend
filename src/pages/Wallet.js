import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import Table from '../components/common/Table';

const Wallet = ({ section }) => {
  const transactions = [
    { id: 'TXN-001', user: 'John Doe', type: 'Credit', amount: 500.00, status: 'Completed', date: '2026-01-15', method: 'Bank Transfer' },
    { id: 'TXN-002', user: 'Jane Smith', type: 'Debit', amount: 200.00, status: 'Pending', date: '2026-01-14', method: 'PayPal' },
    { id: 'TXN-003', user: 'TechCorp', type: 'Escrow', amount: 1000.00, status: 'Held', date: '2026-01-13', method: 'Credit Card' },
    { id: 'TXN-004', user: 'Mike Johnson', type: 'Credit', amount: 150.00, status: 'Completed', date: '2026-01-12', method: 'Stripe' },
    { id: 'TXN-005', user: 'Sarah Williams', type: 'Refund', amount: 75.00, status: 'Processing', date: '2026-01-11', method: 'Bank Transfer' }
  ];

  const getAmountColor = (type) => {
    if (type === 'Credit') return 'text-green-600';
    if (type === 'Debit') return 'text-red-600';
    return 'text-gray-900';
  };

  const getAmountPrefix = (type) => {
    if (type === 'Credit') return '+';
    if (type === 'Debit') return '-';
    return '';
  };

  // Withdrawals View
  if (section === 'withdrawals') {
    return (
      <div className="space-y-6 fade-in">
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Pending Withdrawal Requests</h3>
            <Button variant="outline" icon="fa-download">Export</Button>
          </div>
        </Card>

        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} hover className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                    <i className="fas fa-money-bill-wave text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Withdrawal Request #{i}234</h4>
                    <p className="text-sm text-gray-500">User: John Doe • Requested: Today</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                      <span><i className="fas fa-dollar-sign mr-1"></i>Amount: ${i * 500}</span>
                      <span><i className="fas fa-university mr-1"></i>Bank: Chase ****{1234 + i}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="success" size="sm">Approve</Button>
                  <Button variant="danger" size="sm">Reject</Button>
                  <Button variant="outline" size="sm">Hold</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Escrow View
  if (section === 'escrow') {
    return (
      <div className="space-y-6 fade-in">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <i className="fas fa-shield-alt text-blue-600 mt-1"></i>
            <div>
              <h4 className="font-semibold text-blue-800">Escrow Management</h4>
              <p className="text-sm text-blue-700">Funds held in escrow are released when milestones are completed and approved.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contract ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="table-row">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">ESC-001</td>
                <td className="px-6 py-4 text-sm text-gray-900">Website Development</td>
                <td className="px-6 py-4 text-sm text-gray-900">$5,000</td>
                <td className="px-6 py-4"><StatusBadge status="pending" customLabel="Milestone 2/4" /></td>
                <td className="px-6 py-4"><button className="text-indigo-600 hover:text-indigo-900 text-sm">Release</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Refunds View
  if (section === 'refunds') {
    return (
      <div className="space-y-6 fade-in">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Refund Requests</h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Refund Request #REF-001</h4>
                  <p className="text-sm text-gray-600 mt-1">User: Jane Smith • Amount: $200</p>
                  <p className="text-sm text-gray-500 mt-2">Reason: Service not as described</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="success" size="sm">Approve</Button>
                  <Button variant="outline" size="sm">Reject</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Transactions View (default)
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'User', accessor: 'user' },
    { header: 'Type', accessor: 'type' },
    {
      header: 'Amount',
      accessor: 'amount',
      render: (row) => (
        <span className={`text-sm font-semibold ${getAmountColor(row.type)}`}>
          {getAmountPrefix(row.type)}${row.amount.toFixed(2)}
        </span>
      )
    },
    { header: 'Method', accessor: 'method' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status.toLowerCase()} />
    },
    { header: 'Date', accessor: 'date' }
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total Volume</p>
          <p className="text-2xl font-bold text-gray-800">$1.2M</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-orange-600">$45.2K</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Escrow Holds</p>
          <p className="text-2xl font-bold text-blue-600">$128K</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Today's Revenue</p>
          <p className="text-2xl font-bold text-green-600">$3.4K</p>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Types</option>
              <option>Credit</option>
              <option>Debit</option>
              <option>Escrow</option>
              <option>Refund</option>
            </select>
          </div>
          <Button variant="outline" icon="fa-download">Export</Button>
        </div>
      </Card>

      <Table columns={columns} data={transactions} />
    </div>
  );
};

export default Wallet;
