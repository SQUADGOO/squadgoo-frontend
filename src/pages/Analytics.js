import React from 'react';
import Card from '../components/common/Card';
import ChartWidget from '../components/dashboard/ChartWidget';

const Analytics = () => {
  const analyticsChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [65000, 78000, 90000, 85000, 95000, 110000],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  return (
    <div className="space-y-6 fade-in">
      <Card className="p-6">
        <h3 className="font-bold text-gray-800 mb-4">Platform Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Revenue (YTD)</p>
            <p className="text-2xl font-bold text-indigo-600">$1.2M</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Active Users</p>
            <p className="text-2xl font-bold text-green-600">2,847</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Conversion Rate</p>
            <p className="text-2xl font-bold text-blue-600">24.5%</p>
          </div>
        </div>
        <div className="h-96">
          <ChartWidget title="Revenue Trends" type="line" data={analyticsChartData} />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold text-gray-800 mb-4">User Demographics</h3>
          <div className="space-y-3">
            {[
              { label: 'Jobseekers', percent: 65, color: 'bg-indigo-600' },
              { label: 'Recruiters', percent: 35, color: 'bg-green-600' }
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full`} style={{width: `${item.percent}%`}}></div>
                  </div>
                  <span className="text-sm font-medium">{item.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-gray-800 mb-4">Top Performing Categories</h3>
          <div className="space-y-3">
            {[
              { name: 'Technology', jobs: 456 },
              { name: 'Design', jobs: 234 },
              { name: 'Marketing', jobs: 189 }
            ].map(cat => (
              <div key={cat.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">{cat.name}</span>
                <span className="text-sm text-gray-600">{cat.jobs} jobs</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
